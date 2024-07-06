"use client";

import { createTheme } from "@mui/material/styles";
import { roboto } from "@/app/ui/font";

// primary: #81D8CF
// secondary: #d8818a

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
  },
});

export default theme;
