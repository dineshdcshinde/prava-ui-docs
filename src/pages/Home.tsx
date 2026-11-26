import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Dialog,
  DialogClose,
  Input,
  PravaProvider,
  Progress,
  Select,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  toast,
} from "@pravalabs/ui";
import { useState, type CSSProperties, type ReactNode } from "react";
import { docs } from "../registry";
import { CodeBlock, CopyButton } from "../ui/CodeBlock";
import { ArrowIcon, CheckIcon } from "../ui/icons";
import { Catalogue } from "./Catalogue";

const INSTALL = "npm install @pravalabs/ui react react-dom";

/* ---------- Playground: three real screens, each with the exact code that renders it ---------- */

const ROLES = [
  { value: "engineer", label: "Engineer" },
  { value: "designer", label: "Designer" },
  { value: "manager", label: "Manager" },
];

type Scenario = { id: string; label: string; file: string; code: string; render: () => ReactNode };

const SCENARIOS: Scenario[] = [
  {
    id: "signup",
    label: "Sign-up form",
    file: "SignUp.tsx",
    code: `import { Button, Checkbox, Input, Select, Stack, toast } from "@pravalabs/ui";

const roles = [
  { value: "engineer", label: "Engineer" },
  { value: "designer", label: "Designer" },
  { value: "manager", label: "Manager" },
];

export function SignUp() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toast({ title: "Account created", tone: "success" });
      }}
    >
      <Stack gap={4}>
        <Input label="Full name" required />
        <Input label="Work email" type="email" required />
        <Select label="Role" placeholder="Choose a role" options={roles} />
        <Checkbox label="Send me product updates" />
        <Button type="submit" fullWidth>
          Create account
        </Button>
      </Stack>
    </form>
  );
}`,
    render: () => (
      <form
        className="play__form"
        onSubmit={(e) => {
          e.preventDefault();
          toast({ title: "Account created", tone: "success" });
        }}
      >
        <Stack gap={4}>
          <Input label="Full name" required />
          <Input label="Work email" type="email" required />
          <Select label="Role" placeholder="Choose a role" options={ROLES} />
          <Checkbox label="Send me product updates" />
          <Button type="submit" fullWidth>
            Create account
          </Button>
        </Stack>
      </form>
    ),
  },
  {
    id: "dialog",
    label: "Invite dialog",
    file: "InviteTeammate.tsx",
    code: `import { Button, Dialog, DialogClose, Input } from "@pravalabs/ui";

export function InviteTeammate() {
  return (
    <Dialog
      trigger={<Button>Invite a teammate</Button>}
      title="Invite a teammate"
      description="They get an email with a link to join."
      footer={
        <>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button>Send invite</Button>
          </DialogClose>
        </>
      }
    >
      <Input label="Work email" type="email" />
    </Dialog>
  );
}`,
    render: () => (
      <div className="play__center">
        <Dialog
          trigger={<Button size="lg">Invite a teammate</Button>}
          title="Invite a teammate"
          description="They get an email with a link to join."
          footer={
            <>
              <DialogClose>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose>
                <Button>Send invite</Button>
              </DialogClose>
            </>
          }
        >
          <Input label="Work email" type="email" />
        </Dialog>
        <p className="play__hint">Open it with the keyboard. Focus moves in, Escape closes it, and focus comes back.</p>
      </div>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    file: "Settings.tsx",
    code: `import { Card, CardContent, CardHeader, Progress, Stack, Switch,
  Tab, TabList, TabPanel, Tabs } from "@pravalabs/ui";

export function Settings() {
  return (
    <Card>
      <CardHeader>
        <strong>Settings</strong>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="alerts">
          <TabList aria-label="Settings">
            <Tab value="alerts">Notifications</Tab>
            <Tab value="usage">Usage</Tab>
          </TabList>
          <TabPanel value="alerts">
            <Stack gap={3}>
              <Switch label="Comments on my work" defaultChecked />
              <Switch label="Weekly digest" />
              <Switch label="Product updates" defaultChecked />
            </Stack>
          </TabPanel>
          <TabPanel value="usage">
            <Progress label="Storage used" value={64} showValue />
          </TabPanel>
        </Tabs>
      </CardContent>
    </Card>
  );
}`,
    render: () => (
      <Card className="play__card">
        <CardHeader>
          <strong>Settings</strong>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="alerts">
            <TabList aria-label="Settings">
              <Tab value="alerts">Notifications</Tab>
              <Tab value="usage">Usage</Tab>
            </TabList>
            <TabPanel value="alerts">
              <div className="play__panel">
                <Stack gap={3}>
                  <Switch label="Comments on my work" defaultChecked />
                  <Switch label="Weekly digest" />
                  <Switch label="Product updates" defaultChecked />
                </Stack>
              </div>
            </TabPanel>
            <TabPanel value="usage">
              <div className="play__panel">
                <Progress label="Storage used" value={64} showValue />
              </div>
            </TabPanel>
          </Tabs>
        </CardContent>
      </Card>
    ),
  },
];

/** Brand presets. Dark values are lighter so text on them keeps its contrast. */
const BRANDS = [
  { name: "Cobalt", swatch: "#2b4db5" },
  { name: "Violet", swatch: "#7c3aed", light: ["#7c3aed", "#6d28d9", "#5b21b6"], dark: ["#b79cfb", "#c9b5fd", "#a585f8"] },
  { name: "Teal", swatch: "#0f766e", light: ["#0f766e", "#115e59", "#134e4a"], dark: ["#5ad8c6", "#86e8da", "#3fc6b3"] },
  { name: "Crimson", swatch: "#be123c", light: ["#be123c", "#9f1239", "#881337"], dark: ["#fb8197", "#fda4b4", "#f4637d"] },
] as const;

type Mode = "light" | "dark";

function brandStyle(index: number, mode: Mode): CSSProperties | undefined {
  const brand = BRANDS[index];
  if (!("light" in brand)) return undefined;
  const [p, h, a] = brand[mode];
  return {
    "--prava-color-primary": p,
    "--prava-color-primary-hover": h,
    "--prava-color-primary-active": a,
    "--prava-color-focus": p,
  } as CSSProperties;
}

function themeCss(index: number): string {
  const brand = BRANDS[index];
  if (!("light" in brand)) return "";
  const [p, h, a] = brand.light;
  const [dp, dh, da] = brand.dark;
  return `:root {
  --prava-color-primary: ${p};
  --prava-color-primary-hover: ${h};
  --prava-color-primary-active: ${a};
}
[data-prava-theme="dark"] {
  --prava-color-primary: ${dp};
  --prava-color-primary-hover: ${dh};
  --prava-color-primary-active: ${da};
}`;
}

function Playground() {
  const [scenario, setScenario] = useState(SCENARIOS[0].id);
  const [mode, setMode] = useState<Mode>("light");
  const [brand, setBrand] = useState(0);
  const current = SCENARIOS.find((s) => s.id === scenario) ?? SCENARIOS[0];
  const css = themeCss(brand);

  return (
    <section className="play" aria-label="Live playground">
      <header className="play__bar">
        <div className="seg" role="group" aria-label="Example">
          {SCENARIOS.map((s) => (
            <button key={s.id} type="button" aria-pressed={scenario === s.id} onClick={() => setScenario(s.id)}>
              {s.label}
            </button>
          ))}
        </div>
        <div className="play__controls">
          <div className="swatches" role="radiogroup" aria-label="Brand color">
            {BRANDS.map((b, i) => (
              <button
                key={b.name}
                type="button"
                role="radio"
                aria-checked={brand === i}
                aria-label={b.name}
                title={b.name}
                className="swatch"
                style={{ background: b.swatch }}
                onClick={() => setBrand(i)}
              />
            ))}
          </div>
          <div className="seg seg--sm" role="group" aria-label="Preview theme">
            {(["light", "dark"] as const).map((m) => (
              <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)}>
                {m === "light" ? "Light" : "Dark"}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="play__body">
        <div className="play__code">
          <CodeBlock key={current.id} code={current.code} label={current.file} />
          {css && <CodeBlock key={`css-${brand}`} lang="css" code={css} label="theme.css" />}
        </div>
        <PravaProvider theme={mode}>
          <div className="play__preview" style={brandStyle(brand, mode)}>
            <span className="play__label">Live result</span>
            <div className="play__stage" key={current.id}>
              {current.render()}
            </div>
          </div>
        </PravaProvider>
      </div>
    </section>
  );
}

/* ---------- Three steps ---------- */

const STEPS = [
  {
    title: "Install",
    body: "One package. Its styles are compiled and load with each component.",
    lang: "sh",
    code: INSTALL,
  },
  {
    title: "Import and use",
    body: "Render a component and it already looks right. It inherits your app's font.",
    lang: "tsx",
    code: `import { Button } from "@pravalabs/ui";

<Button>Save changes</Button>`,
  },
  {
    title: "Make it yours",
    body: "Change a few CSS variables and every component follows. Your CSS always wins.",
    lang: "css",
    code: `:root {
  --prava-color-primary: #7c3aed;
}`,
  },
];

/* ---------- Feature tiles ---------- */

const SIZES = [
  { label: "Badge", kb: 0.4 },
  { label: "Button", kb: 1.1 },
  { label: "Dialog", kb: 2.2 },
  { label: "Everything", kb: 17.5 },
];

function Checks({ items }: { items: string[] }) {
  return (
    <ul className="checks">
      {items.map((x) => (
        <li key={x}>
          <CheckIcon /> {x}
        </li>
      ))}
    </ul>
  );
}

function Tiles() {
  const max = SIZES[SIZES.length - 1].kb;
  return (
    <div className="tiles">
      <article className="tile">
        <h3>Accessible by default</h3>
        <p>Built to WCAG 2.2 AA and the WAI-ARIA patterns, so you don't wire it up yourself.</p>
        <Checks
          items={[
            "Full keyboard support",
            "Visible focus on every control",
            "Labels and errors announced",
            "Contrast checked in both themes",
            "Respects reduced motion",
          ]}
        />
      </article>

      <article className="tile">
        <h3>Right-to-left in one prop</h3>
        <p>
          <code>PravaProvider</code> sets direction, locale and the library's own text. Arrow keys follow the direction.
        </p>
        <div className="tile__demo tile__demo--panel">
          <PravaProvider direction="rtl" locale="ar" messages={{ required: "مطلوب" }}>
            <div className="mini-stack">
              <Tabs defaultValue="a">
                <TabList aria-label="أقسام">
                  <Tab value="a">الحساب</Tab>
                  <Tab value="b">الأمان</Tab>
                  <Tab value="c">الفوترة</Tab>
                </TabList>
                <TabPanel value="a">
                  <Input label="الاسم" required />
                </TabPanel>
                <TabPanel value="b">كلمة المرور والجلسات.</TabPanel>
                <TabPanel value="c">الخطة وطرق الدفع.</TabPanel>
              </Tabs>
            </div>
          </PravaProvider>
        </div>
      </article>

      <article className="tile">
        <h3>Only what you import</h3>
        <p>Each component brings its own JavaScript and CSS. Importing one doesn't pull in the rest.</p>
        <ul className="bars">
          {SIZES.map((s) => (
            <li key={s.label}>
              <span className="bars__label">{s.label}</span>
              <span className="bars__track">
                <span className="bars__fill" style={{ inlineSize: `${Math.max(3, (s.kb / max) * 100)}%` }} />
              </span>
              <span className="bars__value">{s.kb} KB</span>
            </li>
          ))}
        </ul>
        <p className="tile__note">Minified and gzipped JavaScript, React excluded.</p>
      </article>

      <article className="tile">
        <h3>Nothing to configure</h3>
        <p>Works the same in Vite, Next.js or any React app. Server Components included.</p>
        <Checks
          items={[
            "No Tailwind setup",
            "No provider required",
            "No CSS-in-JS runtime",
            "No global resets",
            "React 18.2 and 19",
          ]}
        />
      </article>
    </div>
  );
}

/* ---------- Page ---------- */

export function Home() {
  return (
    <>
      <section className="hero">
        <a className="eyebrow" href="#/components">
          <span className="eyebrow__dot" aria-hidden="true" />
          {docs.length} components, free and open source
          <ArrowIcon width={14} height={14} />
        </a>
        <h1>
          React components that <em>look finished</em>
        </h1>
        <p className="hero__lede">
          Accessible, themeable building blocks for real apps. Install one package and ship forms, dialogs and settings
          that already look right, in light, dark and right-to-left.
        </p>
        <div className="install">
          <span className="install__prompt" aria-hidden="true">
            $
          </span>
          <code>{INSTALL}</code>
          <CopyButton text={INSTALL} what="Install command" label="Copy install command" />
        </div>
        <div className="hero__actions">
          <Button href="#/get-started" size="lg" endIcon={<ArrowIcon />}>
            Get started
          </Button>
          <Button href="#/components" size="lg" variant="outline">
            Browse components
          </Button>
        </div>
      </section>

      <div className="showcase">
        <p className="showcase__hint">
          Try it: pick an example, change the brand color, switch to dark. Everything on the right is the real package.
        </p>
        <Playground />
      </div>

      <section className="band" aria-labelledby="steps">
        <div className="band__head band__head--center">
          <p className="kicker">How it works</p>
          <h2 id="steps">Three steps, and that's the whole setup</h2>
        </div>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className="steps__item">
              <span className="steps__n">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <CodeBlock compact lang={s.lang} code={s.code} />
            </li>
          ))}
        </ol>
      </section>

      <section className="band" aria-labelledby="why">
        <div className="band__head band__head--center">
          <p className="kicker">Built in, not bolted on</p>
          <h2 id="why">The details you'd otherwise build yourself</h2>
        </div>
        <Tiles />
      </section>

      <section className="band" aria-labelledby="all">
        <div className="band__head band__head--row">
          <div>
            <p className="kicker">The catalogue</p>
            <h2 id="all">Every component, rendered live</h2>
          </div>
          <Button href="#/components" variant="ghost" endIcon={<ArrowIcon />}>
            Open the full list
          </Button>
        </div>
        <Catalogue />
      </section>

      <section className="cta" aria-labelledby="cta">
        <h2 id="cta">Start building in the next five minutes</h2>
        <p>Install the package, import a component, and you're done. The guide walks you through the rest.</p>
        <div className="install install--center">
          <span className="install__prompt" aria-hidden="true">
            $
          </span>
          <code>{INSTALL}</code>
          <CopyButton text={INSTALL} what="Install command" label="Copy install command" />
        </div>
        <Button href="#/get-started" size="lg" endIcon={<ArrowIcon />}>
          Read the guide
        </Button>
      </section>
    </>
  );
}
