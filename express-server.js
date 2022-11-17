import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const app = express();
const __dirname = path.dirname(__filename);

app.listen(5000, () => {
  console.log('Express server is listening at  http://127.0.0.1:5000 ');
});

app.get('/', (req, res) => {
  res.sendFile('views/home.html', { root: __dirname });
});

app.get('/about', (req, res) => {
  res.sendFile('views/about.html', { root: __dirname });
});

app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

app.get('/contact', (req, res) => {
  res.sendFile('views/contact.html', { root: __dirname });
});

app.use((req, res) => {
  res.status(404).sendFile('views/error404.html', { root: __dirname });
});

export {};
