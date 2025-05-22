import React from "react";
import AuthForm from "../components/AuthForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getEnv } from "../helpers/getEnv";
import { showToastify } from "../helpers/showToastify";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    try {
      axios.post(`${getEnv('VITE_BACKEND_URL')}/api/auth/signup`, formData).then(()=>{
        showToastify('success', 'Signup successful');
        navigate("/login");

      })
    } catch (err) {
      console.error(err);
      showToastify('error', err.response.data.message);
    }
  };

  return <AuthForm type="signup" onSubmit={handleSignup} />;
};

export default Signup;
