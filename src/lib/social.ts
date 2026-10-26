// Recommended upload sizes per platform, as published in late 2026 by the platforms'
// help pages and widely used guides. Platforms change these over time; the guide
// /guides/instagram-image-sizes explains the Instagram ones in detail.

export type SocialPresetId =
  | "instagram-square"
  | "instagram-portrait"
  | "instagram-portrait-34"
  | "instagram-story"
  | "facebook-link"
  | "x-landscape"
  | "linkedin-post"
  | "youtube-thumbnail"
  | "pinterest-pin";

export type SocialPreset = { id: SocialPresetId; platform: string; label: { en: string; ko: string }; width: number; height: number; ratio: string };

export const socialPresets: SocialPreset[] = [
  { id: "instagram-square", platform: "Instagram", label: { en: "Square post", ko: "정사각형 게시물" }, width: 1080, height: 1080, ratio: "1:1" },
  { id: "instagram-portrait", platform: "Instagram", label: { en: "Portrait post", ko: "세로 게시물" }, width: 1080, height: 1350, ratio: "4:5" },
  { id: "instagram-portrait-34", platform: "Instagram", label: { en: "Portrait post (grid)", ko: "세로 게시물(그리드)" }, width: 1080, height: 1440, ratio: "3:4" },
  { id: "instagram-story", platform: "Instagram", label: { en: "Story / Reels", ko: "스토리 / 릴스" }, width: 1080, height: 1920, ratio: "9:16" },
  { id: "facebook-link", platform: "Facebook", label: { en: "Link / Open Graph image", ko: "링크 / 오픈 그래프 이미지" }, width: 1200, height: 630, ratio: "1.91:1" },
  { id: "x-landscape", platform: "X", label: { en: "Landscape post", ko: "가로 게시물" }, width: 1600, height: 900, ratio: "16:9" },
  { id: "linkedin-post", platform: "LinkedIn", label: { en: "Shared image", ko: "공유 이미지" }, width: 1200, height: 627, ratio: "1.91:1" },
  { id: "youtube-thumbnail", platform: "YouTube", label: { en: "Thumbnail", ko: "썸네일" }, width: 1280, height: 720, ratio: "16:9" },
  { id: "pinterest-pin", platform: "Pinterest", label: { en: "Pin", ko: "핀" }, width: 1000, height: 1500, ratio: "2:3" },
];

export const socialPresetMap = Object.fromEntries(socialPresets.map((p) => [p.id, p])) as Record<SocialPresetId, SocialPreset>;
