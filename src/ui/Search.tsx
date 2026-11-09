import { Dialog } from "prava-ui";
import { useEffect, useMemo, useState } from "react";
import { go } from "../router";
import { docs } from "../registry";
import { ArrowIcon, SearchIcon } from "./icons";

type Entry = { route: string; name: string; hint: string };

const ENTRIES: Entry[] = [
  { route: "get-started", name: "Get started", hint: "Guide" },
  { route: "get-started", name: "Theming and dark mode", hint: "Guide" },
  { route: "get-started", name: "Right-to-left and translations", hint: "Guide" },
  { route: "components", name: "All components", hint: "Catalogue" },
  ...docs.map((d) => ({ route: d.slug, name: d.name, hint: `${d.group} · ${d.description}` })),
];

/** Scores a fuzzy match: prefix beats substring beats in-order letters. */
function score(entry: Entry, q: string) {
  const name = entry.name.toLowerCase();
  if (!q) return 1;
  if (name.startsWith(q)) return 4;
  if (name.includes(q)) return 3;
  if (entry.hint.toLowerCase().includes(q)) return 2;
  let i = 0;
  for (const ch of name) if (ch === q[i]) i++;
  return i === q.length ? 1 : 0;
}

export function Search({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ENTRIES.map((e) => ({ e, s: score(e, q) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 8)
      .map((r) => r.e);
  }, [query]);

  useEffect(() => setActive(0), [query]);
  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  const pick = (entry?: Entry) => {
    if (!entry) return;
    onOpenChange(false);
    go(entry.route);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} title="Search the docs" size="md">
      <div className="search">
        <label className="search__field">
          <SearchIcon />
          <input
            autoFocus
            type="search"
            aria-label="Search components and guides"
            placeholder="Button, dialog, theming…"
            value={query}
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results"
            aria-activedescendant={results[active] ? `sr-${active}` : undefined}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter") {
                e.preventDefault();
                pick(results[active]);
              }
            }}
          />
        </label>
        <ul id="search-results" role="listbox" aria-label="Results" className="search__list">
          {results.map((r, i) => (
            <li
              key={r.route + r.name}
              id={`sr-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseMove={() => setActive(i)}
              onClick={() => pick(r)}
            >
              <span>
                <strong>{r.name}</strong>
                <small>{r.hint}</small>
              </span>
              <ArrowIcon />
            </li>
          ))}
          {results.length === 0 && <li className="search__empty">No matches for “{query}”.</li>}
        </ul>
        <p className="search__keys" aria-hidden="true">
          <kbd>↑</kbd> <kbd>↓</kbd> to move · <kbd>Enter</kbd> to open · <kbd>Esc</kbd> to close
        </p>
      </div>
    </Dialog>
  );
}
