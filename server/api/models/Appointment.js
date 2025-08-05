import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference to the user who booked
    },
    serviceName: {
      type: String,
      required: true,
    },
    servicePrice: {
      type: Number,
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
    paymentInfo: {
      paymentId: { type: String },
      status: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending",
      },
      paidAt: { type: Date },
    },
    clientNotes: {
      // Optional notes from the client during booking
      type: String,
    },
    acharyaNotes: {
      // Optional notes added by Acharya Beena post-consultation
      type: String,
    },
    reportUrl: {
      type: String, // This will store the URL to the hosted PDF report
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
