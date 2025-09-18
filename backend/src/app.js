import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import notesRoutes from './routes/notes.routes.js';
import quizRoutes from './routes/quiz.routes.js';
import chatbotRoutes from './routes/chatbot.routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/chat', chatbotRoutes);

app.get('/', (req, res) => res.send('AI Study Buddy API ✅'));

export default app;
