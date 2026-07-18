import { Alert, CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useGetNotesQuery } from "../../../api/notesApi";
import type { Note, NoteListProps } from "../../../types/globals";
import NoteCard from "./NoteCard";
import NoteDialog from "./NoteDialog";

export default function NoteList({ selectedCategories }: NoteListProps) {
  const { data: notes = [], isLoading, isError, refetch } = useGetNotesQuery();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

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

  const filteredNotes = notes.filter((note: Note) =>
    selectedCategories.includes(note.category),
  );

  const sortedNotes = [...filteredNotes].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 2,
          pt: 3,
        }}
      >
        {sortedNotes.length > 0 ? (
          sortedNotes.map((note: Note) => (
            <NoteCard key={note.id} note={note} onEdit={setSelectedNote} />
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: "left", pl: 1 }}>
            No notes found for selected categories.
          </Typography>
        )}
      </Box>
      <NoteDialog
        note={selectedNote}
        open={selectedNote !== null}
        onClose={() => setSelectedNote(null)}
        mode="edit"
      />
    </>
  );
}
