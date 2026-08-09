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
  // Feeds the Store description in schema. Kept current with the six
  // departments; it used to name only minerals, fossils and lava lamps.
  tagline:
    "Six departments in one room: minerals, fossils, gemstones, hand-built lava lamps, hand-painted press-on nails and world currency.",
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

  // Bugged Out Nails (Taylor).
  //
  // The Instagram handle is read off Taylor's own booth chalkboard in
  // public/img/departments/nails.webp, which is first-party: it is her sign, in
  // her handwriting, next to the Instagram glyph. It reads "@ buggedout.nails"
  // WITH the dot. The previous value here had no dot and was guessed from the
  // brand name, under a comment saying to confirm it before launch. It never was.
  //
  // The same chalkboard gives Facebook only as the page NAME, "Bugged Out Nails",
  // not a URL slug, so the Facebook vanity URL is still unconfirmed and is left
  // out rather than guessed a second time. Nothing renders a Facebook link while
  // this is null.
  social: {
    instagram: "https://www.instagram.com/buggedout.nails",
    facebook: null as string | null,
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
// SPECIMEN STATUS — collection vs inventory.
//
// A retail site assumes that if a thing has a page, it is for sale. That is
// too small for what this actually is. Some pieces are ours and always will
// be; some we are still trying to identify. Both are worth publishing, and
// neither should show a price.
//
// `available` is kept as the for-sale value rather than renamed to `for_sale`
// because 24 records and several filters use that exact string. The rename is
// cosmetic and can happen any time; the states below are what actually matter.
//
//   sellable  -> shows a price, an Offer in schema, and a reserve button
//   label     -> what the badge says when it is not simply for sale
// ---------------------------------------------------------------------------
export const SPECIMEN_STATUS: Record<
  string,
  { label: string; sellable: boolean; note?: string }
> = {
  available: { label: "Available", sellable: true },
  reserved: {
    label: "Reserved",
    sellable: true,
    note: "Being held for someone. Ask and we will tell you if it frees up.",
  },
  sold: { label: "Sold", sellable: false, note: "This one is gone. The page stays up." },
  collection: {
    label: "Permanent Collection",
    sellable: false,
    note: "Ours, and staying ours. Here because it is worth looking at, not because it is for sale.",
  },
  researching: {
    label: "Still Researching",
    sellable: false,
    note: "We have it, we are not done working out what it is, and we will not sell it until we are.",
  },
  coming_soon: {
    label: "Coming Soon",
    sellable: false,
    note: "Cataloged but not listed yet. Photography or measurements still to come.",
  },
};

/** Status metadata, falling back to Available for anything unrecognized. */
export function statusOf(item: { status?: string }) {
  return SPECIMEN_STATUS[item.status ?? "available"] ?? SPECIMEN_STATUS.available;
}

/** Does this piece show a dollar figure at all? */
export function showsPrice(item: { status?: string; price?: number }) {
  return statusOf(item).sellable && !!item.price;
}

// Booth pricing for the 127 lived here. The sale ran Aug 6-9 2026 and is over,
// so the discount machinery (BOOTH_SALE, boothPrice, boothTierLabels, the
// BoothBar component and the data-booth CSS) was deleted rather than left
// dormant. SITE.event stays: the 127 is now history worth telling, not an
// upcoming thing to advertise.

// ---------------------------------------------------------------------------
// JOURNAL — the running log of what we are actually doing.
//
// Separate from Field Notes on purpose. Field Notes are evergreen guides
// written for someone searching "how do I clean a fluorite specimen". The
// journal is dated, first person, and often unfinished. Mixing the two ruins
// both: the guides stop reading as reference, and the stories start reading
// as marketing.
//
// Nothing goes in journal.json that did not happen. This site has its own
// Authenticity page, so an invented story here costs more than it would
// anywhere else.
// ---------------------------------------------------------------------------

// Status is the honest label on an entry. "open" is the valuable one — it is
// how a question we have not answered yet stays on the site instead of waiting
// for a tidy ending that may never come.
export const JOURNAL_STATUS: Record<string, string> = {
  done: "Finished",
  working: "In progress",
  open: "Still figuring it out",
};

// Journal sections. A filter, not a nav: the journal is one feed and these
// let someone who only cares about lamps read only the lamps. "Building the
// business" is deliberately in the list — figuring out who actually buys this
// stuff is part of the story, not an admission against interest.
export const JOURNAL_SECTIONS = [
  { key: "finds", label: "Finds" },
  { key: "lava", label: "Lava Lab" },
  { key: "taylor", label: "Taylor Makes" },
  { key: "trips", label: "Field Trips" },
  { key: "research", label: "Research" },
  { key: "business", label: "Building the Business" },
];

/** Newest first. Entries carry ISO dates, so a string sort is the date sort. */
export function journalSorted<T extends { date: string }>(entries: readonly T[]): T[] {
  return [...entries].sort((a, b) => (a.date === b.date ? 0 : a.date > b.date ? -1 : 1));
}

/** "August 8, 2026" from "2026-08-08", without dragging in a date library. */
export function journalDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}

// Tier metadata for the minerals page split (decor vs collector).
export const TIERS = [
  { key: "vault", label: "The Vault", note: "Standout specimens, $150 and up. The best of what we've cataloged." },
  { key: "collector", label: "Collector Specimens", note: "Documented pieces with real localities. Sized, sourced, and honestly described." },
  { key: "bin", label: "The Bin", note: "Fun, affordable material under $25. Great starters, gifts, and grab-and-go." },
];
