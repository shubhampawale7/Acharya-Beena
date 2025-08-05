import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AdminRoute = () => {
  const { userInfo } = useAuth();

  if (userInfo && userInfo.role === "admin") {
    return <Outlet />;
  } else {
    // You can optionally show a toast message before redirecting
    toast.error("Access Denied. Admin only.");
    return <Navigate to="/" replace />;
  }
};

export default AdminRoute;
