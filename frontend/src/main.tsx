import { ApolloProvider } from "@apollo/client/react";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Toaster } from "@/components/ui/sonner";
import { apolloClient } from "@/lib/apollo";

import App from "./App";
import { ThemeProvider } from "./providers/theme-provider";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ApolloProvider client={apolloClient}>
        <App />
        <Toaster richColors />
      </ApolloProvider>
    </ThemeProvider>
    <TanStackDevtools plugins={[formDevtoolsPlugin()]} />
  </StrictMode>,
);
