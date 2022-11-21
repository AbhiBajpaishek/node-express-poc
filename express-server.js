import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { authRouter } from './routes/authRoutes.js';
import morgan from 'morgan';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);

const app = express();

mongoose.connect(
  'mongodb+srv://admin:admin123@basic-cluster.ppustng.mongodb.net/zomato',
  () => {
    console.log('Db Connected!!');
    app.listen(5000, () => {
      console.log('Express server is listening at  http://127.0.0.1:5000 ');
    });
  }
);

const __dirname = path.dirname(__filename);

app.use(morgan('dev'));
app.use(express.json());
app.use(authRouter);

app.get('/', (req, res) => {
  res.sendFile('views/home.html', { root: __dirname });
});

app.get('/about', (req, res) => {
  res.sendFile('views/about.html', { root: __dirname });
});
app.get('/contact', (req, res) => {
  res.sendFile('views/contact.html', { root: __dirname });
});

app.use((req, res) => {
  res.status(404).sendFile('views/error404.html', { root: __dirname });
});
