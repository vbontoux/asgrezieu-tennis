// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://vbontoux.github.io',
  base: '/asgrezieu-tennis',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
    fallback: {
      en: 'fr',
    },
  },
});
