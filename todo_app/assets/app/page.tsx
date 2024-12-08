"use client";
import { gql, useQuery, useMutation } from "@apollo/client";
import TitleBar from "../components/title-bar";
import TodoList from "../components/todo-list";
import { GET_HOME } from "@/graphql/queries";
import { TodoItem } from "@/types/todo";
import { Weather } from "@/types/weather";

interface QueryResponse {
  todoItems: TodoItem[];
  weatherDay: Weather;
}

export default function Home() {
  const { loading, error, data } = useQuery<QueryResponse>(GET_HOME);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <TitleBar weather={data?.weatherDay} />
      <TodoList todos={data?.todoItems || []} />
    </div>
  );
}
