import { Pool } from "pg";
import { dbConfig } from "../config.js";

export const pool = new Pool(dbConfig);

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

export async function initDb() {
  await waitForPostgres();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title VARCHAR(140) NOT NULL,
	  is_done BOOLEAN DEFAULT FALSE,
	  status BOOLEAN DEFAULT TRUE
    );
  `);

  console.log("Table ready");
}