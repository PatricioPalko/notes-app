import { Alert, Box, Container, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import AddNoteButton from "./features/form/components/AddNoteButton";
import NoteDialog from "./features/notes/components/NoteDialog";
import NoteFilter from "./features/notes/components/NoteFilter";
import NoteList from "./features/notes/components/NoteList";
import NoteSearch from "./features/notes/components/NoteSearch";
import { NOTE_CATEGORIES, type NoteCategory } from "./types/globals";

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<NoteCategory[]>(
    () => NOTE_CATEGORIES.map((category) => category.value),
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "info">(
    "success",
  );

  const handleShowSnackbar = (message: string, severity: string): void => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity as "success" | "info");
    setShowSnackbar(true);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <Container component="main" maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Typography component="h1" variant="h1" sx={{ mb: 2, fontWeight: 700 }}>
          Notes app
        </Typography>
        <Typography variant="body1">
          A collection of my personal notes.
        </Typography>
        <NoteSearch searchValue={searchValue} onChange={setSearchValue} />
        <NoteFilter
          selectedCategories={selectedCategories}
          onChange={setSelectedCategories}
        />
        <NoteList
          selectedCategories={selectedCategories}
          searchValue={searchValue}
        />
        <AddNoteButton onClick={handleOpenDialog} />
        <NoteDialog
          note={null}
          open={isDialogOpen}
          mode="add"
          onClose={() => setIsDialogOpen(false)}
          onSuccess={(message: string, severity: "success" | "info") =>
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
      </Container>
    </Box>
  );
}

export default App;
