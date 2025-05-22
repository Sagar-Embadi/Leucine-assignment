import React from "react";
import RequestForm from "../components/RequestForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getEnv } from "../helpers/getEnv";
import { showToastify } from "../helpers/showToastify";

const RequestAccess = () => {
  const navigate = useNavigate()
  const handleSubmit = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      axios.post(`${getEnv('VITE_BACKEND_URL')}/api/requests`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        console.log(response.data);
        showToastify('success', 'Request submitted');
        navigate('/')
      })
    } catch (err) {
      console.error(err);
      showToastify('error', 'Submission failed');
    }
  };

  return <RequestForm onSubmit={handleSubmit} />;
};

export default RequestAccess;
