import Appointment from "../models/Appointment.js";
import User from "../models/User.js"; // We might need this for populating

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
  // ... existing createAppointment function ...
  try {
    const { serviceName, servicePrice, appointmentDate, clientNotes } =
      req.body;
    if (!serviceName || !servicePrice || !appointmentDate) {
      res.status(400);
      throw new Error("Missing required appointment details");
    }
    const appointment = new Appointment({
      user: req.user._id,
      serviceName,
      servicePrice,
      appointmentDate,
      clientNotes,
    });
    const createdAppointment = await appointment.save();
    res.status(201).json(createdAppointment);
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

// @desc    Get logged-in user's bookings
// @route   GET /api/appointments/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Appointment.find({ user: req.user._id }).sort({
      appointmentDate: -1,
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get all bookings
// @route   GET /api/appointments
// @access  Private/Admin
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Appointment.find({})
      .populate("user", "id name email") // Populate with user's id, name, and email
      .sort({ appointmentDate: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateBookingByAdmin = async (req, res) => {
  try {
    const booking = await Appointment.findById(req.params.id);

    if (booking) {
      // We can update more fields here later if needed
      booking.status = req.body.status || booking.status;

      // Example of updating payment status if booking is confirmed
      if (req.body.status === "Confirmed") {
        booking.paymentInfo.status = "Paid";
        booking.paymentInfo.paidAt = Date.now();
      }

      const updatedBooking = await booking.save();
      res.status(200).json(updatedBooking);
    } else {
      res.status(404);
      throw new Error("Booking not found");
    }
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

// @desc    Get a single booking by ID
// @route   GET /api/appointments/:id
// @access  Private
const getBookingById = async (req, res) => {
  try {
    const booking = await Appointment.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (booking) {
      // Security check: Ensure the user owns this booking OR is an admin
      if (
        booking.user._id.toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
      ) {
        res.status(403); // Forbidden
        throw new Error("Not authorized to view this booking");
      }
      res.status(200).json(booking);
    } else {
      res.status(404);
      throw new Error("Booking not found");
    }
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

// @desc    Update booking to paid (simulated)
// @route   PUT /api/appointments/:id/pay
// @access  Private
const confirmBookingPayment = async (req, res) => {
  try {
    const booking = await Appointment.findById(req.params.id);

    if (booking) {
      // Security check: Make sure the user owns this booking
      if (booking.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("User not authorized to update this booking");
      }

      booking.status = "Confirmed";
      booking.paymentInfo.status = "Paid";
      booking.paymentInfo.paidAt = Date.now();
      // In a real app, you'd save a real payment ID here
      booking.paymentInfo.paymentId = `simulated_${Date.now()}`;

      const updatedBooking = await booking.save();
      res.status(200).json(updatedBooking);
    } else {
      res.status(404);
      throw new Error("Booking not found");
    }
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

// @desc    Add a report URL to a booking
// @route   PUT /api/appointments/:id/report
// @access  Private/Admin
const addReportToBooking = async (req, res) => {
  try {
    const { reportUrl } = req.body;
    const booking = await Appointment.findById(req.params.id);

    if (booking) {
      booking.reportUrl = reportUrl;
      const updatedBooking = await booking.save();
      res.status(200).json(updatedBooking);
    } else {
      res.status(404);
      throw new Error("Booking not found");
    }
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

// Add the new function to the export list at the bottom
export {
  createAppointment,
  getMyBookings,
  getAllBookings,
  updateBookingByAdmin,
  getBookingById,
  confirmBookingPayment,
  addReportToBooking, // <-- Add this
};
