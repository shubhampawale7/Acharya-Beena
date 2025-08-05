import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Meta from "../components/common/Meta";
import Spinner from "../components/common/Spinner";
import {
  CalendarDaysIcon,
  ClockIcon,
  DocumentArrowDownIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};
const formatTime = (dateString) => {
  const options = { hour: "2-digit", minute: "2-digit", timeZoneName: "short" };
  return new Date(dateString).toLocaleTimeString("en-US", options);
};

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [bookings, setBookings] = useState([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);

  const { userInfo, login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);

      const fetchBookings = async () => {
        setIsLoadingBookings(true);
        // MOCK DATA for demonstration - replace with your fetch call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockData = [
          {
            _id: 1,
            serviceName: "Vedic Horoscope Reading",
            appointmentDate: new Date(
              Date.now() + 10 * 24 * 60 * 60 * 1000
            ).toISOString(),
            status: "Confirmed",
          },
          {
            _id: 2,
            serviceName: "Numerology Report",
            appointmentDate: new Date(
              Date.now() - 30 * 24 * 60 * 60 * 1000
            ).toISOString(),
            status: "Completed",
            reportUrl: "#",
          },
          {
            _id: 3,
            serviceName: "Vastu Shastra Consultation",
            appointmentDate: new Date(
              Date.now() - 60 * 24 * 60 * 60 * 1000
            ).toISOString(),
            status: "Completed",
            reportUrl: "#",
          },
        ];
        setBookings(mockData);
        setIsLoadingBookings(false);
      };

      fetchBookings();
    }
  }, [userInfo]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsUpdatingProfile(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      // Mock success - replace with your API logic
      const updatedUser = { ...userInfo, name, email };
      login(updatedUser);
      toast.success("Profile updated successfully!");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const upcomingBooking = bookings.find(
    (b) => new Date(b.appointmentDate) > new Date() && b.status === "Confirmed"
  );
  const pastBookings = bookings.filter((b) => b._id !== upcomingBooking?._id);

  const tabs = ["Appointments", "Profile"];

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <>
      <Meta title="My Dashboard | Acharya Beena" />
      <div className="bg-transparent min-h-screen py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-4xl font-serif">
              Welcome, {userInfo?.name}!
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              This is your personal cosmic dashboard.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="mt-8 border-b border-gray-200 dark:border-white/10">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`relative whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors
                    ${
                      activeTab === tab.toLowerCase()
                        ? "border-nebula-purple text-nebula-purple"
                        : "border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
                    }`}
                >
                  {tab}
                  {activeTab === tab.toLowerCase() && (
                    <motion.div
                      layoutId="active-tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-nebula-purple"
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            <AnimatePresence mode="wait">
              {activeTab === "appointments" && (
                <motion.div
                  key="appointments"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-starlight font-serif">
                    Upcoming Appointment
                  </h2>
                  {isLoadingBookings ? (
                    <div className="mt-4">
                      <Spinner />
                    </div>
                  ) : upcomingBooking ? (
                    <div className="mt-4 p-6 rounded-2xl bg-white/60 dark:bg-deep-space/50 backdrop-blur-lg ring-1 ring-black/5 dark:ring-white/10 shadow-xl">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="flex-shrink-0 p-3 rounded-full bg-nebula-purple/10">
                          <CalendarDaysIcon className="h-8 w-8 text-nebula-purple" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-starlight">
                            {upcomingBooking.serviceName}
                          </h3>
                          <p className="mt-1 text-gray-600 dark:text-gray-300">
                            {formatDate(upcomingBooking.appointmentDate)} at{" "}
                            {formatTime(upcomingBooking.appointmentDate)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      You have no upcoming appointments.
                    </p>
                  )}

                  <h2 className="mt-12 text-2xl font-semibold text-gray-800 dark:text-starlight font-serif">
                    Consultation History
                  </h2>
                  <div className="mt-4 space-y-4">
                    {isLoadingBookings ? (
                      <Spinner />
                    ) : pastBookings.length > 0 ? (
                      pastBookings.map((booking, i) => (
                        <motion.div
                          key={booking._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="bg-white/60 dark:bg-deep-space/50 p-4 rounded-xl backdrop-blur-md ring-1 ring-black/5 dark:ring-white/10 flex justify-between items-center"
                        >
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-starlight">
                              {booking.serviceName}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {formatDate(booking.appointmentDate)}
                            </p>
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                booking.status === "Completed"
                                  ? "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400"
                                  : "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-800 dark:text-yellow-500"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>
                          {booking.reportUrl && (
                            <a
                              href={booking.reportUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-nebula-purple/20 px-4 py-2 text-sm font-semibold text-nebula-purple shadow-sm hover:bg-indigo-100 dark:hover:bg-nebula-purple/30"
                            >
                              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />{" "}
                              Report
                            </a>
                          )}
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">
                        No past consultations found.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 p-8 rounded-2xl bg-white/60 dark:bg-deep-space/50 backdrop-blur-lg ring-1 ring-black/5 dark:ring-white/10 shadow-xl">
                      <h2 className="text-2xl font-semibold text-gray-800 dark:text-starlight font-serif">
                        Update Profile
                      </h2>
                      <form
                        onSubmit={handleProfileSubmit}
                        className="mt-6 space-y-6"
                      >
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-900 dark:text-starlight"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full rounded-md border-0 py-2 px-3 bg-white/80 dark:bg-slate-800/50 text-gray-900 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-900 dark:text-starlight"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md border-0 py-2 px-3 bg-white/80 dark:bg-slate-800/50 text-gray-900 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20"
                          />
                        </div>
                        <div className="border-t border-gray-200 dark:border-white/10 pt-6">
                          <label className="block text-sm font-medium text-gray-900 dark:text-starlight">
                            Update Password
                          </label>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Leave blank to keep current password.
                          </p>
                          <input
                            type="password"
                            name="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 block w-full rounded-md border-0 py-2 px-3 bg-white/80 dark:bg-slate-800/50 text-gray-900 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20"
                          />
                          <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-2 block w-full rounded-md border-0 py-2 px-3 bg-white/80 dark:bg-slate-800/50 text-gray-900 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20"
                          />
                        </div>
                        <div className="flex justify-end">
                          <motion.button
                            type="submit"
                            disabled={isUpdatingProfile}
                            whileHover={{
                              scale: !isUpdatingProfile ? 1.05 : 1,
                            }}
                            whileTap={{ scale: !isUpdatingProfile ? 0.95 : 1 }}
                            className="inline-flex items-center gap-x-2 w-36 justify-center rounded-full bg-nebula-purple px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 disabled:opacity-50"
                          >
                            {isUpdatingProfile ? (
                              <Spinner size="sm" />
                            ) : (
                              "Save Profile"
                            )}
                          </motion.button>
                        </div>
                      </form>
                    </div>
                    <div className="lg:col-span-1">
                      <div className="p-6 rounded-2xl bg-white/60 dark:bg-deep-space/50 backdrop-blur-lg ring-1 ring-black/5 dark:ring-white/10 shadow-xl text-center">
                        <UserCircleIcon className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" />
                        <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-starlight">
                          {userInfo.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          {userInfo.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
