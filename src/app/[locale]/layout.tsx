import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

import '@/styles/main.scss';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: 'Dip-Slay – Watcher or Slayer?',
  description: 'Competitive dip battles. Upload, duel, vote, climb the leaderboard.',
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Optional: Validate locale (prevents invalid /[locale] from rendering)
  // You can use your list of supported locales
  const supportedLocales = ['en', 'fr'];
  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}