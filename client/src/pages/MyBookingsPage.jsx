import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Meta from "../components/common/Meta";
import Spinner from "../components/common/Spinner";
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  DocumentArrowDownIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/solid";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const getStatusInfo = (status) => {
  switch (status) {
    case "Confirmed":
      return {
        text: "text-green-700 dark:text-green-400",
        bg: "bg-green-50 dark:bg-green-500/10",
        icon: CheckCircleIcon,
      };
    case "Completed":
      return {
        text: "text-blue-700 dark:text-blue-400",
        bg: "bg-blue-50 dark:bg-blue-500/10",
        icon: CheckCircleIcon,
      };
    case "Pending":
      return {
        text: "text-yellow-700 dark:text-yellow-400",
        bg: "bg-yellow-50 dark:bg-yellow-500/10",
        icon: ClockIcon,
      };
    case "Cancelled":
      return {
        text: "text-red-700 dark:text-red-400",
        bg: "bg-red-50 dark:bg-red-500/10",
        icon: NoSymbolIcon,
      };
    default:
      return {
        text: "text-gray-700 dark:text-gray-400",
        bg: "bg-gray-100 dark:bg-gray-600",
        icon: ClockIcon,
      };
  }
};

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
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
          servicePrice: 2500,
        },
        {
          _id: 2,
          serviceName: "Numerology Report",
          appointmentDate: new Date(
            Date.now() - 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
          status: "Completed",
          servicePrice: 1500,
          reportUrl: "#",
        },
        {
          _id: 3,
          serviceName: "Vastu Shastra Consultation",
          appointmentDate: new Date(
            Date.now() - 60 * 24 * 60 * 60 * 1000
          ).toISOString(),
          status: "Completed",
          servicePrice: 5100,
          reportUrl: "#",
        },
      ];
      setBookings(mockData);
      setIsLoading(false);
    };

    if (userInfo) {
      fetchBookings();
    }
  }, [userInfo]);

  const upcomingBookings = bookings.filter(
    (b) => new Date(b.appointmentDate) > new Date()
  );
  const pastBookings = bookings.filter(
    (b) => new Date(b.appointmentDate) <= new Date()
  );

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-transparent">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Meta title="My Bookings | Acharya Beena" />
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="bg-transparent min-h-screen py-24 sm:py-32"
      >
        <div className="mx-auto max-w-4xl px-4 lg:px-0">
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-4xl font-serif">
              My Bookings
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              View your upcoming consultations and access your appointment
              history.
            </p>
          </motion.div>

          <div className="mt-12">
            {bookings.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="text-center py-16 px-6 bg-white/60 dark:bg-deep-space/50 backdrop-blur-lg rounded-2xl shadow-xl ring-1 ring-black/5 dark:ring-white/10"
              >
                <CalendarDaysIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-starlight">
                  No Bookings Found
                </h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  You have not scheduled any appointments yet.
                </p>
                <Link to="/services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 inline-block rounded-full bg-nebula-purple px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-opacity-90"
                  >
                    View Services & Book Now
                  </motion.button>
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-12">
                {/* Upcoming Bookings Section */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-starlight font-serif">
                    Upcoming Consultations
                  </h2>
                  <div className="mt-4 space-y-6">
                    {upcomingBookings.length > 0 ? (
                      upcomingBookings.map((booking) => (
                        <div
                          key={booking._id}
                          className="p-6 rounded-2xl bg-white/60 dark:bg-deep-space/50 backdrop-blur-lg ring-1 ring-black/5 dark:ring-white/10 shadow-xl"
                        >
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-starlight">
                                {booking.serviceName}
                              </h3>
                              <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
                                {formatDate(booking.appointmentDate)}
                              </p>
                            </div>
                            <div className="mt-4 sm:mt-0 flex flex-col sm:items-end">
                              <p className="text-xl font-bold text-gray-900 dark:text-starlight">
                                ₹{booking.servicePrice}
                              </p>
                              <span
                                className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  getStatusInfo(booking.status).bg
                                } ${getStatusInfo(booking.status).text}`}
                              >
                                {booking.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">
                        No upcoming appointments scheduled.
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Past Bookings Section */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-starlight font-serif">
                    Consultation History
                  </h2>
                  <div className="mt-4 flow-root">
                    <div className="-my-4 divide-y divide-gray-200 dark:divide-white/10">
                      {pastBookings.length > 0 ? (
                        pastBookings.map((booking, index) => {
                          const status = getStatusInfo(booking.status);
                          const StatusIcon = status.icon;
                          return (
                            <motion.div
                              key={booking._id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              className="py-4 flex flex-col sm:flex-row justify-between sm:items-center"
                            >
                              <div className="flex items-center gap-4">
                                <div
                                  className={`flex-shrink-0 p-2 rounded-full ${status.bg}`}
                                >
                                  <StatusIcon
                                    className={`h-5 w-5 ${status.text}`}
                                  />
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-800 dark:text-starlight">
                                    {booking.serviceName}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {formatDate(booking.appointmentDate)}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-4 sm:mt-0">
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
                              </div>
                            </motion.div>
                          );
                        })
                      ) : (
                        <p className="py-4 text-gray-600 dark:text-gray-400">
                          No past consultations found.
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};
// A stand-in for the ClockIcon if it's not imported elsewhere.
const ClockIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default MyBookingsPage;
