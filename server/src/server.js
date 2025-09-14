import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import passport from "passport";
import connectDB from "./config/database.js";

// Import routes
import authRoutes from "./routes/auth.js";
import quizRoutes from "./routes/quiz.js";
import reportRoutes from "./routes/report.js";
import careerRoutes from "./routes/career.js";
import roadmapRoutes from "./routes/roadmap.js";
import configurePassport from "./config/passport.js";

configurePassport();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/quiz", quizRoutes);
app.use("/api/v1/report", reportRoutes);
app.use("/api/v1/careers", careerRoutes);
app.use("/api/v1/roadmaps", roadmapRoutes);

// Health check endpoint
app.get("/api/v1/health", (req, res) => {
  res.json({ success: true, message: "Pathlight API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    code: "INTERNAL_SERVER_ERROR",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
    code: "ENDPOINT_NOT_FOUND",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
