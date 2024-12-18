import { useState } from "react";
import { useMutation } from "@apollo/client";
import { PlusIcon } from "@heroicons/react/24/outline";
import { TodoItem } from "../types/todo";
import { ADD_TODO, GET_TODOS } from "@/graphql/queries";

export default function NewTodoForm() {
  const [newTodo, setNewTodo] = useState("");
  const [scheduledAt, setScheduledAt] = useState<string>("");
  const [showScheduledAt, setShowScheduledAt] = useState(false);

  const [addTodoMutation] = useMutation(ADD_TODO, {
    update(cache, { data }) {
      if (!data?.createTodoItem) return;

      const existingData = cache.readQuery<{ todoItems: TodoItem[] }>({
        query: GET_TODOS,
      });

      cache.writeQuery({
        query: GET_TODOS,
        data: {
          todoItems: [...(existingData?.todoItems || []), data.createTodoItem],
        },
      });
    },
  });

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    try {
      await addTodoMutation({
        variables: {
          content: newTodo,
          scheduledAt: scheduledAt || null,
        },
      });
      setNewTodo("");
      setScheduledAt("");
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  return (
    <form onSubmit={addTodo} className="mt-4">
      <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg group hover:bg-gray-100">
        <div className="h-5 w-5 flex-shrink-0 rounded-full border-2 border-gray-300 bg-white" />
        <input
          type="text"
          placeholder="Add a new todo..."
          className="flex-1 bg-transparent focus:outline-none"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onFocus={() => setShowScheduledAt(true)}
          onBlur={() => setShowScheduledAt(newTodo.trim() !== "")}
        />
        {showScheduledAt && (
          <input
            type="datetime-local"
            className="bg-transparent focus:outline-none text-gray-600 text-sm"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
          />
        )}
        <button type="submit" className="text-gray-400 hover:text-blue-500">
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
