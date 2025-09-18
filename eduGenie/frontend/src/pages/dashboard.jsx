import React from "react";
import PDFUpload from "./PDFUpload";
import NotesInput from "./NotesInput";
import AIBot from "./AIBot";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 p-6">
      <h1 className="text-5xl font-extrabold text-white text-center mb-10 drop-shadow-lg">
        EduGenie Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-300">
          <PDFUpload />
        </div>

        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-300">
          <NotesInput />
        </div>

        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-300">
          <AIBot />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;