import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    const payload = {
      name: data.fullname,
      email: data.email,
      password: data.password,
      orgName: data.orgName,
      orgDescription: data.orgDescription
    };

    try {
      const response = await axios.post("http://localhost:8080/api/signup", payload);
      alert("Signup successful!");
      console.log("Response:", response.data);
      reset();
    } catch (error) {
      console.log("Data : - " + JSON.stringify(payload));
      console.error("Signup error:", error);
      alert("Signup failed: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="max-w-[440px] px-5 flex justify-center items-center mx-auto h-vh text-black">
      <div className="bg-white shadow-[0_0_15px_rgba(0,0,0,0.2)]  w-[27rem] mx-auto my-12 rounded-md border border-gray-600">
        <div className="grid grid-cols-2">
          <div className="text-lg font-semibold pt-5 pb-2 pl-5">Sign Up</div>
        </div>
        <div className="bg-[#cfd1d4] h-px mb-2 w-full" />
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 w-full">

          {/* Fullname */}
          <div className="mb-3">
            <label htmlFor="fullname" className="block text-sm font-medium mb-1">Fullname</label>
            <input id="fullname" type="text" placeholder="Fullname"
              {...register("fullname", { required: "Fullname is required" })}
              className="bg-gray-100 border border-gray-300 rounded-md w-full px-4 py-3 text-sm"
            />
            {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input id="email" type="email" placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
              className="bg-gray-100 border border-gray-300 rounded-md w-full px-4 py-3 text-sm"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Organization Name */}
          <div className="mb-3">
            <label htmlFor="orgName" className="block text-sm font-medium mb-1">Organization Name</label>
            <input id="orgName" type="text" placeholder="Organization Name"
              {...register("orgName", { required: "Organization Name is required" })}
              className="bg-gray-100 border border-gray-300 rounded-md w-full px-4 py-3 text-sm"
            />
            {errors.orgName && <p className="text-red-500 text-sm mt-1">{errors.orgName.message}</p>}
          </div>

          {/* Organization Description */}
          <div className="mb-3">
            <label htmlFor="orgDescription" className="block text-sm font-medium mb-1">Organization Description</label>
            <textarea id="orgDescription" placeholder="Describe your organization"
              {...register("orgDescription", { required: "Description is required" })}
              className="bg-gray-100 border border-gray-300 rounded-md w-full px-4 py-2 text-sm"
            />
            {errors.orgDescription && <p className="text-red-500 text-sm mt-1">{errors.orgDescription.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input id="password" type="password" placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="bg-gray-100 border border-gray-300 rounded-md w-full px-4 py-3 text-sm"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
            <input id="confirmPassword" type="password" placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) => value === password || "Passwords do not match",
              })}
              className="bg-gray-100 border border-gray-300 rounded-md w-full px-4 py-3 text-sm"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>


          {/* Submit */}
          <button type="submit" disabled={isSubmitting}
            className="bg-neutral-950 text-white font-semibold rounded-md w-full py-2 hover:bg-neutral-800 transition-all duration-300 cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center pb-3">
          <p>
            Already have an account?{" "}
            <NavLink to="/Login" className="text-blue-600 hover:underline">Login</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
