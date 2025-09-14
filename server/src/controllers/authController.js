import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const handleGoogleCallback = async (req, res) => {
  try {
    // Generate JWT token
    const token = generateToken(req.user._id);

    res.json({
      success: true,
      token,
      user: {
        userId: req.user._id,
        email: req.user.email,
        displayName: req.user.displayName,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Authentication failed",
      code: "AUTH_ERROR",
    });
  }
};
