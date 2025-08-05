import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { Bars3Icon } from "@heroicons/react/24/outline";

// --- Header sub-component for the main content area ---
const AdminHeader = ({ setIsSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-20 bg-white/70 dark:bg-slate-900/60 backdrop-blur-lg border-b border-gray-200 dark:border-slate-800/50 p-4 lg:hidden">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-nebula-purple"
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
    </header>
  );
};

// --- Main Layout Component ---
const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    // Using the same elegant background from other pages for consistency
    <div className="relative min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-50 via-gray-50 to-white dark:from-purple-900/20 dark:via-slate-900 dark:to-slate-900">
      {/* --- Mobile Sidebar Overlay --- */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          aria-hidden="true"
        ></div>
      )}

      {/* --- Admin Sidebar --- */}
      <div
        className={`fixed inset-y-0 left-0 z-40 lg:z-auto lg:translate-x-0 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar />
      </div>

      {/* --- Main Content Area --- */}
      <div className="lg:pl-64 flex flex-col h-screen">
        <AdminHeader setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {/* Outlet renders the specific admin page */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
