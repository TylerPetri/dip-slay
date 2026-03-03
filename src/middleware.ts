import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing'; // your existing routing

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Mode logic ─────────────────────────────────────────────────────────────
  const MODE_COOKIE_NAME = 'ds_mode';
  const mode = request.cookies.get(MODE_COOKIE_NAME)?.value as 'watcher' | 'slayer' | undefined;

  // Only redirect if a valid mode cookie ALREADY exists (return visits)
  if (mode && ['watcher', 'slayer'].includes(mode)) {
    // If on root (/) or localized root (/fr, /en), redirect to mode path
    const isRoot = pathname === '/' || pathname === `/${request.nextUrl.locale}`;
    if (isRoot) {
      const localePrefix = request.nextUrl.locale ? `/${request.nextUrl.locale}` : '';
      const targetPath = `/${mode}`;
      const redirectUrl = `${localePrefix}${targetPath}`;

      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  }

  // For all other requests (including first visits to root) → run next-intl middleware
  // No default mode set here — that's handled client-side on choice
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