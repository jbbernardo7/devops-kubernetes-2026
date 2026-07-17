import fastify from "fastify";

const server = fastify();
const host = process.env.HOST ?? "0.0.0.0";
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

server.listen({ host, port }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server started in port ${port}`);
});
