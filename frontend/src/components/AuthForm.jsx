import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ type, onSubmit }) => {
  const navtigate = useNavigate()
  const [formData, setFormData] = useState({ username: "", password: "", role: "Employee" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 border rounded shadow-md min-w-[300px] max-w-[300px]">
      <h2 className="text-3xl text-bolder underline pb-2">{type === "login" ? "Login" : "Sign Up"}</h2>
      <input
      className="border rounded p-2"
      name="username"
      value={formData.username}
      onChange={handleChange}
      placeholder="Username"
      required
      />
      <input
      className="border rounded p-2"
      name="password"
      type="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Password"
      required
      />
      <select name="role" value={formData.role} onChange={handleChange} className="border rounded p-2">
      
        <option value="Employee">Employee</option>
        <option value="Manager">Manager</option>
        <option value="Admin">Admin</option>
      </select>
      <button type="submit">{type === "login" ? "Login" : "Sign Up"}</button>
      <p>{type === "login" ? "Don't have an account?" : "Already have an account?"}</p>
      {/* <button onClick={()=>navtigate(`/${type === "login" ? "Signup" : "Login"}`)}>{type === "login" ? "Signup" : "Login"}</button> */}
      <button onClick={()=>navtigate(`/${type === "login" ? "signup" : "login"}`)}>{type === "login" ? "Signup" : "Login"}</button>
    </form>
  );
};

export default AuthForm;
