import React, { useState } from "react";

const PDFUpload = () => {
  const [fileName, setFileName] = useState("");

  const handleUpload = (e) => setFileName(e.target.files[0]?.name || "");

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Upload PDF Notes</h2>
      <input
        type="file"
        accept=".pdf"
        onChange={handleUpload}
        className="w-full p-3 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
      />
      {fileName && <p className="mt-2 text-white/80">Selected: {fileName}</p>}
    </div>
  );
};

export default PDFUpload;
