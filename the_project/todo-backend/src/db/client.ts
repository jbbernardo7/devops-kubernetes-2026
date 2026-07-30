import { Client } from "pg";
import { dbConfig } from "../config.js";

export const client = new Client(dbConfig);

export async function initDb() {
  await client.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title VARCHAR(140) NOT NULL,
	  status BOOLEAN DEFAULT TRUE
    );
  `);

  console.log("Table ready");
}