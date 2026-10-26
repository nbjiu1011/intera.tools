"use client";

import { ArrowDownAZ, ChevronLeft, ChevronRight, FileWarning, X } from "lucide-react";
import { useCallback } from "react";
import { useI18n } from "@/components/I18nProvider";
import { Notice } from "@/components/workspace/controls";
import { AddMoreButton, PDF_LIMITS, useFileIntake, type IntakeConfig } from "@/components/workspace/intake";
import { useJob } from "@/components/workspace/job";
import { Grip, moveItem, PageThumb, PdfStatus, usePdfItems, useSortable } from "@/components/workspace/pdf";
import { ToolShell } from "@/components/workspace/ToolShell";
import { format, formatBytes } from "@/i18n/format";
import { ACCEPT, throwIfAborted } from "@/lib/files";
import { allPages, assemble, loadPdf } from "@/lib/pdf/ops";

export default function MergePdf() {
  const { locale, dict } = useI18n();
  const m = dict.merge;
  const pdf = usePdfItems("merge-pdf");
  const { items, setItems } = pdf;
  const config: IntakeConfig = { tool: "merge-pdf", kind: "pdf", accept: ACCEPT.pdf, multiple: true, ...PDF_LIMITS };
  const intake = useFileIntake(config, items.length, (files) => pdf.add(files));
  const job = useJob("merge-pdf");
  const onMove = useCallback((from: number, to: number) => setItems((list) => moveItem(list, from, to)), [setItems]);
  const sortable = useSortable(onMove);

  const valid = items.filter((i) => !i.error);
  const loading = items.some((i) => i.loading);
  const blocker = loading ? dict.workspace.preparing : valid.length < 2 ? dict.errors["need-two"] : null;

  const run = () =>
    job.run(
      valid.length + 1,
      async (ctx) => {
        const docs = [];
        for (let i = 0; i < valid.length; i++) {
          throwIfAborted(ctx.signal);
          ctx.progress(i, valid[i].file.name);
          docs.push(await loadPdf(valid[i].bytes ?? valid[i].file));
        }
        ctx.progress(valid.length, m.action);
        const refs = docs.flatMap((doc, source) => allPages(doc, source));
        const blob = await assemble(docs, refs);
        ctx.output({ name: `merged-${valid.length}-files.pdf`, blob, kind: "pdf", pageCount: refs.length });
        ctx.progress(valid.length + 1);
      },
      { bytes: valid.reduce((s, i) => s + i.file.size, 0) },
    );

  return (
    <ToolShell
      slug="merge-pdf"
      config={config}
      intake={intake}
      job={job}
      count={items.length}
      totalBytes={items.reduce((s, i) => s + i.file.size, 0)}
      onClear={pdf.clear}
      actionLabel={m.action}
      onRun={run}
      blocker={blocker}
      doneTitle={m.done}
      files={
        <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
          {items.map((item, index) => {
            const st = sortable.stateOf(index);
            return (
              <li
                key={item.id}
                {...sortable.itemProps(index)}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-surface shadow-[0_6px_20px_-14px_rgba(30,40,100,.4)] transition select-none ${
                  st.dragging ? "scale-95 opacity-40" : ""
                } ${st.target ? "border-brand ring-4 ring-brand/15" : "border-line"} ${item.error ? "border-danger/40" : ""} ${
                  sortable.active ? "" : "cursor-grab"
                }`}
              >
                <span className="bg-brand-gradient absolute top-2 left-2 z-10 grid size-7 place-items-center rounded-full text-xs font-bold shadow">
                  {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => pdf.remove(item.id)}
                  aria-label={format(dict.workspace.remove, { name: item.file.name })}
                  className="absolute top-2 right-2 z-10 grid size-8 place-items-center rounded-full bg-[#0c1226]/60 text-white backdrop-blur transition hover:bg-danger sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
                >
                  <X className="size-4" />
                </button>
                {item.error ? (
                  <div className="grid aspect-square place-items-center bg-danger-soft text-danger">
                    <FileWarning className="size-8" />
                  </div>
                ) : (
                  <PageThumb doc={item.doc} page={1} className="bg-sunken" />
                )}
                <div className="flex items-start gap-1 px-2.5 py-2.5">
                  <Grip label={m.dragHint} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink" title={item.file.name}>
                      {item.file.name}
                    </p>
                    <p className="text-xs text-ink-3">
                      <PdfStatus item={item} /> · {formatBytes(item.file.size, locale)}
                    </p>
                  </div>
                </div>
                <div className="flex border-t border-line">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => onMove(index, index - 1)}
                    aria-label={`${m.moveUp} — ${item.file.name}`}
                    className="grid h-9 flex-1 place-items-center text-ink-3 transition hover:bg-sunken hover:text-brand disabled:opacity-30"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === items.length - 1}
                    onClick={() => onMove(index, index + 1)}
                    aria-label={`${m.moveDown} — ${item.file.name}`}
                    className="grid h-9 flex-1 place-items-center border-l border-line text-ink-3 transition hover:bg-sunken hover:text-brand disabled:opacity-30"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </li>
            );
          })}
          <li>
            <AddMoreButton config={config} onFiles={(f) => intake.add(f, "pick")} variant="tile" />
          </li>
        </ol>
      }
      options={
        <>
          <div className="grid gap-2">
            <span className="text-sm font-semibold text-ink">{m.order}</span>
            <ol className="grid gap-1 rounded-2xl bg-sunken p-2 text-sm">
              {items.map((item, i) => (
                <li key={item.id} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${item.error ? "text-danger line-through" : "text-ink-2"}`}>
                  <span className="w-5 text-right text-xs font-semibold text-ink-3 tabular-nums">{i + 1}</span>
                  <span className="truncate">{item.file.name}</span>
                </li>
              ))}
            </ol>
          </div>
          <button
            type="button"
            onClick={() => setItems((list) => [...list].sort((a, b) => a.file.name.localeCompare(b.file.name, locale, { numeric: true })))}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-line text-sm font-semibold text-ink-2 transition hover:border-brand hover:text-brand"
          >
            <ArrowDownAZ className="size-4" />
            {m.sortAZ}
          </button>
          <Notice>{m.dragHint}</Notice>
        </>
      }
    />
  );
}
