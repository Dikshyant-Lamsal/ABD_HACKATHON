import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 5000;

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ai-study-buddy';

export const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

// Choose your AI provider: OpenAI or Gemini
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

// Environment
export const NODE_ENV = process.env.NODE_ENV || 'development';
