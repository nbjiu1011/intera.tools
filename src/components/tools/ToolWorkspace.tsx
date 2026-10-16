"use client";

import dynamic from "next/dynamic";
import { toolMap, type ToolDef, type ToolSlug } from "@/lib/tools";

function Loading() {
  return <div className="card min-h-[420px] animate-pulse rounded-[1.75rem] bg-surface/70" />;
}

type WorkspaceProps = { slug: ToolSlug; preset?: ToolDef["preset"] };

// Each workspace is its own chunk; heavy engines (pdf.js, pdf-lib, PNG quantizer)
// are imported lazily inside them, only when a file is processed.
const workspaces: Record<ToolDef["workspace"], React.ComponentType<WorkspaceProps>> = {
  "compress-image": dynamic(() => import("./CompressImage"), { loading: Loading }),
  "resize-image": dynamic(() => import("./ResizeImage"), { loading: Loading }),
  "crop-image": dynamic(() => import("./CropImage"), { loading: Loading }),
  "convert-image": dynamic(() => import("./ConvertImage"), { loading: Loading }),
  "rotate-image": dynamic(() => import("./RotateImage"), { loading: Loading }),
  "watermark-image": dynamic(() => import("./WatermarkImage"), { loading: Loading }),
  "merge-pdf": dynamic(() => import("./MergePdf"), { loading: Loading }),
  "split-pdf": dynamic(() => import("./SplitPdf"), { loading: Loading }),
  "rotate-pdf": dynamic(() => import("./RotatePdf"), { loading: Loading }),
  "organize-pdf": dynamic(() => import("./OrganizePdf"), { loading: Loading }),
  "jpg-to-pdf": dynamic(() => import("./JpgToPdf"), { loading: Loading }),
  "pdf-to-jpg": dynamic(() => import("./PdfToJpg"), { loading: Loading }),
  "qr-code-generator": dynamic(() => import("./QrGenerator"), { loading: Loading }),
};

export function ToolWorkspace({ slug }: { slug: ToolSlug }) {
  const tool = toolMap[slug];
  const Workspace = workspaces[tool.workspace];
  return <Workspace slug={slug} preset={tool.preset} />;
}
