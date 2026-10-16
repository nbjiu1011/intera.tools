import type { Metadata, Viewport } from "next";
import { Caveat, Inter, Nanum_Pen_Script } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { I18nProvider } from "@/components/I18nProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { InlineScript, themeScript } from "@/components/ui/InlineScript";
import { adsenseConfig, siteConfig, verification } from "@/config/site";
import { getToolSummaries } from "@/content";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap", weight: ["500", "600"] });
// Korean handwriting for the hero notes; only downloaded when Korean glyphs are used.
const nanumPen = Nanum_Pen_Script({ weight: "400", variable: "--font-nanum-pen", display: "swap", preload: false });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7fc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e1f" },
  ],
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    ...buildMetadata({
      locale,
      path: "",
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      absoluteTitle: true,
    }),
    verification: {
      ...(verification.google ? { google: verification.google } : {}),
      other: {
        ...(verification.naver ? { "naver-site-verification": verification.naver } : {}),
        ...(verification.bing ? { "msvalidate.01": verification.bing } : {}),
      },
    },
    ...(adsenseConfig.client ? { other: { "google-adsense-account": adsenseConfig.client } } : {}),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const names = getToolSummaries(locale);

  return (
    <html lang={locale} className={`${inter.variable} ${caveat.variable} ${nanumPen.variable}`} data-theme="light" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <InlineScript html={themeScript} />
        {locale === "ko" && (
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          />
        )}
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-surface px-4 py-2 font-semibold shadow-pop focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {dict.nav.skip}
        </a>
        <I18nProvider value={{ locale, dict, tools: names }}>
          <div className="relative isolate">
            <div className="page-backdrop" aria-hidden />
            <Header />
            <main id="main" className="relative">
              {children}
            </main>
            <Footer locale={locale} dict={dict} names={names} />
          </div>
        </I18nProvider>
        {adsenseConfig.client && (
          <Script
            id="adsense"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseConfig.client}`}
          />
        )}
      </body>
    </html>
  );
}
