import { Box, Container, Typography } from "@mui/material";
import NoteList from "./features/notes/components/NoteList";
import AddNoteButton from "./features/form/components/AddNoteButton";

function App() {
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
        <AddNoteButton />
      </Container>
    </Box>
  );
}

export default App;
