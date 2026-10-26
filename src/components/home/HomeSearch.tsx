"use client";

import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useId, useMemo, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { format } from "@/i18n/format";
import { track } from "@/lib/analytics";
import { searchAll, type SearchEntry } from "@/lib/search";

/** Site-wide search over tools, workflows and guides with an inline result list. */
export function HomeSearch({ entries }: { entries: SearchEntry[] }) {
  const { dict } = useI18n();
  const router = useRouter();
  const id = useId();
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const results = useMemo(() => searchAll(deferred, entries).slice(0, 8), [deferred, entries]);
  const kindLabel = { tool: dict.home.resultTool, workflow: dict.home.resultWorkflow, guide: dict.home.resultGuide };

  useEffect(() => {
    const q = deferred.trim();
    if (q.length < 3) return;
    const t = setTimeout(() => track("search", { count: results.length, kind: results.length ? "hit" : "miss" }), 1200);
    return () => clearTimeout(t);
  }, [deferred, results.length]);

  return (
    <div className="relative">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (results[0]) router.push(results[0].href);
        }}
        className="flex h-14 items-center border-b-2 border-ink bg-transparent transition focus-within:border-brand"
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
          placeholder={dict.home.searchPlaceholder}
          autoComplete="off"
          enterKeyHint="go"
          className="h-full min-w-0 flex-1 bg-transparent px-3 text-lg text-ink outline-none placeholder:text-ink-3 [&::-webkit-search-cancel-button]:hidden"
        />
        <button type="submit" aria-label={dict.home.searchSubmit} className="grid size-10 shrink-0 place-items-center rounded-md text-ink hover:bg-muted">
          <ArrowRight className="size-5" />
        </button>
      </form>
      {deferred.trim() && (
        <div className="mt-2 rounded-lg border border-line bg-elevated" aria-live="polite">
          {results.length ? (
            <ul className="divide-y divide-line">
              {results.map((r) => (
                <li key={`${r.kind}:${r.id}`}>
                  <Link href={r.href} className="flex items-center gap-4 px-4 py-3 transition hover:bg-muted">
                    <span className="w-20 shrink-0 text-xs font-semibold tracking-[0.06em] text-ink-3 uppercase">{kindLabel[r.kind]}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-ink">{r.title}</span>
                      <span className="block truncate text-sm text-ink-3">{r.text}</span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-ink-3" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-5">
              <p className="font-semibold text-ink">{format(dict.home.noResults, { query: deferred })}</p>
              <p className="mt-1 text-sm text-ink-3">{dict.home.noResultsHint}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
