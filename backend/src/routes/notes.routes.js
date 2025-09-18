import { Router } from "express";
import  authMiddleware from "../middleware/auth.middleware.js";
import {
  uploadNote,
  getNotes,
  getNoteById,
} from "../controllers/notes.controller.js";

const router = Router();

// Upload new note
router.post("/upload", authMiddleware, uploadNote);

// Get all notes for logged-in user
router.get("/", authMiddleware, getNotes);

// Get specific note by ID
router.get("/:id", authMiddleware, getNoteById);

export default router;
