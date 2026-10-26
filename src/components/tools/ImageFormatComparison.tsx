"use client";

import { Download, LoaderCircle, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { FieldGroup, Notice, Segmented, Slider } from "@/components/workspace/controls";
import { Dropzone, IMAGE_LIMITS, RejectionNotice, useFileIntake, type IntakeConfig } from "@/components/workspace/intake";
import { format, formatBytes, formatPercent } from "@/i18n/format";
import { track } from "@/lib/analytics";
import { downloadBlob } from "@/lib/download";
import { toToolError } from "@/lib/errors";
import { ACCEPT, baseName } from "@/lib/files";
import { compareFormats, type Comparison, type VariantId } from "@/lib/image/compare";

const SLUG = "image-format-comparison";
const ext: Record<VariantId, string> = { png: "png", png8: "png", webp: "webp", jpg: "jpg" };
const widths = [0, 1920, 1280, 800];

type Source = { file: File; url: string };
type Shown = { id: VariantId; url: string; size: number };

export default function ImageFormatComparison() {
  const { locale, dict } = useI18n();
  const c = dict.compare;
  const [source, setSource] = useState<Source | null>(null);
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState(0);
  const [result, setResult] = useState<(Comparison & { shown: Shown[] }) | null>(null);
  const [busy, setBusy] = useState<VariantId | "start" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [left, setLeft] = useState<"original" | VariantId>("original");
  const [right, setRight] = useState<"original" | VariantId>("jpg");
  const [split, setSplit] = useState(50);
  const [zoom, setZoom] = useState<"fit" | "actual">("fit");
  const run = useRef(0);

  const config: IntakeConfig = { tool: SLUG, kind: "image", accept: ACCEPT.anyImage, multiple: false, ...IMAGE_LIMITS };
  const intake = useFileIntake(config, source ? 1 : 0, ([file]) => {
    setSource((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return { file, url: URL.createObjectURL(file) };
    });
  });

  // Re-encode whenever the image or the settings change (debounced while dragging the slider).
  useEffect(() => {
    if (!source) return;
    const id = ++run.current;
    const timer = setTimeout(async () => {
      setBusy("start");
      setError(null);
      const started = performance.now();
      track("process_start", { tool: SLUG, count: 1, bytes: source.file.size });
      try {
        const r = await compareFormats(source.file, { quality: quality / 100, maxWidth: maxWidth || null }, (step) => id === run.current && setBusy(step));
        if (id !== run.current) return;
        const shown = r.variants
          .filter((v) => v.blob)
          .map((v) => ({ id: v.id, url: URL.createObjectURL(v.blob!), size: v.blob!.size }));
        setResult((prev) => {
          prev?.shown.forEach((s) => URL.revokeObjectURL(s.url));
          return { ...r, shown };
        });
        track("process_success", { tool: SLUG, count: shown.length, durationMs: Math.round(performance.now() - started) });
      } catch (e) {
        if (id !== run.current) return;
        const te = toToolError(e);
        setError(format(dict.errors[te.code], te.vars));
        track("process_error", { tool: SLUG, code: te.code });
      } finally {
        if (id === run.current) setBusy(null);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [source, quality, maxWidth, dict.errors]);

  useEffect(
    () => () => {
      if (source) URL.revokeObjectURL(source.url);
    },
    [source],
  );

  const reset = () => {
    run.current++;
    result?.shown.forEach((s) => URL.revokeObjectURL(s.url));
    setResult(null);
    setSource(null);
    setError(null);
    intake.clearRejections();
  };

  if (!source) {
    return (
      <>
        {intake.rejections.length > 0 && (
          <div className="mb-4">
            <RejectionNotice rejections={intake.rejections} onDismiss={intake.clearRejections} />
          </div>
        )}
        <Dropzone config={config} onFiles={(f, src) => intake.add(f, src)} />
      </>
    );
  }

  const label = (id: "original" | VariantId) =>
    id === "original" ? c.original : id === "png" ? c.pngLossless : id === "png8" ? c.png8 : id === "webp" ? "WebP" : "JPG";
  const urlOf = (id: "original" | VariantId) => (id === "original" ? source.url : result?.shown.find((s) => s.id === id)?.url);
  const smallest = result?.shown.reduce<Shown | null>((min, s) => (!min || s.size < min.size ? s : min), null);
  const choices = ["original" as const, ...(result?.shown.map((s) => s.id) ?? [])];

  const download = (s: Shown) => {
    const blob = result?.variants.find((v) => v.id === s.id)?.blob;
    if (!blob) return;
    downloadBlob(blob, `${baseName(source.file.name)}${s.id === "png8" ? "-png8" : ""}.${ext[s.id]}`);
    track("download", { tool: SLUG, kind: s.id, count: 1 });
  };

  return (
    <div className="card overflow-hidden rounded-2xl">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px]">
        <section className="min-w-0 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="min-w-0 truncate text-sm text-ink-2">
              <span className="font-semibold text-ink">{source.file.name}</span>
              <span className="mx-2 text-ink-3">·</span>
              {formatBytes(source.file.size, locale)}
              {result && <span className="ml-2 text-ink-3 tabular-nums">· {format(dict.workspace.dimensions, { width: result.width, height: result.height })}</span>}
            </p>
            <button type="button" onClick={reset} className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-ink-2 hover:bg-muted hover:text-ink">
              <RotateCcw className="size-4" />
              {c.another}
            </button>
          </div>

          {error && (
            <div className="mt-4">
              <Notice tone="danger">{error}</Notice>
            </div>
          )}

          {/* Results table */}
          <div className="mt-4 overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-muted text-xs tracking-wide text-ink-3 uppercase">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">{c.format}</th>
                  <th className="px-4 py-2.5 text-right font-semibold">{c.size}</th>
                  <th className="px-4 py-2.5 text-right font-semibold">{c.vsOriginal}</th>
                  <th className="px-4 py-2.5 font-semibold">{c.transparency}</th>
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                <tr>
                  <td className="px-4 py-3 font-semibold text-ink">
                    {c.original} <span className="font-normal text-ink-3">({source.file.name.split(".").pop()?.toUpperCase()})</span>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatBytes(source.file.size, locale)}</td>
                  <td className="px-4 py-3 text-right text-ink-3">—</td>
                  <td className="px-4 py-3 text-ink-3">—</td>
                  <td />
                </tr>
                {(["jpg", "webp", "png8", "png"] as const).map((id) => {
                  const v = result?.variants.find((x) => x.id === id);
                  const s = result?.shown.find((x) => x.id === id);
                  const delta = s ? s.size / source.file.size - 1 : 0;
                  return (
                    <tr key={id} className={busy ? "opacity-60" : ""}>
                      <td className="px-4 py-3 font-semibold text-ink">
                        {label(id)}
                        {smallest && s && smallest.id === id && (
                          <span className="ml-2 rounded bg-success-soft px-1.5 py-0.5 text-[11px] font-bold text-success">{c.smallest}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold tabular-nums">
                        {v?.unsupported ? <span className="font-normal text-ink-3">{c.unsupported}</span> : s ? formatBytes(s.size, locale) : busy === id ? <LoaderCircle className="ml-auto size-4 animate-spin" /> : "…"}
                      </td>
                      <td className={`px-4 py-3 text-right tabular-nums ${delta < 0 ? "text-success" : "text-ink-2"}`}>
                        {s ? `${delta < 0 ? "−" : "+"}${formatPercent(Math.abs(delta), locale)}` : ""}
                      </td>
                      <td className="px-4 py-3 text-ink-2">{!result ? "" : !result.hasAlpha ? c.none : v?.alpha ? c.kept : c.lost}</td>
                      <td className="px-2 py-2 text-right">
                        {s && (
                          <button
                            type="button"
                            onClick={() => download(s)}
                            aria-label={format(c.download, { format: label(id) })}
                            className="grid size-9 place-items-center rounded-lg text-brand hover:bg-brand-soft"
                          >
                            <Download className="size-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {result && <p className="mt-2 text-xs text-ink-3">{result.hasAlpha ? c.hasAlpha : c.noAlpha}</p>}

          {/* Visual comparison */}
          {result && (
            <div className="mt-6">
              <div className="flex flex-wrap items-end gap-3">
                {(
                  [
                    [c.left, left, setLeft],
                    [c.right, right, setRight],
                  ] as const
                ).map(([name, value, set]) => (
                  <label key={name} className="grid gap-1 text-xs font-semibold text-ink-2">
                    {name}
                    <select
                      value={value}
                      onChange={(e) => set(e.target.value as "original" | VariantId)}
                      className="h-9 rounded-lg border border-line bg-surface px-2 text-sm text-ink"
                    >
                      {choices.map((id) => (
                        <option key={id} value={id}>
                          {label(id)}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
                <div className="ml-auto w-40">
                  <Segmented
                    label={c.zoom}
                    size="sm"
                    value={zoom}
                    onChange={setZoom}
                    options={[
                      { value: "fit", label: c.fit },
                      { value: "actual", label: c.actual },
                    ]}
                  />
                </div>
              </div>
              <div className={`checkerboard relative mt-3 overflow-auto rounded-xl border border-line ${zoom === "fit" ? "" : "max-h-[560px]"}`}>
                <div className="relative w-fit min-w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={urlOf(right)} alt={label(right)} className={`block ${zoom === "fit" ? "h-auto w-full" : "max-w-none"}`} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={urlOf(left)}
                    alt={label(left)}
                    className={`absolute inset-0 block ${zoom === "fit" ? "h-full w-full object-contain" : "max-w-none"}`}
                    style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
                  />
                  <span aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-white mix-blend-difference" style={{ left: `${split}%` }} />
                  <span className="absolute top-2 left-2 rounded bg-ink/75 px-1.5 py-0.5 text-[11px] font-semibold text-bg">{label(left)}</span>
                  <span className="absolute top-2 right-2 rounded bg-ink/75 px-1.5 py-0.5 text-[11px] font-semibold text-bg">{label(right)}</span>
                </div>
              </div>
              <input
                type="range"
                className="range mt-3"
                min={0}
                max={100}
                value={split}
                onChange={(e) => setSplit(Number(e.target.value))}
                aria-label={c.preview}
                style={{ ["--fill" as string]: `${split}%` }}
              />
            </div>
          )}
        </section>

        <aside className="flex flex-col gap-6 border-t border-line p-5 sm:p-6 lg:border-t-0 lg:border-l">
          <h2 className="text-lg font-bold text-ink">{dict.workspace.options}</h2>
          <Slider label={c.quality} min={10} max={100} value={quality} onChange={setQuality} />
          <FieldGroup label={c.resize}>
            <Segmented
              label={c.resize}
              size="sm"
              columns={2}
              value={maxWidth}
              onChange={setMaxWidth}
              options={widths.map((n) => ({ value: n, label: n ? `≤ ${n}px` : c.resizeOff }))}
            />
          </FieldGroup>
          {busy && (
            <p className="flex items-center gap-2 text-sm text-ink-2" role="status">
              <LoaderCircle className="size-4 animate-spin" />
              {format(c.working, { format: busy === "start" ? "…" : label(busy) })}
            </p>
          )}
          <Notice>{c.note}</Notice>
        </aside>
      </div>
    </div>
  );
}
