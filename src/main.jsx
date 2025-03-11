import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import App from "./App.jsx";
import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
  fontFamily: "Gill Sans, sans-serif",
  primaryColor: "blue",
});

createRoot(document.getElementById("root")).render(
  <MantineProvider theme={theme}>
    <StrictMode>
      <App />
    </StrictMode>
  </MantineProvider>
);
