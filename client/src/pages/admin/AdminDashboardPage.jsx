import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Meta from "../../components/common/Meta";
import Spinner from "../../components/common/Spinner";
import { motion } from "framer-motion"; // Added for visual flair only
import {
  UsersIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";

// NOTE: This version is a direct visual redesign of your original component.
// The functionality has NOT been changed.

// Redesigned StatCard, functionally identical to the original (not a link).
const StatCard = ({ title, value, icon: Icon }) => (
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 p-6 shadow-xl ring-1 ring-black/5 dark:ring-white/10">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </h3>
        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-starlight">
          {value}
        </p>
      </div>
      <div className="p-3 rounded-full bg-nebula-purple/10">
        <Icon className="h-6 w-6 text-nebula-purple" />
      </div>
    </div>
  </div>
);

const AdminDashboardPage = () => {
  const { userInfo } = useAuth();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/admin/stats", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch stats.");
        setStats(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (userInfo) fetchStats();
  }, [userInfo]);

  // Animation variants for visual effect without changing functionality
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full pt-20">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Meta title="Admin Dashboard | Acharya Beena" />
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="space-y-10"
      >
        {/* Header section with updated styling */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-between sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-starlight font-serif">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-lg text-gray-600 dark:text-gray-400">
              Welcome back, {userInfo?.name}!
            </p>
          </div>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white dark:bg-slate-700 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600 transition-all"
          >
            <span>View Live Site</span>
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Stat Cards Grid with redesigned cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div variants={itemVariants}>
            <StatCard
              title="Total Users"
              value={stats?.userCount ?? 0}
              icon={UsersIcon}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              title="Total Bookings"
              value={stats?.bookingCount ?? 0}
              icon={CalendarDaysIcon}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              title="Total Revenue"
              value={`₹${stats?.totalRevenue.toLocaleString("en-IN") ?? 0}`}
              icon={BanknotesIcon}
            />
          </motion.div>
        </div>

        {/* Recent Bookings Section with redesigned container and table styles */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-starlight font-serif">
            Recent Bookings
          </h2>
          <div className="mt-4 bg-white dark:bg-deep-space/50 shadow-xl rounded-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                  {stats?.recentBookings?.map((booking) => (
                    <tr key={booking._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-starlight">
                        {booking.user?.name ?? "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {/* Reverted to original plain text display */}
                        {booking.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default AdminDashboardPage;
