import fastify from "fastify";

const server = fastify();
const host = process.env.HOST ?? "0.0.0.0";
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const todos = [
  { id: 1, text: "Todo 1" },
  { id: 2, text: "Todo 2" },
];


server.get("/todos", async (req, reply) => {
	return reply.send(todos);
});

type CreateTodoBody = {
  text: string;
};

server.post<{ Body: CreateTodoBody }>("/todos", async (req, reply) => {
	const { text } = req.body;
	const todo = {id: todos.length + 1 , text};

	todos.push(todo);
	
	return reply.code(201).send(todo);
});

server.listen({ host, port }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server started in port ${port}`);
});
