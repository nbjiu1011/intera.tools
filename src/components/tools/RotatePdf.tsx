"use client";

import { RotateCcw, RotateCw } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { Notice } from "@/components/workspace/controls";
import { PDF_LIMITS, useFileIntake, type IntakeConfig } from "@/components/workspace/intake";
import { useJob } from "@/components/workspace/job";
import { PageThumb, PdfStatus, usePdfItems } from "@/components/workspace/pdf";
import { ToolShell } from "@/components/workspace/ToolShell";
import { format } from "@/i18n/format";
import { ACCEPT, baseName } from "@/lib/files";
import { assemble, loadPdf, type PageRef } from "@/lib/pdf/ops";

export default function RotatePdf() {
  const { dict } = useI18n();
  const r = dict.rotatePdf;
  const pdf = usePdfItems("rotate-pdf");
  const item = pdf.items[0];
  const pageCount = item?.pageCount ?? 0;
  const [rotations, setRotations] = useState<Record<number, number>>({});
  const config: IntakeConfig = { tool: "rotate-pdf", kind: "pdf", accept: ACCEPT.pdf, multiple: false, ...PDF_LIMITS };
  const intake = useFileIntake(config, pdf.items.length, (files) => {
    pdf.add(files, true);
    setRotations({});
  });
  const job = useJob("rotate-pdf");
  const rot = (p: number) => rotations[p] ?? 0;
  const turn = (p: number, delta: number) => setRotations((m) => ({ ...m, [p]: (((m[p] ?? 0) + delta) % 360 + 360) % 360 }));
  const turnAll = (delta: number) =>
    setRotations((m) => Object.fromEntries(Array.from({ length: pageCount }, (_, p) => [p, (((m[p] ?? 0) + delta) % 360 + 360) % 360])));
  const changed = Object.values(rotations).some((v) => v % 360 !== 0);

  const blocker = !item ? null : item.loading ? dict.workspace.preparing : item.error ? dict.errors[item.error] : !changed ? r.noChanges : null;

  const run = () => {
    if (!item) return;
    void job.run(
      1,
      async (ctx) => {
        ctx.progress(0, item.file.name);
        const doc = await loadPdf(item.bytes ?? item.file);
        const refs: PageRef[] = doc.getPageIndices().map((index) => ({ kind: "page", source: 0, index, rotation: rot(index) }));
        const blob = await assemble([doc], refs);
        ctx.output({ name: `${baseName(item.file.name)}-rotated.pdf`, blob, kind: "pdf", pageCount: refs.length });
        ctx.progress(1);
      },
      { bytes: item.file.size },
    );
  };

  return (
    <ToolShell
      slug="rotate-pdf"
      config={config}
      intake={intake}
      job={job}
      count={pdf.items.length}
      totalBytes={item?.file.size ?? 0}
      onClear={() => {
        pdf.clear();
        setRotations({});
      }}
      actionLabel={r.action}
      onRun={run}
      blocker={blocker}
      doneTitle={r.done}
      files={
        item && (
          <div>
            <p className="mb-3 truncate text-sm text-ink-2">
              <span className="font-semibold text-ink">{item.file.name}</span> · <PdfStatus item={item} />
            </p>
            <ol className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: pageCount }, (_, p) => (
                <li key={p} className="group relative">
                  <button
                    type="button"
                    onClick={() => turn(p, 90)}
                    aria-label={`${format(r.rotatePage, { n: p + 1 })} (${rot(p)}°)`}
                    className={`relative w-full rounded-2xl border-2 p-1 transition ${rot(p) ? "border-brand/50 bg-brand/[.05]" : "border-transparent hover:border-line-strong"}`}
                  >
                    <PageThumb doc={item.doc} page={p + 1} rotation={rot(p)} className="rounded-xl bg-sunken" />
                    <span className="mt-1 block text-center text-xs font-medium text-ink-2 tabular-nums">
                      {p + 1}
                      {rot(p) ? <span className="ml-1 text-brand">· {rot(p)}°</span> : null}
                    </span>
                    <span className="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-surface text-ink-2 shadow transition group-hover:bg-brand group-hover:text-white">
                      <RotateCw className="size-3.5" />
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )
      }
      options={
        <>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => turnAll(-90)} className="flex h-12 items-center justify-center gap-2 rounded-xl border border-line text-sm font-semibold text-ink-2 transition hover:border-brand hover:text-brand">
              <RotateCcw className="size-4" />
              {r.allLeft}
            </button>
            <button type="button" onClick={() => turnAll(90)} className="flex h-12 items-center justify-center gap-2 rounded-xl border border-line text-sm font-semibold text-ink-2 transition hover:border-brand hover:text-brand">
              <RotateCw className="size-4" />
              {r.allRight}
            </button>
          </div>
          <button type="button" onClick={() => setRotations({})} disabled={!changed} className="h-10 rounded-full text-sm font-semibold text-ink-3 hover:bg-muted hover:text-ink disabled:opacity-40">
            {r.reset}
          </button>
          <Notice>{r.hint}</Notice>
        </>
      }
    />
  );
}
