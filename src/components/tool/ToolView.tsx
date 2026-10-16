"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Wraps a tool page and records an anonymous view event. */
export function ToolView({ slug, children }: { slug: string; children: React.ReactNode }) {
  useEffect(() => {
    track("tool_view", { tool: slug });
  }, [slug]);
  return <>{children}</>;
}
