import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Serveur de dev : accessible via le proxy local http://ludmigo.test (voir docker/local/Caddyfile)
// Dev server: reachable through the local proxy at http://ludmigo.test (see docker/local/Caddyfile)
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    // Vite refuse les en-têtes Host inconnus ; on autorise le domaine local
    // Vite rejects unknown Host headers; allow the local domain
    allowedHosts: ['ludmigo.test'],
  },
  test: {
    environment: 'jsdom',
  },
});
