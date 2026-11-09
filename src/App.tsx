import { PravaProvider, Toaster } from "prava-ui";
import { useEffect, useState } from "react";
import { Catalogue } from "./pages/Catalogue";
import { DocPage } from "./pages/DocPage";
import { GetStarted } from "./pages/GetStarted";
import { Home } from "./pages/Home";
import { docs } from "./registry";
import { useRoute } from "./router";
import { GithubIcon, Logo, MonitorIcon, MoonIcon, SearchIcon, SunIcon } from "./ui/icons";
import { Search } from "./ui/Search";

type Theme = "light" | "dark" | "system";

const stored = <T extends string>(key: string, fallback: T): T => {
  try {
    return (localStorage.getItem(key) as T) || fallback;
  } catch {
    return fallback;
  }
};
const store = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable */
  }
};

const THEMES = [
  { value: "light", label: "Light theme", Icon: SunIcon },
  { value: "dark", label: "Dark theme", Icon: MoonIcon },
  { value: "system", label: "System theme", Icon: MonitorIcon },
] as const;

export function App() {
  const route = useRoute();
  const [theme, setTheme] = useState<Theme>(() => stored("prava-docs-theme", "system"));
  const [rtl, setRtl] = useState(false);
  const [searching, setSearching] = useState(false);
  const doc = docs.find((d) => d.slug === route);
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

  useEffect(() => {
    // Let the page background (overscroll, body) follow the chosen theme.
    document.documentElement.dataset.pravaTheme = theme;
    store("prava-docs-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.title = doc
      ? `${doc.name} · Prava UI`
      : route === "get-started"
        ? "Get started · Prava UI"
        : route === "components"
          ? "Components · Prava UI"
          : "Prava UI · React components that look finished";
  }, [doc, route]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement).closest("input, textarea, select, [contenteditable]");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setSearching(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  let page;
  if (doc) page = <DocPage key={doc.slug} doc={doc} />;
  else if (route === "get-started") page = <GetStarted />;
  else if (route === "components")
    page = (
      <div className="page">
        <header className="doc__head">
          <p className="kicker">Catalogue</p>
          <h1>Components</h1>
          <p className="doc__lede">
            {docs.length} components, each rendered live from the package. Pick one to see its examples and code.
          </p>
        </header>
        <Catalogue />
      </div>
    );
  else page = <Home />;

  return (
    <PravaProvider theme={theme} direction={rtl ? "rtl" : "ltr"} locale={rtl ? "ar" : "en"}>
      <div className="site">
        <a className="skip" href="#main" onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
        }}>
          Skip to content
        </a>
        <header className="topbar">
          <a className="brand" href="#/">
            <Logo />
            <span>Prava UI</span>
          </a>
          <nav className="topnav" aria-label="Main">
            <a href="#/get-started" aria-current={route === "get-started" ? "page" : undefined}>
              Get started
            </a>
            <a href="#/components" aria-current={route === "components" || doc ? "page" : undefined}>
              Components
            </a>
          </nav>
          <button type="button" className="searchbtn" onClick={() => setSearching(true)}>
            <SearchIcon />
            <span className="searchbtn__text">Search components</span>
            <kbd>{isMac ? "⌘" : "Ctrl"} K</kbd>
          </button>
          <div className="topbar__end">
            <div className="seg seg--icons" role="group" aria-label="Site theme">
              {THEMES.map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  aria-label={label}
                  title={label}
                  aria-pressed={theme === value}
                  onClick={() => setTheme(value)}
                >
                  <Icon />
                </button>
              ))}
            </div>
            <div className="seg">
              <button type="button" aria-pressed={rtl} onClick={() => setRtl(!rtl)} title="Mirror the site right-to-left">
                RTL
              </button>
            </div>
            <a
              className="iconlink"
              href="https://github.com/dineshdcshinde/prava-ui"
              aria-label="Prava UI on GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon width={18} height={18} />
            </a>
          </div>
        </header>

        <main id="main" tabIndex={-1} className="main">
          {page}
        </main>

        <footer className="footer">
          <span>
            <Logo /> Prava UI · MIT licensed · 1.0 release candidate
          </span>
          <span>This site is built with Prava UI components.</span>
        </footer>

        <Search open={searching} onOpenChange={setSearching} />
        <Toaster />
      </div>
    </PravaProvider>
  );
}
