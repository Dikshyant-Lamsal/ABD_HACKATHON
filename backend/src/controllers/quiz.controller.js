import Quiz from '../models/Quiz.js';
import { generateQuizFromNote } from '../services/quiz.service.js';

/**
 * Generate quiz from a note
 */
export const generateQuiz = async (req, res) => {
  try {
    const { noteId } = req.params;
    const quiz = await generateQuizFromNote(noteId, req.user._id);
    res.json({ msg: 'Quiz generated successfully', quiz });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/**
 * Get quiz by ID
 */
export const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ _id: req.params.quizId, user: req.user._id })
      .populate('questions');
    if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/**
 * Submit quiz answers
 * `answers` should be an object: { questionId: "userAnswer" }
 */
export const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    const quiz = await Quiz.findOne({ _id: req.params.quizId, user: req.user._id })
      .populate('questions');

    if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });

    let score = 0;
    const results = quiz.questions.map(q => {
      const userAnswer = answers[q._id];
      const isCorrect = userAnswer === q.answer;
      if (isCorrect) score++;
      return { question: q.text, userAnswer, correctAnswer: q.answer, isCorrect };
    });

    res.json({ score, total: quiz.questions.length, results });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
