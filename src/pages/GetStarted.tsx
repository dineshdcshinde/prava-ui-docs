import { Alert, Button } from "prava-ui";
import { CodeBlock } from "../ui/CodeBlock";
import { ArrowIcon } from "../ui/icons";

const steps = [
  { id: "install", title: "Install" },
  { id: "use", title: "Use a component" },
  { id: "nextjs", title: "Next.js" },
  { id: "theming", title: "Theming and dark mode" },
  { id: "rtl", title: "Right-to-left and translations" },
  { id: "forms", title: "Forms" },
];

export function GetStarted() {
  return (
    <div className="guide">
      <aside className="toc toc--start" aria-label="On this page">
        <p>On this page</p>
        {steps.map((s) => (
          <a
            key={s.id}
            href="#/get-started"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            {s.title}
          </a>
        ))}
      </aside>

      <article className="guide__body">
        <header className="doc__head">
          <p className="kicker">Guide</p>
          <h1>Get started</h1>
          <p className="doc__lede">
            Install the package, import a component, and it's styled. There's no config file, no provider and no
            stylesheet to wire up.
          </p>
        </header>

        <Alert tone="info" title="Release candidate">
          The API is close to final, but it can still change before 1.0.0.
        </Alert>

        <section id="install" className="step">
          <span className="step__n">1</span>
          <div>
            <h2>Install</h2>
            <p>Prava UI needs React 18.2 or newer, including React 19.</p>
            <CodeBlock lang="sh" code="npm install prava-ui@next" />
          </div>
        </section>

        <section id="use" className="step">
          <span className="step__n">2</span>
          <div>
            <h2>Use a component</h2>
            <p>Import it and render it. Its styles come with it, and it inherits your app's font.</p>
            <CodeBlock
              code={`import { Button, Input } from "prava-ui";

export function Signup() {
  return (
    <form>
      <Input label="Work email" type="email" required />
      <Button type="submit">Create account</Button>
    </form>
  );
}`}
            />
            <p>To be explicit about what you load, import one component at a time:</p>
            <CodeBlock code={`import { Button } from "prava-ui/button";`} />
          </div>
        </section>

        <section id="nextjs" className="step">
          <span className="step__n">3</span>
          <div>
            <h2>Next.js</h2>
            <p>
              Works in the App Router. You can use components directly in Server Components, because the package marks
              its own client code. Functions such as <code>onClick</code> still have to come from a Client Component,
              and <code>toast()</code> is called from client code.
            </p>
          </div>
        </section>

        <section id="theming" className="step">
          <span className="step__n">4</span>
          <div>
            <h2>Theming and dark mode</h2>
            <p>Light is the default. Pick a theme for the whole page, or for any part of it:</p>
            <CodeBlock
              lang="html"
              code={`<body data-prava-theme="dark">...</body>
<section data-prava-theme="system">...</section>`}
            />
            <p>
              To use your brand's colors, override the tokens. Prava's styles sit in a cascade layer, so yours win
              whatever the import order:
            </p>
            <CodeBlock
              lang="css"
              code={`:root {
  --prava-color-primary: #7c3aed;
  --prava-color-primary-hover: #6d28d9;
  --prava-color-primary-active: #5b21b6;
}`}
            />
          </div>
        </section>

        <section id="rtl" className="step">
          <span className="step__n">5</span>
          <div>
            <h2>Right-to-left and translations</h2>
            <p>
              <code>PravaProvider</code> sets direction, locale and the library's own text for its subtree. It has no
              translation dependency, so it works with whichever library you already use.
            </p>
            <CodeBlock
              code={`import { PravaProvider } from "prava-ui";

<PravaProvider direction="rtl" locale="ar" messages={{ close: "إغلاق" }}>
  <App />
</PravaProvider>;`}
            />
            <p>
              It only affects what's inside it. To change the whole page, set <code>{'<html dir="rtl">'}</code> as well.
            </p>
          </div>
        </section>

        <section id="forms" className="step">
          <span className="step__n">6</span>
          <div>
            <h2>Forms</h2>
            <p>
              Form controls connect to react-hook-form through a <code>field</code> prop, with no extra dependency:
            </p>
            <CodeBlock code={`<Input label="Email" field={register("email")} error={errors.email?.message} />`} />
          </div>
        </section>

        <div className="guide__next">
          <Button href="#/components" size="lg" endIcon={<ArrowIcon />}>
            Browse the components
          </Button>
        </div>
      </article>
    </div>
  );
}
