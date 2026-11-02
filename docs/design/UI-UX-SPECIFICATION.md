# UI/UX Specification

## Resources and Reference
- Use components from https://21st.dev/, choose components that best suits to this project
- Landing background page must be animated or moving or reactive to mouse movement
- Choose animated buttons

## Experience principles
- Friendly and familiar, not corporate or intimidating.
- Mobile-first, with fast access to search, categories, and cart.
- Product imagery and PHP pricing are easy to scan.
- Clear feedback for add-to-cart, validation, and checkout actions.
- Keep the page visually calm and avoid excessive promotional clutter.

## Proposed page composition

1. **Announcement strip (optional):** delivery/service note or current promotion.
2. **Header:** brand, desktop navigation, search, cart indicator.
3. **Hero:** concise headline, supporting copy, primary “Shop now” action, supporting product/lifestyle visual.
4. **Category shortcuts:** clear category names and simple illustrations/icons.
5. **Promotion section:** a small number of featured offers.
6. **Product catalog:** section heading, search/filter/sort controls, responsive product grid.
7. **Trust/value strip:** neighborhood convenience, everyday essentials, friendly service. Do not make unsupported claims such as guaranteed delivery.
8. **Store information/footer:** contact placeholders clearly marked as sample content.

## Product card
- Product image with consistent aspect ratio and neutral background.
- Optional discount/bestseller badge.
- Product name.
- Price and optional previous price.
- Stock status when useful.
- Add button with clear disabled state.

## Cart interaction
Choose either a side drawer or dedicated in-page panel. Ensure it is keyboard accessible, has a clear close action, and does not obscure important mobile controls.

## Product details
Use an accessible dialog or detail panel. Include image, description, price, stock, quantity selector, and add action.

## Checkout and confirmation
Keep checkout concise. Show customer form and order summary clearly. State prominently that this is a demo and no actual order or payment will be processed.

## Responsive behavior
- Mobile: compact header, accessible menu, one/two-column product grid depending on width, full-width checkout controls.
- Tablet: balanced grid and compact filters.
- Desktop: wider product grid and clear content max-width.
- Avoid horizontal scrolling at all supported widths.

## Visual system
Use design tokens for colors, spacing, typography, radii, shadows, and breakpoints. Suggested palette: deep green, warm yellow, orange accent, warm off-white, charcoal. Choose accessible shades and verify text contrast rather than relying on color names alone.
- Theme: the app supports a user-toggled dark/light theme. Default follows the OS preference, the choice persists in `localStorage` (`kapit-theme`), and an inline script applies it before first paint so no theme flash occurs. Dark palette: near-black warm-green page, elevated `#1A231C` surfaces, ivory text; brand yellow/orange accents stay unchanged.

## Interaction and accessibility
- Visible keyboard focus.
- Semantic headings and landmarks.
- Labels for all form fields.
- Dialog focus management and Escape behavior.
- Buttons have clear accessible names.
- Announce cart updates accessibly where practical.
- Respect reduced-motion preferences.
