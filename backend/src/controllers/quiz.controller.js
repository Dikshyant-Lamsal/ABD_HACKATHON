import Quiz from '../models/Quiz.js';
import { generateQuiz } from '../services/quiz.service.js';

export const createQuiz = async (req, res) => {
  try {
    const { noteId } = req.body;
    if (!noteId) return res.status(400).json({ msg: 'noteId required' });

    const quiz = await generateQuiz(noteId, req.user._id);

    res.json({ msg: 'Quiz generated successfully', quiz });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ user: req.user._id }).populate('questions');
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
