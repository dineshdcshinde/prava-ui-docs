# Prava UI Docs

The documentation website for [**Prava UI**](https://www.npmjs.com/package/@pravalabs/ui) (`@pravalabs/ui`), a library of accessible React components that look finished out of the box.

This repository holds **only the website**. The components themselves live in the [prava-ui](https://github.com/dineshdcshinde/prava-ui) repository and are published to npm. This site installs the published package like any other app would, so every example you see is the real thing.

> Looking for how to _use_ Prava UI in your app? Run the site (below) and open **Get started**, or read the [package README](https://github.com/dineshdcshinde/prava-ui#readme).

## What's on the site

| Page            | Route             | What it shows                                                                                       |
| --------------- | ----------------- | --------------------------------------------------------------------------------------------------- |
| Home            | `#/`              | A live playground (code next to the rendered result, with brand color and dark mode), setup steps, features and the catalogue |
| Get started     | `#/get-started`   | Install, first component, Next.js, theming, RTL and forms                                            |
| Components      | `#/components`    | Every component as a card with a live preview, filterable by group                                   |
| Component pages | `#/<component>`   | Import paths and live examples, each with its own light/dark, RTL and code toggles                   |

Press <kbd>Ctrl</kbd> <kbd>K</kbd> (or <kbd>/</kbd>) anywhere to search components. The header switches the whole site between light, dark and system themes, and between left-to-right and right-to-left.

## Run it locally

You need Node.js 20.19 or newer.

```sh
git clone git@github.com:dineshdcshinde/prava-ui-docs.git
cd prava-ui-docs
npm install
npm run dev
```

Then open the address Vite prints, usually <http://localhost:5173>.

| Script            | What it does                                              |
| ----------------- | --------------------------------------------------------- |
| `npm run dev`     | Starts the dev server with hot reload                     |
| `npm run build`   | Type-checks, then builds the static site into `dist/`     |
| `npm run preview` | Serves the built `dist/` folder, to check a build locally |

## Project structure

```text
src/
├── main.tsx            Entry point
├── App.tsx             Header, footer, theme and RTL switches, routing
├── router.ts           Hash routing (#/, #/get-started, #/components, #/<slug>)
├── registry.ts         Finds every file in docs/ and turns it into a page
├── site.css            Site layout and chrome only (components bring their own CSS)
├── docs/               One file per component page  ← most edits happen here
│   ├── button.tsx
│   └── …
├── pages/
│   ├── Home.tsx        Landing page and live playground
│   ├── GetStarted.tsx  The setup guide
│   ├── Catalogue.tsx   The component card grid
│   └── DocPage.tsx     The layout every component page uses
└── ui/                 Site helpers: code blocks, syntax highlighting, search, icons
```

## Add or edit a component page

Create one file in `src/docs/`. The filename becomes the URL, so `src/docs/tag.tsx` is served at `#/tag`. There's nothing to register: the page, its sidebar link, its search entry and its catalogue card all appear automatically.

```tsx
import { Button } from "@pravalabs/ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Button",
  group: "Forms", // Layout | Forms | Feedback | Overlays | Navigation | Display | Configuration
  description: "One sentence about what it's for.",
  importPath: "@pravalabs/ui/button",
  examples: [
    { title: "Basic", render: () => <Button>Save changes</Button> },
    { title: "Outline", render: () => <Button variant="outline">Cancel</Button> },
  ],
} satisfies ComponentDoc;
```

- Each example appears in its own card. The code shown under it is read from this file, so what readers copy always matches what they see.
- The first example is also the preview on the component's catalogue card, so make it the most typical use.
- Give each example a unique `title`. It's also the card's heading and its link anchor.

## Update to a new Prava UI release

```sh
npm install @pravalabs/ui@latest
npm run build
```

Then check the CHANGELOG in the prava-ui repository and update any pages whose props or behavior changed.

## Design rules for the site

The site follows the library's own design guide (Cobalt Porcelain, in the prava-ui repo's `DESIGN.md`), so the docs look like the components they describe.

- **Use Prava tokens for every color.** Write `var(--prava-color-surface)`, never a hex value, so the site follows light, dark and any theme. The only exception is the brand presets in the home playground, which exist to show custom colors.
- **Cobalt is for actions and selection only.** Don't use the primary color for decoration.
- **Use logical properties** (`margin-inline-start`, `inset-inline-end`) so the RTL switch mirrors the layout correctly.
- **Motion explains a change, and nothing loops.** Keep animations short and check that they still work with reduced motion turned on.
- **Build the site from Prava components** wherever one fits. `site.css` covers only the layout around them.

## Deploy

`npm run build` produces a static site in `dist/`. Routing uses the URL hash, so it runs on any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages) with no rewrite rules.

## Related

- Package on npm: [`@pravalabs/ui`](https://www.npmjs.com/package/@pravalabs/ui)
- Component library source, issues and changelog: [prava-ui](https://github.com/dineshdcshinde/prava-ui)
