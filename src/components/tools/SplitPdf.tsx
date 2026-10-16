"use client";

import { Check } from "lucide-react";
import { useMemo, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { FieldGroup, Notice, NumberInput, Segmented, TextInput, Toggle } from "@/components/workspace/controls";
import { PDF_LIMITS, useFileIntake, type IntakeConfig } from "@/components/workspace/intake";
import { useJob } from "@/components/workspace/job";
import { PageThumb, PdfStatus, usePdfItems } from "@/components/workspace/pdf";
import { ToolShell } from "@/components/workspace/ToolShell";
import { format } from "@/i18n/format";
import { ACCEPT, baseName, throwIfAborted } from "@/lib/files";
import { assemble, loadPdf, parseRanges, type PageRef } from "@/lib/pdf/ops";

type Mode = "ranges" | "select" | "every";
const groupColors = ["#4f7bff", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#06b6d4"];

export default function SplitPdf() {
  const { dict } = useI18n();
  const s = dict.split;
  const pdf = usePdfItems("split-pdf");
  const item = pdf.items[0];
  const pageCount = item?.pageCount ?? 0;
  const [mode, setMode] = useState<Mode>("ranges");
  // null = use the suggested default (two halves) for the current document.
  const [rangesInput, setRangesInput] = useState<string | null>(null);
  const [mergeRanges, setMergeRanges] = useState(false);
  const [every, setEvery] = useState<number | null>(1);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [selectOutput, setSelectOutput] = useState<"one" | "each">("one");
  const config: IntakeConfig = { tool: "split-pdf", kind: "pdf", accept: ACCEPT.pdf, multiple: false, ...PDF_LIMITS };
  const intake = useFileIntake(config, pdf.items.length, (files) => {
    pdf.add(files, true);
    setRangesInput(null);
    setSelected(new Set());
  });
  const job = useJob("split-pdf");


  const half = Math.ceil(pageCount / 2);
  const suggested =
    pageCount <= 1 ? "1" : half === 1 ? "1, 2" : `1-${half}, ${half + 1 === pageCount ? half + 1 : `${half + 1}-${pageCount}`}`;
  const ranges = rangesInput ?? suggested;
  const setRanges = (v: string) => setRangesInput(v);

  /** Output groups as zero-based page indices, or null when the input is invalid. */
  const groups = useMemo<number[][] | null>(() => {
    if (!pageCount) return null;
    if (mode === "ranges") {
      const parsed = parseRanges(ranges, pageCount);
      if (!parsed) return null;
      return mergeRanges ? [parsed.flat()] : parsed;
    }
    if (mode === "every") {
      const n = Math.max(1, every ?? 1);
      return Array.from({ length: Math.ceil(pageCount / n) }, (_, g) =>
        Array.from({ length: Math.min(n, pageCount - g * n) }, (_, i) => g * n + i),
      );
    }
    const pages = [...selected].sort((a, b) => a - b);
    if (!pages.length) return [];
    return selectOutput === "one" ? [pages] : pages.map((p) => [p]);
  }, [pageCount, mode, ranges, mergeRanges, every, selected, selectOutput]);

  const groupOf = useMemo(() => {
    const map = new Map<number, number>();
    groups?.forEach((g, gi) => g.forEach((p) => map.has(p) || map.set(p, gi)));
    return map;
  }, [groups]);

  const blocker = !item
    ? null
    : item.loading
      ? dict.workspace.preparing
      : item.error
        ? dict.errors[item.error]
        : groups === null
          ? format(dict.errors["invalid-range"], { max: pageCount })
          : !groups.length
            ? dict.errors["no-pages"]
            : null;

  const run = () => {
    if (!item || !groups) return;
    const name = baseName(item.file.name);
    void job.run(
      groups.length,
      async (ctx) => {
        const doc = await loadPdf(item.bytes ?? item.file);
        for (let g = 0; g < groups.length; g++) {
          throwIfAborted(ctx.signal);
          ctx.progress(g);
          const refs: PageRef[] = groups[g].map((index) => ({ kind: "page", source: 0, index, rotation: 0 }));
          const blob = await assemble([doc], refs);
          const first = groups[g][0] + 1;
          const last = groups[g][groups[g].length - 1] + 1;
          const label = groups[g].length === 1 ? `p${first}` : `p${first}-${last}`;
          ctx.output({ name: groups.length === 1 && mode === "select" ? `${name}-selected.pdf` : `${name}-${label}.pdf`, blob, kind: "pdf", pageCount: refs.length });
          ctx.progress(g + 1);
        }
      },
      { bytes: item.file.size },
    );
  };

  const toggle = (p: number) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(p)) next.delete(p);
      else next.add(p);
      return next;
    });

  return (
    <ToolShell
      slug="split-pdf"
      config={config}
      intake={intake}
      job={job}
      count={pdf.items.length}
      totalBytes={item?.file.size ?? 0}
      onClear={() => {
        pdf.clear();
        setSelected(new Set());
      }}
      actionLabel={s.action}
      onRun={run}
      blocker={blocker}
      doneTitle={s.done}
      files={
        item && (
          <div>
            <p className="mb-3 truncate text-sm text-ink-2">
              <span className="font-semibold text-ink">{item.file.name}</span> · <PdfStatus item={item} />
            </p>
            {mode === "select" && <p className="mb-3 text-xs text-ink-3">{s.selectHint}</p>}
            <ol className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: pageCount }, (_, p) => {
                const gi = groupOf.get(p);
                const isSel = mode === "select" ? selected.has(p) : gi !== undefined;
                const color = gi !== undefined ? groupColors[gi % groupColors.length] : undefined;
                const content = (
                  <>
                    <PageThumb doc={item.doc} page={p + 1} className="rounded-xl bg-sunken" dimmed={!isSel && mode !== "select"} />
                    <span className="mt-1 flex items-center justify-center gap-1 text-xs font-medium text-ink-2 tabular-nums">
                      {mode !== "select" && color && <span className="size-2 rounded-full" style={{ background: color }} />}
                      {p + 1}
                    </span>
                  </>
                );
                return (
                  <li key={p}>
                    {mode === "select" ? (
                      <button
                        type="button"
                        aria-pressed={isSel}
                        aria-label={format(dict.workspace.page, { n: p + 1 })}
                        onClick={() => toggle(p)}
                        className={`relative w-full rounded-2xl border-2 p-1 transition ${isSel ? "border-brand bg-brand/[.06]" : "border-transparent hover:border-line-strong"}`}
                      >
                        {content}
                        <span
                          className={`absolute top-2 right-2 grid size-6 place-items-center rounded-full border-2 transition ${
                            isSel ? "border-brand bg-brand text-white" : "border-line-strong bg-surface"
                          }`}
                        >
                          {isSel && <Check className="size-3.5" strokeWidth={3} />}
                        </span>
                      </button>
                    ) : (
                      <div className="rounded-2xl border-2 p-1" style={{ borderColor: color ? `${color}55` : "transparent" }}>
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        )
      }
      options={
        <>
          <FieldGroup label={s.mode}>
            <Segmented<Mode>
              label={s.mode}
              size="sm"
              value={mode}
              onChange={setMode}
              options={[
                { value: "ranges", label: s.modeRanges },
                { value: "select", label: s.modeSelect },
                { value: "every", label: s.modeEvery },
              ]}
            />
          </FieldGroup>
          {mode === "ranges" && (
            <>
              <TextInput label={s.ranges} value={ranges} onChange={setRanges} placeholder={s.rangesHint} />
              <p className="-mt-3 text-xs text-ink-3">{s.rangesHint}</p>
              <Toggle checked={mergeRanges} onChange={setMergeRanges} label={s.mergeRanges} />
            </>
          )}
          {mode === "every" && (
            <div className="grid grid-cols-[1fr_auto] items-end gap-3">
              <NumberInput label={s.every} value={every} onChange={setEvery} min={1} max={Math.max(1, pageCount)} />
              <span className="pb-3 text-sm text-ink-2">{s.everyUnit}</span>
            </div>
          )}
          {mode === "select" && (
            <>
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-semibold text-ink">{format(s.selectedCount, { count: selected.size })}</span>
                <span className="flex gap-1">
                  <button type="button" onClick={() => setSelected(new Set(Array.from({ length: pageCount }, (_, i) => i)))} className="rounded-full px-3 py-1.5 font-semibold text-brand hover:bg-brand/10">
                    {s.selectAll}
                  </button>
                  <button type="button" onClick={() => setSelected(new Set())} className="rounded-full px-3 py-1.5 font-semibold text-ink-3 hover:bg-muted">
                    {s.selectNone}
                  </button>
                </span>
              </div>
              <Segmented
                label={s.mode}
                columns={1}
                value={selectOutput}
                onChange={setSelectOutput}
                options={[
                  { value: "one", label: s.outputOne },
                  { value: "each", label: s.outputEach },
                ]}
              />
            </>
          )}
          {groups && groups.length > 0 && (
            <Notice tone="success">{groups.length === 1 ? s.willCreateOne : format(s.willCreate, { count: groups.length })}</Notice>
          )}
        </>
      }
    />
  );
}
