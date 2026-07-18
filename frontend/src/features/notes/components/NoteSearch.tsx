import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";

import FormInput from "../../form/components/FormInput";

interface NoteSearchProps {
  searchValue: string;
  onChange: (value: string) => void;
}

export default function NoteSearch({ searchValue, onChange }: NoteSearchProps) {
  return (
    <Box sx={{ pt: 6, px: 1, textAlign: "left" }}>
      <Typography variant="h3">Note search</Typography>

      <Box sx={{ width: "100%", maxWidth: 360 }}>
        <FormInput
          type="search"
          value={searchValue}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search notes"
          slotProps={{
            input: {
              endAdornment: searchValue ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Clear search"
                    edge="end"
                    size="small"
                    onClick={() => onChange("")}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            },
          }}
        />
      </Box>
    </Box>
  );
}
