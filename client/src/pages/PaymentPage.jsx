import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Meta from "../components/common/Meta";
import Spinner from "../components/common/Spinner";

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
        navigate("/my-bookings");
      } finally {
        setIsLoading(false);
      }
    };

    if (userInfo) fetchBooking();
  }, [bookingId, userInfo, navigate]);

  const handleMockPayment = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch(`/api/appointments/${bookingId}/pay`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Payment simulation failed.");
      }

      toast.success("Payment successful!");
      navigate(`/booking-success/${bookingId}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Meta title="Confirm & Pay | Acharya Beena" />
      <div className="bg-gray-50 dark:bg-transparent py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 lg:px-0">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-3xl">
            Payment Summary
          </h1>

          {booking && (
            <div className="mt-8 bg-white dark:bg-deep-space/50 dark:backdrop-blur-sm shadow-md rounded-lg p-8 ring-1 ring-black/5 dark:ring-white/10">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-starlight">
                {booking.serviceName}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {formatDate(booking.appointmentDate)}
              </p>
              <div className="mt-6 border-t border-gray-200 dark:border-white/20 pt-6 flex justify-between items-center">
                <p className="text-lg font-medium text-gray-900 dark:text-starlight">
                  Total Amount
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-starlight">
                  ₹{booking.servicePrice}
                </p>
              </div>
              <div className="mt-8">
                <button
                  onClick={handleMockPayment}
                  disabled={isProcessing}
                  className="w-full rounded-md bg-indigo-600 dark:bg-nebula-purple px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-purple-600 disabled:opacity-50"
                >
                  {isProcessing ? "Processing..." : "Simulate Secure Payment"}
                </button>
                <p className="text-center mt-4 text-xs text-gray-500 dark:text-gray-400">
                  This is a simulated payment. No real transaction will occur.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
