"use client";

import { Star } from "lucide-react";
import { useEffect } from "react";
import { useI18n } from "@/components/I18nProvider";
import { track } from "@/lib/analytics";
import { rememberVisit, useFavorites } from "@/lib/local";

/** Wraps a tool or workflow page: records an anonymous view and remembers it as recently used. */
export function ToolView({ slug, id = slug, children }: { slug: string; id?: string; children: React.ReactNode }) {
  useEffect(() => {
    track("tool_view", { tool: slug });
    rememberVisit(id);
  }, [slug, id]);
  return <>{children}</>;
}

/** Records an anonymous guide view (slug only). */
export function GuideView({ slug }: { slug: string }) {
  useEffect(() => {
    track("guide_view", { tool: slug });
  }, [slug]);
  return null;
}

/** Star toggle that keeps a tool or workflow in this browser's favorites. */
export function FavoriteButton({ id }: { id: string }) {
  const { dict } = useI18n();
  const fav = useFavorites();
  const on = fav.has(id);
  return (
    <button
      type="button"
      onClick={() => fav.toggle(id)}
      aria-pressed={on}
      title={dict.personal.savedLocally}
      className={`inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm font-medium transition ${
        on ? "border-ink bg-ink text-bg" : "border-line text-ink-2 hover:border-ink hover:text-ink"
      }`}
    >
      <Star className={`size-4 ${on ? "fill-current" : ""}`} />
      {on ? dict.personal.favorited : dict.personal.favorite}
    </button>
  );
}
