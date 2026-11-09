---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: []
---

Scope: the whole docs site (home, Get started, guides, component pages). Mode: Read.
Audience: evaluators and existing users, equally. Job: understand Prava UI in seconds, and find any component, prop or example in two keystrokes.
Content: component docs in `src/docs/*.tsx`; Get started, theming, RTL and i18n, and forms guides from `../prava-ui/README.md`; props from the library's TSDoc.
Constraints: Cobalt Porcelain only (`../prava-ui/DESIGN.md`), built with Prava components; keyboard, focus, contrast and RTL at the library's bar; no fabricated proof.

## Direction contract

THESIS: A reference book's index and thumb tabs. The home page is the index, and every component is one search or one glance away. It refuses the category default of a marketing hero over a card grid.

OWN-WORLD: Cobalt Porcelain. Cool porcelain canvas, glazed white surfaces with a hairline top rim, and cobalt only for selection, the current section and the primary action. Index groups are headed by small uppercase labels over a hairline rule. Names are semibold, with muted one-line purposes beside them. Code sits in sunken wells.

STORY: An evaluator reads the one-line promise, sees the install command and the whole catalogue at once, and opens a component. An existing user presses Ctrl K or `/`, types a few letters, and lands on the page. On a component page, the Examples, Props and Accessibility tabs answer the three questions people bring.

FIRST VIEWPORT: A 60px top bar with the brand, the Get started, Components and Guides tabs, a search field with its shortcut, and theme and RTL controls on the end. Below it, a two-column lead: an H1 of at most 16 characters per line with a 17px muted pitch on the left, and on the right a raised card with the install command and the Get started primary button. Below that, the catalogue as four columns of group, name and purpose. The primary action is Get started in the install card.

FORM: Search-first index. Position 3 of 7 on my ordered list, dealt as the lead. seed:22d8248a01bc6103

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
