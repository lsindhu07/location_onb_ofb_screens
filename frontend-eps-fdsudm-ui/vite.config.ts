import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tanstackRouter from "@tanstack/router-plugin/vite";
import path from "path";
import tsconfigPaths from 'vite-tsconfig-paths'
export default defineConfig({
  css: {
    devSourcemap: true
  },
  plugins: [
    tsconfigPaths(),
    tanstackRouter({
      autoCodeSplitting: true
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    //tsconfigPaths: true,
    dedupe: ["react", "react-dom"],
    alias: {
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
    },
  },
  server: {
    port: 3000, 
    strictPort: true, 
  },
  build: {
    //That should switch the CSS minifier from LightingCSS to esbuild
    cssMinify: 'esbuild',
  }
});