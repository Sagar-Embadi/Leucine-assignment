import React, { createContext, useContext, useState, useEffect } from "react";
import { getToken, getRole, logout } from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  useEffect(() => {
    const savedToken = getToken();
    const savedRole = getRole();
    if (savedToken && savedRole) {
      setToken(savedToken);
      setRole(savedRole);
    }
  }, []);

  const handleLogout = () => {
    logout();
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
