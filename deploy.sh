#!/bin/bash

echo "Checking Docker..."
docker --version || exit 1

echo "Checking Docker Compose..."
docker compose version || exit 1

echo "Cleaning old containers..."
docker compose down -v

echo "Building & starting containers..."
docker compose up --build -d

echo "Waiting for services..."
sleep 10

echo "[SUCCESS] Application is live at http://localhost"
