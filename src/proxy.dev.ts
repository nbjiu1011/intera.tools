import type { NextRequest } from "next/server";
import { localeRedirect } from "@/server/locale";

// Development only (`*.dev.ts` is a page extension in `next dev`, see next.config.ts).
// In production the static export has no proxy; worker/index.ts does the same redirect.
export function proxy(request: NextRequest) {
  return localeRedirect(request) ?? undefined;
}

export const config = {
  // Skip API routes, Next internals and any file with an extension (assets, sitemap.xml, robots.txt…).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
