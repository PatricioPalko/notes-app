import { Alert, CircularProgress, Snackbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useGetNotesQuery } from "../../../api/notesApi";
import type { Note, NoteListProps } from "../../../types/globals";
import DeleteNoteDialog from "./DeletNoteDialog";
import NoteCard from "./NoteCard";
import NoteDialog from "./NoteDialog";

export default function NoteList({
  selectedCategories,
  searchValue,
}: NoteListProps) {
  const { data: notes = [], isLoading, isError, refetch } = useGetNotesQuery();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "info" | "error"
  >("success");

  const handleShowSnackbar = (message: string, severity: string): void => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity as "success" | "info" | "error");
    setShowSnackbar(true);
  };

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

  const filteredNotes = notes
    .filter((note: Note) => selectedCategories.includes(note.category))
    .filter(
      (note: Note) =>
        note.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        note.description.toLowerCase().includes(searchValue.toLowerCase()),
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
        {sortedNotes.length > 0 && selectedCategories.length > 0 ? (
          sortedNotes.map((note: Note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={setSelectedNote}
              onDelete={setNoteToDelete}
            />
          ))
        ) : searchValue !== "" ? (
          <Typography variant="body1" sx={{ textAlign: "left", pl: 1 }}>
            No notes found for "{searchValue}".
          </Typography>
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
        onSuccess={(message: string, severity: "success" | "info" | "error") =>
          handleShowSnackbar(message, severity)
        }
        mode="edit"
      />
      <DeleteNoteDialog
        note={noteToDelete}
        open={noteToDelete !== null}
        onClose={() => setNoteToDelete(null)}
        onSuccess={(message: string, severity: "error" | "success") =>
          handleShowSnackbar(message, severity)
        }
      />
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
