import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const theme = extendTheme(
  withDefaultColorScheme({
    colorScheme: "messenger",
  }),
  {
    styles: {
      global: {
        "*": {
          fontFamily: `'ui-sans-serif','system-ui','-apple-system','BlinkMacSystemFont','Helvetica Neue','Arial','Hiragino Kaku Gothic ProN','Hiragino Sans','Meiryo','sans-serif'`,
        },
        "html, body, #__next": {
          height: "100%",
          width: "100%",
        },
      },
    },
  }
);
