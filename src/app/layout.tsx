import "@/styles/global.scss";
import { Poppins } from "next/font/google";
import { cookies } from "next/headers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value ?? "light";

  return (
    <html
      lang="en"
      data-theme={theme}
      suppressHydrationWarning
      className={poppins.variable}
    >
      <head>
        {/* Minimal client script for dark mode fallback */}
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
      <body className="antialiased">{children}</body>
    </html>
  );
}