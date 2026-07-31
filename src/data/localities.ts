// ---------------------------------------------------------------------------
// LOCALITY REGISTRY
//
// The second axis of the catalog. /mineral/[key]/ covers "what species is it";
// this covers "where did it come from" — which is how collectors actually
// search. Nobody types "buy vanadinite"; they type "Mibladen vanadinite".
//
// Deliberately NOT auto-generated from every distinct locality string in
// specimens.json. Several of those are honest non-localities ("Locality on
// request", "Pacific coast", "Assorted"), and a hub page built on one vague
// string is thin content, not an SEO asset. A locality earns a page when it is
// a real named place a collector would search by name.
//
// `matches` lists the exact locality strings from specimens.json that belong to
// this hub. Exact strings, not fuzzy matching — a typo should show up as an
// empty hub we notice, not a silently mis-filed specimen.
// ---------------------------------------------------------------------------

export type Locality = {
  slug: string;
  /** Short display name — the hub's H1. */
  name: string;
  /** Country or state line shown under the name. */
  region: string;
  /** Exact `locality` strings in specimens.json that map here. */
  matches: string[];
  /** What this place is known for, in one line. Used in meta descriptions. */
  known: string;
  /** Real intro copy. Grounded in the per-specimen localityNote fields. */
  about: string;
  lat: number;
  lng: number;
};

export const LOCALITIES: Locality[] = [
  {
    slug: "mibladen-morocco",
    name: "Mibladen",
    region: "Khénifra Province, Morocco",
    matches: ["Mibladen, Morocco"],
    known: "the world signature source of red-orange vanadinite",
    about:
      "Mibladen is the locality that defines what vanadinite is supposed to look like. The old lead workings in the Upper Moulouya district produce bright red-orange hexagonal vanadinite crystals perched on barite and dolomite matrix, and that specific combination — hot orange on pale matrix — is the look nearly every vanadinite photograph in the world is showing you. Other localities produce vanadinite. Mibladen produces the one collectors picture.",
    lat: 32.8,
    lng: -4.6,
  },
  {
    slug: "tazouta-morocco",
    name: "Tazouta",
    region: "Fès-Meknès, Morocco",
    matches: ["Tazouta, Morocco"],
    known: "radiating aragonite 'sputnik' star-bursts",
    about:
      "The Tazouta area produces aragonite in a form that barely looks natural — interlocking crystals radiating out from a common center into a spiky ball. The trade calls them sputniks for obvious reasons. They are a good demonstration of aragonite's habit of twinning into pseudo-hexagonal spikes rather than the blocky forms calcite prefers, which is the practical way to tell two minerals with identical chemistry apart on a table.",
    lat: 33.8,
    lng: -4.4,
  },
  {
    slug: "khouribga-morocco",
    name: "Khouribga",
    region: "Ouled Abdoun Basin, Morocco",
    matches: ["Khouribga, Ouled Abdoun Basin, Morocco"],
    known: "Eocene shark teeth from the phosphate beds",
    about:
      "The Ouled Abdoun Basin is a phosphate deposit laid down in a shallow Eocene sea, and the same beds that are mined industrially for fertilizer are the world's most productive source of affordable fossil shark teeth. The prize is Otodus obliquus — the big triangular tooth with side cusps that most people are actually picturing when they say megalodon. Because the material comes out as a mining byproduct at scale, Khouribga is the reason a real 50-million-year-old shark tooth costs a few dollars instead of a few hundred.",
    lat: 32.9,
    lng: -6.9,
  },
  {
    slug: "katanga-drc",
    name: "The Katanga Copperbelt",
    region: "Haut-Katanga, D.R. Congo",
    matches: ["Katanga, D.R. Congo"],
    known: "the world benchmark for malachite and cobaltoan calcite",
    about:
      "The Katanga Copperbelt is one of the great copper provinces on Earth, and its oxidized zones produce the secondary copper minerals that define their species. Banded and botryoidal malachite from Katanga is the reference material — the deep green bullseye pattern in every museum case. The Kolwezi area's intense pink cobaltoan calcite, colored by cobalt substituting into the calcite lattice, is likewise the worldwide benchmark for that material. When a piece of either shows up without paperwork, Katanga is the first guess for good reason.",
    lat: -10.7,
    lng: 25.5,
  },
  {
    slug: "inner-mongolia-china",
    name: "Inner Mongolia",
    region: "China",
    matches: ["Inner Mongolia, China"],
    known: "smoky purple fluorite cubes on druzy quartz",
    about:
      "Inner Mongolia is the classic modern source of a very specific fluorite: sharp purple cubes with a smoky, almost bruised color saturation, sitting on a bed of sparkling druzy quartz. The contrast between the geometric cubes and the sugary quartz carpet is what makes the combination work visually, and it is a genuinely modern classic — this material came into the trade recently enough that it is absent from older reference books.",
    lat: 44.0,
    lng: 113.0,
  },
  {
    slug: "hunan-china",
    name: "Hunan Province",
    region: "China",
    matches: ["Hunan Province, China"],
    known: "gem-green and blue-green fluorite",
    about:
      "Hunan's polymetallic deposits are a major world source of fluorite, including the translucent gem-green material that lights up under a lamp. Chinese fluorite localities dominated the market from the 1990s onward and reset what collectors expect to pay for large, clean crystals. Worth noting that green fluorite is one of the easier minerals to confuse with green calcite by eye, so anything sold without a lab test is a considered opinion rather than a certainty.",
    lat: 27.6,
    lng: 111.7,
  },
  {
    slug: "bahia-brazil",
    name: "Bahia",
    region: "Brazil",
    matches: ["Bahia, Brazil", "Novo Horizonte, Bahia, Brazil"],
    known: "golden rutilated quartz and Novo Horizonte rutile stars",
    about:
      "Bahia is the dominant world source of golden rutilated quartz — clear quartz shot through with fine golden needles of rutile. Effectively every polished rutile sphere in the trade is cut from Bahian rough. The state also holds Novo Horizonte, essentially the only source of a rarer thing entirely: six-rayed epitaxial rutile stars, where rutile has grown in a precise hexagonal starburst on a hematite plate trapped inside clear quartz. That geometry is a crystallographic accident that almost nowhere else reproduces.",
    lat: -12.0,
    lng: -41.7,
  },
  {
    slug: "rio-grande-do-sul-brazil",
    name: "Rio Grande do Sul",
    region: "Brazil",
    matches: ["Rio Grande do Sul, Brazil"],
    known: "basalt-hosted amethyst, and the source of most heat-treated citrine",
    about:
      "The basalt flows of southern Brazil are riddled with gas cavities that filled with amethyst, and Rio Grande do Sul is the dominant global source of affordable amethyst on matrix. It is also, quietly, where most of the world's citrine comes from — natural citrine is genuinely rare, and the great majority of golden 'citrine' in the trade is Rio Grande do Sul amethyst turned gold by heating. That is a normal, accepted treatment, and we label it every time rather than letting the color speak for itself.",
    lat: -29.5,
    lng: -52.5,
  },
  {
    slug: "kharan-pakistan",
    name: "Zard Mountain, Kharan",
    region: "Balochistan, Pakistan",
    matches: ["Zard Mountain, Kharan, Balochistan, Pakistan"],
    known: "lustrous chisel-terminated epidote on white quartz",
    about:
      "The Zard Mountain and Ras Koh area of Kharan produces the epidote that defines the modern Pakistani material: dark green, highly lustrous, chisel-terminated blades sitting on white quartz. The color reads nearly black until you get light behind it, at which point it goes a deep pistachio green. Pakistan's alpine-cleft deposits have supplied a large share of the world's fine epidote for the last few decades.",
    lat: 28.6,
    lng: 65.4,
  },
  {
    slug: "searles-lake-california",
    name: "Searles Lake",
    region: "Trona, California, USA",
    matches: ["Searles Lake, Trona, California"],
    known: "pink bladed halite and fluorescent evaporite minerals",
    about:
      "Searles Lake is a dry evaporite basin in the Mojave that has been worked industrially for over a century for borax, soda ash, and potash. For collectors it is the signature source of pink bladed halite — salt crystals tinted by halophilic bacteria trapped in the brine — and of hanksite, one of the more reliably fluorescent minerals available cheaply. Everything from Searles Lake shares one hard practical constraint: halite is water-soluble, so a humid room will slowly destroy a specimen that took a long time to reach you.",
    lat: 35.7,
    lng: -117.4,
  },
  {
    slug: "sakoany-madagascar",
    name: "Sakoany",
    region: "Mahajanga, Madagascar",
    matches: ["Sakoany, Madagascar"],
    known: "pale blue celestite geodes",
    about:
      "The Sakoany deposit produces the soft blue celestite geodes that are, for most people, the only celestite they will ever see. Celestite is strontium sulfate, and the pale robin's-egg blue is its own natural color rather than a treatment. The geodes form in limestone and are cracked open to reveal a cavity lined with blocky, glassy blue crystals. The color is genuinely light-sensitive over long exposure, which is the one thing worth knowing before putting one in a south-facing window.",
    lat: -15.6,
    lng: 46.4,
  },
  {
    slug: "panasqueira-portugal",
    name: "Panasqueira Mines",
    region: "Castelo Branco, Portugal",
    matches: ["Panasqueira Mines, Portugal"],
    known: "world-class tin-tungsten mine specimens",
    about:
      "Panasqueira is a working tin-tungsten mine and one of the most celebrated specimen localities in Europe. Its hydrothermal quartz veins produce ferberite, apatite, and the silvery muscovite-with-pyrite associations that are a Panasqueira signature — bright brassy pyrite cubes sitting on books of mica on quartz. Because it is an active industrial operation rather than a collector dig, specimen availability tracks what the mine happens to be cutting through.",
    lat: 40.2,
    lng: -7.8,
  },
  {
    slug: "huanzala-peru",
    name: "Huanzala Mine",
    region: "Ancash, Peru",
    matches: ["Huanzala Mine, Ancash, Peru"],
    known: "bright pyrite clusters and Peruvian sulfides",
    about:
      "Huanzala is a high-altitude polymetallic mine in the Peruvian Andes and a reliable source of bright, sharply crystallized pyrite. Peruvian pyrite occupies a useful middle ground in the market: the flawless single cubes from Navajún in Spain command real money, while Huanzala clusters give you the same brassy metallic luster and good crystal form at a price that makes pyrite a starter mineral rather than a trophy.",
    lat: -9.6,
    lng: -76.9,
  },
  {
    slug: "fossil-butte-wyoming",
    name: "Fossil Butte & Kemmerer",
    region: "Wyoming, USA",
    matches: ["Kemmerer / Fossil Butte, Wyoming"],
    known: "Green River Formation fossil fish",
    about:
      "The Fossil Lake beds near Kemmerer are a lagerstätte — a deposit where conditions preserved not just hard parts but articulation and fine detail. A stratified, oxygen-poor lake bottom meant fish sank and stayed undisturbed, and the result is that Green River fish are the most detailed and abundant articulated fossil fish in the world. Knightia, the small herring-like fish that is Wyoming's state fossil, comes out of these quarries in enough quantity that an authentic, fully articulated 50-million-year-old fish is genuinely affordable.",
    lat: 41.8,
    lng: -110.8,
  },
];

/** Look up the hub a raw specimen `locality` string belongs to, if any. */
export function localityFor(raw: string | undefined | null): Locality | null {
  if (!raw) return null;
  return LOCALITIES.find((l) => l.matches.includes(raw)) || null;
}
