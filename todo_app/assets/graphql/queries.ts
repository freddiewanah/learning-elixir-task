import { gql } from "@apollo/client";

export const GET_HOME = gql`
  query GetHome {
    todoItems {
      id
      content
      completed
      scheduledAt
    }
    weatherDay {
      date
      highTemp
      lowTemp
    }
  }
`;

export const GET_TODOS = gql`
  query GetTodos {
    todoItems {
      id
      content
      completed
      scheduledAt
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($content: String!, $scheduledAt: String!) {
    createTodoItem(content: $content, scheduledAt: $scheduledAt) {
      id
      content
      completed
      scheduledAt
    }
  }
`;

export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodoItem(id: $id) {
      id
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodoItem(id: $id)
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $content: String!) {
    updateTodoItem(id: $id, content: $content) {
      id
      content
    }
  }
`;

export const UPDATE_TODO_SCHEDULED_AT = gql`
  mutation UpdateTodoScheduledAt($id: ID!, $scheduledAt: String!) {
    updateTodoItemScheduledAt(id: $id, scheduledAt: $scheduledAt) {
      id
      scheduledAt
    }
  }
`;
