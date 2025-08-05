import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400); // Bad Request
      throw new Error("User already exists");
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      const token = generateToken(res, user._id);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    // Ensure a status is set before sending the response
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ message: error.message });
  }
};

// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and if password matches
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(res, user._id);

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token,
      });
    } else {
      res.status(401); // Unauthorized
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ message: error.message });
  }
};
const getUserProfile = async (req, res) => {
  // The 'protect' middleware has already found the user and attached it to the request
  if (req.user) {
    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

const updateUserProfile = async (req, res) => {
  // The 'protect' middleware has already found the user
  const user = await User.findById(req.user._id);

  if (user) {
    // Update fields if they are provided in the request body
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      // The pre-save hook in the User model will automatically hash this
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    // Generate a new token in case user info in the token payload needs to be updated
    const token = generateToken(res, updatedUser._id);

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: token,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password"); // Find all users, exclude password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      // Prevent admin from deleting themselves
      if (req.user._id.equals(user._id)) {
        res.status(400);
        throw new Error("Cannot delete admin user");
      }

      await User.deleteOne({ _id: user._id });
      res.status(200).json({ message: "User removed successfully" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

// @desc    Update user by ID
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUserByAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;

      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

// Add the new functions to the export list at the bottom
export {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById, // <-- Add this
  updateUserByAdmin, // <-- Add this
};
