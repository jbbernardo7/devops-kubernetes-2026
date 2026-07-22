import { createServer } from 'http';
import { readFile } from "fs/promises";
import path from "path";

const directory = path.join("/", "usr", "src", "app", "files");
const filePathLogs = path.join(directory, "logs.txt");
const filePathPings = path.join(directory, "pings.txt");

async function readTextFile(path: string): Promise<string> {
  try {
    const content = await readFile(path, "utf-8");
    return content;
  } catch (error) {
    console.error("Failed to read file:", error);
    throw error;
  }
}

const server = createServer(async (req, res) => {
  if (req.url === '/status') {
    try {
      const logoutput = await readTextFile(filePathLogs);
	  const pingpong = "Ping / Pongs: " + await readTextFile(filePathPings);

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`${logoutput}\n${pingpong}`);
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Failed to read file");
    }

    return;
  }
  res.writeHead(404);
  res.end('Not found');
});

server.listen(3000, () => {
  console.log('Listening on http://localhost:3000/status');
});
