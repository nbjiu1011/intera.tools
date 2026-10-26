import type { Locale } from "@/i18n/config";
import type { WorkflowSlug } from "@/lib/workflows";
import type { WorkflowContent } from "../types";
import ecommerceImageOptimizer from "./ecommerce-image-optimizer";
import imagesToPdfDocument from "./images-to-pdf-document";
import socialMediaImagePrep from "./social-media-image-prep";
import webImageOptimization from "./web-image-optimization";

const workflowContent: Record<WorkflowSlug, Record<Locale, WorkflowContent>> = {
  "ecommerce-image-optimizer": ecommerceImageOptimizer,
  "social-media-image-prep": socialMediaImagePrep,
  "images-to-pdf-document": imagesToPdfDocument,
  "web-image-optimization": webImageOptimization,
};

export default workflowContent;
