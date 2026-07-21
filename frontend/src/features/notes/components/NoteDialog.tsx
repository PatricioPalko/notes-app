import Close from "@mui/icons-material/Close";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";

import {
  useAddNoteMutation,
  useUpdateNoteMutation,
} from "../../../api/notesApi";
import {
  EMPTY_VALUES,
  type NoteDialogProps,
  type NoteFormValues,
} from "../../../types/globals";
import NoteForm from "../../form/components/Form";

export default function NoteDialog({
  note,
  open,
  mode,
  onClose,
  onSuccess,
}: NoteDialogProps) {
  const [updateNote, { isLoading }] = useUpdateNoteMutation();
  const [addNote, { isLoading: isAdding }] = useAddNoteMutation();

  const isEditMode = mode === "edit";

  const defaultValues: NoteFormValues =
    isEditMode && note
      ? {
          title: note.title,
          description: note.description,
          category: note.category,
        }
      : EMPTY_VALUES;

  const handleSubmit = async (values: NoteFormValues): Promise<void> => {
    try {
      if (isEditMode) {
        if (!note) {
          return;
        }
        await updateNote({
          id: note.id,
          values,
        }).unwrap();
        onSuccess("Note updated successfully", "info");
      } else {
        await addNote(values).unwrap();
        onSuccess("Note created successfully", "success");
      }

      onClose();
    } catch (error) {
      if (isEditMode) {
        console.error("Failed to update note:", error);
        onSuccess("Failed to update note", "error");
      } else {
        console.error("Failed to add note:", error);
        onSuccess("Failed to add note", "error");
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        if (!isLoading && !isAdding) {
          onClose();
        }
      }}
      fullWidth
      maxWidth="sm"
      aria-labelledby="note-dialog-title"
    >
      <DialogTitle sx={{ pr: 7, color: "text.primary" }} id="note-dialog-title">
        {mode === "edit" ? "Edit note" : "Add note"}
      </DialogTitle>

      <IconButton
        aria-label="Close note dialog"
        disabled={isLoading || isAdding}
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
        <NoteForm
          key={note?.id}
          defaultValues={defaultValues}
          submitLabel={isEditMode ? "Update note" : "Create note"}
          isSubmitting={isLoading || isAdding}
          onCancel={onClose}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
