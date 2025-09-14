import express from "express";
import {
  createRoadmap,
  getUserRoadmaps,
  getRoadmap,
  deleteRoadmap,
  downloadRoadmapPDF,
} from "../controllers/roadmapController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createRoadmap);
router.get("/", auth, getUserRoadmaps);
router.get("/:id", auth, getRoadmap);
router.get("/:id/pdf", auth, downloadRoadmapPDF);
router.delete("/:id", auth, deleteRoadmap);

export default router;
