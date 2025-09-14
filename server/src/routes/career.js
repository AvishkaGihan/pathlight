import express from "express";
import { getCareerRoadmap } from "../controllers/careerController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:careerId/roadmap", auth, getCareerRoadmap);

export default router;
