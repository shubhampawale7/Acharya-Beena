import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Meta from "../../components/common/Meta";
import Spinner from "../../components/common/Spinner";
import { motion } from "framer-motion";
import {
  CalendarDaysIcon,
  CurrencyRupeeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

// --- Helper Functions ---

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleString("en-US", options);
};

const getStatusPillClasses = (status) => {
  switch (status) {
    case "Confirmed":
      return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 ring-green-600/20";
    case "Completed":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 ring-blue-600/20";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 ring-yellow-600/20";
    case "Cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 ring-red-600/20";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300 ring-gray-500/20";
  }
};

// --- Main Component ---

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo } = useAuth();

  // State for new features
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

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
    // Original functionality is preserved
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

  // Memoized filtering and searching for efficiency
  const filteredBookings = useMemo(() => {
    return bookings
      .filter((booking) => {
        if (statusFilter === "All") return true;
        return booking.status === statusFilter;
      })
      .filter((booking) => {
        const term = searchTerm.toLowerCase();
        return (
          booking.user.name.toLowerCase().includes(term) ||
          booking.user.email.toLowerCase().includes(term)
        );
      });
  }, [bookings, statusFilter, searchTerm]);

  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBookings, currentPage]);

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);

  const stats = useMemo(
    () => ({
      totalBookings: bookings.length,
      pendingBookings: bookings.filter((b) => b.status === "Pending").length,
      totalRevenue: bookings
        .filter((b) => b.status === "Completed")
        .reduce((sum, b) => sum + b.servicePrice, 0),
    }),
    [bookings]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full pt-20">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Meta title="Bookings Management | Admin" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-starlight font-serif">
          Bookings Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon={CalendarDaysIcon}
            title="Total Bookings"
            value={stats.totalBookings}
          />
          <StatCard
            icon={ClockIcon}
            title="Pending Appointments"
            value={stats.pendingBookings}
          />
          <StatCard
            icon={CurrencyRupeeIcon}
            title="Completed Revenue"
            value={`₹${stats.totalRevenue.toLocaleString("en-IN")}`}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by client name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 block rounded-md border-0 py-2.5 px-4 bg-white/80 dark:bg-slate-800/50 text-gray-900 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20 focus:ring-2 focus:ring-inset focus:ring-nebula-purple transition"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-auto block rounded-md border-0 py-2.5 px-4 bg-white/80 dark:bg-slate-800/50 text-gray-900 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20 focus:ring-2 focus:ring-inset focus:ring-nebula-purple transition"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="bg-white dark:bg-deep-space/50 shadow-xl rounded-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
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
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                {paginatedBookings.map((booking) => (
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
                      <StatusSelect
                        booking={booking}
                        onStatusChange={handleStatusChange}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-starlight">
                      ₹{booking.servicePrice.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-200 dark:divide-slate-700">
            {paginatedBookings.map((booking) => (
              <div key={booking._id} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-starlight">
                      {booking.user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {booking.user.email}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-gray-900 dark:text-starlight">
                    ₹{booking.servicePrice.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {booking.serviceName}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(booking.appointmentDate)}
                </div>
                <div>
                  <StatusSelect
                    booking={booking}
                    onStatusChange={handleStatusChange}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-slate-700 dark:text-gray-300 rounded-md shadow-sm hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-slate-700 dark:text-gray-300 rounded-md shadow-sm hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {filteredBookings.length === 0 && !isLoading && (
          <div className="text-center py-10 bg-white dark:bg-deep-space/50 rounded-lg shadow-md mt-6 ring-1 ring-black/5 dark:ring-white/10">
            <h3 className="text-lg font-medium text-gray-900 dark:text-starlight">
              No Bookings Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Try adjusting your search or filter.
            </p>
          </div>
        )}
      </motion.div>
    </>
  );
};

// --- Sub-components for better organization ---
const StatCard = ({ icon: Icon, title, value }) => (
  <div className="bg-white dark:bg-deep-space/50 p-6 rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 flex items-center gap-4">
    <div className="p-3 bg-nebula-purple/10 rounded-full">
      <Icon className="h-6 w-6 text-nebula-purple" />
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-starlight">
        {value}
      </p>
    </div>
  </div>
);

const StatusSelect = ({ booking, onStatusChange }) => (
  <select
    value={booking.status}
    onChange={(e) => onStatusChange(booking._id, e.target.value)}
    className={`w-full sm:w-auto text-xs font-semibold p-2 rounded-lg border-transparent focus:ring-2 focus:ring-offset-2 focus:ring-nebula-purple dark:focus:ring-offset-slate-800 transition ${getStatusPillClasses(
      booking.status
    )}`}
    onClick={(e) => e.stopPropagation()}
  >
    <option value="Pending">Pending</option>
    <option value="Confirmed">Confirmed</option>
    <option value="Completed">Completed</option>
    <option value="Cancelled">Cancelled</option>
  </select>
);

export default AdminBookingsPage;
