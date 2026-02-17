import { NextRequest, NextResponse } from 'next/server';

const THEME_COOKIE = 'theme';

export default function middleware(request: NextRequest) {
  const theme = request.cookies.get(THEME_COOKIE)?.value || 'light';

  // Optional: respect system if no cookie
  // But for SSR consistency, default to cookie or 'light'

  const response = NextResponse.next();

  // Pass theme to client via custom header or rewrite (but easiest: set on html via layout)
  // Actually → best to handle in layout with cookie read

  // For now: just ensure cookie exists; theme apply in layout
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};