import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/i18n/locales';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
  // pathnames: { ... } if needed
});

const THEME_COOKIE = 'theme';

export default function middleware(request: NextRequest) {
  const intlResponse = intlMiddleware(request);

  if (intlResponse.status !== 200 && intlResponse.status !== 304) {
    return intlResponse;
  }

  const theme = request.cookies.get(THEME_COOKIE)?.value || 'light';

  // Optional: set a custom header for theme
  // intlResponse.headers.set('x-theme', theme);

  return intlResponse;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    '/'
  ]
};