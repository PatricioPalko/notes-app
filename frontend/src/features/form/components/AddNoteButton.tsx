import Add from "@mui/icons-material/Add";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

export default function AddNoteButton({ onClick }: { onClick: () => void }) {
  return (
    <>
      <Button
        size="large"
        sx={{
          position: "fixed",
          color: "white",
          backgroundColor: "text.primary",
          px: 1,
          minWidth: 32,
          "& svg": {
            width: 20,
            height: 20,
          },
          "&:hover": {
            backgroundColor: "#c10261ff",
          },
          transform: "translate(-50%, 50%)",
        }}
        variant="contained"
        onClick={onClick}
      >
        <Add />
        <Typography
          variant="body1"
          sx={{ ml: 1, color: "white", fontWeight: 500 }}
        >
          Add note
        </Typography>
      </Button>
    </>
  );
}
