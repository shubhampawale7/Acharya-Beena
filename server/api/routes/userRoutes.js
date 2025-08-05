import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  updateUserByAdmin,
  deleteUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// === Public Routes ===
router.post("/register", registerUser);
router.post("/login", loginUser);

// === Protected User Routes ===
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// === Protected Admin Routes ===
router.route("/").get(protect, admin, getAllUsers);
router
  .route("/:id")
  .get(protect, admin, getUserById) // <-- Add GET
  .put(protect, admin, updateUserByAdmin) // <-- Add PUT
  .delete(protect, admin, deleteUser);
// We can add GET and PUT here later for editing a single user by ID

export default router;
