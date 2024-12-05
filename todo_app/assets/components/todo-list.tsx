import { TodoItem } from "../types/todo";
import TodoListItem from "./todo-list-item";

import NewTodoForm from "./new-todo-form";

interface TodoListProps {
  todos: TodoItem[];
}

export default function TodoList({ todos }: TodoListProps) {
  const sortedTodos = todos.slice().sort((a: TodoItem, b: TodoItem) => {
    if (!a.scheduledAt && !b.scheduledAt) return 0;
    if (!a.scheduledAt) return 1;
    if (!b.scheduledAt) return -1;
    return (
      new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
    );
  });

  return (
    <>
      <ul className="space-y-3">
        {sortedTodos
          ? sortedTodos.map((todo: TodoItem) => (
              <TodoListItem key={todo.id} {...todo} />
            ))
          : null}
      </ul>
      <NewTodoForm />
    </>
  );
}
