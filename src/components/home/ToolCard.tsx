import { ChevronRight } from "lucide-react";
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
      <Link
        href={href}
        className="group card flex h-full items-center gap-3.5 p-3.5 pr-4 transition duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card-hover"
      >
        <ToolIcon icon={tool.icon} accent={tool.accent} size="sm" className="!size-11 !rounded-[0.9rem] [&>svg]:!size-[22px]" />
        <span className="min-w-0 flex-1">
          <span className="block truncate font-semibold tracking-[-0.01em] text-ink">{name}</span>
          <span className="line-clamp-1 block text-sm text-ink-3 sm:line-clamp-2">{short}</span>
        </span>
        <ChevronRight className="size-4 shrink-0 text-ink-3 transition group-hover:translate-x-0.5 group-hover:text-brand" />
      </Link>
    );
  }
  return (
    <Link
      href={href}
      className="group card relative flex h-full flex-col p-4 transition duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-card-hover sm:p-6"
    >
      <div className="flex items-start justify-between">
        <ToolIcon icon={tool.icon} accent={tool.accent} size="lg" className="max-sm:!size-12 max-sm:!rounded-2xl max-sm:[&>svg]:!size-6" />
        <span className="hidden size-9 place-items-center sm:grid rounded-full bg-muted text-brand transition group-hover:bg-brand group-hover:text-white">
          <ChevronRight className="size-[18px]" />
        </span>
      </div>
      <h3 className="mt-4 text-[1rem] font-bold tracking-[-0.015em] text-ink sm:mt-5 sm:text-[1.1rem]">{name}</h3>
      <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-2 sm:mt-1.5 sm:text-[0.92rem]">{short}</p>
    </Link>
  );
}
