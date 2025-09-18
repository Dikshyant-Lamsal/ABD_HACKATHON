import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const allowedOrigins = [
      "http://localhost:5173",
    ];

const corsOptions = {
      origin: allowedOrigins,
    };

app.use(cors(corsOptions));


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/edugenie");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

connectDb();

//---------------------------------------------------------------------------------------

app.get('/api/data', (req, res) => {
      res.json({ message: 'Data from Node.js backend' });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});