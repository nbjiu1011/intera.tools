import type { Locale } from "@/i18n/config";
import type { ToolSlug } from "@/lib/tools";
import type { PageContent, ToolContent } from "./types";
import enImage from "./tools/en-image";
import enPdf from "./tools/en-pdf";
import koImage from "./tools/ko-image";
import koPdf from "./tools/ko-pdf";
import enPages from "./pages/en";
import koPages from "./pages/ko";

const toolContent: Record<Locale, Partial<Record<ToolSlug, ToolContent>>> = {
  en: { ...enImage, ...enPdf },
  ko: { ...koImage, ...koPdf },
};

const pageContent = { en: enPages, ko: koPages } satisfies Record<Locale, Record<string, PageContent>>;
export type StaticPageKey = keyof typeof enPages;

export function getToolContent(locale: Locale, slug: ToolSlug): ToolContent {
  const content = toolContent[locale][slug] ?? toolContent.en[slug];
  if (!content) throw new Error(`Missing content for tool "${slug}"`);
  return content;
}

/** Name + card description for every tool, safe to pass to client components. */
export function getToolSummaries(locale: Locale): Record<ToolSlug, { name: string; short: string }> {
  const merged = { ...toolContent.en, ...toolContent[locale] };
  return Object.fromEntries(
    Object.entries(merged).map(([slug, c]) => [slug, { name: c!.name, short: c!.short }]),
  ) as Record<ToolSlug, { name: string; short: string }>;
}

export function getPageContent(locale: Locale, key: StaticPageKey): PageContent {
  return pageContent[locale][key];
}

export type { PageContent, ToolContent };
