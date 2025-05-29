import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
  proxy: {
    '/vin': 'http://localhost:3000',
    '/makes': 'http://localhost:3000',
    '/models': 'http://localhost:3000',
    '/vehicles': 'http://localhost:3000',
  },
},
});