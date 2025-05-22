import React from "react";
import SoftwareForm from "../components/SoftwareForm";
import axios from "axios";
import { getEnv } from "../helpers/getEnv";
import { showToastify } from "../helpers/showToastify";

const CreateSoftware = () => {
  const handleSubmit = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${ getEnv('VITE_BACKEND_URL')}/api/software`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToastify('success', 'Software created');
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      showToastify('error', 'Creation failed');
    }
  };

  return <SoftwareForm onSubmit={handleSubmit} />;
};

export default CreateSoftware;
