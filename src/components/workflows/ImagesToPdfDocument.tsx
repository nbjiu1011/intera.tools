"use client";

import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { FieldGroup, Segmented, TextInput, Toggle } from "@/components/workspace/controls";
import { ImageThumb, useImageItems } from "@/components/workspace/ImageBatchTool";
import { AddMoreButton, IMAGE_LIMITS, useFileIntake, type IntakeConfig } from "@/components/workspace/intake";
import { useJob } from "@/components/workspace/job";
import { Grip, moveItem, useSortable } from "@/components/workspace/pdf";
import { ToolShell } from "@/components/workspace/ToolShell";
import { ACCEPT, nextFrame, throwIfAborted } from "@/lib/files";
import type { Transform } from "@/lib/image/ops";
import { slugifyName, toPdfImage } from "@/lib/image/pipeline";
import { imagesToPdf, type EmbeddableImage, type ImagesToPdfOptions } from "@/lib/pdf/ops";
import { PresetBar, useWorkflowSettings } from "./presets";

type Settings = ImagesToPdfOptions & { shrink: boolean };
const defaults: Settings = { pageSize: "a4", orientation: "auto", margin: "small", shrink: true };
const SLUG = "images-to-pdf-document";

export default function ImagesToPdfDocument() {
  const { dict } = useI18n();
  const w = dict.workflow;
  const j = dict.jpgToPdf;
  const wf = useWorkflowSettings<Settings>(SLUG, defaults);
  const s = wf.settings;
  const images = useImageItems();
  const [order, setOrder] = useState<string[]>([]);
  const [rotation, setRotation] = useState<Record<string, Transform["rotation"]>>({});
  const [fileName, setFileName] = useState("document");
  const config: IntakeConfig = { tool: SLUG, kind: "image", accept: ACCEPT.rasterEditable, multiple: true, ...IMAGE_LIMITS };
  const intake = useFileIntake(config, images.items.length, (files) => images.add(files));
  const job = useJob(SLUG);

  const ordered = useMemo(() => {
    const ids = images.items.map((i) => i.id);
    return [...order.filter((id) => ids.includes(id)), ...ids.filter((id) => !order.includes(id))];
  }, [images.items, order]);
  const list = ordered.map((id) => images.items.find((i) => i.id === id)!);
  const onMove = useCallback((from: number, to: number) => setOrder(moveItem(ordered, from, to)), [ordered]);
  const sortable = useSortable(onMove);
  const rotate = (id: string) => setRotation((r) => ({ ...r, [id]: (((r[id] ?? 0) + 90) % 360) as Transform["rotation"] }));

  const run = () =>
    job.run(
      list.length + 1,
      async (ctx) => {
        const pages: EmbeddableImage[] = [];
        for (let i = 0; i < list.length; i++) {
          throwIfAborted(ctx.signal);
          ctx.progress(i, list[i].file.name);
          await nextFrame();
          try {
            const t: Transform = { rotation: rotation[list[i].id] ?? 0, flipH: false, flipV: false };
            pages.push(await toPdfImage(list[i].file, t, s.shrink ? { maxEdge: 2000, quality: 0.8 } : null));
          } catch (error) {
            ctx.fail(list[i].file.name, error);
          }
        }
        if (!pages.length) return;
        ctx.progress(list.length, dict.workflowSteps.pdf);
        const blob = await imagesToPdf(pages, s);
        ctx.output({ name: `${slugifyName(fileName) || "document"}.pdf`, blob, kind: "pdf", pageCount: pages.length });
        ctx.progress(list.length + 1);
      },
      { bytes: list.reduce((sum, i) => sum + i.file.size, 0) },
    );

  return (
    <ToolShell
      slug={SLUG}
      config={config}
      intake={intake}
      job={job}
      count={list.length}
      totalBytes={list.reduce((sum, i) => sum + i.file.size, 0)}
      onClear={() => {
        images.clear();
        setOrder([]);
        setRotation({});
      }}
      actionLabel={w.run}
      onRun={run}
      doneTitle={w.done}
      files={
        <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
          {list.map((item, index) => {
            const st = sortable.stateOf(index);
            const deg = rotation[item.id] ?? 0;
            return (
              <li
                key={item.id}
                {...sortable.itemProps(index)}
                className={`relative rounded-2xl transition select-none ${st.dragging ? "scale-95 opacity-40" : ""} ${st.target ? "ring-4 ring-brand/30" : ""} ${sortable.active ? "" : "cursor-grab"}`}
              >
                <span className="absolute top-2 left-2 z-10 grid size-7 place-items-center rounded-md bg-ink text-xs font-bold text-bg">{index + 1}</span>
                <ImageThumb
                  item={item}
                  onRemove={() => images.remove(item.id)}
                  imageStyle={deg ? { transform: `rotate(${deg}deg)` } : undefined}
                  footer={
                    <div className="mt-1.5 flex items-center gap-1">
                      <Grip label={dict.merge.dragHint} />
                      <span className="flex-1" />
                      <button type="button" onClick={() => rotate(item.id)} aria-label={`${w.rotate} — ${item.file.name}`} className="grid size-8 place-items-center rounded-lg text-ink-3 hover:bg-sunken hover:text-brand">
                        <RotateCw className="size-4" />
                      </button>
                      <button type="button" disabled={index === 0} onClick={() => onMove(index, index - 1)} aria-label={`${w.moveUp} — ${item.file.name}`} className="grid size-8 place-items-center rounded-lg text-ink-3 hover:bg-sunken hover:text-brand disabled:opacity-30">
                        <ChevronLeft className="size-4" />
                      </button>
                      <button type="button" disabled={index === list.length - 1} onClick={() => onMove(index, index + 1)} aria-label={`${w.moveDown} — ${item.file.name}`} className="grid size-8 place-items-center rounded-lg text-ink-3 hover:bg-sunken hover:text-brand disabled:opacity-30">
                        <ChevronRight className="size-4" />
                      </button>
                    </div>
                  }
                />
              </li>
            );
          })}
          <li>
            <AddMoreButton config={config} onFiles={(f) => intake.add(f, "pick")} variant="tile" />
          </li>
        </ol>
      }
      options={
        <>
          <PresetBar wf={wf} />
          <FieldGroup label={w.pageSize}>
            <Segmented
              label={w.pageSize}
              size="sm"
              value={s.pageSize}
              onChange={(pageSize) => wf.update({ pageSize })}
              options={[
                { value: "a4", label: j.a4 },
                { value: "letter", label: j.letter },
                { value: "fit", label: j.fit },
              ]}
            />
          </FieldGroup>
          {s.pageSize !== "fit" && (
            <FieldGroup label={j.orientation}>
              <Segmented
                label={j.orientation}
                size="sm"
                value={s.orientation}
                onChange={(orientation) => wf.update({ orientation })}
                options={[
                  { value: "auto", label: j.auto },
                  { value: "portrait", label: j.portrait },
                  { value: "landscape", label: j.landscape },
                ]}
              />
            </FieldGroup>
          )}
          <FieldGroup label={w.margin}>
            <Segmented
              label={w.margin}
              size="sm"
              value={s.margin}
              onChange={(margin) => wf.update({ margin })}
              options={[
                { value: "none", label: j.none },
                { value: "small", label: j.small },
                { value: "large", label: j.large },
              ]}
            />
          </FieldGroup>
          <Toggle checked={s.shrink} onChange={(shrink) => wf.update({ shrink })} label={w.shrink} hint={w.shrinkHint} />
          <TextInput label={w.pdfName} value={fileName} onChange={setFileName} maxLength={80} />
        </>
      }
    />
  );
}
