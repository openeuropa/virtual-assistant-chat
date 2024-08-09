import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  plugins: [react()],
  // This will prevent bundling React development code when using library mode.
  // @see https://vitejs.dev/guide/build.html#library-mode
  define:
    env.command === "build"
      ? { "process.env.NODE_ENV": "'production'" }
      : undefined,
  build: {
    lib: {
      // eslint-disable-next-line no-undef
      entry: resolve(__dirname, "src/VAEmbeddableChat.jsx"),
      formats: ["es"],
      name: "VAEmbeddableChat",
      fileName: "va-embeddable-chat",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
    copyPublicDir: false,
  },
}));
