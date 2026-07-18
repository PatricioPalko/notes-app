import TextField, { type TextFieldProps } from "@mui/material/TextField";

type FormInputProps = Omit<TextFieldProps, "error" | "helperText"> & {
  errorMessage?: string;
  maxLength?: number;
  helperText?: string;
};

export default function FormInput({
  errorMessage,
  maxLength,
  helperText,
  slotProps,
  ...props
}: FormInputProps) {
  return (
    <TextField
      {...props}
      variant="outlined"
      fullWidth
      error={Boolean(errorMessage)}
      helperText={helperText}
      slotProps={{
        ...slotProps,
        htmlInput: {
          ...slotProps?.htmlInput,
          maxLength,
        },
      }}
      sx={{
        mt: 2,

        "& .MuiInputLabel-root": {
          color: "text.secondary",
        },

        "& .MuiInputLabel-root.Mui-focused": {
          color: "text.primary",
        },

        "& .MuiOutlinedInput-root": {
          borderRadius: 2,

          "& fieldset": {
            borderColor: "text.disabled",
          },

          "&:hover fieldset": {
            borderColor: "text.primary",
          },

          "&.Mui-focused fieldset": {
            borderColor: "text.primary",
          },
        },
      }}
    />
  );
}
