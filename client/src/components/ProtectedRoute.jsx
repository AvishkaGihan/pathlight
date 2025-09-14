import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
