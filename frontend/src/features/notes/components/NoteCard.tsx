import { Delete, Edit } from "@mui/icons-material";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type { NoteCardProps } from "../../../types/globals";
import NoteButton from "./NoteButton";

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const noteTitle =
    note.title.length > 40 ? note.title.substring(0, 40) + "..." : note.title;

  const noteDescription =
    note.description.length > 200
      ? note.description.substring(0, 200) + "..."
      : note.description;

  const noteCategory = note.category || "Uncategorized";

  const noteUpdatedDate = new Date(note.updatedAt).toLocaleDateString("sk", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 275,
        borderRadius: 2,
        boxShadow: "0 4px 14px rgba(15, 23, 42, 0.08)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
      }}
      component="article"
    >
      <CardContent sx={{ textAlign: "left", p: 0, pb: 3 }}>
        <Typography
          variant="body1"
          sx={{
            color: "text.disabled",
            textTransform: "uppercase",
            mb: 1.5,
            mr: 1,
            border: "1px solid",
            borderColor: "text.disabled",
            display: "inline-block",
            borderRadius: 1,
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: 1,
            px: 0.5,
            pt: 0.3,
            pb: 0.2,
            backgroundColor: "#fcfcfcff",
          }}
        >
          {noteCategory}
        </Typography>

        <Typography
          gutterBottom
          sx={{ color: "text.primary", fontWeight: 600 }}
          component="h3"
          variant="h3"
        >
          {noteTitle}
        </Typography>
        <Typography variant="body1">{noteDescription}</Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 0,
        }}
      >
        <Typography variant="body1" sx={{ color: "text.disabled" }}>
          {noteUpdatedDate}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <NoteButton
            ariaLabel="Edit note"
            icon={<Edit />}
            onClick={() => onEdit(note)}
          />
          <NoteButton
            ariaLabel="Delete note"
            icon={<Delete />}
            onClick={() => onDelete(note)}
          />
        </Box>
      </CardActions>
    </Card>
  );
}
