# Acceptance Criteria

## Catalog
- [ ] At least 40 realistic products across the 10 specified categories.
- [ ] Every product has a unique stable ID, name, description, category, PHP price, stock, and image/fallback.
- [ ] Search is case-insensitive and matches product names.
- [ ] Category filter and sorting work together.
- [ ] Clearing filters restores the full catalog.
- [ ] Empty search/filter results show a helpful message.

## Product details
- [ ] Selecting a product opens an accessible detail view.
- [ ] Quantity cannot be less than one or exceed available stock.
- [ ] Out-of-stock products cannot be added.

## Cart
- [ ] Adding an existing cart item increments or updates its quantity correctly.
- [ ] Quantity changes recalculate subtotals and total.
- [ ] Removing an item updates the cart count and total.
- [ ] Cart state is restored after refresh.
- [ ] Invalid localStorage data does not crash the application.
- [ ] Cart quantity cannot exceed current stock.

## Checkout
- [ ] Required customer fields are validated.
- [ ] Mobile number validation provides understandable feedback.
- [ ] Empty cart cannot be submitted.
- [ ] Order summary matches current cart contents.
- [ ] Successful simulation generates an order reference.
- [ ] Confirmation clearly says this is a demonstration, not a real order.
- [ ] Cart clears after successful simulated submission.

## Quality
- [ ] Layout works at mobile, tablet, and desktop widths.
- [ ] Keyboard users can operate navigation, dialogs, forms, and cart controls.
- [ ] Inputs have labels and errors are associated with fields.
- [ ] Unit/integration tests cover core business behavior.
- [ ] Production build succeeds.
- [ ] No major console errors.
