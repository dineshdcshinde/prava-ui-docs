# prava-ui-docs

Docs and playground site for Prava UI (v1 components). Runs on **React 18.3** and is built only from `prava-ui` components, consumed through `npm link`.

## Setup

```sh
# 1. In the library: build and register the global link
cd C:\prava-ui
npm run build
npm link

# 2. In this site: install and link
cd C:\prava-ui-docs
npm install
npm run link:prava   # re-run after every `npm install`, which removes the link
npm run dev
```

After changing the library, run `npm run build` in `C:\prava-ui` and reload the site.

## Add a component

Create one file in `src/docs/`. The filename is the URL (`src/docs/tag.tsx` → `#/tag`). Nothing else needs registering.

```tsx
import { Button } from "prava-ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Button",
  group: "Forms", // Layout | Forms | Feedback | Overlays | Navigation | Display | Configuration
  description: "One sentence.",
  importPath: "prava-ui/button",
  examples: [{ title: "Basic", render: () => <Button>Click</Button> }],
} satisfies ComponentDoc;
```

The page shows each example in a card, plus the file's source under "Example source". The header toggles theme and RTL through `PravaProvider`.

## npm link notes

- `vite.config.ts` dedupes `react`/`react-dom` and `tsconfig.json` maps the React types, because the linked library has React 19 in its own `node_modules`. Real consumers who run `npm install prava-ui` don't need either.
