"use client";

import { ClipboardPaste, FilePlus2, ImagePlus, Plus, ShieldCheck, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { format } from "@/i18n/format";
import { track } from "@/lib/analytics";
import { acceptAttr, MB, validateFiles, type AcceptSpec, type Rejection } from "@/lib/files";
import { takeHandoff } from "@/lib/handoff";

export type IntakeConfig = {
  tool: string;
  kind: "image" | "pdf";
  accept: AcceptSpec;
  multiple: boolean;
  maxFiles: number;
  maxSize: number;
};

export const IMAGE_LIMITS = { maxFiles: 100, maxSize: 50 * MB };
export const PDF_LIMITS = { maxFiles: 50, maxSize: 200 * MB };

/**
 * Validates incoming files, reports rejections (never silently drops a file),
 * listens for pasted images and picks up files handed over from another tool.
 */
export function useFileIntake(config: IntakeConfig, currentCount: number, onAccept: (files: File[]) => void) {
  const [rejections, setRejections] = useState<Rejection[]>([]);
  const countRef = useRef(currentCount);
  const onAcceptRef = useRef(onAccept);
  useEffect(() => {
    countRef.current = currentCount;
    onAcceptRef.current = onAccept;
  });

  const add = useCallback(
    (incoming: File[], source: "pick" | "drop" | "paste" | "handoff" = "pick") => {
      if (!incoming.length) return;
      const maxFiles = config.multiple ? config.maxFiles : 1;
      // Single-file tools replace the current file instead of rejecting the new one.
      const existing = config.multiple ? countRef.current : 0;
      const list = config.multiple ? incoming : incoming.slice(0, 1);
      const { accepted, rejected } = validateFiles(list, { accept: config.accept, maxSize: config.maxSize, maxFiles, existing });
      setRejections(rejected);
      if (rejected.length) {
        track("files_rejected", { tool: config.tool, count: rejected.length, code: rejected[0].code });
      }
      if (accepted.length) {
        track("files_added", {
          tool: config.tool,
          count: accepted.length,
          bytes: accepted.reduce((s, f) => s + f.size, 0),
          kind: source,
        });
        onAcceptRef.current(accepted);
      }
    },
    [config.accept, config.maxFiles, config.maxSize, config.multiple, config.tool],
  );

  // Files sent from another tool's result screen.
  useEffect(() => {
    const handoff = takeHandoff();
    if (handoff) add(handoff.files, "handoff");
  }, [add]);

  // Paste images from the clipboard (image tools only).
  useEffect(() => {
    if (config.kind !== "image") return;
    const onPaste = (event: ClipboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable]")) return;
      const files = Array.from(event.clipboardData?.files ?? []);
      if (!files.length) return;
      event.preventDefault();
      // Clipboard images are often unnamed ("image.png"); give them a readable name.
      add(
        files.map((f, i) =>
          f.name && f.name !== "image.png" ? f : new File([f], `pasted-${Date.now()}${i ? `-${i}` : ""}.png`, { type: f.type }),
        ),
        "paste",
      );
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [add, config.kind]);

  return { add, rejections, clearRejections: () => setRejections([]) };
}

/** Attach to any element to accept dropped files; `over` drives the highlight. */
export function useDropTarget(onFiles: (files: File[]) => void) {
  const [over, setOver] = useState(false);
  const depth = useRef(0);
  const hasFiles = (e: React.DragEvent) => Array.from(e.dataTransfer.types).includes("Files");
  return {
    over,
    handlers: {
      onDragEnter: (e: React.DragEvent) => {
        if (!hasFiles(e)) return;
        e.preventDefault();
        depth.current += 1;
        setOver(true);
      },
      onDragOver: (e: React.DragEvent) => {
        if (!hasFiles(e)) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
      },
      onDragLeave: (e: React.DragEvent) => {
        if (!hasFiles(e)) return;
        depth.current = Math.max(0, depth.current - 1);
        if (!depth.current) setOver(false);
      },
      onDrop: (e: React.DragEvent) => {
        if (!hasFiles(e)) return;
        e.preventDefault();
        depth.current = 0;
        setOver(false);
        onFiles(Array.from(e.dataTransfer.files));
      },
    },
  };
}

function useFilePicker(config: IntakeConfig, onFiles: (files: File[]) => void) {
  const ref = useRef<HTMLInputElement>(null);
  const input = (
    <input
      ref={ref}
      type="file"
      className="sr-only"
      tabIndex={-1}
      aria-hidden
      accept={acceptAttr(config.accept)}
      multiple={config.multiple}
      onChange={(e) => {
        onFiles(Array.from(e.target.files ?? []));
        e.target.value = "";
      }}
    />
  );
  return { open: () => ref.current?.click(), input };
}

/** The big empty-state upload area. */
export function Dropzone({ config, onFiles }: { config: IntakeConfig; onFiles: (files: File[], source?: "pick" | "drop") => void }) {
  const { dict } = useI18n();
  const picker = useFilePicker(config, (f) => onFiles(f, "pick"));
  const drop = useDropTarget((f) => onFiles(f, "drop"));
  const titleId = useId();
  const d = dict.dropzone;
  const label =
    config.kind === "image" ? (config.multiple ? d.selectImages : d.selectImage) : config.multiple ? d.selectPdfs : d.selectPdf;
  const sizeLabel = `${Math.round(config.maxSize / MB)} MB`;

  return (
    <div
      {...drop.handlers}
      aria-labelledby={titleId}
      className={`relative overflow-hidden rounded-2xl border-2 border-dashed px-5 py-12 text-center transition sm:py-16 ${
        drop.over
          ? "scale-[1.01] border-brand bg-brand/[.06]"
          : "border-line-strong bg-muted/40 hover:border-ink"
      }`}
    >
      {picker.input}
      <div className="relative mx-auto grid size-16 place-items-center rounded-xl border border-line bg-bg text-ink">
        {config.kind === "image" ? <ImagePlus className="size-8" strokeWidth={1.6} /> : <FilePlus2 className="size-8" strokeWidth={1.6} />}
      </div>
      <button
        id={titleId}
        type="button"
        onClick={picker.open}
        className="bg-brand-gradient relative mt-6 inline-flex h-13 items-center gap-2.5 rounded-lg px-7 text-[1.02rem] font-semibold transition hover:brightness-110 active:scale-[.98]"
      >
        <Plus className="size-5" strokeWidth={2.5} />
        {label}
      </button>
      <p className="relative mt-3 text-ink-2">{d.orDrop}</p>
      {config.kind === "image" && (
        <p className="relative mt-1 hidden items-center justify-center gap-1.5 text-sm text-ink-3 sm:flex">
          <ClipboardPaste className="size-4" />
          {d.pasteHint}
        </p>
      )}
      <div className="relative mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-ink-3">
        <span>{format(d.accepts, { formats: config.accept.label })}</span>
        <span aria-hidden>·</span>
        <span>
          {config.multiple
            ? format(d.limitsMany, { count: config.maxFiles, size: sizeLabel })
            : format(d.limitsOne, { size: sizeLabel })}
        </span>
      </div>
      <p className="relative mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-success">
        <ShieldCheck className="size-3.5" />
        {d.privacy}
      </p>
      {drop.over && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-brand/[.04] text-lg font-semibold text-brand">
          {d.dropToAdd}
        </div>
      )}
    </div>
  );
}

/** "Add more" button that opens the picker; used in file toolbars and grids. */
export function AddMoreButton({
  config,
  onFiles,
  variant = "button",
  label,
}: {
  config: IntakeConfig;
  onFiles: (files: File[]) => void;
  variant?: "button" | "tile";
  label?: string;
}) {
  const { dict } = useI18n();
  const picker = useFilePicker(config, onFiles);
  const text = label ?? dict.workspace.addMore;
  if (variant === "tile") {
    return (
      <>
        {picker.input}
        <button
          type="button"
          onClick={picker.open}
          className="grid h-full min-h-[150px] w-full place-items-center rounded-2xl border-2 border-dashed border-line-strong text-ink-3 transition hover:border-brand hover:bg-brand/[.04] hover:text-brand"
        >
          <span className="grid justify-items-center gap-2 text-sm font-semibold">
            <span className="grid size-11 place-items-center rounded-full bg-brand/10 text-brand">
              <Plus className="size-5" />
            </span>
            {text}
          </span>
        </button>
      </>
    );
  }
  return (
    <>
      {picker.input}
      <button
        type="button"
        onClick={picker.open}
        className="inline-flex h-10 items-center gap-1.5 rounded-full bg-brand/10 px-4 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white"
      >
        <Plus className="size-4" />
        {text}
      </button>
    </>
  );
}

/** Explains why files were not added. */
export function RejectionNotice({ rejections, onDismiss }: { rejections: Rejection[]; onDismiss: () => void }) {
  const { dict } = useI18n();
  if (!rejections.length) return null;
  return (
    <div role="alert" className="animate-fade-up rounded-2xl border border-danger/25 bg-danger-soft px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-danger">{dict.workspace.rejected}</p>
          <ul className="mt-1 grid gap-0.5 text-sm text-ink-2">
            {rejections.slice(0, 5).map((r, i) => (
              <li key={i} className="break-words">
                <span className="font-medium break-all text-ink">{r.name}</span> — {format(dict.errors[r.code], r.vars)}
              </li>
            ))}
            {rejections.length > 5 && <li>+{rejections.length - 5}</li>}
          </ul>
        </div>
        <button type="button" onClick={onDismiss} aria-label={dict.workspace.dismiss} className="rounded-full p-1 text-ink-3 hover:bg-surface hover:text-ink">
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
