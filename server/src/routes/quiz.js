import express from "express";
import { submitQuiz } from "../controllers/quizController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/submit", auth, submitQuiz);

export default router;
