import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";

// Shared by the Cloudflare Worker (worker/index.ts) and the dev proxy (src/proxy.dev.ts).

function preferredLocale(request: Request): Locale {
  const cookie = request.headers.get("cookie") ?? "";
  const saved = /(?:^|;\s*)tn_locale=([^;]+)/.exec(cookie)?.[1];
  if (saved && isLocale(saved)) return saved;
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { lang } of ranked) if (isLocale(lang)) return lang;
  return defaultLocale;
}

/**
 * Every page lives under /{locale}. For a path without one (and without a file
 * extension), returns a redirect to the visitor's saved or browser language.
 */
export function localeRedirect(request: Request): Response | null {
  const url = new URL(request.url);
  const { pathname } = url;
  const first = pathname.split("/")[1];
  if (locales.some((l) => l === first) || pathname.startsWith("/api/") || /\.[^/]+$/.test(pathname)) return null;

  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname.replace(/\/$/, "")}`;
  return new Response(null, {
    status: 307,
    headers: { location: url.toString(), vary: "Cookie, Accept-Language", "cache-control": "private, no-store" },
  });
}
