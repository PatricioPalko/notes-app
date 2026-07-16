import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    text: {
      primary: "#e20273",
      secondary: "#262626",
      disabled: "#9CA3AF",
    },
    background: {
      default: "#f8f9fa",
    },
  },
  typography: {
    fontFamily: "Google Sans Flex, sans-serif",
    h1: {
      fontSize: "4em",
      fontWeight: "600",
      color: "#e20273",
    },
    h2: {
      fontSize: "3.5em",
      fontWeight: "600",
      color: "#262626",
    },
    h3: {
      fontSize: "1.1em",
      fontWeight: "600",
      color: "#262626",
    },
    body1: {
      color: "#262626",
      fontSize: "0.9em",
    },
  },
});

export default theme;
