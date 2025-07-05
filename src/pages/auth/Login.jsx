import React from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        {
          email: data.email,
          password: data.password,
          orgId: parseInt(data.orgId),
        },
        { withCredentials: true }
      );

      // const { token } = response.data;
      // localStorage.setItem("token", token);
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid credentials or orgId");
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

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
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
            <label htmlFor="password" className="block text-sm font-medium mb-1">
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

          <div>
            <label htmlFor="orgId" className="block text-sm font-medium mb-1">
              Organization ID
            </label>
            <input
              type="number"
              id="orgId"
              placeholder="Enter your organization ID..."
              className="w-full border bg-gray-100 border-gray-300 rounded-md px-4 py-3 text-sm placeholder-gray-500 text-black"
              {...register("orgId", {
                required: "Organization ID is required",
                min: { value: 1, message: "Org ID must be positive" },
              })}
            />
            {errors.orgId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.orgId.message}
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
            <NavLink to="/Signup" className="text-blue-600 hover:underline">
              Signup now
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;