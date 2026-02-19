import { redirect } from './navigation';
import { type Locale } from './locales';

export function serverRedirect(
  pathname: ("/leaderboard" | "/login" | "/profile" | "/cooks" | "/dips" | "/dips/new"),               // internal key like '/dips' or '/leaderboard'
  locale: Locale,
  options?: { query?: Record<string, string | string[]> }
) {
  redirect({
    href: { pathname },
    locale,
    ...(options?.query && { query: options.query })
  });
}