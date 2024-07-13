# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description

# Text Processor Application

This repository contains the frontend for a Text Processor application. Follow the instructions below to set up and run the application locally using Docker.

## Prerequisites

- Docker version 24.0.7
- Docker Compose version 2.27.1

### Backend Setup (text-processor-api)

1. Clone the backend repository:

```bash

  git clone https://github.com/ReedwanHossain/text-processor-api.git
  cd text-processor-api

```

2. Create .env.prod file and paste

```bash

  NODE_ENV=dev
  MONGO_URI=mongodb://mongo:27017/text-processor
  MONGO_URI_TEST=mongodb://localhost:27017/text-processor-test

```

3. Run Docker Compose to build and start the backend services:

   ```bash
   docker compose up -d --build
   ```

4. Run unit tests (Optional):
   ```bash
   docker exec -it text-processor-api-app-1 sh
   npm test
   ```
5. Run e2e tests (Optional):
   ```bash
   docker exec -it text-processor-api-app-1 sh
   npm run test:e2e
   ```
6. Open another terminal tab or window. Clone the this (frontend) repository::

   ```bash

   git clone https://github.com/ReedwanHossain/text-processor-client.git
   cd text-processor-client

   ```

7. Run Docker Compose to build and start the frontend app:

   ```bash
   docker compose up -d --build
   ```

8. Access the application

   ```bash
   http://localhost:3001
   ```

9. Access the API Docs

   ```bash
   http://localhost:3000/docs
   ```
