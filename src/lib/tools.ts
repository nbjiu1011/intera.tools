import type { Locale } from "@/i18n/config";

export type ToolCategory = "image" | "pdf" | "everyday";
/** Navigation group (Tools menu, catalog, footer). Converters collects every format-conversion tool. */
export type ToolSection = "image" | "pdf" | "converters" | "everyday";
export const toolSections: ToolSection[] = ["image", "pdf", "converters", "everyday"];
export type ToolTag = "convert" | "edit" | "optimize" | "organize";
/** Visual accent used for the tool's icon tile. */
export type ToolAccent = "blue" | "red" | "purple" | "orange" | "cyan" | "green" | "pink" | "indigo" | "teal" | "amber";

export type ToolSlug =
  | "compress-image"
  | "resize-image"
  | "crop-image"
  | "convert-image"
  | "jpg-to-png"
  | "png-to-jpg"
  | "webp-to-jpg"
  | "rotate-image"
  | "watermark-image"
  | "merge-pdf"
  | "split-pdf"
  | "rotate-pdf"
  | "organize-pdf"
  | "jpg-to-pdf"
  | "pdf-to-jpg"
  | "qr-code-generator"
  | "image-format-comparison";

export type ToolIconName =
  | "compress"
  | "resize"
  | "crop"
  | "convert"
  | "rotate"
  | "watermark"
  | "merge"
  | "split"
  | "rotatePdf"
  | "organize"
  | "imageToPdf"
  | "pdfToImage"
  | "qr"
  | "compare";

export type ToolDef = {
  slug: ToolSlug;
  category: ToolCategory;
  section: ToolSection;
  tags: ToolTag[];
  icon: ToolIconName;
  accent: ToolAccent;
  /** Which client workspace implements the tool. Variants share one workspace with a preset. */
  workspace:
    | "compress-image"
    | "resize-image"
    | "crop-image"
    | "convert-image"
    | "rotate-image"
    | "watermark-image"
    | "merge-pdf"
    | "split-pdf"
    | "rotate-pdf"
    | "organize-pdf"
    | "jpg-to-pdf"
    | "pdf-to-jpg"
    | "qr-code-generator"
    | "image-format-comparison";
  /** Preset passed to the workspace (e.g. target format for conversion variants). */
  preset?: { to?: "jpg" | "png" | "webp" };
  /** Extra search terms per locale, matched by the tool search. */
  aliases: Record<Locale, string[]>;
  related: ToolSlug[];
  popular?: boolean;
};

export const tools: ToolDef[] = [
  {
    slug: "compress-image",
    category: "image",
    section: "image",
    tags: ["optimize"],
    icon: "compress",
    accent: "blue",
    workspace: "compress-image",
    aliases: {
      en: ["reduce image size", "optimize", "shrink photo", "jpg compressor", "png compressor", "tinypng"],
      ko: ["이미지 용량 줄이기", "사진 압축", "용량 줄이기", "이미지 최적화", "png 압축", "jpg 압축"],
    },
    related: ["resize-image", "convert-image", "crop-image", "jpg-to-pdf"],
    popular: true,
  },
  {
    slug: "resize-image",
    category: "image",
    section: "image",
    tags: ["edit"],
    icon: "resize",
    accent: "purple",
    workspace: "resize-image",
    aliases: {
      en: ["change dimensions", "scale image", "image resizer", "pixels", "percentage"],
      ko: ["이미지 크기 조절", "사진 크기 변경", "해상도 변경", "리사이즈", "픽셀"],
    },
    related: ["compress-image", "crop-image", "convert-image", "rotate-image"],
    popular: true,
  },
  {
    slug: "crop-image",
    category: "image",
    section: "image",
    tags: ["edit"],
    icon: "crop",
    accent: "pink",
    workspace: "crop-image",
    aliases: {
      en: ["cut image", "trim photo", "aspect ratio", "square crop"],
      ko: ["이미지 자르기", "사진 자르기", "크롭", "비율 자르기"],
    },
    related: ["resize-image", "rotate-image", "compress-image", "watermark-image"],
  },
  {
    slug: "convert-image",
    category: "image",
    section: "converters",
    tags: ["convert"],
    icon: "convert",
    accent: "cyan",
    workspace: "convert-image",
    aliases: {
      en: ["image converter", "change format", "webp", "png", "jpg", "jpeg", "avif", "bmp", "gif"],
      ko: ["이미지 변환", "확장자 변환", "포맷 변환", "webp 변환", "jpg 변환", "png 변환"],
    },
    related: ["jpg-to-png", "png-to-jpg", "webp-to-jpg", "compress-image"],
  },
  {
    slug: "jpg-to-png",
    category: "image",
    section: "converters",
    tags: ["convert"],
    icon: "convert",
    accent: "cyan",
    workspace: "convert-image",
    preset: { to: "png" },
    aliases: { en: ["jpeg to png"], ko: ["jpg png 변환", "jpeg png"] },
    related: ["png-to-jpg", "convert-image", "compress-image", "webp-to-jpg"],
    popular: true,
  },
  {
    slug: "png-to-jpg",
    category: "image",
    section: "converters",
    tags: ["convert"],
    icon: "convert",
    accent: "teal",
    workspace: "convert-image",
    preset: { to: "jpg" },
    aliases: { en: ["png to jpeg"], ko: ["png jpg 변환", "png jpeg"] },
    related: ["jpg-to-png", "convert-image", "compress-image", "webp-to-jpg"],
  },
  {
    slug: "webp-to-jpg",
    category: "image",
    section: "converters",
    tags: ["convert"],
    icon: "convert",
    accent: "indigo",
    workspace: "convert-image",
    preset: { to: "jpg" },
    aliases: { en: ["webp to jpeg", "open webp"], ko: ["webp jpg 변환", "웹피 변환"] },
    related: ["convert-image", "png-to-jpg", "jpg-to-png", "compress-image"],
  },
  {
    slug: "rotate-image",
    category: "image",
    section: "image",
    tags: ["edit"],
    icon: "rotate",
    accent: "green",
    workspace: "rotate-image",
    aliases: {
      en: ["flip image", "mirror", "turn photo", "rotate 90"],
      ko: ["이미지 회전", "사진 회전", "좌우 반전", "상하 반전"],
    },
    related: ["crop-image", "resize-image", "rotate-pdf", "compress-image"],
  },
  {
    slug: "watermark-image",
    category: "image",
    section: "image",
    tags: ["edit"],
    icon: "watermark",
    accent: "amber",
    workspace: "watermark-image",
    aliases: {
      en: ["add text to image", "logo", "copyright", "stamp"],
      ko: ["워터마크", "로고 넣기", "사진에 글자 넣기", "저작권 표시"],
    },
    related: ["compress-image", "resize-image", "crop-image", "jpg-to-pdf"],
  },
  {
    slug: "merge-pdf",
    category: "pdf",
    section: "pdf",
    tags: ["organize"],
    icon: "merge",
    accent: "red",
    workspace: "merge-pdf",
    aliases: {
      en: ["combine pdf", "join pdf", "pdf merger"],
      ko: ["pdf 합치기", "pdf 병합", "pdf 결합", "pdf 붙이기"],
    },
    related: ["split-pdf", "organize-pdf", "jpg-to-pdf", "rotate-pdf"],
    popular: true,
  },
  {
    slug: "split-pdf",
    category: "pdf",
    section: "pdf",
    tags: ["organize"],
    icon: "split",
    accent: "orange",
    workspace: "split-pdf",
    aliases: {
      en: ["extract pages", "separate pdf", "pdf splitter", "page range"],
      ko: ["pdf 분할", "pdf 나누기", "페이지 추출", "pdf 페이지 분리"],
    },
    related: ["merge-pdf", "organize-pdf", "pdf-to-jpg", "rotate-pdf"],
  },
  {
    slug: "rotate-pdf",
    category: "pdf",
    section: "pdf",
    tags: ["edit"],
    icon: "rotatePdf",
    accent: "green",
    workspace: "rotate-pdf",
    aliases: {
      en: ["turn pdf pages", "pdf orientation", "landscape"],
      ko: ["pdf 회전", "pdf 페이지 회전", "가로 세로"],
    },
    related: ["organize-pdf", "merge-pdf", "split-pdf", "rotate-image"],
    popular: true,
  },
  {
    slug: "organize-pdf",
    category: "pdf",
    section: "pdf",
    tags: ["organize", "edit"],
    icon: "organize",
    accent: "purple",
    workspace: "organize-pdf",
    aliases: {
      en: ["reorder pages", "delete pdf pages", "remove pages", "sort pages", "rearrange"],
      ko: ["pdf 페이지 순서", "pdf 페이지 삭제", "pdf 정리", "페이지 재배열"],
    },
    related: ["merge-pdf", "split-pdf", "rotate-pdf", "pdf-to-jpg"],
  },
  {
    slug: "jpg-to-pdf",
    category: "pdf",
    section: "converters",
    tags: ["convert"],
    icon: "imageToPdf",
    accent: "orange",
    workspace: "jpg-to-pdf",
    aliases: {
      en: ["image to pdf", "png to pdf", "photo to pdf", "pictures to pdf", "webp to pdf"],
      ko: ["이미지 pdf 변환", "사진 pdf 변환", "jpg pdf", "png pdf"],
    },
    related: ["pdf-to-jpg", "merge-pdf", "compress-image", "organize-pdf"],
    popular: true,
  },
  {
    slug: "pdf-to-jpg",
    category: "pdf",
    section: "converters",
    tags: ["convert"],
    icon: "pdfToImage",
    accent: "pink",
    workspace: "pdf-to-jpg",
    aliases: {
      en: ["pdf to image", "pdf to png", "export pages", "pdf to picture"],
      ko: ["pdf 이미지 변환", "pdf jpg", "pdf png", "pdf 사진 변환"],
    },
    related: ["jpg-to-pdf", "split-pdf", "compress-image", "organize-pdf"],
  },
  {
    slug: "qr-code-generator",
    category: "everyday",
    section: "everyday",
    tags: [],
    icon: "qr",
    accent: "indigo",
    workspace: "qr-code-generator",
    aliases: {
      en: ["qr code", "qr maker", "wifi qr", "barcode", "link to qr"],
      ko: ["qr 코드", "qr 생성", "큐알코드", "와이파이 qr", "qr 만들기"],
    },
    related: ["compress-image", "watermark-image", "jpg-to-pdf", "merge-pdf"],
    popular: true,
  },
  {
    slug: "image-format-comparison",
    category: "image",
    section: "image",
    tags: ["convert", "optimize"],
    icon: "compare",
    accent: "teal",
    workspace: "image-format-comparison",
    aliases: {
      en: ["jpg vs png", "png vs webp", "webp vs jpg", "best image format", "format size test", "compare formats"],
      ko: ["jpg png 비교", "webp 비교", "이미지 포맷 비교", "확장자 비교", "용량 비교", "어떤 포맷"],
    },
    related: ["convert-image", "compress-image", "resize-image", "webp-to-jpg"],
  },
];

export const toolMap = Object.fromEntries(tools.map((t) => [t.slug, t])) as Record<ToolSlug, ToolDef>;

export function isToolSlug(value: string): value is ToolSlug {
  return value in toolMap;
}

/** Cards shown in the hero row of the home page, in order. */
export const featuredSlugs: ToolSlug[] = [
  "compress-image",
  "merge-pdf",
  "resize-image",
  "jpg-to-pdf",
  "jpg-to-png",
  "rotate-pdf",
];
