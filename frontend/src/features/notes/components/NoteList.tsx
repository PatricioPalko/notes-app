import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { getNotesData } from "../../../helpers/getData";
import type { Note } from "../../../types/globals";
import NoteCard from "./NoteCard";

export default function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotesData();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

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
