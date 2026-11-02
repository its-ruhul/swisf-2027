import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Static SPA build. Dev runs at the server root; the build uses relative asset URLs so `dist/`
// works at the domain root or in any sub-folder (the router basename is detected at runtime,
// see src/lib/base.ts). For Hostinger, upload the *contents* of `dist/` to `public_html/` (see README).
// GitHub Pages builds pass the site's absolute path with `--base` (see .github/workflows/deploy.yml).
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? './' : '/',
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
}));
