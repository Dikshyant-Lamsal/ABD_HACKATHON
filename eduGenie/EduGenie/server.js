import express from 'express';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 3000;
const app = express();

const connectDb = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/EduGenie");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  }
  catch (error) {
    console.error(`Error: ${error.message}`);
  }
};
connectDb();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("hello");
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${port}`);
});