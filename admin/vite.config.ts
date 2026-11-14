import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// Back office : servi sous /admin, derrière le proxy local http://ludmigo.test (voir docker/local/Caddyfile)
// Back office: served under /admin, behind the local proxy http://ludmigo.test (see docker/local/Caddyfile)
export default defineConfig({
  base: '/admin/',
  plugins: [react()],
  resolve: {
    // Voir src/shims/query-string.ts / See src/shims/query-string.ts
    alias: { 'query-string': fileURLToPath(new URL('./src/shims/query-string.ts', import.meta.url)) },
  },
  server: {
    host: true,
    port: 5174,
    strictPort: true,
    allowedHosts: ['ludmigo.test'],
  },
  test: {
    environment: 'jsdom',
  },
});
