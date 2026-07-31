# Selling a piece

Everything here is one edit to `src/data/specimens.json`, then commit. No admin
panel, no database.

---

## 1. Putting a piece up for sale online

Add a `buyUrl` to the specimen and its page grows a **Buy now** button. Leave it
off and the page behaves exactly as before (reserve for booth pickup).

**Make the Stripe link:**

1. Stripe Dashboard → **Product catalog** → **+ Add product**
2. Name it the same as the specimen. One-time price. Set the price.
3. **Inventory → limit to 1.** This is the important one. Every piece is one of
   one, so a quantity of 1 means Stripe marks it sold out by itself the moment
   somebody buys it. You do not need an inventory system.
4. Turn on **Collect shipping address**.
5. Create a **Payment link** for it and copy the URL.

**Then in `specimens.json`:**

```json
{
  "slug": "vanadinite-mibladen",
  "price": 275,
  "buyUrl": "https://buy.stripe.com/xxxxxxxxxxxx"
}
```

Apple Pay and Google Pay show up automatically on phones. Stripe takes about
2.9% + 30¢.

**Roll it out one piece at a time.** Do the expensive specimens first — that is
where "buy it now" beats "drive to Tennessee."

---

## 2. When a piece sells

Do not delete it. Do not remove the entry. Change three fields:

```json
{
  "status": "sold",
  "soldPrice": 275,
  "soldDate": "2026-08-07"
}
```

- `status` → `"sold"` moves it into the archive and swaps the buy button for a
  SOLD banner.
- `soldPrice` is what it **actually** sold for. If it went for the asking price
  you can leave this off and the page falls back to `price`. Fill it in when you
  discounted or when somebody talked you up at the booth.
- `soldDate` is `YYYY-MM-DD`. Optional — a missing date renders as a dash rather
  than a guess. Fill it in if you know it, leave it out if you do not. Do not
  invent one; the whole value of the archive is that it is accurate.

### Why the page stays up

Coins have PCGS. Trading cards have sales databases. **Mineral specimens have
essentially no public price record** — dealer listings vanish the moment a piece
sells, and the only evidence of what it was worth goes with it.

So `/sold/` keeps ours. Every sold piece stays at its original URL, permanently,
with its photos and measurements intact. Nothing gets deleted, redirected, or
noindexed.

Two practical effects:

1. **The locality hubs get deeper without anyone writing more copy.**
   `/locality/mibladen-morocco/` shows what is live now *and* everything from
   Mibladen that has ever sold. Live stock rotates; the sold list only grows.
2. **It is the one asset that compounds.** A 1-row archive is not worth much. A
   300-row archive of real mineral sale prices is something that does not exist
   anywhere else on the internet.

This costs nothing to maintain. It just requires never deleting anything.

---

## 3. Adding a new locality

If a new piece comes from a place not already in `src/data/localities.ts`, add
an entry there and the hub page builds itself.

Only add real, named localities a collector would search by name — "Mibladen,
Morocco" earns a page, "Locality on request" does not. A hub built on a vague
string is a thin page, which is worse than no page. Vague localities render as
plain text on the specimen and that is the correct outcome.

The `matches` array holds the **exact** `locality` strings from
`specimens.json` that belong to that hub. Exact, not fuzzy — a typo should show
up as an empty hub you notice, not a silently misfiled specimen.
