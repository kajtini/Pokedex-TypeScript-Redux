import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "1rem",
        },
      },
    },
  },

  palette: {
    mode: "dark",
    primary: {
      main: "#abc7ff",
      contrastText: "#002f66",
    },
    secondary: {
      main: "#bec6dc",
      contrastText: "#283041",
    },

    background: {
      default: "#1a1b1f",
    },

    text: {
      primary: "#e3e2e6",
    },

    error: {
      main: "#ffb4ab",
    },
  },
});

export default theme;
