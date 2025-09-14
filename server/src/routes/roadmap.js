import express from "express";
import {
  createRoadmap,
  getUserRoadmaps,
  getRoadmap,
  deleteRoadmap,
} from "../controllers/roadmapController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createRoadmap);
router.get("/", auth, getUserRoadmaps);
router.get("/:id", auth, getRoadmap);
router.delete("/:id", auth, deleteRoadmap);

export default router;
