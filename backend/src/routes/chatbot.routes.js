import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { askChatbot } from "../controllers/chatbot.controller.js";

const router = Router();

// Ask chatbot with optional context
router.post("/ask", authMiddleware, askChatbot);

export default router;
