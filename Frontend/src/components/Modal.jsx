import React, { useContext } from 'react';
import googleIcon from "./icons/GoogleIcon";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from 'react-router';

const Modal = ({ name }) => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";
    const {
        register,
        hadleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        //console.log(data);

        login(data.email, data.password)
          .then((result) => {
            const user = result.user;
            console.log(user);
            Swal.fire({
                icon: "success",
                title: "Login Successful",
                showCloseButton: false,
                timer: 1500,
            });
            document.getElementById("login").closest();
            navigate(from, { replace: true });
          })
          .catch((error) => {
            console.log(error);
          });
    };
  return (
    <div>
        
    </div>
  )
}

export default Modal