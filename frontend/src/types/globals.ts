import type {
  ControllerFieldState,
  ControllerRenderProps,
} from "react-hook-form";

export interface Note {
  id: string;
  title: string;
  description: string;
  category: string;
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

export const NOTE_CATEGORIES: readonly FormOption[] = [
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "ideas", label: "Ideas" },
  { value: "other", label: "Other" },
];
export type NoteCategory = (typeof NOTE_CATEGORIES)[number];

export interface NoteFormValues {
  title: string;
  description: string;
  category: NoteCategory | "";
  createdAt: string;
  updatedAt: string;
}

export interface NoteFormProps {
  defaultValues?: NoteFormValues;
  submitLabel?: string;
  onSubmit: (values: NoteFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export const EMPTY_VALUES: NoteFormValues = {
  title: "",
  description: "",
  category: "",
  createdAt: "",
  updatedAt: "",
};
