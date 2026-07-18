import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";

import {
  NOTE_CATEGORIES,
  type NoteCategory,
  type NoteFilterProps,
} from "../../../types/globals";

export default function NoteFilter({
  selectedCategories,
  onChange,
}: NoteFilterProps) {
  const allSelected = selectedCategories.length === NOTE_CATEGORIES.length;

  const partiallySelected = selectedCategories.length > 0 && !allSelected;

  const handleToggleAll = (checked: boolean): void => {
    onChange(checked ? NOTE_CATEGORIES.map((category) => category.value) : []);
  };

  const handleToggleCategory = (
    category: NoteCategory,
    checked: boolean,
  ): void => {
    onChange(
      checked
        ? [...selectedCategories, category]
        : selectedCategories.filter((item) => item !== category),
    );
  };

  return (
    <Box sx={{ pt: 6, px: 1, textAlign: "left" }}>
      <Typography variant="h3">Note filter</Typography>

      <FormGroup row>
        <FormControlLabel
          label="All"
          control={
            <Checkbox
              checked={allSelected}
              defaultChecked
              indeterminate={partiallySelected}
              onChange={(_, checked) => handleToggleAll(checked)}
              sx={{
                color: "text.primary",
                "&.Mui-checked": {
                  color: "text.primary",
                },
                "&.MuiCheckbox-indeterminate": {
                  color: "text.primary",
                },
              }}
            />
          }
        />

        {NOTE_CATEGORIES.map((category) => (
          <FormControlLabel
            key={category.value}
            label={category.label}
            control={
              <Checkbox
                checked={selectedCategories.includes(category.value)}
                onChange={(_, checked) =>
                  handleToggleCategory(category.value, checked)
                }
                sx={{
                  color: "text.primary",
                  "&.Mui-checked": {
                    color: "text.primary",
                  },
                }}
              />
            }
          />
        ))}
      </FormGroup>
    </Box>
  );
}
