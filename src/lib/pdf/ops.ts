import type { PDFDocument as PDFDocumentType } from "pdf-lib";
import { ToolError } from "../errors";
import { readBytes } from "../files";

type PdfLib = typeof import("pdf-lib");
let loader: Promise<PdfLib> | null = null;
export function getPdfLib(): Promise<PdfLib> {
  loader ??= import("pdf-lib");
  return loader;
}

/** Load a PDF for editing, mapping failures to explainable errors. */
export async function loadPdf(source: Blob | Uint8Array): Promise<PDFDocumentType> {
  const { PDFDocument, EncryptedPDFError } = await getPdfLib();
  const bytes = source instanceof Uint8Array ? source : await readBytes(source);
  try {
    return await PDFDocument.load(bytes, { updateMetadata: false });
  } catch (error) {
    if (error instanceof EncryptedPDFError) throw new ToolError("encrypted");
    throw new ToolError("damaged");
  }
}

export async function savePdf(doc: PDFDocumentType): Promise<Blob> {
  const bytes = await doc.save({ useObjectStreams: true });
  return new Blob([bytes as BlobPart], { type: "application/pdf" });
}

async function newDoc(): Promise<PDFDocumentType> {
  const { PDFDocument } = await getPdfLib();
  const doc = await PDFDocument.create();
  doc.setProducer("Intera Tools");
  doc.setCreator("Intera Tools (intera.tools)");
  return doc;
}

/** One entry of an output document: a page from a source (or a blank page) plus extra rotation. */
export type PageRef =
  | { kind: "page"; source: number; index: number; rotation: number }
  | { kind: "blank"; width: number; height: number; rotation: number };

/**
 * Build a new PDF from page references across several loaded sources.
 * Pages are copied (not re-rendered), so text and quality are preserved.
 */
export async function assemble(sources: PDFDocumentType[], refs: PageRef[]): Promise<Blob> {
  const { degrees } = await getPdfLib();
  const out = await newDoc();
  // Copy each source's needed pages in one call — much faster than page by page.
  const needed = new Map<number, number[]>();
  refs.forEach((r) => {
    if (r.kind === "page") needed.set(r.source, [...(needed.get(r.source) ?? []), r.index]);
  });
  const copied = new Map<string, Awaited<ReturnType<PDFDocumentType["copyPages"]>>[number]>();
  for (const [source, indices] of needed) {
    const unique = [...new Set(indices)];
    const pages = await out.copyPages(sources[source], unique);
    unique.forEach((index, i) => copied.set(`${source}:${index}`, pages[i]));
  }
  const used = new Set<string>();
  for (const ref of refs) {
    if (ref.kind === "blank") {
      const page = out.addPage([ref.width, ref.height]);
      if (ref.rotation) page.setRotation(degrees(ref.rotation % 360));
      continue;
    }
    const key = `${ref.source}:${ref.index}`;
    // The same page used twice needs its own copy.
    let page = copied.get(key)!;
    if (used.has(key)) [page] = await out.copyPages(sources[ref.source], [ref.index]);
    used.add(key);
    if (ref.rotation) page.setRotation(degrees((page.getRotation().angle + ref.rotation) % 360));
    out.addPage(page);
  }
  return savePdf(out);
}

export function allPages(doc: PDFDocumentType, source = 0): PageRef[] {
  return doc.getPageIndices().map((index) => ({ kind: "page", source, index, rotation: 0 }));
}

/* ------------------------------------------------------------- page ranges */

/** Parse "1-3, 5, 8-" style ranges (1-based, inclusive) into zero-based index groups. */
export function parseRanges(input: string, pageCount: number): number[][] | null {
  const groups: number[][] = [];
  // "1 - 3" means 1-3: join dashes to their numbers before splitting on spaces.
  const parts = input
    .replace(/\s*([-–~])\s*/g, "$1")
    .split(/[,;\s]+/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (!parts.length) return null;
  for (const part of parts) {
    const m = /^(\d+)?\s*[-–~]\s*(\d+)?$|^(\d+)$/.exec(part);
    if (!m) return null;
    let start: number;
    let end: number;
    if (m[3]) start = end = Number(m[3]);
    else {
      start = m[1] ? Number(m[1]) : 1;
      end = m[2] ? Number(m[2]) : pageCount;
    }
    if (start < 1 || end > pageCount || start > end) return null;
    groups.push(Array.from({ length: end - start + 1 }, (_, i) => start - 1 + i));
  }
  return groups;
}

/* ------------------------------------------------------------- images → PDF */

export type ImagesToPdfOptions = {
  pageSize: "fit" | "a4" | "letter";
  orientation: "auto" | "portrait" | "landscape";
  margin: "none" | "small" | "large";
};

const PAGE_SIZES = { a4: [595.28, 841.89], letter: [612, 792] } as const;
const MARGINS = { none: 0, small: 20, large: 48 } as const;

export type EmbeddableImage = { bytes: Uint8Array; type: "jpg" | "png"; width: number; height: number };

export async function addImagePage(doc: PDFDocumentType, image: EmbeddableImage, o: ImagesToPdfOptions) {
  const embedded = image.type === "jpg" ? await doc.embedJpg(image.bytes) : await doc.embedPng(image.bytes);
  // Images are placed at 72 dpi-equivalent points so "fit" pages match pixel size.
  const iw = image.width;
  const ih = image.height;
  const margin = MARGINS[o.margin];
  let pw: number;
  let ph: number;
  if (o.pageSize === "fit") {
    pw = iw + margin * 2;
    ph = ih + margin * 2;
  } else {
    const [w, h] = PAGE_SIZES[o.pageSize];
    const landscape = o.orientation === "landscape" || (o.orientation === "auto" && iw > ih);
    [pw, ph] = landscape ? [h, w] : [w, h];
  }
  const page = doc.addPage([pw, ph]);
  const scale = o.pageSize === "fit" ? 1 : Math.min((pw - margin * 2) / iw, (ph - margin * 2) / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  page.drawImage(embedded, { x: (pw - dw) / 2, y: (ph - dh) / 2, width: dw, height: dh });
}

export async function imagesToPdf(images: EmbeddableImage[], o: ImagesToPdfOptions): Promise<Blob> {
  const doc = await newDoc();
  for (const image of images) await addImagePage(doc, image, o);
  return savePdf(doc);
}
