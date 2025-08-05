import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  ChartBarIcon,
  UsersIcon,
  CalendarDaysIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/logo.png"; // Make sure this path is correct

// NOTE: This is a visual redesign only.
// The core React logic and functionality remain unchanged.

const adminNavLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: ChartBarIcon },
  { name: "Users", href: "/admin/users", icon: UsersIcon },
  { name: "Bookings", href: "/admin/bookings", icon: CalendarDaysIcon },
];

const AdminSidebar = () => {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="hidden lg:flex w-64 flex-shrink-0 bg-white dark:bg-deep-space/50 border-r border-gray-200 dark:border-slate-800/50 p-4 flex-col">
      {/* Logo and Panel Title */}
      <div className="flex-shrink-0 mb-8 px-2">
        <Link to="/admin/dashboard" className="flex items-center">
          <img
            className="h-10 w-auto"
            src={logo}
            alt="Acharya Beena Logo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/100x100/6366f1/ffffff?text=Logo";
            }}
          />
          <span className="ml-3 text-gray-800 dark:text-starlight text-xl font-bold font-serif">
            Admin Panel
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow">
        <ul className="space-y-2">
          {adminNavLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-nebula-purple text-white shadow-md shadow-nebula-purple/30"
                      : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white"
                  }`
                }
              >
                <link.icon className="h-5 w-5 mr-3" />
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Info and Logout Button */}
      <div className="flex-shrink-0 mt-8 border-t border-gray-200 dark:border-slate-700/50 pt-4">
        <div className="flex items-center justify-between p-2">
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-starlight">
              {userInfo?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Administrator
            </p>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2 rounded-full text-gray-400 hover:bg-red-100 dark:hover:bg-red-900/50 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
