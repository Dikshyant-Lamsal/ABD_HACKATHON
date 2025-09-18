import React, { useState } from "react";

const AIBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input) return;
    setMessages([...messages, { type: "user", text: input }]);
    setMessages((prev) => [
      ...prev,
      { type: "bot", text: "This is a placeholder AI response." },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-80">
      <h2 className="text-2xl font-bold text-white mb-4">AI Bot</h2>
      <div className="flex-1 overflow-y-auto p-4 rounded-xl bg-white/20 backdrop-blur-sm mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 p-2 rounded-lg max-w-[80%] ${
              msg.type === "user"
                ? "bg-blue-400 text-white self-end"
                : "bg-white/40 text-gray-800 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
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
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIBot;