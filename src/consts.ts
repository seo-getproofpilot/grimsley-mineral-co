// Base-aware URL helper. import.meta.env.BASE_URL is '/' in local dev/preview
// and '/grimsley-mineral-co' on GitHub Pages (set via PAGES_BASE). Joins with a
// single slash regardless of whether BASE has a trailing slash. Use u() for
// EVERY internal link and image so both environments resolve correctly.
const BASE = import.meta.env.BASE_URL;

export function u(path = ""): string {
  const b = BASE.replace(/\/+$/, "");
  const p = String(path).replace(/^\/+/, "");
  return p ? `${b}/${p}` : `${b}/`;
}
