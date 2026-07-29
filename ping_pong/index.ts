import { createServer } from "http";
import { Client } from "pg";

const pool = new Client({
  host: "postgres-svc",
  port: 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

async function init() {
  await pool.connect();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS counter (
      id SERIAL PRIMARY KEY,
      count INTEGER NOT NULL DEFAULT 0
    );

	INSERT INTO counter (count)
	  SELECT 0
	  WHERE NOT EXISTS (SELECT 1 FROM counter);
  `);

  console.log("Table ready");
}

const getCount = async () =>
  (await pool.query(`SELECT count FROM counter WHERE id = 1`)).rows[0].count;

async function incrementCount() {
  await pool.query(`UPDATE counter SET count = count + 1 WHERE id = 1`);
}

const server = createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/pingpong") {
    await incrementCount();
    const count = await getCount();
    return res.end(count.toString());
  }
  if (req.method === "GET" && req.url === "/pings") {
    const count = await getCount();
    return res.end(count.toString());
  }
  res.writeHead(404);
  res.end("Not found");
});

init()
  .then(() => {
    server.listen(3000, () => {
      console.log("Listening on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Init failed:", err);
    process.exit(1);
  });
