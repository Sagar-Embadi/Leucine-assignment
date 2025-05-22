import React from "react";
import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ role: requiredRole, children }) => {

  // const { token, role } = useAuth();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");  

  if (!token) return <Navigate to="/login" />;
  if (requiredRole && role !== requiredRole) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;