"use client";

import { FileWarning, GripVertical, LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { track } from "@/lib/analytics";
import { format } from "@/i18n/format";
import { toToolError, type ErrorCode } from "@/lib/errors";
import { readBytes, uid } from "@/lib/files";
import { openPdf, renderThumbnail, type PDFDocumentProxy } from "@/lib/pdf/pdfjs";

export type PdfItem = {
  id: string;
  file: File;
  bytes?: Uint8Array;
  doc?: PDFDocumentProxy;
  pageCount?: number;
  /** First page width/height in points (for blank pages of matching size). */
  pageSize?: [number, number];
  error?: ErrorCode;
  loading: boolean;
};

/** Selected PDFs, opened with pdf.js for page counts and thumbnails. */
export function usePdfItems(tool: string) {
  const [items, setItems] = useState<PdfItem[]>([]);
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  });

  useEffect(() => () => itemsRef.current.forEach((i) => void i.doc?.destroy()), []);

  const add = useCallback((files: File[], replace = false) => {
    const next: PdfItem[] = files.map((file) => ({ id: uid("pdf"), file, loading: true }));
    setItems((prev) => {
      if (replace) prev.forEach((i) => void i.doc?.destroy());
      return replace ? next : [...prev, ...next];
    });
    next.forEach(async (item) => {
      let patch: Partial<PdfItem>;
      try {
        const bytes = await readBytes(item.file);
        const doc = await openPdf(bytes);
        const first = await doc.getPage(1);
        const vp = first.getViewport({ scale: 1 });
        patch = { bytes, doc, pageCount: doc.numPages, pageSize: [vp.width, vp.height], loading: false };
      } catch (error) {
        const code = toToolError(error).code;
        patch = { error: code, loading: false };
        track("files_rejected", { tool, count: 1, code });
      }
      setItems((prev) => {
        if (!prev.some((i) => i.id === item.id)) {
          void patch.doc?.destroy();
          return prev;
        }
        return prev.map((i) => (i.id === item.id ? { ...i, ...patch } : i));
      });
    });
  }, [tool]);

  const remove = useCallback((id: string) => {
    setItems((prev) => {
      prev.find((i) => i.id === id)?.doc?.destroy();
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const clear = useCallback(() => {
    setItems((prev) => {
      prev.forEach((i) => void i.doc?.destroy());
      return [];
    });
  }, []);

  return { items, setItems, add, remove, clear };
}

/* ---------------------------------------------------------------- thumbnails */

// Render one thumbnail at a time so long documents don't spike memory.
let queue: Promise<unknown> = Promise.resolve();
const cache = new WeakMap<PDFDocumentProxy, Map<number, Promise<string>>>();

function thumbnail(doc: PDFDocumentProxy, page: number): Promise<string> {
  let perDoc = cache.get(doc);
  if (!perDoc) cache.set(doc, (perDoc = new Map()));
  let job = perDoc.get(page);
  if (!job) {
    job = queue.then(() => renderThumbnail(doc, page, 220));
    queue = job.catch(() => undefined);
    perDoc.set(page, job);
  }
  return job;
}

/** Lazily rendered page thumbnail (renders when scrolled into view). */
export function PageThumb({
  doc,
  page,
  rotation = 0,
  className = "",
  dimmed = false,
}: {
  doc?: PDFDocumentProxy;
  page: number;
  rotation?: number;
  className?: string;
  dimmed?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!doc || !ref.current) return;
    let alive = true;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        thumbnail(doc, page)
          .then((u) => alive && setUrl(u))
          .catch(() => alive && setFailed(true));
      },
      { rootMargin: "300px" },
    );
    io.observe(ref.current);
    return () => {
      alive = false;
      io.disconnect();
    };
  }, [doc, page]);

  return (
    <div ref={ref} className={`relative grid aspect-square place-items-center overflow-hidden ${className}`}>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt=""
          draggable={false}
          className={`absolute inset-0 m-auto max-h-[88%] max-w-[88%] bg-white shadow-[0_4px_14px_-6px_rgba(20,30,80,.35)] ring-1 ring-black/5 transition-[transform,opacity] duration-300 ${dimmed ? "opacity-30 grayscale" : ""}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      ) : failed ? (
        <FileWarning className="size-6 text-ink-3" />
      ) : (
        <LoaderCircle className="size-5 animate-spin text-ink-3" />
      )}
    </div>
  );
}

/** A file-level status line: loading, page count or the reason it can't be used. */
export function PdfStatus({ item }: { item: PdfItem }) {
  const { dict } = useI18n();
  if (item.loading) return <span className="text-ink-3">{dict.workspace.preparing}</span>;
  if (item.error) return <span className="font-medium text-danger">{dict.errors[item.error]}</span>;
  return <span>{item.pageCount === 1 ? dict.workspace.pageOne : format(dict.workspace.pages, { count: item.pageCount ?? 0 })}</span>;
}

/* ------------------------------------------------------------------ sorting */

/**
 * Pointer-based reordering that works with mouse, pen and touch. Mouse users can
 * drag the whole card; touch users drag the grip so normal scrolling still works.
 */
export function useSortable(onMove: (from: number, to: number) => void) {
  const [drag, setDrag] = useState<{ from: number; over: number } | null>(null);
  const start = useRef<{ x: number; y: number; index: number; active: boolean; id: number } | null>(null);

  const onPointerDown = (index: number) => (e: React.PointerEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const onGrip = Boolean(target.closest("[data-grip]"));
    if (e.pointerType !== "mouse" && !onGrip) return;
    if (!onGrip && target.closest("button, a, input, label")) return;
    if (e.button !== 0) return;
    start.current = { x: e.clientX, y: e.clientY, index, active: false, id: e.pointerId };
    if (onGrip) e.preventDefault();
  };

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const s = start.current;
      if (!s || e.pointerId !== s.id) return;
      if (!s.active) {
        if (Math.hypot(e.clientX - s.x, e.clientY - s.y) < 6) return;
        s.active = true;
        setDrag({ from: s.index, over: s.index });
      }
      e.preventDefault();
      const el = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>("[data-sort-index]");
      if (el) {
        const over = Number(el.dataset.sortIndex);
        setDrag((d) => (d && d.over !== over ? { ...d, over } : d));
      }
      // Auto-scroll near the viewport edges.
      const edge = 70;
      if (e.clientY < edge) window.scrollBy(0, -14);
      else if (e.clientY > window.innerHeight - edge) window.scrollBy(0, 14);
    };
    const up = (e: PointerEvent) => {
      const s = start.current;
      if (!s || e.pointerId !== s.id) return;
      start.current = null;
      if (!s.active) return;
      setDrag((d) => {
        if (d && d.over !== d.from) onMove(d.from, d.over);
        return null;
      });
      // Swallow the click that follows a drag.
      const swallow = (ev: Event) => {
        ev.stopPropagation();
        ev.preventDefault();
      };
      window.addEventListener("click", swallow, { capture: true, once: true });
      setTimeout(() => window.removeEventListener("click", swallow, { capture: true }), 50);
    };
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [onMove]);

  const itemProps = (index: number) => ({
    "data-sort-index": index,
    onPointerDown: onPointerDown(index),
  });

  const stateOf = (index: number) => ({
    dragging: drag?.from === index,
    target: drag != null && drag.over === index && drag.from !== index,
    before: drag != null && drag.over === index && drag.from > index,
  });

  return { itemProps, stateOf, active: drag != null };
}

export function Grip({ label }: { label: string }) {
  return (
    <span
      data-grip
      aria-hidden
      title={label}
      className="grid size-8 cursor-grab touch-none place-items-center rounded-lg text-ink-3 hover:bg-sunken hover:text-ink active:cursor-grabbing"
    >
      <GripVertical className="size-4" />
    </span>
  );
}

export function moveItem<T>(list: T[], from: number, to: number): T[] {
  const next = list.slice();
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}
