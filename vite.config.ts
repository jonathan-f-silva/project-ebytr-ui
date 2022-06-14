/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const API_HOST = process.env.API_HOST || 'localhost';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      reporter: ['text', 'lcov', 'html-spa'],
    },
  },
  server: {
    host: true,
    hmr: {
      port: 3002,
    },
    proxy: {
      '/api': {
        target: `http://${API_HOST}:3001`,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
