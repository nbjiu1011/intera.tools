import { readBytes } from "../files";
import type { EmbeddableImage } from "../pdf/ops";
import { context2d, createCanvas, encodeCanvas, formatOfFile, loadImage, releaseCanvas } from "./codec";

/** EXIF orientation of a JPEG (1 = normal). Returns 1 when unknown. */
export function jpegOrientation(bytes: Uint8Array): number {
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) return 1;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let offset = 2;
  while (offset + 4 < view.byteLength) {
    const marker = view.getUint16(offset);
    const size = view.getUint16(offset + 2);
    if (marker === 0xffe1 && view.getUint32(offset + 4) === 0x45786966) {
      const tiff = offset + 10;
      const little = view.getUint16(tiff) === 0x4949;
      const ifd = tiff + view.getUint32(tiff + 4, little);
      const entries = view.getUint16(ifd, little);
      for (let i = 0; i < entries; i++) {
        const entry = ifd + 2 + i * 12;
        if (entry + 10 > view.byteLength) break;
        if (view.getUint16(entry, little) === 0x0112) return view.getUint16(entry + 8, little);
      }
      return 1;
    }
    if ((marker & 0xff00) !== 0xff00) break;
    offset += 2 + size;
  }
  return 1;
}

/**
 * Prepare an image for pdf-lib. Upright JPEGs are embedded byte-for-byte (no
 * re-compression); PNGs stay lossless; everything else (and rotated JPEGs) is
 * drawn upright and encoded as PNG/JPEG first.
 */
export async function toEmbeddable(file: File): Promise<EmbeddableImage> {
  const format = formatOfFile(file);
  const img = await loadImage(file);
  try {
    if (format === "jpg" || format === "png") {
      const bytes = await readBytes(file);
      if (format === "png" || jpegOrientation(bytes) === 1) {
        return { bytes, type: format, width: img.width, height: img.height };
      }
    }
    const canvas = createCanvas(img.width, img.height);
    context2d(canvas).drawImage(img.source, 0, 0, img.width, img.height);
    const asJpeg = format === "jpg";
    const blob = await encodeCanvas(canvas, asJpeg ? "jpg" : "png", 0.92);
    releaseCanvas(canvas);
    return { bytes: await readBytes(blob), type: asJpeg ? "jpg" : "png", width: img.width, height: img.height };
  } finally {
    img.release();
  }
}
