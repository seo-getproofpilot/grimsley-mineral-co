# Grimsley Mineral Co. (working name)

Static store for minerals, fossils, lava lamps, coins, and Bugged Out Nails. Built with Astro, deploys free to GitHub Pages.

**Live:** https://seo-getproofpilot.github.io/grimsley-mineral-co/ (auto-deploys on every push to `main`)

## Current state
- **Built:** home, minerals (with size/price/species/locality filters), fossils, lava-lamps, coins (bullion/graded/banknotes + grading scale), nails, coins/fossils honest "cataloged for launch" states, about, our standard, field notes (index + 3 articles), visit (live Google Map), contact, shipping, faq. Per-specimen pages generated from `src/data/specimens.json`.
- **Real inventory in:** 9 minerals (background-cut photos) + the rocket lava lamp.
- **Next / to wire up:** Stripe buy links, the contact/commission form (Formspree), real Bugged Out Nails social links, lava-lamp "working status" field, and adding fossils + coins + more minerals as they get photographed. Field schemas for those live in `docs/STORE-BUILD-SPEC.md`.

## Run it locally
```bash
npm install
npm run dev        # preview at http://localhost:4321
npm run build      # production build to ./dist
```

## Add or update a specimen
Everything is driven by one file: `src/data/specimens.json`.

1. Drop the photo in `public/img/specimens/` (a background-cut PNG/WEBP looks best).
2. Add an entry to `specimens.json` with `slug`, `name`, `line`, `locality`, `sizeClass`, `dimensions`, `price`, `status`, `image`, `condition`, `treatment`, `description`, and `featured`.
3. `line` is one of: `minerals`, `fossils`, `lava`, `coins`.
4. `status` is one of: `available`, `reserved`, `sold`. To mark something sold, change that one word and push.

Each item automatically gets its own page at `/specimen/<slug>`.

## Cutting out photo backgrounds
The specimen cutouts were made with `rembg` (local, free). To do more:
```bash
python3 -m venv .venv && .venv/bin/pip install rembg pillow onnxruntime
.venv/bin/rembg i input.jpg output.png
```

## Deploy to GitHub Pages
1. Create a repo, push this folder to the `main` branch.
2. Repo Settings → Pages → Source: **GitHub Actions**. The included workflow builds and deploys on every push.
3. Paths:
   - Custom domain or `username.github.io`: leave `base: '/'` in `astro.config.mjs`.
   - Project page (`username.github.io/grimsley-mineral-co`): set `base: '/grimsley-mineral-co/'` and update `site`.

## Still to wire up
- **Stripe:** the "Buy now" buttons are placeholders. Create a Stripe Payment Link per item and paste it into a `buyUrl` field, then point the button at it.
- **Commission / inquiry form:** hook the "Ask" / "Commission" buttons to a Formspree or Tally form.
- **Nails social links:** point the Instagram / Facebook buttons at the real Bugged Out Nails accounts.
- **Fossils & coins:** add entries to `specimens.json` as those get photographed.
