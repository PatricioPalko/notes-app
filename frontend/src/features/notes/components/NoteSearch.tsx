import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import { debounce } from "@mui/material/utils";
import { useEffect, useMemo, useState } from "react";

import FormInput from "../../form/components/FormInput";

interface NoteSearchProps {
  searchValue: string;
  onChange: (value: string) => void;
}

export default function NoteSearch({ searchValue, onChange }: NoteSearchProps) {
  const [inputValue, setInputValue] = useState(searchValue);

  const debouncedOnChange = useMemo(
    () =>
      debounce((value: string) => {
        onChange(value);
      }, 300),
    [onChange],
  );

  useEffect(() => {
    return () => {
      debouncedOnChange.clear();
    };
  }, [debouncedOnChange]);

  useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = event.target.value;

    setInputValue(value);
    debouncedOnChange(value);
  };

  const handleClear = (): void => {
    debouncedOnChange.clear();
    setInputValue("");
    onChange("");
  };

  return (
    <Box sx={{ pt: 6, px: 1, textAlign: "left" }}>
      <Typography variant="h3">Note search</Typography>

      <Box sx={{ width: "100%", maxWidth: 360 }}>
        <FormInput
          type="search"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search notes"
          slotProps={{
            input: {
              endAdornment: inputValue ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Clear search"
                    edge="end"
                    size="small"
                    onClick={handleClear}
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
