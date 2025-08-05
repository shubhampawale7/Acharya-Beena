import express from "express";
const router = express.Router();
import {
  createAppointment,
  getMyBookings,
  getAllBookings,
  updateBookingByAdmin,
  getBookingById,
  confirmBookingPayment,
  addReportToBooking,
} from "../controllers/appointmentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// Create a booking (user) & Get all bookings (admin)
router
  .route("/")
  .post(protect, createAppointment)
  .get(protect, admin, getAllBookings);

// Get a logged-in user's own bookings
router.route("/mybookings").get(protect, getMyBookings);

// User confirms payment for their booking
router.route("/:id/pay").put(protect, confirmBookingPayment);

// Admin adds a report URL to a booking
router.route("/:id/report").put(protect, admin, addReportToBooking);

// Get a single booking (user or admin) & Update a booking (admin only)
router
  .route("/:id")
  .get(protect, getBookingById)
  .put(protect, admin, updateBookingByAdmin);

export default router;
