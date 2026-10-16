import { withExt } from "../files";
import {
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
import { quantizePng } from "./png-quant";

export type ImageResult = {
  blob: Blob;
  name: string;
  width: number;
  height: number;
  /** True when the original was returned because re-encoding made it bigger. */
  keptOriginal?: boolean;
};

const extFor: Record<ImageFormat, string> = { jpg: "jpg", png: "png", webp: "webp" };

async function finish(
  canvas: HTMLCanvasElement,
  format: ImageFormat,
  sourceName: string,
  suffix: string,
  quality = 0.92,
): Promise<ImageResult> {
  const { width, height } = canvas;
  try {
    const blob = await encodeCanvas(canvas, format, quality);
    return { blob, name: withExt(sourceName, extFor[format], suffix), width, height };
  } finally {
    releaseCanvas(canvas);
  }
}

/* ------------------------------------------------------------------ compress */

export type CompressLevel = "light" | "balanced" | "strong";
export type CompressOptions = {
  level: CompressLevel;
  /** 0.1–0.95; overrides the level for JPG/WebP when set. */
  quality: number | null;
  /** 16–256; overrides the level for PNG when set. */
  pngColors: number | null;
  toWebp: boolean;
};

export const compressPresets: Record<CompressLevel, { quality: number; pngColors: number }> = {
  light: { quality: 0.85, pngColors: 256 },
  balanced: { quality: 0.72, pngColors: 160 },
  strong: { quality: 0.55, pngColors: 64 },
};

export async function compressImage(file: File, options: CompressOptions): Promise<ImageResult> {
  const source = formatOfFile(file) ?? "png";
  const format: ImageFormat = options.toWebp ? "webp" : source;
  const preset = compressPresets[options.level];
  const img = await loadImage(file);
  try {
    const canvas = createCanvas(img.width, img.height);
    const ctx = context2d(canvas);
    ctx.drawImage(img.source, 0, 0, img.width, img.height);
    let result: ImageResult;
    if (format === "png") {
      const blob = await quantizePng(canvas, options.pngColors ?? preset.pngColors);
      releaseCanvas(canvas);
      result = { blob, name: file.name, width: img.width, height: img.height };
    } else {
      if (format === "jpg") fillBackground(ctx, "#ffffff", img.width, img.height);
      result = await finish(canvas, format, file.name, "", options.quality ?? preset.quality);
      if (format === source) result.name = file.name;
    }
    if (format === source && result.blob.size >= file.size) {
      return { blob: file, name: file.name, width: img.width, height: img.height, keptOriginal: true };
    }
    return result;
  } finally {
    img.release();
  }
}

/* -------------------------------------------------------------------- resize */

export type ResizeOptions = {
  mode: "pixels" | "percent";
  width: number | null;
  height: number | null;
  lockRatio: boolean;
  percent: number;
  noEnlarge: boolean;
};

export function targetSize(w: number, h: number, o: ResizeOptions): { width: number; height: number } {
  let width = w;
  let height = h;
  if (o.mode === "percent") {
    width = (w * o.percent) / 100;
    height = (h * o.percent) / 100;
  } else if (o.lockRatio) {
    if (o.width) {
      width = o.width;
      height = (o.width * h) / w;
    } else if (o.height) {
      height = o.height;
      width = (o.height * w) / h;
    }
  } else {
    width = o.width || w;
    height = o.height || h;
  }
  if (o.noEnlarge && (width > w || height > h)) {
    const scale = Math.min(w / width, h / height);
    width *= scale;
    height *= scale;
  }
  return { width: Math.max(1, Math.round(width)), height: Math.max(1, Math.round(height)) };
}

export async function resizeImage(file: File, options: ResizeOptions): Promise<ImageResult> {
  const img = await loadImage(file);
  try {
    const { width, height } = targetSize(img.width, img.height, options);
    const canvas = drawScaled(img.source, img.width, img.height, width, height);
    const format = keepFormat(file);
    if (format === "jpg") fillBackground(context2d(canvas), "#ffffff", width, height);
    return await finish(canvas, format, file.name, `-${width}x${height}`);
  } finally {
    img.release();
  }
}

/* ---------------------------------------------------------------------- crop */

export type CropRect = { x: number; y: number; width: number; height: number };

export async function cropImage(file: File, rect: CropRect): Promise<ImageResult> {
  const img = await loadImage(file);
  try {
    const x = Math.max(0, Math.round(rect.x));
    const y = Math.max(0, Math.round(rect.y));
    const width = Math.min(img.width - x, Math.round(rect.width));
    const height = Math.min(img.height - y, Math.round(rect.height));
    const canvas = createCanvas(width, height);
    const ctx = context2d(canvas);
    ctx.drawImage(img.source, x, y, width, height, 0, 0, width, height);
    const format = keepFormat(file);
    if (format === "jpg") fillBackground(ctx, "#ffffff", width, height);
    return await finish(canvas, format, file.name, "-cropped", 0.95);
  } finally {
    img.release();
  }
}

/* ------------------------------------------------------------------- convert */

export type ConvertOptions = { to: ImageFormat; quality: number; background: string };

export async function convertImage(file: File, options: ConvertOptions): Promise<ImageResult> {
  const img = await loadImage(file);
  try {
    const canvas = createCanvas(img.width, img.height);
    const ctx = context2d(canvas);
    ctx.drawImage(img.source, 0, 0, img.width, img.height);
    if (options.to === "jpg") fillBackground(ctx, options.background, img.width, img.height);
    return await finish(canvas, options.to, file.name, "", options.quality);
  } finally {
    img.release();
  }
}

/* -------------------------------------------------------------------- rotate */

export type Transform = { rotation: 0 | 90 | 180 | 270; flipH: boolean; flipV: boolean };

export const identity: Transform = { rotation: 0, flipH: false, flipV: false };

export function isIdentity(t: Transform) {
  return t.rotation === 0 && !t.flipH && !t.flipV;
}

/** Draw `source` into a new canvas with rotation (clockwise) and flips applied. */
export function transformToCanvas(source: CanvasImageSource, w: number, h: number, t: Transform): HTMLCanvasElement {
  const swap = t.rotation === 90 || t.rotation === 270;
  const canvas = createCanvas(swap ? h : w, swap ? w : h);
  const ctx = context2d(canvas);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((t.rotation * Math.PI) / 180);
  ctx.scale(t.flipH ? -1 : 1, t.flipV ? -1 : 1);
  ctx.drawImage(source, -w / 2, -h / 2, w, h);
  return canvas;
}

export async function rotateImage(file: File, t: Transform): Promise<ImageResult> {
  const img = await loadImage(file);
  try {
    const canvas = transformToCanvas(img.source, img.width, img.height, t);
    const format = keepFormat(file);
    if (format === "jpg") fillBackground(context2d(canvas), "#ffffff", canvas.width, canvas.height);
    return await finish(canvas, format, file.name, "-rotated", 0.95);
  } finally {
    img.release();
  }
}

/* ----------------------------------------------------------------- watermark */

export type WatermarkPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "middle-left"
  | "center"
  | "middle-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type WatermarkOptions = {
  type: "text" | "image";
  text: string;
  font: "sans" | "serif" | "mono";
  bold: boolean;
  /** Text height as % of the image's shorter side. */
  size: number;
  color: string;
  /** 0–100 */
  opacity: number;
  /** degrees, -90…90 */
  rotation: number;
  position: WatermarkPosition;
  tile: boolean;
  /** Logo width as % of the image width. */
  logoSize: number;
};

const fontStacks = {
  sans: '"Inter", "Pretendard Variable", "Apple SD Gothic Neo", Arial, sans-serif',
  serif: 'Georgia, "Noto Serif KR", "AppleMyungjo", "Times New Roman", serif',
  mono: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
};

/** Shared by the live preview and the export so both look identical. */
export function drawWatermark(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  o: WatermarkOptions,
  logo: { source: CanvasImageSource; width: number; height: number } | null,
) {
  const short = Math.min(width, height);
  const margin = short * 0.04;
  let stampW: number;
  let stampH: number;
  let draw: () => void;

  if (o.type === "text") {
    const text = o.text.trim();
    if (!text) return;
    const fontSize = Math.max(8, (short * o.size) / 100);
    ctx.font = `${o.bold ? 700 : 500} ${fontSize}px ${fontStacks[o.font]}`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    stampW = ctx.measureText(text).width;
    stampH = fontSize * 1.2;
    draw = () => {
      ctx.fillStyle = o.color;
      ctx.fillText(text, 0, 0);
    };
  } else {
    if (!logo) return;
    stampW = (width * o.logoSize) / 100;
    stampH = (stampW * logo.height) / logo.width;
    draw = () => ctx.drawImage(logo.source, -stampW / 2, -stampH / 2, stampW, stampH);
  }

  const angle = (o.rotation * Math.PI) / 180;
  // Bounding box of the rotated stamp, used to keep it inside the image.
  const bw = Math.abs(stampW * Math.cos(angle)) + Math.abs(stampH * Math.sin(angle));
  const bh = Math.abs(stampW * Math.sin(angle)) + Math.abs(stampH * Math.cos(angle));

  ctx.save();
  ctx.globalAlpha = o.opacity / 100;
  const stampAt = (cx: number, cy: number) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    draw();
    ctx.restore();
  };

  if (o.tile) {
    const stepX = bw + Math.max(stampW * 0.6, short * 0.08);
    const stepY = bh + Math.max(stampH * 2.2, short * 0.08);
    let row = 0;
    for (let y = stepY / 2; y < height + stepY; y += stepY, row++) {
      const offset = row % 2 ? stepX / 2 : 0;
      for (let x = stepX / 2 - offset; x < width + stepX; x += stepX) stampAt(x, y);
    }
  } else {
    const [v, h] = o.position === "center" ? ["middle", "center"] : o.position.split("-");
    const cx = h === "left" ? margin + bw / 2 : h === "right" ? width - margin - bw / 2 : width / 2;
    const cy = v === "top" ? margin + bh / 2 : v === "bottom" ? height - margin - bh / 2 : height / 2;
    stampAt(cx, cy);
  }
  ctx.restore();
}

export async function watermarkImage(
  file: File,
  options: WatermarkOptions,
  logo: { source: CanvasImageSource; width: number; height: number } | null,
): Promise<ImageResult> {
  const img = await loadImage(file);
  try {
    const canvas = createCanvas(img.width, img.height);
    const ctx = context2d(canvas);
    ctx.drawImage(img.source, 0, 0, img.width, img.height);
    drawWatermark(ctx, img.width, img.height, options, logo);
    const format = keepFormat(file);
    if (format === "jpg") fillBackground(ctx, "#ffffff", img.width, img.height);
    return await finish(canvas, format, file.name, "-watermarked", 0.92);
  } finally {
    img.release();
  }
}
