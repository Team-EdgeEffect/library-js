import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), dts({})],
  build: {
    lib: {
      entry: resolve(__dirname, "src/library-index.js"),
      name: "MyPowerfulName",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.esm.js" : "index.cjs.js"),
      // fileName: (format, fileName) => {
      //   return `index.${format}.js`;
      // },
    },
    rollupOptions: {
      external: ["react", "react-dom"], // 번들에 포함하지 않을 외부 의존성
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
