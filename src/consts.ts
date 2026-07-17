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

// ---------------------------------------------------------------------------
// SITE CONFIG — single source of truth for contact + business details.
// The three CONFIRM_ values below are the only things Marcos/Taylor need to
// verify before launch. Everything on the site reads from here, so it is a
// one-line change in one place, not a hunt across pages.
// ---------------------------------------------------------------------------
export const SITE = {
  name: "Grimsley Mineral Co.",
  tagline: "Cataloged minerals, fossils, hand-built lava lamps, and collector coins.",
  url: "https://seo-getproofpilot.github.io/grimsley-mineral-co",

  // CONFIRM: the inbox that contact-form messages should land in.
  email: "grimsleymineralco@gmail.com",

  address: {
    street: "5521 South York Hwy",
    city: "Grimsley",
    state: "TN",
    zip: "38565",
    // Grimsley, TN — used for LocalBusiness geo + map.
    lat: 36.2620,
    lng: -84.9866,
  },

  // Bugged Out Nails (Taylor). CONFIRM: real handles before launch.
  social: {
    instagram: "https://www.instagram.com/buggedoutnails",
    facebook: "https://www.facebook.com/buggedoutnails",
  },

  // The grand-opening event. Booth is cash + in person.
  event: {
    name: "Highway 127 Yard Sale",
    startDate: "2026-08-06",
    endDate: "2026-08-09",
    dates: "August 6–9, 2026",
  },
} as const;

// Full one-line address for display + schema.
export const FULL_ADDRESS = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.state} ${SITE.address.zip}`;

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
