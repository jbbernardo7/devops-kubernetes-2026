import type { FastifyInstance } from "fastify";
import { fork, ChildProcess } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let concurrent = 0;

export async function stressRoutes(server: FastifyInstance) {
  server.get("/lucas/:number", async (req, reply) => {
    const number = parseInt((req.params as any).number, 10);

	if (isNaN(number) || number < 0 || number > 45) {
		reply.code(400);
		return { error: 'n must be between 0 and 45' };
	}

	const child: ChildProcess = fork(path.join(__dirname, 'lucas-worker.js'));
	child.send(number);
	concurrent++;

	child.on('exit', () => {
		concurrent--;
	});

	return { started: number, concurrent };
  });
}
 