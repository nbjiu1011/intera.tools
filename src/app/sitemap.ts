import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales, localeTags } from "@/i18n/config";
import { guides } from "@/lib/guides";
import { tools } from "@/lib/tools";
import { workflows } from "@/lib/workflows";

export const dynamic = "force-static";

// Content changes ship with deployments, so the build time is an honest lastModified;
// guides carry their own "updated" date.
const buildTime = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const paths: { path: string; priority: number; lastModified?: Date }[] = [
    { path: "", priority: 1 },
    { path: "/tools", priority: 0.9 },
    ...tools.map((t) => ({ path: `/${t.slug}`, priority: t.popular ? 0.9 : 0.8 })),
    { path: "/workflows", priority: 0.8 },
    ...workflows.map((w) => ({ path: `/workflows/${w.slug}`, priority: 0.8 })),
    { path: "/guides", priority: 0.8 },
    ...guides.map((g) => ({ path: `/guides/${g.slug}`, priority: 0.7, lastModified: new Date(`${g.updated}T00:00:00Z`) })),
    { path: "/about", priority: 0.4 },
    { path: "/contact", priority: 0.3 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];
  return paths.flatMap(({ path, priority, lastModified }) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      lastModified: lastModified ?? buildTime,
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [localeTags[l], `${siteConfig.url}/${l}${path}`])),
      },
    })),
  );
}
