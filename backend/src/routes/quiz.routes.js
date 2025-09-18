import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  generateQuiz,
  getQuiz,
  submitQuiz,
} from "../controllers/quiz.controller.js";

const router = Router();

/**
 * @route   POST /api/quiz/generate/:noteId
 * @desc    Generate quiz from a specific note
 * @access  Private
 */
router.post("/generate/:noteId", authMiddleware, generateQuiz);

/**
 * @route   GET /api/quiz/:quizId
 * @desc    Get a quiz by its ID (with questions)
 * @access  Private
 */
router.get("/:quizId", authMiddleware, getQuiz);

/**
 * @route   POST /api/quiz/submit/:quizId
 * @desc    Submit answers for a quiz and get results
 * @access  Private
 */
router.post("/submit/:quizId", authMiddleware, submitQuiz);

export default router;
