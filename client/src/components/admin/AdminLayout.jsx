import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet /> {/* Admin pages will be rendered here */}
      </main>
    </div>
  );
};

export default AdminLayout;
