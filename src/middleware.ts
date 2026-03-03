import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing'; // your existing routing

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Mode logic ─────────────────────────────────────────────────────────────
  const MODE_COOKIE_NAME = 'ds_mode';
  let mode = request.cookies.get(MODE_COOKIE_NAME)?.value as 'watcher' | 'slayer' | undefined;

  // First-time visitor or invalid value → default to watcher
  if (!mode || !['watcher', 'slayer'].includes(mode)) {
    mode = 'watcher';
  }

  // If on root (/) or localized root (/fr, /en), redirect to mode path
  const isRoot = pathname === '/' || pathname === '/fr' || pathname === '/en';
  if (isRoot) {
    const targetPath = mode === 'watcher' ? '/watch' : '/slay'; // or '/dips'

    // Preserve locale prefix if present
    const localePrefix = pathname.startsWith('/fr') ? '/fr' : '';
    const redirectUrl = `${localePrefix}${targetPath}`;

    const response = NextResponse.redirect(new URL(redirectUrl, request.url));

    // Set cookie so future visits remember choice
    response.cookies.set(MODE_COOKIE_NAME, mode, {
      path: '/',
      sameSite: 'lax',
      // maxAge: 60 * 60 * 24 * 30, // 30 days – uncomment if you want longer persistence
      // secure: process.env.NODE_ENV === 'production',
    });

    return response;
  }

  // For all other requests → run next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match root and localized root
    '/',
    '/(fr|en)',
    // Match all other app routes (same as your original)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};