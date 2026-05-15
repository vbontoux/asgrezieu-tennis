import fr from './fr.json';
import en from './en.json';

export type Locale = 'fr' | 'en';

const translations: Record<Locale, Record<string, unknown>> = { fr, en };

/**
 * Récupère une traduction par clé (notation pointée) et locale.
 * Retourne le texte français si la traduction anglaise n'existe pas.
 */
export function getTranslation(key: string, locale: Locale): string {
  const keys = key.split('.');
  let result: unknown = translations[locale];

  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = (result as Record<string, unknown>)[k];
    } else {
      // Fallback vers le français
      result = translations['fr'];
      for (const fk of keys) {
        if (result && typeof result === 'object' && fk in result) {
          result = (result as Record<string, unknown>)[fk];
        } else {
          return key; // Retourne la clé si introuvable
        }
      }
      break;
    }
  }

  return typeof result === 'string' ? result : key;
}

/**
 * Alias court pour getTranslation
 */
export const t = getTranslation;

/**
 * Mapping des slugs de pages entre les locales.
 */
const pageSlugMap: Record<string, Record<Locale, string>> = {
  '/': { fr: '/', en: '/' },
  '/entrainements': { fr: '/entrainements', en: '/training' },
  '/actualites': { fr: '/actualites', en: '/news' },
  '/conseil': { fr: '/conseil', en: '/board' },
  '/sponsoring': { fr: '/sponsoring', en: '/sponsoring' },
  '/contact': { fr: '/contact', en: '/contact' },
  // Reverse mappings
  '/training': { fr: '/entrainements', en: '/training' },
  '/news': { fr: '/actualites', en: '/news' },
  '/board': { fr: '/conseil', en: '/board' },
};

/**
 * Génère le chemin localisé pour une page donnée.
 */
export function getLocalePath(path: string, locale: Locale): string {
  const cleanPath = path.replace(/^\/(fr|en)(\/|$)/, '/') || '/';
  const mapping = pageSlugMap[cleanPath];
  const localizedPath = mapping ? mapping[locale] : cleanPath;
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  return `${cleanBase}/${locale}${localizedPath === '/' ? '/' : localizedPath}`;
}

/**
 * Retourne la locale courante depuis l'URL.
 */
export function getCurrentLocale(url: URL): Locale {
  const segments = url.pathname.split('/').filter(Boolean);
  if (segments[0] === 'en') return 'en';
  return 'fr';
}

/**
 * Retourne la locale alternative.
 */
export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'fr' ? 'en' : 'fr';
}

/**
 * Génère les liens hreflang pour le head HTML.
 */
export function getHreflangLinks(currentPath: string, baseUrl: string): { locale: string; href: string }[] {
  const cleanPath = currentPath.replace(/^\/(fr|en)(\/|$)/, '/') || '/';
  return [
    { locale: 'fr', href: `${baseUrl}/fr${cleanPath}` },
    { locale: 'en', href: `${baseUrl}/en${cleanPath}` },
  ];
}

/**
 * Préfixe un chemin d'asset avec le base path.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  // Remove trailing slash from base, ensure path starts with /
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}
