#!/bin/bash

# Start the backend server in the background
echo "Starting backend server..."
cd backend
python main.py &
BACKEND_PID=$!

# Wait for backend to be ready
sleep 5

# Build and start frontend
echo "Building frontend..."
cd ..
npm run build

echo "Starting frontend server..."
npm run start:prod

# If frontend exits, kill backend
kill $BACKEND_PID