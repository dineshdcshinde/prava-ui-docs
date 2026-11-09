# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two readers, equally important (owner, 2026-11-08):

- **Evaluators:** React developers deciding whether to adopt Prava UI instead of another component library.
- **Existing users:** developers already using Prava UI who need an example, a prop, or copyable code quickly, often mid-task.

## Product Purpose

This is the documentation website for Prava UI, the React component library in `../prava-ui`. Library product truth (positioning, constraints, principles) lives in `../prava-ui/PRODUCT.md` and is not repeated here.

The site has to help evaluators understand the library quickly, and help existing users find what they need in seconds.

## Capabilities and Constraints

- Vite and React 18 single-page site using hash routes. `prava-ui` is consumed through `npm link`, so the site always shows the current library.
- Component pages are registered by dropping one file into `src/docs/`. The file name becomes the URL slug, and its source is shown as the example code.
- Scope confirmed by the owner (2026-11-08): component pages, Getting started, a props table for each component, and guides (theming and dark mode, RTL and i18n, forms with react-hook-form).
- Live prop controls aren't in scope for now.
- Hosting is undecided.

## Brand Commitments

- The site is built with Prava UI components and follows Prava's Cobalt Porcelain visual world (`../prava-ui/DESIGN.md`), so the site itself shows how the library looks (owner, 2026-11-08).
- The name "Prava UI" is provisional, as recorded in the library's PRODUCT.md.

## Evidence on Hand

- Component APIs and TSDoc in `../prava-ui/src/components`.
- Install, theming and i18n guidance in `../prava-ui/README.md`.
- No users, testimonials, benchmarks or download counts exist. Don't fabricate any.

## Product Principles

1. **Show the real component:** every claim is demonstrated by a live Prava component on the page.
2. **Find it in seconds:** navigation and page structure serve someone who already knows what they're looking for.
3. **Accessible and RTL like the library:** the site meets the same keyboard, focus, contrast and RTL bar it documents.

## Accessibility & Inclusion

WCAG 2.2 AA, matching the library. The site must work with the keyboard and in RTL.
