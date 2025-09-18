import React, { useState } from "react";

const NotesInput = () => {
  const [notes, setNotes] = useState("");

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold text-white mb-4">Type Your Notes</h2>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Start typing your notes here..."
        className="w-full h-48 p-4 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-white/50 transition"
      />
    </div>
  );
};

export default NotesInput;
