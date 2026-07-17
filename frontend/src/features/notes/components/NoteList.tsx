import { Alert, CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { useGetNotesQuery } from "../../../api/notesApi";
import type { Note } from "../../../types/globals";
import NoteCard from "./NoteCard";

export default function NoteList() {
  const { data: notes = [], isLoading, isError, refetch } = useGetNotesQuery();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Alert
        severity="error"
        action={
          <button type="button" onClick={() => void refetch()}>
            Retry
          </button>
        }
      >
        Notes could not be loaded.
      </Alert>
    );
  }

  const sortedNotes = [...notes].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 2,
        pt: 8,
      }}
    >
      {sortedNotes.map((note: Note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </Box>
  );
}
