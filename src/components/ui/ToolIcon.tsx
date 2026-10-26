import {
  Columns2,
  Combine,
  Crop,
  FileImage,
  ImageDown,
  ImagePlus,
  LayoutGrid,
  QrCode,
  Repeat2,
  RotateCw,
  RotateCwSquare,
  Scaling,
  Scissors,
  Stamp,
  type LucideIcon,
} from "lucide-react";
import type { ToolAccent, ToolIconName } from "@/lib/tools";

export const toolIcons: Record<ToolIconName, LucideIcon> = {
  compress: ImageDown,
  resize: Scaling,
  crop: Crop,
  convert: Repeat2,
  rotate: RotateCw,
  watermark: Stamp,
  merge: Combine,
  split: Scissors,
  rotatePdf: RotateCwSquare,
  organize: LayoutGrid,
  imageToPdf: ImagePlus,
  pdfToImage: FileImage,
  qr: QrCode,
  compare: Columns2,
};

export function ToolIcon({
  icon,
  accent,
  size = "md",
  className = "",
}: {
  icon: ToolIconName;
  accent: ToolAccent;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const Icon = toolIcons[icon];
  const box = {
    sm: "size-9 rounded-lg [&>svg]:size-[18px]",
    md: "size-14 rounded-2xl [&>svg]:size-7",
    lg: "size-16 rounded-2xl [&>svg]:size-8",
    xl: "size-20 rounded-2xl [&>svg]:size-10",
  }[size];
  return (
    <span
      aria-hidden
      data-accent={accent}
      className={`relative inline-grid shrink-0 place-items-center border border-line bg-muted text-ink ${box} ${className}`}
    >
      <Icon strokeWidth={2} />
    </span>
  );
}
