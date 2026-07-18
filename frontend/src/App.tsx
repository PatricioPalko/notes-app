import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import AddNoteButton from "./features/form/components/AddNoteButton";
import NoteDialog from "./features/notes/components/NoteDialog";
import NoteList from "./features/notes/components/NoteList";

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <Container component="main" maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Typography component="h2" variant="h1" sx={{ mb: 2, fontWeight: 700 }}>
          Notes app
        </Typography>
        <Typography variant="body1">
          A collection of my personal notes.
        </Typography>
        <NoteList />
        <AddNoteButton onClick={handleOpenDialog} />
        <NoteDialog
          note={null}
          open={isDialogOpen}
          mode="add"
          onClose={() => setIsDialogOpen(false)}
        />
      </Container>
    </Box>
  );
}

export default App;
