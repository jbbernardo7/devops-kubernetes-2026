import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import axios from "axios";
import path from "node:path";
import fs from "fs/promises";

const directory = path.join(process.cwd(), "files");
const imagePath = path.join(directory, "image.jpeg");

const server = fastify();
const host = process.env.HOST ?? "0.0.0.0";
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

server.register(fastifyStatic, {
  root: path.join(process.cwd(), "public"),
  index: "index.html",
});

async function isImageFresh(){
	try {
		const stats = await fs.stat(imagePath);
		const TEN_MINUTES = 10 * 60 * 1000;

		return Date.now() - stats.mtime.getTime() < TEN_MINUTES;
	} catch {
		return false; //file doesn't exist
  }
}

server.get("/random-image", async (req, reply) => {
	if (await isImageFresh()) {
		const image = await fs.readFile(imagePath);

		return reply.type("image/jpeg").send(image);
	}
	const response = await axios.get("https://picsum.photos/1200", {responseType: "arraybuffer"});
	await fs.writeFile(imagePath, response.data);

	return reply.type("image/jpeg").send(response.data);
});

const todos = [
  { id: 1, text: "Todo 1" },
  { id: 2, text: "Todo 2" },
];

server.get("/todos", async (req, reply) => {
	return reply.send(todos);
});

server.get("/crash", (req, reply) => {
	console.log("Crashing...");
	reply.send("Crashing...");
	process.exit(1);
});

server.listen({ host, port }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server started in port ${port}`);
});
