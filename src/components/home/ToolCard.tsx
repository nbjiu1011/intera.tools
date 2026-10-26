import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ToolIcon } from "@/components/ui/ToolIcon";
import type { ToolDef } from "@/lib/tools";

export function ToolCard({
  tool,
  name,
  short,
  href,
  variant = "default",
}: {
  tool: ToolDef;
  name: string;
  short: string;
  href: string;
  variant?: "default" | "compact";
}) {
  if (variant === "compact") {
    return (
      <Link href={href} className="group flex h-full items-center gap-3 rounded-lg border border-line p-3 transition hover:border-ink">
        <ToolIcon icon={tool.icon} accent={tool.accent} size="sm" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-ink">{name}</span>
          <span className="line-clamp-1 block text-xs text-ink-3">{short}</span>
        </span>
        <ChevronRight className="size-4 shrink-0 text-ink-3 transition group-hover:translate-x-0.5 group-hover:text-ink" />
      </Link>
    );
  }
  return (
    <Link href={href} className="group flex h-full flex-col rounded-lg border border-line p-5 transition hover:border-ink">
      <div className="flex items-start justify-between">
        <ToolIcon icon={tool.icon} accent={tool.accent} size="md" className="!size-11 [&>svg]:!size-[22px]" />
        <ArrowUpRight className="size-5 text-ink-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
      </div>
      <h3 className="mt-5 font-bold tracking-[-0.015em] text-ink">{name}</h3>
      <p className="mt-1 text-sm leading-relaxed text-ink-2">{short}</p>
    </Link>
  );
}
