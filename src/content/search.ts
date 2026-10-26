import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { guides } from "@/lib/guides";
import type { SearchEntry } from "@/lib/search";
import { tools } from "@/lib/tools";
import { workflows } from "@/lib/workflows";
import { getGuideContent, getToolContent, getWorkflowContent } from "./index";

/** Everything the site search can find, in one locale (built at build time, passed to the client). */
export function buildSearchEntries(locale: Locale): SearchEntry[] {
  const dict = getDictionary(locale);
  return [
    ...tools.map((t) => {
      const c = getToolContent(locale, t.slug);
      return {
        kind: "tool" as const,
        id: t.slug,
        href: `/${locale}/${t.slug}`,
        title: c.name,
        text: c.short,
        terms: [t.slug, dict.sections[t.section], ...t.aliases[locale], ...t.aliases.en],
      };
    }),
    ...workflows.map((w) => {
      const c = getWorkflowContent(locale, w.slug);
      return {
        kind: "workflow" as const,
        id: w.slug,
        href: `/${locale}/workflows/${w.slug}`,
        title: c.name,
        text: c.short,
        terms: [dict.workflowCategories[w.category], ...w.steps.map((s) => dict.workflowSteps[s])],
      };
    }),
    ...guides.map((g) => {
      const c = getGuideContent(locale, g.slug);
      return {
        kind: "guide" as const,
        id: g.slug,
        href: `/${locale}/guides/${g.slug}`,
        title: c.title,
        text: c.summary,
        terms: [dict.guideCategories[g.category]],
      };
    }),
  ];
}
