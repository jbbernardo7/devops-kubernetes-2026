import { randomUUID } from 'crypto';
import { appendFile } from "fs/promises";
import path from "path";

const uuid = randomUUID();
const value = () => `${new Date().toISOString()}: ${uuid}`;

const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, "logs.txt");

setInterval(() => {
	log(value());
}, 5000);

async function log(line: string) {
  await appendFile(filePath, line + "\n", "utf-8");
}
