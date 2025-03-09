import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IoLogoFacebook } from "react-icons/io5";
import { GrGithub } from "react-icons/gr";
import { GrGoogle } from "react-icons/gr";
import { AuthContext } from "../contexts/auth.context";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router";
import UserService from "../services/user.service";

const SignIn = () => {
  const { login, signUpWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    login(data.email, data.password)
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        await UserService.addUser(user.email);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const googleSignUp = () => {
    signUpWithGoogle()
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        await UserService.addUser(user.email);
        Swal.fire({
          icon: "success",
          title: "Register white google Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("login").close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Google Sign-Up Failed",
          text: error.message,
        });
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="card w-full max-w-md shadow-xl bg-white">
    <div className="card-body p-6">
      {/* Header */}
      <h3 className="text-center font-bold text-2xl mb-4">Please Login</h3>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            {...register("email", { required: true })}
          />
        </div>

        {/* Password Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full"
            {...register("password", { required: true })}
          />
          <label className="label">
            <a href="/forgot-password" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>

        {/* Submit Button */}
        <div className="form-control mt-4">
          <button
            type="submit"
            className="btn btn-block bg-red-500 hover:bg-red-600 text-white"
          >
            Log In
          </button>
        </div>
      </form>

      {/* Signup Link */}
      <p className="text-center my-4">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="underline text-red-500 hover:text-red-600">
          Sign Up Now
        </a>
      </p>

      {/* Divider */}
      <div className="divider">OR</div>

      {/* Social Login Buttons */}
      <div className="flex justify-center space-x-4">
        {/* Google Button */}
        <button
          onClick={googleSignUp}
          className="btn btn-circle btn-outline hover:bg-red-50 hover:text-red-500 transition duration-300"
        >
        <GrGoogle className="w-8 h-8" />
        </button>

        {/* GitHub Button */}
        <button
       
          className="btn btn-circle btn-outline hover:bg-gray-800 hover:text-white transition duration-300"
        >
          <GrGithub className="w-8 h-8" />
        </button>

        {/* Facebook Button */}
        <button
          
          className="btn btn-circle btn-outline hover:bg-blue-600 hover:text-white transition duration-300"
        >
           <IoLogoFacebook className="w-8 h-8" />
        </button>
      </div>
    </div>
  </div>
</div>
  );
};

export default SignIn;