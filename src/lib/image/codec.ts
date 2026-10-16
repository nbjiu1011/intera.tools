import { ToolError } from "../errors";
import { extOf } from "../files";

export type ImageFormat = "jpg" | "png" | "webp";

export const formatMime: Record<ImageFormat, string> = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" };
export const formatLabel: Record<ImageFormat, string> = { jpg: "JPG", png: "PNG", webp: "WebP" };

export function formatOfFile(file: File): ImageFormat | null {
  const t = file.type;
  const e = extOf(file.name);
  if (t === "image/jpeg" || ["jpg", "jpeg", "jfif"].includes(e)) return "jpg";
  if (t === "image/png" || e === "png") return "png";
  if (t === "image/webp" || e === "webp") return "webp";
  return null;
}

/** Output format that keeps the input format where the browser can encode it. */
export function keepFormat(file: File): ImageFormat {
  return formatOfFile(file) ?? "png";
}

const encodeSupport = new Map<ImageFormat, boolean>();

export function canEncode(format: ImageFormat): boolean {
  if (format !== "webp") return true;
  if (typeof document === "undefined") return true;
  if (!encodeSupport.has(format)) {
    const c = document.createElement("canvas");
    c.width = c.height = 2;
    encodeSupport.set(format, c.toDataURL(formatMime[format]).startsWith(`data:${formatMime[format]}`));
  }
  return encodeSupport.get(format)!;
}

/** Largest canvas area that is safe on this device. iOS Safari caps canvases at ~16.7 MP. */
export function maxCanvasPixels(): number {
  if (typeof navigator === "undefined") return 100_000_000;
  const ios = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return ios ? 16_777_216 : 100_000_000;
}

export function assertCanvasSize(width: number, height: number) {
  if (width * height > maxCanvasPixels()) {
    throw new ToolError("too-many-pixels", { megapixels: Math.round((width * height) / 1e6) });
  }
}

export type LoadedImage = { source: HTMLImageElement; width: number; height: number; release: () => void };

/**
 * Decode an image file. HTMLImageElement applies EXIF orientation, handles SVG and
 * whatever extra formats the browser supports (e.g. HEIC in Safari).
 */
export async function loadImage(file: Blob): Promise<LoadedImage> {
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.decoding = "async";
  img.src = url;
  try {
    await img.decode();
  } catch {
    URL.revokeObjectURL(url);
    throw new ToolError("decode-failed");
  }
  let width = img.naturalWidth;
  let height = img.naturalHeight;
  if (!width || !height) {
    // SVG without intrinsic size.
    width = 1024;
    height = 1024;
  }
  return { source: img, width, height, release: () => URL.revokeObjectURL(url) };
}

export function createCanvas(width: number, height: number): HTMLCanvasElement {
  assertCanvasSize(width, height);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  return canvas;
}

export function context2d(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) throw new ToolError("out-of-memory");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  return ctx;
}

export function releaseCanvas(canvas: HTMLCanvasElement) {
  // Shrinking frees the backing store immediately on Safari.
  canvas.width = canvas.height = 0;
}

export async function encodeCanvas(canvas: HTMLCanvasElement, format: ImageFormat, quality = 0.92): Promise<Blob> {
  if (!canEncode(format)) throw new ToolError("encode-unsupported", { format: formatLabel[format] });
  const mime = formatMime[format];
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, mime, format === "png" ? undefined : quality));
  if (!blob) throw new ToolError("out-of-memory");
  if (blob.type !== mime) throw new ToolError("encode-unsupported", { format: formatLabel[format] });
  return blob;
}

/** Fill transparent pixels when the target format has no alpha channel. */
export function fillBackground(ctx: CanvasRenderingContext2D, color: string, width: number, height: number) {
  ctx.save();
  ctx.globalCompositeOperation = "destination-over";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

/**
 * Draw `source` scaled to width×height with good quality: large reductions are
 * done in halving steps, which avoids the aliasing of a single big downscale.
 */
export function drawScaled(source: CanvasImageSource, sw: number, sh: number, width: number, height: number): HTMLCanvasElement {
  let current: CanvasImageSource = source;
  let cw = sw;
  let ch = sh;
  const temps: HTMLCanvasElement[] = [];
  while (cw / 2 >= width && ch / 2 >= height && cw * ch <= maxCanvasPixels()) {
    const nw = Math.max(width, Math.floor(cw / 2));
    const nh = Math.max(height, Math.floor(ch / 2));
    const step = createCanvas(nw, nh);
    context2d(step).drawImage(current, 0, 0, cw, ch, 0, 0, nw, nh);
    temps.push(step);
    current = step;
    cw = nw;
    ch = nh;
  }
  const out = createCanvas(width, height);
  context2d(out).drawImage(current, 0, 0, cw, ch, 0, 0, width, height);
  temps.forEach(releaseCanvas);
  return out;
}
