import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

const Login = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [orgs, setOrgs] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    shouldUnregister: false,
  });

  const onValidate = async ({ email, password }) => {
    try {
      const response = await axios.post("http://localhost:8080/api/user", {
        email,
        password,
      });
      console.log(response.data);

      setOrgs(response.data);
      setIsValidated(true);
    } catch (err) {
      console.error("Validation failed:", err);
      alert("Invalid credentials");
    }
  };

  const onLogin = async () => {
    const { email, password, orgId } = getValues();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        {
          email,
          password,
          orgId,
        },
        { withCredentials: true }
      );

      const { token } = response.data;

      Cookies.set("jwt", token, { path: "/", secure: true });
      Cookies.set("orgId", orgId, { path: "/" });
      // navigate("/");
      window.location.href = "/";
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="max-w-[440px] px-5 flex justify-center items-center mx-auto h-screen text-black">
      <div className="w-full border border-gray-600 shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-md p-5 hover:backdrop-blur-sm transition ease-in duration-300">
        <div className="h-[90px] text-2xl font-semibold flex items-center justify-center">
          <span>Welcome back</span>
        </div>
        <p className="flex items-center justify-center -mt-5 mb-5 text-sm text-gray-700">
          Please enter your details to sign in.
        </p>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(isValidated ? onLogin : onValidate)}>
          {/* Email */}
          {!isValidated && (
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
          )}

          {/* Password */}
          {!isValidated && (
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
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}

          {/* Organization Select */}
          {isValidated && (
            <div>
              <label
                htmlFor="orgId"
                className="block text-sm font-medium mb-1">
                Organization
              </label>
              <select
                id="orgId"
                className="w-full border bg-gray-100 border-gray-300 rounded-md px-4 py-3 text-sm text-black"
                {...register("orgId", {
                  required: "Organization is required",
                  min: { value: 1, message: "Org ID must be positive" },
                })}>
                <option value="">Select your organization</option>
                {orgs.map((org) => (
                  <option
                    key={org.orgId}
                    value={org.orgId}
                    className="text-black">
                    {org.orgName}
                  </option>
                ))}
              </select>
              {errors.orgId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.orgId.message}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-[45px] bg-neutral-950 hover:bg-neutral-800 border border-gray-600 text-white text-lg font-medium rounded-md transition ease-in duration-300 cursor-pointer">
            {isValidated ? "Login" : "Validate"}
          </button>

          <div className="text-center mt-5 text-sm">
            Not a member?{" "}
            <NavLink
              to="/Signup"
              className="text-blue-600 hover:underline">
              Signup now
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
