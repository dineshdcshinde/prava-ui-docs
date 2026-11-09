import { toast } from "prava-ui";
import { useState } from "react";
import { highlight } from "./highlight";
import { CheckIcon, CopyIcon } from "./icons";

export function copy(text: string, what = "Code") {
  navigator.clipboard?.writeText(text).then(
    () => toast({ title: `${what} copied`, tone: "success", duration: 2000 }),
    () => toast({ title: "Couldn't copy", description: "Your browser blocked the clipboard.", tone: "danger" }),
  );
}

export function CopyButton({ text, what, label = "Copy" }: { text: string; what?: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="copy-btn"
      aria-label={label}
      onClick={() => {
        copy(text, what);
        setDone(true);
        window.setTimeout(() => setDone(false), 1600);
      }}
    >
      {done ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}

export function CodeBlock({
  code,
  lang = "tsx",
  compact,
  label,
}: {
  code: string;
  lang?: string;
  compact?: boolean;
  label?: string;
}) {
  return (
    <div className={`code${compact ? " code--compact" : ""}`} dir="ltr">
      {label && <div className="code__label">{label}</div>}
      <pre data-lang={lang}>
        <code>{highlight(code.trim())}</code>
      </pre>
      <CopyButton text={code.trim()} />
    </div>
  );
}
