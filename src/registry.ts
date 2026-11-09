import type { ReactNode } from "react";

export type Example = { title: string; render: () => ReactNode };

export type ComponentDoc = {
  name: string;
  group: "Layout" | "Forms" | "Feedback" | "Overlays" | "Navigation" | "Display" | "Configuration";
  description: string;
  /** Subpath import, e.g. "prava-ui/button". */
  importPath: string;
  examples: Example[];
};

// Adding a component = dropping one file in ./docs. The filename becomes the URL slug.
const modules = import.meta.glob<ComponentDoc>("./docs/*.tsx", { eager: true, import: "default" });
const sources = import.meta.glob<string>("./docs/*.tsx", {
  eager: true,
  query: "?raw",
  import: "default",
});

const slugOf = (path: string) => path.slice("./docs/".length, -".tsx".length);

export const docs = Object.entries(modules)
  .map(([path, doc]) => ({ ...doc, slug: slugOf(path), source: sources[path] }))
  .sort((a, b) => a.name.localeCompare(b.name));

export type RegisteredDoc = (typeof docs)[number];
