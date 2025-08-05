import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Meta from "../components/common/Meta";
import Spinner from "../components/common/Spinner";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const formatDate = (dateString) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const BookingSuccessPage = () => {
  const { id: bookingId } = useParams();
  const { userInfo } = useAuth();
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/appointments/${bookingId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || "Could not fetch booking details.");
        setBooking(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (userInfo) fetchBooking();
  }, [bookingId, userInfo]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Meta title="Booking Confirmed! | Acharya Beena" />
      <div className="bg-gray-50 dark:bg-transparent py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 lg:px-0">
          <div className="text-center bg-white dark:bg-deep-space/50 dark:backdrop-blur-sm shadow-md rounded-lg p-8 ring-1 ring-black/5 dark:ring-white/10">
            <CheckCircleIcon className="h-16 w-16 text-green-500 dark:text-green-400 mx-auto" />
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-3xl">
              Thank You! Your Booking is Confirmed.
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              You will receive an email confirmation shortly. Please check your
              spam folder if you don't see it.
            </p>

            {booking && (
              <div className="mt-8 text-left border-t border-gray-200 dark:border-white/20 pt-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-starlight">
                  Booking Summary
                </h2>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">
                      Service:
                    </dt>
                    <dd className="font-medium text-gray-900 dark:text-starlight">
                      {booking.serviceName}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">
                      Date & Time:
                    </dt>
                    <dd className="font-medium text-gray-900 dark:text-starlight">
                      {formatDate(booking.appointmentDate)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">
                      Total Paid:
                    </dt>
                    <dd className="font-medium text-gray-900 dark:text-starlight">
                      ₹{booking.servicePrice}
                    </dd>
                  </div>
                </dl>
              </div>
            )}

            <div className="mt-8">
              <Link
                to="/my-bookings"
                className="w-full rounded-md bg-indigo-600 dark:bg-nebula-purple px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-purple-600"
              >
                View All My Bookings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingSuccessPage;
