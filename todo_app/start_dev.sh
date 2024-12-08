#!/bin/bash

# Start the Next.js development server in the background
cd assets && yarn dev &
NEXT_PID=$!

# Start the Phoenix server in the background
mix phx.server &
PHOENIX_PID=$!

# Function to handle cleanup
cleanup() {
    echo "Shutting down processes..."
    kill $NEXT_PID
    kill $PHOENIX_PID
    exit 0
}

# Trap SIGINT (Ctrl+C) and SIGTERM signals
trap cleanup SIGINT SIGTERM

# Wait for either process to exit
wait $PHOENIX_PID $NEXT_PID