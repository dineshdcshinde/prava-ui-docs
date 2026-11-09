import { useState } from "react";
import { docs } from "../registry";

const GROUPS = ["All", ...[...new Set(docs.map((d) => d.group))].sort()];

/** Makes a live preview non-interactive so the whole card stays one link. */
const inert = (el: HTMLElement | null) => el?.setAttribute("inert", "");

export function Catalogue({ initialGroup = "All" }: { initialGroup?: string }) {
  const [group, setGroup] = useState(initialGroup);
  const shown = group === "All" ? docs : docs.filter((d) => d.group === group);

  return (
    <div className="catalogue">
      <div className="chips" role="group" aria-label="Filter by group">
        {GROUPS.map((g) => (
          <button key={g} type="button" className="chip" aria-pressed={group === g} onClick={() => setGroup(g)}>
            {g}
            <span className="chip__count">
              {g === "All" ? docs.length : docs.filter((d) => d.group === g).length}
            </span>
          </button>
        ))}
      </div>
      <ul className="cards">
        {shown.map((d) => (
          <li key={d.slug}>
            <a className="card" href={`#/${d.slug}`}>
              <div className="card__preview" ref={inert} aria-hidden="true">
                <div className="card__stage">{d.examples[0]?.render()}</div>
              </div>
              <div className="card__body">
                <span className="card__group">{d.group}</span>
                <strong className="card__name">{d.name}</strong>
                <span className="card__desc">{d.description}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
