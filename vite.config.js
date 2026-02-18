import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "192.168.0.205", // 👈 allows LAN access (instead of just localhost)
    port: 5173, // 👈 you can change the port if needed
    strictPort: true, // optional: prevents Vite from switching ports if 5173 is busy
    open: false, // optional: set true if you want it to auto-open browser on start
  },
});
