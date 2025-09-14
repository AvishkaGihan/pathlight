import express from "express";
import {
  getCareerRoadmap,
  getDetailedCareerRoadmap,
} from "../controllers/careerController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:careerId/roadmap", auth, getCareerRoadmap);
router.get("/:careerId/detailed-roadmap", auth, getDetailedCareerRoadmap);

export default router;
