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
import { type DeleteNoteDialogProps } from "../../../types/globals";

export default function DeleteNoteDialog({
  note,
  open,
  onClose,
  onSuccess,
}: DeleteNoteDialogProps) {
  const [deleteNote, { isLoading }] = useDeleteNoteMutation();

  const handleDelete = async (): Promise<void> => {
    try {
      if (!note) {
        return;
      }
      await deleteNote(note.id).unwrap();
      onSuccess("Note deleted successfully", "error");

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
