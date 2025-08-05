// server/api/controllers/adminController.js
import User from "../models/User.js";
import Appointment from "../models/Appointment.js";

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const bookingCount = await Appointment.countDocuments();

    const revenueData = await Appointment.aggregate([
      { $match: { status: { $in: ["Confirmed", "Completed"] } } },
      { $group: { _id: null, totalRevenue: { $sum: "$servicePrice" } } },
    ]);
    const totalRevenue =
      revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    const recentBookings = await Appointment.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name");

    res.status(200).json({
      userCount,
      bookingCount,
      totalRevenue,
      recentBookings,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export { getDashboardStats };
