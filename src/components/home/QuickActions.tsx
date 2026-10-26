"use client";

import { Layers } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";
import { ToolIcon } from "@/components/ui/ToolIcon";
import { useFavorites, useRecent } from "@/lib/local";
import { featuredSlugs, isToolSlug, toolMap } from "@/lib/tools";
import { isWorkflowSlug } from "@/lib/workflows";

/** Recent and favorite tools (stored in this browser), or a default set on a first visit. */
export function QuickActions() {
  const { locale, dict, tools: names, workflows: workflowNames } = useI18n();
  const [recent, setRecent] = useRecent();
  const favorites = useFavorites();

  const item = (id: string) => {
    if (isToolSlug(id)) {
      const t = toolMap[id];
      return { href: `/${locale}/${id}`, name: names[id].name, icon: <ToolIcon icon={t.icon} accent={t.accent} size="sm" /> };
    }
    const slug = id.replace(/^workflow:/, "");
    if (isWorkflowSlug(slug)) {
      return {
        href: `/${locale}/workflows/${slug}`,
        name: workflowNames[slug].name,
        icon: (
          <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-muted text-ink">
            <Layers className="size-[18px]" />
          </span>
        ),
      };
    }
    return null;
  };

  const rows: { title: string; ids: string[]; clear?: () => void }[] = [];
  if (favorites.list.length) rows.push({ title: dict.home.quickFavorites, ids: favorites.list });
  if (recent.length) rows.push({ title: dict.home.quickRecent, ids: recent.filter((r) => !favorites.list.includes(r)), clear: () => setRecent([]) });
  if (!rows.length) rows.push({ title: dict.home.quickStart, ids: featuredSlugs });

  return (
    <div className="grid gap-6">
      {rows
        .filter((r) => r.ids.length)
        .map((row) => (
          <div key={row.title}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-semibold tracking-[0.08em] text-ink-3 uppercase">{row.title}</p>
              {row.clear && (
                <button type="button" onClick={row.clear} className="text-xs font-medium text-ink-3 hover:text-ink">
                  {dict.personal.clearRecent}
                </button>
              )}
            </div>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {row.ids.slice(0, 6).map((id) => {
                const it = item(id);
                if (!it) return null;
                return (
                  <li key={id}>
                    <Link href={it.href} className="flex h-full items-center gap-3 rounded-lg border border-line p-3 text-sm font-semibold text-ink transition hover:border-ink">
                      {it.icon}
                      <span className="min-w-0 leading-snug">{it.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
    </div>
  );
}
