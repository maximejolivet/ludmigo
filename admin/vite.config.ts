import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

// Back office : servi sous /admin, derrière le proxy local http://ludmigo.test (voir docker/local/Caddyfile)
// Back office: served under /admin, behind the local proxy http://ludmigo.test (see docker/local/Caddyfile)
export default defineConfig({
  base: '/admin/',
  plugins: [react(), tailwindcss()],
  resolve: {
    // Voir src/shims/query-string.ts / See src/shims/query-string.ts
    alias: { 'query-string': fileURLToPath(new URL('./src/shims/query-string.ts', import.meta.url)) },
  },
  server: {
    host: true,
    port: 5174,
    strictPort: true,
    allowedHosts: ['ludmigo.test'],
    // Adresse directe http://localhost:5174/admin/ : /api est relayé vers l'API locale, comme le fait le proxy ludmigo.test
    // Direct address http://localhost:5174/admin/: /api is forwarded to the local API, as the ludmigo.test proxy does
    proxy: { '/api': 'http://127.0.0.1:8000' },
  },
  test: {
    environment: 'jsdom',
  },
});
