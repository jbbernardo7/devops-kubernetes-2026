import { pool } from "../db/client.js";
import type { Todo } from "./todos.types.js";

export async function getTodos(): Promise<Todo[]> {
  const { rows } = await pool.query<Todo>(
	`SELECT id, title, status, is_done FROM todos WHERE status = TRUE`
  );
  return rows;
}
 
export async function addTodo(title: string): Promise<Todo> {
  const { rows } = await pool.query<Todo>(
    `INSERT INTO todos (title) VALUES ($1) RETURNING id, title, is_done, status`,
    [title]
  );
  
  const todo = rows[0];
  if (!todo) {
    throw new Error("Failed to insert todo");
  }
  return todo;
}

export async function markTodoDone(id: number): Promise<Todo | null> {
  const { rows } = await pool.query<Todo>(
    `
    UPDATE todos
    SET is_done = TRUE
    WHERE id = $1
    RETURNING id, title, is_done;
    `,
    [id]
  );

  return rows[0] ?? null;
}