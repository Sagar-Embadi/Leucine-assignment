import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestList from "../components/RequestList";
import { getEnv } from "../helpers/getEnv";
import { showToastify } from "../helpers/showToastify";

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = () => {
    try {
      const token = localStorage.getItem("token");
      axios.get(`${getEnv('VITE_BACKEND_URL')}/api/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        console.log(res.data);
        setRequests(res.data);
     });
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      axios.patch(
        `http://localhost:5000/api/requests/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ).then((res) => {
        console.log(res);
        showToastify('success', 'Status updated');
        fetchRequests();
      });
    } catch (err) {
      showToastify('error', 'Status update failed');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return <RequestList requests={requests} onUpdateStatus={updateStatus} />;
};

export default PendingRequests;
