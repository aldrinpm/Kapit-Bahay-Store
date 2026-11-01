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
- Not yet implemented. This starter package contains requirements and agent instructions only.

## Known constraints
- Prices use Philippine pesos (₱).
- Sample inventory should reflect locally familiar products and plausible retail prices.
- Checkout must be clearly labeled as a simulation.
