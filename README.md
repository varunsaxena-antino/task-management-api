Task Management API – DevOps Assignment

This project is a JWT-based Task Management backend created to demonstrate DevOps practices using Docker and CI/CD.

Stack

Node.js + Express

MongoDB

Docker & Docker Compose

Nginx (Reverse Proxy)

GitHub Actions

Docker Hub

DevOps Highlights

Multi-container setup (App, MongoDB, Nginx)

Private Docker network for app and database

Only Nginx exposed on port 80

Non-root container user

Environment-based configuration

Automated Docker image build & push via GitHub Actions

Run Locally
docker compose up --build -d


App runs at:

http://localhost

CI/CD

Triggered on push to main

Builds Docker image

Tags with latest and commit SHA

Pushes image to Docker Hub

Author

Varun Saxena
