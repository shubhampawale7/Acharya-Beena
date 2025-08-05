import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Horoscope", path: "/horoscope" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeMobileMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white/80 backdrop-blur-sm dark:bg-deep-space/70 dark:backdrop-blur-sm shadow-md sticky top-0 z-50 ring-1 ring-black/5 dark:ring-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                className="h-12 w-auto"
                src={logo}
                alt="Acharya Beena Logo"
              />
              <span className="ml-3 text-xl font-bold text-gray-800 dark:text-white hidden sm:block">
                Acharya Beena
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "text-indigo-600 dark:text-nebula-purple"
                        : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {userInfo ? (
              <Menu as="div" className="relative">
                <MenuButton className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white">
                  <span>{userInfo.name}</span>
                  <UserCircleIcon className="h-6 w-6" />
                </MenuButton>
                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        My Dashboard
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/my-bookings"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        My Bookings
                      </Link>
                    </MenuItem>
                    {userInfo.role === "admin" && (
                      <MenuItem>
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Admin Panel
                        </Link>
                      </MenuItem>
                    )}
                    <MenuItem>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </Menu>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Login
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <MoonIcon className="h-6 w-6 text-gray-700" />
              ) : (
                <SunIcon className="h-6 w-6 text-yellow-400" />
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <MoonIcon className="h-6 w-6 text-gray-700" />
              ) : (
                <SunIcon className="h-6 w-6 text-yellow-400" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2 p-2 rounded-md text-gray-800 dark:text-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-deep-space/95 border-t border-gray-200 dark:border-white/10">
          {userInfo ? (
            <div className="px-2 py-3 space-y-1">
              <div className="px-3 py-2">
                <p className="text-base font-medium text-gray-800 dark:text-white">
                  Signed in as
                </p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                  {userInfo.email}
                </p>
              </div>
              <Link
                to="/dashboard"
                onClick={closeMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                My Dashboard
              </Link>
              <Link
                to="/my-bookings"
                onClick={closeMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                My Bookings
              </Link>
              {userInfo.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "bg-indigo-50 dark:bg-gray-900 text-indigo-700 dark:text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="block w-full text-left mt-2 px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
