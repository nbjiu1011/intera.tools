const TOPICS = new Set(["bug", "feature", "privacy", "business", "other"]);
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export type ContactEntry = { ts: string; name: string; email: string; topic: string; locale: string; message: string };

type Options = {
  webhook?: string;
  /** Used when no webhook is configured (e.g. a local file in development). */
  fallback?: (entry: ContactEntry) => Promise<void>;
};

export async function handleContact(request: Request, { webhook, fallback }: Options): Promise<Response> {
  const ip =
    request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot: real users never fill the hidden "website" field.
  if (typeof body.website === "string" && body.website.trim()) return Response.json({ ok: true });

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  const topic = typeof body.topic === "string" && TOPICS.has(body.topic) ? body.topic : "other";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "";
  const locale = typeof body.locale === "string" ? body.locale.slice(0, 5) : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const entry: ContactEntry = { ts: new Date().toISOString(), name, email, topic, locale, message };
  try {
    if (webhook) {
      const text = `New Intera Tools message [${topic}] from ${name || "(no name)"} <${email}> (${locale})\n\n${message}`;
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        // `text` for Slack, `content` (max 2000 chars, no @mentions) for Discord.
        body: JSON.stringify({ text, content: text.slice(0, 2000), allowed_mentions: { parse: [] }, ...entry }),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
    } else if (fallback) {
      await fallback(entry);
    } else {
      throw new Error("CONTACT_WEBHOOK_URL is not set");
    }
  } catch (error) {
    console.error("[contact] delivery failed", error);
    // The form then shows the contact email address instead.
    return Response.json({ ok: false, error: "delivery" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
