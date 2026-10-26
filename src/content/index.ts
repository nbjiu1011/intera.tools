import type { Locale } from "@/i18n/config";
import type { ToolSlug } from "@/lib/tools";
import type { GuideSlug } from "@/lib/guides";
import { guides } from "@/lib/guides";
import type { WorkflowSlug } from "@/lib/workflows";
import { workflows } from "@/lib/workflows";
import guideContent from "./guides";
import type { GuideCategory, GuideContent, PageContent, ToolContent, WorkflowContent } from "./types";
import workflowContent from "./workflows";
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

export function getWorkflowContent(locale: Locale, slug: WorkflowSlug): WorkflowContent {
  return workflowContent[slug][locale];
}

export type WorkflowSummaries = Record<WorkflowSlug, { name: string; short: string }>;

export function getWorkflowSummaries(locale: Locale): WorkflowSummaries {
  return Object.fromEntries(
    workflows.map((w) => [w.slug, { name: workflowContent[w.slug][locale].name, short: workflowContent[w.slug][locale].short }]),
  ) as WorkflowSummaries;
}

export function getGuideContent(locale: Locale, slug: GuideSlug): GuideContent {
  return guideContent[slug][locale];
}

export type GuideSummary = { slug: GuideSlug; category: GuideCategory; title: string; summary: string };

/** Title + lead for every guide, newest first; safe to pass to client components. */
export function getGuideSummaries(locale: Locale): GuideSummary[] {
  return [...guides]
    .sort((a, b) => b.published.localeCompare(a.published))
    .map((g) => ({ slug: g.slug, category: g.category, title: guideContent[g.slug][locale].title, summary: guideContent[g.slug][locale].summary }));
}

/** Rough reading time from the text of a guide. */
export function readingMinutes(locale: Locale, content: GuideContent): number {
  const text = JSON.stringify(content.body);
  // Korean reads by characters; English by words.
  const units = locale === "ko" ? text.replace(/\s/g, "").length / 500 : text.split(/\s+/).length / 220;
  return Math.max(1, Math.round(units));
}

export type { GuideContent, PageContent, ToolContent, WorkflowContent };
