import React, { useState } from "react";

const QuizSection = () => {
  const [question, setQuestion] = useState("");

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold text-white mb-4">Quiz Section</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter quiz question..."
        className="w-full p-3 mb-4 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
      />
      <button className="bg-white/40 text-white py-2 px-4 rounded-xl font-semibold hover:bg-white/60 transition">
        Generate Answer
      </button>
    </div>
  );
};

export default QuizSection;