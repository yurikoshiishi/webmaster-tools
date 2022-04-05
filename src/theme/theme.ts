import { createTheme } from "@mui/material/styles";
import { indigo, red, yellow } from "@mui/material/colors";

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: indigo[700],
    },
    secondary: {
      main: yellow[600],
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: `'ui-sans-serif','system-ui','-apple-system','BlinkMacSystemFont','Helvetica Neue','Arial','Hiragino Kaku Gothic ProN','Hiragino Sans','Meiryo','sans-serif'`,
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          textTransform: "none",
        },
      },
    },
  },
});
