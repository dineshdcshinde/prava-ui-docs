import type { ReactNode } from "react";

// Small TSX/CSS/shell highlighter; colors come from Prava tokens in site.css.
const TOKEN =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`)|(<\/?[A-Za-z][\w.]*)|\b(import|from|export|default|const|let|return|function|type|satisfies|true|false|null|undefined|as|new|npm|install)\b|([A-Za-z-]+(?==))|(--[\w-]+)|(\b\d+(?:\.\d+)?\b)/g;

const CLASSES = ["", "tk-comment", "tk-string", "tk-tag", "tk-keyword", "tk-attr", "tk-var", "tk-number"];

export function highlight(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of code.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push(code.slice(last, i));
    const group = m.findIndex((g, n) => n > 0 && g !== undefined);
    let text = m[0];
    if (group === 3) {
      // Keep the bracket plain and color only the tag name.
      const bracket = text.startsWith("</") ? "</" : "<";
      out.push(bracket);
      text = text.slice(bracket.length);
    }
    out.push(
      <span key={key++} className={CLASSES[group]}>
        {text}
      </span>,
    );
    last = i + m[0].length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}
