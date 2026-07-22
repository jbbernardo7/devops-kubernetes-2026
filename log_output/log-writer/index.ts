import { randomUUID } from 'crypto';
import { writeFile } from "fs/promises";
import path from "path";

const uuid = randomUUID();
const value = () => `${new Date().toISOString()}: ${uuid}`;

const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, "logs.txt");

async function log(line: string) {
  await writeFile(filePath, line + "\n", "utf-8");
}

setInterval(() => {
	log(value());
}, 5000);
