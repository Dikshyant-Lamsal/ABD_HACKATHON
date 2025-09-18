import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import PDFParser from "pdf2json";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = ["http://localhost:5173"];
app.use(cors({ origin: allowedOrigins }));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "2mb" }));

// ================== MongoDB connection ==================
const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/edugenie", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB error:", error);
  }
};
connectDb();

// ================== Schemas ==================
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const noteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Note = mongoose.model("Note", noteSchema);

// ================== Auth Routes ==================
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "Signup successful", userId: newUser._id });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ message: "Login successful", userId: user._id });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ================== Notes Routes ==================

// Save notes
app.post("/api/notes", async (req, res) => {
  try {
    const { content, userId } = req.body;
    if (!content || !userId) {
      return res
        .status(400)
        .json({ error: "Notes content and user ID are required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const newNote = new Note({ content, userId });
    await newNote.save();
    res
      .status(201)
      .json({ message: "Notes saved successfully!", note: newNote });
  } catch (error) {
    console.error("Failed to save notes:", error);
    res.status(500).json({ error: "Server error occurred while saving notes." });
  }
});

// Retrieve notes by user
app.get("/api/notes/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "User ID is required" });

    const notes = await Note.find({ userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    res.status(500).json({ error: "Server error occurred while fetching notes." });
  }
});

// ================== Gemini AI Setup ==================
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ================== AI Chatbot Route ==================
app.post("/api/ai", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "No prompt provided" });

    const result = await model.generateContent(
      `You are EduGenie, a helpful AI tutor.
      Keep answers short and clear (max 5 sentences).
      User question: ${prompt}`
    );

    res.json({ result: result.response.text() });
  } catch (error) {
    console.error("Gemini AI error:", error.message);
    res.status(500).json({ error: "AI request failed" });
  }
});

// ================== File Upload & PDF Summarization ==================
const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/summarize-pdf", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const pdfParser = new PDFParser();
    pdfParser.parseBuffer(req.file.buffer);

    pdfParser.on("pdfParser_dataError", () =>
      res.status(500).json({ error: "Failed to parse PDF" })
    );

    pdfParser.on("pdfParser_dataReady", async (pdfData) => {
      try {
        let rawText = "";
        pdfData.Pages.forEach((page) => {
          page.Texts.forEach((textObj) => {
            textObj.R.forEach((t) => {
              rawText += decodeURIComponent(t.T) + " ";
            });
          });
        });

        const pdfText = rawText.slice(0, 2000);

        const result = await model.generateContent(
          `Summarize the following study notes into 8-10 clear bullet points:\n\n${pdfText}`
        );

        res.json({ summary: result.response.text() });
      } catch (error) {
        console.error("Gemini AI summarization error:", error.message);
        res.status(500).json({ error: "AI summarization failed" });
      }
    });
  } catch (error) {
    console.error("PDF Summarization error:", error.message);
    res.status(500).json({ error: "Failed to summarize PDF" });
  }
});

// ================== Start Server ==================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
