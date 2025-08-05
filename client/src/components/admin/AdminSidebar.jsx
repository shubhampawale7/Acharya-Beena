import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  ChartBarIcon,
  UsersIcon,
  CalendarIcon,
  DocumentTextIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/logo.png";

const adminNavLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: ChartBarIcon },
  { name: "Users", href: "/admin/users", icon: UsersIcon },
  { name: "Bookings", href: "/admin/bookings", icon: CalendarIcon },
  { name: "Blog Posts", href: "/admin/blog", icon: DocumentTextIcon },
];

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 dark:bg-deep-space p-4 flex flex-col">
      <div className="flex-shrink-0 mb-8">
        <Link to="/" className="flex items-center">
          <img className="h-10 w-auto" src={logo} alt="Acharya Beena Logo" />
          <span className="ml-3 text-white text-xl font-bold">Admin Panel</span>
        </Link>
      </div>
      <nav className="flex-grow">
        <ul>
          {adminNavLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 my-1 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-600 dark:bg-nebula-purple text-white"
                      : "text-gray-300 hover:bg-gray-700 dark:hover:bg-slate-700 hover:text-white"
                  }`
                }
              >
                <link.icon className="h-6 w-6 mr-3" />
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex-shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 my-1 rounded-md text-sm font-medium transition-colors text-gray-300 hover:bg-red-600/50 hover:text-white"
        >
          <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
