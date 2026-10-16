import { appendFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { handleEvents } from "@/server/events";

// Development only; in production worker/index.ts handles /api/events.
const target = process.env.EVENTS_LOG || join(process.cwd(), "data", "events.ndjson");

export function POST(request: Request) {
  return handleEvents(request, async (events) => {
    const lines = events.map((e) => JSON.stringify(e)).join("\n") + "\n";
    if (target === "stdout") return void process.stdout.write(lines);
    await mkdir(dirname(target), { recursive: true });
    await appendFile(target, lines);
  });
}
