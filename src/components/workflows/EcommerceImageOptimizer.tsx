"use client";

import { useI18n } from "@/components/I18nProvider";
import { ChoiceCards, ColorInput, FieldGroup, Notice, NumberInput, Segmented, Slider, TextInput, Toggle } from "@/components/workspace/controls";
import { ImageBatchTool } from "@/components/workspace/ImageBatchTool";
import { format } from "@/i18n/format";
import { ACCEPT, baseName } from "@/lib/files";
import { canEncode } from "@/lib/image/codec";
import { applyPattern, frameSize, processImage, resolveFormat, type FrameSpec } from "@/lib/image/pipeline";
import { useClientValue } from "@/lib/useClientValue";
import { PresetBar, useWorkflowSettings } from "./presets";

type Settings = {
  size: "pad" | "fit" | "cover" | "keep";
  width: number | null;
  height: number | null;
  background: string;
  align: "top" | "center" | "bottom";
  format: "keep" | "jpg" | "webp" | "png";
  quality: number;
  pattern: string;
  start: number;
  slug: boolean;
};

const defaults: Settings = {
  size: "pad",
  width: 1000,
  height: 1000,
  background: "#ffffff",
  align: "center",
  format: "jpg",
  quality: 85,
  pattern: "product-{n}",
  start: 1,
  slug: true,
};

export function toFrame(s: Pick<Settings, "size" | "width" | "height" | "background" | "align">): FrameSpec {
  // An empty field (still typing) falls back to the other side, then to 1000 px.
  const width = s.width || s.height || 1000;
  const height = s.height || s.width || 1000;
  if (s.size === "keep") return { mode: "keep" };
  if (s.size === "fit") return { mode: "fit", width: s.width, height: s.height };
  if (s.size === "pad") return { mode: "pad", width, height, background: s.background };
  return { mode: "cover", width, height, align: s.align };
}

export default function EcommerceImageOptimizer() {
  const { dict } = useI18n();
  const w = dict.workflow;
  const wf = useWorkflowSettings<Settings>("ecommerce-image-optimizer", defaults);
  const s = wf.settings;
  const webpOk = useClientValue(() => canEncode("webp"), true);
  const squares = [1000, 1200, 2000];

  const nameFor = (file: File, index: number, total: number, width: number, height: number) =>
    applyPattern({ pattern: s.pattern, start: s.start, slug: s.slug }, { base: baseName(file.name), index, total, width, height });

  return (
    <ImageBatchTool
      slug="ecommerce-image-optimizer"
      accept={ACCEPT.anyImage}
      doneTitle={w.done}
      actionLabel={(n) => (n === 1 ? w.runOne : format(w.runMany, { count: n }))}
      showSavings
      process={(item, index, all) => {
        const size = frameSize(item.width ?? 1000, item.height ?? 1000, toFrame(s));
        return processImage(item.file, {
          frame: toFrame(s),
          format: s.format,
          quality: s.quality / 100,
          name: nameFor(item.file, index, all.length, size.width, size.height),
        });
      }}
      renderFooter={(item) => {
        if (!item.width || !item.height) return null;
        const size = frameSize(item.width, item.height, toFrame(s));
        return (
          <p className="mt-1 text-xs font-semibold text-brand tabular-nums">
            → {format(dict.workspace.dimensions, { width: size.width, height: size.height })} · {resolveFormat(item.file, s.format).toUpperCase()}
          </p>
        );
      }}
      renderOptions={(items) => {
        const first = items[0];
        const firstSize = first?.width && first.height ? frameSize(first.width, first.height, toFrame(s)) : { width: 0, height: 0 };
        const example = first ? `${nameFor(first.file, 0, items.length, firstSize.width, firstSize.height)}.${resolveFormat(first.file, s.format)}` : "";
        return (
          <>
            <PresetBar wf={wf} />
            <FieldGroup label={w.size}>
              <ChoiceCards
                label={w.size}
                value={s.size}
                onChange={(size) => wf.update({ size })}
                options={[
                  { value: "pad", label: w.sizePad, hint: w.sizePadHint },
                  { value: "fit", label: w.sizeFit, hint: w.sizeFitHint },
                  { value: "cover", label: w.sizeCover, hint: w.sizeCoverHint },
                  { value: "keep", label: w.sizeKeep },
                ]}
              />
            </FieldGroup>
            {s.size !== "keep" && (
              <div className="grid gap-3">
                <Segmented
                  label={w.size}
                  size="sm"
                  value={s.width && s.width === s.height && squares.includes(s.width) ? s.width : -1}
                  onChange={(v) => v > 0 && wf.update({ width: v, height: v })}
                  options={[...squares.map((n) => ({ value: n, label: `${n}²` })), { value: -1, label: w.custom }]}
                />
                <div className="grid grid-cols-2 gap-3">
                  <NumberInput label={w.width} suffix="px" max={8000} value={s.width} onChange={(v) => wf.update({ width: v })} />
                  <NumberInput label={w.height} suffix="px" max={8000} value={s.height} onChange={(v) => wf.update({ height: v })} />
                </div>
                {s.size === "pad" && <ColorInput label={w.background} value={s.background} onChange={(background) => wf.update({ background })} />}
                {s.size === "cover" && (
                  <FieldGroup label={w.align}>
                    <Segmented
                      label={w.align}
                      size="sm"
                      value={s.align}
                      onChange={(align) => wf.update({ align })}
                      options={[
                        { value: "top", label: w.alignTop },
                        { value: "center", label: w.alignCenter },
                        { value: "bottom", label: w.alignBottom },
                      ]}
                    />
                  </FieldGroup>
                )}
              </div>
            )}
            <FieldGroup label={w.format}>
              <Segmented
                label={w.format}
                size="sm"
                value={s.format}
                onChange={(f) => wf.update({ format: f })}
                options={[
                  { value: "jpg", label: "JPG" },
                  { value: "webp", label: "WebP", disabled: !webpOk },
                  { value: "png", label: "PNG" },
                  { value: "keep", label: w.formatKeep },
                ]}
              />
            </FieldGroup>
            {s.format !== "png" && (
              <Slider label={w.quality} min={40} max={100} value={s.quality} onChange={(quality) => wf.update({ quality })} />
            )}
            {s.format === "webp" && !webpOk && <Notice tone="warning">{w.webpFallback}</Notice>}
            <div className="grid gap-3">
              <TextInput label={w.renamePattern} value={s.pattern} onChange={(pattern) => wf.update({ pattern })} maxLength={80} />
              <p className="-mt-1 text-xs text-ink-3">{w.renameHint}</p>
              <NumberInput label={w.renameStart} min={0} max={99999} value={s.start} onChange={(v) => wf.update({ start: v ?? 1 })} />
              <Toggle checked={s.slug} onChange={(slug) => wf.update({ slug })} label={w.renameSlug} />
              {example && <Notice>{format(w.renamePreview, { example })}</Notice>}
            </div>
          </>
        );
      }}
    />
  );
}
