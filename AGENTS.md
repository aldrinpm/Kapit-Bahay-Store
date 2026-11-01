# Agent Instructions

## Source of truth
- Product scope: `docs/requirements/PROJECT-BRIEF.md`
- User-facing behavior: `docs/requirements/USER-STORIES.md`
- Completion conditions: `docs/requirements/ACCEPTANCE-CRITERIA.md`
- Architecture: `docs/architecture/SYSTEM-DESIGN.md`
- UI direction: `docs/design/UI-UX-SPECIFICATION.md`
- Delivery plan: `docs/development/ROADMAP.md`
- Test strategy: `docs/development/TEST-PLAN.md`
- Running decisions and current state: `PROJECT-MEMORY.md`

## Mandatory workflow
1. Inspect existing files before creating or overwriting anything.
2. Read the relevant documentation before implementing a feature.
3. Plan the change and identify affected components and tests.
4. Implement the smallest coherent increment.
5. Run tests and build checks.
6. Update documentation and project memory.
7. Report verified results and outstanding issues.

## Coding standards
- React function components and hooks.
- TypeScript strict mode.
- Prefer small, cohesive components.
- Avoid `any`; use explicit types.
- Keep formatting and naming consistent.
- Avoid duplicated business logic.
- Keep UI state and domain logic understandable.
- Use accessible labels, keyboard interactions, and visible focus states.
- Do not add dependencies without explaining their value.

## Scope guardrails
The MVP is a frontend-only SPA. Do not add a backend, database, real payment integration, real authentication, admin dashboard, delivery tracking, or multi-branch support unless explicitly approved.

## Graphify
Consult the current official Graphify repository documentation before installation or invocation. Never invent CLI commands, configuration keys, or Obsidian integration behavior. Graphify is supplementary; Markdown project documents remain authoritative.
