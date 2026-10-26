"use client";

import { ArrowRight, ImageOff, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { format, formatBytes } from "@/i18n/format";
import { throwIfAborted, uid, nextFrame, type AcceptSpec } from "@/lib/files";
import type { ImageResult } from "@/lib/image/ops";
import { PrimaryButton, ProcessingOverlay, Stepper, WorkspaceFrame } from "./frame";
import { AddMoreButton, Dropzone, IMAGE_LIMITS, RejectionNotice, useFileIntake, type IntakeConfig } from "./intake";
import { useJob } from "./job";
import { ResultView } from "./ResultView";

export type ImageItem = { id: string; file: File; url: string; width?: number; height?: number; broken?: boolean };

/** Manages selected images, their preview URLs and natural dimensions. */
export function useImageItems() {
  const [items, setItems] = useState<ImageItem[]>([]);
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  });

  useEffect(() => () => itemsRef.current.forEach((i) => URL.revokeObjectURL(i.url)), []);

  const add = useCallback((files: File[], replace = false) => {
    const next = files.map((file) => ({ id: uid("img"), file, url: URL.createObjectURL(file) }));
    setItems((prev) => {
      if (replace) prev.forEach((i) => URL.revokeObjectURL(i.url));
      return replace ? next : [...prev, ...next];
    });
    // Read dimensions in the background for size previews.
    next.forEach((item) => {
      const img = new Image();
      img.onload = () =>
        setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, width: img.naturalWidth, height: img.naturalHeight } : i)));
      img.onerror = () => setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, broken: true } : i)));
      img.src = item.url;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => {
      const gone = prev.find((i) => i.id === id);
      if (gone) URL.revokeObjectURL(gone.url);
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const clear = useCallback(() => {
    setItems((prev) => {
      prev.forEach((i) => URL.revokeObjectURL(i.url));
      return [];
    });
  }, []);

  return { items, add, remove, clear };
}

export function ImageThumb({
  item,
  onRemove,
  overlay,
  imageStyle,
  footer,
}: {
  item: ImageItem;
  onRemove?: () => void;
  overlay?: React.ReactNode;
  imageStyle?: React.CSSProperties;
  footer?: React.ReactNode;
}) {
  const { locale, dict } = useI18n();
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_6px_20px_-14px_rgba(30,40,100,.4)] animate-pop-in">
      <div className="checkerboard relative grid aspect-[4/3] place-items-center overflow-hidden">
        {item.broken ? (
          <span className="grid justify-items-center gap-1 text-xs text-ink-3">
            <ImageOff className="size-6" />
            {item.file.name.split(".").pop()?.toUpperCase()}
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.url}
            alt=""
            loading="lazy"
            decoding="async"
            className="max-h-full max-w-full object-contain transition-transform duration-300"
            style={imageStyle}
          />
        )}
        {overlay}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={format(dict.workspace.remove, { name: item.file.name })}
            className="absolute top-2 right-2 grid size-8 place-items-center rounded-full bg-[#0c1226]/60 text-white opacity-100 backdrop-blur transition hover:bg-danger sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      <div className="px-3 py-2.5">
        <p className="truncate text-sm font-medium text-ink" title={item.file.name}>
          {item.file.name}
        </p>
        <p className="text-xs text-ink-3 tabular-nums">
          {formatBytes(item.file.size, locale)}
          {item.width ? ` · ${item.width}×${item.height}` : ""}
        </p>
        {footer}
      </div>
    </div>
  );
}

/**
 * Shared flow for image tools that process each selected image independently:
 * select → options → process with progress → results with downloads.
 */
export function ImageBatchTool({
  slug,
  accept,
  doneTitle,
  actionLabel,
  renderOptions,
  process,
  blocker,
  showSavings = false,
  renderOverlay,
  imageStyle,
  renderFooter,
  renderFiles,
  multiple = true,
}: {
  /** Tool or workflow slug (analytics, ZIP name, "continue with" targets). */
  slug: string;
  accept: AcceptSpec;
  doneTitle: string;
  actionLabel: (count: number) => string;
  renderOptions: (items: ImageItem[]) => React.ReactNode;
  /** One result per image, or several (e.g. one per export size). */
  process: (item: ImageItem, index: number, all: ImageItem[]) => Promise<ImageResult | ImageResult[]>;
  /** A message that disables the main action (e.g. missing watermark text). */
  blocker?: (items: ImageItem[]) => string | null;
  showSavings?: boolean;
  renderOverlay?: (item: ImageItem) => React.ReactNode;
  imageStyle?: (item: ImageItem) => React.CSSProperties | undefined;
  renderFooter?: (item: ImageItem) => React.ReactNode;
  /** Replace the default thumbnail grid (e.g. a large live preview). */
  renderFiles?: (items: ImageItem[], remove: (id: string) => void) => React.ReactNode;
  multiple?: boolean;
}) {
  const { items, add, remove, clear } = useImageItems();
  const config: IntakeConfig = { tool: slug, kind: "image", accept, multiple, ...IMAGE_LIMITS };
  const intake = useFileIntake(config, items.length, (files) => add(files, !multiple));
  const job = useJob(slug);

  const start = async () => {
    const list = items;
    await job.run(
      list.length,
      async (ctx) => {
        for (let i = 0; i < list.length; i++) {
          throwIfAborted(ctx.signal);
          ctx.progress(i, list[i].file.name);
          await nextFrame();
          try {
            const results = await process(list[i], i, list);
            for (const r of Array.isArray(results) ? results : [results]) {
              ctx.output({
                name: r.name,
                blob: r.blob,
                kind: "image",
                originalSize: list[i].file.size,
                width: r.width,
                height: r.height,
                keptOriginal: r.keptOriginal,
              });
            }
          } catch (error) {
            ctx.fail(list[i].file.name, error);
          }
          ctx.progress(i + 1);
        }
      },
      { bytes: list.reduce((s, it) => s + it.file.size, 0) },
    );
  };

  const reset = () => {
    job.reset();
    clear();
    intake.clearRejections();
  };

  const state = job.state;
  if (state.stage === "done") {
    return (
      <>
        <Stepper step={3} />
        <ResultView
          tool={slug}
          title={doneTitle}
          outputs={state.outputs}
          failures={state.failures}
          showSavings={showSavings}
          zipName={`intera-tools-${slug}-${new Date().toISOString().slice(0, 10)}.zip`}
          onStartOver={reset}
          onAdjust={() => job.reset()}
        />
      </>
    );
  }

  if (!items.length) {
    return (
      <>
        <Stepper step={1} />
        {intake.rejections.length > 0 && (
          <div className="mb-4">
            <RejectionNotice rejections={intake.rejections} onDismiss={intake.clearRejections} />
          </div>
        )}
        <Dropzone config={config} onFiles={(f, source) => intake.add(f, source)} />
      </>
    );
  }

  const block = blocker?.(items) ?? null;
  return (
    <>
      <Stepper step={2} />
      <WorkspaceFrame
        config={config}
        count={items.length}
        totalBytes={items.reduce((s, i) => s + i.file.size, 0)}
        onAdd={(f) => intake.add(f, "drop")}
        onClear={reset}
        rejections={intake.rejections}
        onDismissRejections={intake.clearRejections}
        files={
          renderFiles ? (
            renderFiles(items, remove)
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
              {items.map((item) => (
                <li key={item.id}>
                  <ImageThumb
                    item={item}
                    onRemove={() => remove(item.id)}
                    overlay={renderOverlay?.(item)}
                    imageStyle={imageStyle?.(item)}
                    footer={renderFooter?.(item)}
                  />
                </li>
              ))}
              {multiple && (
                <li>
                  <AddMoreButton config={config} onFiles={(f) => intake.add(f, "pick")} variant="tile" />
                </li>
              )}
            </ul>
          )
        }
        options={renderOptions(items)}
        action={
          <div className="grid gap-2">
            {block && <p className="text-center text-xs text-warning">{block}</p>}
            <PrimaryButton onClick={start} disabled={Boolean(block)} icon={<ArrowRight className="size-5" />}>
              {actionLabel(items.length)}
            </PrimaryButton>
          </div>
        }
        overlay={
          state.stage === "running" ? (
            <ProcessingOverlay done={state.done} total={state.total} label={state.label} onCancel={job.cancel} />
          ) : null
        }
      />
    </>
  );
}
