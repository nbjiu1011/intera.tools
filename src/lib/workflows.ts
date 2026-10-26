import type { ToolAccent, ToolSlug } from "./tools";

// Workflows chain several tool steps into one run over a batch of files. They reuse
// the image/PDF engines in src/lib and run entirely in the browser.

export type WorkflowCategory = "social-media" | "e-commerce" | "documents" | "web-optimization";
export const workflowCategories: WorkflowCategory[] = ["social-media", "e-commerce", "documents", "web-optimization"];

export type WorkflowSlug = "social-media-image-prep" | "ecommerce-image-optimizer" | "images-to-pdf-document" | "web-image-optimization";

/** Building blocks shown as the step strip on cards and pages. */
export type WorkflowStepKind = "select" | "crop" | "resize" | "compress" | "convert" | "watermark" | "rename" | "organize" | "pdf" | "zip" | "download";

export type WorkflowDef = {
  slug: WorkflowSlug;
  category: WorkflowCategory;
  accent: ToolAccent;
  steps: WorkflowStepKind[];
  /** Single-purpose tools that cover one step each, linked from the page. */
  tools: ToolSlug[];
};

export const workflows: WorkflowDef[] = [
  {
    slug: "ecommerce-image-optimizer",
    category: "e-commerce",
    accent: "orange",
    steps: ["select", "resize", "compress", "convert", "rename", "zip"],
    tools: ["resize-image", "compress-image", "convert-image", "crop-image"],
  },
  {
    slug: "social-media-image-prep",
    category: "social-media",
    accent: "pink",
    steps: ["select", "crop", "resize", "watermark", "download"],
    tools: ["crop-image", "resize-image", "watermark-image", "compress-image"],
  },
  {
    slug: "images-to-pdf-document",
    category: "documents",
    accent: "red",
    steps: ["select", "organize", "pdf", "download"],
    tools: ["jpg-to-pdf", "organize-pdf", "merge-pdf", "compress-image"],
  },
  {
    slug: "web-image-optimization",
    category: "web-optimization",
    accent: "blue",
    steps: ["select", "resize", "convert", "compress", "zip"],
    tools: ["resize-image", "convert-image", "compress-image", "image-format-comparison"],
  },
];

export const workflowMap = Object.fromEntries(workflows.map((w) => [w.slug, w])) as Record<WorkflowSlug, WorkflowDef>;

export function isWorkflowSlug(value: string): value is WorkflowSlug {
  return value in workflowMap;
}
