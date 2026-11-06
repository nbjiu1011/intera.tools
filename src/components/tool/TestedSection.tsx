import { FlaskConical } from "lucide-react";
import { Inline } from "@/components/guides/GuideBody";
import type { TestedResult } from "@/content/types";
import type { Locale } from "@/i18n/config";

/** "We tested it" block: our own measurements with the tool, plus how they were made. */
export function TestedSection({ tested, locale }: { tested: TestedResult; locale: Locale }) {
  return (
    <section aria-labelledby="tested" className="mt-20">
      <div className="grid gap-3 border-t-2 border-ink pt-4 md:grid-cols-12 md:gap-6">
        <p className="flex items-start gap-2 pt-1 text-sm font-semibold text-ink md:col-span-2">
          <FlaskConical className="size-4" />
        </p>
        <div className="md:col-span-9">
          <h2 id="tested" className="text-[1.75rem] leading-[1.1] font-bold tracking-[-0.03em] text-ink sm:text-[2.25rem]">
            {tested.title}
          </h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-ink-2">
            <Inline text={tested.intro} locale={locale} />
          </p>
        </div>
      </div>
      <figure className="mt-6">
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-muted">
              <tr>
                {tested.head.map((h, i) => (
                  <th key={i} scope="col" className={`px-4 py-2.5 font-semibold text-ink ${i ? "text-right" : ""}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {tested.rows.map((row, r) => (
                <tr key={r} className={r === tested.rows.length - 1 ? "bg-muted/50 font-semibold" : ""}>
                  {row.map((cell, c) => (
                    <td key={c} className={`px-4 py-2.5 align-top ${c ? "text-right text-ink-2 tabular-nums" : "text-ink"}`}>
                      <Inline text={cell} locale={locale} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <figcaption className="mt-3 max-w-4xl text-xs leading-relaxed text-ink-3">
          <Inline text={tested.note} locale={locale} />
        </figcaption>
      </figure>
    </section>
  );
}
