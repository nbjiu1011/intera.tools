"use client";

import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { FieldGroup, Notice, NumberInput, Segmented, Toggle } from "@/components/workspace/controls";
import { ImageBatchTool } from "@/components/workspace/ImageBatchTool";
import { format } from "@/i18n/format";
import { ACCEPT } from "@/lib/files";
import { resizeImage, targetSize, type ResizeOptions } from "@/lib/image/ops";

export default function ResizeImage() {
  const { dict } = useI18n();
  const r = dict.resize;
  const [o, setO] = useState<ResizeOptions>({ mode: "pixels", width: null, height: null, lockRatio: true, percent: 50, noEnlarge: true });
  const [customPercent, setCustomPercent] = useState(false);

  return (
    <ImageBatchTool
      slug="resize-image"
      accept={ACCEPT.anyImage}
      doneTitle={r.done}
      actionLabel={(n) => (n === 1 ? r.actionOne : r.action)}
      process={(item) => resizeImage(item.file, o)}
      blocker={() => (o.mode === "pixels" && !o.width && !o.height ? `${r.width} / ${r.height}` : null)}
      renderFooter={(item) => {
        if (!item.width || !item.height) return null;
        if (o.mode === "pixels" && !o.width && !o.height) return null;
        const t = targetSize(item.width, item.height, o);
        return (
          <p className="mt-1 text-xs font-semibold text-brand tabular-nums">
            → {format(dict.workspace.dimensions, { width: t.width, height: t.height })}
          </p>
        );
      }}
      renderOptions={(items) => {
        const first = items.find((i) => i.width && i.height);
        const ratio = first ? first.height! / first.width! : null;
        const setWidth = (width: number | null) =>
          setO({ ...o, width, height: o.lockRatio && width && ratio && items.length === 1 ? Math.round(width * ratio) : o.lockRatio ? null : o.height });
        const setHeight = (height: number | null) =>
          setO({ ...o, height, width: o.lockRatio && height && ratio && items.length === 1 ? Math.round(height / ratio) : o.lockRatio ? null : o.width });
        return (
          <>
            <FieldGroup label={r.mode}>
              <Segmented
                label={r.mode}
                value={o.mode}
                onChange={(mode) => setO({ ...o, mode })}
                options={[
                  { value: "pixels", label: r.byPixels },
                  { value: "percent", label: r.byPercent },
                ]}
              />
            </FieldGroup>
            {o.mode === "pixels" ? (
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <NumberInput label={r.width} suffix={r.px} value={o.width} onChange={setWidth} placeholder={first?.width ? String(first.width) : ""} />
                  <NumberInput label={r.height} suffix={r.px} value={o.height} onChange={setHeight} placeholder={first?.height ? String(first.height) : ""} />
                </div>
                <Toggle checked={o.lockRatio} onChange={(lockRatio) => setO({ ...o, lockRatio, height: lockRatio && o.width ? null : o.height })} label={r.lockRatio} />
                {items.length > 1 && o.lockRatio && <Notice>{r.batchNote}</Notice>}
              </div>
            ) : (
              <FieldGroup label={r.percent}>
                <Segmented
                  label={r.percent}
                  value={customPercent ? -1 : o.percent}
                  onChange={(v) => {
                    if (v === -1) setCustomPercent(true);
                    else {
                      setCustomPercent(false);
                      setO({ ...o, percent: v });
                    }
                  }}
                  options={[
                    { value: 25, label: "25%" },
                    { value: 50, label: "50%" },
                    { value: 75, label: "75%" },
                    { value: -1, label: r.custom },
                  ]}
                />
                {customPercent && (
                  <NumberInput label={r.percent} suffix="%" min={1} max={400} value={o.percent} onChange={(v) => setO({ ...o, percent: v || 1 })} />
                )}
              </FieldGroup>
            )}
            <Toggle checked={o.noEnlarge} onChange={(noEnlarge) => setO({ ...o, noEnlarge })} label={r.noEnlarge} />
            <Notice>{r.outputNote}</Notice>
          </>
        );
      }}
    />
  );
}
