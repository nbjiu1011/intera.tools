import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { __iconData as columns2 } from "lucide-react/dist/esm/icons/columns-2.mjs";
import { __iconData as combine } from "lucide-react/dist/esm/icons/combine.mjs";
import { __iconData as crop } from "lucide-react/dist/esm/icons/crop.mjs";
import { __iconData as fileImage } from "lucide-react/dist/esm/icons/file-image.mjs";
import { __iconData as imageDown } from "lucide-react/dist/esm/icons/image-down.mjs";
import { __iconData as imagePlus } from "lucide-react/dist/esm/icons/image-plus.mjs";
import { __iconData as layoutGrid } from "lucide-react/dist/esm/icons/layout-grid.mjs";
import { __iconData as qrCode } from "lucide-react/dist/esm/icons/qr-code.mjs";
import { __iconData as repeat2 } from "lucide-react/dist/esm/icons/repeat-2.mjs";
import { __iconData as rotateCw } from "lucide-react/dist/esm/icons/rotate-cw.mjs";
import { __iconData as rotateCwSquare } from "lucide-react/dist/esm/icons/rotate-cw-square.mjs";
import { __iconData as scaling } from "lucide-react/dist/esm/icons/scaling.mjs";
import { __iconData as scissors } from "lucide-react/dist/esm/icons/scissors.mjs";
import { __iconData as stamp } from "lucide-react/dist/esm/icons/stamp.mjs";
import type { ToolAccent, ToolIconName } from "@/lib/tools";

export const ogSize = { width: 1200, height: 630 };

// Same icons as components/ui/ToolIcon, as raw geometry.
const iconData: Record<ToolIconName, typeof crop> = {
  compress: imageDown,
  resize: scaling,
  crop,
  convert: repeat2,
  rotate: rotateCw,
  watermark: stamp,
  merge: combine,
  split: scissors,
  rotatePdf: rotateCwSquare,
  organize: layoutGrid,
  imageToPdf: imagePlus,
  pdfToImage: fileImage,
  qr: qrCode,
  compare: columns2,
};

function IconSvg({ name, size }: { name: ToolIconName; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      {iconData[name].node.map(([tag, { key, ...attrs }]) => {
        const Tag = tag as "path";
        return <Tag key={key} {...attrs} />;
      })}
    </svg>
  );
}

// Pretendard (OFL) covers Latin and Korean; the subset build keeps the bundle small.
const fontDir = join(process.cwd(), "node_modules/pretendard/dist/web/static/woff-subset");
const fonts = Promise.all([
  readFile(join(fontDir, "Pretendard-Bold.subset.woff")),
  readFile(join(fontDir, "Pretendard-SemiBold.subset.woff")),
]);

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><linearGradient id="a" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#56a0ff"/><stop offset=".55" stop-color="#5b6dff"/><stop offset="1" stop-color="#9b5cf6"/></linearGradient><linearGradient id="b" x1="20" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse"><stop stop-color="#ff9ad5"/><stop offset="1" stop-color="#b26cff"/></linearGradient></defs><path d="M20 2.5 35.2 11.25v17.5L20 37.5 4.8 28.75v-17.5Z" fill="url(#a)"/><path d="M20 2.5 35.2 11.25 20 20 4.8 11.25Z" fill="url(#b)" opacity=".9"/><path d="M20 20v17.5L4.8 28.75v-17.5Z" fill="#000" opacity=".1"/><path d="M20 13.2 26 16.6v6.8L20 26.8l-6-3.4v-6.8Z" fill="#fff"/></svg>`;
const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;

/** Shared Open Graph card: brand, headline, subline, value pills and an optional glossy tool tile. */
export async function renderOg({
  title,
  subtitle,
  pills,
  icon,
}: {
  title: string;
  subtitle: string;
  pills: string[];
  icon?: ToolIconName;
  accent?: ToolAccent;
}) {
  const [bold, semibold] = await fonts;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#ffffff",
          borderTop: "14px solid #0e0f12",
          fontFamily: "Pretendard",
          padding: "64px 72px",
        }}
      >

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={52} height={52} alt="" />
            <div style={{ display: "flex", fontSize: 36, fontWeight: 700, letterSpacing: -1 }}>
              <span style={{ color: "#0e0f12" }}>Intera</span>
              <span style={{ marginLeft: 10, color: "#2451ff" }}>Tools</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: icon ? 720 : 960 }}>
            <div style={{ fontSize: title.length > 28 ? 62 : 74, fontWeight: 700, color: "#0e0f12", lineHeight: 1.08, letterSpacing: -2.5 }}>{title}</div>
            <div style={{ marginTop: 22, fontSize: 30, fontWeight: 600, color: "#4a4d57", lineHeight: 1.35 }}>{subtitle}</div>
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            {pills.map((p, i) => (
              <div
                key={p}
                style={{
                  display: "flex",
                  padding: "12px 24px",
                  borderRadius: 10,
                  fontSize: 24,
                  fontWeight: 600,
                  color: i === 0 ? "#ffffff" : "#0e0f12",
                  background: i === 0 ? "#2451ff" : "#ffffff",
                  border: i === 0 ? "2px solid #2451ff" : "2px solid #e6e6e9",
                }}
              >
                {p}
              </div>
            ))}
          </div>
        </div>

        {icon && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 340, position: "relative" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 260,
                height: 260,
                borderRadius: 36,
                background: "#0e0f12",
              }}
            >
              <IconSvg name={icon} size={130} />
            </div>
          </div>
        )}
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Pretendard", data: bold, weight: 700, style: "normal" },
        { name: "Pretendard", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
