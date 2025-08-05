import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Meta from "../../components/common/Meta";
import Spinner from "../../components/common/Spinner";
import {
  UsersIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md ring-1 ring-black/5 dark:ring-white/10">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-indigo-100 dark:bg-nebula-purple/20">
        <Icon className="h-6 w-6 text-indigo-600 dark:text-nebula-purple" />
      </div>
      <h3 className="ml-4 text-lg font-medium text-gray-700 dark:text-gray-300">
        {title}
      </h3>
    </div>
    <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-starlight">
      {value}
    </p>
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Meta title="Admin Dashboard | Acharya Beena" />
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-starlight">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              Welcome back, {userInfo?.name}!
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-white dark:bg-slate-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600"
          >
            Go to Main Site
            <ArrowUpRightIcon className="ml-1.5 h-5 w-5" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total Users"
            value={stats?.userCount ?? 0}
            icon={UsersIcon}
          />
          <StatCard
            title="Total Bookings"
            value={stats?.bookingCount ?? 0}
            icon={CalendarDaysIcon}
          />
          <StatCard
            title="Total Revenue"
            value={`₹${stats?.totalRevenue.toLocaleString("en-IN") ?? 0}`}
            icon={BanknotesIcon}
          />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-starlight">
            Recent Bookings
          </h2>
          <div className="mt-4 bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                <thead className="bg-gray-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                  {stats?.recentBookings.map((booking) => (
                    <tr key={booking._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-starlight">
                        {booking.user?.name ?? "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {booking.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
