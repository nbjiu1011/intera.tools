import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import type { NextConfig } from "next";

// Production is a static export (./out) served by Cloudflare; worker/index.ts adds
// the language redirect and the /api routes. Response headers live in public/_headers.
export default function config(phase: string): NextConfig {
  const dev = phase === PHASE_DEVELOPMENT_SERVER;
  return {
    // Proxy and POST route handlers would error in `next dev` under "export".
    output: dev ? undefined : "export",
    // `next dev` also picks up *.dev.ts files (src/proxy.dev.ts, app/api/*/route.dev.ts)
    // so the redirect and API routes work locally; the export build ignores them.
    pageExtensions: dev ? ["dev.ts", "tsx", "ts"] : ["tsx", "ts"],
    poweredByHeader: false,
    reactStrictMode: true,
    // Unmatched URLs (e.g. /en/unknown) render app/global-not-found.tsx (out/404.html).
    experimental: { globalNotFound: true },
  };
}
