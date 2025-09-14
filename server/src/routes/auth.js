import express from "express";
import passport from "passport";
import { handleGoogleCallback } from "../controllers/authController.js";

const router = express.Router();

// Initiate Google OAuth flow
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  handleGoogleCallback
);

export default router;
