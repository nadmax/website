import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Proxy all requests to /api/ to your backend server
      '/api': {
        target: 'http://localhost:8080',  // Your backend URL
        changeOrigin: true,
        secure: false, // Use this if your backend is not HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional, remove `/api` prefix
      },
    },
  }
})
