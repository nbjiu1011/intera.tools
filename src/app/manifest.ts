import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Intera Tools — Free Online Tools",
    short_name: "Intera Tools",
    description: "Free online tools for images, PDFs and everyday tasks. Private, no sign-up.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2451ff",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
