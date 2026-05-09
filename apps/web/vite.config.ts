import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react() as Plugin[], tsconfigPaths()],
  server: {
    port: 8081,
  },
});
