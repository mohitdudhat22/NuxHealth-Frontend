import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(fileURLToPath(import.meta.url), "../src"),
    },
    extensions: [".js", ".jsx", ".json"],
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    commonjsOptions: {
      include: [/@zegocloud\/zego-uikit-prebuilt/, /node_modules/],
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("@zegocloud/zego-uikit-prebuilt")) {
            return "zego";
          }
          if (
            id.includes("react") ||
            id.includes("react-dom") ||
            id.includes("react-router-dom")
          ) {
            return "react-vendor";
          }
          if (
            id.includes("react-icons/md") ||
            id.includes("react-icons/fa") ||
            id.includes("react-icons/ai")
          ) {
            return "icons";
          }
        },
      },
    },
    minify: "terser", // Use Terser for minification
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        keep_classnames: true,
        keep_fnames: true,
        reduce_vars: true, // Helps with eval minimization
      },
      mangle: false, // Optional: prevent mangling of names
      safari10: true, // Optional: improves Safari compatibility
    },
  },
  optimizeDeps: {
    include: ["react-icons/md", "use-isomorphic-layout-effect"],
    esbuildOptions: {
      target: "es2020",
    },
  },
});
