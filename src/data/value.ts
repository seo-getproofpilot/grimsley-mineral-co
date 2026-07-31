// ---------------------------------------------------------------------------
// WHAT A SPECIMEN IS WORTH
//
// The question every beginner asks and almost nobody answers in plain English.
// Coins have PCGS. Cards have population reports and sales databases. Minerals
// have a scientific database that deliberately does not touch price, and eBay,
// where sold data is partial and disappears.
//
// So the honest thing we can publish is not a price list — we do not have the
// data for that and neither does anyone else. It is the *system*: what actually
// moves a price up or down, so somebody can look at a specimen and reason about
// it themselves. That is evergreen, it is true, and it does not require making
// numbers up.
//
// Any actual dollar figure shown on the site is computed from our own catalog
// (see priceBandFor below), never hardcoded. First-party data or nothing.
// ---------------------------------------------------------------------------

export type ValueFactor = {
  key: string;
  name: string;
  /** One-line summary — used in the compact list on species pages. */
  short: string;
  /** The full explanation for the pillar guide. */
  detail: string;
  /** Roughly how much this factor swings price, stated honestly as a range. */
  weight: "Biggest" | "Major" | "Moderate" | "Situational";
};

export const VALUE_FACTORS: ValueFactor[] = [
  {
    key: "damage",
    name: "Damage",
    weight: "Biggest",
    short: "One chip on a front-facing crystal can halve the price.",
    detail:
      "Damage is the single largest lever, and beginners consistently underweight it. A specimen with a bruised or cleaved crystal in the display face is worth a fraction of the same piece intact — often half, sometimes far less on a high-end piece. What matters is where the damage is, not how much: a chip on the back that never faces a viewer barely counts, while a single missing termination in the middle of the front face is what everyone will see first, forever. This is also where dishonest selling concentrates, because damage is trivially easy to hide with a camera angle.",
  },
  {
    key: "crystal",
    name: "Crystal quality",
    weight: "Major",
    short: "Sharp edges, bright luster, complete terminations.",
    detail:
      "Sharpness of crystal edges, brightness of luster, transparency, and whether crystals are completely terminated — meaning the natural crystal faces are intact rather than broken off where the piece was removed from the pocket. A sharp, glassy, fully terminated crystal is a different object from a dull, rounded, broken-off one of the same species and size, and the price gap between them is larger than most people expect.",
  },
  {
    key: "color",
    name: "Color",
    weight: "Major",
    short: "Saturation, and whether the color is rare for that species.",
    detail:
      "Two things at once: how saturated and even the color is, and how unusual that color is for the species. Pale, patchy material is common and priced accordingly. Deep, evenly distributed color is not. The second half matters more than people realize — a green fluorite is ordinary, while certain other colors in the same species are genuinely scarce, and the price follows scarcity rather than prettiness.",
  },
  {
    key: "size",
    name: "Size class",
    weight: "Moderate",
    short: "Bigger is not linearly better. Quality per size class is what counts.",
    detail:
      "The trade sorts by size class — thumbnail, miniature, small cabinet, cabinet — and compares pieces within a class rather than across them. Bigger is not automatically better and definitely not linearly more expensive. A flawless miniature routinely outsells a mediocre cabinet piece. What you are really paying for is the best example available at a given size, because a collector with limited shelf space is shopping a size class, not a species.",
  },
  {
    key: "locality",
    name: "Locality",
    weight: "Moderate",
    short: "Classic and closed localities carry a real premium.",
    detail:
      "Where a piece came from is part of what it is. A specimen from a locality that is famous for that mineral carries a premium over identical-looking material from an unremarkable source, and a locality that has closed or played out carries more still, because supply is now fixed forever. This also cuts the other way: a piece sold with no locality at all is worth less than the same piece with a documented one, which is why we publish an honest confidence level on every attribution rather than guessing a famous name.",
  },
  {
    key: "aesthetics",
    name: "Composition",
    weight: "Major",
    short: "How the piece is arranged. Hard to define, easy to see.",
    detail:
      "How the piece is actually put together — whether crystals sit up and present themselves, whether there is contrasting matrix behind them, whether it has a clear front and stands on its own. This is the least quantifiable factor and often the one that decides between two otherwise identical specimens. It is also the one you can judge without any expertise at all: if you keep looking at it, that is the factor talking.",
  },
  {
    key: "treatment",
    name: "Treatment and repair",
    weight: "Situational",
    short: "Common, legitimate when disclosed, value-destroying when hidden.",
    detail:
      "Heating, dyeing, irradiation, oiling, and repair are all real and all common. None of them are inherently fraud — most heat-treated citrine in the world is heated amethyst and everybody in the trade knows it. What determines value is disclosure. An honestly labeled treated stone has a stable, lower price. The same stone sold as natural is worth nothing to a collector the moment they find out, and they will find out. Assume anything undisclosed is undisclosed for a reason.",
  },
];

// ---------------------------------------------------------------------------
// Per-species notes. What specifically moves the price for THIS mineral, and
// what a buyer should look at before paying. Written for someone holding a
// specimen and wondering whether the asking price is fair.
// ---------------------------------------------------------------------------

export type MineralValue = {
  /** What drives price specifically for this species. */
  drivers: string;
  /** Fakes, treatments, and the misrepresentation that actually happens. */
  watchFor: string;
  /** Practical buying advice for someone starting out. */
  buying: string;
};

export const MINERAL_VALUE: Record<string, MineralValue> = {
  quartz: {
    drivers:
      "Clarity and what is trapped inside. Plain clear quartz is one of the most abundant minerals on Earth and prices like it. Value concentrates in the varieties — amethyst priced on depth and evenness of purple, rutilated quartz on how fine and well-distributed the golden needles are, and included quartz generally on whether the inclusion forms a recognizable pattern rather than a cloud.",
    watchFor:
      "Heat-treated amethyst sold as natural citrine is the most common undisclosed treatment in the entire hobby. Dyed and irradiated quartz both exist. Glass sold as quartz is easy to spot once you know: glass has bubbles and warms up in the hand faster.",
    buying:
      "The best value in quartz is a well-formed cluster with good luster rather than a single large point, which is the thing most beginners reach for first and overpay for.",
  },
  fluorite: {
    drivers:
      "Cube sharpness, color saturation, and transparency all at once — fluorite is one of the few species where you can reasonably expect all three. Phantoms and color zoning add real value. Because fluorite cleaves perfectly in four directions, undamaged edges on a fluorite are meaningfully harder to find than on a harder mineral, and are priced accordingly.",
    watchFor:
      "Cleavage damage is the whole game. Fluorite chips if you look at it wrong, and a cleaved corner catches the light differently from a natural face. Check every cube edge under a light before buying. Some fluorite is irradiated to deepen color.",
    buying:
      "A smaller piece with intact, glassy cube edges beats a larger one with cleaved corners at the same price, every time.",
  },
  aragonite: {
    drivers:
      "Symmetry and completeness of the radiating spray. A full, undamaged star-burst with spikes intact all the way around is what you are paying for; a partial one is a fraction of the price. Crystal luster and how cleanly the spikes separate matter more than raw size.",
    watchFor:
      "The delicate spike tips break in shipping constantly, and a piece is often photographed from its good side. Ask specifically about tip wear. Dyed aragonite exists in the decor market.",
    buying:
      "Aragonite is one of the best value-for-drama minerals available — a striking sputnik is genuinely inexpensive because the material is abundant.",
  },
  celestite: {
    drivers:
      "Depth of the blue and the size of the individual crystals inside the geode. Most celestite is very pale; anything with real saturation costs more. A geode with large, glassy, well-separated blue crystals is worth considerably more than one lined with a fine sugary crust.",
    watchFor:
      "Color genuinely fades with long light exposure, so a vivid piece kept in a window will not stay vivid. Dyed blue geodes of other materials are sold as celestite.",
    buying:
      "Buy the crystal size and luster, not the overall geode size. A big geode with tiny dull crystals is the cheaper thing dressed up.",
  },
  chrysocolla: {
    drivers:
      "Color intensity and what it is intergrown with. Chrysocolla hardens dramatically when silicified with quartz, and that harder material is both more durable and more valuable. Botryoidal — bubbly, grape-like — surfaces in strong blue-green carry a premium over flat crusts.",
    watchFor:
      "Chrysocolla is one of the most frequently misidentified minerals in the trade, routinely confused with or sold alongside malachite, azurite, and turquoise. Soft chalky material is fragile and worth less. Stabilized and dyed pieces are common.",
    buying:
      "Press a fingernail against an inconspicuous edge. Chalky chrysocolla marks; silicified chrysocolla does not, and is the one you want.",
  },
  calcite: {
    drivers:
      "Crystal habit and optical effects. Calcite forms in an unusually wide range of shapes, and unusual habits price above common ones. Transparent Iceland-spar-type material that shows double refraction is its own category. Cobaltoan calcite is priced almost entirely on the intensity of the pink.",
    watchFor:
      "Calcite is soft, at 3 on the Mohs scale, and scratches from ordinary handling. It also reacts to acid, including vinegar and skin oils over time. Dyed calcite is widespread in the decor trade.",
    buying:
      "Check the display face for scratches under raking light. On soft minerals, surface condition is most of the value.",
  },
  epidote: {
    drivers:
      "Luster above all — good epidote is almost mirror-bright, and dull epidote is a different price entirely. After that, crystal termination, the contrast against white quartz or feldspar matrix, and how well the blades are arranged.",
    watchFor:
      "The blades are brittle and snap where they meet the matrix. Look at the base of each crystal, not the tip. Because the color reads near-black indoors, sellers photograph epidote with strong backlighting that flatters it considerably.",
    buying:
      "Take it to a window. Good epidote goes deep pistachio green with light behind it; poor epidote stays flat black.",
  },
  halite: {
    drivers:
      "Color and crystal form. The pink bladed material is priced on how saturated and even the pink is and how complete the blades are. Fluorescent response, where the associated minerals react under UV, adds value.",
    watchFor:
      "It dissolves. This is not a caution, it is the defining fact about owning halite — humidity alone will slowly destroy a specimen, and a piece stored badly is permanently degraded rather than temporarily dirty.",
    buying:
      "Only buy halite if you will actually keep it in a sealed case with desiccant. Otherwise you are renting it.",
  },
  malachite: {
    drivers:
      "Banding pattern and polish. The bullseye and botryoidal patterns are what the material is famous for, and tight, high-contrast banding prices well above muddy or uniform green. Undamaged botryoidal surfaces with intact original luster are harder to find than polished slabs.",
    watchFor:
      "Malachite dust is toxic to inhale, so never work or sand it dry. Reconstituted malachite — crushed material bound with resin — is widespread and is not the same object as a natural piece. Uniform banding that repeats too regularly is a warning sign.",
    buying:
      "Natural botryoidal surface beats a polished flat face for collectors, even though the polished one looks more finished at first glance.",
  },
  muscovite: {
    drivers:
      "Almost entirely the associated minerals. Muscovite by itself is common and inexpensive; muscovite as a silvery backdrop for pyrite, tourmaline, or beryl is priced on what is sitting on it. Book-form crystals with clean hexagonal outlines are the exception that carries value on its own.",
    watchFor:
      "The sheets separate and flake with handling, and a book that has started delaminating will keep going. Damage at the edges of mica books is very common and often not photographed.",
    buying:
      "Judge the piece by the mineral perched on the mica, then check the mica is not shedding.",
  },
  vanadinite: {
    drivers:
      "Color and crystal completeness. The bright red-orange is the entire appeal, and pieces that have oxidized toward dull brown are worth substantially less. Sharp, complete hexagonal barrels standing proud on a contrasting matrix are the ideal; flat crusts of small crystals are common material.",
    watchFor:
      "Vanadinite fades in sunlight — this is real and irreversible, and a faded piece never comes back. Vanadinite contains lead, so wash your hands. Some matrix pieces are assembled from separate parts and glued.",
    buying:
      "Keep it out of direct sun permanently, from day one. This is the single most common way people ruin a vanadinite they paid well for.",
  },
  pyrite: {
    drivers:
      "Crystal form and surface brightness. Sharp, undamaged cubes or pyritohedrons with mirror surfaces are the premium material. Locality matters unusually much here — the flawless Spanish cubes are their own market and price far above equally attractive clusters from elsewhere.",
    watchFor:
      "Pyrite disease, sometimes called pyrite decay, is real: certain pyrite reacts with humidity and slowly crumbles, giving off a sulfur smell and a white powder. Once it starts it is difficult to stop. Check for powder in the crevices before buying.",
    buying:
      "Smell it and look for white efflorescence. A clean, dry, bright piece stored in low humidity is stable for decades; a piece that already smells faintly of sulfur is a problem you are buying.",
  },
};
