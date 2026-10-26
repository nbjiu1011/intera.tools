import type { Locale } from "../../i18n/config";
import type { WorkflowContent } from "../types";

const content: Record<Locale, WorkflowContent> = {
  en: {
    name: "Web Image Optimization",
    short: "Resize to a max width, convert to WebP and compress in one pass",
    metaTitle: "Optimize Images for the Web – Resize & Convert to WebP",
    metaDescription:
      "Make website images load faster: cap the width at 1600 or 1920 px, convert to WebP or JPG, set the quality and keep originals that are already smaller.",
    h1: "Web image optimization",
    lead: "Prepare a batch of images for a website or blog: cap their width, convert them to WebP, compress them, and see exactly how much you saved before downloading a ZIP.",
    stepLabels: ["Add images", "Cap width", "Convert", "Compress", "Download ZIP"],
    useCases: [
      {
        title: "Blog posts and landing pages",
        body: "Camera photos are often 4000–6000 px wide, while most page layouts show images at 1600 px or less. Capping the width removes pixels nobody sees and is usually the biggest single saving.",
      },
      {
        title: "Fixing a slow page",
        body: "If a speed test points at oversized images, run the page’s images through this workflow and replace them with the WebP versions of the same names.",
      },
      {
        title: "Uploads to a CMS with size limits",
        body: "Some site builders reject files above a few megabytes. A width cap plus WebP or JPG at quality 80 brings most photos well under common limits.",
      },
    ],
    about: {
      title: "What each step does",
      paragraphs: [
        "First, any image wider than the maximum width is scaled down with its proportions kept; narrower images are left at their size, never enlarged. Pick the width from your layout: the widest an image is ever displayed, times about 1.5–2 if you want it crisp on high-density screens but don’t want to waste bytes. 1600 px suits most full-width content images.",
        "Next, the image is encoded as WebP (or JPG, or its original format) at the quality you set. WebP keeps transparency and is supported by all current major browsers. If your browser can’t create WebP files — Safari, for example — the workflow saves JPG instead and tells you so. Quality 75–85 is a common range for photos; check the comparison on the result screen and adjust if needed.",
        "With “Keep the original if the result is larger” on, any image whose output has the same pixel size but isn’t smaller than the original is returned unchanged, so already-optimized files are never made worse. File names keep the original name, optionally lowercased with hyphens, which is friendlier in URLs. The result screen shows the size before and after for each file and the total saved.",
      ],
    },
    limits: [
      "Up to 100 images per run, 50 MB each; accepts JPG, PNG, WebP, GIF, BMP, AVIF, SVG and, where the browser can decode it, HEIC.",
      "WebP output depends on browser support; where it isn’t available, JPG is used.",
      "Responsive image sets (several widths of the same image) aren’t generated in one run — run the workflow once per width.",
      "Metadata (camera details, GPS) is removed from re-encoded images; originals kept by the size check are returned untouched.",
      "SVG and other vector images are rasterized to pixels.",
    ],
    faq: [
      {
        q: "WebP or JPG?",
        a: "For a website, WebP is usually smaller at similar visual quality and also supports transparency. Use JPG if the images must be opened by people or systems that don’t handle WebP. The Image Format Comparison tool shows both sizes for one of your own images.",
      },
      {
        q: "What maximum width should I pick?",
        a: "Match the largest size the image is displayed at in your layout. For full-width content images 1600–1920 px is common; thumbnails and cards need far less.",
      },
      {
        q: "Why was an image returned unchanged?",
        a: "Its optimized version came out the same size or larger than the original at the same pixel size, so the original was kept. That usually means it was already well compressed.",
      },
      {
        q: "Are images uploaded to a server?",
        a: "No. Resizing, conversion and compression all happen in your browser.",
      },
    ],
  },
  ko: {
    name: "웹 이미지 최적화",
    short: "최대 가로 크기 제한, WebP 변환, 압축을 한 번에",
    metaTitle: "웹 이미지 최적화 – 크기 줄이고 WebP 변환",
    metaDescription:
      "홈페이지 이미지를 가볍게 만듭니다. 가로 크기를 1600px이나 1920px로 제한하고, WebP(또는 JPG)로 변환하고, 품질을 정하고, 이미 더 작은 원본은 그대로 둡니다. 무료이며 업로드가 없습니다.",
    h1: "웹 이미지 최적화",
    lead: "홈페이지나 블로그에 올릴 이미지를 한 번에 준비합니다. 가로 크기를 제한하고, WebP로 바꾸고, 압축한 뒤 얼마나 줄었는지 확인하고 ZIP으로 받으세요.",
    stepLabels: ["이미지 추가", "가로 크기 제한", "변환", "압축", "ZIP 받기"],
    useCases: [
      {
        title: "블로그 글과 랜딩 페이지",
        body: "카메라 사진은 가로 4000~6000px인 경우가 많지만, 대부분의 페이지는 이미지를 1600px 이하로 보여 줍니다. 가로 크기만 제한해도 아무도 보지 않는 픽셀이 사라져 가장 크게 줄어듭니다.",
      },
      {
        title: "느린 페이지 개선",
        body: "속도 측정 도구가 큰 이미지를 지적한다면, 해당 페이지 이미지를 이 워크플로로 처리한 뒤 같은 이름의 WebP 파일로 교체하세요.",
      },
      {
        title: "용량 제한이 있는 홈페이지 빌더",
        body: "일부 홈페이지 빌더나 쇼핑몰 관리자는 몇 MB가 넘는 파일을 받지 않습니다. 가로 크기를 제한하고 품질 80의 WebP나 JPG로 저장하면 대부분의 사진이 흔한 제한보다 훨씬 작아집니다.",
      },
    ],
    about: {
      title: "단계별로 하는 일",
      paragraphs: [
        "먼저 최대 가로 크기보다 넓은 이미지를 비율을 유지한 채 줄입니다. 더 좁은 이미지는 그대로 두며 확대하지 않습니다. 가로 크기는 레이아웃에서 이미지가 가장 크게 보이는 너비를 기준으로 정하세요. 고해상도 화면에서도 선명하게 보이게 하려면 그 1.5~2배 정도가 적당하고, 그 이상은 용량만 늘어납니다. 본문 전체 너비 이미지라면 대개 1600px이면 충분합니다.",
        "다음으로 설정한 품질로 WebP(또는 JPG, 원래 형식)로 저장합니다. WebP는 투명 배경을 유지하며 현재 주요 브라우저에서 모두 표시됩니다. 사용하는 브라우저가 WebP 파일을 만들 수 없다면(예: Safari) JPG로 저장하고 그 사실을 알려 줍니다. 사진은 품질 75~85를 많이 쓰며, 결과 화면에서 용량을 확인하고 필요하면 조절하세요.",
        "‘결과가 더 크면 원본 유지’를 켜 두면, 픽셀 크기는 같은데 결과가 원본보다 작아지지 않은 이미지는 원본을 그대로 돌려줍니다. 이미 잘 최적화된 파일이 오히려 나빠지는 일이 없습니다. 파일 이름은 원래 이름을 유지하며, 원하면 URL에 쓰기 좋게 소문자와 하이픈으로 바꿉니다. 결과 화면에서 파일별 전후 용량과 전체 절감량을 확인할 수 있습니다.",
      ],
    },
    limits: [
      "한 번에 최대 100장, 장당 50MB까지 처리하며 JPG, PNG, WebP, GIF, BMP, AVIF, SVG와 브라우저가 지원하는 경우 HEIC를 받습니다.",
      "WebP 저장은 브라우저 지원에 따라 다르며, 지원하지 않으면 JPG로 저장합니다.",
      "같은 이미지를 여러 너비로 만드는 반응형 이미지 세트는 한 번에 만들지 않습니다. 너비마다 워크플로를 한 번씩 실행하세요.",
      "다시 저장한 이미지에서는 메타데이터(촬영 정보, GPS)가 제거됩니다. 용량 확인으로 유지된 원본은 그대로 돌려줍니다.",
      "SVG 같은 벡터 이미지는 픽셀 이미지로 바뀝니다.",
    ],
    faq: [
      {
        q: "WebP와 JPG 중 무엇을 써야 하나요?",
        a: "홈페이지용이라면 WebP가 비슷한 화질에서 대개 더 작고 투명 배경도 지원합니다. WebP를 열지 못하는 사람이나 시스템에 보내야 한다면 JPG를 쓰세요. 이미지 포맷 비교 도구에서 내 이미지로 두 형식의 용량을 직접 비교할 수 있습니다.",
      },
      {
        q: "최대 가로 크기는 얼마로 해야 하나요?",
        a: "레이아웃에서 이미지가 가장 크게 보이는 크기에 맞추세요. 본문 전체 너비 이미지는 1600~1920px을 많이 쓰고, 썸네일이나 카드 이미지는 훨씬 작아도 됩니다.",
      },
      {
        q: "왜 어떤 이미지는 그대로 돌아왔나요?",
        a: "같은 픽셀 크기에서 최적화한 결과가 원본과 같거나 더 커서 원본을 유지한 것입니다. 대개 이미 잘 압축된 이미지라는 뜻입니다.",
      },
      {
        q: "이미지가 서버로 업로드되나요?",
        a: "아니요. 크기 조절, 변환, 압축이 모두 브라우저 안에서 이루어집니다.",
      },
    ],
  },
};

export default content;
