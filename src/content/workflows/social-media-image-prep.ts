import type { Locale } from "../../i18n/config";
import type { WorkflowContent } from "../types";

const content: Record<Locale, WorkflowContent> = {
  en: {
    name: "Social Media Image Prep",
    short: "Crop and size photos for Instagram, X, LinkedIn and more at once",
    metaTitle: "Social Media Image Resizer – Instagram, X, YouTube Sizes",
    metaDescription:
      "Resize and crop photos for Instagram posts and Stories, Facebook links, X, LinkedIn, YouTube thumbnails and Pinterest in one run, with an optional text watermark.",
    h1: "Social media image prep",
    lead: "Pick the platforms you post to and get every photo cropped or padded to each recommended size — optionally with a text watermark — in a single ZIP.",
    stepLabels: ["Add photos", "Crop to ratio", "Resize", "Watermark", "Download"],
    useCases: [
      {
        title: "One photo, several channels",
        body: "Announcing an event on Instagram, Facebook and LinkedIn? Select the three sizes once and each photo comes out as a 4:5 post, a 1.91:1 link image and a LinkedIn image, named by platform.",
      },
      {
        title: "Stories from landscape shots",
        body: "Turning wide photos into 9:16 Stories crops away most of the frame. Choose “Fit with background” to keep the whole photo on a colored backdrop instead, or crop with the top or bottom kept.",
      },
      {
        title: "Marking your work",
        body: "Photographers and shops can add a small handle such as @yourstudio in a corner of every export, with adjustable size, opacity and color.",
      },
    ],
    about: {
      title: "How the sizes are made",
      paragraphs: [
        "Each selected preset has an exact pixel size, such as 1080×1350 for a 4:5 Instagram post or 1280×720 for a YouTube thumbnail. With “Crop to fill”, the photo is scaled until it covers the whole frame and the overflow is trimmed; the crop position decides whether the top, center or bottom of the photo is kept, which matters for portraits where faces are near the top. With “Fit with background”, the whole photo is scaled down to fit and the empty space is filled with the background color you pick.",
        "The watermark is drawn after sizing, so it has the same proportions on every export: its size is a percentage of the shorter side of each output image and it sits a small margin away from the chosen corner or the center. Files are saved as JPG (quality 90 by default) or PNG and named after the original file plus the preset and size, for example beach-instagram-portrait-1080x1350.jpg.",
        "Platforms change their recommendations from time to time and may compress images again after upload. The presets follow the sizes the platforms recommended in late 2026; our Instagram size guide explains the feed, grid and Story formats in more detail, including the newer 3:4 option.",
      ],
    },
    limits: [
      "Each image is exported once per selected preset, so 10 photos and 3 presets make 30 files.",
      "Cropping is automatic (top, center or bottom); for a hand-picked crop of a single photo, use Crop Image first and add the cropped file here.",
      "Photos smaller than a preset are enlarged when cropping to fill, which can look soft; padding never enlarges.",
      "Only text watermarks are available here; logo watermarks are in the Watermark Image tool.",
      "Up to 100 images, 50 MB each. Metadata is not kept, and animated GIFs become a single frame.",
    ],
    faq: [
      {
        q: "Which Instagram size should I use?",
        a: "1080×1350 (4:5) is the most common choice for feed photos because it takes up the most space in the feed. Instagram’s profile grid now shows posts in a taller 3:4 crop, so 1080×1440 avoids cropping in the grid. Stories and Reels use 1080×1920.",
      },
      {
        q: "Why does my Story look blurry after posting?",
        a: "Platforms re-compress uploads. Starting from a sharp image at exactly the recommended size gives the best result; avoid exporting smaller than the preset.",
      },
      {
        q: "Can I save my platform selection?",
        a: "Yes. The last settings are remembered in this browser, and you can save named presets such as “Weekly posts”.",
      },
      {
        q: "Are my photos uploaded?",
        a: "No. Cropping, resizing and watermarking happen in your browser; nothing is sent to a server.",
      },
    ],
  },
  ko: {
    name: "SNS 이미지 준비",
    short: "인스타그램·X·링크드인 등 SNS 규격으로 한 번에 자르고 맞춤",
    metaTitle: "SNS 이미지 크기 변환 – 인스타그램·유튜브 규격",
    metaDescription:
      "인스타그램 게시물·스토리, 페이스북 링크, X, 링크드인, 유튜브 썸네일, 핀터레스트 규격에 맞게 사진을 한 번에 자르고 크기를 바꿉니다. 텍스트 워터마크도 넣을 수 있습니다.",
    h1: "SNS 이미지 준비",
    lead: "올릴 플랫폼을 고르면 사진마다 권장 크기로 자르거나 여백을 채워 만들어 줍니다. 원하면 텍스트 워터마크까지 넣어 ZIP 하나로 받을 수 있습니다.",
    stepLabels: ["사진 추가", "비율로 자르기", "크기 조절", "워터마크", "내려받기"],
    useCases: [
      {
        title: "사진 한 장을 여러 채널에 올릴 때",
        body: "행사 소식을 인스타그램, 페이스북, 링크드인에 함께 올린다면 세 가지 크기를 한 번만 고르세요. 사진마다 4:5 게시물, 1.91:1 링크 이미지, 링크드인 이미지가 플랫폼 이름이 붙은 파일로 만들어집니다.",
      },
      {
        title: "가로 사진으로 스토리를 만들 때",
        body: "가로 사진을 9:16 스토리로 자르면 대부분이 잘려 나갑니다. ‘배경으로 여백 채우기’를 고르면 사진 전체를 색 배경 위에 그대로 둘 수 있고, 자를 때는 위나 아래 쪽을 남기도록 정할 수 있습니다.",
      },
      {
        title: "내 사진임을 표시할 때",
        body: "사진작가나 쇼핑몰은 모든 결과물 한쪽 구석에 @yourstudio 같은 계정명을 넣을 수 있습니다. 크기, 불투명도, 색을 조절할 수 있습니다.",
      },
    ],
    about: {
      title: "크기는 이렇게 만들어집니다",
      paragraphs: [
        "선택한 프리셋마다 정확한 픽셀 크기가 있습니다. 예를 들어 인스타그램 4:5 게시물은 1080×1350, 유튜브 썸네일은 1280×720입니다. ‘잘라서 채우기’는 사진이 프레임 전체를 덮을 때까지 확대·축소한 뒤 넘치는 부분을 잘라냅니다. 자르는 위치에 따라 사진의 위, 가운데, 아래 중 어느 쪽을 남길지 정하는데, 얼굴이 위쪽에 있는 인물 사진이라면 중요한 설정입니다. ‘배경으로 여백 채우기’는 사진 전체가 들어가도록 줄이고 남는 공간을 고른 배경색으로 채웁니다.",
        "워터마크는 크기를 맞춘 뒤에 그리므로 모든 결과물에서 같은 비율로 보입니다. 크기는 결과 이미지의 짧은 변 대비 비율이고, 선택한 모서리나 가운데에서 약간 안쪽에 놓입니다. 파일은 JPG(기본 품질 90) 또는 PNG로 저장되며, 원래 파일 이름에 프리셋과 크기가 붙어 beach-instagram-portrait-1080x1350.jpg처럼 만들어집니다.",
        "플랫폼은 권장 규격을 종종 바꾸고, 업로드한 이미지를 다시 압축하기도 합니다. 프리셋은 2026년 하반기 기준 각 플랫폼의 권장 크기를 따릅니다. 피드, 그리드, 스토리 형식과 새로 생긴 3:4 비율은 인스타그램 이미지 크기 가이드에서 더 자세히 설명합니다.",
      ],
    },
    limits: [
      "선택한 프리셋마다 이미지가 하나씩 만들어지므로 사진 10장에 프리셋 3개를 고르면 파일 30개가 생깁니다.",
      "자르는 위치는 위·가운데·아래 중에서 자동으로 정해집니다. 한 장을 직접 원하는 대로 자르려면 먼저 이미지 자르기 도구로 자른 뒤 그 파일을 여기에 추가하세요.",
      "프리셋보다 작은 사진을 ‘잘라서 채우기’로 처리하면 확대되어 흐려 보일 수 있습니다. 여백 채우기는 확대하지 않습니다.",
      "여기서는 텍스트 워터마크만 넣을 수 있습니다. 로고 워터마크는 워터마크 넣기 도구를 이용하세요.",
      "최대 100장, 장당 50MB까지 처리합니다. 메타데이터는 남지 않으며, 움직이는 GIF는 한 프레임만 남습니다.",
    ],
    faq: [
      {
        q: "인스타그램에는 어떤 크기가 좋나요?",
        a: "피드 사진은 화면을 가장 넓게 차지하는 1080×1350(4:5)을 가장 많이 씁니다. 지금은 프로필 그리드가 3:4 비율로 더 길게 보이므로, 그리드에서 잘리지 않게 하려면 1080×1440을 쓰세요. 스토리와 릴스는 1080×1920입니다.",
      },
      {
        q: "스토리를 올린 뒤 사진이 흐려 보여요.",
        a: "플랫폼은 업로드한 이미지를 다시 압축합니다. 권장 크기에 정확히 맞춘 선명한 이미지로 시작하는 것이 가장 좋으며, 프리셋보다 작게 내보내지 마세요.",
      },
      {
        q: "자주 쓰는 플랫폼 조합을 저장할 수 있나요?",
        a: "네. 마지막 설정은 이 브라우저에 기억되고, ‘주간 게시물’처럼 이름을 붙여 프리셋으로 저장할 수도 있습니다.",
      },
      {
        q: "사진이 업로드되나요?",
        a: "아니요. 자르기, 크기 조절, 워터마크 넣기는 모두 브라우저 안에서 처리되며 서버로 아무것도 보내지 않습니다.",
      },
    ],
  },
};

export default content;
