# Task Manager

A full-stack task manager with a React + Vite frontend and a NestJS backend.

## Features

- JWT-based login
- Protected task APIs
- Create, list, update, toggle, and delete tasks
- Filter tasks: all, completed, pending
- Pagination on task listing
- Edit and delete confirmation modals

## Tech Stack

**Frontend**
- React + TypeScript + Vite
- Zustand state management
- Axios (token attached via interceptor)
- React Router
- Tailwind CSS

**Backend**
- NestJS + TypeScript
- class-validator / class-transformer
- JWT auth (custom guard)
- In-memory task store (resets on restart)

## Folder Structure

```text
task_manager/
├─ backend/
│  ├─ src/
│  │  ├─ main.ts
│  │  ├─ app.module.ts
│  │  ├─ auth/
│  │  ├─ dto/
│  │  └─ tasks/
│  └─ package.json
├─ frontend/
│  ├─ src/
│  │  ├─ api/
│  │  ├─ components/
│  │  ├─ pages/
│  │  └─ store/
│  └─ package.json
└─ README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install Dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### Run Backend

```bash
cd backend
npm run start:dev
```

Backend URL:

```text
http://localhost:3000
```

### Run Frontend

```bash
cd frontend
npm run dev
```

Frontend URL (default Vite port):

```text
http://localhost:5173
```

### Login Credentials

Current hardcoded demo credentials:

- Username: `admin`
- Password: `admin`

## API

Base URL:

```text
http://localhost:3000/api/v1
```

Auth header (required for all task endpoints):

```text
Authorization: Bearer <accessToken>
```

### Health

GET /

Response:

```text
Hello World!
```

### Auth

POST /api/v1/auth/login

Request body:

```json
{
   "username": "admin",
   "password": "admin"
}
```

Success response:

```json
{
   "accessToken": "<jwt>"
}
```

Errors:

- `401 Unauthorized` invalid credentials
- `400 Bad Request` missing/invalid fields

### Tasks (Protected)

POST /api/v1/tasks

Request body:

```json
{
   "title": "Buy groceries"
}
```

Response:

```json
{
   "id": 1,
   "title": "Buy groceries",
   "completed": false
}
```

GET /api/v1/tasks?status=all&page=1&limit=10

Query parameters:

- `status`: `all` | `completed` | `pending`
- `page`: number (as string)
- `limit`: number (as string)

Response:

```json
[
   {
      "id": 1,
      "title": "Buy groceries",
      "completed": false
   }
]
```

GET /api/v1/tasks/:id

Response:

```json
{
   "id": 1,
   "title": "Buy groceries",
   "completed": false
}
```

PUT /api/v1/tasks

Request body:

```json
{
   "id": 1,
   "title": "Buy groceries and milk"
}
```

PATCH /api/v1/tasks/:id/toggle

Response:

```json
{
   "id": 1,
   "title": "Buy groceries and milk",
   "completed": true
}
```

DELETE /api/v1/tasks/:id

Response:

```json
{
   "message": "Task deleted successfully",
   "task": {
      "id": 1,
      "title": "Buy groceries and milk",
      "completed": true
   }
}
```

## Validation and Error Notes

- Global validation is enabled (whitelist + reject unknown fields).
- Missing/invalid token returns `401`.
- Unknown task id returns `404`.

## Screenshots

No screenshots are committed yet.

Suggested screenshot set (add images and link them here):

- Login page
- Dashboard with tasks
- Edit task modal
- Delete confirmation modal

## Development Notes (Agent Mode)

This repo can be developed normally without any special tooling.
If you use VS Code Agent Mode, it can help with code navigation, refactors, and documentation updates.

## Limitations

- Tasks are stored in memory (reset on backend restart).
- JWT secret and demo credentials are hardcoded (not production-ready).

## Possible Next Steps

- Move JWT secret/config to environment variables.
- Add persistence (PostgreSQL/MongoDB) and real user accounts.
- Add frontend route protection for `/tasks`.
- Add e2e coverage for auth + task flows.