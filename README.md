# prava-ui-docs

Docs and playground site for Prava UI (v1 components). Runs on **React 18.3** and is built only from [`@pravalabs/ui`](https://www.npmjs.com/package/@pravalabs/ui) components, installed from npm.

## Setup

```sh
npm install
npm run dev
```

To pick up a new library release: `npm install @pravalabs/ui@latest`.

## Add a component

Create one file in `src/docs/`. The filename is the URL (`src/docs/tag.tsx` → `#/tag`). Nothing else needs registering.

```tsx
import { Button } from "@pravalabs/ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Button",
  group: "Forms", // Layout | Forms | Feedback | Overlays | Navigation | Display | Configuration
  description: "One sentence.",
  importPath: "@pravalabs/ui/button",
  examples: [{ title: "Basic", render: () => <Button>Click</Button> }],
} satisfies ComponentDoc;
```

The page shows each example in a card, plus the file's source under "Example source". The header toggles theme and RTL through `PravaProvider`.
