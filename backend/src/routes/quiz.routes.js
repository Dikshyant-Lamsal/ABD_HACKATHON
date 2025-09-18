import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  generateQuiz,
  getQuiz,
  submitQuiz,
} from "../controllers/quiz.controller.js";

const router = Router();

// Generate quiz from a note
router.post("/generate/:noteId", authMiddleware, generateQuiz);

// Get quiz by ID
router.get("/:quizId", authMiddleware, getQuiz);

// Submit answers for a quiz
router.post("/submit/:quizId", authMiddleware, submitQuiz);

export default router;
