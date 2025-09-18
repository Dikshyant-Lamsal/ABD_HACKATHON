import React, { useState } from "react";
import axios from "axios";

const PDFUpload = () => {
  const [fileName, setFileName] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);
    setSummary("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:3000/api/summarize-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // pdf2json backend still returns { summary }
      setSummary(res.data.summary || "No summary returned.");
    } catch (error) {
      console.error("Upload error:", error);
      setSummary("❌ Failed to summarize PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Upload PDF Notes</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={handleUpload}
        className="w-full p-3 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 text-gray-800 
                   focus:outline-none focus:ring-2 focus:ring-white/50"
      />

      {fileName && <p className="mt-2 text-white/80">📄 Selected: {fileName}</p>}
      {loading && <p className="mt-2 text-yellow-200">⚡ Summarizing with AI...</p>}

      {summary && (
        <div className="mt-4 p-4 bg-white/20 rounded-xl text-white whitespace-pre-line">
          <h3 className="font-bold mb-2">✨ Summary:</h3>
          {summary}
        </div>
      )}
    </div>
  );
};

export default PDFUpload;
