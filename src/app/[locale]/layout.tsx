import "@/styles/global.scss";
import { Poppins } from "next/font/google";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { locales, isValidLocale } from "@/i18n/locales";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`@/i18n/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value ?? "light";

  return (
    <html
      lang={locale}
      data-theme={theme}
      suppressHydrationWarning
      className={poppins.variable}
    >
      <head>
        {/* Minimal client script for dark mode fallback (only if no cookie) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (!document.documentElement.getAttribute('data-theme')) {
                  const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  document.documentElement.setAttribute('data-theme', prefers);
                }
              })();
            `,
          }}
        />
      </head>

      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <Toaster
            position="top-center"
            containerStyle={{
              zIndex: 99999,
            }}
            toastOptions={{
              duration: 4000,
              style: {
                borderRadius: "12px",
                background: "#333",
                color: "#fff",
                padding: "16px",
                fontSize: "16px",
                zIndex: 99999,
              },
              success: {
                style: {
                  background: "var(--color-success)",
                  color: "white",
                  zIndex: 99999,
                },
              },
              error: {
                style: {
                  background: "var(--color-danger)",
                  color: "white",
                  zIndex: 99999,
                },
              },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
