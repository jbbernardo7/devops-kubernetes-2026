import type { FastifyInstance } from "fastify";
import { addTodo, getTodos } from "./todos.repository.js";
import type { CreateTodoBody } from "./todos.types.js";
 
export async function todoRoutes(server: FastifyInstance) {
  server.get("/todos", async (_req, reply) => {
    const todos = await getTodos();
    return reply.send(todos);
  });
 
  server.post<{ Body: CreateTodoBody }>("/todos", async (req, reply) => {
    const { title } = req.body ?? {};
 
    if (typeof title !== "string" || title.trim().length === 0) {
	  	req.log.warn({ body: req.body }, "rejected: title missing or empty");
      	return reply.code(400).send({ error: "`title` is required and must be a non-empty string" });
    }
	if (title.length > 140) {
		req.log.warn({ titleLength: title.length }, "rejected: title too long");
		return reply.code(400).send({ error: "`title` must be 140 characters or less" });
	}
 
    const todo = await addTodo(title);
    return reply.code(201).send(todo);
  });
}
 