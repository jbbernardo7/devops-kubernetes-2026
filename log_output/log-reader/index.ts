import { createServer } from 'http';
import { readFile } from "fs/promises";

const information = await readFile("/etc/config/information.txt","utf8");
const message = process.env.MESSAGE ?? "No message configured";

async function readTextFile(path: string): Promise<string> {
  try {
    const content = await readFile(path, "utf-8");
    return content;
  } catch (error) {
    console.error("Failed to read file:", error);
    throw error;
  }
}

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
	const timestamp = await await readFile("/usr/src/app/files/logs.txt","utf8").catch(() => "");

	const response = [
		`file content: ${information}`,
		`env variable: MESSAGE=${message}`,
		`${timestamp}`,
		`Ping / Pongs: ${pings}`

	].join("\n");

    return res.end(response);;
  }
  if (req.method === "GET" && req.url === "/healthz") {
	try {
		const pingRes = await fetch("http://pingpong-svc:80/");
		res.writeHead(pingRes.ok ? 200 : 503);
		res.end();
	} catch (err) {
		console.log("healthz check failed:", err);
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