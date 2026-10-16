"use client";

import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { FieldGroup, Notice, Segmented, Slider, TextInput } from "@/components/workspace/controls";
import { PDF_LIMITS, useFileIntake, type IntakeConfig } from "@/components/workspace/intake";
import { useJob } from "@/components/workspace/job";
import { PageThumb, PdfStatus, usePdfItems } from "@/components/workspace/pdf";
import { ToolShell } from "@/components/workspace/ToolShell";
import { format } from "@/i18n/format";
import { ACCEPT, baseName, nextFrame, throwIfAborted } from "@/lib/files";
import { encodeCanvas, releaseCanvas, assertCanvasSize } from "@/lib/image/codec";
import { parseRanges } from "@/lib/pdf/ops";
import { renderPage } from "@/lib/pdf/pdfjs";

type Fmt = "jpg" | "png";

export default function PdfToJpg() {
  const { dict } = useI18n();
  const t = dict.pdfToJpg;
  const pdf = usePdfItems("pdf-to-jpg");
  const item = pdf.items[0];
  const pageCount = item?.pageCount ?? 0;
  const config: IntakeConfig = { tool: "pdf-to-jpg", kind: "pdf", accept: ACCEPT.pdf, multiple: false, ...PDF_LIMITS };
  const intake = useFileIntake(config, pdf.items.length, (files) => pdf.add(files, true));
  const job = useJob("pdf-to-jpg");
  const [fmt, setFmt] = useState<Fmt>("jpg");
  const [dpi, setDpi] = useState(150);
  const [quality, setQuality] = useState(90);
  const [pagesMode, setPagesMode] = useState<"all" | "custom">("all");
  const [ranges, setRanges] = useState("");

  const pages =
    pagesMode === "all"
      ? Array.from({ length: pageCount }, (_, i) => i)
      : (() => {
          const g = parseRanges(ranges, pageCount);
          return g ? [...new Set(g.flat())] : null;
        })();
  const selected = new Set(pages ?? []);

  const blocker = !item
    ? null
    : item.loading
      ? dict.workspace.preparing
      : item.error
        ? dict.errors[item.error]
        : pages === null
          ? format(dict.errors["invalid-range"], { max: pageCount })
          : !pages.length
            ? dict.errors["no-pages"]
            : null;

  const run = () => {
    if (!item?.doc || !pages) return;
    const doc = item.doc;
    const name = baseName(item.file.name);
    const digits = String(pageCount).length;
    void job.run(
      pages.length,
      async (ctx) => {
        for (let i = 0; i < pages.length; i++) {
          throwIfAborted(ctx.signal);
          const p = pages[i] + 1;
          ctx.progress(i, format(t.rendering, { n: p }));
          await nextFrame();
          try {
            const page = await doc.getPage(p);
            const vp = page.getViewport({ scale: dpi / 72 });
            assertCanvasSize(vp.width, vp.height);
            const canvas = await renderPage(doc, p, { scale: dpi / 72 });
            const blob = await encodeCanvas(canvas, fmt, quality / 100);
            ctx.output({
              name: `${name}-page-${String(p).padStart(digits, "0")}.${fmt}`,
              blob,
              kind: "image",
              width: canvas.width,
              height: canvas.height,
            });
            releaseCanvas(canvas);
          } catch (error) {
            ctx.fail(format(dict.workspace.page, { n: p }), error);
          }
          ctx.progress(i + 1);
        }
      },
      { bytes: item.file.size },
    );
  };

  return (
    <ToolShell
      slug="pdf-to-jpg"
      config={config}
      intake={intake}
      job={job}
      count={pdf.items.length}
      totalBytes={item?.file.size ?? 0}
      onClear={pdf.clear}
      actionLabel={`${t.action} (${fmt.toUpperCase()})`}
      onRun={run}
      blocker={blocker}
      doneTitle={t.done}
      files={
        item && (
          <div>
            <p className="mb-3 truncate text-sm text-ink-2">
              <span className="font-semibold text-ink">{item.file.name}</span> · <PdfStatus item={item} />
            </p>
            <ol className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: pageCount }, (_, p) => (
                <li key={p} className={`rounded-2xl border-2 p-1 transition ${selected.has(p) ? "border-brand/50 bg-brand/[.05]" : "border-transparent"}`}>
                  <PageThumb doc={item.doc} page={p + 1} className="rounded-xl bg-sunken" dimmed={!selected.has(p)} />
                  <span className="mt-1 block text-center text-xs font-medium text-ink-2 tabular-nums">{p + 1}</span>
                </li>
              ))}
            </ol>
          </div>
        )
      }
      options={
        <>
          <FieldGroup label={t.format}>
            <Segmented<Fmt>
              label={t.format}
              value={fmt}
              onChange={setFmt}
              options={[
                { value: "jpg", label: "JPG" },
                { value: "png", label: "PNG" },
              ]}
            />
          </FieldGroup>
          <FieldGroup label={t.resolution}>
            <Segmented
              label={t.resolution}
              columns={1}
              value={dpi}
              onChange={setDpi}
              options={[
                { value: 72, label: t.dpiLow },
                { value: 150, label: t.dpiMedium },
                { value: 300, label: t.dpiHigh },
              ]}
            />
          </FieldGroup>
          {fmt === "jpg" && <Slider label={t.quality} min={40} max={100} value={quality} onChange={setQuality} />}
          <FieldGroup label={t.pages}>
            <Segmented
              label={t.pages}
              value={pagesMode}
              onChange={setPagesMode}
              options={[
                { value: "all", label: t.allPages },
                { value: "custom", label: t.customPages },
              ]}
            />
            {pagesMode === "custom" && <TextInput label={dict.split.ranges} value={ranges} onChange={setRanges} placeholder={dict.split.rangesHint} />}
          </FieldGroup>
          {dpi === 300 && pageCount > 10 && <Notice tone="warning">{t.largeWarning}</Notice>}
        </>
      }
    />
  );
}
