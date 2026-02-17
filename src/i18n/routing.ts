import  createMiddleware  from 'next-intl/middleware';
import type { Locale } from './locales';
import { locales, defaultLocale } from './locales';

export const routing = {
  locales: locales as readonly Locale[],
  defaultLocale: defaultLocale as Locale,
  localePrefix: 'always' as const,
  localeDetection: true,

  pathnames: {
    '/leaderboard': {
      en: '/leaderboard',
      fr: '/classement',
      es: '/clasificacion',
    },
    '/profile': {
      en: '/profile',
      fr: '/profil',
    },
  },

  // Optional: custom locale cookie name (if you want to persist user choice)
  // localeCookie: 'NEXT_LOCALE',

  // Optional: domains (for international domains like fr.example.com)
  // domains: [
  //   { domain: 'example.fr', defaultLocale: 'fr' },
  //   { domain: 'example.es', defaultLocale: 'es' },
  // ],

  // Custom detection logic (rarely needed, but useful for A/B testing or geo)
  // localeDetection: (request) => {
  //   // e.g., read from cookie first, then header, then fallback
  //   return request.cookies.get('user-locale')?.value ?? request.headers.get('accept-language')?.split(',')[0] ?? defaultLocale;
  // },
} satisfies Parameters<typeof createMiddleware>[0];

export const intlMiddleware = createMiddleware(routing);

export type Pathnames = typeof routing.pathnames;