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
 
    if (!title || typeof title !== "string") {
      return reply.code(400).send({ error: "`text` is required and must be a string" });
    }
 
    const todo = await addTodo(title);
    return reply.code(201).send(todo);
  });
}
 