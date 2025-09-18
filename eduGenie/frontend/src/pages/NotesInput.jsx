import React, { useState, useEffect } from "react";

// The component now accepts `userId` as a prop.
const NotesInput = ({ userId }) => {
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // The useEffect hook now depends on the `userId` prop.
  // It will run whenever the userId changes (e.g., after login/logout).
  useEffect(() => {
    // Only fetch notes if a valid userId is provided
    if (userId) {
      fetchNotes();
    } else {
      // If no userId is present, we are not logged in.
      // This resets the state and displays a login prompt.
      setSavedNotes([]);
      setLoading(false);
      setMessage("Please log in to see your notes.");
    }
  }, [userId]); // The dependency array correctly tracks the userId prop

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/notes/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setSavedNotes(data);
      } else {
        const errorData = await response.json();
        setMessage(`Error fetching notes: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      setMessage("Failed to connect to server to fetch notes.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!userId) {
      setMessage("User not authenticated. Please log in.");
      return;
    }

    setMessage("Saving...");
    try {
      const response = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: notes, userId: userId }),
      });

      if (response.ok) {
        setMessage("Notes saved successfully!");
        setNotes(""); // Clear the input after saving
        fetchNotes(); // Fetch updated notes list
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Failed to save notes:", error);
      setMessage("Failed to connect to server. Please try again.");
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold text-white mb-4">Type Your Notes</h2>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Start typing your notes here..."
        className="w-full h-48 p-4 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-white/50 transition"
      />
      <button
        onClick={handleSaveNotes}
        className="mt-4 px-6 py-3 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:bg-purple-100 transition-colors duration-300"
      >
        Save Notes
      </button>
      {message && <p className="mt-2 text-white text-sm">{message}</p>}

      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Your Saved Notes</h3>
        {(() => {
          if (loading) {
            return <p className="text-white">Loading notes...</p>;
          } else if (savedNotes.length > 0) {
            return (
              <div className="max-h-64 overflow-y-auto">
                {savedNotes.map((note) => (
                  <div key={note._id} className="bg-white/30 backdrop-blur-sm p-4 rounded-xl shadow-md mb-4 text-gray-800">
                    <p className="text-sm font-semibold mb-2">
                      Saved on: {new Date(note.createdAt).toLocaleString()}
                    </p>
                    <p className="text-lg">
                      {note.content}
                    </p>
                  </div>
                ))}
              </div>
            );
          } else {
            return <p className="text-white">You have no saved notes yet.</p>;
          }
        })()}
      </div>
    </div>
  );
};

export default NotesInput;