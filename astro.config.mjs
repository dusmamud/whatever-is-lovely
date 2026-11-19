import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://whatever-is-lovely.pages.dev',
  // Cloudflare Pages enforces a trailing slash on directory builds (308
  // otherwise); keep config + canonicals + sitemap + internal links aligned.
  trailingSlash: 'always',
  // Search-result pages should not be indexed: exclude /search/ from the sitemap.
  integrations: [sitemap({ filter: (page) => page !== 'https://whatever-is-lovely.pages.dev/search/' })],
  vite: { plugins: [tailwindcss()] },
});
