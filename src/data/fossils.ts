// Fossil reference for the types we carry. The per-piece age, formation, and
// locality live on each specimen in specimens.json; this holds the shared
// education (what the organism is, how to handle it) keyed by a resolver.

export interface FossilType {
  key: string;
  name: string;
  classification: string;
  about: string;
  care: string;
}

export const FOSSILS: Record<string, FossilType> = {
  knightia: {
    key: "knightia",
    name: "Knightia",
    classification: "Ray-finned fish (family Clupeidae, herring relative)",
    about: "Knightia is the Wyoming state fossil and one of the most abundant articulated fossil fish on Earth. It swam the warm Eocene lakes that became the Green River Formation, and mass die-offs buried whole schools in fine limestone that split cleanly to reveal them. A good plate shows the fish in full profile with fins and spine intact.",
    care: "Stable limestone. Keep out of direct sun to preserve contrast; the plate is thin and can snap, so support the whole slab.",
  },
  favosites: {
    key: "favosites",
    name: "Favosites",
    classification: "Extinct tabulate coral (honeycomb coral)",
    about: "Favosites is a colonial 'honeycomb' coral from the ancient reefs of the Paleozoic. Each cell, or corallite, packed tight against its neighbors like a wasp comb, which is where the honeycomb look comes from. The whole tabulate coral order is long extinct, so these are windows into reef life hundreds of millions of years old.",
    care: "Solid and durable. A dry shelf is all it needs.",
  },
  tektite: {
    key: "tektite",
    name: "Tektite",
    classification: "Natural impact glass (not volcanic, not a mineral)",
    about: "Tektites are natural glass born from catastrophe. A large meteorite slams into the Earth, melts the ground, and flings droplets of molten rock high enough to sculpt as they cool and fall back, sometimes hundreds of miles away. They are grouped into strewn fields by the impact that made them. The pitted, grooved surface is the signature.",
    care: "Glass, so it chips if dropped on a hard surface. Otherwise indestructible on a shelf.",
  },
  abalone: {
    key: "abalone",
    name: "Abalone Shell",
    classification: "Marine gastropod shell (Haliotis) — modern, not an ancient fossil",
    about: "Abalone are large sea snails whose inner shell is lined with nacre, the same iridescent material as a pearl. These are modern or sub-fossil shells, not ancient fossils, and we list them as shells rather than pretend otherwise. The draw is the flash of blue, green, and pink that shifts as the shell turns.",
    care: "Nacre scratches and dulls with abrasion. Wipe with a soft dry cloth, no chemicals.",
  },
  "shark-teeth": {
    key: "shark-teeth",
    name: "Fossil Shark Teeth",
    classification: "Fossil shark teeth (genera such as Otodus and Striatolamia)",
    about: "Sharks shed thousands of teeth in a lifetime, and in the right seafloor sediment those teeth fossilize by the million. Morocco's Eocene phosphate beds are one of the world's great sources, producing durable, well-shaped teeth from extinct mackerel and sand-tiger sharks. Affordable, real, and a favorite first fossil.",
    care: "Durable. Rinse-free; a soft brush clears grit from the root and serrations.",
  },
};

// Resolve a specimen (by explicit fossilKey, then species/name keywords) to a type.
const RESOLVER: Array<{ match: string; key: string }> = [
  { match: "knightia", key: "knightia" },
  { match: "favosite", key: "favosites" },
  { match: "tektite", key: "tektite" },
  { match: "abalone", key: "abalone" },
  { match: "shark", key: "shark-teeth" },
];

export function resolveFossil(item: { fossilKey?: string; species?: string; name?: string }): FossilType | null {
  if (item.fossilKey && FOSSILS[item.fossilKey]) return FOSSILS[item.fossilKey];
  const s = `${item.species || ""} ${item.name || ""}`.toLowerCase();
  for (const r of RESOLVER) {
    if (s.includes(r.match)) return FOSSILS[r.key];
  }
  return null;
}
