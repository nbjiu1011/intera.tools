import type { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";
import { ToolError } from "../errors";

type PdfJs = typeof import("pdfjs-dist/legacy/build/pdf.mjs");
let loader: Promise<PdfJs> | null = null;

/** Load pdf.js on demand (legacy build for older mobile browsers). */
export function getPdfJs(): Promise<PdfJs> {
  loader ??= import("pdfjs-dist/legacy/build/pdf.mjs").then((mod) => {
    mod.GlobalWorkerOptions.workerSrc = "/vendor/pdf.worker.min.mjs";
    return mod;
  });
  return loader;
}

export type { PDFDocumentProxy };

/** Open a PDF for rendering. The bytes are copied because pdf.js transfers them to its worker. */
export async function openPdf(bytes: Uint8Array): Promise<PDFDocumentProxy> {
  const pdfjs = await getPdfJs();
  try {
    return await pdfjs.getDocument({ data: bytes.slice(), isEvalSupported: false }).promise;
  } catch (error) {
    const name = (error as { name?: string })?.name;
    if (name === "PasswordException") throw new ToolError("encrypted");
    throw new ToolError("damaged");
  }
}

/**
 * Render one page (1-based) to a canvas. `extraRotation` is added to the page's own
 * rotation so previews match what the saved PDF will look like.
 */
export async function renderPage(
  doc: PDFDocumentProxy,
  pageNumber: number,
  { scale, maxWidth, extraRotation = 0 }: { scale?: number; maxWidth?: number; extraRotation?: number },
): Promise<HTMLCanvasElement> {
  const page = await doc.getPage(pageNumber);
  const rotation = (page.rotate + extraRotation + 360) % 360;
  const base = page.getViewport({ scale: 1, rotation });
  const s = scale ?? (maxWidth ? maxWidth / base.width : 1);
  const viewport = page.getViewport({ scale: s, rotation });
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(viewport.width));
  canvas.height = Math.max(1, Math.floor(viewport.height));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new ToolError("out-of-memory");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvas, canvasContext: ctx, viewport }).promise;
  page.cleanup();
  return canvas;
}

/** Small thumbnail as an object URL. */
export async function renderThumbnail(doc: PDFDocumentProxy, pageNumber: number, width = 240): Promise<string> {
  const ratio = typeof window === "undefined" ? 1 : Math.min(2, window.devicePixelRatio || 1);
  const canvas = await renderPage(doc, pageNumber, { maxWidth: width * ratio });
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.8));
  canvas.width = canvas.height = 0;
  if (!blob) throw new ToolError("out-of-memory");
  return URL.createObjectURL(blob);
}
