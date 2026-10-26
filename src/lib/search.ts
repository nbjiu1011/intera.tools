import type { Locale } from "@/i18n/config";
import { tools, type ToolDef, type ToolSlug } from "./tools";

function normalize(s: string) {
  return s.toLowerCase().normalize("NFKC").replace(/[\s\-_]+/g, " ").trim();
}

/** Rank tools for a query using names, descriptions and aliases in the current locale and English. */
export function searchTools(
  query: string,
  locale: Locale,
  names: Record<ToolSlug, { name: string; short: string }>,
): ToolDef[] {
  const q = normalize(query);
  if (!q) return [];
  const words = q.split(" ");
  const scored = tools.map((tool) => {
    const name = normalize(names[tool.slug].name);
    const haystack = [
      name,
      normalize(names[tool.slug].short),
      normalize(tool.slug),
      ...tool.aliases[locale].map(normalize),
      ...tool.aliases.en.map(normalize),
    ].join(" | ");
    let score = 0;
    if (name === q) score += 100;
    if (name.startsWith(q)) score += 40;
    if (haystack.includes(q)) score += 25;
    for (const w of words) if (haystack.includes(w)) score += 10;
    if (!words.every((w) => haystack.includes(w))) score = Math.min(score, 9);
    return { tool, score };
  });
  return scored
    .filter((s) => s.score >= 10)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.tool);
}

export type SearchEntry = {
  kind: "tool" | "workflow" | "guide";
  id: string;
  href: string;
  title: string;
  text: string;
  /** Extra matched terms (aliases, category names). */
  terms: string[];
};

/** Rank tools, workflows and guides together. Titles weigh most, then terms, then body text. */
export function searchAll(query: string, entries: SearchEntry[]): SearchEntry[] {
  const q = normalize(query);
  if (!q) return [];
  const words = q.split(" ");
  return entries
    .map((entry) => {
      const title = normalize(entry.title);
      const terms = entry.terms.map(normalize).join(" | ");
      const text = normalize(entry.text);
      const all = `${title} | ${terms} | ${text}`;
      let score = 0;
      if (title === q) score += 100;
      if (title.startsWith(q)) score += 40;
      if (title.includes(q)) score += 30;
      if (terms.includes(q)) score += 20;
      for (const w of words) {
        if (title.includes(w)) score += 12;
        else if (terms.includes(w)) score += 8;
        else if (text.includes(w)) score += 3;
      }
      if (!words.every((w) => all.includes(w))) score = 0;
      // Tools first on ties: they solve the task directly.
      if (score && entry.kind === "tool") score += 2;
      return { entry, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.entry);
}
