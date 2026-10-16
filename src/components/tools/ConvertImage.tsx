"use client";

import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { ColorInput, FieldGroup, Notice, Segmented, Slider } from "@/components/workspace/controls";
import { ImageBatchTool } from "@/components/workspace/ImageBatchTool";
import { format } from "@/i18n/format";
import { ACCEPT } from "@/lib/files";
import { useClientValue } from "@/lib/useClientValue";
import { canEncode, formatLabel, formatOfFile, type ImageFormat } from "@/lib/image/codec";
import { convertImage } from "@/lib/image/ops";
import type { ToolSlug } from "@/lib/tools";

export default function ConvertImage({ slug, preset }: { slug: ToolSlug; preset?: { to?: ImageFormat } }) {
  const { dict } = useI18n();
  const c = dict.convert;
  const [to, setTo] = useState<ImageFormat>(preset?.to ?? "jpg");
  const [quality, setQuality] = useState(92);
  const [background, setBackground] = useState("#ffffff");
  const webpOk = useClientValue(() => canEncode("webp"), true);

  return (
    <ImageBatchTool
      slug={slug}
      accept={ACCEPT.anyImage}
      doneTitle={c.done}
      actionLabel={(n) => `${n === 1 ? c.actionOne : c.action} → ${formatLabel[to]}`}
      process={(item) => convertImage(item.file, { to, quality: quality / 100, background })}
      blocker={() => (to === "webp" && !webpOk ? dict.compress.webpUnsupported : null)}
      renderFooter={(item) =>
        formatOfFile(item.file) === to ? <p className="mt-1 text-xs text-ink-3">{format(c.sameFormat, { format: formatLabel[to] })}</p> : null
      }
      renderOptions={() => (
        <>
          <FieldGroup label={c.to}>
            <Segmented<ImageFormat>
              label={c.to}
              value={to}
              onChange={setTo}
              options={(["jpg", "png", "webp"] as const).map((f) => ({
                value: f,
                label: formatLabel[f],
                disabled: f === "webp" && !webpOk,
                title: f === "webp" && !webpOk ? dict.compress.webpUnsupported : undefined,
              }))}
            />
          </FieldGroup>
          {to !== "png" && <Slider label={c.quality} min={10} max={100} value={quality} onChange={setQuality} />}
          {to === "jpg" && (
            <div className="grid gap-2">
              <ColorInput label={c.background} value={background} onChange={setBackground} />
              <Notice>{c.backgroundHint}</Notice>
            </div>
          )}
        </>
      )}
    />
  );
}
