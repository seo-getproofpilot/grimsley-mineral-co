import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Local dev/preview serves at root ('/'). GitHub Pages builds with
// PAGES_BASE set (see .github/workflows/deploy.yml) so assets and links
// resolve under /grimsley-mineral-co/. Use the u() helper in src/consts.ts
// for every internal link and image so both work.
const base = process.env.PAGES_BASE || '/';

export default defineConfig({
  site: 'https://seo-getproofpilot.github.io',
  base,
  trailingSlash: 'ignore',
  // /reserve is a per-visitor localStorage list. It carries noindex, so it
  // has no business in the sitemap either — the two signals should agree.
  integrations: [sitemap({ filter: (page) => !page.includes('/reserve') })],
});
