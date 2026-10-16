import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { locales, localeTags, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/** Path without locale, e.g. "" for home or "/compress-image". */
export function localizedUrl(locale: Locale, path: string): string {
  return `${siteConfig.url}/${locale}${path}`;
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
  ownImage = false,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
  /** The route has its own opengraph-image file; don't override it with the brand card. */
  ownImage?: boolean;
}): Metadata {
  const dict = getDictionary(locale);
  // Search results cut titles at roughly 60 Latin / 35 Korean characters; only add the
  // brand suffix when it still fits, so the keyword part is never truncated.
  const limit = locale === "ko" ? 36 : 60;
  const withSuffix = `${title}${dict.meta.titleSuffix}`;
  const fullTitle = absoluteTitle || withSuffix.length > limit ? title : withSuffix;
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeTags[l]] = localizedUrl(l, path);
  languages["x-default"] = localizedUrl("en", path);

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: localizedUrl(locale, path), languages },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url: localizedUrl(locale, path),
      locale: localeTags[locale].replace("-", "_"),
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeTags[l].replace("-", "_")),
      // Brand card for pages without their own opengraph-image (tool pages override this).
      ...(ownImage ? {} : { images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: siteConfig.name }] }),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, ...(ownImage ? {} : { images: [`/${locale}/opengraph-image`] }) },
  };
}

/** Serialize JSON-LD safely for a <script> tag. */
export function jsonLd(data: unknown): { __html: string } {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
