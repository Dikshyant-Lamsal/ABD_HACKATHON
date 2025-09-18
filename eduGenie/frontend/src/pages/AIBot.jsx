import React, { useState } from "react";
import axios from "axios";

const AIBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Helper to generate unique ids
  const generateId = () => `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

  const handleSend = async () => {
    if (!input) return;

    // Add user's message
    const userMsg = { id: generateId(), type: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      // Call your backend AI endpoint
      const response = await axios.post("http://localhost:3000/api/ai", {
        prompt: input,
      });

      // Add AI's response
      const botMsg = { id: generateId(), type: "bot", text: response.data.result };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("AI error:", error);
      const errorMsg = { id: generateId(), type: "bot", text: "Sorry, something went wrong." };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-80">
      <h2 className="text-2xl font-bold text-white mb-4">AI Bot</h2>
      <div className="flex-1 overflow-y-auto p-4 rounded-xl bg-white/20 backdrop-blur-sm mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 p-2 rounded-lg max-w-[80%] ${
              msg.type === "user"
                ? "bg-blue-400 text-white self-end"
                : "bg-white/40 text-gray-800 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="text-gray-300 italic">AI is typing...</div>
        )}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 p-3 rounded-l-xl bg-white/30 backdrop-blur-sm border border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 rounded-r-xl hover:bg-blue-600 transition"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIBot;
