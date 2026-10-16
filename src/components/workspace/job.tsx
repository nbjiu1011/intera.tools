"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { toToolError, type ErrorCode } from "@/lib/errors";
import { isAbort } from "@/lib/files";

export type Output = {
  id: string;
  name: string;
  blob: Blob;
  url: string;
  kind: "image" | "pdf";
  originalSize?: number;
  width?: number;
  height?: number;
  pageCount?: number;
  keptOriginal?: boolean;
};

export type Failure = { name: string; code: ErrorCode; vars?: Record<string, string | number> };

export type JobContext = {
  signal: AbortSignal;
  /** Report progress; `label` is shown under the bar (e.g. current file name). */
  progress: (done: number, label?: string) => void;
  output: (o: Omit<Output, "id" | "url">) => void;
  fail: (name: string, error: unknown) => void;
};

type JobState =
  | { stage: "idle" }
  | { stage: "running"; done: number; total: number; label?: string }
  | { stage: "done"; outputs: Output[]; failures: Failure[] };

let outputSeq = 0;

/** Runs a processing job with progress, cancellation, per-file failures and analytics. */
export function useJob(tool: string) {
  const [state, setState] = useState<JobState>({ stage: "idle" });
  const controller = useRef<AbortController | null>(null);
  const urls = useRef<string[]>([]);

  const revoke = () => {
    urls.current.forEach((u) => URL.revokeObjectURL(u));
    urls.current = [];
  };
  useEffect(() => revoke, []);

  const run = useCallback(
    async (total: number, work: (ctx: JobContext) => Promise<void>, meta: { bytes?: number } = {}) => {
      revoke();
      const abort = new AbortController();
      controller.current = abort;
      const outputs: Output[] = [];
      const failures: Failure[] = [];
      const started = performance.now();
      setState({ stage: "running", done: 0, total });
      track("process_start", { tool, count: total, bytes: meta.bytes });

      const ctx: JobContext = {
        signal: abort.signal,
        progress: (done, label) => setState({ stage: "running", done, total, label }),
        output: (o) => {
          const url = URL.createObjectURL(o.blob);
          urls.current.push(url);
          outputs.push({ ...o, id: `o${++outputSeq}`, url });
        },
        fail: (name, error) => {
          if (isAbort(error)) throw error;
          const e = toToolError(error);
          if (e.code === "generic") console.error(`[${tool}]`, error);
          failures.push({ name, code: e.code, vars: e.vars });
        },
      };

      try {
        await work(ctx);
      } catch (error) {
        if (isAbort(error)) {
          revoke();
          track("process_cancel", { tool });
          setState({ stage: "idle" });
          return "cancelled" as const;
        }
        const e = toToolError(error);
        if (e.code === "generic") console.error(`[${tool}]`, error);
        failures.push({ name: "", code: e.code, vars: e.vars });
      } finally {
        controller.current = null;
      }

      const durationMs = Math.round(performance.now() - started);
      if (outputs.length) track("process_success", { tool, count: outputs.length, durationMs });
      for (const f of failures) track("process_error", { tool, code: f.code });
      setState({ stage: "done", outputs, failures });
      return "done" as const;
    },
    [tool],
  );

  const cancel = useCallback(() => controller.current?.abort(), []);
  const reset = useCallback(() => {
    controller.current?.abort();
    revoke();
    setState({ stage: "idle" });
  }, []);

  return { state, run, cancel, reset };
}
