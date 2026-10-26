import { ArrowRight, Info, Lightbulb, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { ToolIcon } from "@/components/ui/ToolIcon";
import type { GuideBlock } from "@/content/types";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import { toolMap, type ToolSlug } from "@/lib/tools";
import { workflowMap, type WorkflowSlug } from "@/lib/workflows";

/** Renders **bold**, `code` and [label](/path) inside guide text. Internal paths get the locale. */
export function Inline({ text, locale }: { text: string; locale: Locale }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) return <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>;
        if (part.startsWith("`") && part.endsWith("`"))
          return (
            <code key={i} className="rounded bg-sunken px-1.5 py-0.5 font-mono text-[0.88em] text-ink">
              {part.slice(1, -1)}
            </code>
          );
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          const [, label, href] = link;
          if (/^https?:\/\//.test(href))
            return (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-brand underline underline-offset-[3px]">
                {label}
              </a>
            );
          return (
            <Link key={i} href={`/${locale}${href === "/" ? "" : href}`} className="font-medium text-brand underline underline-offset-[3px]">
              {label}
            </Link>
          );
        }
        return part;
      })}
    </>
  );
}

/** Stable id for an h2, used by the table of contents. */
export function headingId(text: string, index: number) {
  return `s${index + 1}`;
}

function Cta({
  href,
  icon,
  kicker,
  title,
  text,
  action,
}: {
  href: string;
  icon: React.ReactNode;
  kicker: string;
  title: string;
  text: string;
  action: string;
}) {
  return (
    <Link href={href} className="group my-8 flex items-start gap-4 rounded-xl border border-ink p-5 transition hover:bg-muted">
      {icon}
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-semibold tracking-[0.08em] text-ink-3 uppercase">{kicker}</span>
        <span className="mt-0.5 block font-bold text-ink">{title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-ink-2">{text}</span>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand">
          {action}
          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </span>
      </span>
    </Link>
  );
}

export function GuideBody({
  blocks,
  locale,
  dict,
  toolNames,
  workflowNames,
}: {
  blocks: GuideBlock[];
  locale: Locale;
  dict: Dict;
  toolNames: Record<ToolSlug, { name: string }>;
  workflowNames: Record<WorkflowSlug, { name: string }>;
}) {
  let h2Index = -1;
  return (
    <div className="guide-body">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            h2Index++;
            return (
              <h2 key={i} id={headingId(b.text, h2Index)} className="mt-12 scroll-mt-24 border-t border-line pt-6 text-[1.5rem] leading-tight font-bold tracking-[-0.025em] text-ink">
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-8 text-lg font-bold text-ink">
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="mt-4 leading-[1.85] text-ink-2">
                <Inline text={b.text} locale={locale} />
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="mt-4 grid gap-2 pl-5 leading-[1.8] text-ink-2 [&>li]:list-disc [&>li]:marker:text-ink-3">
                {b.items.map((item, j) => (
                  <li key={j}>
                    <Inline text={item} locale={locale} />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mt-4 grid gap-2 pl-5 leading-[1.8] text-ink-2 [&>li]:list-decimal [&>li]:marker:font-semibold [&>li]:marker:text-ink">
                {b.items.map((item, j) => (
                  <li key={j}>
                    <Inline text={item} locale={locale} />
                  </li>
                ))}
              </ol>
            );
          case "steps":
            return (
              <ol key={i} className="mt-6 grid gap-0 border-t border-line">
                {b.items.map((s, j) => (
                  <li key={j} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-line py-4">
                    <span className="text-sm font-bold text-brand tabular-nums">{String(j + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="font-semibold text-ink">
                        <Inline text={s.title} locale={locale} />
                      </p>
                      <p className="mt-1 leading-relaxed text-ink-2">
                        <Inline text={s.body} locale={locale} />
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <figure key={i} className="mt-6">
                <div className="overflow-x-auto rounded-lg border border-line">
                  <table className="w-full min-w-[480px] text-left text-sm">
                    <thead className="bg-muted">
                      <tr>
                        {b.head.map((h, j) => (
                          <th key={j} scope="col" className="px-4 py-2.5 font-semibold text-ink">
                            <Inline text={h} locale={locale} />
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {b.rows.map((row, r) => (
                        <tr key={r}>
                          {row.map((cell, c) => (
                            <td key={c} className={`px-4 py-2.5 align-top text-ink-2 ${c === 0 ? "font-medium text-ink" : ""}`}>
                              <Inline text={cell} locale={locale} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {b.caption && <figcaption className="mt-2 text-xs leading-relaxed text-ink-3">{b.caption}</figcaption>}
              </figure>
            );
          case "note": {
            const Icon = b.tone === "warning" ? TriangleAlert : b.tone === "tip" ? Lightbulb : Info;
            const tone = b.tone === "warning" ? "border-warning/40 bg-warning-soft" : b.tone === "tip" ? "border-success/30 bg-success-soft" : "border-line bg-muted";
            return (
              <aside key={i} className={`mt-6 flex gap-3 rounded-lg border p-4 ${tone}`}>
                <Icon className={`mt-0.5 size-5 shrink-0 ${b.tone === "warning" ? "text-warning" : b.tone === "tip" ? "text-success" : "text-ink-2"}`} />
                <div className="text-[0.95rem] leading-relaxed text-ink-2">
                  {b.title && <p className="font-semibold text-ink">{b.title}</p>}
                  <p className={b.title ? "mt-1" : ""}>
                    <Inline text={b.text} locale={locale} />
                  </p>
                </div>
              </aside>
            );
          }
          case "tool": {
            const t = toolMap[b.slug];
            return (
              <Cta
                key={i}
                href={`/${locale}/${b.slug}`}
                icon={<ToolIcon icon={t.icon} accent={t.accent} size="md" className="!size-12 [&>svg]:!size-6" />}
                kicker={dict.home.resultTool}
                title={toolNames[b.slug].name}
                text={b.text}
                action={dict.guidesPage.tryTool}
              />
            );
          }
          case "workflow":
            return (
              <Cta
                key={i}
                href={`/${locale}/workflows/${b.slug}`}
                icon={
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line bg-muted text-sm font-bold text-ink">
                    {workflowMap[b.slug].steps.length}
                  </span>
                }
                kicker={dict.home.resultWorkflow}
                title={workflowNames[b.slug].name}
                text={b.text}
                action={dict.guidesPage.tryWorkflow}
              />
            );
        }
      })}
    </div>
  );
}
