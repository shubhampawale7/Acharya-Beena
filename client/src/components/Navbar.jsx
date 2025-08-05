import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

const AnimatedLink = ({ link }) => {
  return (
    <NavLink
      to={link.path}
      className={({ isActive }) =>
        `relative rounded-md px-4 py-2 text-sm font-medium transition-colors duration-300
         ${
           isActive
             ? "text-gray-900 dark:text-white"
             : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
         }`
      }
    >
      {({ isActive }) => (
        <>
          {link.name}
          {isActive && (
            <motion.div
              layoutId="active-nav-link"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-nebula-purple"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
        </>
      )}
    </NavLink>
  );
};

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
    <>
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-deep-space/70 backdrop-blur-lg ring-1 ring-black/5 dark:ring-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Brand Name */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img
                  className="h-12 w-auto"
                  src={logo}
                  alt="Acharya Beena Logo"
                />
                {/* --- FIXED: Removed 'hidden sm:block' to make text visible on mobile --- */}
                <span className="ml-3 text-xl font-bold text-gray-800 dark:text-white font-serif">
                  Acharya Beena
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="relative flex items-baseline space-x-1">
                {navLinks.map((link) => (
                  <AnimatedLink key={link.name} link={link} />
                ))}
              </div>
            </div>

            {/* Right-side controls for desktop */}
            <div className="hidden md:flex items-center space-x-3">
              {userInfo ? (
                <Menu as="div" className="relative">
                  <MenuButton className="flex items-center gap-x-2 rounded-full p-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                    <UserCircleIcon className="h-6 w-6" />
                    <span className="hidden lg:block">{userInfo.name}</span>
                  </MenuButton>
                  <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md py-2 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none">
                      <div className="px-4 py-2 border-b border-black/5 dark:border-white/10">
                        <p className="text-sm text-gray-700 dark:text-gray-200">
                          Signed in as
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {userInfo.name}
                        </p>
                      </div>
                      <div className="py-1">
                        <MenuItem>
                          <Link
                            to="/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                          >
                            My Dashboard
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            to="/my-bookings"
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                          >
                            My Bookings
                          </Link>
                        </MenuItem>
                        {userInfo.role === "admin" && (
                          <MenuItem>
                            <Link
                              to="/admin/dashboard"
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                            >
                              Admin Panel
                            </Link>
                          </MenuItem>
                        )}
                      </div>
                      <div className="py-1 border-t border-black/5 dark:border-white/10">
                        <MenuItem>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left block px-4 py-2 text-sm text-red-700 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                          >
                            Logout
                          </button>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Transition>
                </Menu>
              ) : (
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-nebula-purple hover:bg-opacity-90 transition-colors"
                  >
                    Login
                  </motion.button>
                </Link>
              )}

              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "light" ? (
                      <MoonIcon className="h-6 w-6 text-gray-700" />
                    ) : (
                      <SunIcon className="h-6 w-6 text-yellow-400" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="ml-2 p-2 rounded-md text-gray-800 dark:text-gray-200"
                aria-label="Open main menu"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] md:hidden"
          >
            <div
              onClick={closeMobileMenu}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 h-full w-full max-w-sm bg-white/90 dark:bg-deep-space/90 backdrop-blur-lg p-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-serif text-xl font-bold text-gray-800 dark:text-white">
                  Menu
                </h2>
                <button onClick={closeMobileMenu} className="p-2 -mr-2">
                  <XMarkIcon className="h-6 w-6 text-gray-800 dark:text-white" />
                </button>
              </div>

              <motion.div
                variants={{
                  open: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 },
                  },
                }}
                initial="closed"
                animate="open"
                className="mt-8 flex flex-col space-y-2"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    variants={{
                      open: { y: 0, opacity: 1 },
                      closed: { y: 20, opacity: 0 },
                    }}
                  >
                    <NavLink
                      to={link.path}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `block text-lg font-medium p-3 rounded-lg ${
                          isActive
                            ? "bg-gray-100 dark:bg-white/10 text-nebula-purple"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}

                {/* --- NEW: Theme Toggle added to Mobile Menu --- */}
                <motion.div
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 20, opacity: 0 },
                  }}
                  className="pt-4 border-t border-black/10 dark:border-white/10"
                >
                  <div className="flex justify-between items-center p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5">
                    <span className="text-lg font-medium">Switch Theme</span>
                    <button
                      onClick={toggleTheme}
                      className="p-2 rounded-full"
                      aria-label="Toggle theme"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={theme}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          {theme === "light" ? (
                            <MoonIcon className="h-6 w-6 text-gray-700" />
                          ) : (
                            <SunIcon className="h-6 w-6 text-yellow-400" />
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 20, opacity: 0 },
                  }}
                  className="pt-2"
                >
                  {userInfo ? (
                    <div className="space-y-2">
                      <Link
                        to="/dashboard"
                        onClick={closeMobileMenu}
                        className="block text-lg font-medium p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                      >
                        My Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          closeMobileMenu();
                        }}
                        className="w-full text-left text-lg font-medium p-3 rounded-lg text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="block text-lg font-medium p-3 rounded-lg text-white bg-nebula-purple text-center"
                    >
                      Login
                    </Link>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
