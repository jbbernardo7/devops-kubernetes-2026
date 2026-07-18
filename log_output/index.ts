import { createServer } from 'http';
import { randomUUID } from 'crypto';

const timestamp = new Date().toISOString();
const uuid = randomUUID();
const value = `${timestamp}: ${uuid}`;

setInterval(() => {
    console.log(value);
}, 5000);

const server = createServer((req, res) => {
  if (req.url === '/status') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(value);
    return;
  }
  res.writeHead(404);
  res.end('Not found');
});

server.listen(3000, () => {
  console.log('Listening on http://localhost:3000/status');
});
