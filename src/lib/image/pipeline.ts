import { readBytes } from "../files";
import type { EmbeddableImage } from "../pdf/ops";
import {
  canEncode,
  context2d,
  createCanvas,
  drawScaled,
  encodeCanvas,
  fillBackground,
  formatOfFile,
  keepFormat,
  loadImage,
  releaseCanvas,
  type ImageFormat,
} from "./codec";
import { toEmbeddable } from "./embed";
import { drawWatermark, isIdentity, transformToCanvas, type ImageResult, type Transform, type WatermarkOptions } from "./ops";
import { quantizePng } from "./png-quant";

// Multi-step image processing for workflows: one decode, then frame (resize / pad /
// crop), watermark, encode and rename — the same canvas helpers the single tools use.

export type FrameSpec =
  | { mode: "keep" }
  /** Scale down to fit inside the box; a null side is unconstrained. Never enlarges. */
  | { mode: "fit"; width: number | null; height: number | null }
  /** Exact output size: the image is scaled down to fit and centered on `background`. */
  | { mode: "pad"; width: number; height: number; background: string }
  /** Exact output size: the image is scaled to fill and the overflow is cropped. */
  | { mode: "cover"; width: number; height: number; align: "top" | "center" | "bottom" };

export type PipelineOptions = {
  frame: FrameSpec;
  /** "keep" uses the input format where the browser can encode it (GIF, BMP… become PNG). */
  format: "keep" | ImageFormat;
  /** 0.1–1, for JPG and WebP. */
  quality: number;
  /** Reduce PNG output to a palette of this many colors (null = lossless PNG). */
  pngColors?: number | null;
  watermark?: WatermarkOptions | null;
  /** Return the input file when the output has the same pixel size and isn't smaller. */
  keepSmaller?: boolean;
  /** Output file name without extension. */
  name: string;
};

const extFor: Record<ImageFormat, string> = { jpg: "jpg", png: "png", webp: "webp" };

/** The format actually written: WebP falls back to JPG where the browser can't encode it. */
export function resolveFormat(file: File, format: PipelineOptions["format"]): ImageFormat {
  const wanted = format === "keep" ? keepFormat(file) : format;
  return wanted === "webp" && !canEncode("webp") ? "jpg" : wanted;
}

/** Output pixel size for a frame, given the source size. */
export function frameSize(w: number, h: number, frame: FrameSpec): { width: number; height: number } {
  switch (frame.mode) {
    case "keep":
      return { width: w, height: h };
    case "fit": {
      const scale = Math.min(1, frame.width ? frame.width / w : Infinity, frame.height ? frame.height / h : Infinity);
      return { width: Math.max(1, Math.round(w * scale)), height: Math.max(1, Math.round(h * scale)) };
    }
    case "pad":
    case "cover":
      return { width: frame.width, height: frame.height };
  }
}

function drawFrame(source: CanvasImageSource, w: number, h: number, frame: FrameSpec): HTMLCanvasElement {
  if (frame.mode === "keep") {
    const canvas = createCanvas(w, h);
    context2d(canvas).drawImage(source, 0, 0, w, h);
    return canvas;
  }
  if (frame.mode === "fit") {
    const size = frameSize(w, h, frame);
    return drawScaled(source, w, h, size.width, size.height);
  }
  if (frame.mode === "pad") {
    const scale = Math.min(1, frame.width / w, frame.height / h);
    const dw = Math.max(1, Math.round(w * scale));
    const dh = Math.max(1, Math.round(h * scale));
    const scaled = drawScaled(source, w, h, dw, dh);
    const canvas = createCanvas(frame.width, frame.height);
    const ctx = context2d(canvas);
    ctx.fillStyle = frame.background;
    ctx.fillRect(0, 0, frame.width, frame.height);
    ctx.drawImage(scaled, Math.round((frame.width - dw) / 2), Math.round((frame.height - dh) / 2));
    releaseCanvas(scaled);
    return canvas;
  }
  // cover: crop the source to the target aspect ratio, then scale.
  const scale = Math.max(frame.width / w, frame.height / h);
  const sw = Math.min(w, Math.round(frame.width / scale));
  const sh = Math.min(h, Math.round(frame.height / scale));
  const sx = Math.round((w - sw) / 2);
  const sy = frame.align === "top" ? 0 : frame.align === "bottom" ? h - sh : Math.round((h - sh) / 2);
  const cropped = createCanvas(sw, sh);
  context2d(cropped).drawImage(source, sx, sy, sw, sh, 0, 0, sw, sh);
  const canvas = drawScaled(cropped, sw, sh, frame.width, frame.height);
  releaseCanvas(cropped);
  return canvas;
}

export async function processImage(file: File, o: PipelineOptions): Promise<ImageResult> {
  const img = await loadImage(file);
  let canvas: HTMLCanvasElement | null = null;
  try {
    canvas = drawFrame(img.source, img.width, img.height, o.frame);
    const { width, height } = canvas;
    const ctx = context2d(canvas);
    if (o.watermark) drawWatermark(ctx, width, height, o.watermark, null);
    const format = resolveFormat(file, o.format);
    if (format === "jpg") fillBackground(ctx, o.frame.mode === "pad" ? o.frame.background : "#ffffff", width, height);
    const blob =
      format === "png" && o.pngColors ? await quantizePng(canvas, o.pngColors) : await encodeCanvas(canvas, format, o.quality);
    if (o.keepSmaller && width === img.width && height === img.height && blob.size >= file.size) {
      return { blob: file, name: file.name, width, height, keptOriginal: true };
    }
    return { blob, name: `${o.name}.${extFor[format]}`, width, height };
  } finally {
    if (canvas) releaseCanvas(canvas);
    img.release();
  }
}

/* -------------------------------------------------------------------- naming */

/** Lowercase, spaces → hyphens, keeps letters/digits of any script (Korean names survive). */
export function slugifyName(name: string): string {
  return (
    name
      .normalize("NFKC")
      .toLowerCase()
      .replace(/[\s_]+/g, "-")
      .replace(/[^\p{L}\p{N}.-]+/gu, "")
      .replace(/-{2,}/g, "-")
      .replace(/^[-.]+|[-.]+$/g, "") || "image"
  );
}

export type RenameOptions = { pattern: string; start: number; slug: boolean };

/**
 * Fill a name pattern: {name} original base name, {n} running number (zero-padded to
 * the widest number in the batch), {w} / {h} output size.
 */
export function applyPattern(
  r: RenameOptions,
  info: { base: string; index: number; total: number; width: number; height: number },
): string {
  const last = r.start + info.total - 1;
  const n = String(r.start + info.index).padStart(String(last).length, "0");
  const raw =
    r.pattern
      .replaceAll("{name}", info.base)
      .replaceAll("{n}", n)
      .replaceAll("{w}", String(info.width))
      .replaceAll("{h}", String(info.height))
      .replace(/[\\/:*?"<>|]+/g, "-")
      .trim() || info.base;
  return r.slug ? slugifyName(raw) : raw;
}

/* -------------------------------------------------------------- PDF prep */

/**
 * Image → bytes for a PDF page with rotation applied; optionally downscaled to
 * `maxEdge` and re-encoded as JPEG to keep the PDF small.
 */
export async function toPdfImage(
  file: File,
  t: Transform,
  shrink: { maxEdge: number; quality: number } | null,
): Promise<EmbeddableImage> {
  // Unchanged JPGs and PNGs are embedded as they are (no re-compression).
  if (!shrink && isIdentity(t)) return toEmbeddable(file);
  const img = await loadImage(file);
  const temps: HTMLCanvasElement[] = [];
  try {
    let source: CanvasImageSource = img.source;
    let w = img.width;
    let h = img.height;
    if (shrink) {
      const scale = Math.min(1, shrink.maxEdge / Math.max(w, h));
      if (scale < 1) {
        const scaled = drawScaled(source, w, h, Math.round(w * scale), Math.round(h * scale));
        temps.push(scaled);
        source = scaled;
        w = scaled.width;
        h = scaled.height;
      }
    }
    const canvas = transformToCanvas(source, w, h, t);
    temps.push(canvas);
    const keepPng = !shrink && formatOfFile(file) === "png";
    if (!keepPng) fillBackground(context2d(canvas), "#ffffff", canvas.width, canvas.height);
    const blob = await encodeCanvas(canvas, keepPng ? "png" : "jpg", shrink ? shrink.quality : 0.92);
    return { bytes: await readBytes(blob), type: keepPng ? "png" : "jpg", width: canvas.width, height: canvas.height };
  } finally {
    temps.forEach(releaseCanvas);
    img.release();
  }
}
