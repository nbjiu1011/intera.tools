"use client";

import { useI18n } from "@/components/I18nProvider";
import { FieldGroup, Notice, NumberInput, Segmented, Slider, Toggle } from "@/components/workspace/controls";
import { ImageBatchTool } from "@/components/workspace/ImageBatchTool";
import { format } from "@/i18n/format";
import { ACCEPT, baseName } from "@/lib/files";
import { canEncode } from "@/lib/image/codec";
import { frameSize, processImage, resolveFormat, slugifyName } from "@/lib/image/pipeline";
import { useClientValue } from "@/lib/useClientValue";
import { PresetBar, useWorkflowSettings } from "./presets";

type Settings = {
  maxWidth: number | null;
  format: "webp" | "jpg" | "keep";
  quality: number;
  keepSmaller: boolean;
  slug: boolean;
};

const defaults: Settings = { maxWidth: 1600, format: "webp", quality: 80, keepSmaller: true, slug: true };
const widths = [2560, 1920, 1600, 1280, 1024];

export default function WebImageOptimization() {
  const { dict } = useI18n();
  const w = dict.workflow;
  const wf = useWorkflowSettings<Settings>("web-image-optimization", defaults);
  const s = wf.settings;
  const webpOk = useClientValue(() => canEncode("webp"), true);
  const frame = { mode: "fit" as const, width: s.maxWidth, height: null };

  return (
    <ImageBatchTool
      slug="web-image-optimization"
      accept={ACCEPT.anyImage}
      doneTitle={w.done}
      actionLabel={(n) => (n === 1 ? w.runOne : format(w.runMany, { count: n }))}
      showSavings
      process={(item) =>
        processImage(item.file, {
          frame,
          format: s.format,
          quality: s.quality / 100,
          keepSmaller: s.keepSmaller,
          name: s.slug ? slugifyName(baseName(item.file.name)) : baseName(item.file.name),
        })
      }
      renderFooter={(item) => {
        if (!item.width || !item.height) return null;
        const size = frameSize(item.width, item.height, frame);
        return (
          <p className="mt-1 text-xs font-semibold text-brand tabular-nums">
            → {format(dict.workspace.dimensions, { width: size.width, height: size.height })} · {resolveFormat(item.file, s.format).toUpperCase()}
          </p>
        );
      }}
      renderOptions={() => (
        <>
          <PresetBar wf={wf} />
          <FieldGroup label={w.maxWidth} hint={w.sizeFitHint}>
            <Segmented
              label={w.maxWidth}
              size="sm"
              columns={3}
              value={s.maxWidth && widths.includes(s.maxWidth) ? s.maxWidth : -1}
              onChange={(v) => wf.update({ maxWidth: v > 0 ? v : s.maxWidth && !widths.includes(s.maxWidth) ? s.maxWidth : 1440 })}
              options={[...widths.map((n) => ({ value: n, label: `${n}px` })), { value: -1, label: w.custom }]}
            />
            {(!s.maxWidth || !widths.includes(s.maxWidth)) && (
              <NumberInput label={w.maxWidth} suffix="px" max={8000} value={s.maxWidth} onChange={(maxWidth) => wf.update({ maxWidth })} />
            )}
          </FieldGroup>
          <FieldGroup label={w.format}>
            <Segmented
              label={w.format}
              size="sm"
              value={s.format}
              onChange={(f) => wf.update({ format: f })}
              options={[
                { value: "webp", label: "WebP", disabled: !webpOk },
                { value: "jpg", label: "JPG" },
                { value: "keep", label: w.formatKeep },
              ]}
            />
          </FieldGroup>
          {s.format === "webp" && !webpOk && <Notice tone="warning">{w.webpFallback}</Notice>}
          <Slider label={w.quality} min={40} max={95} value={s.quality} onChange={(quality) => wf.update({ quality })} />
          <Toggle checked={s.keepSmaller} onChange={(keepSmaller) => wf.update({ keepSmaller })} label={w.keepSmaller} />
          <Toggle checked={s.slug} onChange={(slug) => wf.update({ slug })} label={w.renameSlug} />
        </>
      )}
    />
  );
}
