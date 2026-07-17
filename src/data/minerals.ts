// Mineralogical reference for the species we actually carry. These are the
// facts a collector reads a piece by: hardness, chemistry, crystal system,
// luster, and fluorescence. Keyed by a base species; catalog names that carry
// a variety or an "as identified" note resolve to the base via resolveMineral().
//
// Sources are standard reference mineralogy (Mohs scale, Dana class, formulae).
// Anything a piece needs verified before full price is flagged on the piece
// itself via its `asIdentified` field, not here.

export interface Mineral {
  key: string;
  name: string;
  formula: string;        // plain text, e.g. "CaF2"
  formulaHtml: string;    // with <sub> for display
  hardness: string;       // Mohs, e.g. "4" or "3.5–4"
  crystalSystem: string;
  mineralClass: string;   // Dana-ish class
  luster: string;
  streak: string;
  fluorescence: string;   // "" if not notably fluorescent
  about: string;          // plain-English, collector-facing
  care: string;           // one-line handling note
}

export const MINERALS: Record<string, Mineral> = {
  quartz: {
    key: "quartz",
    name: "Quartz",
    formula: "SiO2",
    formulaHtml: "SiO<sub>2</sub>",
    hardness: "7",
    crystalSystem: "Trigonal",
    mineralClass: "Silicate (tectosilicate)",
    luster: "Vitreous",
    streak: "White",
    fluorescence: "Generally inert. Some specimens show weak effects from inclusions, not the quartz itself.",
    about: "The most common mineral in the collector world and one of the most durable. At a 7 on the Mohs scale it takes a polish, resists scratching, and holds color well. Its varieties are named for color and inclusion: amethyst is purple from trace iron and natural irradiation, citrine is the golden-to-orange form, and rutilated quartz carries fine needles of rutile frozen inside it. Localities and clarity separate a bin point from a cabinet piece.",
    care: "Stable and hard. Amethyst and other colored quartz can fade in long, direct sun.",
  },
  fluorite: {
    key: "fluorite",
    name: "Fluorite",
    formula: "CaF2",
    formulaHtml: "CaF<sub>2</sub>",
    hardness: "4",
    crystalSystem: "Isometric (cubic)",
    mineralClass: "Halide",
    luster: "Vitreous",
    streak: "White",
    fluorescence: "The mineral that gave fluorescence its name. Many fluorites glow blue to violet under UV, though it varies by locality and trace chemistry.",
    about: "Prized for cubic and octahedral crystals in nearly every color, sometimes zoned in a single stone. It is soft for its size at a 4, with perfect octahedral cleavage, so a knock in the wrong spot can pop a clean flat face. That softness is also why gem-green and purple fluorites read as glassy and deep. A classic display mineral where color and crystal form carry the value.",
    care: "Cleaves easily and is sensitive to sharp temperature change. Handle by the matrix, not the crystal.",
  },
  aragonite: {
    key: "aragonite",
    name: "Aragonite",
    formula: "CaCO3",
    formulaHtml: "CaCO<sub>3</sub>",
    hardness: "3.5–4",
    crystalSystem: "Orthorhombic",
    mineralClass: "Carbonate",
    luster: "Vitreous to resinous",
    streak: "White",
    fluorescence: "Some aragonite fluoresces cream to pink under UV.",
    about: "Same chemistry as calcite but a different crystal structure, which gives aragonite its own habits: radiating sprays, twinned pseudo-hexagonal prisms, and the star-burst clusters collectors call sputniks. It is a soft carbonate, so it fizzes in acid and marks easily. Sharp, undamaged terminations are what to look for.",
    care: "Soft carbonate. Keep away from acids and abrasion.",
  },
  celestite: {
    key: "celestite",
    name: "Celestite",
    formula: "SrSO4",
    formulaHtml: "SrSO<sub>4</sub>",
    hardness: "3–3.5",
    crystalSystem: "Orthorhombic",
    mineralClass: "Sulfate",
    luster: "Vitreous to pearly",
    streak: "White",
    fluorescence: "Can fluoresce and phosphoresce in whites and greens.",
    about: "The main ore of strontium and a collector favorite for its soft sky-blue crystals, most famous from geodes. The color is subtle and the crystals are soft and a little brittle, so pristine blue points are the prize. Bright light can gradually wash the blue out over years.",
    care: "Soft and light-sensitive. The blue color can fade with long sun exposure.",
  },
  chrysocolla: {
    key: "chrysocolla",
    name: "Chrysocolla",
    formula: "(Cu,Al)2H2Si2O5(OH)4·nH2O",
    formulaHtml: "(Cu,Al)<sub>2</sub>H<sub>2</sub>Si<sub>2</sub>O<sub>5</sub>(OH)<sub>4</sub>·nH<sub>2</sub>O",
    hardness: "2–4",
    crystalSystem: "Amorphous to orthorhombic",
    mineralClass: "Silicate (hydrous copper)",
    luster: "Vitreous to earthy",
    streak: "Pale blue-green",
    fluorescence: "Not notably fluorescent.",
    about: "A hydrated copper silicate that gives the intense blue-green of oxidized copper deposits. It rarely forms good crystals and instead coats, botryoidal crusts and vein fillings. Hardness swings widely depending on what it is intergrown with, quartz-hardened chrysocolla being tougher than the chalky kind. Often sold intergrown with malachite, azurite, or quartz.",
    care: "Porous and variable. Keep dry and avoid oils and cleaners.",
  },
  calcite: {
    key: "calcite",
    name: "Calcite",
    formula: "CaCO3",
    formulaHtml: "CaCO<sub>3</sub>",
    hardness: "3",
    crystalSystem: "Trigonal",
    mineralClass: "Carbonate",
    luster: "Vitreous",
    streak: "White",
    fluorescence: "One of the most famously fluorescent minerals, often glowing red, pink, or orange, especially manganese-bearing calcites.",
    about: "The defining mineral of the number 3 on the Mohs scale and a shape-shifter with more crystal habits than almost any other mineral. The cobaltoan variety takes a vivid pink to magenta from trace cobalt, usually as a druzy crust over matrix. Calcite fizzes readily in acid and shows strong double refraction in clear crystals.",
    care: "Soft carbonate. Keep away from acids; the pink cobaltoan crust is delicate.",
  },
  epidote: {
    key: "epidote",
    name: "Epidote",
    formula: "Ca2(Al,Fe)3(SiO4)3(OH)",
    formulaHtml: "Ca<sub>2</sub>(Al,Fe)<sub>3</sub>(SiO<sub>4</sub>)<sub>3</sub>(OH)",
    hardness: "6–7",
    crystalSystem: "Monoclinic",
    mineralClass: "Silicate (sorosilicate)",
    luster: "Vitreous",
    streak: "Gray",
    fluorescence: "Not fluorescent.",
    about: "A hard silicate known for its distinctive pistachio-to-olive green and for slender, striated, elongated crystals. Fine epidote from Pakistan and Peru often sits on or with clear quartz, and the contrast of dark green blades against water-clear points is what collectors chase. Durable enough to display without much worry.",
    care: "Hard and stable. Standard dusting is fine.",
  },
  halite: {
    key: "halite",
    name: "Halite",
    formula: "NaCl",
    formulaHtml: "NaCl",
    hardness: "2–2.5",
    crystalSystem: "Isometric (cubic)",
    mineralClass: "Halide",
    luster: "Vitreous",
    streak: "White",
    fluorescence: "Some halite fluoresces and even phosphoresces in red-orange from trace activators.",
    about: "Rock salt, and yes, the same compound as table salt. It grows in clean cubes and can carry gorgeous blue and purple color from structural defects. The catch is that it is soft and water-soluble, so a beautiful blue halite has to be kept away from humidity or it will slowly cloud and dissolve.",
    care: "Water-soluble. Keep dry, never wash, avoid humid rooms.",
  },
  malachite: {
    key: "malachite",
    name: "Malachite",
    formula: "Cu2CO3(OH)2",
    formulaHtml: "Cu<sub>2</sub>CO<sub>3</sub>(OH)<sub>2</sub>",
    hardness: "3.5–4",
    crystalSystem: "Monoclinic",
    mineralClass: "Carbonate (copper)",
    luster: "Silky to dull, adamantine on crystals",
    streak: "Light green",
    fluorescence: "Not fluorescent.",
    about: "The banded green copper carbonate, usually seen as botryoidal masses that polish into concentric light-and-dark green rings. Fibrous velvet crusts and rare crystal sprays are the collector forms. It is a soft copper mineral and the dust is not something you want to breathe when cutting, so display pieces are left as nature made them.",
    care: "Soft and reactive to acids. Keep dry; do not use ultrasonic cleaners.",
  },
  muscovite: {
    key: "muscovite",
    name: "Muscovite",
    formula: "KAl2(AlSi3O10)(OH)2",
    formulaHtml: "KAl<sub>2</sub>(AlSi<sub>3</sub>O<sub>10</sub>)(OH)<sub>2</sub>",
    hardness: "2–2.5",
    crystalSystem: "Monoclinic",
    mineralClass: "Silicate (phyllosilicate, mica)",
    luster: "Vitreous to pearly",
    streak: "White",
    fluorescence: "Not fluorescent.",
    about: "The common light-colored mica, splitting into thin flexible sheets along one perfect cleavage. On specimens it forms silvery books and rosettes, and it often plays host to sharper minerals like pyrite or aquamarine that grew on it. Soft and layered, so the display value is in intact, undisturbed books.",
    care: "Soft and flexible. The sheets bruise; handle by the matrix.",
  },
  vanadinite: {
    key: "vanadinite",
    name: "Vanadinite",
    formula: "Pb5(VO4)3Cl",
    formulaHtml: "Pb<sub>5</sub>(VO<sub>4</sub>)<sub>3</sub>Cl",
    hardness: "3",
    crystalSystem: "Hexagonal",
    mineralClass: "Vanadate",
    luster: "Adamantine to resinous",
    streak: "Brownish-yellow",
    fluorescence: "Not notably fluorescent.",
    about: "A lead vanadate famous for bright red to orange hexagonal crystals, most iconically from Mibladen and Taouz in Morocco. The color and the crisp barrel-shaped prisms sitting on baryte or matrix are the whole appeal. It is heavy from the lead content and soft, so terminations chip if handled carelessly.",
    care: "Contains lead. Wash hands after handling; keep away from children and food surfaces.",
  },
  pyrite: {
    key: "pyrite",
    name: "Pyrite",
    formula: "FeS2",
    formulaHtml: "FeS<sub>2</sub>",
    hardness: "6–6.5",
    crystalSystem: "Isometric (cubic)",
    mineralClass: "Sulfide",
    luster: "Metallic",
    streak: "Greenish-black to brownish-black",
    fluorescence: "Not fluorescent.",
    about: "Fool's gold, and one of the few minerals that grows in near-perfect cubes on its own. The brassy metallic shine and sharp geometry make it a display staple, from Spanish cubes in marl to Peruvian clusters. Harder than it looks at a 6.5, but it can oxidize over decades in damp, salty air, so a dry shelf keeps the shine.",
    care: "Keep dry. Long-term humidity can cause pyrite decay (a white or powdery bloom).",
  },
};

// Keyword-priority resolver. Catalog species strings carry varieties and notes
// ("Amethyst (Quartz)", "Fluorite on druzy Quartz", "Chrysocolla (as identified)").
// Order matters: the PRIMARY mineral of a combo piece must match first.
const RESOLVER: Array<{ match: string; key: string; variety?: string }> = [
  { match: "fluorite", key: "fluorite" },
  { match: "amethyst", key: "quartz", variety: "Amethyst" },
  { match: "citrine", key: "quartz", variety: "Citrine" },
  { match: "rutile", key: "quartz", variety: "Rutilated Quartz" },
  { match: "geode", key: "quartz", variety: "Geode" },
  { match: "aragonite", key: "aragonite" },
  { match: "celestite", key: "celestite" },
  { match: "chrysocolla", key: "chrysocolla" },
  { match: "cobaltoan", key: "calcite", variety: "Cobaltoan Calcite" },
  { match: "calcite", key: "calcite" },
  { match: "epidote", key: "epidote" },
  { match: "halite", key: "halite" },
  { match: "malachite", key: "malachite" },
  { match: "muscovite", key: "muscovite" },
  { match: "vanadinite", key: "vanadinite" },
  { match: "pyrite", key: "pyrite" },
  { match: "quartz", key: "quartz" },
];

export function resolveMineral(rawSpecies: string): { mineral: Mineral; variety?: string } | null {
  const s = (rawSpecies || "").toLowerCase();
  for (const r of RESOLVER) {
    if (s.includes(r.match)) {
      const mineral = MINERALS[r.key];
      if (mineral) return { mineral, variety: r.variety };
    }
  }
  return null;
}
