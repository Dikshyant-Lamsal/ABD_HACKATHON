import Quiz from "../models/Quiz.js";
import { generateQuizFromNote } from "../services/quiz.service.js";

// Generate quiz from a note
export const generateQuiz = async (req, res) => {
  try {
    const { noteId } = req.params;
    const quiz = await generateQuizFromNote(noteId, req.user._id);

    res.json({ msg: "Quiz generated successfully", quiz });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get quiz by ID
export const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({
      _id: req.params.quizId,
      user: req.user._id,
    }).populate("questions");

    if (!quiz) return res.status(404).json({ msg: "Quiz not found" });

    res.json(quiz);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Submit answers for a quiz
export const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body; // { questionId: "userAnswer" }

    const quiz = await Quiz.findOne({
      _id: req.params.quizId,
      user: req.user._id,
    }).populate("questions");

    if (!quiz) return res.status(404).json({ msg: "Quiz not found" });

    let score = 0;
    let results = [];

    for (const question of quiz.questions) {
      const userAnswer = answers[question._id];
      const isCorrect = userAnswer === question.answer;
      if (isCorrect) score++;

      results.push({
        question: question.text,
        userAnswer,
        correctAnswer: question.answer,
        isCorrect,
      });
    }

    res.json({ score, total: quiz.questions.length, results });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
