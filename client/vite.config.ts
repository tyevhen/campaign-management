import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  preview: {
    port: parseInt(process.env.CLIENT_PORT ?? "5173", 10),
    host: "0.0.0.0",
  },
  plugins: [react()],
});
