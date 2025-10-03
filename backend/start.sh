#!/bin/bash

# Start Drik Panchanga Python API

echo "Starting Drik Panchanga API server..."
echo "API will be available at http://localhost:8000"
echo "Swagger docs: http://localhost:8000/docs"
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Virtual environment not found. Creating one..."
    python3 -m venv venv
    echo "Installing dependencies..."
    source venv/bin/activate
    pip install -r requirements.txt
else
    source venv/bin/activate
fi

# Start the API server
python api.py
