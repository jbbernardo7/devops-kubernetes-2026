import { createServer } from 'http';
import { readFile } from "fs/promises";
import path from "path";

const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, "logs.txt");

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
      const content = await readTextFile(filePath);

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(content);
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
