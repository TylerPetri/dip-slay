import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

import "@/styles/main.scss";
import ClientWrapper from "@/components/layout/ClientWrapper";
import Header from "@/components/layout/Header/Header";
import QueryProvider from "@/providers/QueryProvider";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Dip-Slay – Watcher or Slayer?",
  description:
    "Competitive dip battles. Upload, duel, vote, climb the leaderboard.",
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  const supportedLocales = ["en", "fr"];
  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <QueryProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <ClientWrapper>{children}</ClientWrapper>
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
