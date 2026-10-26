import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { I18nProvider } from "@/components/I18nProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { InlineScript, themeScript } from "@/components/ui/InlineScript";
import { adsenseConfig, siteConfig, verification } from "@/config/site";
import { getToolSummaries, getWorkflowSummaries } from "@/content";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0d10" },
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
  const workflowNames = getWorkflowSummaries(locale);

  return (
    <html lang={locale} className={inter.variable} data-theme="light" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <InlineScript html={themeScript} />
        {/* The AdSense snippet sits in the static <head>, exactly as AdSense's site check expects it. */}
        {adsenseConfig.client && process.env.NODE_ENV === "production" && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseConfig.client}`}
            crossOrigin="anonymous"
          />
        )}
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
        <I18nProvider value={{ locale, dict, tools: names, workflows: workflowNames }}>
          <div className="relative isolate">
            <Header />
            <main id="main" className="relative">
              {children}
            </main>
            <Footer locale={locale} dict={dict} names={names} workflowNames={workflowNames} />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
