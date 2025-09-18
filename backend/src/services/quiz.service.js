import OpenAI from "openai";
import Note from "../models/Note.js";
import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateQuizFromNote = async (noteId, userId) => {
  const note = await Note.findById(noteId);
  if (!note) throw new Error("Note not found");

  const prompt = `
  Generate 5 multiple-choice questions with 4 options each based on the following text:
  ${note.content}
  Return in JSON format:
  [{ "question": "...", "options": ["a","b","c","d"], "answer": "a" }]
  `;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  let quizData = [];
  try {
    quizData = JSON.parse(response.choices[0].message.content);
  } catch (err) {
    console.error("Failed to parse quiz JSON:", err.message);
  }

  const quiz = await Quiz.create({ user: userId, note: noteId });

  for (const q of quizData) {
    const question = await Question.create({
      text: q.question,
      options: q.options,
      answer: q.answer,
      quiz: quiz._id,
    });
    quiz.questions.push(question._id);
  }

  await quiz.save();
  return quiz.populate("questions");
};
