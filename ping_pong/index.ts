import { createServer } from 'http';

let counter = 0;
const value = () => `ping ${counter++}`;

const server = createServer((req, res) => {
  if (req.url === '/pingpong') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(value());
    return;
  }
  res.writeHead(404);
  res.end('Not found');
});

server.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
