export interface Todo {
  id: number;
  title: string;
  status: boolean;
  is_done: boolean;
}
 
export interface CreateTodoBody {
  title: string;
}