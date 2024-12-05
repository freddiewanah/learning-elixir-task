# Todo App

A full-stack todo application with Phoenix backend (GraphQL) and Next.js frontend.

## Prerequisites

- Elixir 1.14 or later
- Phoenix 1.7.15
- PostgreSQL
- Node.js 20+ (for Next.js frontend)

## Start the application

Start the application

```bash
mix phx.server
```

This will start both:

- Backend on [`localhost:4000`](http://localhost:4000)
- Frontend on [`localhost:3000`](http://localhost:3000)

## API Endpoints

- **GraphQL Playground**: [`localhost:4000/api/graphql`](http://localhost:4000/api/graphql)
- **GraphQL API Endpoint**: `http://localhost:4000/api/graphql`

## Development

- Start interactive console: `iex -S mix`
- Start development server: `mix phx.server`

## Environment Variables

Backend defaults:

- Username: "postgres"
- Password: "postgres"
- Database: "todo_app_dev"

## CORS Configuration

The backend is already configured to accept requests from `localhost:3000` for the Next.js frontend.
