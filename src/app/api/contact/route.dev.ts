import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { handleContact } from "@/server/contact";

// Development only; in production worker/index.ts handles /api/contact.
export function POST(request: Request) {
  return handleContact(request, {
    webhook: process.env.CONTACT_WEBHOOK_URL,
    // Without a webhook, keep messages in a local file.
    fallback: async (entry) => {
      const dir = join(process.cwd(), "data");
      await mkdir(dir, { recursive: true });
      await appendFile(join(dir, "contact.ndjson"), JSON.stringify(entry) + "\n");
    },
  });
}
