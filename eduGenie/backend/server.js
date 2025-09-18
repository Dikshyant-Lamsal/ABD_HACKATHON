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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
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

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);

// Signup API
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Login API
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Gemini AI Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// File upload setup
const upload = multer({ storage: multer.memoryStorage() });

// PDF Summarization Route using pdf2json
app.post("/api/summarize-pdf", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const pdfParser = new PDFParser();

    pdfParser.parseBuffer(req.file.buffer);

    pdfParser.on("pdfParser_dataError", (errData) => {
      console.error("PDF parsing error:", errData.parserError);
      return res.status(500).json({ error: "Failed to parse PDF" });
    });

    pdfParser.on("pdfParser_dataReady", async (pdfData) => {
      try {
        // Extract text from pdf2json output
        let rawText = "";
        pdfData.Pages.forEach((page) => {
          page.Texts.forEach((textObj) => {
            textObj.R.forEach((t) => {
              rawText += decodeURIComponent(t.T) + " ";
            });
          });
        });

        const pdfText = rawText.slice(0, 5000); // keep safe limit

        // Ask Gemini AI to summarize
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Summarize the following study notes into 10-20 clear bullet points:\n\n${pdfText}`;

        const result = await model.generateContent(prompt);
        const summary = result.response.text();

        res.json({ summary });
      } catch (error) {
        console.error("Gemini AI error:", error);
        res.status(500).json({ error: "AI summarization failed" });
      }
    });
  } catch (error) {
    console.error("PDF Summarization error:", error);
    res.status(500).json({ error: "Failed to summarize PDF" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
