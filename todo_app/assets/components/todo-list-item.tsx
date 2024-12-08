import { TodoItem } from "@/types/todo";
import { useMutation } from "@apollo/client";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  DELETE_TODO,
  TOGGLE_TODO,
  UPDATE_TODO,
  UPDATE_TODO_SCHEDULED_AT,
} from "../graphql/queries";
import { ChangeEvent, useEffect, useState } from "react";

export default function TodoListItem({
  id,
  content,
  completed,
  scheduledAt,
}: TodoItem) {
  const toLocalDateTimeString = (date: string) => {
    return new Date(
      new Date(date).getTime() - new Date(date).getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16);
  };

  const scheduledAtLocal = toLocalDateTimeString(scheduledAt);
  const [text, setText] = useState(content);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [dateValue, setDateValue] = useState(scheduledAtLocal);

  const [updateItem] = useMutation(UPDATE_TODO);
  const [updateItemScheduledAt] = useMutation(UPDATE_TODO_SCHEDULED_AT);
  const [deleteTodoMutation] = useMutation(DELETE_TODO, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          todoItems(existingTodos = [], { readField }) {
            return existingTodos.filter(
              (todoRef: any) => readField("id", todoRef) !== id
            );
          },
        },
      });
    },
  });
  const [toggleTodoMutation] = useMutation(TOGGLE_TODO, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          todoItems(existingTodos = []) {
            return existingTodos.map((todoRef: any) => {
              const todoId = cache.identify(todoRef);
              if (todoId === `TodoItem:${id}`) {
                return {
                  ...todoRef,
                  completed: !completed,
                };
              }
              return todoRef;
            });
          },
        },
      });
    },
  });

  useEffect(() => {
    if (!isEditingDate) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const dateInput = document.querySelector('input[type="datetime-local"]');

      // If clicked element is the date input, don't do anything
      if (dateInput && (target === dateInput || dateInput.contains(target))) {
        return;
      }
      const curValue = (dateInput as HTMLInputElement)?.value || dateValue;
      setDateValue(curValue);

      if (curValue !== scheduledAtLocal) {
        updateScheduledAt(curValue);
      }
      setIsEditingDate(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditingDate]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);
  };

  const onBlur = () => {
    if (text === "") {
      deleteTodoMutation({ variables: { id } });
      return;
    }
    if (text === content) return;
    updateItem({ variables: { id, content: text } });
  };

  const toggleTodo = async (id: number) => {
    try {
      await toggleTodoMutation({
        variables: { id: id.toString() },
      });
    } catch (err) {
      console.error("Error toggling todo:", err);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoMutation({
        variables: { id: id.toString() },
      });
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const onDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDateValue(e.target.value);
  };

  const onDateBlur = () => {
    updateScheduledAt(dateValue);
  };

  const updateScheduledAt = (inputDate: string) => {
    if (inputDate === scheduledAtLocal) return;

    const localDate = new Date(inputDate);
    updateItemScheduledAt({
      variables: {
        id,
        scheduledAt: localDate.toISOString(),
      },
    });
    setIsEditingDate(false);
  };

  return (
    <li
      key={id}
      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg group hover:bg-gray-100"
    >
      <div
        role="checkbox"
        aria-checked={completed}
        onClick={() => toggleTodo(id)}
        className={`h-5 w-5 flex-shrink-0 rounded-full border-2 cursor-pointer ${
          completed
            ? "bg-blue-500 border-gray-300 hover:bg-blue-600"
            : "bg-white border-gray-300 hover:bg-gray-100"
        }`}
      />
      <div className="flex-1 ">
        <div className="flex items-center justify-between">
          <input
            className={`bg-transparent w-full focus:outline-none ${
              completed ? "line-through text-gray-500" : "text-black"
            } truncate`}
            value={text}
            onChange={onChange}
            onBlur={onBlur}
            disabled={completed}
          />
          <div className="flex items-center gap-3 flex-shrink-0">
            {isEditingDate ? (
              <input
                type="datetime-local"
                className="bg-transparent focus:outline-none text-sm text-gray-500"
                value={dateValue}
                onChange={onDateChange}
                onBlur={onDateBlur}
              />
            ) : (
              <span
                className="text-sm text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={() => !completed && setIsEditingDate(true)}
              >
                {new Date(scheduledAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
            <button
              onClick={() => deleteTodo(id)}
              className="text-gray-400 hover:text-red-500 invisible group-hover:visible"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
