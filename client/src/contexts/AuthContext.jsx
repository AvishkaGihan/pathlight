import React, { useState, useEffect } from "react";
import { AuthContext } from "./useAuth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("pathlight_token"));

  useEffect(() => {
    if (token) {
      // Verify token is still valid
      const userData = JSON.parse(localStorage.getItem("pathlight_user"));
      if (userData) {
        setUser(userData);
      }
    }
    setLoading(false);
  }, [token]);

  const login = (userData, authToken) => {
    localStorage.setItem("pathlight_token", authToken);
    localStorage.setItem("pathlight_user", JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("pathlight_token");
    localStorage.removeItem("pathlight_user");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
