import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const handleGoogleCallback = async (req, res) => {
  try {
    // Generate JWT token
    const token = generateToken(req.user._id);

    const userObj = {
      userId: req.user._id,
      email: req.user.email,
      displayName: req.user.displayName,
    };

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const redirectUrl = `${frontendUrl}?token=${token}&user=${encodeURIComponent(
      JSON.stringify(userObj)
    )}`;

    res.redirect(redirectUrl);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Authentication failed",
      code: "AUTH_ERROR",
    });
  }
};
