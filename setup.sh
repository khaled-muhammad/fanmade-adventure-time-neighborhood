#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install it first."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    echo "NEXT_PUBLIC_API_URL=https://adventure-time.hackclub.dev/api/getNeighborsSecurely" > .env
fi

# Display CSS styling information
echo "Styling information:"
echo "Using custom modern CSS with no external frameworks."
echo "Neighborhood-inspired design with component-based architecture."

# Starting the development server
echo "Starting the development server..."
npm run dev 