import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Meta from "../components/common/Meta";
import Spinner from "../components/common/Spinner";

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

const getStatusColor = (status) => {
  switch (status) {
    case "Confirmed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "Completed":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "Cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200";
  }
};

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/appointments/mybookings", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Could not fetch bookings.");
        }
        setBookings(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (userInfo) {
      fetchBookings();
    }
  }, [userInfo]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Meta title="My Bookings | Acharya Beena" />
      <div className="bg-gray-50 dark:bg-transparent min-h-screen py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-0">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-3xl">
            My Bookings
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            View your appointment history and upcoming consultations.
          </p>

          <div className="mt-8 space-y-6">
            {bookings.length === 0 ? (
              <div className="text-center py-16 px-6 bg-white dark:bg-deep-space/50 dark:backdrop-blur-sm rounded-lg shadow-md ring-1 ring-black/5 dark:ring-white/10">
                <h3 className="text-lg font-medium text-gray-900 dark:text-starlight">
                  No Bookings Found
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  You have not scheduled any appointments yet.
                </p>
                <Link
                  to="/services"
                  className="mt-6 inline-block rounded-md bg-indigo-600 dark:bg-nebula-purple px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 dark:hover:bg-purple-600"
                >
                  View Services & Book Now
                </Link>
              </div>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white dark:bg-deep-space/50 dark:backdrop-blur-sm shadow-md rounded-lg p-6 ring-1 ring-black/5 dark:ring-white/10"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-starlight">
                        {booking.serviceName}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {formatDate(booking.appointmentDate)}
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex flex-col sm:items-end">
                      <p className="text-lg font-bold text-gray-900 dark:text-starlight">
                        ₹{booking.servicePrice}
                      </p>
                      <span
                        className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  {booking.clientNotes && (
                    <div className="mt-4 border-t border-gray-200 dark:border-white/20 pt-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Your Notes:
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {booking.clientNotes}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBookingsPage;
