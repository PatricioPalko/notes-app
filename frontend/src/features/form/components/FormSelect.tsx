import { MenuItem, TextField } from "@mui/material";
import { type FormSelectProps } from "../../../types/globals";

export default function FormSelect({
  label,
  placeholder = "Select category",
  options,
  field,
  fieldState,
}: FormSelectProps) {
  return (
    <TextField
      {...field}
      select
      label={label}
      placeholder={placeholder}
      fullWidth
      required
      error={Boolean(fieldState.error)}
      helperText={fieldState.error?.message}
      sx={{
        mt: 2,

        "& .MuiInputLabel-root.Mui-focused": {
          color: "text.primary",
        },

        "& .MuiOutlinedInput-root": {
          borderRadius: 2,

          "&.Mui-focused fieldset": {
            borderColor: "text.primary",
          },
        },
      }}
    >
      <MenuItem value="" disabled>
        {placeholder}
      </MenuItem>

      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
