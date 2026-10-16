"use client";

import { ArrowRight, Ellipsis, FileText, Image as ImageIcon, LayoutGrid, PenLine, Repeat2, Search, type LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useId, useMemo, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { format } from "@/i18n/format";
import { track } from "@/lib/analytics";
import { searchTools } from "@/lib/search";
import { featuredSlugs, toolMap, tools, type ToolDef } from "@/lib/tools";
import { ToolCard } from "./ToolCard";

export type Filter = "all" | "image" | "pdf" | "convert" | "edit" | "everyday";

const filterIcons: Record<Filter, LucideIcon> = {
  all: LayoutGrid,
  image: ImageIcon,
  pdf: FileText,
  convert: Repeat2,
  edit: PenLine,
  everyday: Ellipsis,
};

export function matchesFilter(tool: ToolDef, filter: Filter) {
  if (filter === "all") return true;
  if (filter === "image" || filter === "pdf" || filter === "everyday") return tool.category === filter;
  return tool.tags.includes(filter);
}

export function FilterChips({ value, onChange }: { value: Filter; onChange: (f: Filter) => void }) {
  const { dict } = useI18n();
  const filters: Filter[] = ["all", "image", "pdf", "convert", "edit", "everyday"];
  return (
    <div role="group" aria-label={dict.nav.tools} className="scrollbar-none -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      {filters.map((f) => {
        const Icon = filterIcons[f];
        const active = value === f;
        return (
          <button
            key={f}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(f)}
            className={`flex h-11 shrink-0 items-center gap-2 rounded-full px-[1.1rem] text-[0.95rem] font-medium transition ${
              active
                ? "bg-brand-gradient text-white shadow-button"
                : "border border-line bg-surface/80 text-ink-2 shadow-[0_2px_10px_-6px_rgba(30,40,100,.2)] hover:border-line-strong hover:text-ink"
            }`}
          >
            <Icon className="size-[17px]" />
            {dict.categories[f]}
          </button>
        );
      })}
    </div>
  );
}

export function SearchBox({
  value,
  onChange,
  onSubmit,
  size = "lg",
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  size?: "lg" | "md";
}) {
  const { dict } = useI18n();
  const id = useId();
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className={`group relative flex items-center rounded-full border border-line bg-surface shadow-[0_18px_44px_-24px_rgba(40,60,160,.45)] transition focus-within:border-brand/50 focus-within:shadow-[0_18px_44px_-20px_rgba(79,123,255,.55)] ${
        size === "lg" ? "h-16 pr-2 pl-6" : "h-13 pr-1.5 pl-5"
      }`}
    >
      <label htmlFor={id} className="sr-only">
        {dict.home.searchLabel}
      </label>
      <Search className="size-[22px] shrink-0 text-brand" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={dict.home.searchPlaceholder}
        autoComplete="off"
        enterKeyHint="go"
        className="h-full min-w-0 flex-1 bg-transparent px-3.5 text-[1rem] text-ink outline-none placeholder:text-ink-3 [&::-webkit-search-cancel-button]:hidden"
      />
      <button
        type="submit"
        aria-label={dict.home.searchSubmit}
        className={`bg-brand-gradient grid shrink-0 place-items-center rounded-full text-white shadow-button transition hover:brightness-110 active:scale-95 ${
          size === "lg" ? "size-12" : "size-10"
        }`}
      >
        <ArrowRight className="size-5" />
      </button>
    </form>
  );
}

/** Hero search + category chips + tool cards. Featured tools show until the visitor searches or filters. */
export function HomeExplorer() {
  const { locale, dict, tools: names } = useI18n();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const deferred = useDeferredValue(query);

  const results = useMemo(() => {
    if (deferred.trim()) return searchTools(deferred, locale, names).filter((t) => matchesFilter(t, filter));
    if (filter === "all") return featuredSlugs.map((s) => toolMap[s]);
    return tools.filter((t) => matchesFilter(t, filter));
  }, [deferred, filter, locale, names]);

  useEffect(() => {
    const q = deferred.trim();
    if (q.length < 3) return;
    const id = setTimeout(() => track("search", { count: results.length, kind: results.length ? "hit" : "miss" }), 1200);
    return () => clearTimeout(id);
  }, [deferred, results.length]);

  const submit = () => {
    const first = results[0];
    if (query.trim() && first) router.push(`/${locale}/${first.slug}`);
    else router.push(`/${locale}/tools`);
  };

  return (
    <>
      <div className="relative z-10 max-w-[600px]">
        <SearchBox value={query} onChange={setQuery} onSubmit={submit} />
      </div>
      <div className="relative z-10 mt-8">
        <FilterChips value={filter} onChange={setFilter} />
      </div>
      <div className="relative z-10 mt-10 xl:-mx-12" aria-live="polite">
        {results.length ? (
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-6 xl:gap-3.5">
            {results.map((tool, i) => (
              <li key={tool.slug} className="animate-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
                <ToolCard
                  tool={tool}
                  name={names[tool.slug].name}
                  short={names[tool.slug].short}
                  href={`/${locale}/${tool.slug}`}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="card px-6 py-10 text-center">
            <p className="font-semibold text-ink">{format(dict.home.noResults, { query })}</p>
            <p className="mt-1 text-sm text-ink-3">{dict.home.noResultsHint}</p>
          </div>
        )}
      </div>
    </>
  );
}
