# Project Memory

> The coding agent must keep this file concise and current. Record durable decisions and verified project state, not a transcript of every action.

## Product
- Working name: Kapit-Bahay Store
- Tagline: Everyday Essentials, Just Around the Corner.
- Market: Filipino consumers and neighborhood variety-store customers.
- Product: Mobile-first, frontend-only e-commerce storefront SPA.

## MVP boundaries
- Product browsing, search, category filtering, sorting, product detail view.
- Cart management and localStorage persistence.
- Simulated Cash on Delivery checkout and order confirmation.
- No backend, database, real payment, real authentication, or fulfillment.

## Technology direction
- React, TypeScript, Vite, Tailwind CSS.
- Lucide React icons.
- React Context or Zustand (decision to be recorded in an ADR).
- Vitest and React Testing Library.
- npm.

## Decisions
- [ ] Select state management approach and record ADR.
- [ ] Confirm Tailwind setup compatible with selected version.
- [ ] Confirm product image sourcing/fallback approach.
- [ ] Confirm whether checkout form state persists (default: no).

## Current implementation status
- Frontend SPA implemented in `src/`: header, animated landing hero (mouse-reactive Spotlight backdrop, shimmer CTA, and a drag-to-spin product wheel; honours `prefers-reduced-motion`), 10 category shortcuts, product catalog, cart drawer with `localStorage` persistence, and simulated COD checkout plus order confirmation. No backend; sample data lives in `src/data`.
- 21st.dev component usage (per `docs/design/UI-UX-SPECIFICATION.md`): Spotlight (Aceternity UI) as the animated, mouse-reactive landing backdrop; Shimmer Button (shadcn/ui) as the primary hero CTA; Product Wheel (Crafter UI "Works Wheel") as the hero visual. Rebuilt 2026-11-02 as a faithful port of the registry source kept in `works-wheel.json` (repo root): one `turn` number — 0 a ring around the label, 1 a vertical 3D drum with item 0 flat at the front, each whole number an item turned past; first scroll notch/drag blows the ring into the drum; scroll cancels page scroll only mid-range and settles on an item after the burst; vertical drag with dominant-axis fallback; ArrowUp/Down; clickable right-side index; label/title crossfade; one rAF pass writes transforms directly to the DOM. No auto-spin in the original, none kept. Adaptations documented in the component header (transparent stage, `touch-action: pan-y`, type-size floors, index hidden on small screens, image-error fallback badge).
- Fixed 2026-11-02: hero content overlapped the sticky header while scrolling — the header was `z-10`, tied with the later-in-DOM hero content (`relative z-10`), so the hero painted over the stuck header. Header is now `z-40` (still below the `z-50` cart/checkout overlays).
- Verified 2026-11-02: `npm run build` (tsc + vite) passes. `npm run lint` cannot run — eslint is not installed (script exists, package missing from devDependencies).
- Fixed 2026-11-02 (mobile QA): wheel tiles are fixed-size wrappers with intrinsic image dimensions and a branded badge fallback on image error, so a failed image can never collapse into a thin white line (matches the image-fallback engineering rule); ProductCard's add-to-cart button is compact on small screens (price stacks above it, tighter paddings); the header hamburger is now functional — a menu panel whose search input shares state with the catalog grid (search lifted to `App`, so the desktop header search also filters live), plus cart shortcut, category/catalog anchors, Escape/backdrop close, and full `aria-expanded`/labels/focus-restore handling.

## Known constraints
- Prices use Philippine pesos (₱).
- Sample inventory should reflect locally familiar products and plausible retail prices.
- Checkout must be clearly labeled as a simulation.
- The Spotlight backdrop is `pointer-events: none`; mouse reactivity must be implemented by tracking the pointer at window level and scoping it to the container's bounds (fixed 2026-11-02 — do not re-attach `onMouseMove` to the overlay itself).
- VS Code Dev Tunnels (`*.devtunnels.ms` port forwarding) need `server.allowedHosts` in `vite.config.ts` (set to the `.devtunnels.ms` suffix, fixed 2026-11-02): since Vite's host validation (CVE-2025-24010) the dev server 403-blocks any other `Host` header, which blanked assets and hero images through tunnels. Keep using the suffix allowlist rather than `allowedHosts: true`.
- Dark/light theme (2026-11-02): `@custom-variant dark` with class-based `.dark` on `<html>`; tokens `kapit-night` (page), `kapit-panel` (surfaces), `kapit-light` (text) in `index.css`; zustand store `src/providers/theme.ts` seeds from the document class and persists to `kapit-theme`; no-flash inline script lives in `index.html` and must stay ahead of React boot (`ThemeToggle` buttons are in the desktop header row and the mobile menu panel, kept in sync by the store).
