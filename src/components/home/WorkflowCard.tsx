import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import type { WorkflowDef } from "@/lib/workflows";

export function WorkflowSteps({ steps, dict, className = "" }: { steps: WorkflowDef["steps"]; dict: Dict; className?: string }) {
  return (
    <ol className={`flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-ink-2 ${className}`} aria-label={dict.workflowsPage.stepsLabel}>
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-1.5">
          <span className="rounded border border-line px-1.5 py-0.5 font-medium">{dict.workflowSteps[s]}</span>
          {i < steps.length - 1 && <span aria-hidden className="text-ink-3">→</span>}
        </li>
      ))}
    </ol>
  );
}

export function WorkflowCard({
  workflow,
  name,
  short,
  locale,
  dict,
  index,
}: {
  workflow: WorkflowDef;
  name: string;
  short: string;
  locale: Locale;
  dict: Dict;
  index?: number;
}) {
  return (
    <Link
      href={`/${locale}/workflows/${workflow.slug}`}
      className="group flex h-full flex-col border-t border-line pt-4 transition hover:border-ink"
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-xs font-semibold tracking-[0.08em] text-ink-3 uppercase">
          {index != null && <span className="mr-2 tabular-nums">{String(index + 1).padStart(2, "0")}</span>}
          {dict.workflowCategories[workflow.category]}
        </span>
        <ArrowUpRight className="size-5 shrink-0 text-ink-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
      </div>
      <h3 className="mt-3 text-xl font-bold tracking-[-0.02em] text-ink">{name}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{short}</p>
      <WorkflowSteps steps={workflow.steps} dict={dict} className="mt-auto pt-5" />
    </Link>
  );
}
