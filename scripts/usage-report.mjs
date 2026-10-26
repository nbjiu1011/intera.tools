// Summarize anonymous usage events written by /api/events.
// usage: npm run stats [-- path/to/events.ndjson] [--days 30]
import { createReadStream, existsSync } from "node:fs";
import { join } from "node:path";
import { createInterface } from "node:readline";

const args = process.argv.slice(2);
const daysIdx = args.indexOf("--days");
const days = daysIdx >= 0 ? Number(args[daysIdx + 1]) : 30;
const file = args.find((a, i) => !a.startsWith("--") && i !== daysIdx + 1) ?? join(process.cwd(), "data", "events.ndjson");

if (!existsSync(file)) {
  console.log(`No events yet (${file}).`);
  process.exit(0);
}

const since = Date.now() - days * 86400_000;
const byTool = new Map();
const errors = new Map();
const devices = new Map();
const locales = new Map();
const jsErrors = new Map();
const guideViews = new Map();
const bump = (m, k, n = 1) => m.set(k, (m.get(k) ?? 0) + n);
let total = 0;

for await (const line of createInterface({ input: createReadStream(file) })) {
  if (!line.trim()) continue;
  let e;
  try {
    e = JSON.parse(line);
  } catch {
    continue;
  }
  if (Date.parse(e.ts) < since) continue;
  total++;
  if (e.event === "guide_view") {
    bump(guideViews, e.tool ?? "?");
    continue;
  }
  const t = e.tool ?? "-";
  if (!byTool.has(t)) byTool.set(t, { views: 0, starts: 0, success: 0, errors: 0, downloads: 0, cancels: 0, ms: [] });
  const s = byTool.get(t);
  if (e.event === "tool_view") {
    s.views++;
    bump(devices, e.device ?? "?");
    bump(locales, e.locale ?? "?");
  }
  if (e.event === "process_start") s.starts++;
  if (e.event === "process_success") {
    s.success++;
    if (e.durationMs) s.ms.push(e.durationMs);
  }
  if (e.event === "process_error") {
    s.errors++;
    bump(errors, `${t} · ${e.code}`);
  }
  if (e.event === "process_cancel") s.cancels++;
  if (e.event === "download") s.downloads++;
  if (e.event === "files_rejected") bump(errors, `${t} · rejected:${e.code}`);
  if (e.event === "js_error") bump(jsErrors, `${t} · ${e.detail}`);
}

const pct = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : "—");
const median = (xs) => (xs.length ? xs.sort((a, b) => a - b)[Math.floor(xs.length / 2)] : 0);

console.log(`\nIntera Tools usage — last ${days} days — ${total} events\n`);
console.table(
  [...byTool.entries()]
    .filter(([t]) => t !== "-")
    .sort((a, b) => b[1].views - a[1].views)
    .map(([tool, s]) => ({
      tool,
      views: s.views,
      runs: s.starts,
      "success rate": pct(s.success, s.starts),
      errors: s.errors,
      cancels: s.cancels,
      downloads: s.downloads,
      "median ms": median(s.ms),
    })),
);
const top = (m, n = 15) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => ({ key: k, count: v }));
for (const [title, rows] of [
  ["Errors and rejections", top(errors)],
  ["Script errors", top(jsErrors, 10)],
  ["Guide views", top(guideViews, 20)],
  ["Devices", top(devices)],
  ["Locales", top(locales)],
]) {
  console.log(title);
  console.table(rows);
}
