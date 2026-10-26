import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { GuideSummary } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";

export function GuideCard({ guide, locale, dict, compact = false }: { guide: GuideSummary; locale: Locale; dict: Dict; compact?: boolean }) {
  return (
    <Link href={`/${locale}/guides/${guide.slug}`} className="group flex h-full flex-col border-t border-line pt-4 transition hover:border-ink">
      <span className="text-xs font-semibold tracking-[0.08em] text-ink-3 uppercase">{dict.guideCategories[guide.category]}</span>
      <h3 className="mt-2 text-lg leading-snug font-bold tracking-[-0.015em] text-ink group-hover:underline group-hover:decoration-line-strong group-hover:underline-offset-4">
        {guide.title}
      </h3>
      {!compact && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-2">{guide.summary}</p>}
      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand">
        {dict.toolPage.readGuide}
        <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
