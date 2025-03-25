import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"), // Entry for the library
      name: "Vue3Fileinput", // Global variable name for UMD builds
      fileName: (format) => `vue3-fileinput.${format}.js`, // Standard naming
      formats: ["es", "umd"], // Ensure both ES and UMD formats
    },
    rollupOptions: {
      external: ["vue"], // Vue should not be bundled
      output: {
        globals: {
          vue: "Vue", // UMD global
        },
        exports: "named", // Ensure named exports work properly
      },
    },
  },
});
