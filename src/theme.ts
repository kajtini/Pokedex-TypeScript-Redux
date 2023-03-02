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
      main: "#ffb1c6",
      contrastText: "#650030",
    },
    secondary: {
      main: "#e3bdc5",
      contrastText: "#422930",
    },

    background: {
      default: "#201a1b",
    },

    text: {
      primary: "#ece0e1",
    },

    error: {
      main: "#ffb4ab",
    },
  },
});

export default theme;
