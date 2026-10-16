import type { Dict } from "@/i18n/dictionaries/en";

export type ErrorCode = keyof Dict["errors"];

/** An expected, user-explainable failure. `vars` fill the message placeholders. */
export class ToolError extends Error {
  constructor(
    public code: ErrorCode,
    public vars: Record<string, string | number> = {},
  ) {
    super(code);
    this.name = "ToolError";
  }
}

export function toToolError(error: unknown): ToolError {
  if (error instanceof ToolError) return error;
  const message = error instanceof Error ? `${error.name} ${error.message}` : String(error);
  if (/allocation|out of memory|RangeError: Array buffer|Invalid array length/i.test(message)) {
    return new ToolError("out-of-memory");
  }
  return new ToolError("generic");
}
