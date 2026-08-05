import { pool } from "../db/client.js";
import type { Todo } from "./todos.types.js";

export async function getTodos(): Promise<Todo[]> {
  const { rows } = await pool.query<Todo>(
	`SELECT id, title, status FROM todos WHERE status = TRUE`
  );
  return rows;
}
 
export async function addTodo(title: string): Promise<Todo> {
  const { rows } = await pool.query<Todo>(
    `INSERT INTO todos (title) VALUES ($1) RETURNING id, title, status`,
    [title]
  );
  
  const todo = rows[0];
  if (!todo) {
    throw new Error("Failed to insert todo");
  }
  return todo;
}
 