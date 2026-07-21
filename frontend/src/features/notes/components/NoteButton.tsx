import Button from "@mui/material/Button";

export default function NoteButton({
  icon,
  ariaLabel,
  onClick,
}: {
  icon: React.ReactNode;
  ariaLabel: string;
  onClick: () => void;
}) {
  return (
    <Button
      size="small"
      sx={{
        color: "text.primary",
        px: 1,
        minWidth: 32,
        borderColor: "text.disabled",
        ":hover": { borderColor: "text.primary" },
        "& svg": {
          width: 20,
          height: 20,
          fontSize: 20,
        },

        "&:hover": {
          borderColor: "text.primary",
        },
      }}
      variant="outlined"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon}
    </Button>
  );
}
