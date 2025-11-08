import "./app.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";
import { setupApplication } from "./setupApp.ts";
import { Toaster } from "@shared/presentation/ui/Toaster.tsx";
import { Provider } from "@shared/presentation/ui/Provider.tsx";

const { theme } = setupApplication(); // Setup application config before start layout

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider forcedTheme={theme}>
      <App />
      <Toaster />
    </Provider>
  </StrictMode>
);
