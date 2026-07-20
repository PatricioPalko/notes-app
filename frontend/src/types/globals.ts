import type {
  ControllerFieldState,
  ControllerRenderProps,
} from "react-hook-form";

export interface Note {
  id: string;
  title: string;
  description: string;
  category: NoteCategory;
  createdAt: string;
  updatedAt: string;
}

export interface FormInputProps {
  placeholder: string;
  type: string;
  label: string;
  multiline?: boolean;
  rows?: number;
  autoFocus?: boolean;
  error?: boolean;
  helperText?: string;
  slotProps?: any;
}

export interface FormSelectProps {
  label: string;
  placeholder?: string;
  options: readonly FormOption[];
  field: ControllerRenderProps<NoteFormValues, "category">;
  fieldState: ControllerFieldState;
}

export interface FormOption {
  value: string;
  label: string;
}

export const NOTE_CATEGORIES = [
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "ideas", label: "Ideas" },
  { value: "other", label: "Other" },
] as const satisfies readonly FormOption[];

export type NoteCategory = (typeof NOTE_CATEGORIES)[number]["value"];

export interface NoteFormValues {
  title: string;
  description: string;
  category: NoteCategory | "";
}

export interface NoteFormProps {
  defaultValues?: NoteFormValues;
  submitLabel?: string;
  onSubmit: (values: NoteFormValues) => void | Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export const EMPTY_VALUES: NoteFormValues = {
  title: "",
  description: "",
  category: "",
};

export interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
}

export interface UpdateNoteArgs {
  id: string;
  values: NoteFormValues;
}

export interface NoteDialogProps {
  note: Note | null;
  open: boolean;
  mode: "edit" | "add";
  onClose: () => void;
}

export interface NoteListProps {
  selectedCategories: NoteCategory[];
  searchValue: string;
}

export interface NoteFilterProps {
  selectedCategories: NoteCategory[];
  onChange: (categories: NoteCategory[]) => void;
}

export interface NoteSearchProps {
  searchValue: string;
  onChange: (value: string) => void;
}
