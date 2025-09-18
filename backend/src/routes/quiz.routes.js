import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { generateQuiz, getQuiz, submitQuiz } from '../controllers/quiz.controller.js';

const router = Router();

router.post('/generate/:noteId', authMiddleware, generateQuiz);
router.get('/:quizId', authMiddleware, getQuiz);
router.post('/submit/:quizId', authMiddleware, submitQuiz);

export default router;
