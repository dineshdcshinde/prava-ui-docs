import {
  Button,
  Dialog,
  DialogClose,
  Input,
  PravaProvider,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "prava-ui";
import { useState, type CSSProperties } from "react";
import { docs } from "../registry";
import { CodeBlock, CopyButton } from "../ui/CodeBlock";
import { ArrowIcon, CheckIcon } from "../ui/icons";
import { Catalogue } from "./Catalogue";
import { Specimen } from "./Specimen";

const INSTALL = "npm install prava-ui@next";

const INVITE = `import { Button, Dialog, DialogClose, Input } from "prava-ui";

export function InviteTeammate() {
  return (
    <Dialog
      trigger={<Button>Invite</Button>}
      title="Invite a teammate"
      description="They get an email with a link to join."
      footer={
        <>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Send invite</Button>
        </>
      }
    >
      <Input label="Work email" type="email" />
    </Dialog>
  );
}`;

// Measured with Vite 7: minified + gzip JavaScript, React excluded (see README in the docs repo).
const SIZES = [
  { label: "Badge", kb: 0.4 },
  { label: "Button", kb: 1.1 },
  { label: "Dialog", kb: 2.2 },
  { label: "Everything", kb: 17.5 },
];

const BRANDS = [
  { name: "Cobalt", vars: {} },
  { name: "Violet", vars: { p: "#7c3aed", h: "#6d28d9", a: "#5b21b6" } },
  { name: "Teal", vars: { p: "#0f766e", h: "#115e59", a: "#134e4a" } },
  { name: "Crimson", vars: { p: "#be123c", h: "#9f1239", a: "#881337" } },
] as const;

function ThemeTile() {
  const [brand, setBrand] = useState(0);
  const v = BRANDS[brand].vars as { p?: string; h?: string; a?: string };
  const style = v.p
    ? ({
        "--prava-color-primary": v.p,
        "--prava-color-primary-hover": v.h,
        "--prava-color-primary-active": v.a,
        "--prava-color-focus": v.p,
      } as CSSProperties)
    : undefined;
  return (
    <article className="tile">
      <h3>One token file restyles everything</h3>
      <p>Override a few CSS variables and every component follows. Your CSS always wins, whatever the import order.</p>
      <div className="swatches" role="radiogroup" aria-label="Brand color">
        {BRANDS.map((b, i) => (
          <button
            key={b.name}
            type="button"
            role="radio"
            aria-checked={brand === i}
            aria-label={b.name}
            className="swatch"
            style={{ background: (b.vars as { p?: string }).p ?? "var(--prava-color-primary)" }}
            onClick={() => setBrand(i)}
          />
        ))}
      </div>
      <div className="tile__demo" style={style}>
        <Button size="sm">Upgrade</Button>
        <Button size="sm" variant="outline">
          Later
        </Button>
      </div>
      <CodeBlock compact lang="css" code={`:root {\n  --prava-color-primary: ${v.p ?? "#2b4db5"};\n}`} />
    </article>
  );
}

function SizeTile() {
  const max = SIZES[SIZES.length - 1].kb;
  return (
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
      <p className="tile__note">Measured with Vite 7: minified and gzipped JavaScript, React excluded.</p>
    </article>
  );
}

function RtlTile() {
  return (
    <article className="tile">
      <h3>Right-to-left is one prop</h3>
      <p>
        <code>PravaProvider</code> sets direction, locale and the library's own text for its subtree. Arrow keys follow
        the direction.
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
  );
}

function SetupTile() {
  return (
    <article className="tile">
      <h3>No setup</h3>
      <p>Styles are compiled and load with each component. There's nothing else to configure.</p>
      <ul className="checks">
        {[
          "No Tailwind config",
          "No provider required",
          "No CSS-in-JS runtime",
          "No runtime dependencies",
          "React 18.2 and 19",
        ].map((x) => (
          <li key={x}>
            <CheckIcon /> {x}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__copy">
          <a className="eyebrow" href="#/get-started">
            <span className="eyebrow__dot" aria-hidden="true" />
            1.0 release candidate · {docs.length} components
          </a>
          <h1>
            React components that <em>look finished</em>.
          </h1>
          <p className="hero__lede">
            Accessible, responsive and themeable from the first import. Everything on the right is real Prava UI: type
            in it, switch it to dark or RTL, or name its parts.
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
        </div>
        <div className="hero__specimen">
          <Specimen />
        </div>
      </section>

      <section className="band" aria-labelledby="why">
        <div className="band__head">
          <p className="kicker">Built in, not bolted on</p>
          <h2 id="why">The details you'd otherwise build yourself</h2>
        </div>
        <div className="tiles">
          <ThemeTile />
          <SizeTile />
          <RtlTile />
          <SetupTile />
        </div>
      </section>

      <section className="band" aria-labelledby="try">
        <div className="band__head">
          <p className="kicker">Five minutes in</p>
          <h2 id="try">Paste it, and it already looks right</h2>
        </div>
        <div className="try">
          <CodeBlock code={INVITE} label="InviteTeammate.tsx" />
          <div className="try__result">
            <span className="try__label">Result</span>
            <Dialog
              trigger={<Button size="lg">Invite</Button>}
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
            <p>Focus moves into the dialog, Escape closes it, and focus returns to the button.</p>
          </div>
        </div>
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
    </>
  );
}
