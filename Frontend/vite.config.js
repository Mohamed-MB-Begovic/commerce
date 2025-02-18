import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    "proxy":{"/api":"https://commerce-r7xq.onrender.com"}
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
