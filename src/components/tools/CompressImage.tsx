"use client";

import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { ChoiceCards, Notice, Slider, Toggle } from "@/components/workspace/controls";
import { ImageBatchTool } from "@/components/workspace/ImageBatchTool";
import { ACCEPT } from "@/lib/files";
import { useClientValue } from "@/lib/useClientValue";
import { canEncode } from "@/lib/image/codec";
import { compressImage, compressPresets, type CompressLevel, type CompressOptions } from "@/lib/image/ops";

export default function CompressImage() {
  const { dict } = useI18n();
  const c = dict.compress;
  const [options, setOptions] = useState<CompressOptions>({ level: "balanced", quality: null, pngColors: null, toWebp: false });
  const [advanced, setAdvanced] = useState(false);
  const preset = compressPresets[options.level];
  const webpOk = useClientValue(() => canEncode("webp"), true);

  return (
    <ImageBatchTool
      slug="compress-image"
      accept={ACCEPT.compressible}
      doneTitle={c.done}
      actionLabel={(n) => (n === 1 ? c.actionOne : c.action)}
      showSavings
      process={(item) => compressImage(item.file, options)}
      renderOptions={(items) => {
        const hasPng = items.some((i) => i.file.type === "image/png" || /\.png$/i.test(i.file.name));
        const hasLossy = items.some((i) => !/\.png$/i.test(i.file.name) && i.file.type !== "image/png");
        return (
          <>
            <div className="grid gap-2">
              <span className="text-sm font-semibold text-ink">{c.level}</span>
              <ChoiceCards<CompressLevel>
                label={c.level}
                value={options.level}
                onChange={(level) => setOptions({ ...options, level, quality: null, pngColors: null })}
                options={(["light", "balanced", "strong"] as const).map((l) => ({ value: l, label: c.levels[l].label, hint: c.levels[l].hint }))}
              />
            </div>
            <Toggle
              checked={options.toWebp}
              onChange={(toWebp) => setOptions({ ...options, toWebp })}
              label={c.toWebp}
              hint={webpOk ? c.toWebpHint : c.webpUnsupported}
            />
            <details open={advanced} onToggle={(e) => setAdvanced((e.target as HTMLDetailsElement).open)} className="group rounded-2xl border border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {dict.workspace.advanced}
                <span className="text-ink-3 transition group-open:rotate-45">+</span>
              </summary>
              <div className="grid gap-5 border-t border-line px-4 py-4">
                {(hasLossy || options.toWebp) && (
                  <Slider
                    label={c.quality}
                    min={10}
                    max={95}
                    value={Math.round((options.quality ?? preset.quality) * 100)}
                    onChange={(v) => setOptions({ ...options, quality: v / 100 })}
                  />
                )}
                {hasPng && !options.toWebp && (
                  <Slider
                    label={c.pngColors}
                    min={16}
                    max={256}
                    step={8}
                    value={options.pngColors ?? preset.pngColors}
                    onChange={(v) => setOptions({ ...options, pngColors: v })}
                  />
                )}
              </div>
            </details>
            <Notice>{c.metadataNote}</Notice>
          </>
        );
      }}
      blocker={() => (options.toWebp && !webpOk ? c.webpUnsupported : null)}
    />
  );
}
