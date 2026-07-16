import { Box, Container, Typography } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <Container component="main" maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Typography component="h2" variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          My notes
        </Typography>
      </Container>
    </Box>
  );
}

export default App;
