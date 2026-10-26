"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useId, useMemo, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { format } from "@/i18n/format";
import { searchTools } from "@/lib/search";
import { tools, toolSections, type ToolSection } from "@/lib/tools";
import { ToolCard } from "./ToolCard";

type Filter = "all" | ToolSection;

/** Full catalog with search (?q=) and section filters. */
export function ToolsExplorer() {
  const { locale, dict, tools: names } = useI18n();
  const params = useSearchParams();
  const router = useRouter();
  const id = useId();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [filter, setFilter] = useState<Filter>("all");
  const deferred = useDeferredValue(query);

  const list = useMemo(() => {
    const base = deferred.trim() ? searchTools(deferred, locale, names) : tools;
    return base.filter((t) => filter === "all" || t.section === filter);
  }, [deferred, filter, locale, names]);
  const grouped = !deferred.trim();

  const card = (t: (typeof tools)[number]) => (
    <li key={t.slug}>
      <ToolCard tool={t} name={names[t.slug].name} short={names[t.slug].short} href={`/${locale}/${t.slug}`} />
    </li>
  );

  return (
    <>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (list[0]) router.push(`/${locale}/${list[0].slug}`);
        }}
        className="flex h-14 max-w-2xl items-center border-b-2 border-ink focus-within:border-brand"
      >
        <label htmlFor={id} className="sr-only">
          {dict.home.searchLabel}
        </label>
        <Search className="size-5 shrink-0 text-ink" />
        <input
          id={id}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={dict.toolsPage.searchPlaceholder}
          autoComplete="off"
          className="h-full min-w-0 flex-1 bg-transparent px-3 text-lg text-ink outline-none placeholder:text-ink-3 [&::-webkit-search-cancel-button]:hidden"
        />
      </form>
      <div role="group" aria-label={dict.nav.tools} className="scrollbar-none -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {(["all", ...toolSections] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`h-9 shrink-0 rounded-md border px-3 text-sm font-medium transition ${
              filter === f ? "border-ink bg-ink text-bg" : "border-line text-ink-2 hover:border-ink hover:text-ink"
            }`}
          >
            {f === "all" ? dict.categories.all : dict.sections[f]}
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm text-ink-3" aria-live="polite">
        {format(dict.toolsPage.count, { count: list.length })}
      </p>
      {!list.length ? (
        <div className="mt-6 max-w-lg border-t border-line pt-6">
          <p className="font-semibold text-ink">{format(dict.home.noResults, { query })}</p>
          <p className="mt-1 text-sm text-ink-3">{dict.home.noResultsHint}</p>
        </div>
      ) : grouped ? (
        <div className="mt-8 grid gap-14">
          {toolSections.map((s, i) => {
            const items = list.filter((t) => t.section === s);
            if (!items.length) return null;
            return (
              <section key={s} aria-labelledby={`sec-${s}`}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t-2 border-ink pt-4">
                  <span className="text-sm font-semibold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <h2 id={`sec-${s}`} className="text-2xl font-bold tracking-[-0.02em] text-ink">
                    {dict.sections[s]}
                  </h2>
                  <p className="text-sm text-ink-3">{dict.sections[`${s}Lead`]}</p>
                </div>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{items.map(card)}</ul>
              </section>
            );
          })}
        </div>
      ) : (
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{list.map(card)}</ul>
      )}
    </>
  );
}
