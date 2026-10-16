"use client";

import { ArrowRight, CircleAlert, Download, FileText, LoaderCircle, RotateCcw, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { ToolIcon } from "@/components/ui/ToolIcon";
import { format, formatBytes, formatPercent } from "@/i18n/format";
import { track } from "@/lib/analytics";
import { downloadBlob, zipBlobs } from "@/lib/download";
import { setHandoff } from "@/lib/handoff";
import { toolMap, type ToolSlug } from "@/lib/tools";
import type { Failure, Output } from "./job";

const continueTargets: Record<Output["kind"], ToolSlug[]> = {
  image: ["compress-image", "resize-image", "crop-image", "convert-image", "watermark-image", "rotate-image", "jpg-to-pdf"],
  pdf: ["merge-pdf", "split-pdf", "organize-pdf", "rotate-pdf", "pdf-to-jpg"],
};

function SuccessBadge() {
  return (
    <span className="relative grid size-16 place-items-center">
      <span className="absolute inset-0 animate-ping rounded-full bg-success/20 [animation-iteration-count:1]" />
      <svg viewBox="0 0 64 64" className="size-16" aria-hidden>
        <defs>
          <linearGradient id="ok" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#34d399" />
            <stop offset="1" stopColor="#16a34a" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#ok)" />
        <path
          d="M20 33l8 8 16-17"
          fill="none"
          stroke="#fff"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="40"
          strokeDashoffset="40"
          style={{ animation: "draw-check .5s .15s ease forwards" }}
        />
      </svg>
      <style>{"@keyframes draw-check{to{stroke-dashoffset:0}}"}</style>
    </span>
  );
}

export function ResultView({
  tool,
  title,
  outputs,
  failures,
  showSavings = false,
  zipName,
  onStartOver,
  onAdjust,
}: {
  tool: ToolSlug;
  title: string;
  outputs: Output[];
  failures: Failure[];
  showSavings?: boolean;
  zipName: string;
  onStartOver: () => void;
  onAdjust?: () => void;
}) {
  const { locale, dict, tools: names } = useI18n();
  const router = useRouter();
  const [zipping, setZipping] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const w = dict.workspace;

  // Bring the result into view; the page may have been scrolled down to the options.
  useEffect(() => {
    const el = rootRef.current;
    if (el && el.getBoundingClientRect().top < 80) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const before = outputs.reduce((s, o) => s + (o.originalSize ?? 0), 0);
  const after = outputs.reduce((s, o) => s + o.blob.size, 0);
  const saved = before - after;

  const downloadOne = (o: Output) => {
    downloadBlob(o.blob, o.name);
    track("download", { tool, kind: "single", count: 1 });
  };
  const downloadAll = async () => {
    if (outputs.length === 1) return downloadOne(outputs[0]);
    setZipping(true);
    try {
      const zip = await zipBlobs(outputs.map((o) => ({ name: o.name, blob: o.blob })));
      downloadBlob(zip, zipName);
      track("download", { tool, kind: "zip", count: outputs.length });
    } finally {
      setZipping(false);
    }
  };

  const kind = outputs[0]?.kind;
  const targets = kind
    ? continueTargets[kind].filter((t) => t !== tool && toolMap[t].workspace !== toolMap[tool].workspace).slice(0, 6)
    : [];
  const continueWith = (target: ToolSlug) => {
    const files = outputs.map((o) => new File([o.blob], o.name, { type: o.blob.type }));
    setHandoff(files, tool);
    track("continue_with", { tool, target, count: files.length });
    router.push(`/${locale}/${target}`);
  };

  if (!outputs.length) {
    return (
      <div ref={rootRef} className="card animate-pop-in scroll-mt-28 rounded-[1.75rem] p-6 text-center sm:p-10">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-danger-soft text-danger">
          <CircleAlert className="size-8" />
        </span>
        <h2 className="mt-5 text-2xl font-extrabold tracking-[-0.02em] text-ink">
          {failures.length === 1 ? w.failedOne : format(w.failed, { count: failures.length })}
        </h2>
        <ul className="mx-auto mt-4 grid max-w-lg gap-2 text-left">
          {failures.map((f, i) => (
            <li key={i} className="rounded-xl bg-danger-soft px-4 py-3 text-sm text-ink-2">
              {f.name && <span className="font-semibold text-ink">{f.name} — </span>}
              {format(dict.errors[f.code], f.vars)}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {onAdjust && (
            <button type="button" onClick={onAdjust} className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-5 font-semibold text-ink hover:bg-muted">
              <SlidersHorizontal className="size-4" />
              {w.adjust}
            </button>
          )}
          <button type="button" onClick={onStartOver} className="bg-brand-gradient inline-flex h-12 items-center gap-2 rounded-full px-6 font-semibold text-white shadow-button">
            <RotateCcw className="size-4" />
            {w.startOver}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="animate-pop-in scroll-mt-28">
      <div className="card overflow-hidden rounded-[1.75rem]">
        <div className="relative px-5 pt-8 pb-6 text-center sm:px-10 sm:pt-10">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(52,211,153,.18),transparent_70%)]" />
          <div className="relative flex justify-center">
            <SuccessBadge />
          </div>
          <h2 className="relative mt-4 text-[1.7rem] font-extrabold tracking-[-0.03em] text-ink sm:text-[2rem]" role="status">
            {title}
          </h2>
          <p className="relative mt-1 text-ink-2">
            {outputs.length === 1 ? w.resultsReadyOne : w.resultsReady}
            {showSavings && before > 0 && saved > 0 && (
              <>
                {" · "}
                <span className="font-semibold text-success">
                  {format(w.totalSaved, { size: formatBytes(saved, locale), percent: formatPercent(saved / before, locale) })}
                </span>
              </>
            )}
          </p>
          <div className="relative mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={downloadAll}
              disabled={zipping}
              className="bg-brand-gradient inline-flex h-14 flex-1 items-center justify-center gap-2.5 rounded-2xl px-7 text-[1.05rem] font-semibold text-white shadow-button transition hover:brightness-110 active:scale-[.99] disabled:opacity-70 sm:flex-none"
            >
              {zipping ? <LoaderCircle className="size-5 animate-spin" /> : <Download className="size-5" />}
              {zipping ? w.zipping : outputs.length > 1 ? w.downloadAll : w.download}
            </button>
          </div>
          <div className="relative mt-4 flex flex-wrap justify-center gap-2 text-sm">
            {onAdjust && (
              <button type="button" onClick={onAdjust} className="inline-flex h-10 items-center gap-1.5 rounded-full px-4 font-semibold text-ink-2 hover:bg-muted hover:text-ink">
                <SlidersHorizontal className="size-4" />
                {w.adjust}
              </button>
            )}
            <button type="button" onClick={onStartOver} className="inline-flex h-10 items-center gap-1.5 rounded-full px-4 font-semibold text-ink-2 hover:bg-muted hover:text-ink">
              <RotateCcw className="size-4" />
              {w.startOver}
            </button>
          </div>
        </div>

        <ul className="max-h-[520px] divide-y divide-line overflow-y-auto border-t border-line">
          {outputs.map((o) => {
            const ratio = o.originalSize ? 1 - o.blob.size / o.originalSize : 0;
            return (
              <li key={o.id} className="flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
                <span className="checkerboard grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-line">
                  {o.kind === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={o.url} alt="" className="size-full object-cover" />
                  ) : (
                    <span className="grid size-full place-items-center bg-[#ffe7e7] text-[#ec4b4b] dark:bg-[#4a1d26]">
                      <FileText className="size-6" />
                    </span>
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-ink" title={o.name}>
                    {o.name}
                  </p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-3">
                    {showSavings && o.originalSize ? (
                      <>
                        <span className="tabular-nums">
                          {formatBytes(o.originalSize, locale)} → <span className="font-semibold text-ink">{formatBytes(o.blob.size, locale)}</span>
                        </span>
                        {o.keptOriginal ? (
                          <span className="rounded-full bg-sunken px-2 py-0.5 text-xs font-medium text-ink-2">{w.larger}</span>
                        ) : ratio > 0 ? (
                          <span className="rounded-full bg-success-soft px-2 py-0.5 text-xs font-bold text-success">
                            −{formatPercent(ratio, locale)}
                          </span>
                        ) : null}
                      </>
                    ) : (
                      <span className="tabular-nums">{formatBytes(o.blob.size, locale)}</span>
                    )}
                    {o.width && o.height ? (
                      <span className="tabular-nums">· {format(w.dimensions, { width: o.width, height: o.height })}</span>
                    ) : null}
                    {o.pageCount ? (
                      <span>· {o.pageCount === 1 ? w.pageOne : format(w.pages, { count: o.pageCount })}</span>
                    ) : null}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => downloadOne(o)}
                  aria-label={format(w.downloadFile, { name: o.name })}
                  className="grid size-11 shrink-0 place-items-center rounded-full bg-brand/10 text-brand transition hover:bg-brand hover:text-white"
                >
                  <Download className="size-5" />
                </button>
              </li>
            );
          })}
        </ul>

        {failures.length > 0 && (
          <div className="border-t border-line bg-danger-soft/60 px-5 py-4 sm:px-6" role="alert">
            <p className="flex items-center gap-2 text-sm font-semibold text-danger">
              <CircleAlert className="size-4" />
              {failures.length === 1 ? w.failedOne : format(w.failed, { count: failures.length })}
            </p>
            <ul className="mt-2 grid gap-1 text-sm text-ink-2">
              {failures.map((f, i) => (
                <li key={i}>
                  {f.name && <span className="font-medium text-ink">{f.name} — </span>}
                  {format(dict.errors[f.code], f.vars)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {targets.length > 0 && (
          <div className="border-t border-line bg-muted/50 px-5 py-5 sm:px-6">
            <p className="text-sm font-semibold text-ink">{w.continueWith}</p>
            <p className="text-xs text-ink-3">{w.continueHint}</p>
            <ul className="mt-3 grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 lg:grid-cols-3">
              {targets.map((t) => (
                <li key={t}>
                  <button
                    type="button"
                    onClick={() => continueWith(t)}
                    className="group flex w-full items-center gap-3 rounded-2xl border border-line bg-surface p-2.5 pr-3 text-left transition hover:border-brand/40 hover:shadow-card"
                  >
                    <ToolIcon icon={toolMap[t].icon} accent={toolMap[t].accent} size="sm" />
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">{names[t].name}</span>
                    <ArrowRight className="size-4 shrink-0 text-ink-3 transition group-hover:translate-x-0.5 group-hover:text-brand" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <p className="mt-3 text-center text-xs text-ink-3">{w.keepWorking}</p>
    </div>
  );
}
