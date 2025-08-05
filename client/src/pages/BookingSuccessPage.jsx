import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Meta from "../components/common/Meta";
import Spinner from "../components/common/Spinner";
import Starburst from "../components/common/Starburst";
// FIX: Changed CalendarPlusIcon to the correct name: CalendarDaysIcon
import { CheckCircleIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";

// Helper to format date for display
const formatDate = (dateString) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleString("en-US", options);
};

// Helper to generate an .ics calendar file
const generateIcsFile = (booking) => {
  if (!booking) {
    toast.error("Booking details not available.");
    return;
  }
  const startDate = new Date(booking.appointmentDate);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Assume 1 hour duration

  // Format for ICS file (YYYYMMDDTHHMMSSZ)
  const toIcsFormat = (date) =>
    date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `UID:${booking._id}@acharyabeena.com`,
    `SUMMARY:Astrology Consultation: ${booking.serviceName}`,
    `DESCRIPTION:Your upcoming consultation with Acharya Beena for ${booking.serviceName}.`,
    `DTSTAMP:${toIcsFormat(new Date())}`,
    `DTSTART:${toIcsFormat(startDate)}`,
    `DTEND:${toIcsFormat(endDate)}`,
    "LOCATION:Online Consultation",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");

  const blob = new Blob([icsContent], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "appointment.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url); // Clean up the object URL
};

const BookingSuccessPage = () => {
  const { id: bookingId } = useParams();
  const { userInfo } = useAuth();
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      setIsLoading(true);
      // MOCK DATA for demonstration - replace with your fetch call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockBooking = {
        _id: bookingId,
        serviceName: "Vedic Horoscope Reading",
        appointmentDate: new Date(
          Date.now() + 5 * 24 * 60 * 60 * 1000
        ).toISOString(),
        servicePrice: 2500,
      };
      setBooking(mockBooking);
      setIsLoading(false);
    };

    if (userInfo) {
      fetchBooking();
    } else {
      // Handle case where user is not logged in but hits this page
      setIsLoading(false);
      toast.error("You must be logged in to view this page.");
    }
  }, [bookingId, userInfo]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-transparent">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!userInfo || !booking) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center bg-transparent">
        <h1 className="text-2xl font-bold text-red-500">
          Could not load booking details.
        </h1>
        <Link to="/" className="mt-4 text-indigo-500 hover:underline">
          Go back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <Meta title="Booking Confirmed! | Acharya Beena" />
      <div className="relative bg-transparent min-h-screen flex items-center justify-center py-24 sm:py-32 px-6">
        <Starburst />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative text-center w-full max-w-2xl bg-white/60 dark:bg-deep-space/50 backdrop-blur-2xl rounded-3xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 p-8 sm:p-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.5,
            }}
          >
            <CheckCircleIcon className="h-20 w-20 text-green-500 dark:text-green-400 mx-auto" />
          </motion.div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-4xl font-serif">
            Booking Confirmed!
          </h1>
          <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
            Thank you, {userInfo.name}. You will receive an email confirmation
            shortly with all the details of your upcoming consultation.
          </p>

          <div className="mt-8 text-left border-t border-black/10 dark:border-white/10 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-starlight font-serif">
              Booking Summary
            </h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div className="flex justify-between items-start">
                <dt className="text-gray-500 dark:text-gray-400">Service:</dt>
                <dd className="font-semibold text-gray-900 dark:text-starlight text-right">
                  {booking.serviceName}
                </dd>
              </div>
              <div className="flex justify-between items-start">
                <dt className="text-gray-500 dark:text-gray-400">
                  Date & Time:
                </dt>
                <dd className="font-semibold text-gray-900 dark:text-starlight text-right">
                  {formatDate(booking.appointmentDate)}
                </dd>
              </div>
              <div className="flex justify-between items-start">
                <dt className="text-gray-500 dark:text-gray-400">
                  Total Paid:
                </dt>
                <dd className="font-semibold text-gray-900 dark:text-starlight text-right">
                  ₹{booking.servicePrice.toLocaleString("en-IN")}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.button
              onClick={() => generateIcsFile(booking)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-x-2 rounded-full bg-white/80 dark:bg-white/10 px-4 py-3 text-sm font-semibold text-gray-800 dark:text-starlight shadow-sm ring-1 ring-inset ring-black/10 dark:ring-white/20 hover:bg-gray-50 dark:hover:bg-white/20"
            >
              {/* FIX: Changed CalendarPlusIcon to the correct name: CalendarDaysIcon */}
              <CalendarDaysIcon className="h-5 w-5" />
              Add to Calendar
            </motion.button>
            <Link to="/my-bookings">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full rounded-full bg-nebula-purple px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-opacity-90"
              >
                View All Bookings
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default BookingSuccessPage;
