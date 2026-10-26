// Anonymous usage events from src/lib/analytics.ts. Only whitelisted fields are
// kept; the IP address and user agent are deliberately not recorded.

const EVENTS = new Set([
  "tool_view",
  "guide_view",
  "files_added",
  "files_rejected",
  "process_start",
  "process_success",
  "process_error",
  "process_cancel",
  "download",
  "continue_with",
  "search",
  "js_error",
]);
const STRING_PROPS = ["tool", "code", "kind", "target", "size", "detail"] as const;
const NUMBER_PROPS = ["count", "durationMs"] as const;
const MAX_BODY = 8 * 1024;

function clean(raw: unknown): Record<string, unknown> | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.e !== "string" || !EVENTS.has(r.e)) return null;
  const p = (r.p && typeof r.p === "object" ? r.p : {}) as Record<string, unknown>;
  const props: Record<string, unknown> = {};
  for (const key of STRING_PROPS) {
    if (typeof p[key] === "string") props[key] = (p[key] as string).slice(0, key === "detail" ? 160 : 40);
  }
  for (const key of NUMBER_PROPS) {
    if (typeof p[key] === "number" && Number.isFinite(p[key])) props[key] = Math.round(p[key] as number);
  }
  return {
    ts: new Date().toISOString(),
    event: r.e,
    locale: typeof r.l === "string" ? r.l.slice(0, 8) : undefined,
    device: r.d === "mobile" || r.d === "tablet" || r.d === "desktop" ? r.d : undefined,
    ...props,
  };
}

/** Validates a batch and passes the cleaned events to `record`. */
export async function handleEvents(
  request: Request,
  record: (events: Record<string, unknown>[]) => void | Promise<void>,
): Promise<Response> {
  const text = await request.text();
  if (text.length > MAX_BODY) return new Response(null, { status: 413 });
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return new Response(null, { status: 400 });
  }
  const items = (Array.isArray(parsed) ? parsed : [parsed])
    .slice(0, 25)
    .map(clean)
    .filter((i): i is Record<string, unknown> => i !== null);
  if (items.length) await record(items);
  return new Response(null, { status: 204 });
}
