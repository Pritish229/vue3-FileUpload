import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"), // Your main entry file
      name: "Vue3Fileinput",
      fileName: (format) => `vue3-fileinput.${format}.js`,
      formats: ["es", "umd"]
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        },
        exports: "named"
      }
    }
  }
});
