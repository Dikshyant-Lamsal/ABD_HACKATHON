import { askAI } from '../services/ai.service.js';
import Note from '../models/Note.js';

/**
 * Ask the chatbot a question based on a note's content
 * Requires `noteId` and `question` in body
 */
export const askChatbot = async (req, res) => {
  try {
    const { noteId, question } = req.body;
    if (!noteId || !question) return res.status(400).json({ msg: 'noteId and question required' });

    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ msg: 'Note not found' });

    const answer = await askAI(note.content, question);
    res.json({ question, answer });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
