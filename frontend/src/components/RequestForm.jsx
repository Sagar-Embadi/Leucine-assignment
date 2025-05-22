import React, { useState, useEffect } from "react";
import axios from "axios";
import {getEnv} from '../helpers/getEnv'

const RequestForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    softwareId: "",
    accessType: "Read",
    reason: "",
  });
  const [softwareList, setSoftwareList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    axios
      .get(`${getEnv('VITE_BACKEND_URL')}/api/software`,{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log(res.data)
      setSoftwareList(res.data)
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="max-w-lg mx-auto bg-white border border-gray-200 shadow-lg rounded-2xl p-8 space-y-6"
>
  <h2 className="text-2xl font-bold text-gray-800">Request Software Access</h2>

  {/* Software Select */}
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">Select Software</label>
    <select
      name="softwareId"
      value={formData.softwareId}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select Software</option>
      {softwareList.map((s) => (
        <option key={s.id} value={s.id}>
          {s.name}
        </option>
      ))}
    </select>
  </div>

  {/* Access Type */}
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">Access Type</label>
    <select
      name="accessType"
      value={formData.accessType}
      onChange={handleChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="Read">Read</option>
      <option value="Write">Write</option>
      <option value="Admin">Admin</option>
    </select>
  </div>

  {/* Reason */}
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">Reason</label>
    <textarea
      name="reason"
      value={formData.reason}
      onChange={handleChange}
      placeholder="Enter the reason for access"
      required
      rows={4}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
  >
    Submit Request
  </button>
</form>

  );
};

export default RequestForm;
