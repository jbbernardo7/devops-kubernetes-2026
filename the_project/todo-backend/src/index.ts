import fastify from "fastify";
import { host, port } from "./config.js";
import { initDb } from "./db/client.js";
import { todoRoutes } from "./todos/todos.routes.js";

async function main() {
	await initDb();

	const server = fastify({logger: true});
	server.register(todoRoutes);

	server.listen({ host, port }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server started in port ${port}`);
    });
}

main().catch((err) => {
	console.error("Init failed:", err);
	process.exit(1);
})