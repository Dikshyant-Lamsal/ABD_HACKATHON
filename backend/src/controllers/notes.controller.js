import Note from '../models/Note.js';
import { extractTextFromPDF } from '../services/file.service.js';

export const uploadNote = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });

    const text = await extractTextFromPDF(req.file.path);

    const note = await Note.create({
      user: req.user._id,
      title: req.file.originalname,
      content: text
    });

    res.json({ msg: 'Note uploaded successfully', note });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
