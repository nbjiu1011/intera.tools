"use client";

import dynamic from "next/dynamic";
import type { WorkflowSlug } from "@/lib/workflows";

function Loading() {
  return <div className="card min-h-[420px] animate-pulse rounded-2xl bg-surface/70" />;
}

const workspaces: Record<WorkflowSlug, React.ComponentType> = {
  "ecommerce-image-optimizer": dynamic(() => import("./EcommerceImageOptimizer"), { loading: Loading }),
  "social-media-image-prep": dynamic(() => import("./SocialMediaImagePrep"), { loading: Loading }),
  "images-to-pdf-document": dynamic(() => import("./ImagesToPdfDocument"), { loading: Loading }),
  "web-image-optimization": dynamic(() => import("./WebImageOptimization"), { loading: Loading }),
};

export function WorkflowWorkspace({ slug }: { slug: WorkflowSlug }) {
  const Workspace = workspaces[slug];
  return <Workspace />;
}
