"use client";

import { RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { FieldGroup, Notice, NumberInput, Segmented } from "@/components/workspace/controls";
import { ImageBatchTool, type ImageItem } from "@/components/workspace/ImageBatchTool";
import { ACCEPT } from "@/lib/files";
import { cropImage, type CropRect } from "@/lib/image/ops";

const ratios = [
  { key: "free", value: null },
  { key: "1:1", value: 1 },
  { key: "4:3", value: 4 / 3 },
  { key: "3:2", value: 3 / 2 },
  { key: "16:9", value: 16 / 9 },
  { key: "4:5", value: 4 / 5 },
  { key: "9:16", value: 9 / 16 },
] as const;
type RatioKey = (typeof ratios)[number]["key"];

type Handle = "move" | "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
const MIN = 16;

function clampRect(r: CropRect, W: number, H: number): CropRect {
  const width = Math.min(Math.max(MIN, r.width), W);
  const height = Math.min(Math.max(MIN, r.height), H);
  return {
    x: Math.min(Math.max(0, r.x), W - width),
    y: Math.min(Math.max(0, r.y), H - height),
    width,
    height,
  };
}

/** Largest centered rect with the given ratio (or 80% free box). */
function defaultRect(W: number, H: number, ratio: number | null): CropRect {
  if (!ratio) return { x: W * 0.1, y: H * 0.1, width: W * 0.8, height: H * 0.8 };
  let width = W * 0.9;
  let height = width / ratio;
  if (height > H * 0.9) {
    height = H * 0.9;
    width = height * ratio;
  }
  return { x: (W - width) / 2, y: (H - height) / 2, width, height };
}

function round(r: CropRect): CropRect {
  return { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) };
}

function CropStage({
  item,
  rect,
  onChange,
  ratio,
}: {
  item: ImageItem;
  rect: CropRect;
  onChange: (r: CropRect) => void;
  ratio: number | null;
}) {
  const { dict } = useI18n();
  const imgRef = useRef<HTMLImageElement>(null);
  const [displayW, setDisplayW] = useState(0);
  const drag = useRef<{ handle: Handle; startX: number; startY: number; start: CropRect } | null>(null);
  const W = item.width ?? 1;
  const H = item.height ?? 1;
  const scale = displayW / W || 1;

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const ro = new ResizeObserver(() => setDisplayW(img.clientWidth));
    ro.observe(img);
    return () => ro.disconnect();
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    const handle = e.currentTarget.dataset.handle as Handle;
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { handle, startX: e.clientX, startY: e.clientY, start: rect };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = (e.clientX - d.startX) / scale;
    const dy = (e.clientY - d.startY) / scale;
    const s = d.start;
    if (d.handle === "move") {
      onChange(clampRect({ ...s, x: s.x + dx, y: s.y + dy }, W, H));
      return;
    }
    let { x, y, width, height } = s;
    const h = d.handle;
    if (h.includes("e")) width = Math.min(W - s.x, Math.max(MIN, s.width + dx));
    if (h.includes("s")) height = Math.min(H - s.y, Math.max(MIN, s.height + dy));
    if (h.includes("w")) {
      const nx = Math.min(s.x + s.width - MIN, Math.max(0, s.x + dx));
      width = s.width + (s.x - nx);
      x = nx;
    }
    if (h.includes("n")) {
      const ny = Math.min(s.y + s.height - MIN, Math.max(0, s.y + dy));
      height = s.height + (s.y - ny);
      y = ny;
    }
    if (ratio) {
      // Keep the ratio, driven by the dominant axis of the handle.
      if (h === "n" || h === "s") width = height * ratio;
      else height = width / ratio;
      if (h.includes("n")) y = s.y + s.height - height;
      if (h.includes("w")) x = s.x + s.width - width;
      // Fit inside the image if the ratio pushed it out.
      const fit = Math.min(1, (h.includes("w") ? s.x + s.width : W - x) / width, (h.includes("n") ? s.y + s.height : H - y) / height);
      if (fit < 1) {
        const nw = width * fit;
        const nh = height * fit;
        if (h.includes("w")) x += width - nw;
        if (h.includes("n")) y += height - nh;
        width = nw;
        height = nh;
      }
    }
    onChange(clampRect({ x, y, width, height }, W, H));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 1;
    const moves: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    const m = moves[e.key];
    if (!m) return;
    e.preventDefault();
    onChange(clampRect({ ...rect, x: rect.x + m[0], y: rect.y + m[1] }, W, H));
  };

  const box = { left: rect.x * scale, top: rect.y * scale, width: rect.width * scale, height: rect.height * scale };
  const handles: Handle[] = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
  const handlePos: Record<string, string> = {
    nw: "-top-2 -left-2 cursor-nwse-resize",
    n: "-top-2 left-1/2 -translate-x-1/2 cursor-ns-resize",
    ne: "-top-2 -right-2 cursor-nesw-resize",
    e: "top-1/2 -right-2 -translate-y-1/2 cursor-ew-resize",
    se: "-right-2 -bottom-2 cursor-nwse-resize",
    s: "-bottom-2 left-1/2 -translate-x-1/2 cursor-ns-resize",
    sw: "-bottom-2 -left-2 cursor-nesw-resize",
    w: "top-1/2 -left-2 -translate-y-1/2 cursor-ew-resize",
  };

  return (
    <div className="grid place-items-center rounded-2xl bg-surface/60 p-3 sm:p-5">
      <div
        className="relative inline-block touch-none select-none"
        onPointerMove={onPointerMove}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={imgRef} src={item.url} alt="" draggable={false} className="block max-h-[min(560px,70vh)] max-w-full" />
        {displayW > 0 && (
          <>
            {/* dimmed outside area */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <div className="absolute" style={{ ...box, boxShadow: "0 0 0 9999px rgba(10,14,31,.55)" }} />
            </div>
            <div
              role="slider"
              tabIndex={0}
              aria-label={dict.crop.cropArea}
              aria-valuenow={Math.round(rect.x)}
              aria-valuemin={0}
              aria-valuemax={W}
              aria-valuetext={`${Math.round(rect.x)}, ${Math.round(rect.y)} — ${Math.round(rect.width)} × ${Math.round(rect.height)}`}
              onKeyDown={onKeyDown}
              data-handle="move"
              onPointerDown={onPointerDown}
              className="absolute cursor-move border-2 border-white shadow-[0_0_0_1px_rgba(79,123,255,.9)] focus-visible:outline-brand"
              style={box}
            >
              {/* rule of thirds */}
              <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3" aria-hidden>
                {Array.from({ length: 9 }, (_, i) => (
                  <span key={i} className="border-[0.5px] border-white/35" />
                ))}
              </div>
              {handles.map((h) => (
                <span
                  key={h}
                  data-handle={h}
                  onPointerDown={onPointerDown}
                  className={`absolute size-4 rounded-full border-2 border-white bg-brand shadow ${handlePos[h]} before:absolute before:-inset-3 before:content-['']`}
                  aria-hidden
                />
              ))}
              <span className="pointer-events-none absolute -top-8 left-0 rounded-md bg-[#0c1226]/80 px-2 py-0.5 text-xs font-semibold whitespace-nowrap text-white tabular-nums">
                {Math.round(rect.width)} × {Math.round(rect.height)}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function CropImage() {
  const { dict } = useI18n();
  const c = dict.crop;
  const [ratioKey, setRatioKey] = useState<RatioKey>("free");
  const [rects, setRects] = useState<Record<string, CropRect>>({});
  const ratio = ratios.find((r) => r.key === ratioKey)!.value;

  const rectFor = useCallback(
    (item: ImageItem): CropRect | null => {
      if (!item.width || !item.height) return null;
      return rects[item.id] ?? defaultRect(item.width, item.height, ratio);
    },
    [rects, ratio],
  );
  const setRect = (item: ImageItem, r: CropRect) => setRects((m) => ({ ...m, [item.id]: r }));

  return (
    <ImageBatchTool
      slug="crop-image"
      accept={ACCEPT.rasterEditable}
      multiple={false}
      doneTitle={c.done}
      actionLabel={() => c.action}
      process={(item) => cropImage(item.file, round(rectFor(item)!))}
      blocker={(items) => (items[0] && !rectFor(items[0]) ? dict.workspace.preparing : null)}
      renderFiles={(items) => {
        const item = items[0];
        const rect = item && rectFor(item);
        if (!item || !rect) return <div className="grid min-h-[300px] place-items-center text-ink-3">{dict.workspace.preparing}</div>;
        return <CropStage item={item} rect={rect} ratio={ratio} onChange={(r) => setRect(item, r)} />;
      }}
      renderOptions={(items) => {
        const item = items[0];
        const rect = item && rectFor(item);
        const W = item?.width ?? 0;
        const H = item?.height ?? 0;
        const update = (patch: Partial<CropRect>) => {
          if (!rect) return;
          let next = { ...rect, ...patch };
          if (ratio && (patch.width != null || patch.height != null)) {
            if (patch.width != null) next.height = next.width / ratio;
            else next.width = next.height * ratio;
          }
          next = clampRect(next, W, H);
          setRect(item, next);
        };
        return (
          <>
            <FieldGroup label={c.aspect}>
              <Segmented<RatioKey>
                label={c.aspect}
                columns={4}
                size="sm"
                value={ratioKey}
                onChange={(key) => {
                  setRatioKey(key);
                  if (item?.width && item.height) {
                    const r = ratios.find((x) => x.key === key)!.value;
                    setRect(item, defaultRect(item.width, item.height, r));
                  }
                }}
                options={ratios.map((r) => ({ value: r.key, label: r.key === "free" ? c.free : r.key }))}
              />
            </FieldGroup>
            {rect && (
              <div className="grid grid-cols-2 gap-3">
                <NumberInput label={c.x} suffix="px" min={0} max={W} value={Math.round(rect.x)} onChange={(v) => update({ x: v ?? 0 })} />
                <NumberInput label={c.y} suffix="px" min={0} max={H} value={Math.round(rect.y)} onChange={(v) => update({ y: v ?? 0 })} />
                <NumberInput label={c.width} suffix="px" min={MIN} max={W} value={Math.round(rect.width)} onChange={(v) => update({ width: v ?? MIN })} />
                <NumberInput label={c.height} suffix="px" min={MIN} max={H} value={Math.round(rect.height)} onChange={(v) => update({ height: v ?? MIN })} />
              </div>
            )}
            <button
              type="button"
              onClick={() => item?.width && item.height && setRect(item, defaultRect(item.width, item.height, ratio))}
              className="inline-flex h-10 w-fit items-center gap-2 rounded-full px-3 text-sm font-semibold text-ink-2 hover:bg-muted hover:text-ink"
            >
              <RotateCcw className="size-4" />
              {c.resetBox}
            </button>
            <Notice>{c.keyboardHint}</Notice>
          </>
        );
      }}
    />
  );
}
