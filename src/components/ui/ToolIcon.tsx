import {
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
};

/** Soft tile background + icon color per accent, light and dark. */
export const accentTile: Record<ToolAccent, string> = {
  blue: "bg-[#e6eeff] text-[#3a6cf4] dark:bg-[#1b2a5c] dark:text-[#8eadff]",
  red: "bg-[#ffe7e7] text-[#ec4b4b] dark:bg-[#4a1d26] dark:text-[#ff8f8f]",
  purple: "bg-[#efe8ff] text-[#8352f2] dark:bg-[#2e2160] dark:text-[#b89cff]",
  orange: "bg-[#fff0dc] text-[#f08a0c] dark:bg-[#47301a] dark:text-[#ffb766]",
  cyan: "bg-[#e0f5fd] text-[#0b9bd6] dark:bg-[#123b4e] dark:text-[#6fd2ff]",
  green: "bg-[#e1f7ea] text-[#18a957] dark:bg-[#123d2a] dark:text-[#62e29a]",
  pink: "bg-[#ffe6f3] text-[#e1489a] dark:bg-[#4a1a3a] dark:text-[#ff8cc8]",
  indigo: "bg-[#e9e9ff] text-[#5a55f0] dark:bg-[#23245e] dark:text-[#a3a1ff]",
  teal: "bg-[#ddf6f1] text-[#0f9d87] dark:bg-[#0f3d37] dark:text-[#5fe0c9]",
  amber: "bg-[#fff5d6] text-[#d98e00] dark:bg-[#45360f] dark:text-[#ffd25e]",
};

/** Saturated gradients for the glossy "3D" tiles. */
export const accentGlossy: Record<ToolAccent, string> = {
  blue: "linear-gradient(145deg, #8fb4ff 0%, #4f7bff 55%, #3a5ae8 100%)",
  red: "linear-gradient(145deg, #ff9d9d 0%, #f25d5d 55%, #d83c4b 100%)",
  purple: "linear-gradient(145deg, #c4a6ff 0%, #8b5cf6 55%, #6c3fe0 100%)",
  orange: "linear-gradient(145deg, #ffd189 0%, #ffa53a 55%, #f0820f 100%)",
  cyan: "linear-gradient(145deg, #93e3ff 0%, #31b8ef 55%, #1293d4 100%)",
  green: "linear-gradient(145deg, #8ff0bd 0%, #34cf85 55%, #17a965 100%)",
  pink: "linear-gradient(145deg, #ffb3dc 0%, #f063ad 55%, #d6408f 100%)",
  indigo: "linear-gradient(145deg, #b4b4ff 0%, #6d68f5 55%, #4c45dd 100%)",
  teal: "linear-gradient(145deg, #8ef0de 0%, #23c2a6 55%, #109c86 100%)",
  amber: "linear-gradient(145deg, #ffe08a 0%, #ffbf2e 55%, #e89d00 100%)",
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
    sm: "size-9 rounded-xl [&>svg]:size-[18px]",
    md: "size-14 rounded-2xl [&>svg]:size-7",
    lg: "size-16 rounded-[1.15rem] [&>svg]:size-8",
    xl: "size-20 rounded-[1.4rem] [&>svg]:size-10",
  }[size];
  return (
    <span
      aria-hidden
      className={`relative inline-grid shrink-0 place-items-center ${box} ${accentTile[accent]} ${className}`}
    >
      <Icon strokeWidth={2} />
    </span>
  );
}

/** Glossy, slightly 3D tile used in the hero illustration and feature cards. */
export function GlossyTile({
  icon,
  accent,
  className = "",
  style,
}: {
  icon: ToolIconName;
  accent: ToolAccent;
  className?: string;
  style?: React.CSSProperties;
}) {
  const Icon = toolIcons[icon];
  return (
    <span
      aria-hidden
      className={`relative grid place-items-center rounded-[28%] text-white ${className}`}
      style={{
        background: accentGlossy[accent],
        boxShadow:
          "inset 0 2px 1px rgba(255,255,255,.55), inset 0 -6px 14px rgba(0,0,0,.18), 0 18px 34px -12px rgba(40,50,120,.45)",
        ...style,
      }}
    >
      <span className="pointer-events-none absolute inset-x-[12%] top-[6%] h-[38%] rounded-[40%] bg-gradient-to-b from-white/45 to-white/0" />
      <Icon className="relative size-[46%] drop-shadow-[0_3px_4px_rgba(0,0,0,.18)]" strokeWidth={2.2} />
    </span>
  );
}
