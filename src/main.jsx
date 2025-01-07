import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToasterProvider } from "./providers/Toaster.jsx";
import ThemeConfig from "./theme/";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeConfig>
      <App />
      <ToasterProvider />
    </ThemeConfig>
  </StrictMode>
);