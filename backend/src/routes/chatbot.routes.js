import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { askChatbot } from '../controllers/chatbot.controller.js';

const router = Router();

router.post('/ask', authMiddleware, askChatbot);

export default router;
