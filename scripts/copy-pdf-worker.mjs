// pdf.js renders pages in a Web Worker. The worker file has to be served as a
// static asset, so copy it from node_modules into /public on every install.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs");
const dest = join(root, "public/vendor/pdf.worker.min.mjs");

if (!existsSync(src)) {
  console.warn("[intera-tools] pdfjs-dist worker not found, skipping copy");
  process.exit(0);
}
mkdirSync(dirname(dest), { recursive: true });
copyFileSync(src, dest);
console.log("[intera-tools] copied pdf.js worker to public/vendor");
