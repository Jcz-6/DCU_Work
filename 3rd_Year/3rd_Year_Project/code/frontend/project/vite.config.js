import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'
import { splitVendorChunkPlugin } from 'vite'

const cssFileName = 'index.min.css'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (file) => {
          return `assets/css/${cssFileName}`
        },
        entryFileNames: (file) => {
          return `assets/js/[name].min.js`
        }
      }
    }
  },
  root: ".",
  plugins: [react(), splitVendorChunkPlugin()],
  base: process.env.NODE_ENV === "production" ? "/static/" : "/",
  server: {
    host: true,
  },
});
