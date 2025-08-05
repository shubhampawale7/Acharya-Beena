import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Meta from "../components/common/Meta";
import Spinner from "../components/common/Spinner";
import {
  CalendarIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const DashboardPage = () => {
  // === STATE FOR BOOKINGS ===
  const [bookings, setBookings] = useState([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);

  // === STATE & LOGIC FOR PROFILE FORM (from old ProfilePage) ===
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
    }

    const fetchBookings = async () => {
      setIsLoadingBookings(true);
      try {
        const res = await fetch("/api/appointments/mybookings", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || "Could not fetch bookings.");
        setBookings(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoadingBookings(false);
      }
    };

    if (userInfo) {
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
    try {
      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");
      login(data);
      toast.success("Profile updated successfully!");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // Filter bookings into upcoming and past
  const upcomingBooking = bookings.find(
    (b) => new Date(b.appointmentDate) > new Date() && b.status === "Confirmed"
  );
  const pastBookings = bookings.filter((b) => b._id !== upcomingBooking?._id);

  return (
    <>
      <Meta title="My Dashboard | Acharya Beena" />
      <div className="bg-gray-50 dark:bg-transparent min-h-screen py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight">
            Welcome to your Dashboard, {userInfo?.name}!
          </h1>

          {/* Upcoming Appointment Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-starlight">
              Upcoming Appointment
            </h2>
            {isLoadingBookings ? (
              <Spinner />
            ) : upcomingBooking ? (
              <div className="mt-4 bg-white dark:bg-deep-space/50 dark:backdrop-blur-sm shadow-lg rounded-lg p-6 ring-1 ring-black/5 dark:ring-white/10">
                <div className="flex items-center">
                  <CalendarIcon className="h-8 w-8 text-indigo-600 dark:text-nebula-purple" />
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-starlight">
                      {upcomingBooking.serviceName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {formatDate(upcomingBooking.appointmentDate)}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                You have no upcoming appointments.
              </p>
            )}
          </div>

          {/* Main Content Grid */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column: Past Consultations */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-starlight">
                Consultation History
              </h2>
              <div className="mt-4 space-y-4">
                {isLoadingBookings ? (
                  <Spinner />
                ) : pastBookings.length > 0 ? (
                  pastBookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="bg-white dark:bg-deep-space/50 dark:backdrop-blur-sm p-4 rounded-lg shadow-md ring-1 ring-black/5 dark:ring-white/10 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-starlight">
                          {booking.serviceName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(booking.appointmentDate)}
                        </p>
                        <p className="text-xs font-mono text-gray-400">
                          Status: {booking.status}
                        </p>
                      </div>
                      {booking.reportUrl && (
                        <a
                          href={booking.reportUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-md bg-indigo-50 dark:bg-nebula-purple/20 px-3 py-2 text-sm font-semibold text-indigo-600 dark:text-nebula-purple shadow-sm hover:bg-indigo-100 dark:hover:bg-nebula-purple/30"
                        >
                          <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                          Download Report
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">
                    No past consultations found.
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Update Profile */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-starlight">
                Update Profile
              </h2>
              <div className="mt-4 bg-white dark:bg-deep-space/50 dark:backdrop-blur-sm shadow-md rounded-lg p-6 ring-1 ring-black/5 dark:ring-white/10">
                <form onSubmit={handleProfileSubmit} className="space-y-6">
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
                      className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-slate-800/50 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20"
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
                      className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-slate-800/50 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20"
                    />
                  </div>
                  <div className="border-t border-gray-200 dark:border-white/20 pt-6">
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
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-slate-800/50 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20"
                    />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-slate-800/50 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isUpdatingProfile}
                      className="rounded-md bg-indigo-600 dark:bg-nebula-purple px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-purple-600 disabled:opacity-50"
                    >
                      {isUpdatingProfile ? "Saving..." : "Save Profile"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
