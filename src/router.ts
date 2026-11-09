import { useEffect, useState } from "react";

const read = () => window.location.hash.replace(/^#\/?/, "");

/** Hash routes: "" home, "get-started", "components", or a component slug. */
export function useRoute() {
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const onChange = () => {
      setRoute(read());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

export const go = (route: string) => {
  window.location.hash = `/${route}`;
};
