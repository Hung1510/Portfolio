import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { ogPages } from "./scripts/og-pages.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Per-route copies of index.html with that page's og:/twitter: tags, so
    // shared links show the right preview (crawlers don't run JS).
    ogPages({
      siteUrl: "https://giahung-portfolio.vercel.app",
      defaultImage: "/preview/preview.png",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
});