import { addTodo, markTodoDone } from "./todos.repository.js";
import { getNats } from "../nats/client.js";
import { JSONCodec } from "nats";

const jc = JSONCodec();

export async function createTodo(title: string) {
  const todo = await addTodo(title);
  getNats().publish("todos.created", jc.encode(todo));
  return todo;
}

export async function completeTodo(id: number) {
  const todo = await markTodoDone(id);
  if (todo) {
    getNats().publish("todos.updated", jc.encode(todo));
  }
  return todo;
}