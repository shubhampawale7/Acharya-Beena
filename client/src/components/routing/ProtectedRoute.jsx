import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { userInfo } = useAuth();

  // If user is logged in, show the child route (e.g., ProfilePage).
  // Otherwise, redirect to the login page.
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
