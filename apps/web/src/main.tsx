import "./app.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";
import { setupApplication } from "./setupApp.ts";
import { Toaster } from "./shared/ui/Toaster.tsx";
import { Provider } from "./shared/ui/Provider.tsx";
import { THEME_STORAGE_KEY } from "./core/const/appConfig.ts";

setupApplication(); // Setup application config before start layout

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider storageKey={THEME_STORAGE_KEY}>
      <App />
      <Toaster />
    </Provider>
  </StrictMode>
);
