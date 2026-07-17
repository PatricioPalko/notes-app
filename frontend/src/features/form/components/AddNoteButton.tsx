import { Close } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useAddNoteMutation } from "../../../api/notesApi";
import type { NoteFormValues } from "../../../types/globals";
import NoteForm from "./Form";

export default function AddNoteButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [addNote, { isLoading }] = useAddNoteMutation();

  const handleSubmit = async (values: NoteFormValues): Promise<void> => {
    try {
      await addNote(values).unwrap();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error to create note:", error);
    }
  };

  return (
    <>
      <Button
        size="large"
        sx={{
          position: "fixed",
          color: "white",
          backgroundColor: "text.primary",
          px: 1,
          minWidth: 32,
          "& svg": {
            width: 20,
            height: 20,
          },
          "&:hover": {
            backgroundColor: "#c10261ff",
          },
          transform: "translate(-50%, 50%)",
        }}
        variant="contained"
        onClick={() => setIsDialogOpen(true)}
      >
        <Add />
        <Typography
          variant="body1"
          sx={{ ml: 1, color: "white", fontWeight: 500 }}
        >
          Add note
        </Typography>
      </Button>

      <Dialog
        open={isDialogOpen}
        onClose={() => {
          if (!isLoading) {
            setIsDialogOpen(false);
          }
        }}
        maxWidth="sm"
        fullWidth
      >
        <Button
          onClick={() => setIsDialogOpen(false)}
          sx={{
            p: 1,
            position: "absolute",
            right: 0,
            top: 0,
            cursor: "pointer",
            color: "text.disabled",
            "&:hover": {
              color: "text.primary",
            },
            minWidth: 32,
          }}
        >
          <Close />
        </Button>

        <DialogTitle sx={{ px: 3.5, py: 2, color: "text.primary" }}>
          Add a new note
        </DialogTitle>
        <DialogContent>
          <NoteForm
            onCancel={() => setIsDialogOpen(false)}
            onSubmit={handleSubmit}
            isSubmitting={isLoading}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
