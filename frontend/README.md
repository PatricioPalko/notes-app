# Notes App Frontend

Frontend application for creating, editing, deleting, searching, and filtering notes.

## Technologies

- React
- TypeScript
- Vite
- Redux Toolkit
- RTK Query
- Material UI
- React Hook Form

## Features

- Create new notes
- Edit existing notes
- Delete notes with confirmation
- Search notes by title or description
- Filter notes by category
- Sort notes by the latest update
- Form validation
- Character limits for note fields
- Responsive Material UI layout
- Loading, error, and empty states

## Requirements

- Node.js
- npm
- Running backend API

## Installation

From the `frontend` directory:

```bash
npm install
```

## Environment variables

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:3001
```

Restart the development server after changing environment variables.

## Development

```bash
npm run dev
```

The application is available by default at:

```text
http://localhost:5173
```

## Production build

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Linting

```bash
npm run lint
```

## Application structure

```text
src/
├── api/
├── app/
├── features/
│   ├── form/
│   └── notes/
├── types/
├── App.tsx
└── main.tsx
```

## Note model

```ts
interface Note {
  id: string;
  title: string;
  description: string;
  category: "work" | "personal" | "ideas" | "other";
  createdAt: string;
  updatedAt: string;
}
```
