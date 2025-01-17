import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      protocol: "ws", // Use 'wss' se for uma conexão segura (HTTPS)
      host: "localhost",
      port: 5173, // Ou a porta que você está usando para o Vite
    },
  },
});
