import { Accordion, AccordionItem, PravaProvider, Select } from "prava-ui";
import { useState } from "react";
import { go } from "../router";
import { docs, type Example, type RegisteredDoc } from "../registry";
import { CodeBlock } from "../ui/CodeBlock";
import { ArrowIcon, CodeIcon } from "../ui/icons";

const groups = [...new Set(docs.map((d) => d.group))].sort();

/** Pulls one example's JSX out of the doc file's source, so each tray can show its own code. */
function snippetFor(source: string, title: string): string | undefined {
  const at = source.indexOf(`title: ${JSON.stringify(title)}`);
  if (at < 0) return;
  const arrow = source.indexOf("=>", source.indexOf("render:", at));
  if (arrow < 0) return;
  let i = arrow + 2;
  while (/\s/.test(source[i])) i++;
  let body: string;
  if (source[i] === "(") {
    let depth = 0;
    let j = i;
    for (; j < source.length; j++) {
      if (source[j] === "(") depth++;
      else if (source[j] === ")" && --depth === 0) break;
    }
    body = source.slice(i + 1, j);
  } else {
    body = source.slice(i, source.indexOf("\n", i)).replace(/\s*\}?,?\s*$/, "");
  }
  const lines = body.replace(/^\n+|\s+$/g, "").split("\n");
  const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)![0].length));
  return lines.map((l) => l.slice(indent)).join("\n");
}

function Tray({ doc, example }: { doc: RegisteredDoc; example: Example }) {
  const [theme, setTheme] = useState<"inherit" | "light" | "dark">("inherit");
  const [rtl, setRtl] = useState(false);
  const [code, setCode] = useState(false);
  const snippet = snippetFor(doc.source, example.title);
  const id = example.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <section className="tray" id={id} aria-labelledby={`${id}-h`}>
      <header className="tray__bar">
        <h3 id={`${id}-h`}>{example.title}</h3>
        <div className="tray__tools">
          <div className="seg seg--sm" role="group" aria-label={`${example.title} theme`}>
            {(["light", "dark"] as const).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={theme === t}
                onClick={() => setTheme(theme === t ? "inherit" : t)}
              >
                {t === "light" ? "Light" : "Dark"}
              </button>
            ))}
          </div>
          <div className="seg seg--sm" role="group" aria-label={`${example.title} direction`}>
            <button type="button" aria-pressed={rtl} onClick={() => setRtl(!rtl)}>
              RTL
            </button>
          </div>
          {snippet && (
            <div className="seg seg--sm">
              <button type="button" aria-pressed={code} aria-controls={`${id}-code`} onClick={() => setCode(!code)}>
                <CodeIcon /> Code
              </button>
            </div>
          )}
        </div>
      </header>
      <PravaProvider theme={theme === "inherit" ? undefined : theme} direction={rtl ? "rtl" : "ltr"}>
        <div className="tray__stage">{example.render()}</div>
      </PravaProvider>
      {snippet && code && (
        <div id={`${id}-code`} className="tray__code">
          <CodeBlock code={snippet} />
        </div>
      )}
    </section>
  );
}

export function DocPage({ doc }: { doc: RegisteredDoc }) {
  const index = docs.indexOf(doc);
  const prev = docs[index - 1];
  const next = docs[index + 1];
  const names = doc.name === "Toaster" ? "Toaster, toast" : doc.name;

  return (
    <div className="docs">
      <nav className="sidenav" aria-label="Components">
        <a className="sidenav__link" href="#/get-started">
          Get started
        </a>
        <a className="sidenav__link" href="#/components">
          All components
        </a>
        {groups.map((g) => (
          <section key={g}>
            <h2>{g}</h2>
            {docs
              .filter((d) => d.group === g)
              .map((d) => (
                <a
                  key={d.slug}
                  className="sidenav__link"
                  href={`#/${d.slug}`}
                  aria-current={d.slug === doc.slug ? "page" : undefined}
                >
                  {d.name}
                </a>
              ))}
          </section>
        ))}
      </nav>

      <article className="doc">
        <div className="doc__jump">
          <Select
            label="Jump to component"
            value={doc.slug}
            onValueChange={(v) => go(v as string)}
            searchable
            options={docs.map((d) => ({ value: d.slug, label: d.name }))}
          />
        </div>

        <header className="doc__head">
          <p className="kicker">{doc.group}</p>
          <h1>{doc.name}</h1>
          <p className="doc__lede">{doc.description}</p>
          <div className="doc__imports">
            <CodeBlock compact code={`import { ${names} } from "prava-ui";`} />
            <span className="doc__or">or, one component at a time</span>
            <CodeBlock compact code={`import { ${names} } from "${doc.importPath}";`} />
          </div>
        </header>

        <div className="doc__examples">
          {doc.examples.map((ex) => (
            <Tray key={ex.title} doc={doc} example={ex} />
          ))}
        </div>

        <Accordion>
          <AccordionItem value="source" title={`Full source of these examples (${doc.slug}.tsx)`}>
            <CodeBlock code={doc.source} />
          </AccordionItem>
        </Accordion>

        <nav className="pager" aria-label="Previous and next component">
          {prev ? (
            <a href={`#/${prev.slug}`} className="pager__link">
              <span>Previous</span>
              <strong>{prev.name}</strong>
            </a>
          ) : (
            <span />
          )}
          {next && (
            <a href={`#/${next.slug}`} className="pager__link pager__link--next">
              <span>Next</span>
              <strong>
                {next.name} <ArrowIcon />
              </strong>
            </a>
          )}
        </nav>
      </article>

      <aside className="toc" aria-label="On this page">
        <p>On this page</p>
        {doc.examples.map((ex) => (
          <a key={ex.title} href={`#/${doc.slug}`} onClick={(e) => {
            e.preventDefault();
            document.getElementById(ex.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"))?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}>
            {ex.title}
          </a>
        ))}
      </aside>
    </div>
  );
}
