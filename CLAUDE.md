# Grimsley Mineral Co.

## What this is

Marcos's own venture. **Not a client, not an agency project.** Minerals, fossils,
coins and hand-built lava lamps, sold in person in Tennessee.

Because it is not client work, most of the ProofPilot rulebook does not apply
here. Specifically **ignore** the following on this project:

- Live-CMS safety rules. There is no CMS. This is a static Astro site.
- ClickUp, client boards, SEO deliverables, specialist lanes, meeting prep.
- The local-business website checklist (phone above the fold, "Areas We Serve",
  Google Maps embed, LocalBusiness schema, service pages). This is a catalog for
  a booth, not a lead-gen site.
- "Always use Tailwind." **This project does not use Tailwind.** See below.

What still applies: Marcos's writing voice (no em dashes, keep his words), clean
semantic HTML, mobile-first, real alt text, and don't push without asking.

## Stack

- **Astro 5.** Static output, no framework integrations.
- **Plain hand-written CSS** in `src/styles/global.css` (~812 lines). No Tailwind,
  no CSS framework. Match the existing conventions in that file, do not
  introduce a utility framework.
- `@astrojs/sitemap` for the sitemap. `/reserve` is filtered out on purpose.

## Local development

```
cd ~/grimsley-mineral-co && npm run dev
```

Serves **http://localhost:4321/** with hot reload.

**Never use `npm run preview` for iterating.** `astro preview` serves the
prebuilt `dist/` folder. It does not watch source files and does not reload, so
edits appear to do nothing. A stale `astro preview` from 17 Jul 2026 sat on port
4321 for three weeks and every edit looked like it had failed. If the browser is
not showing a change, check what is actually listening:

```
lsof -nP -iTCP -sTCP:LISTEN | grep 43
```

## Deploying

Push to `main`. That fires `.github/workflows/deploy.yml`, which builds with
`PAGES_BASE=/grimsley-mineral-co` and publishes to GitHub Pages. **Nothing goes
live without a push.**

Repo: `seo-getproofpilot/grimsley-mineral-co`.

## The one thing that breaks the build

Every internal link and image must go through the `u()` helper from
`src/consts.ts`. Local dev serves at `/`, GitHub Pages serves at
`/grimsley-mineral-co`. A hardcoded `/minerals` works locally and 404s in
production.

```astro
---
import { u } from "../consts";
---
<a href={u("minerals")}>Minerals</a>
<img src={u("img/nails/foo.jpg")} alt="..." />
```

## Deliberate decisions, do not "fix" these

- **No checkout, no Stripe.** This is a catalog, not a store. Stripe is
  deferred. Do not flag "there is no way to buy" as a defect.
- **Reserve-for-booth and cash-only** are intentional, not an oversight.
- **Sale dates are fixed.** Do not adjust them to look current.
- **The repo is PUBLIC.** No business strategy, pricing logic, margins, supplier
  names or agency material in any committed file. Ever.
- Some specimen photos are still placeholders. Known, tracked, not a bug report.

## Skills

Most ProofPilot skills are scoped to client and spec-site work and will not fit
here. Their descriptions say "local business", "demo", "spec site" or "client",
which is why they do not trigger on this project.

- **`/proofpilot-copywriting` — run it before writing any prose that ships.**
  Page copy, specimen descriptions, field notes, FAQ answers, email capture.
  Its description scopes itself to "ProofPilot or any client"; treat that as
  covering this project too. Marcos's voice rules are the whole point.
- `/ai-image-generation` if images need generating.
- Skip the rest unless there is an obvious reason.

## Working style here

This is a low-stakes personal site. There is no client to break, no live CMS, no
approval chain. Make the edit, let hot reload show it, iterate. Save the
deliberation for the client work.
