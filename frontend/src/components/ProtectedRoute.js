import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  // 1. If not logged in, go to Login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 2. If Admin Only is required, but user is not admin
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  // 3. If all good, show the page
  return children;
};

export default ProtectedRoute;