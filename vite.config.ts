// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Your other Vite configurations go here
  // For example, if your index.html is not in the root:
  root: "src", // If your index.html and main.tsx are in 'src'
  // publicDir: 'public', // If you have a separate public folder for assets
  server: {
    proxy: {
      // Proxy requests starting with '/api' to your Bun backend
      "/api": {
        target: "http://localhost:3000", // The address of your Bun backend
        changeOrigin: true, // Needed for virtual hosted sites
        // rewrite: (path) => path.replace(/^\/api/, ""), // Optional: remove '/api' prefix from request sent to backend
      },
    },
  },
});
