import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Static SPA build for Hostinger shared hosting.
// Upload the *contents* of `dist/` to `public_html/` (see README).
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
