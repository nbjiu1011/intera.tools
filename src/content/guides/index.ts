import type { Locale } from "@/i18n/config";
import type { GuideSlug } from "@/lib/guides";
import type { GuideContent } from "../types";
import browserBasedFileProcessing from "./browser-based-file-processing";
import compressImagesWithoutLosingQuality from "./compress-images-without-losing-quality";
import extractPagesFromPdf from "./extract-pages-from-pdf";
import imageWontOpenOrConvert from "./image-wont-open-or-convert";
import instagramImageSizes from "./instagram-image-sizes";
import jpgPngWebpSizeComparison from "./jpg-png-webp-size-comparison";
import mergePdfFilesSafely from "./merge-pdf-files-safely";
import optimizeImagesForEmail from "./optimize-images-for-email";
import pdfWontOpenOrMerge from "./pdf-wont-open-or-merge";
import pngTransparencyExplained from "./png-transparency-explained";
import productPhotosForOnlineStore from "./product-photos-for-online-store";
import webpFormatExplained from "./webp-format-explained";
import wifiQrCode from "./wifi-qr-code";
import imageCompressionLevelsTested from "./image-compression-levels-tested";
import passportPhotoSize from "./passport-photo-size";
import printResolutionDpi from "./print-resolution-dpi";
import reducePdfFileSize from "./reduce-pdf-file-size";
import resumePdfUploadSize from "./resume-pdf-upload-size";
import scanDocumentsToPdfWithPhone from "./scan-documents-to-pdf-with-phone";
import testingEveryTool from "./testing-every-tool";
import whyNoUploadNoSignup from "./why-no-upload-no-signup";

const guideContent: Record<GuideSlug, Record<Locale, GuideContent>> = {
  "compress-images-without-losing-quality": compressImagesWithoutLosingQuality,
  "jpg-png-webp-size-comparison": jpgPngWebpSizeComparison,
  "optimize-images-for-email": optimizeImagesForEmail,
  "instagram-image-sizes": instagramImageSizes,
  "product-photos-for-online-store": productPhotosForOnlineStore,
  "merge-pdf-files-safely": mergePdfFilesSafely,
  "extract-pages-from-pdf": extractPagesFromPdf,
  "wifi-qr-code": wifiQrCode,
  "png-transparency-explained": pngTransparencyExplained,
  "webp-format-explained": webpFormatExplained,
  "browser-based-file-processing": browserBasedFileProcessing,
  "image-wont-open-or-convert": imageWontOpenOrConvert,
  "pdf-wont-open-or-merge": pdfWontOpenOrMerge,
  "image-compression-levels-tested": imageCompressionLevelsTested,
  "passport-photo-size": passportPhotoSize,
  "print-resolution-dpi": printResolutionDpi,
  "resume-pdf-upload-size": resumePdfUploadSize,
  "scan-documents-to-pdf-with-phone": scanDocumentsToPdfWithPhone,
  "reduce-pdf-file-size": reducePdfFileSize,
  "testing-every-tool": testingEveryTool,
  "why-no-upload-no-signup": whyNoUploadNoSignup,
};

export default guideContent;
