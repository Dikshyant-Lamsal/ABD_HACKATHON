import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { uploadPDF } from '../middleware/upload.middleware.js';
import { uploadNote, getNotes, getNoteById } from '../controllers/notes.controller.js';

const router = Router();

// Upload new note
router.post('/upload', authMiddleware, uploadPDF.single('file'), uploadNote);

// Get all notes
router.get('/', authMiddleware, getNotes);

// Get specific note by ID
router.get('/:id', authMiddleware, getNoteById);

export default router;
