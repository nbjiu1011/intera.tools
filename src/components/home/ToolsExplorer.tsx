"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useMemo, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { format } from "@/i18n/format";
import { searchTools } from "@/lib/search";
import { tools, type ToolCategory } from "@/lib/tools";
import { FilterChips, matchesFilter, SearchBox, type Filter } from "./HomeExplorer";
import { ToolCard } from "./ToolCard";

/** Full catalog with search (?q=) and category filters. */
export function ToolsExplorer() {
  const { locale, dict, tools: names } = useI18n();
  const params = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [filter, setFilter] = useState<Filter>("all");
  const deferred = useDeferredValue(query);

  const list = useMemo(() => {
    const base = deferred.trim() ? searchTools(deferred, locale, names) : tools;
    return base.filter((t) => matchesFilter(t, filter));
  }, [deferred, filter, locale, names]);

  const categories: { key: ToolCategory; title: string }[] = [
    { key: "image", title: dict.categories.imageTools },
    { key: "pdf", title: dict.categories.pdfTools },
    { key: "everyday", title: dict.categories.everydayTools },
  ];
  const grouped = !deferred.trim();

  const card = (t: (typeof tools)[number]) => (
    <li key={t.slug} className="animate-fade-up">
      <ToolCard tool={t} name={names[t.slug].name} short={names[t.slug].short} href={`/${locale}/${t.slug}`} />
    </li>
  );

  return (
    <>
      <div className="mx-auto max-w-[620px]">
        <SearchBox value={query} onChange={setQuery} onSubmit={() => list[0] && router.push(`/${locale}/${list[0].slug}`)} />
      </div>
      <div className="mt-6 flex justify-center">
        <FilterChips value={filter} onChange={setFilter} />
      </div>
      <p className="mt-6 text-center text-sm text-ink-3" aria-live="polite">
        {format(dict.toolsPage.count, { count: list.length })}
      </p>
      {!list.length ? (
        <div className="card mx-auto mt-6 max-w-lg px-6 py-10 text-center">
          <p className="font-semibold text-ink">{format(dict.home.noResults, { query })}</p>
          <p className="mt-1 text-sm text-ink-3">{dict.home.noResultsHint}</p>
        </div>
      ) : grouped ? (
        <div className="mt-8 grid gap-12">
          {categories.map((c) => {
            const items = list.filter((t) => t.category === c.key);
            if (!items.length) return null;
            return (
              <section key={c.key} aria-labelledby={`cat-${c.key}`}>
                <h2 id={`cat-${c.key}`} className="mb-4 text-xl font-bold tracking-[-0.02em] text-ink">
                  {c.title}
                </h2>
                <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">{items.map(card)}</ul>
              </section>
            );
          })}
        </div>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">{list.map(card)}</ul>
      )}
    </>
  );
}
