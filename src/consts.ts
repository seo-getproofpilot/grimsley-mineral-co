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

// Care / disclosure flags -> human labels shown on cards and detail pages.
export const CARE_LABELS: Record<string, string> = {
  "water-soluble": "Water-soluble",
  "fades-in-sun": "Fades in sun",
  "treated": "Treated",
  "fragile": "Fragile",
};

// Tier metadata for the minerals page split (decor vs collector).
export const TIERS = [
  { key: "vault", label: "The Vault", note: "Standout specimens, $150 and up. The best of what we've cataloged." },
  { key: "collector", label: "Collector Specimens", note: "Documented pieces with real localities, $25 to $150. Sized and honestly described." },
  { key: "bin", label: "The Bin", note: "Fun, affordable material under $25. Great starters, gifts, and grab-and-go." },
];
