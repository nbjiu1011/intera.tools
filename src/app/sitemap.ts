import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales, localeTags } from "@/i18n/config";
import { tools } from "@/lib/tools";

export const dynamic = "force-static";

// Content changes ship with deployments, so the build time is an honest lastModified.
const buildTime = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const paths: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/tools", priority: 0.9 },
    ...tools.map((t) => ({ path: `/${t.slug}`, priority: t.popular ? 0.9 : 0.8 })),
    { path: "/about", priority: 0.4 },
    { path: "/contact", priority: 0.3 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];
  return paths.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      lastModified: buildTime,
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [localeTags[l], `${siteConfig.url}/${l}${path}`])),
      },
    })),
  );
}
