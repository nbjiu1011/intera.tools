import type { GuideCategory } from "@/content/types";
import type { ToolSlug } from "./tools";
import type { WorkflowSlug } from "./workflows";

export const guideCategories: GuideCategory[] = ["tutorials", "comparisons", "file-formats", "troubleshooting"];

export type GuideSlug =
  | "compress-images-without-losing-quality"
  | "jpg-png-webp-size-comparison"
  | "optimize-images-for-email"
  | "instagram-image-sizes"
  | "product-photos-for-online-store"
  | "merge-pdf-files-safely"
  | "extract-pages-from-pdf"
  | "wifi-qr-code"
  | "png-transparency-explained"
  | "webp-format-explained"
  | "browser-based-file-processing"
  | "image-wont-open-or-convert"
  | "pdf-wont-open-or-merge";

export type GuideDef = {
  slug: GuideSlug;
  category: GuideCategory;
  /** Tools the guide uses; the guide is listed under "Related guides" on these tool pages. */
  tools: ToolSlug[];
  workflows?: WorkflowSlug[];
  /** ISO dates. */
  published: string;
  updated: string;
};

export const guides: GuideDef[] = [
  {
    slug: "compress-images-without-losing-quality",
    category: "tutorials",
    tools: ["compress-image", "resize-image", "image-format-comparison"],
    workflows: ["web-image-optimization"],
    published: "2026-10-26",
    updated: "2026-10-26",
  },
  {
    slug: "jpg-png-webp-size-comparison",
    category: "comparisons",
    tools: ["image-format-comparison", "convert-image", "compress-image"],
    workflows: ["web-image-optimization"],
    published: "2026-10-26",
    updated: "2026-10-26",
  },
  {
    slug: "optimize-images-for-email",
    category: "tutorials",
    tools: ["resize-image", "compress-image", "jpg-to-pdf"],
    published: "2026-10-26",
    updated: "2026-10-26",
  },
  {
    slug: "instagram-image-sizes",
    category: "tutorials",
    tools: ["crop-image", "resize-image", "watermark-image"],
    workflows: ["social-media-image-prep"],
    published: "2026-10-26",
    updated: "2026-10-26",
  },
  {
    slug: "product-photos-for-online-store",
    category: "tutorials",
    tools: ["crop-image", "resize-image", "compress-image", "convert-image"],
    workflows: ["ecommerce-image-optimizer"],
    published: "2026-10-26",
    updated: "2026-10-26",
  },
  {
    slug: "merge-pdf-files-safely",
    category: "tutorials",
    tools: ["merge-pdf", "organize-pdf", "jpg-to-pdf"],
    workflows: ["images-to-pdf-document"],
    published: "2026-10-26",
    updated: "2026-10-26",
  },
  {
    slug: "extract-pages-from-pdf",
    category: "tutorials",
    tools: ["split-pdf", "organize-pdf", "pdf-to-jpg"],
    published: "2026-10-26",
    updated: "2026-10-26",
  },
  {
    slug: "wifi-qr-code",
    category: "tutorials",
    tools: ["qr-code-generator"],
    published: "2026-10-26",
    updated: "2026-10-26",
  },
  {
    slug: "png-transparency-explained",
    category: "file-formats",
    tools: ["png-to-jpg", "convert-image", "compress-image"],
    published: "2026-10-26",
    updated: "2026-10-26",
  },
  {
    slug: "webp-format-explained",
    category: "file-formats",
    tools: ["webp-to-jpg", "convert-image", "image-format-comparison"],
    workflows: ["web-image-optimization"],
    published: "2026-10-26",
    updated: "2026-10-26",
  },
  {
    slug: "browser-based-file-processing",
    category: "comparisons",
    tools: ["compress-image", "merge-pdf", "split-pdf"],
    published: "2026-10-26",
    updated: "2026-10-26",
  },
  {
    slug: "image-wont-open-or-convert",
    category: "troubleshooting",
    tools: ["convert-image", "resize-image", "compress-image"],
    published: "2026-10-26",
    updated: "2026-10-26",
  },
  {
    slug: "pdf-wont-open-or-merge",
    category: "troubleshooting",
    tools: ["merge-pdf", "split-pdf", "organize-pdf"],
    published: "2026-10-26",
    updated: "2026-10-26",
  },
];

export const guideMap = Object.fromEntries(guides.map((g) => [g.slug, g])) as Record<GuideSlug, GuideDef>;

export function isGuideSlug(value: string): value is GuideSlug {
  return value in guideMap;
}

export function guidesForTool(slug: ToolSlug): GuideDef[] {
  return guides.filter((g) => g.tools.includes(slug));
}
