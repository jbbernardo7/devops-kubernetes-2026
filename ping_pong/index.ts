import { createServer } from 'http';
import { readFile, writeFile } from "fs/promises";
import path from "path";

const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, "pings.txt");

let counter = 0;
const getPings = () => `ping ${counter}`;

try {
  let content = await readFile(filePath, "utf-8");
  counter = parseInt(content, 10);
} catch (err: any) {
  if (err.code === "ENOENT") {
    await writeFile(filePath, "0", "utf-8");
  } else {
    throw err;
  }
}

const server = createServer(async (req, res) => {
  if (req.url === '/pingpong') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
	
	counter++;
	await writeFile(filePath, counter.toString(), "utf-8");
    res.end(getPings());
    return;
  }
  res.writeHead(404);
  res.end('Not found');
});

server.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
