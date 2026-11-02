import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Kapit-Bahay-Store/',
  plugins: [react()],
  server: {
    /**
     * Enable VS Code Dev Tunnels port forwarding (e.g. `*.devtunnels.ms`).
     *
     * Since the dev-server host validation (CVE-2025-24010), Vite answers 403
     * to any `Host` header outside this allowlist — which made every asset,
     * including hero images, fail when the app was opened through a tunnel.
     * Allowing the `devtunnels.ms` suffix (with its subdomains, per Vite's
     * dot-prefix rule) keeps the scope narrow: arbitrary foreign hosts stay
     * blocked, while tunnel names/regions may rotate freely.
     */
    allowedHosts: ['.devtunnels.ms'],
  },
});
