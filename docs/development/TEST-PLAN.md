# Test Plan

## Unit tests
- Currency formatting.
- Search/filter/sort functions.
- Cart calculations.
- Quantity and stock validation.
- localStorage serialization, parsing, and invalid-data recovery.
- Checkout field validation.
- Order reference generation.

## Component/integration tests
- Product catalog filtering and empty state.
- Product detail quantity selection and add action.
- Cart add/remove/update flows.
- Cart restoration after remount/reload simulation.
- Checkout errors and successful simulated confirmation.
- Cart clearing after successful simulated order.

## Manual QA
- Mobile viewport and touch interactions.
- Tablet and desktop layouts.
- Keyboard-only navigation.
- Dialog focus and Escape behavior.
- No horizontal overflow.
- Broken image fallback behavior.
- Browser console and production build.

## Completion rule
A test is not considered passed unless it has actually been executed. Report failures and known gaps; do not silently skip them.
