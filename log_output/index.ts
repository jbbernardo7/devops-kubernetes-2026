import { createServer } from 'http';
import { randomUUID } from 'crypto';
import { readFile } from "fs/promises";

const information = await readFile("/etc/config/information.txt","utf8");
const message = process.env.MESSAGE ?? "No message configured";
const uuid = randomUUID();

const getTimestamp = () => `${new Date().toISOString()}: ${uuid}`;
const getPings = async () => {
	const pingService = await fetch("http://pingpong-svc:80/pings");
	return await pingService.text();
}

const server = createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
	return res.end(`
		<!DOCTYPE html>
		<html>
		<body>
			Welcome!<br><br>
			<a href="/status">Status</a><br>
			<a href="/pingpong">Ping Pong</a>
		</body>
		</html>
	`);
  }
  if (req.method === 'GET' && req.url === '/status') {
	const pings = await getPings();

	const response = [
		`file content: ${information}`,
		`env variable: MESSAGE=${message}`,
		`${getTimestamp()}`,
		`Ping / Pongs: ${pings}`

	].join("\n");

    return res.end(response);;
  }
  if (req.method === "GET" && req.url === "/healthz") {
	try {
		const pingRes = await fetch("http://pingpong-svc:80/");
		res.writeHead(pingRes.ok ? 200 : 503);
		res.end();
	} catch {
		res.writeHead(503);
		res.end();
	}
	return;
  }
  res.writeHead(404);
  res.end('Not found');
});

server.listen(3000, () => {
  console.log('Listening on http://localhost:3000/status');
});