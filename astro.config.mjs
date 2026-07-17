import { defineConfig } from 'astro/config';

// GitHub Pages notes:
// - Custom domain OR user page (username.github.io): keep base '/'.
// - Project page (username.github.io/grimsley-mineral-co): set base to '/grimsley-mineral-co/'
//   and update `site` to your username.github.io URL.
export default defineConfig({
  site: 'https://grimsleymineralco.com',
  base: '/',
  trailingSlash: 'ignore',
});
