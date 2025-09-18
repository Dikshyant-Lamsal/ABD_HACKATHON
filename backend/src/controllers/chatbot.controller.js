import { askAI } from "../services/ai.service.js";
import Note from "../models/Note.js";

export const askChatbot = async (req, res) => {
  try {
    const { noteId, question } = req.body;
    if (!noteId || !question) {
      return res.status(400).json({ msg: "noteId and question required" });
    }

    const note = await Note.findOne({ _id: noteId, user: req.user._id });
    if (!note) return res.status(404).json({ msg: "Note not found" });

    const answer = await askAI(note.content, question);

    res.json({ question, answer });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
