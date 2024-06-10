import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "word-bank.txt",
        "robots.txt",
        "sitemap.xml",
        "wordle-infinity-banner.png",
        "wordle-infinity-icon.svg",
        "app-icon-192x192.png",
        "app-icon-512x512.png",
      ],
      manifest: {
        name: "Wordle - Infinity",
        short_name: "WordleInfinity",
        description:
          "Play Wordle - Infinity! Enjoy endless Wordle puzzles and sharpen your word skills with this infinite version of the popular game.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "app-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "app-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
