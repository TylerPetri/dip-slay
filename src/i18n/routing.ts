import createMiddleware from 'next-intl/middleware';
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
      de: '',
      it: ''
    } satisfies Record<Locale, string>,

    '/login': {
      en: '/login',
      fr: '/connexion',
      es: '/iniciar-sesion',
      de: '',
      it: ''
    } satisfies Record<Locale, string>,

    '/profile': {
      en: '/profile',
      fr: '/profil',
      es: '/perfil',
      de: '',
      it: ''
    } satisfies Record<Locale, string>,

    '/cooks': {
      en: '/cooks',
      fr: '/cuisiniers',
      es: '/cocineros',
      de: '',
      it: ''
    } satisfies Record<Locale, string>,

    '/dips': {
      en: '/dips',
      fr: '/dips',
      es: '/salsas',
      de: '',
      it: ''
    } satisfies Record<Locale, string>,

    '/dips/new': {
      en: '/dips/new',
      fr: '/dips/nouveau',
      es: '/dips/nuevo',
      de: '',
      it: ''
    } satisfies Record<Locale, string>,
  },
} satisfies Parameters<typeof createMiddleware>[0];

export const intlMiddleware = createMiddleware(routing);

export type AppPathnames = typeof routing.pathnames;