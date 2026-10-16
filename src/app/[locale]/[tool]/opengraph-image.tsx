import { getToolContent } from "@/content";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ogSize, renderOg } from "@/lib/og";
import { isToolSlug, toolMap, tools } from "@/lib/tools";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Intera Tools tool preview";

// Pre-render every card at build time.
export function generateStaticParams() {
  return locales.flatMap((locale) => tools.map((t) => ({ locale, tool: t.slug })));
}

export default async function Image({ params }: { params: Promise<{ locale: string; tool: string }> }) {
  const { locale: raw, tool: slug } = await params;
  const locale = isLocale(raw) ? raw : "en";
  if (!isToolSlug(slug)) return renderOg({ title: "Intera Tools", subtitle: "", pills: [] });
  const dict = getDictionary(locale);
  const content = getToolContent(locale, slug);
  const tool = toolMap[slug];
  return renderOg({
    title: content.name,
    subtitle: content.short,
    pills: [dict.tool.badgeFree, dict.tool.badgeNoSignup, dict.tool.badgeLocal],
    icon: tool.icon,
    accent: tool.accent,
  });
}
