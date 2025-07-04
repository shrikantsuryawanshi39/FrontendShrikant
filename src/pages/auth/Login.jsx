import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const [orgList, setOrgList] = useState([]);
  const [showOrgSelector, setShowOrgSelector] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [jwt, setJwt] = useState(null);
  const [selectedOrg, setSelectedOrg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log("Form submitted with data:", data);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: data.email,
          password: data.password,
        }
      );

      const { token, orgs } = response.data;
      setJwt(token);
      setOrgList(orgs);
      setShowOrgSelector(true);
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid email or password");
    }
  };

  const handleOrgSelection = async () => {
    if (!selectedOrg) {
      alert("Please select an organization");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/api/auth/select-org",
        {
          orgId: selectedOrg,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      
      localStorage.setItem("token", jwt);
      navigate("/"); 
      setShowOrgSelector(false);
      setShowLogin(true);
    } catch (err) {
      console.error("Org selection failed:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-[440px] px-5 flex justify-center items-center mx-auto h-dvh text-black">
      {/* Login form will be displayed here =============>>>>>>>>>>>>>>>>> */}
      {showLogin && (
        <div className="w-full border border-gray-600 shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-md p-5 hover:backdrop-blur-sm transition ease-in duration-300">
          <div className="h-[90px] text-2xl font-semibold flex items-center justify-center">
            <span>Welcome back</span>
          </div>
          <p className="flex items-center justify-center -mt-5 mb-5 text-sm text-gray-700">
            Please enter your details to sign in.
          </p>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email..."
                className="w-full border bg-gray-100 border-gray-300 rounded-md px-4 py-3 text-sm placeholder-gray-500 text-black"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email is invalid",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full border bg-gray-100 border-gray-300 rounded-md px-4 py-3 text-sm placeholder-gray-500 text-black"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be at most 20 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-[45px] bg-neutral-950 hover:bg-neutral-800 border border-gray-600 text-white text-lg font-medium rounded-md transition ease-in duration-300 cursor-pointer">
              Login
            </button>

            <div className="text-center mt-5 text-sm">
              Not a member?{" "}
              <NavLink
                to="/pages/auth/Signup"
                className="text-blue-600 hover:underline">
                Signup now
              </NavLink>
            </div>
          </form>
        </div>
      )}

      {/* Organizations selector list will be displayed here =============>>>>>>>>>>>>>>>>> */}
      {showOrgSelector && (
        <div className="mt-4 w-full border border-gray-600 shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-md px-10 py-15 hover:backdrop-blur-sm transition ease-in duration-300 flex flex-col items-center justify-center gap-5">
          <div className="w-full mb-4">
            <label
              htmlFor="orgSelect"
              className="block text-md font-medium mb-3">
              Select your organization
            </label>
            <select
              id="orgSelect"
              value={selectedOrg}
              onChange={(e) => setSelectedOrg(e.target.value)}
              className="w-full border bg-gray-100 border-gray-300 rounded-md px-4 py-3 text-sm">
              <option
                value=""
                disabled>
                -- Choose Org --
              </option>
              {orgList.map((org) => (
                <option
                  key={org.id}
                  value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="mt-4 h-[45px] bg-neutral-950 hover:bg-neutral-800 border border-gray-600 text-white text-lg font-medium rounded-md transition ease-in duration-300 cursor-pointer px-4 py-2"
            onClick={handleOrgSelection}>
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
