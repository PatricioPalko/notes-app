import Close from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";

import { useDeleteNoteMutation } from "../../../api/notesApi";
import {
  EMPTY_VALUES,
  type DeleteNoteDialogProps,
  type NoteFormValues,
} from "../../../types/globals";

export default function DeleteNoteDialog({
  note,
  open,
  onClose,
}: DeleteNoteDialogProps) {
  const [deleteNote, { isLoading }] = useDeleteNoteMutation();

  const defaultValues: NoteFormValues = note
    ? {
        title: note.title,
        description: note.description,
        category: note.category,
      }
    : EMPTY_VALUES;

  const handleDelete = async (): Promise<void> => {
    try {
      if (!note) {
        return;
      }
      await deleteNote(note.id).unwrap();

      onClose();
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        if (!isLoading) {
          onClose();
        }
      }}
      fullWidth
      maxWidth="sm"
      aria-labelledby="note-dialog-title"
    >
      <DialogTitle sx={{ pr: 7, color: "text.primary" }} id="note-dialog-title">
        Detele note
      </DialogTitle>

      <IconButton
        aria-label="Close note dialog"
        disabled={isLoading}
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 12,
          top: 12,
        }}
      >
        <Close />
      </IconButton>

      <DialogContent>
        Are you sure you want to delete “{note?.title}”?
      </DialogContent>

      <DialogActions>
        {/* <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={handleDelete}>
          Delete
        </Button> */}

        <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
          <Button type="button" color="inherit" onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "text.primary" }}
            onClick={handleDelete}
          >
            Delete note
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
