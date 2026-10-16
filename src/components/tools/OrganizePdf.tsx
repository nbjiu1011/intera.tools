"use client";

import { ChevronLeft, ChevronRight, FilePlus, RotateCw, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { Notice } from "@/components/workspace/controls";
import { AddMoreButton, PDF_LIMITS, useFileIntake, type IntakeConfig } from "@/components/workspace/intake";
import { useJob } from "@/components/workspace/job";
import { Grip, moveItem, PageThumb, usePdfItems, useSortable, type PdfItem } from "@/components/workspace/pdf";
import { ToolShell } from "@/components/workspace/ToolShell";
import { format } from "@/i18n/format";
import { ACCEPT, baseName, uid } from "@/lib/files";
import { assemble, loadPdf, type PageRef } from "@/lib/pdf/ops";

type Entry =
  | { key: string; kind: "page"; itemId: string; index: number; rotation: number }
  | { key: string; kind: "blank"; width: number; height: number; rotation: number };

const A4: [number, number] = [595.28, 841.89];
const sourceColors = ["#4f7bff", "#ec4899", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4"];

function pagesOf(item: PdfItem): Entry[] {
  return Array.from({ length: item.pageCount ?? 0 }, (_, index) => ({ key: uid("pg"), kind: "page", itemId: item.id, index, rotation: 0 }));
}

export default function OrganizePdf() {
  const { dict } = useI18n();
  const o = dict.organize;
  const pdf = usePdfItems("organize-pdf");
  const config: IntakeConfig = { tool: "organize-pdf", kind: "pdf", accept: ACCEPT.pdf, multiple: true, ...PDF_LIMITS };
  const intake = useFileIntake(config, pdf.items.length, (files) => pdf.add(files));
  const job = useJob("organize-pdf");
  const [entries, setEntries] = useState<Entry[]>([]);
  const appended = useRef(new Set<string>());

  // Append the pages of each newly loaded PDF.
  useEffect(() => {
    const ready = pdf.items.filter((i) => !i.loading && !i.error && !appended.current.has(i.id));
    if (!ready.length) return;
    ready.forEach((i) => appended.current.add(i.id));
    setEntries((list) => [...list, ...ready.flatMap(pagesOf)]);
  }, [pdf.items]);

  const onMove = useCallback((from: number, to: number) => setEntries((list) => moveItem(list, from, to)), []);
  const sortable = useSortable(onMove);
  const byId = new Map(pdf.items.map((i) => [i.id, i]));
  const validIds = pdf.items.filter((i) => !i.error).map((i) => i.id);
  const sourceIndex = (id: string) => Math.max(0, validIds.indexOf(id));

  const reset = () => setEntries(pdf.items.filter((i) => !i.error && !i.loading).flatMap(pagesOf));
  const clearAll = () => {
    pdf.clear();
    setEntries([]);
    appended.current.clear();
  };
  const update = (key: string, fn: (e: Entry) => Entry | null) =>
    setEntries((list) => list.flatMap((e) => (e.key === key ? (fn(e) ? [fn(e)!] : []) : [e])));
  const insertBlankAfter = (i: number) =>
    setEntries((list) => {
      const near = list[i] ?? list[i - 1];
      let size = A4;
      if (near?.kind === "page") size = byId.get(near.itemId)?.pageSize ?? A4;
      else if (near?.kind === "blank") size = [near.width, near.height];
      const next = list.slice();
      next.splice(i + 1, 0, { key: uid("blank"), kind: "blank", width: size[0], height: size[1], rotation: 0 });
      return next;
    });

  const loading = pdf.items.some((i) => i.loading);
  const errors = pdf.items.filter((i) => i.error);
  const blocker = loading ? dict.workspace.preparing : !entries.length ? o.noPages : null;

  const run = () =>
    job.run(
      1,
      async (ctx) => {
        const used = [...new Set(entries.flatMap((e) => (e.kind === "page" ? [e.itemId] : [])))];
        const docs = [];
        for (const id of used) {
          const item = byId.get(id)!;
          ctx.progress(0, item.file.name);
          docs.push(await loadPdf(item.bytes ?? item.file));
        }
        const refs: PageRef[] = entries.map((e) =>
          e.kind === "page"
            ? { kind: "page", source: used.indexOf(e.itemId), index: e.index, rotation: e.rotation }
            : { kind: "blank", width: e.width, height: e.height, rotation: e.rotation },
        );
        const blob = await assemble(docs, refs);
        const first = pdf.items.find((i) => !i.error);
        ctx.output({ name: `${first ? baseName(first.file.name) : "document"}-organized.pdf`, blob, kind: "pdf", pageCount: refs.length });
        ctx.progress(1);
      },
      { bytes: pdf.items.reduce((s, i) => s + i.file.size, 0) },
    );

  const iconBtn = "grid size-8 place-items-center rounded-lg text-ink-3 transition hover:bg-sunken hover:text-brand disabled:opacity-30";

  return (
    <ToolShell
      slug="organize-pdf"
      config={config}
      intake={intake}
      job={job}
      count={pdf.items.length}
      totalBytes={pdf.items.reduce((s, i) => s + i.file.size, 0)}
      onClear={clearAll}
      actionLabel={o.action}
      onRun={run}
      blocker={blocker}
      doneTitle={o.done}
      files={
        <div className="grid gap-3">
          {errors.map((i) => (
            <Notice key={i.id} tone="danger">
              <span className="font-semibold">{i.file.name}</span> — {dict.errors[i.error!]}
            </Notice>
          ))}
          {pdf.items.length > 1 && (
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-2">
              {pdf.items
                .filter((i) => !i.error)
                .map((i) => (
                  <li key={i.id} className="flex min-w-0 items-center gap-1.5">
                    <span
                      className="grid size-5 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white"
                      style={{ background: sourceColors[sourceIndex(i.id) % sourceColors.length] }}
                    >
                      {String.fromCharCode(65 + sourceIndex(i.id))}
                    </span>
                    <span className="truncate">{i.file.name}</span>
                  </li>
                ))}
            </ul>
          )}
          <ol className="grid grid-cols-2 gap-3 min-[480px]:grid-cols-3 sm:grid-cols-4 xl:grid-cols-5">
            {entries.map((e, index) => {
              const st = sortable.stateOf(index);
              const item = e.kind === "page" ? byId.get(e.itemId) : undefined;
              const multi = pdf.items.length > 1;
              return (
                <li
                  key={e.key}
                  {...sortable.itemProps(index)}
                  className={`group relative rounded-2xl border bg-surface p-1.5 shadow-[0_6px_18px_-14px_rgba(30,40,100,.45)] transition select-none ${
                    st.dragging ? "scale-95 opacity-40" : ""
                  } ${st.target ? "border-brand ring-4 ring-brand/15" : "border-line"} ${sortable.active ? "" : "cursor-grab"}`}
                >
                  {multi && item && (
                    <span
                      title={format(o.fromFile, { name: item.file.name })}
                      className="absolute top-3 left-3 z-10 grid size-6 place-items-center rounded-full text-[11px] font-bold text-white shadow"
                      style={{ background: sourceColors[sourceIndex(item.id) % sourceColors.length] }}
                    >
                      {String.fromCharCode(65 + sourceIndex(item.id))}
                    </span>
                  )}
                  {e.kind === "page" ? (
                    <PageThumb doc={item?.doc} page={e.index + 1} rotation={e.rotation} className="rounded-xl bg-sunken" />
                  ) : (
                    <div className="grid aspect-square place-items-center rounded-xl bg-sunken">
                      <div
                        className="grid w-[62%] place-items-center bg-white text-[10px] text-ink-3 shadow ring-1 ring-black/5 transition-transform"
                        style={{ aspectRatio: `${e.width} / ${e.height}`, transform: `rotate(${e.rotation}deg)` }}
                      >
                        {o.blank}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-0.5 pt-1">
                    <Grip label={o.hint} />
                    <span className="min-w-0 flex-1 truncate text-center text-xs font-semibold text-ink-2 tabular-nums">{index + 1}</span>
                    <button type="button" className={iconBtn} title={o.rotatePage} aria-label={`${o.rotatePage} ${index + 1}`} onClick={() => update(e.key, (x) => ({ ...x, rotation: (x.rotation + 90) % 360 }))}>
                      <RotateCw className="size-4" />
                    </button>
                    <button type="button" className={`${iconBtn} hover:!text-danger`} title={o.deletePage} aria-label={`${o.deletePage} ${index + 1}`} onClick={() => update(e.key, () => null)}>
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <div className="mt-1 flex items-center justify-between border-t border-line pt-1">
                    <button type="button" className={iconBtn} disabled={index === 0} aria-label={`${o.moveLeft} ${index + 1}`} onClick={() => onMove(index, index - 1)}>
                      <ChevronLeft className="size-4" />
                    </button>
                    <button type="button" className={`${iconBtn} w-auto px-2 text-[11px] font-semibold`} title={o.insertBlank} aria-label={`${o.insertBlank} (${index + 1})`} onClick={() => insertBlankAfter(index)}>
                      <FilePlus className="size-3.5" />
                    </button>
                    <button type="button" className={iconBtn} disabled={index === entries.length - 1} aria-label={`${o.moveRight} ${index + 1}`} onClick={() => onMove(index, index + 1)}>
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </li>
              );
            })}
            <li>
              <AddMoreButton config={config} onFiles={(f) => intake.add(f, "pick")} variant="tile" label={o.addPdf} />
            </li>
          </ol>
        </div>
      }
      options={
        <>
          <p className="rounded-2xl bg-sunken px-4 py-3 text-sm font-semibold text-ink">{format(o.pagesLeft, { count: entries.length })}</p>
          <div className="grid gap-2">
            <button type="button" onClick={() => insertBlankAfter(entries.length - 1)} className="flex h-11 items-center justify-center gap-2 rounded-xl border border-line text-sm font-semibold text-ink-2 transition hover:border-brand hover:text-brand">
              <FilePlus className="size-4" />
              {o.insertBlank}
            </button>
            <button type="button" onClick={reset} className="h-10 rounded-full text-sm font-semibold text-ink-3 hover:bg-muted hover:text-ink">
              {o.reset}
            </button>
          </div>
          <Notice>{o.hint}</Notice>
        </>
      }
    />
  );
}
