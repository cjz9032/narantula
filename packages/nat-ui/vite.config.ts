import { defineConfig, searchForWorkspaceRoot } from "vite";
import react from "@vitejs/plugin-react";
import dsv from '@rollup/plugin-dsv';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dsv()],
  server: {
    fs: {
      allow: [
        // search up for workspace root
        searchForWorkspaceRoot(process.cwd()),
        // custom rules
        "../packages/nat-backend/public",
      ],
    },
  },
});
