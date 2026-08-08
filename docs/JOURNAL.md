# How to add a journal entry

The journal is the part of the site that says what we are actually doing. It is
the difference between a catalog and a place worth checking back on.

Everything lives in **one file**: `src/data/journal.json`. It is an array. Add an
object to it, run the build, done. No CMS, no database.

## The one rule

**Nothing goes in the journal unless it actually happened.** No planned trips
written as if we went. No "coming soon" dressed up as news. If it is an idea,
it belongs in the private notes, not here. An empty journal is honest. A journal
full of things we made up is worse than no journal.

## The shape of an entry

```json
{
  "slug": "first-weekend-at-the-127",
  "title": "What we learned selling at the 127",
  "date": "2026-08-11",
  "section": "business",
  "status": "done",
  "excerpt": "One sentence that makes someone want to read it. Shows on the journal index and the homepage.",
  "image": "img/journal/127-booth.webp",
  "body": [
    "One paragraph per string. Plain text, no HTML.",
    "Write it the way you would tell somebody in the room. Specific beats polished."
  ],
  "unknowns": [
    "Whether the Saturday crowd was normal or a fluke",
    "If the fluorescent case is worth hauling next year"
  ],
  "specimens": ["cobaltoan-calcite-botryoidal", "epidote-on-quartz"],
  "cta": {
    "label": "See what came back with us",
    "href": "minerals"
  }
}
```

### Required

| Field | What it is |
|---|---|
| `slug` | URL. Lowercase, hyphens, no dates in it. Becomes `/journal/<slug>/`. |
| `title` | Sentence case. Say what happened, not a headline. |
| `date` | `YYYY-MM-DD`. The day it happened, not the day you typed it. Sorting and the visible date both come from this. |
| `section` | One of: `finds`, `lava`, `taylor`, `trips`, `research`, `business`. Defined in `src/consts.ts` under `JOURNAL_SECTIONS`. |
| `excerpt` | One or two sentences. Used on the index and on the homepage. |
| `body` | Array of paragraph strings. |

### Optional

| Field | What it does |
|---|---|
| `status` | `done` (finished), `working` (in progress), `open` (still figuring it out). **Anything marked `working` or `open` also appears in the "On the Workbench" block on the homepage.** Leave it off and it is treated as finished. |
| `image` | Path relative to `public/`. Skip it and the card renders text-only, which is fine. |
| `unknowns` | Array of strings. Renders as "What we still don't know." This is the most valuable field on the site and the least used. Use it. |
| `specimens` | Array of specimen slugs from `specimens.json`. Renders the real cards at the bottom of the entry, so a story links straight into the catalog. Wrong slugs are silently skipped, so check them. |
| `cta` | `{ label, href }`. `href` is a site-relative path with no leading slash (`minerals`, `contact`, `lava-lamps`). One per entry, and only if there is a genuine next step. |

## What happens automatically

- Entries sort newest first. You do not have to keep the file in order.
- `/journal/` renders filter chips only for sections that actually have entries.
- If `journal.json` is empty, the journal page shows an honest empty state and is
  set to `noindex`, and both homepage journal blocks render nothing at all. No
  broken layout, no empty box.
- The homepage shows the 3 most recent entries. Dated cards, not a "right now"
  ticker, so a card from August is still true in December.

## Voice

Three registers on this site, and they do not mix:

- **Catalog** (specimen pages): clinical. Locality, size, condition, treatment.
- **Guides** (`/field-notes/`): authoritative. How to tell X from Y. Written to
  be useful to somebody who has never met us.
- **Journal**: first person, ours. What we did, what it cost, what we got wrong.

If a sentence could describe a thousand other businesses, delete it.
