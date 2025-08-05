// server/api/routes/adminRoutes.js
import express from "express";
const router = express.Router();
import { getDashboardStats } from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/stats").get(protect, admin, getDashboardStats);

export default router;
