import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://survey-sapiens-8de1.onrender.com',
        changeOrigin: true,
        secure: true
      },
      '/create_test_interview': {
        target: 'https://survey-sapiens-8de1.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path
      },
      '/create_phone_call': {
        target: 'https://survey-sapiens-8de1.onrender.com',
        changeOrigin: true,
        secure: true
      },
      '/start_call': {
        target: 'https://survey-sapiens-8de1.onrender.com',
        changeOrigin: true,
        secure: true
      },
      '/end_call': {
        target: 'https://survey-sapiens-8de1.onrender.com',
        changeOrigin: true, 
        secure: true
      },
      '/streaming': {
        target: 'https://survey-sapiens-8de1.onrender.com',
        changeOrigin: true,
        secure: true,
        ws: true // Enable WebSocket proxying for streaming audio
      }
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      // Define global variables for browser compatibility
      define: {
        global: 'globalThis'
      }
    }
  }
});
