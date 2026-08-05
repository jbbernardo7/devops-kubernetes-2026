import { createServer } from "http";
import { Pool } from "pg";

const pool = new Pool({
  host: "postgres-svc",
  port: 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

async function waitForPostgres() {
  while (true) {
    try {
      const client = await pool.connect();
      client.release();
      console.log("Connected to PostgreSQL");
      return;
    } catch (err) {
      console.log("Waiting for PostgreSQL....");
			if (err instanceof Error) {
				console.log(err.message);
			} else {
				console.log(err);
			}
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}

async function init() {
  await waitForPostgres();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS counter (
      id SERIAL PRIMARY KEY,
      count INTEGER NOT NULL DEFAULT 0
    );

	INSERT INTO counter (count)
	  SELECT 0
	  WHERE NOT EXISTS (SELECT 1 FROM counter);
  `);

  console.log("Table ready!");
}

const getCount = async () =>
  (await pool.query(`SELECT count FROM counter WHERE id = 1`)).rows[0].count;

async function incrementCount() {
  await pool.query(`UPDATE counter SET count = count + 1 WHERE id = 1`);
}

const server = createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/") {
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
