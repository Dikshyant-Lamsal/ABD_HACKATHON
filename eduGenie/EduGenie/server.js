import express from 'express';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import bodyParser from 'body-parser';

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send();
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${port}`);
});