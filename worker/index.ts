import { handleContact } from "../src/server/contact";
import { handleEvents } from "../src/server/events";
import { localeRedirect } from "../src/server/locale";

// Cloudflare Worker for the static export in ./out (see wrangler.jsonc).
// Cloudflare serves every existing file (pages, scripts, images) directly and
// for free; this code only runs for /api/* and for URLs with no matching file.

interface Env {
  ASSETS: { fetch(input: Request | URL | string, init?: RequestInit): Promise<Response> };
  /** Secret: Slack or Discord incoming webhook for the contact form. */
  CONTACT_WEBHOOK_URL?: string;
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact" || url.pathname === "/api/events") {
      if (request.method !== "POST") return new Response(null, { status: 405, headers: { allow: "POST" } });
      if (url.pathname === "/api/contact") return handleContact(request, { webhook: env.CONTACT_WEBHOOK_URL });
      // Each event becomes one line in Workers Logs (dashboard → Observability).
      return handleEvents(request, (events) => {
        for (const event of events) console.log(JSON.stringify({ type: "usage", ...event }));
      });
    }

    // "/" and other paths without a language prefix → /{locale}/…
    const redirect = localeRedirect(request);
    if (redirect) return redirect;

    const page = await env.ASSETS.fetch(new URL("/404.html", url));
    return new Response(page.body, { status: 404, headers: page.headers });
  },
};

export default worker;
