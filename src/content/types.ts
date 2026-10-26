import type { ToolSlug } from "../lib/tools";
import type { WorkflowSlug } from "../lib/workflows";

/** Long-form, search-facing copy for one tool page in one language. */
export type ToolContent = {
  /** Tool name used in cards, nav and breadcrumbs, e.g. "Compress Image". */
  name: string;
  /** One-line card description, at most ~60 characters. */
  short: string;
  /** <title>, at most ~60 characters, without the " | Intera Tools" suffix. */
  metaTitle: string;
  /** Meta description, 120–160 characters. */
  metaDescription: string;
  /** Visible page heading. */
  h1: string;
  /** One or two sentences under the H1. */
  lead: string;
  /** Exactly three "how to" steps, each one sentence. */
  steps: [string, string, string];
  /** Three short feature/benefit blocks. */
  features: { title: string; body: string }[];
  /** Two or three paragraphs of explanatory body text (use cases, tips, how it works). */
  about: { title: string; paragraphs: string[] };
  /** Three concrete situations where the tool is the right choice. */
  useCases: { title: string; body: string }[];
  /** Technical notes and limits, each one true for the current implementation. */
  limits: string[];
  /** Four or five questions and answers. */
  faq: { q: string; a: string }[];
};

/** Copy for one workflow page in one language. */
export type WorkflowContent = {
  name: string;
  short: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  /** One label per step in WorkflowDef.steps, same order. */
  stepLabels: string[];
  useCases: { title: string; body: string }[];
  about: { title: string; paragraphs: string[] };
  limits: string[];
  faq: { q: string; a: string }[];
};

export type GuideCategory = "tutorials" | "comparisons" | "file-formats" | "troubleshooting";

/**
 * Guide body blocks. Text fields support **bold**, `code` and [label](/path) links;
 * internal paths are written without the locale ("/compress-image") and get it added.
 */
export type GuideBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "steps"; items: { title: string; body: string }[] }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] }
  | { type: "note"; tone: "info" | "tip" | "warning"; title?: string; text: string }
  | { type: "tool"; slug: ToolSlug; text: string }
  | { type: "workflow"; slug: WorkflowSlug; text: string };

export type GuideContent = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Lead paragraph under the title. */
  summary: string;
  /** Three to five short bullet points shown in a box near the top. */
  takeaways: string[];
  body: GuideBlock[];
  faq?: { q: string; a: string }[];
  /** Official or primary sources for external facts in the guide, shown at the end. */
  sources?: { label: string; url: string }[];
};

/** A static text page (about, privacy, terms). */
export type PageContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  sections: { title: string; paragraphs: string[]; bullets?: string[] }[];
};
