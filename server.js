import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
  const endpoint = req.url;
  let view;
  switch (endpoint) {
    case '/':
      view = fs.readFileSync('./views/home.html');
      break;
    case '/about':
      view = fs.readFileSync('./views/about.html');
      break;
    case '/contact':
      view = fs.readFileSync('./views/contact.html');
      break;
    default:
      view = fs.readFileSync('./views/error404.html');
      break;
  }
  res.end(view);
});
server.listen(5000, 'localhost', () => {
  console.log('Server listening at http://127.0.0.1:5000');
});
