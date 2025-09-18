import React, { useState, useEffect } from "react";

const NotesInput = () => {
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);

  // Load saved notes from localStorage on mount
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setSavedNotes(storedNotes);
  }, []);

  // Save notes to localStorage
  const handleSaveNotes = () => {
    if (!notes.trim()) {
      setMessage("Note cannot be empty.");
      return;
    }

    const newNote = {
      id: Date.now(),
      content: notes,
      createdAt: new Date().toISOString(),
    };

    const updatedNotes = [newNote, ...savedNotes];
    setSavedNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    setNotes("");
    setMessage("Note saved!");
  };

  // Delete a note
  const handleDeleteNote = (id) => {
    const updatedNotes = savedNotes.filter((note) => note.id !== id);
    setSavedNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setMessage("Note deleted.");
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Type Your Notes</h2>
      
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Start typing your notes here..."
        className="w-full h-40 p-4 rounded-xl bg-black/40 backdrop-blur-sm border border-yellow-400/40 text-white resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400/70 transition"
      />
      
      <button
        onClick={handleSaveNotes}
        className="mt-4 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full shadow-lg hover:bg-yellow-300 transition-colors duration-300"
      >
        Save Note
      </button>
      
      {message && <p className="mt-2 text-yellow-300 text-sm">{message}</p>}

      <div className="mt-8">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">Your Saved Notes</h3>
        {savedNotes.length > 0 ? (
          <div className="max-h-64 overflow-y-auto space-y-4">
            {savedNotes.map((note) => (
              <div
                key={note.id}
                className="bg-black/40 backdrop-blur-sm p-4 rounded-xl shadow-md border border-yellow-400/30 text-white relative"
              >
                <p className="text-sm opacity-70 mb-2">
                  Saved on: {new Date(note.createdAt).toLocaleString()}
                </p>
                <p className="text-lg">{note.content}</p>
                
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">You have no saved notes yet.</p>
        )}
      </div>
    </div>
  );
};

export default NotesInput;
