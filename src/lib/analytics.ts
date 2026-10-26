// Anonymous, first-party usage events. Never send file names, file contents or
// text the user typed. Events are batched and delivered with sendBeacon.

export type AnalyticsEvent =
  | "tool_view"
  | "guide_view"
  | "files_added"
  | "files_rejected"
  | "process_start"
  | "process_success"
  | "process_error"
  | "process_cancel"
  | "download"
  | "continue_with"
  | "search"
  | "js_error";

export type EventProps = {
  tool?: string;
  count?: number;
  /** Total input size in bytes; bucketed before sending. */
  bytes?: number;
  durationMs?: number;
  code?: string;
  kind?: string;
  target?: string;
  /** Free-form short detail for js_error only (message, truncated). */
  detail?: string;
};

type Payload = {
  e: AnalyticsEvent;
  t: number;
  l: string;
  d: "mobile" | "tablet" | "desktop";
  p: Omit<EventProps, "bytes"> & { size?: string };
};

const queue: Payload[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;

function sizeBucket(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  if (mb < 1) return "<1MB";
  if (mb < 5) return "1-5MB";
  if (mb < 20) return "5-20MB";
  if (mb < 100) return "20-100MB";
  return "100MB+";
}

function deviceClass(): Payload["d"] {
  const w = window.innerWidth;
  return w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop";
}

function flush() {
  timer = null;
  if (!queue.length) return;
  const body = JSON.stringify(queue.splice(0, queue.length));
  try {
    if (!navigator.sendBeacon?.("/api/events", new Blob([body], { type: "application/json" }))) {
      void fetch("/api/events", { method: "POST", body, keepalive: true, headers: { "content-type": "application/json" } });
    }
  } catch {
    // Analytics must never break a tool.
  }
}

export function track(event: AnalyticsEvent, props: EventProps = {}) {
  if (typeof window === "undefined") return;
  if (navigator.doNotTrack === "1" || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return;
  const { bytes, ...rest } = props;
  queue.push({
    e: event,
    t: Date.now(),
    l: document.documentElement.lang || "en",
    d: deviceClass(),
    p: { ...rest, ...(bytes != null ? { size: sizeBucket(bytes) } : {}) },
  });
  if (queue.length >= 10) flush();
  else if (!timer) timer = setTimeout(flush, 2000);
}

if (typeof window !== "undefined") {
  window.addEventListener("pagehide", flush);
  document.addEventListener("visibilitychange", () => document.visibilityState === "hidden" && flush());
}
