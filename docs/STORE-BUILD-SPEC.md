# Grimsley Mineral Co. — Multi-Line Store Build Spec

Build-ready specification for a five-line natural-history dealer site (Astro static).
Lines: **Minerals · Fossils · Lava Lamps · Coins & Currency · Press-On Nails.**

Researched from live dealer sites (July 2026). Source links at the bottom of each section.
Everything here is meant to be handed to a developer: taxonomy, page structure, exact data
fields, terminology, trust elements, and copy angles.

> **Data-model principle used throughout:** one product record per item, with a
> `line` field (`mineral | fossil | lava_lamp | coin | banknote | bullion | nails`)
> that switches which field set and which listing template renders. Shared fields
> (title, slug, price, price_type, status, images[], description, seo_title, seo_desc)
> live on every record; line-specific fields are additive. In Astro this maps cleanly
> to **content collections** (one collection per line, or one collection with a
> discriminated `line` field + Zod schema per line).

---

## 0. RECOMMENDED SITE MAP

The nav and page tree that make this read as a complete, professional multi-line dealer.

### Primary nav (header)
```
Shop ▾            About
  Minerals        Journal / Blog
  Fossils         Contact
  Lava Lamps      [ Search 🔍 ]   [ Cart 🛒 ]
  Coins & Currency
  Press-On Nails
Commissions       (custom lava lamps + custom nails live here)
```
Keep the top nav to **5 shop lines + About + Commissions + Contact**. Don't cram utility
pages into the header — they go in the footer.

### Full page tree
```
/                                   Home (hero + five-line entry cards + featured + trust bar)
/minerals/                          Line landing (browse UI, facets, featured)
  /minerals/species/[species]/      e.g. /minerals/species/fluorite/  (SEO landing per flagship species)
  /minerals/locality/[country]/     e.g. /minerals/locality/morocco/  (SEO landing per top country)
  /minerals/[size-class]/           e.g. /minerals/thumbnails/        (size-class landing)
  /minerals/new-arrivals/
  /minerals/[slug]/                 Single specimen page
/fossils/                           Line landing
  /fossils/[type]/                  e.g. /fossils/trilobites/ , /fossils/ammonites/ , /fossils/shark-teeth/
  /fossils/[type]/[sub]/            e.g. /fossils/fish/green-river/  , /fossils/petrified-wood/arizona/
  /fossils/new/
  /fossils/under-50/
  /fossils/[slug]/                  Single specimen page
/lava-lamps/                        Line landing (splits into two lanes)
  /lava-lamps/collection/           Vintage / authenticated gallery (by brand + era)
  /lava-lamps/collection/[brand]/   e.g. /lava-lamps/collection/lava-lite/ , /mathmos/
  /lava-lamps/commissions/          Custom / made-to-order configurator + gallery of past builds
  /lava-lamps/[slug]/               Single lamp page
/coins-currency/                    Line landing
  /coins-currency/us-coins/         → by denomination → by series
  /coins-currency/bullion/          → by metal → by form
  /coins-currency/world-coins/      → by region
  /coins-currency/paper-money/      → US large / US small / world / specialty
  /coins-currency/certified/        Cross-cut: PCGS / NGC / CAC graded only
  /coins-currency/[slug]/           Single coin / note page
/press-on-nails/                    Line landing (ready-to-ship sets + custom lane)
  /press-on-nails/shop/             Ready-made sets
  /press-on-nails/custom/           Custom / commission configurator
  /press-on-nails/sizing/           Sizing guide (utility — critical for this line)
  /press-on-nails/[slug]/           Single set page
/commissions/                       Hub page routing to lava-lamp + nail custom lanes
/about/                             Story, who we are, expertise, why trust us
/shipping-returns/                  Shipping, insurance, return policy, authenticity guarantee
/faq/                               Cross-line FAQ (grading, authenticity, shipping, care)
/contact/                           Form + email + phone (+ commission inquiry routing)
/journal/                           Blog / education (SEO + E-E-A-T engine)
  /journal/[post]/
/search/                            Site-wide search results
Utility (footer only): /privacy/  /terms/  /accessibility/  /care-guides/
```

### Footer structure
- **Column 1 — Shop:** the five lines + New Arrivals + Commissions
- **Column 2 — Learn:** Journal, Grading Guide, Care Guides, Geologic Time Scale, FAQ
- **Column 3 — Company:** About, Shipping & Returns, Authenticity Guarantee, Contact
- **Column 4 — Trust bar:** authenticity-guarantee badge, insured-shipping note, memberships,
  newsletter signup. Repeat the guarantee microcopy here on every page.

### Cross-line conventions (build once, reuse everywhere)
- **Status enum** on every item: `available | sold | reserved | made_to_order`. Keep sold
  items live and indexed (every serious dealer does — it signals a real, moving inventory
  and helps SEO) with a "Notify me of similar" capture.
- **Provenance / story field** on every line — it's the through-line that makes a coin feel
  native next to a fossil. Natural-history framing = "who made/found it, when, and where."
- **Price types:** `fixed | make_offer | auction | spot_linked | quote` — needed because
  bullion prices track spot and commissions are quote-based.
- **Trust bar component** (guarantee + insured shipping + returns window) rendered near every
  buy button, not just on a policy page.

---

## 1. COINS & CURRENCY  *(newest line — most detail)*

Model coins/currency as **three product classes** behind one line, because their field sets
differ sharply:
`product_class = bullion | numismatic_coin | banknote`.

### 1a. Category taxonomy (mirrors APMEX — metal-first for bullion, denomination+series for US coins, region for world)

```
Coins & Currency
├── US Coins            (by DENOMINATION → then SERIES, each series carries a date range)
│   ├── Cents          Half Cents (1793–1857) · Large Cents (1793–1857) · Flying Eagle (1856–58)
│   │                  · Indian Head (1859–1909) · Lincoln Wheat (1909–58) · Lincoln Memorial/Shield (1959–)
│   ├── Nickels        Shield (1866–83) · Liberty/V (1883–1913) · Buffalo (1913–38) · Jefferson (1938–)
│   ├── Dimes          Early · Liberty Seated (1837–91) · Barber (1892–1916) · Mercury (1916–45) · Roosevelt (1946–)
│   ├── Quarters       Early · Liberty Seated · Barber · Standing Liberty (1916–30) · Washington (1932–98) · Statehood (1999–2009)
│   ├── Half Dollars   Early · Liberty Seated · Barber · Walking Liberty (1916–47) · Franklin (1948–63) · Kennedy (1964–)
│   ├── Silver Dollars Early · Liberty Seated · Trade (1873–85) · MORGAN (1878–1921) · PEACE (1921–35) · Eisenhower · Modern
│   │                  cross-cut: Carson City Dollars · Certified (PCGS/NGC/CAC)
│   ├── US Gold        $1 · $2.50 Quarter Eagle · $5 Half Eagle · $10 Eagle · $20 Double Eagle
│   │                  ($20 Liberty 1850–1907, $20 Saint-Gaudens 1907–33) · Pre-1933 Gold
│   └── Sets           Proof Sets · Mint Sets · Commemoratives
├── Bullion            (by METAL → FORM → origin)
│   ├── Gold / Silver / Platinum / Palladium  (repeat the tree under each)
│   │   ├── Coins      by mint (US Mint, Royal Canadian, Perth, Royal Mint, Austrian, Mexican, S. African, Chinese)
│   │   │              by series (Eagles, Buffalos, Maple Leafs, Britannias, Krugerrands, Philharmonics, Pandas, Libertads)
│   │   ├── Bars       by weight (1oz, 5oz, 10oz, 100oz, fractional) · by brand (PAMP, Perth, etc.)
│   │   └── Rounds
│   └── Junk / Constitutional Silver   90% · 40% · 35% war nickels
├── World / Foreign Coins   (by REGION → country → metal)
│   ├── African · Asian · European · Central American & Caribbean · South American · Middle Eastern · North American
│   └── Ancient & Medieval  (own top node, filter by metal)
├── Paper Money / Currency  (see 1d)
│   ├── US Large-Size (pre-1928)   FRN · FRBN · Silver Certs · Gold Certs · US/Legal Tender · National Bank Notes
│   ├── US Small-Size (1928+)      FRN ($1–$100) · Silver Certs · US Notes · Gold Certs · High-Denom ($500/$1000)
│   └── Specialty                  Error Currency · Fractional · National Bank Notes · Confederate · Colonial · WWII (Hawaii/N. Africa)
└── Certified (cross-cut facet)    PCGS · NGC · CAC / CACG only
```
Two structural rules to copy: **every US-coin series label carries its date range**, and the
tree is **doubly indexed** — by denomination AND by a "Certified (PCGS/NGC/CAC)" facet.

### 1b. Grading terminology (build a reusable glossary + tooltip component)

**Sheldon scale (1–70).** Dr. William Sheldon, 1948; adopted by PCGS in 1986. Ladder:

| Abbrev | Name | Band |
|---|---|---|
| PO-1 | Poor | 1 |
| FR-2 | Fair | 2 |
| AG-3 | About Good | 3 |
| G-4 / G-6 | Good | 4–6 |
| VG-8 / VG-10 | Very Good | 8–10 |
| F-12 / F-15 | Fine | 12–15 |
| VF-20…35 | Very Fine | 20–35 |
| XF (EF)-40/45 | Extremely Fine | 40–45 |
| AU-50…58 | About Uncirculated | 50–58 |
| **MS-60…70** | **Mint State** (business strike, never circulated) | 60–70 |
| **PR/PF-60…70** | **Proof** (special dies/planchets, sharper detail) | 60–70 |

- **Circulated vs Uncirculated:** below MS-60 = circulated; MS/PR = uncirculated.
- **"+" grades:** top ~30% of a grade, XF-45 through MS/PR-68 only.
- **Raw vs Slabbed:** *Raw* = ungraded, no holder (`grading_service = raw`, grade is
  descriptive like "Brilliant Unc"). *Slabbed/Certified* = encapsulated by a third-party
  grader (TPG) with a **cert number** on the label.
- **TPGs:** **PCGS**, **NGC**, **ANACS**, **CAC/CACG** (green CAC sticker = independent
  verifier agrees the coin is solid/premium for its grade; CACG is CAC's own slab).
- **Population report:** how many a grader has certified at each grade, e.g. "69 in 67,
  1 finer." Pair with a **survival estimate** and **rarity 1–10**.
- **Strike designations (suffix):** FB Full Bands (Mercury dimes) · FBL Full Bell Lines
  (Franklin halves) · FS Full Steps (Jefferson) · FH Full Head (Standing Liberty).
- **Copper color:** RD Red (>95% original) · RB Red-Brown (5–95%) · BN Brown (<5%).
- **Proof/mirror:** CAM Cameo · DCAM Deep Cameo · PL Proof Like · DMPL Deep Mirror Proof Like.
- **Holder shorthand:** OGH Original Green Holder · PQ Premium Quality.

### 1c. Single-item listing fields (two schemas)

**BULLION schema** (spec/spot driven):
```
title, year, denomination, mint, series, grade (descriptive, e.g. "Brilliant Unc"),
grading_service = raw, metal, metal_content_troy_oz  ← drives spot pricing,
purity_fineness (.999 etc), diameter_mm, mintage, obverse_desc, reverse_desc,
price_type = spot_linked, images[obverse, reverse]
```
Note: bullion price = metal_content × spot + premium. Weight often shown as **ASW**
(Actual Silver Weight) / **AGW** (Actual Gold Weight).

**NUMISMATIC schema** (grade/provenance driven):
```
title            "1885 $1 MS67 PCGS"  (Year + Denomination + Grade + Service)
year, denomination, series_type ("Morgan Dollars 1878–1921"),
grade ("MS67"), grading_service (enum raw|PCGS|NGC|ANACS|CACG),
cert_number  → render as verification LINK (pcgs.com/cert/{n}),
mint_mark (enum: P Philadelphia · D Denver · S San Francisco · O New Orleans ·
           CC Carson City · W West Point · C Charlotte),
metal ("90% Silver"), weight_g, asw_agw, mintage, designer, edge, diameter_mm,
designations[]  (FB/FBL/FS/FH/RD/RB/BN/CAM/DCAM/PL/DMPL/CAC),
population, pedigree, catalog_ids {pcgs, ngc, greysheet},
obverse_desc, reverse_desc, price, price_type = fixed|auction
```
The **raw-vs-certified flag** is just the pair `{grading_service, cert_number}`: service =
`raw`/cert blank → raw; else certified. Cert number rendered as a live verification link is
the single strongest trust element — make it always-visible.

### 1d. Paper money / currency specifics

Grading uses the same 1–70 scale via **PMG** or **PCGS Banknote**. Key extra concepts:
- **EPQ** (Exceptional Paper Quality, PMG) / **PPQ** (Premium Paper Quality, PCGS Banknote) —
  note not materially/chemically refined. Grades 65–70 must carry EPQ to be "Gem."
- **Star (★) designation** for exceptional eye appeal.
- **Net grade** = a problem note downgraded with a stated reason.

**Banknote-only fields:**
```
denomination, series_year ("Series 1934-A" — NOT print year),
friedberg_number ("Fr#2211-G" — the standard US-note catalog ID),
seal_color (enum: Green FRN · Blue Silver Cert · Red US/Legal Tender · Gold · Brown Nat'l/FRBN),
serial_number, is_star_note (bool = replacement note),
district (enum A–L, the 12 Federal Reserve districts),
grade + epq_ppq flag, grading_service (enum raw|PMG|PCGS_Banknote)
```
Real title convention: `1934 (G-Chicago) $1,000 FRN Ch VF-35 PCGS (Fr#2211-G) LGS`
(series · district · denom · grade · service · Friedberg # · qualifier).

### 1e. Trust / authenticity elements (buyers expect all of these)
1. **TPG front-and-center** — PCGS/NGC/CAC as top-level filters + grade badge in the title.
2. **Live cert-verification deep link** — click through to the grader's own database. Highest-trust component on the page; mirror it.
3. **Cross-reference catalog IDs** (PCGS#, NGC ID, Greysheet) so buyers can price-check independently.
4. **Population / rarity / survival data** block.
5. **Provenance / pedigree / registry** line.
6. **Authenticity guarantee + return policy** microcopy near the buy button.
7. **Secure, insured, discreet shipping** note (free over a threshold).
8. **Memberships:** PNG (Professional Numismatists Guild), ANA member, Authorized PCGS/NGC Dealer, BBB, "in business since ____."
9. **Buyback / "Sell to Us"** channel — signals confidence.

### 1f. Copy angles
- **"Every coin verifiable, nothing to take on faith."** Lead with one-click cert
  verification, population, authenticity — buyer checks it themselves before buying.
- **"A curator, not a firehose."** Position against warehouse sites: hand-selected,
  photographed in-house, described by someone who knows why the piece matters.
- **"Tangible history you can hold."** Coins/currency as the human-history companion to
  natural history — a Carson City Morgan struck with Comstock silver, a $1,000 FRN. Lets you
  cross-sell the existing audience and justify provenance-first (not commodity) pricing.

*Sources: apmex.com (shop-all, us-coins, currency, world-coins nav + a bullion product page),
pcgs.com/grades, pcgs.com/coinfacts, ha.com (single certified lot), greatcollections.com,
pmgnotes.com grading scale.*

---

## 2. FOSSILS

### 2a. Category taxonomy (type-first; locality/species as second level; age & formation as fields)

The industry norm (FossilEra, Fossilicious, Buried Treasure Fossils) organizes by **fossil
TYPE**, nests **locality or species as the second level**, and keeps **geologic age + formation
as per-product fields**, not nav.

```
Fossils
├── Ammonites          → Belemnites & Straight Cephalopods · Orthoceras · (by locality: Madagascar/Morocco/Russia/S. Dakota)
├── Trilobites         → Morocco · Russia · (species tags)
├── Fish               → Green River (species: Knightia, Diplomystus, Priscacara, Phareodus, Mioplosus)
├── Shark Teeth        → Megalodon · Otodus · Great White · Mako · Angustidens
├── Dinosaur           → Bones · Teeth (Spinosaurus, Carcharodontosaurus, Raptor) · Coprolite · Egg
├── Petrified Wood     → Arizona · (bookends / tables as décor sub-cats)
├── Amber              → Amber With Insects
├── Echinoderms        → Crinoids · Starfish & Brittle Stars · Sea Urchins
├── Reptiles/Amphibians/Synapsids → Mosasaur · Plesiosaur · Pterosaur
├── Mammals            → Mammoth
├── Plants · Corals (Petoskey) · Crabs/Lobsters/Shrimp · Eurypterids · Stromatolites · Ammolite
└── Display            Floating frame cases · stands (cross-sell)
```
URL pattern (FossilEra-style, flat and readable): `/fossils/{type}/` and `/fossils/{type}/{sub}/`.

**Browse/filter mechanics** (what real dealers ship): curated shelves in nav (**All · New ·
Premium · Under $50**), price bands (`?price=25/100/500/1000`), a sort dropdown (Price ↑/↓,
Newest, Oldest), a `for_sale_only` toggle (keep sold items indexed), and pagination.
**Opportunity:** none of them offer a real "browse by geologic age/formation" facet — if you
store age and formation as structured fields you can add that facet and beat them.

### 2b. Single fossil listing fields (FossilEra's clean "DETAILS" block — copy the labels)

| Field | Example |
|---|---|
| **Species** | *Didymoceras nebrascense* (italic binomial) |
| **Age** | Cretaceous (~70 Million Years) — links to a Geologic Time Scale page |
| **Location** | Fossil Lake Safari Quarry, Kemmerer, Wyoming (as specific as possible) |
| **Formation** | Pierre Shale / Green River Formation |
| **Size** | "Ammonite: 7.3" wide, Entire specimen: 8.1 x 6.2" (splits specimen vs matrix) |
| **Category** | Ammonite Fossils (links back) |
| **Item** | #306621 (unique specimen ID) |
| **Guarantee** | authenticity statement + links to policy |

Title convention encodes size + age + genus (common name) + locality:
`7.3" Cretaceous Heteromorph Ammonite (Didymoceras) - South Dakota`.

**Recommended field schema (superset):**
```
common_name, species_scientific (italic), age_period + age_mya (numeric),
geologic_era (for the new facet), formation, locality (region → quarry),
size_dimensions, weight (add — dealers omit it, collectors want it),
matrix (add as its own field), condition_restoration_note (free text),
restoration_percent (optional), item_id, category, price, sale_price,
status (for_sale|sold), authenticity_block, images[] (5+ angles)
```

### 2c. Authenticity / repair / restoration disclosure (the credibility core — bake into data model AND template)

Reputable dealers separate three concepts and disclose them **up front in the description:**
- **Repair** = gluing broken pieces back together. Acceptable / value-neutral; a sign of
  skilled prep. Disclose but don't penalize.
- **Restoration** = reconstructing missing/damaged material. **Must be disclosed.** Best
  practice: verify under microscope, black light, and solvents — don't just trust the supplier.
- **Remounting / compositing** = assembling parts from multiple specimens or attaching a fossil
  to matrix it didn't come from. **Must be flagged.**
- **Replicas** = kept in a separate, clearly-labeled area of the site. Never mixed in.

Real disclosure language to model:
- Positive: *"The preservation is exceptional and it does not have any restoration."* Market it
  in the title too: `…Trilobite - No Restoration`.
- Full/honest: *"There are multiple repaired cracks throughout… along with some areas of gap
  fill and surface restoration. The smallest half is likely a composite."*
- **Quantified** (a collector convention): *"…less than 2% restoration."* → store `restoration_percent`.

**Certificates of Authenticity:** the honest posture is COA **on request**, not as an empty
default ("a certificate is only worth the paper it's printed on unless someone trustworthy backs
it"). Some dealers go COA-forward with a printed cert + a "25% restoration bar" rule — either
works, but disclosure quality matters more than the paper.

### 2d. Trust elements
- **Lifetime authenticity guarantee tied to a refund** (in addition to a standard 30-day
  no-questions return). Return window + guarantee microcopy on **every** product page.
- **Expert self-verification** as the credibility anchor ("we verify every specimen ourselves —
  microscope, black light, solvents"). Founder-as-collector personalizes authority.
- Real human support (phone + hours + email) surfaced everywhere.
- Third-party review widget; sold items kept live with "notify me."
- **Educational depth** (Geologic Time Scale, "What is a fossil?", per-taxon explainers) —
  E-E-A-T + SEO.

### 2e. Copy angles
- **"Radical honesty about restoration."** Lead with what dishonest dealers hide — every piece
  examined under microscope/black light/solvent, findings written in the description before you
  buy. Pair with a plain-English "Repair vs Restoration vs Composite" explainer.
- **"Provenance you can point to on a map and a timeline."** Frame each piece by
  locality + formation + age; make the geologic time scale interactive so the buyer sees where
  their fossil sits in deep time.
- **"Museum-grade pieces, guaranteed for life."** Lifetime authenticity guarantee, 30-day
  returns, a real person on the phone; justify price with prep/craftsmanship storytelling.

*Sources: fossilera.com (nav, trilobite/fish categories, 3 product pages, authenticity-guarantee
& shipping-return pages), fossilicious.com, buriedtreasurefossils.com, thefossilstore.com.*

---

## 3. LAVA LAMPS (collection + custom)

The whole category runs on three linked facts per lamp: **who made it, when, and whether it
still flows.** Build the data model and copy around that triad. Split the line into **two lanes:
The Collection** (vintage, authenticated, one-only) and **Commissions** (custom, made-to-order).

### 3a. Collection / gallery presentation
- **Card grid** (maker style): square hero → bold model name → **one-line provenance caption**
  tying the object to a **year + story** ("A 1963 Astro inspired by gold record awards").
- **Organize by BRAND → ERA → MODEL** (the collector-community standard). Optional per-brand
  history block + a chronological "models by year" index.
- **Credibility flourishes:** attribute each lamp/photo to provenance; demonstrate **date-code
  literacy** (bottle-cap codes give year + manufacture date + bottle-size code); be honest about
  bad eras (post-2003 China-made Lava Lite had ~90% failure). A "How we dated this lamp" note
  out-credentials typical resellers.

### 3b. Per-lamp data fields (union of maker spec + collector item-specifics)
```
brand_maker, model_name, era_or_year (+ decoded date code if known),
country_of_origin, height (cm + in), width,
bottle_size_oz (32 / 52 / 250 / 1280 — the fill-ounce sizing convention),
wax_color, liquid_color (aka "globe" color), base_style_material (spun aluminium/ceramic/brass/copper),
base_finish (chrome/gold/silver/black/copper), cap_style,
original_vs_replacement_bottle, condition, working_status (flows correctly | needs new bottle | cloudy),
restoration_notes, voltage_bulb_spec, provenance_attribution, images[], price, price_type
```
**Working status must be a separate field from cosmetic condition.** "Needs new bottle" is a
legitimate, non-disqualifying disclosure (bottles are consumable — clouding/fade are normal
end-of-life states; replacement bottles are the standard remedy).

### 3c. Terminology (use in UI + copy)
- **Globe / bottle** = the glass vessel ("globe" = US-collector-native, "bottle" = maker/UK).
- **Goo / wax / lava** = the wax blob. Community = "Oozing Goo," members "GooHeads."
- **Liquid** = the surrounding fluid.
- **Sizes in fill-ounces:** 32oz (~16in) · 52oz · 250oz (Giant) · 1280oz / 10gal (Humongo, 4ft).
- **Flow** = movement quality (the whole hobby judges a lamp on flow); problem states =
  bad/no flow, cloudy liquid, wax stuck at top (overheated), stalagmite (still warming).
- **Brands/history:** invented **1963 by Edward Craven Walker**, Poole, Dorset, England; original
  co. **Crestworth**, renamed **Mathmos** 1992; flagship **Astro** (1963), **Astro Baby** (1964).
  US line **Lava Lite / Lava World** — classic era 1960–90, boom 1990–2003, quality drop after
  China move 2003.

### 3d. Custom / commission framing (mirror the artisan model)
- **Option-driven configurator:** size selector (oz + inches, price per tier) → colourway picker
  (wax color × liquid color) → base finish/material → optional engraving/personalization text →
  **"one-of-a-kind" vs "made-to-order"** toggle → stated lead time.
- **Pricing = base anchor + custom quote:** "Starts at $X; final price by consultation." The
  workflow is consultative (discuss via chat/call, then a custom listing is posted to purchase).
  `price_type = quote`.
- **Lead time stated as a window** (e.g. made-to-order ~2–3 weeks; one-of-a-kind builds longer).
- **Present as ART, not appliance** — craft language ("sculptural ambient lighting," "hand-filled,"
  "one of a kind"). Vintage-vessel conversions (e.g. a 1940s coffee urn) sold as sculpture +
  open invite for bespoke commissions.

### 3e. Copy angles
- **"Specimens of a design species."** Catalogue each lamp like a mineral/fossil: brand, era,
  model, provenance, condition, working status; commissions = "a new specimen, grown to order."
  Most on-brand for a curiosities dealer.
- **"Liquid motion, made by hand."** Foreground craft and flow — spun-aluminium bases,
  hand-filled glass, wax rising and falling since 1963.
- **"Provenance & bespoke" (two-lane split).** The Collection (vintage, authenticated, "when it's
  gone it's gone") vs The Commissions (built to spec, base + quote). "Own a piece of the past, or
  commission its future." Maps 1:1 to the two live business models.

*Sources: mathmos.com (all-lava-lamps, Astro product page, colours-explained, heritage),
oozinggoo.ning.com (collector reference thread), eBay vintage listing, etsy.com custom listings.*

---

## 4. MINERALS — deeper browsing

For a small-but-credible dealer, copy the **iRocks/Weinrich collector model**, not the
Astro Gallery decor/retail model. Build **one faceted sidebar** (URL-param state, shareable/
indexable) backed by a **handful of curated landing pages** for SEO.

### 4a. Ship these four facets (priority order)
1. **Species** — #1 way collectors shop. Dropdown/typeahead generated **dynamically from actual
   inventory** (don't hardcode 5,000 minerals). Add a "More [Species]" module on each product page.
2. **Price band** — fixed buckets (`Under $100 / $100–250 / $250–500 / $500–1,000 / $1,000+`)
   **plus a custom min/max box** (the custom box matters). Add an **On Sale** toggle.
3. **Size class** — checkboxes; **auto-derived from the largest single dimension** (don't ask the
   user to hand-assign). Genuine differentiator vs a plain grid and trivial to compute.
4. **Locality** — facet by **country first** (Morocco, Brazil, Mexico, Namibia, USA…), optional
   drill to region/mine. Store the full hierarchical locality string for display; normalize
   country for the facet.

Add a **sort** (Newest / Price ↑ / Price ↓) — "Newest" matters because collectors chase new
listings. Two premium credibility signals worth stealing: a **provenance / ex-collection** field
("Ex. [Collector] Collection") and **video** on high-value pieces (even a "has video" facet reads
as premium). **Do NOT** build currency switchers, 300-name collection dropdowns, or
metaphysical/decor categories.

### 4b. Size classes (store dimensions, compute the class from the max dimension)

| Class | Range (largest dimension) |
|---|---|
| Thumbnail (TN) | ≤ 3.0 cm |
| Toenail | ~3–4 cm |
| Miniature | ≤ 5.0 cm |
| Small Cabinet | ≤ ~9.4 cm |
| Cabinet | ≤ ~18 cm |
| Large Cabinet / Museum | > 18 cm |

(iRocks' own cut points shown; broader collector convention varies a cm or two.)

### 4c. Specimen listing fields (real dealer labels)
```
species (+ variety, e.g. "Beryl var. Aquamarine"), secondary_species ("on Limonite"),
locality_full (hierarchical: mine → district → region → province → country)  ← Weinrich labels this "Origin",
mine / region / country (normalized, for faceting),
size_class (enum, derived), dim_l_cm / dim_w_cm / dim_h_cm, weight (g; ct for gems),
price, catalog_number (human SKU like "RHODO26-33"),
provenance / ex_collection, description (rich text), images[], video_url,
is_new, on_sale, status (available|sold|reserved)
```
Weinrich renders size with the class in parens: `18.5 x 13.0 x 3.5 cm (large-cabinet)`.

### 4d. Curated landing pages (SEO + storytelling — build a few evergreen ones)
One per **top country**, one per **flagship species**, a **New Arrivals** page, and a
**Thumbnails / small-specimen** page (iRocks' "Thumbnail Corner" is a proven pattern). These
become keyword-targeted URLs; the faceted sidebar remains the workhorse behind them.

### 4e. Terminology
Locality (Weinrich: "Origin") · Matrix (host rock; "in matrix" vs "loose crystal" is a quality
distinction) · Druzy · size classes (4b) · Ex-collection / Provenance ("Ex. [Name] Collection")
· Self-collected / field-collected · Variety (var.) · New find · Specimen/catalog number ·
quality tiers (Weinrich: "Our Very Best / General / Discounted").

*Sources: irocks.com (browse, advanced search, Size Specs modal, specimen page),
weinrichmineralsinc.com (shop index facets, specimen page), astrogallery.com (contrast case),
mindat.org / mineralauctions.com/sizes (size corroboration).*

---

## 5. PRESS-ON NAILS (note)

Not separately researched in this pass — the four researched lines above are collector/dealer
categories with established conventions; press-on nails is a made/commissioned product line
closer to the lava-lamp *Commissions* model than to a graded-specimen model. Recommended
structure, by analogy:
- **Two lanes:** ready-to-ship sets (`/press-on-nails/shop/`) + custom/commission
  (`/press-on-nails/custom/`, `price_type = quote`, configurator like the lava-lamp commission flow).
- **Per-set fields:** set_name, shape (coffin/almond/square/stiletto/oval), length
  (short/medium/long/XL), design/theme, color palette, finish (matte/gloss/chrome), material
  (gel/acrylic/ABS), pieces_per_set, sizing (see below), reusable (bool), price.
- **A dedicated `/press-on-nails/sizing/` utility page is critical** — measurement guide + a
  fit/size-kit option is the #1 friction point for this line.
- **Custom flow:** shape → length → base color → art/theme → sizing method → personalization
  notes → "starts at $X, quoted after consult."

*Flag for you: if you want the same depth of real-seller research on press-ons (Etsy custom
nail sellers, sizing conventions, materials), say the word and I'll run that stream.*

---

## Build notes for the Astro implementation
- One **content collection per line** (or a single collection with a discriminated `line` +
  per-line Zod schema). Store items as MD/MDX or JSON entries with the field sets above.
- **Facets/filters on static Astro:** pre-render the curated landing pages; do client-side
  filtering (Astro island / small JS) over a generated JSON index for the live faceted sidebar,
  keeping filter state in the URL query string so pages are shareable and SEO-friendly.
- **Reusable components to build once:** `TrustBar`, `ProvenanceBlock`, `CertVerifyLink`
  (coins), `RestorationDisclosure` (fossils), `SpecTable` (per-line field renderer),
  `FacetSidebar`, `SizeClassBadge` (minerals), `CommissionConfigurator` (lava lamps + nails),
  `StatusBadge` (available/sold/reserved/made-to-order).
- **SEO per line:** unique title/meta, LocalBusiness + Product/Offer schema, breadcrumb schema
  on category → item, FAQ schema on /faq. Item schema should include the provenance/grade fields.
