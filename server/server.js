import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./api/config/db.js";
import userRoutes from "./api/routes/userRoutes.js";
import appointmentRoutes from "./api/routes/appointmentRoutes.js";
import adminRoutes from "./api/routes/adminRoutes.js";
import contactRoutes from "./api/routes/contactRoutes.js";

// --- Basic Setup ---
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

// --- Middlewares ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- API Routes ---
app.get("/", (req, res) => {
  res.send("Welcome to Acharya Beena API!");
});

app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

// --- Start Server ---
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
  );
});
