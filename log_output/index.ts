import { createServer } from 'http';
import { randomUUID } from 'crypto';

const uuid = randomUUID();
const value = () => `${new Date().toISOString()}: ${uuid}`;

const server = createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/status') {
	const response = await fetch("http://pingpong-svc:2345/pings");
	const pings = "Ping / Pongs: " + await response.text();

    return res.end(value() + '\n' + pings);;
  }
  res.writeHead(404);
  res.end('Not found');
});

server.listen(3000, () => {
  console.log('Listening on http://localhost:3000/status');
});