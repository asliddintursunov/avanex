import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
  preview: {
    port: 3000,
  },
  build: {
    assetsDir: "assets",
  },
  define: {
    // env variable from .env file
    // "process.env.VITE_KEY": JSON.stringify(process.env.VITE_KEY),
    "process.env.VITE_BASE_URL": JSON.stringify(process.env.VITE_BASE_URL),
  },
});
