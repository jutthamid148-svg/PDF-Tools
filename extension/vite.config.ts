import { resolve } from "node:path";
import { copyFile } from "node:fs/promises";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const extensionRoot = resolve(process.cwd(), "extension");
const extensionOutput = resolve(process.cwd(), "dist-extension");

export default defineConfig({
  root: extensionRoot,
  plugins: [
    react(),
    {
      name: "copy-extension-manifest",
      closeBundle: async () => {
        await copyFile(resolve(extensionRoot, "manifest.json"), resolve(extensionOutput, "manifest.json"));
      },
    },
  ],
  build: {
    outDir: extensionOutput,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(extensionRoot, "index.html"),
        background: resolve(extensionRoot, "src/background.ts"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
  publicDir: resolve(extensionRoot, "public"),
});
