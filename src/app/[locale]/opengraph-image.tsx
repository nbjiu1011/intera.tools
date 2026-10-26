import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Intera Tools — Free Online Tools";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const dict = getDictionary(isLocale(raw) ? raw : "en");
  const h = dict.home;
  return renderOg({
    title: h.title,
    subtitle: dict.meta.siteDescription,
    pills: [dict.tool.badgeFree, dict.tool.badgeNoSignup, dict.tool.badgeLocal],
  });
}
