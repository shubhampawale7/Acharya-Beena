import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Meta from "../../components/common/Meta";
import Spinner from "../../components/common/Spinner";

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

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchAllBookings = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/appointments", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
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

    if (userInfo && userInfo.role === "admin") {
      fetchAllBookings();
    }
  }, [userInfo]);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const res = await fetch(`/api/appointments/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const updatedBooking = await res.json();
      if (!res.ok) {
        throw new Error("Failed to update status.");
      }

      setBookings((prevBookings) =>
        prevBookings.map((b) => (b._id === bookingId ? updatedBooking : b))
      );
      toast.success("Booking status updated!");
    } catch (error) {
      toast.error(error.message || "Could not update status.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Meta title="Bookings Management | Admin" />
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-starlight mb-6">
          All Bookings
        </h1>
        <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
              <thead className="bg-gray-50 dark:bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-starlight">
                        {booking.user.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {booking.user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {booking.serviceName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {formatDate(booking.appointmentDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={booking.status}
                        onChange={(e) =>
                          handleStatusChange(booking._id, e.target.value)
                        }
                        className={`p-1.5 text-xs font-medium rounded-full border-transparent focus:border-transparent focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-nebula-purple dark:focus:ring-offset-slate-800 ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-starlight">
                      ₹{booking.servicePrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href="#"
                        className="text-indigo-600 dark:text-nebula-purple hover:underline"
                      >
                        Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {bookings.length === 0 && !isLoading && (
          <div className="text-center py-10 bg-white dark:bg-slate-800 rounded-lg shadow-md mt-6 ring-1 ring-black/5 dark:ring-white/10">
            <p className="text-gray-500 dark:text-gray-400">
              No bookings have been made yet.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminBookingsPage;
