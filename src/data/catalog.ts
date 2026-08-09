// The catalog, filtered once, in one place.
//
// Seven records are real pieces Marcos owns that have never been photographed,
// so they carry `image: "/img/placeholder.svg"`. Until 2026-08-08 they rendered
// a "PHOTO COMING" tile, and three of them were sitting in the Under $100 row
// on the homepage. A store's shopping shelf with empty frames in it reads as an
// empty shelf, not as honesty, so Marcos chose to hide them until they are shot.
//
// Hidden means hidden EVERYWHERE: no grid, no count, no price range, and no
// /specimen/<slug>/ page, because a URL that resolves is published. Nothing is
// deleted. Photograph the piece, drop the file in, and it reappears everywhere
// at once with no other edit.
//
// Import CATALOG for anything a visitor sees. Import EVERY_RECORD only when you
// genuinely need the unphotographed ones too, e.g. an internal to-shoot list.
import every from "./specimens.json";

export type Specimen = (typeof every)[number];

/** A record is showable once it points at a real photograph. */
export const hasPhoto = (s: Specimen): boolean =>
  !!s.image && !s.image.includes("placeholder");

/** Every record in the file, including the unphotographed ones. */
export const EVERY_RECORD: Specimen[] = every;

/** What the site is allowed to show. */
export const CATALOG: Specimen[] = every.filter(hasPhoto);

/** The to-shoot list. Currently 7. */
export const AWAITING_PHOTO: Specimen[] = every.filter((s) => !hasPhoto(s));

export default CATALOG;
