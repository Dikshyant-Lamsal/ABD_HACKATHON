import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-6">
      {/* Hero Section */}
      <div className="text-center max-w-2xl mb-10">
        <h1 className="text-6xl font-extrabold text-blue-700 mb-4">
          EduGenie ✨
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your AI-powered learning companion that transforms overwhelming study
          materials into{" "}
          <span className="font-semibold">
            personalized summaries, quizzes, and flashcards
          </span>.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/login"
            className="px-6 py-3 rounded-2xl text-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 rounded-2xl text-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
