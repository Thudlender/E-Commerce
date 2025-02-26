import React, { useContext } from "react";
import { IoLogoFacebook } from "react-icons/io5";
import { GrGithub } from "react-icons/gr";
import { GrGoogle } from "react-icons/gr";

import { AuthContext } from "../contexts/auth.context";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router";

const SocialLogin = ({ name }) => {
  const { signUpWithGoogle, signUpWithGithub, signUpWithFacebook } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const googleSignUp = () => {
    signUpWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          icon: "success",
          title: "Register with Google Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById(name).close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const githubSignUp = () => {
    signUpWithGithub()
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          icon: "success",
          title: "Register with GitHub Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById(name).close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const facebookSignUp = () => {
    signUpWithFacebook()
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          icon: "success",
          title: "Register with Facebook Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById(name).close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <button
          className="btn btn-ghost btn-circle hover:bg-red"
          onClick={googleSignUp}
        >
          <GrGoogle className="w-8 h-8" />
        </button>
        <button
          className="btn btn-ghost btn-circle hover:bg-red"
          onClick={githubSignUp}
        >
          <GrGithub className="w-8 h-8" />
        </button>
        <button
          className="btn btn-ghost btn-circle hover:bg-red"
          onClick={facebookSignUp}
        >
          <IoLogoFacebook className="w-8 h-8" />
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
