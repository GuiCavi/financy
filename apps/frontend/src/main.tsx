import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Toaster } from "@/components/ui/sonner";

import App from "./App";
import { ThemeProvider } from "./providers/theme-provider";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
      <Toaster richColors />
    </ThemeProvider>
    <TanStackDevtools plugins={[formDevtoolsPlugin()]} />
  </StrictMode>,
);
