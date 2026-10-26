import { canEncode, context2d, createCanvas, drawScaled, encodeCanvas, fillBackground, loadImage, releaseCanvas } from "./codec";
import { quantizePng } from "./png-quant";

export type VariantId = "png" | "png8" | "webp" | "jpg";

export type Variant = {
  id: VariantId;
  blob: Blob | null;
  /** Set when this browser can't encode the format. */
  unsupported?: boolean;
  /** Whether transparent pixels survive in this format. */
  alpha: boolean;
};

export type Comparison = { width: number; height: number; hasAlpha: boolean; variants: Variant[] };

/** True when any pixel is not fully opaque (checked on a small copy). */
function detectAlpha(source: CanvasImageSource, w: number, h: number): boolean {
  const scale = Math.min(1, 256 / Math.max(w, h));
  const sw = Math.max(1, Math.round(w * scale));
  const sh = Math.max(1, Math.round(h * scale));
  const probe = createCanvas(sw, sh);
  const ctx = context2d(probe);
  ctx.drawImage(source, 0, 0, sw, sh);
  const data = ctx.getImageData(0, 0, sw, sh).data;
  releaseCanvas(probe);
  for (let i = 3; i < data.length; i += 4) if (data[i] < 255) return true;
  return false;
}

/**
 * Encode one image as PNG, PNG-8, WebP and JPG with this browser's encoders so the
 * sizes can be compared. `maxWidth` optionally scales the image down first.
 */
export async function compareFormats(
  file: File,
  { quality, maxWidth }: { quality: number; maxWidth: number | null },
  onStep?: (id: VariantId) => void,
): Promise<Comparison> {
  const img = await loadImage(file);
  let canvas: HTMLCanvasElement | null = null;
  try {
    const scale = maxWidth ? Math.min(1, maxWidth / img.width) : 1;
    const width = Math.max(1, Math.round(img.width * scale));
    const height = Math.max(1, Math.round(img.height * scale));
    canvas = drawScaled(img.source, img.width, img.height, width, height);
    const hasAlpha = detectAlpha(canvas, width, height);
    const variants: Variant[] = [];

    onStep?.("png");
    variants.push({ id: "png", blob: await encodeCanvas(canvas, "png"), alpha: true });
    onStep?.("png8");
    variants.push({ id: "png8", blob: await quantizePng(canvas, 256), alpha: true });
    onStep?.("webp");
    variants.push(
      canEncode("webp")
        ? { id: "webp", blob: await encodeCanvas(canvas, "webp", quality), alpha: true }
        : { id: "webp", blob: null, unsupported: true, alpha: true },
    );
    // JPG last: flattening onto white changes the canvas.
    onStep?.("jpg");
    fillBackground(context2d(canvas), "#ffffff", width, height);
    variants.push({ id: "jpg", blob: await encodeCanvas(canvas, "jpg", quality), alpha: false });

    return { width, height, hasAlpha, variants };
  } finally {
    if (canvas) releaseCanvas(canvas);
    img.release();
  }
}
