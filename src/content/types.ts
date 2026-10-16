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
  /** Four or five questions and answers. */
  faq: { q: string; a: string }[];
};

/** A static text page (about, privacy, terms). */
export type PageContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  sections: { title: string; paragraphs: string[]; bullets?: string[] }[];
};
