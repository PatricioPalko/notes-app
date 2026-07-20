# Notes App Backend

A lightweight Node.js mock REST API powered by JSON Server.

The API persists notes inside `db.json` and provides standard CRUD endpoints for the frontend application.

## Technologies

- Node.js
- JSON Server

## Requirements

- Node.js
- npm

## Installation

From the `backend` directory:

```bash
npm install
```

## Development

Start the mock API:

```bash
npm run dev
```

The API is available by default at:

```text
http://localhost:3001
```

## API endpoints

### Get all notes

```http
GET /notes
```

### Get a note

```http
GET /notes/:id
```

### Create a note

```http
POST /notes
```

Example request body:

```json
{
  "title": "Title 1",
  "description": "Description1.",
  "category": "work",
  "createdAt": "2026-07-20T12:00:00.000Z",
  "updatedAt": "2026-07-20T12:00:00.000Z"
}
```

### Update a note

```http
PATCH /notes/:id
```

Example request body:

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "category": "ideas",
  "updatedAt": "2026-07-20T14:00:00.000Z"
}
```

### Delete a note

```http
DELETE /notes/:id
```

## Data storage

Notes are persisted in:

```text
backend/db.json
```

Example structure:

```json
{
  "notes": [
    {
      "id": "1",
      "title": "Example note",
      "description": "Example description",
      "category": "work",
      "createdAt": "2026-07-20T12:00:00.000Z",
      "updatedAt": "2026-07-20T12:00:00.000Z"
    }
  ]
}
```

## Important note

This backend is intended for development and demonstration purposes. JSON Server is used because the assignment allows mocked APIs and is not intended as a production backend.
