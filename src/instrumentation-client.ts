import { track } from "@/lib/analytics";

// Report uncaught errors (message only, truncated) so broken tools show up in the usage report.
try {
  const seen = new Set<string>();
  const report = (message: string) => {
    const detail = message.slice(0, 160);
    if (seen.has(detail) || seen.size > 20) return;
    seen.add(detail);
    const tool = location.pathname.split("/")[2] || "home";
    track("js_error", { tool, detail });
  };
  window.addEventListener("error", (event) => report(String(event.message || "error")));
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason as { message?: string } | undefined;
    report(String(reason?.message ?? reason ?? "unhandledrejection"));
  });
} catch {
  // ignore
}
