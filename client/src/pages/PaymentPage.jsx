import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Meta from "../components/common/Meta";
import Spinner from "../components/common/Spinner";
import {
  LockClosedIcon,
  CalendarDaysIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/solid";

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

const PaymentPage = () => {
  const { id: bookingId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

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

    if (userInfo) fetchBooking();
  }, [bookingId, userInfo, navigate]);

  const handleMockPayment = async () => {
    setIsProcessing(true);
    // This is a mock API call for demonstration.
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      toast.success("Payment successful!");
      navigate(`/booking-success/${bookingId}`);
    } catch (error) {
      toast.error("Payment simulation failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
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
      <Meta title="Confirm & Pay | Acharya Beena" />
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="bg-transparent min-h-screen py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            variants={itemVariants}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-4xl font-serif">
              Confirm Your Consultation
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Please review your booking details and complete the secure payment
              to confirm your appointment.
            </p>
          </motion.div>

          {booking && (
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Left Column: Payment Details */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-3 p-8 rounded-3xl bg-white/60 dark:bg-deep-space/50 backdrop-blur-2xl ring-1 ring-black/5 dark:ring-white/10 shadow-2xl"
              >
                <div className="flex items-center gap-x-3">
                  <LockClosedIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-starlight">
                    Secure Payment
                  </h2>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  This is a simulated payment. Your card will not be charged.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Pay with Card
                  </div>
                  {/* Mock Credit Card Form Inputs */}
                  <div>
                    <label htmlFor="card-number" className="sr-only">
                      Card number
                    </label>
                    <input
                      type="text"
                      id="card-number"
                      placeholder="Card Number (mock)"
                      disabled
                      className="block w-full rounded-md border-0 py-2.5 bg-white/80 dark:bg-slate-800/50 text-gray-900 dark:text-starlight ring-1 ring-inset ring-gray-300 dark:ring-white/20 opacity-70 cursor-not-allowed"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM / YY (mock)"
                      disabled
                      className="block w-full rounded-md border-0 py-2.5 bg-white/80 dark:bg-slate-800/50 text-gray-900 dark:text-starlight ring-1 ring-inset ring-gray-300 dark:ring-white/20 opacity-70 cursor-not-allowed"
                    />
                    <input
                      type="text"
                      placeholder="CVC (mock)"
                      disabled
                      className="block w-full rounded-md border-0 py-2.5 bg-white/80 dark:bg-slate-800/50 text-gray-900 dark:text-starlight ring-1 ring-inset ring-gray-300 dark:ring-white/20 opacity-70 cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="mt-8 border-t border-black/10 dark:border-white/10 pt-6">
                  <motion.button
                    onClick={handleMockPayment}
                    disabled={isProcessing}
                    whileHover={{ scale: !isProcessing ? 1.05 : 1 }}
                    whileTap={{ scale: !isProcessing ? 0.95 : 1 }}
                    className="w-full inline-flex items-center justify-center h-12 rounded-full bg-nebula-purple px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-nebula-purple/20 hover:shadow-nebula-purple/40 disabled:opacity-60"
                  >
                    {isProcessing ? (
                      <Spinner size="sm" />
                    ) : (
                      `Pay ₹${booking.servicePrice}`
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* Right Column: Order Summary */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-2 p-8 rounded-3xl bg-white/60 dark:bg-deep-space/50 backdrop-blur-2xl ring-1 ring-black/5 dark:ring-white/10 shadow-2xl h-fit"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-starlight font-serif">
                  Booking Summary
                </h2>
                <div className="mt-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-2 rounded-full bg-nebula-purple/10">
                      <CalendarDaysIcon className="h-6 w-6 text-nebula-purple" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-starlight">
                        {booking.serviceName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(booking.appointmentDate)}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-black/10 dark:border-white/10 pt-6 space-y-2">
                    <div className="flex justify-between text-sm">
                      <dt className="text-gray-600 dark:text-gray-400">
                        Subtotal
                      </dt>
                      <dd className="text-gray-800 dark:text-gray-200">
                        ₹{booking.servicePrice}
                      </dd>
                    </div>
                    <div className="flex justify-between text-sm">
                      <dt className="text-gray-600 dark:text-gray-400">
                        Taxes & Fees
                      </dt>
                      <dd className="text-gray-800 dark:text-gray-200">
                        ₹0.00
                      </dd>
                    </div>
                    <div className="flex justify-between font-bold text-base">
                      <dt className="text-gray-900 dark:text-starlight">
                        Total
                      </dt>
                      <dd className="text-gray-900 dark:text-starlight">
                        ₹{booking.servicePrice}
                      </dd>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default PaymentPage;
