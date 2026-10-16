"use client";

import { FlipHorizontal2, FlipVertical2, RotateCcw, RotateCw } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { Notice } from "@/components/workspace/controls";
import { ImageBatchTool, type ImageItem } from "@/components/workspace/ImageBatchTool";
import { ACCEPT } from "@/lib/files";
import { identity, isIdentity, rotateImage, type Transform } from "@/lib/image/ops";

type Op = "left" | "right" | "half" | "flipH" | "flipV";

function apply(t: Transform, op: Op): Transform {
  const r = (deg: number) => (((t.rotation + deg) % 360) + 360) % 360 as Transform["rotation"];
  switch (op) {
    case "left":
      return { ...t, rotation: r(-90) };
    case "right":
      return { ...t, rotation: r(90) };
    case "half":
      return { ...t, rotation: r(180) };
    // Flips are applied in the image's own frame, before rotation.
    case "flipH":
      return t.rotation % 180 === 0 ? { ...t, flipH: !t.flipH } : { ...t, flipV: !t.flipV };
    case "flipV":
      return t.rotation % 180 === 0 ? { ...t, flipV: !t.flipV } : { ...t, flipH: !t.flipH };
  }
}

function cssTransform(t: Transform, item: ImageItem): React.CSSProperties {
  // Shrink when turned sideways so the preview still fits its 4:3 box.
  let scale = 1;
  if (t.rotation % 180 !== 0 && item.width && item.height) {
    const fit = Math.min(4 / item.width, 3 / item.height);
    const dw = item.width * fit;
    const dh = item.height * fit;
    scale = Math.min(1, 4 / dh, 3 / dw);
  }
  return {
    transform: `rotate(${t.rotation}deg) scale(${(t.flipH ? -1 : 1) * scale}, ${(t.flipV ? -1 : 1) * scale})`,
  };
}

export default function RotateImage() {
  const { dict } = useI18n();
  const r = dict.rotate;
  const [transforms, setTransforms] = useState<Record<string, Transform>>({});
  const get = (id: string) => transforms[id] ?? identity;

  const ops: { op: Op; label: string; Icon: typeof RotateCw }[] = [
    { op: "left", label: r.left, Icon: RotateCcw },
    { op: "right", label: r.right, Icon: RotateCw },
    { op: "flipH", label: r.flipH, Icon: FlipHorizontal2 },
    { op: "flipV", label: r.flipV, Icon: FlipVertical2 },
  ];

  return (
    <ImageBatchTool
      slug="rotate-image"
      accept={ACCEPT.anyImage}
      doneTitle={r.done}
      actionLabel={(n) => (n === 1 ? r.actionOne : r.action)}
      process={(item) => rotateImage(item.file, get(item.id))}
      blocker={(items) => (items.every((i) => isIdentity(get(i.id))) ? r.noChanges : null)}
      imageStyle={(item) => cssTransform(get(item.id), item)}
      renderFooter={(item) => (
        <div className="mt-2 flex gap-1">
          {ops.slice(0, 2).map(({ op, label, Icon }) => (
            <button
              key={op}
              type="button"
              aria-label={`${label} — ${item.file.name}`}
              title={label}
              onClick={() => setTransforms((m) => ({ ...m, [item.id]: apply(get(item.id), op) }))}
              className="grid h-8 flex-1 place-items-center rounded-lg bg-sunken text-ink-2 transition hover:bg-brand hover:text-white"
            >
              <Icon className="size-4" />
            </button>
          ))}
          {ops.slice(2).map(({ op, label, Icon }) => (
            <button
              key={op}
              type="button"
              aria-label={`${label} — ${item.file.name}`}
              title={label}
              onClick={() => setTransforms((m) => ({ ...m, [item.id]: apply(get(item.id), op) }))}
              className="grid h-8 flex-1 place-items-center rounded-lg bg-sunken text-ink-2 transition hover:bg-brand hover:text-white"
            >
              <Icon className="size-4" />
            </button>
          ))}
        </div>
      )}
      renderOptions={(items) => (
        <>
          <div className="grid gap-2">
            <span className="text-sm font-semibold text-ink">{r.allImages}</span>
            <div className="grid grid-cols-2 gap-2">
              {[...ops.slice(0, 2), { op: "half" as Op, label: r.half, Icon: RotateCw }, ...ops.slice(2)].map(({ op, label, Icon }) => (
                <button
                  key={op}
                  type="button"
                  onClick={() =>
                    setTransforms((m) => {
                      const next = { ...m };
                      for (const it of items) next[it.id] = apply(m[it.id] ?? identity, op);
                      return next;
                    })
                  }
                  className="flex h-11 items-center gap-2 rounded-xl border border-line px-3 text-sm font-medium text-ink-2 transition hover:border-brand hover:text-brand"
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="truncate">{label}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setTransforms({})}
                className="flex h-11 items-center justify-center rounded-xl px-3 text-sm font-medium text-ink-3 hover:bg-muted hover:text-ink"
              >
                {r.resetAll}
              </button>
            </div>
          </div>
          <Notice>{r.perImageHint}</Notice>
        </>
      )}
    />
  );
}
