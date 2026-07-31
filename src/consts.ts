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

  // Where the footer email signup POSTs. Paste the Google Apps Script web-app
  // URL here (see docs/EMAIL-LIST-SETUP.md). Leave it empty and the form falls
  // back to opening a pre-filled email instead, so it is never a dead end.
  newsletterEndpoint:
    "https://script.google.com/macros/s/AKfycbx4Ly9N_ZzjuT9cnR2vXyLMoT_AHrKhR1z-j_Eaq6lW3PzbECQLapl0PkMzfjDdCD1fAw/exec",

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

// ---------------------------------------------------------------------------
// Booth pricing for the Highway 127 Yard Sale.
//
// Cash, in person, at the booth, for the run of the sale only. Discount is by
// tier, not by a raw price cutoff, because tier is the taxonomy the site
// already shows and sorts by. Worth knowing where the two diverge: three
// Collector pieces are priced under $25 (tektites $10, favosite coral $15,
// gem green fluorite $22), so they take the Collector 20% rather than the
// Bin 30% a price-band reading would give them.
//
// The Vault is deliberately excluded. Those pieces hold their value and are
// negotiated in person as they always were.
// ---------------------------------------------------------------------------
export const BOOTH_SALE = {
  discounts: { bin: 0.3, collector: 0.2, vault: 0 } as Record<string, number>,
  terms: "Cash, in person, at the booth. Online prices are unchanged.",
};

/**
 * Booth price for a piece, or null when it isn't discounted.
 * Rounded to a whole dollar so there is no coin-counting at a cash table.
 */
export function boothPrice(item: { tier?: string; price?: number; status?: string }) {
  const rate = BOOTH_SALE.discounts[item.tier ?? ""] ?? 0;
  if (!rate || !item.price || item.status !== "available") return null;
  const p = Math.round(item.price * (1 - rate));
  return p < item.price ? p : null;
}

/** The tiers that are actually discounted, as "The Bin 30%" style labels. */
export function boothTierLabels(tiers: readonly { key: string; label: string }[]) {
  return tiers
    .filter((t) => (BOOTH_SALE.discounts[t.key] ?? 0) > 0)
    .map((t) => ({ ...t, pct: Math.round(BOOTH_SALE.discounts[t.key] * 100) }))
    .sort((a, b) => b.pct - a.pct); // deepest discount reads first
}

// Tier metadata for the minerals page split (decor vs collector).
export const TIERS = [
  { key: "vault", label: "The Vault", note: "Standout specimens, $150 and up. The best of what we've cataloged." },
  { key: "collector", label: "Collector Specimens", note: "Documented pieces with real localities. Sized, sourced, and honestly described." },
  { key: "bin", label: "The Bin", note: "Fun, affordable material under $25. Great starters, gifts, and grab-and-go." },
];
