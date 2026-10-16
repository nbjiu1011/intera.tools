import { ToolError, type ErrorCode } from "./errors";

export type AcceptSpec = {
  /** MIME types; matched exactly. */
  mimes: string[];
  /** Lower-case extensions without dot; used when the browser reports no MIME. */
  exts: string[];
  /** Human readable list for the dropzone, e.g. "JPG, PNG, WebP". */
  label: string;
};

export const MB = 1024 * 1024;

export const ACCEPT = {
  compressible: {
    mimes: ["image/jpeg", "image/png", "image/webp"],
    exts: ["jpg", "jpeg", "jfif", "png", "webp"],
    label: "JPG, PNG, WebP",
  },
  rasterEditable: {
    mimes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/bmp", "image/avif"],
    exts: ["jpg", "jpeg", "jfif", "png", "webp", "gif", "bmp", "avif"],
    label: "JPG, PNG, WebP, GIF, BMP, AVIF",
  },
  anyImage: {
    mimes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/bmp", "image/avif", "image/svg+xml", "image/heic", "image/heif"],
    exts: ["jpg", "jpeg", "jfif", "png", "webp", "gif", "bmp", "avif", "svg", "heic", "heif"],
    label: "JPG, PNG, WebP, GIF, BMP, AVIF, SVG",
  },
  pdf: { mimes: ["application/pdf"], exts: ["pdf"], label: "PDF" },
} satisfies Record<string, AcceptSpec>;

export function extOf(name: string): string {
  const i = name.lastIndexOf(".");
  return i < 0 ? "" : name.slice(i + 1).toLowerCase();
}

export function baseName(name: string): string {
  const i = name.lastIndexOf(".");
  return i <= 0 ? name : name.slice(0, i);
}

export function withExt(name: string, ext: string, suffix = ""): string {
  return `${baseName(name)}${suffix}.${ext}`;
}

export function matchesAccept(file: File, accept: AcceptSpec): boolean {
  if (file.type && accept.mimes.includes(file.type)) return true;
  return accept.exts.includes(extOf(file.name));
}

export function acceptAttr(accept: AcceptSpec): string {
  return [...accept.mimes, ...accept.exts.map((e) => `.${e}`)].join(",");
}

export type Rejection = { name: string; code: ErrorCode; vars?: Record<string, string | number> };

export function validateFiles(
  files: File[],
  { accept, maxSize, maxFiles, existing }: { accept: AcceptSpec; maxSize: number; maxFiles: number; existing: number },
): { accepted: File[]; rejected: Rejection[] } {
  const accepted: File[] = [];
  const rejected: Rejection[] = [];
  for (const file of files) {
    if (!matchesAccept(file, accept)) rejected.push({ name: file.name, code: "unsupported-type" });
    else if (file.size === 0) rejected.push({ name: file.name, code: "empty-file" });
    else if (file.size > maxSize) rejected.push({ name: file.name, code: "too-large", vars: { size: `${Math.round(maxSize / MB)} MB` } });
    else if (existing + accepted.length >= maxFiles) rejected.push({ name: file.name, code: "too-many", vars: { count: maxFiles } });
    else accepted.push(file);
  }
  return { accepted, rejected };
}

let counter = 0;
export function uid(prefix = "f"): string {
  counter += 1;
  return `${prefix}${Date.now().toString(36)}${counter.toString(36)}`;
}

export async function readBytes(file: Blob): Promise<Uint8Array> {
  return new Uint8Array(await file.arrayBuffer());
}

/** Throws if the operation was cancelled. */
export function throwIfAborted(signal?: AbortSignal) {
  if (signal?.aborted) throw new DOMException("Cancelled", "AbortError");
}

export function isAbort(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

/** Give the browser a chance to paint between heavy steps. */
export function nextFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 0)));
}

export { ToolError };
