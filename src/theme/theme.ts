import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: "#F91001",
    },
    secondary: {
      main: "#0F65D0",
    },
    error: {
      main: red.A400,
    },
  },
});
