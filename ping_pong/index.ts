import { createServer } from 'http';

let counter = 0;
const getPings = () => `ping ${counter}`;

const server = createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/pingpong') {
	counter++;

    return res.end(getPings());;
  }
  if (req.method === 'GET' && req.url === '/pings') {
    return res.end(counter.toString());
  }
  res.writeHead(404);
  res.end('Not found');
});

server.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
