# Project Brief: Kapit-Bahay Store

**Project type:** Single Page Application (SPA)  
**Category:** E-commerce / online retail  
**Target market:** Filipino consumers  
**Status:** MVP specification  
**Working brand:** Kapit-Bahay Store  
**Tagline:** Everyday Essentials, Just Around the Corner.

## 1. Vision

Build a modern, responsive online storefront for a Filipino neighborhood variety store (sari-sari store). Customers can browse everyday household essentials, discover affordable products, add items to a cart, and simulate placing an order.

The experience should combine the familiarity of a neighborhood store with the convenience and visual quality of a modern online shop. The application is frontend-only for the MVP, using sample data and browser localStorage. No backend or real transaction processing is required.

## 2. Business objectives

1. Establish an online presence for a neighborhood variety store.
2. Make everyday household products easy to discover.
3. Provide convenient online browsing and simulated ordering.
4. Promote affordable products and special offers.
5. Establish an extensible foundation for future production e-commerce capabilities.

## 3. Audience

- Filipino households and families.
- Students and working professionals.
- Neighborhood residents.
- Customers looking for affordable daily necessities.
- Smartphone users who prefer convenient online browsing.

Keep the interface understandable for customers with varying levels of digital experience.

## 4. Brand and visual direction

Brand personality: friendly, affordable, approachable, reliable, community-oriented, convenient.

Suggested palette:
- Primary: deep green.
- Secondary: warm yellow.
- Accent: orange.
- Background: warm off-white.
- Text: dark charcoal.

Use a clean contemporary grocery/e-commerce visual language. Avoid corporate-supermarket sterility, clutter, excessive gradients, and decorative animation. Product imagery should be prominent and consistent. Define reusable design tokens for color, typography, spacing, radii, shadows, and breakpoints.

## 5. Functional scope

### 5.1 Storefront
- Brand logo/name and responsive navigation.
- Search entry point and cart indicator.
- Promotional hero section.
- Product category navigation.
- Featured products, best sellers, deals, and new arrivals.
- Store information and footer.

### 5.2 Product catalog
Create at least 40 realistic sample products across:
1. Rice and Grains
2. Canned Goods
3. Instant Food
4. Snacks and Biscuits
5. Beverages
6. Personal Care
7. Household Essentials
8. Condiments and Cooking Ingredients
9. Dairy and Breakfast
10. School Supplies

Each product has a unique ID, name, description, category, PHP price, image or image reference, stock quantity, optional discount, optional promotional badge, and featured/bestseller flags. Do not use generic names such as “Product 1”.

### 5.3 Product discovery
- Search by product name.
- Filter by category.
- Sort by price and popularity.
- Filter featured and discounted products.
- Clear filters.
- Provide useful empty states.

### 5.4 Product details
Display image, name, description, price, discounted price when applicable, stock status, quantity selector, and Add to Cart action in a modal or detail panel. Prevent adding more than available stock.

### 5.5 Shopping cart
- Add and remove products.
- Increase/decrease quantities.
- Display line subtotals and cart total.
- Display cart item count.
- Prevent quantities exceeding stock.
- Persist cart in localStorage and restore after refresh.
- Handle malformed or outdated stored data safely.
- Provide an empty-cart state and Continue Shopping action.

### 5.6 Simulated checkout
Collect:
- Full name.
- Mobile number.
- Delivery address.
- Optional delivery instructions.

Payment: simulated Cash on Delivery only.

Show an order summary, validate required information, validate cart contents, generate a simulated order reference, display confirmation, and clear the cart after successful simulated submission. Explicitly state that this is a demo and no real order or payment is processed.

### 5.7 Order confirmation
Display order reference, customer details, items, quantities, total, payment method, confirmation message, and Continue Shopping action.

## 6. Technical direction

- React + TypeScript + Vite.
- Tailwind CSS.
- Lucide React.
- React Context or Zustand; select one and document the decision.
- localStorage for cart persistence.
- Vitest + React Testing Library.
- npm.

Do not add routing unless a clear requirement emerges; the initial application is one SPA view with in-page sections, overlays, and panels.

## 7. Architecture principles

- Modular, component-based architecture.
- Separate feature logic from reusable presentation components.
- Strongly typed domain models.
- Keep data access behind service interfaces to ease future API integration.
- Avoid unnecessary abstraction and dependencies.
- Centralize cart calculations and validation.
- Make the interface responsive and accessible.

Suggested structure:

```text
src/
  app/
    App.tsx
    providers/
  components/
    common/
    layout/
    navigation/
    products/
    cart/
  features/
    storefront/
    catalog/
    shopping-cart/
    checkout/
  data/
    products.ts
    categories.ts
  hooks/
  services/
    product.service.ts
    storage.service.ts
    order.service.ts
  types/
  utils/
  styles/
  main.tsx
```

Adapt this structure if the implementation demonstrates a simpler or more maintainable alternative. Document the reason.

## 8. Responsive and accessibility requirements

Support desktop, tablet, and mobile, prioritizing smartphone usability. Include responsive navigation and product grids, suitable touch targets, readable typography, no horizontal overflow, semantic HTML, accessible form labels, keyboard navigation, visible focus states, and sufficient color contrast.

## 9. Non-functional requirements

- Fast initial rendering.
- Sensible image sizing and fallbacks.
- Avoid unnecessary re-renders.
- Maintainable and consistently named code.
- Strict TypeScript with no avoidable `any`.
- Meaningful error, loading, empty, and success states.
- No major browser console errors.

## 10. Out of scope

Do not implement backend services, database integration, real authentication, real payment gateways, actual order processing, real-time inventory, admin dashboard, supplier management, delivery tracking, customer order history, or multi-store management in the MVP.

## 11. Future possibilities

Potential later enhancements include customer accounts, backend APIs, inventory and order management, payment integration, delivery management, order history, loyalty programs, promotions, recommendations, and multiple branches.

## 12. Definition of Done

- App starts with `npm run dev`.
- Storefront renders correctly.
- At least 40 realistic sample products exist.
- Search, category filtering, and sorting work.
- Product detail view works.
- Cart add/remove/quantity/total behavior works.
- Cart persists across refresh.
- Stock limits are enforced.
- Checkout validation works.
- Simulated order confirmation works and clearly indicates no real transaction.
- Responsive behavior works on mobile, tablet, and desktop.
- Relevant tests pass.
- Production build succeeds.
- No major console errors.
- Documentation reflects the delivered implementation.
