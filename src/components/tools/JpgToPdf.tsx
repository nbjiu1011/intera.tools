"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { FieldGroup, Segmented } from "@/components/workspace/controls";
import { ImageThumb, useImageItems } from "@/components/workspace/ImageBatchTool";
import { AddMoreButton, IMAGE_LIMITS, useFileIntake, type IntakeConfig } from "@/components/workspace/intake";
import { useJob } from "@/components/workspace/job";
import { Grip, moveItem, useSortable } from "@/components/workspace/pdf";
import { ToolShell } from "@/components/workspace/ToolShell";
import { ACCEPT, baseName, nextFrame, throwIfAborted } from "@/lib/files";
import { toEmbeddable } from "@/lib/image/embed";
import { imagesToPdf, type EmbeddableImage, type ImagesToPdfOptions } from "@/lib/pdf/ops";

export default function JpgToPdf() {
  const { dict } = useI18n();
  const j = dict.jpgToPdf;
  const images = useImageItems();
  const [order, setOrder] = useState<string[]>([]);
  const config: IntakeConfig = { tool: "jpg-to-pdf", kind: "image", accept: ACCEPT.rasterEditable, multiple: true, ...IMAGE_LIMITS };
  const intake = useFileIntake(config, images.items.length, (files) => images.add(files));
  const job = useJob("jpg-to-pdf");
  const [o, setO] = useState<ImagesToPdfOptions>({ pageSize: "a4", orientation: "auto", margin: "small" });
  const [output, setOutput] = useState<"one" | "each">("one");

  // Keep a stable order list in sync with added/removed images.
  const ordered = useMemo(() => {
    const ids = images.items.map((i) => i.id);
    return [...order.filter((id) => ids.includes(id)), ...ids.filter((id) => !order.includes(id))];
  }, [images.items, order]);
  const list = ordered.map((id) => images.items.find((i) => i.id === id)!);
  const onMove = useCallback((from: number, to: number) => setOrder(moveItem(ordered, from, to)), [ordered]);
  const sortable = useSortable(onMove);

  const run = () =>
    job.run(
      list.length + 1,
      async (ctx) => {
        const embeddable: { name: string; image: EmbeddableImage }[] = [];
        for (let i = 0; i < list.length; i++) {
          throwIfAborted(ctx.signal);
          ctx.progress(i, list[i].file.name);
          await nextFrame();
          try {
            embeddable.push({ name: list[i].file.name, image: await toEmbeddable(list[i].file) });
          } catch (error) {
            ctx.fail(list[i].file.name, error);
          }
        }
        if (!embeddable.length) return;
        ctx.progress(list.length, j.action);
        if (output === "one") {
          const blob = await imagesToPdf(embeddable.map((e) => e.image), o);
          const name = embeddable.length === 1 ? `${baseName(embeddable[0].name)}.pdf` : `images-${embeddable.length}.pdf`;
          ctx.output({ name, blob, kind: "pdf", pageCount: embeddable.length });
        } else {
          for (const e of embeddable) {
            throwIfAborted(ctx.signal);
            ctx.output({ name: `${baseName(e.name)}.pdf`, blob: await imagesToPdf([e.image], o), kind: "pdf", pageCount: 1 });
          }
        }
        ctx.progress(list.length + 1);
      },
      { bytes: list.reduce((s, i) => s + i.file.size, 0) },
    );

  return (
    <ToolShell
      slug="jpg-to-pdf"
      config={config}
      intake={intake}
      job={job}
      count={list.length}
      totalBytes={list.reduce((s, i) => s + i.file.size, 0)}
      onClear={() => {
        images.clear();
        setOrder([]);
      }}
      actionLabel={j.action}
      onRun={run}
      doneTitle={j.done}
      files={
        <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
          {list.map((item, index) => {
            const st = sortable.stateOf(index);
            return (
              <li
                key={item.id}
                {...sortable.itemProps(index)}
                className={`relative rounded-2xl transition select-none ${st.dragging ? "scale-95 opacity-40" : ""} ${st.target ? "ring-4 ring-brand/30" : ""} ${sortable.active ? "" : "cursor-grab"}`}
              >
                <span className="bg-brand-gradient absolute top-2 left-2 z-10 grid size-7 place-items-center rounded-full text-xs font-bold shadow">
                  {index + 1}
                </span>
                <ImageThumb
                  item={item}
                  onRemove={() => images.remove(item.id)}
                  footer={
                    <div className="mt-1.5 flex items-center gap-1">
                      <Grip label={dict.merge.dragHint} />
                      <span className="flex-1" />
                      <button type="button" disabled={index === 0} onClick={() => onMove(index, index - 1)} aria-label={`${dict.merge.moveUp} — ${item.file.name}`} className="grid size-8 place-items-center rounded-lg text-ink-3 hover:bg-sunken hover:text-brand disabled:opacity-30">
                        <ChevronLeft className="size-4" />
                      </button>
                      <button type="button" disabled={index === list.length - 1} onClick={() => onMove(index, index + 1)} aria-label={`${dict.merge.moveDown} — ${item.file.name}`} className="grid size-8 place-items-center rounded-lg text-ink-3 hover:bg-sunken hover:text-brand disabled:opacity-30">
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
          <FieldGroup label={j.pageSize}>
            <Segmented
              label={j.pageSize}
              size="sm"
              value={o.pageSize}
              onChange={(pageSize) => setO({ ...o, pageSize })}
              options={[
                { value: "fit", label: j.fit },
                { value: "a4", label: j.a4 },
                { value: "letter", label: j.letter },
              ]}
            />
          </FieldGroup>
          {o.pageSize !== "fit" && (
            <FieldGroup label={j.orientation}>
              <Segmented
                label={j.orientation}
                size="sm"
                value={o.orientation}
                onChange={(orientation) => setO({ ...o, orientation })}
                options={[
                  { value: "auto", label: j.auto },
                  { value: "portrait", label: j.portrait },
                  { value: "landscape", label: j.landscape },
                ]}
              />
            </FieldGroup>
          )}
          <FieldGroup label={j.margin}>
            <Segmented
              label={j.margin}
              size="sm"
              value={o.margin}
              onChange={(margin) => setO({ ...o, margin })}
              options={[
                { value: "none", label: j.none },
                { value: "small", label: j.small },
                { value: "large", label: j.large },
              ]}
            />
          </FieldGroup>
          {list.length > 1 && (
            <FieldGroup label={j.output}>
              <Segmented
                label={j.output}
                columns={1}
                value={output}
                onChange={setOutput}
                options={[
                  { value: "one", label: j.oneFile },
                  { value: "each", label: j.perImage },
                ]}
              />
            </FieldGroup>
          )}
        </>
      }
    />
  );
}
