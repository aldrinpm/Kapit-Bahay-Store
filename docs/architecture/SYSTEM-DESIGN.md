# System Design

## Overview

A client-side React SPA. The UI renders a local product catalog and uses client-side state for discovery, cart, and checkout simulation. Browser localStorage persists only the cart for the MVP.

## Proposed layers

1. **App shell:** application composition, providers, global layout.
2. **Feature UI:** storefront, catalog, cart, checkout.
3. **Shared components:** buttons, inputs, badges, dialogs, product cards, empty states.
4. **Domain/types:** product, category, cart item, customer details, simulated order.
5. **Services:** product data access, cart storage, simulated order creation.
6. **Utilities:** currency formatting, validation, cart calculations.

## Data flow

- Product catalog is loaded from a typed local data source through a product service.
- Search/filter/sort state controls the visible product collection.
- Cart actions update centralized cart state.
- Cart persistence serializes validated cart data to localStorage.
- Checkout validates customer details and cart state, then creates a simulated order.
- Confirmation is presented in the SPA; no network transaction occurs.

## Proposed domain types

Define strongly typed models for:
- `Product`
- `Category`
- `CartItem`
- `CustomerDetails`
- `SimulatedOrder`
- `SortOption`

Use integer minor units (centavos) or a clearly documented PHP numeric convention for monetary calculations. Avoid floating-point surprises; format display values with `Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' })`.

## Architecture decisions to record

Create ADRs for:
- State management choice (Context vs Zustand).
- Product image source and fallback strategy.
- Tailwind version/configuration.
- Cart persistence schema and migration behavior.
- Whether modal/dialog behavior uses a library or native accessible primitives.

## Future backend readiness

Keep product, cart persistence, and order creation behind service boundaries. Do not build speculative API clients or backend abstractions beyond what the MVP needs.
