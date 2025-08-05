import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  // ... existing 'protect' function code ...
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

// New admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // User is an admin, proceed to the next middleware/controller
  } else {
    res.status(403); // Forbidden
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
