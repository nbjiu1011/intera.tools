"use client";

import { Check } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { ColorInput, FieldGroup, Notice, Segmented, Slider, TextInput, Toggle } from "@/components/workspace/controls";
import { ImageBatchTool } from "@/components/workspace/ImageBatchTool";
import { format } from "@/i18n/format";
import { ACCEPT, baseName } from "@/lib/files";
import type { WatermarkOptions, WatermarkPosition } from "@/lib/image/ops";
import { processImage, slugifyName } from "@/lib/image/pipeline";
import { socialPresetMap, socialPresets, type SocialPresetId } from "@/lib/social";
import { PresetBar, useWorkflowSettings } from "./presets";

type Settings = {
  platforms: SocialPresetId[];
  fit: "cover" | "pad";
  align: "top" | "center" | "bottom";
  background: string;
  watermark: boolean;
  wmText: string;
  wmPosition: WatermarkPosition;
  wmOpacity: number;
  wmSize: number;
  wmColor: string;
  format: "jpg" | "png";
  quality: number;
};

const defaults: Settings = {
  platforms: ["instagram-portrait"],
  fit: "cover",
  align: "center",
  background: "#ffffff",
  watermark: false,
  wmText: "",
  wmPosition: "bottom-right",
  wmOpacity: 70,
  wmSize: 4,
  wmColor: "#ffffff",
  format: "jpg",
  quality: 90,
};

const positions: WatermarkPosition[] = ["top-left", "top-right", "center", "bottom-left", "bottom-right"];

export default function SocialMediaImagePrep() {
  const { locale, dict } = useI18n();
  const w = dict.workflow;
  const wf = useWorkflowSettings<Settings>("social-media-image-prep", defaults);
  const s = wf.settings;
  // Ignore ids saved by an older version of the preset list.
  const selected = s.platforms.filter((id) => id in socialPresetMap);

  const watermark: WatermarkOptions | null =
    s.watermark && s.wmText.trim()
      ? {
          type: "text",
          text: s.wmText,
          font: "sans",
          bold: true,
          size: s.wmSize,
          color: s.wmColor,
          opacity: s.wmOpacity,
          rotation: 0,
          position: s.wmPosition,
          tile: false,
          logoSize: 20,
        }
      : null;

  const toggle = (id: SocialPresetId) =>
    wf.update({ platforms: selected.includes(id) ? selected.filter((p) => p !== id) : [...selected, id] });

  return (
    <ImageBatchTool
      slug="social-media-image-prep"
      accept={ACCEPT.anyImage}
      doneTitle={w.done}
      actionLabel={(n) => (n === 1 ? w.runOne : format(w.runMany, { count: n }))}
      blocker={() => (!selected.length ? w.nothingToDo : s.watermark && !s.wmText.trim() ? w.needText : null)}
      process={async (item) => {
        const results = [];
        for (const id of selected) {
          const p = socialPresetMap[id];
          results.push(
            await processImage(item.file, {
              frame:
                s.fit === "cover"
                  ? { mode: "cover", width: p.width, height: p.height, align: s.align }
                  : { mode: "pad", width: p.width, height: p.height, background: s.background },
              format: s.format,
              quality: s.quality / 100,
              watermark,
              name: `${slugifyName(baseName(item.file.name))}-${p.id}-${p.width}x${p.height}`,
            }),
          );
        }
        return results;
      }}
      renderOptions={(items) => (
        <>
          <PresetBar wf={wf} />
          <FieldGroup label={w.platforms} hint={w.platformsHint}>
            <ul className="grid gap-1.5">
              {socialPresets.map((p) => {
                const on = selected.includes(p.id);
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={on}
                      onClick={() => toggle(p.id)}
                      className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition ${
                        on ? "border-brand bg-brand-soft" : "border-line hover:border-line-strong"
                      }`}
                    >
                      <span
                        className={`grid size-4.5 shrink-0 place-items-center rounded border ${on ? "border-brand bg-brand text-white" : "border-line-strong"}`}
                      >
                        {on && <Check className="size-3" strokeWidth={3.5} />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="font-semibold text-ink">{p.platform}</span> <span className="text-ink-2">{p.label[locale]}</span>
                      </span>
                      <span className="shrink-0 text-xs text-ink-3 tabular-nums">
                        {p.width}×{p.height} · {p.ratio}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </FieldGroup>
          {items.length > 0 && selected.length > 0 && <Notice>{format(w.outputs, { count: items.length * selected.length })}</Notice>}
          <FieldGroup label={w.fit}>
            <Segmented
              label={w.fit}
              size="sm"
              value={s.fit}
              onChange={(fit) => wf.update({ fit })}
              options={[
                { value: "cover", label: w.fitCover },
                { value: "pad", label: w.fitPad },
              ]}
            />
          </FieldGroup>
          {s.fit === "cover" ? (
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
          ) : (
            <ColorInput label={w.background} value={s.background} onChange={(background) => wf.update({ background })} />
          )}
          <div className="grid gap-4">
            <Toggle checked={s.watermark} onChange={(v) => wf.update({ watermark: v })} label={w.watermark} />
            {s.watermark && (
              <>
                <TextInput label={w.watermarkText} value={s.wmText} onChange={(wmText) => wf.update({ wmText })} maxLength={60} placeholder={dict.watermark.textDefault} />
                <FieldGroup label={w.watermarkPosition}>
                  <Segmented
                    label={w.watermarkPosition}
                    size="sm"
                    columns={3}
                    value={s.wmPosition}
                    onChange={(wmPosition) => wf.update({ wmPosition })}
                    options={positions.map((p) => ({ value: p, label: dict.watermark.positions[p] }))}
                  />
                </FieldGroup>
                <Slider label={w.watermarkSize} min={2} max={12} value={s.wmSize} onChange={(wmSize) => wf.update({ wmSize })} format={(v) => `${v}%`} />
                <Slider label={w.watermarkOpacity} min={10} max={100} value={s.wmOpacity} onChange={(wmOpacity) => wf.update({ wmOpacity })} format={(v) => `${v}%`} />
                <ColorInput label={dict.watermark.color} value={s.wmColor} onChange={(wmColor) => wf.update({ wmColor })} />
              </>
            )}
          </div>
          <FieldGroup label={w.format}>
            <Segmented
              label={w.format}
              size="sm"
              value={s.format}
              onChange={(f) => wf.update({ format: f })}
              options={[
                { value: "jpg", label: "JPG" },
                { value: "png", label: "PNG" },
              ]}
            />
          </FieldGroup>
          {s.format === "jpg" && <Slider label={w.quality} min={60} max={100} value={s.quality} onChange={(quality) => wf.update({ quality })} />}
        </>
      )}
    />
  );
}
