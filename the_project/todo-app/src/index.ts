import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import axios from "axios";
import path from "node:path";
import fs from "fs/promises";

const directory = path.join(process.cwd(), "files");
const imagePath = path.join(directory, "image.jpeg");
await fs.mkdir(directory, { recursive: true });

const server = fastify();

const host = process.env.HOST ?? "0.0.0.0";
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const picsumUrl = process.env.PICSUM_URL ?? "https://picsum.photos/1200";

let isHealthy = true;

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
	const response = await axios.get(picsumUrl, {responseType: "arraybuffer"});
	await fs.writeFile(imagePath, response.data);

	return reply.type("image/jpeg").send(response.data);
});

server.get("/healthz", async (_req, reply) => {
	try {
		await axios.get("http://todo-backend-svc:2345/healthz");
		return reply.send({ status: true });
	} catch {
		return reply.code(503).send({ status: false });
	}
});

server.get("/livez", async (_req, reply) => {
	if (isHealthy) {
		return reply.code(200).send({ status: true });
	}
	return reply.code(500).send({ status: false });
});

server.post("/crash", async (_req, reply) => {
	console.log("Crashing...");
	isHealthy = false;
	return reply.send({ crashing: true });
});

server.listen({ host, port }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server started in port ${port}`);
});
