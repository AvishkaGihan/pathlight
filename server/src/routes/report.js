import express from "express";
import { getLatestReport } from "../controllers/reportController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/latest", auth, getLatestReport);

export default router;
