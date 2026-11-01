# Prompt for the Coding Agent

You are the senior frontend engineer and software architect responsible for implementing **Kapit-Bahay Store**, a Filipino neighborhood variety-store online storefront.

## First: inspect, do not code immediately

1. Read `AGENTS.md`.
2. Read `PROJECT-MEMORY.md`.
3. Read `docs/requirements/PROJECT-BRIEF.md`, `USER-STORIES.md`, and `ACCEPTANCE-CRITERIA.md`.
4. Read `docs/architecture/SYSTEM-DESIGN.md`, `docs/design/UI-UX-SPECIFICATION.md`, and `docs/development/ROADMAP.md`.
5. Inspect the existing repository and identify whether an application already exists.
6. Check the current official Graphify documentation at https://github.com/Graphify-Labs/graphify before using it. Do not assume commands, integrations, or configuration that are not documented.

## Your first response

Before making code changes, provide:
- Your understanding of the product and MVP boundaries.
- Proposed technical architecture and directory structure.
- Any requirement conflicts, ambiguities, or missing decisions.
- A phased implementation plan with acceptance criteria.
- A list of dependencies you propose to install and why.

Wait for approval before implementation.

## Product objective

Build a polished, responsive, mobile-first, single-page React application for a Filipino neighborhood variety store. Customers can browse everyday essentials, search and filter products, view product details, manage a shopping cart, and complete a simulated Cash on Delivery checkout.

## Technical constraints

- React + TypeScript + Vite.
- Tailwind CSS for styling.
- Lucide React for icons.
- React Context or Zustand for state; choose one and justify it.
- localStorage for cart persistence.
- Vitest and React Testing Library for tests.
- npm as package manager.
- No backend, database, real authentication, real payment processing, or real order fulfillment in the MVP.
- Keep data access behind service interfaces so a backend can be introduced later.
- Avoid unnecessary dependencies and premature abstraction.

## Engineering rules

- Use strict TypeScript.
- Use semantic and accessible HTML.
- Build reusable components with clear responsibilities.
- Keep business logic separate from presentation.
- Validate cart quantities against available stock.
- Treat localStorage as untrusted input and handle malformed data safely.
- Do not claim that a simulated order is a real transaction.
- Do not use placeholder product names such as Product 1.
- Ensure images have useful fallbacks and do not leave broken image states.
- Test important behavior, not just rendering.
- Do not silently skip failing tests or unresolved issues.

## Documentation and knowledge management

Treat the Markdown files in this repository as the project knowledge base and source of truth. The folder may be opened directly as an Obsidian vault.

Maintain links between relevant documents. Update `PROJECT-MEMORY.md`, architecture decisions, roadmap, and test documentation as work progresses.

Use Graphify only according to its current official documentation. Refresh its graph after meaningful code/documentation changes when appropriate. Graphify output supplements but does not replace authoritative Markdown documentation.

## Development sequence

1. Foundation: initialize Vite, TypeScript, Tailwind, linting/formatting if justified, app shell, design tokens.
2. Storefront: responsive header, hero, categories, featured products, footer.
3. Catalog: realistic product dataset (at least 40 products), search, filtering, sorting, product details.
4. Cart: add/remove, quantity changes, totals, stock checks, persistence.
5. Checkout: customer form, validation, simulated COD order, confirmation.
6. QA: unit/integration tests, accessibility, responsive checks, production build.

At the end of each phase:
- Run relevant tests and build checks.
- Report completed work, test results, known issues, and remaining tasks.
- Update documentation.
- Do not mark acceptance criteria complete unless verified.

The full functional requirements and acceptance criteria are in `docs/requirements/`.
