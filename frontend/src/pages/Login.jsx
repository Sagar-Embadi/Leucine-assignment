import React from "react";
import AuthForm from "../components/AuthForm.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getEnv } from "../helpers/getEnv.js";
import { showToastify } from "../helpers/showToastify.js";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    axios
      .post(`${getEnv('VITE_BACKEND_URL')}/api/auth/login`, formData)
      .then((res) => {
        showToastify('success', 'Login successful');
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", formData.role);
        localStorage.setItem("username", formData.username);
        navigate("/");
      })
      .catch((err) => {
        showToastify('error', err.response.data.message);
        console.log(err);
      });
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
};

export default Login;
