import type { Locale } from "../../i18n/config";
import type { GuideContent } from "../types";

// Measurements: Chrome 156 (macOS) canvas encoders — the same ones Intera Tools uses —
// run on 26 Oct 2026 over six images from the Kodak Lossless True Color Image Suite
// (kodim01/03/05/15/20/23, 768×512), a 1440×900 screenshot of an Intera Tools page and
// the Intera logo rendered at 1024×1024 with a transparent background. PNG-8 uses the
// same UPNG.js palette quantizer (256 colors) as Compress Image. 1 KB = 1024 bytes.

const guide: Record<Locale, GuideContent> = {
  en: {
    title: "JPG vs PNG vs WebP: real file sizes, measured",
    metaTitle: "JPG vs PNG vs WebP File Size Comparison (Measured)",
    metaDescription:
      "We encoded photos, a screenshot and a logo as JPG, PNG, PNG-8 and WebP in Chrome and measured every file. See the sizes, what they mean and which format to pick.",
    summary:
      "Format advice is usually given in round percentages. Here are actual numbers: the same eight images saved as JPG, PNG, 256-color PNG and WebP with the browser encoders Intera Tools uses, plus what the results mean for photos, screenshots and logos.",
    takeaways: [
      "For photos, WebP at quality 75 averaged **44 KB** against **61 KB** for JPG at 75 and **823 KB** for lossless PNG.",
      "Same quality number ≠ same quality: WebP and JPG use different scales, so compare by eye, not by the slider value.",
      "Re-saving an already optimized PNG in a browser made it **30–54% larger** — PNG is the wrong choice for photos and needs a palette to shrink.",
      "For a flat logo with transparency, 256-color PNG (25 KB) and WebP (14–19 KB) beat lossless PNG (412 KB) by a wide margin.",
    ],
    body: [
      { type: "h2", text: "How we measured" },
      {
        type: "p",
        text: "We used Chrome 156 on macOS and its built-in canvas encoders — the same encoders that run when you use [Convert Image](/convert-image) or [Compress Image](/compress-image) in Chrome. Each image was drawn onto a canvas and saved as lossless PNG, 256-color PNG (PNG-8, using the same palette quantizer as Compress Image), WebP at quality 75 and 90, and JPG at quality 75 and 90. JPG has no transparency, so transparent areas were filled with white first.",
      },
      {
        type: "ul",
        items: [
          "**Photos:** six images from the Kodak Lossless True Color Image Suite (kodim01, 03, 05, 15, 20 and 23), a standard set used in image compression research. They are 768×512 pixels, so absolute sizes are smaller than for a 12-megapixel phone photo, but the ratios between formats are what matters here.",
          "**Screenshot:** a 1440×900 screenshot of an Intera Tools page — text, flat colors and a few icons.",
          "**Graphic:** the Intera logo rendered at 1024×1024 with a transparent background — smooth gradients and hard edges.",
        ],
      },
      {
        type: "note",
        tone: "info",
        text: "Other encoders give other numbers. Desktop apps and command-line tools such as MozJPEG or cwebp with tuned settings often produce smaller files than a browser at the same nominal quality. Treat these figures as what you get from in-browser tools, not as the limit of each format.",
      },
      { type: "h2", text: "Photos: the results" },
      {
        type: "table",
        caption: "File sizes in KB (1 KB = 1024 bytes). Kodak images are 768×512. Measured in Chrome 156, October 2026.",
        head: ["Image", "PNG", "PNG-8", "JPG 90", "JPG 75", "WebP 90", "WebP 75"],
        rows: [
          ["kodim01 (stone wall, fine texture)", "952", "288", "150", "90", "134", "76"],
          ["kodim03 (hats, smooth colors)", "755", "145", "77", "44", "54", "25"],
          ["kodim05 (motorbikes, busy detail)", "994", "255", "156", "98", "139", "79"],
          ["kodim15 (portrait)", "793", "199", "90", "50", "73", "32"],
          ["kodim20 (aircraft, sky)", "677", "185", "76", "44", "60", "28"],
          ["kodim23 (parrots)", "765", "149", "75", "40", "55", "23"],
          ["**Average**", "**823**", "**204**", "**104**", "**61**", "**86**", "**44**"],
        ],
      },
      {
        type: "p",
        text: "At quality 75, WebP files were on average **28% smaller** than JPG files at quality 75; at quality 90 the gap was **18%**. The difference depends heavily on content: on kodim01, a wall full of fine stone texture, WebP saved only 15%, while on the smooth, colorful kodim23 it saved 42%. Fine, random detail is expensive in every lossy format; large smooth areas are where WebP pulls ahead.",
      },
      {
        type: "p",
        text: "Lossless PNG is in a different league for photos: roughly **8 to 13 times larger** than JPG. Even reduced to a 256-color palette, a PNG photo was still about twice the size of a JPG at quality 90 — and a palette can show visible banding in skies and skin tones.",
      },
      { type: "h3", text: "Why the quality numbers don’t line up" },
      {
        type: "p",
        text: "“Quality 75” is not a shared unit. JPG and WebP map the number to their own internal settings, so WebP 75 and JPG 75 don’t look identical. A fair comparison is visual: save both, zoom to 100% on areas with fine detail and edges, and pick the smallest file you can’t tell apart from the original. The [Image Format Comparison](/image-format-comparison) tool does exactly that with your own image and a split-view preview.",
      },
      { type: "h2", text: "PNG got bigger when re-saved" },
      {
        type: "p",
        text: "The Kodak images are distributed as PNG files that were already well compressed. Re-saving them through the browser’s PNG encoder made them **30–54% larger** (for example kodim01 went from 719 KB to 952 KB). Browsers favor encoding speed over the smallest possible PNG, and they don’t try the many filter and compression combinations that dedicated optimizers do. That’s why Intera’s Compress Image reduces PNGs with a color palette instead of simply re-saving them, and keeps the original when the result would be larger.",
      },
      { type: "h2", text: "Screenshots and graphics" },
      {
        type: "table",
        caption: "File sizes in KB. Screenshot 1440×900; logo 1024×1024 with transparency.",
        head: ["Image", "PNG", "PNG-8", "JPG 90", "JPG 75", "WebP 90", "WebP 75"],
        rows: [
          ["Screenshot (text, UI)", "367", "71", "85", "56", "48", "30"],
          ["Logo with transparency", "412", "25", "33", "21", "19", "14"],
        ],
      },
      {
        type: "p",
        text: "For the screenshot, PNG-8 came in at 71 KB — smaller than JPG at quality 90 — without the compression artifacts lossy formats add around text, because a 256-color palette is enough for most interface screenshots. JPG is smaller only at quality 75, and that is where its typical ringing around text appears. WebP at 90 was smaller still at 48 KB; at 75 it was the smallest, but lossy compression can soften very small text, so check before you settle on it.",
      },
      {
        type: "p",
        text: "The logo shows the biggest spread: 412 KB as lossless PNG versus 25 KB as PNG-8 and 14–19 KB as WebP — all three keeping the transparent background. JPG is small too, but it can’t store transparency, so the logo would sit on a white box wherever you place it. See [how PNG transparency works](/guides/png-transparency-explained) for what happens when transparency is flattened.",
      },
      { type: "h2", text: "Which format should you use?" },
      {
        type: "table",
        head: ["Content", "Best choice", "Why"],
        rows: [
          ["Photos for a website", "WebP (quality 75–85)", "Smallest in every photo we tested; supported by all current major browsers."],
          ["Photos to send, print or upload anywhere", "JPG (quality 80–90)", "Opens everywhere, including older apps and upload forms that reject WebP."],
          ["Screenshots with text", "PNG-8 or WebP at high quality", "Sharp text at a fraction of lossless PNG size; avoid low-quality JPG."],
          ["Logos and icons with transparency", "PNG-8 or WebP", "Keep transparency; lossless PNG is many times larger with no visible benefit."],
          ["Images you will keep editing", "Lossless PNG (or the original)", "No generation loss between edits; convert at the end."],
        ],
      },
      {
        type: "tool",
        slug: "image-format-comparison",
        text: "Encode one of your own images as JPG, PNG, PNG-8 and WebP, see each file size and compare them side by side at 100%.",
      },
      { type: "h2", text: "Run the same test on your images" },
      {
        type: "steps",
        items: [
          { title: "Open Image Format Comparison and add one image", body: "Use a typical image from your site or project, not an unusually simple one." },
          { title: "Set the quality and, if needed, a maximum width", body: "Test the width you will actually publish at — resizing changes sizes far more than any format choice." },
          { title: "Compare at 100% zoom", body: "Drag the divider over edges, text and smooth gradients. Pick the smallest version you can’t distinguish from the original, then download it." },
          { title: "Process the rest in one go", body: "Once you know the format and quality, apply them to a whole folder with the [Web Image Optimization](/workflows/web-image-optimization) workflow or [Convert Image](/convert-image)." },
        ],
      },
    ],
    faq: [
      {
        q: "Is WebP always smaller than JPG?",
        a: "In our tests WebP was smaller for every image, by 11–47% depending on content and quality. With other encoders or settings the gap can shrink or, for some images, reverse — which is why testing your own images is worthwhile.",
      },
      {
        q: "Why is my PNG larger after converting it?",
        a: "Browser PNG encoders aim for speed, not the smallest file, so re-saving an optimized PNG usually makes it bigger. Use Compress Image, which reduces PNGs with a color palette and keeps the original if it can’t do better.",
      },
      {
        q: "Should I convert all my JPGs to WebP?",
        a: "For images on your own website, usually yes — after resizing them to the displayed size. Keep JPG for files you send to other people or upload to services that may not accept WebP.",
      },
      {
        q: "Do these numbers apply to Safari?",
        a: "JPG and PNG sizes will be similar but not identical, because Safari uses its own encoders. Safari can display WebP but can’t save WebP from a web page, so Intera’s WebP options are unavailable there.",
      },
    ],
  },
  ko: {
    title: "JPG vs PNG vs WebP, 실제 용량을 재 봤습니다",
    metaTitle: "JPG·PNG·WebP 용량 비교 실측",
    metaDescription:
      "사진, 스크린샷, 로고를 Chrome에서 JPG, PNG, PNG-8, WebP로 저장해 용량을 하나하나 쟀습니다. 결과 표와 해석, 용도별 추천 형식을 정리했습니다.",
    summary:
      "이미지 형식 추천은 보통 ‘몇 % 더 작다’는 어림수로만 이야기됩니다. 여기서는 같은 이미지 8개를 Intera Tools가 쓰는 브라우저 인코더로 JPG, PNG, 256색 PNG, WebP로 저장해 실제 용량을 쟀고, 사진·스크린샷·로고별로 결과가 무엇을 뜻하는지 정리했습니다.",
    takeaways: [
      "사진은 품질 75 기준 WebP가 평균 **44KB**, JPG가 **61KB**, 무손실 PNG가 **823KB**였습니다.",
      "품질 숫자가 같다고 화질이 같지는 않습니다. WebP와 JPG는 품질 척도가 다르므로 숫자가 아니라 눈으로 비교하세요.",
      "이미 최적화된 PNG를 브라우저에서 다시 저장하면 **30~54% 커졌습니다**. 사진에 PNG는 맞지 않고, PNG를 줄이려면 팔레트 방식이 필요합니다.",
      "투명 배경 로고는 256색 PNG(25KB)와 WebP(14~19KB)가 무손실 PNG(412KB)보다 훨씬 작았습니다.",
    ],
    body: [
      { type: "h2", text: "측정 방법" },
      {
        type: "p",
        text: "macOS의 Chrome 156과 그 안에 내장된 캔버스 인코더를 사용했습니다. Chrome에서 [이미지 변환](/convert-image)이나 [이미지 압축](/compress-image)을 쓸 때 실제로 동작하는 인코더와 같습니다. 각 이미지를 캔버스에 그린 뒤 무손실 PNG, 256색 PNG(PNG-8, 이미지 압축과 같은 팔레트 양자화 사용), 품질 75·90의 WebP, 품질 75·90의 JPG로 저장했습니다. JPG는 투명도를 저장할 수 없으므로 투명한 부분을 먼저 흰색으로 채웠습니다.",
      },
      {
        type: "ul",
        items: [
          "**사진:** 이미지 압축 연구에서 표준처럼 쓰이는 Kodak Lossless True Color Image Suite 중 6장(kodim01, 03, 05, 15, 20, 23)입니다. 768×512 크기라 1,200만 화소 휴대폰 사진보다 용량 자체는 작지만, 여기서 중요한 것은 형식 사이의 비율입니다.",
          "**스크린샷:** Intera Tools 페이지를 1440×900으로 캡처한 이미지입니다. 글자, 단색 영역, 아이콘이 들어 있습니다.",
          "**그래픽:** Intera 로고를 투명 배경으로 1024×1024에 렌더링한 이미지입니다. 부드러운 그라데이션과 날카로운 가장자리가 있습니다.",
        ],
      },
      {
        type: "note",
        tone: "info",
        text: "인코더가 다르면 결과도 다릅니다. MozJPEG나 cwebp 같은 전용 도구를 세밀하게 설정하면 같은 품질 값에서 브라우저보다 더 작은 파일이 나오는 경우가 많습니다. 이 수치는 각 형식의 한계가 아니라 브라우저 기반 도구에서 얻는 결과로 보시면 됩니다.",
      },
      { type: "h2", text: "사진 측정 결과" },
      {
        type: "table",
        caption: "용량 단위 KB(1KB = 1024바이트). Kodak 이미지는 768×512. 2026년 10월 Chrome 156에서 측정.",
        head: ["이미지", "PNG", "PNG-8", "JPG 90", "JPG 75", "WebP 90", "WebP 75"],
        rows: [
          ["kodim01 (돌담, 미세한 질감)", "952", "288", "150", "90", "134", "76"],
          ["kodim03 (모자, 부드러운 색면)", "755", "145", "77", "44", "54", "25"],
          ["kodim05 (오토바이, 복잡한 디테일)", "994", "255", "156", "98", "139", "79"],
          ["kodim15 (인물)", "793", "199", "90", "50", "73", "32"],
          ["kodim20 (비행기, 하늘)", "677", "185", "76", "44", "60", "28"],
          ["kodim23 (앵무새)", "765", "149", "75", "40", "55", "23"],
          ["**평균**", "**823**", "**204**", "**104**", "**61**", "**86**", "**44**"],
        ],
      },
      {
        type: "p",
        text: "품질 75에서 WebP는 JPG(품질 75)보다 평균 **28% 작았고**, 품질 90에서는 차이가 **18%**였습니다. 차이는 이미지 내용에 크게 좌우됩니다. 미세한 돌 질감이 화면을 가득 채운 kodim01에서는 WebP가 15%만 줄었지만, 부드러운 색면이 많은 kodim23에서는 42% 줄었습니다. 무작위로 촘촘한 디테일은 어떤 손실 형식에서도 용량을 많이 차지하고, 넓고 매끈한 영역에서 WebP가 앞섭니다.",
      },
      {
        type: "p",
        text: "사진에서 무손실 PNG는 전혀 다른 수준입니다. JPG보다 **8~13배** 컸습니다. 256색 팔레트로 줄여도 PNG 사진은 품질 90 JPG의 두 배쯤 되었고, 팔레트 방식은 하늘이나 피부처럼 부드러운 색 변화에서 계단 현상이 보일 수 있습니다.",
      },
      { type: "h3", text: "품질 숫자가 서로 맞지 않는 이유" },
      {
        type: "p",
        text: "‘품질 75’는 공통 단위가 아닙니다. JPG와 WebP는 이 숫자를 각자의 내부 설정으로 바꾸기 때문에 WebP 75와 JPG 75가 똑같아 보이지 않습니다. 공정하게 비교하려면 두 파일을 저장한 뒤 디테일과 가장자리가 있는 부분을 100%로 확대해 보고, 원본과 구분되지 않는 가장 작은 파일을 고르세요. [이미지 포맷 비교](/image-format-comparison) 도구가 내 이미지로 이 과정을 나란히 보여 줍니다.",
      },
      { type: "h2", text: "PNG는 다시 저장했더니 오히려 커졌습니다" },
      {
        type: "p",
        text: "Kodak 이미지는 이미 잘 압축된 PNG로 배포됩니다. 이를 브라우저의 PNG 인코더로 다시 저장하자 **30~54% 커졌습니다**(예: kodim01은 719KB에서 952KB). 브라우저는 가장 작은 PNG보다 저장 속도를 우선하고, 전용 최적화 도구처럼 여러 필터와 압축 조합을 시도하지 않기 때문입니다. 그래서 Intera의 이미지 압축은 PNG를 그냥 다시 저장하지 않고 색상 팔레트로 줄이며, 결과가 더 크면 원본을 그대로 둡니다.",
      },
      { type: "h2", text: "스크린샷과 그래픽" },
      {
        type: "table",
        caption: "용량 단위 KB. 스크린샷 1440×900, 로고 1024×1024(투명 배경).",
        head: ["이미지", "PNG", "PNG-8", "JPG 90", "JPG 75", "WebP 90", "WebP 75"],
        rows: [
          ["스크린샷(글자, UI)", "367", "71", "85", "56", "48", "30"],
          ["투명 배경 로고", "412", "25", "33", "21", "19", "14"],
        ],
      },
      {
        type: "p",
        text: "스크린샷은 PNG-8이 71KB로 품질 90 JPG보다 작았고, 손실 압축처럼 글자 주변에 잡티를 만들지도 않습니다. 대부분의 화면 캡처에는 256색이면 충분하기 때문입니다. JPG는 품질 75에서만 더 작아지는데, 바로 이 구간에서 글자 주변에 번지는 잡티가 생기기 쉽습니다. WebP는 품질 90에서 48KB로 더 작았고 품질 75에서 가장 작았지만, 손실 압축은 아주 작은 글자를 흐리게 만들 수 있으니 확인한 뒤 정하세요.",
      },
      {
        type: "p",
        text: "로고에서 차이가 가장 컸습니다. 무손실 PNG는 412KB였지만 PNG-8은 25KB, WebP는 14~19KB였고 셋 다 투명 배경을 유지했습니다. JPG도 작긴 하지만 투명도를 저장하지 못해 어디에 올려도 흰 상자가 생깁니다. 투명도를 없앨 때 어떤 일이 생기는지는 [PNG 투명 배경의 원리](/guides/png-transparency-explained)에서 설명합니다.",
      },
      { type: "h2", text: "어떤 형식을 써야 할까요?" },
      {
        type: "table",
        head: ["용도", "추천 형식", "이유"],
        rows: [
          ["홈페이지에 올릴 사진", "WebP(품질 75~85)", "측정한 모든 사진에서 가장 작았고, 현재 주요 브라우저가 모두 지원합니다."],
          ["보내거나 인쇄하거나 여기저기 올릴 사진", "JPG(품질 80~90)", "오래된 앱이나 WebP를 받지 않는 업로드 양식까지 어디서나 열립니다."],
          ["글자가 있는 스크린샷", "PNG-8 또는 높은 품질의 WebP", "무손실 PNG보다 훨씬 작으면서 글자가 선명합니다. 낮은 품질 JPG는 피하세요."],
          ["투명 배경 로고·아이콘", "PNG-8 또는 WebP", "투명도를 유지합니다. 무손실 PNG는 눈에 띄는 이점 없이 몇 배나 큽니다."],
          ["계속 편집할 이미지", "무손실 PNG(또는 원본)", "편집할 때마다 화질이 떨어지지 않습니다. 마지막에 변환하세요."],
        ],
      },
      {
        type: "tool",
        slug: "image-format-comparison",
        text: "내 이미지를 JPG, PNG, PNG-8, WebP로 저장해 파일별 용량을 보고, 100% 확대로 나란히 비교해 보세요.",
      },
      { type: "h2", text: "내 이미지로 같은 실험 하기" },
      {
        type: "steps",
        items: [
          { title: "이미지 포맷 비교를 열고 이미지 한 장을 추가합니다", body: "유난히 단순한 이미지 말고, 실제로 쓰는 대표적인 이미지를 고르세요." },
          { title: "품질과 필요하면 최대 가로 크기를 정합니다", body: "실제로 게시할 크기로 테스트하세요. 크기 조절이 형식 선택보다 용량을 훨씬 크게 바꿉니다." },
          { title: "100%로 확대해 비교합니다", body: "가장자리, 글자, 부드러운 그라데이션 위로 구분선을 움직여 보세요. 원본과 구분되지 않는 가장 작은 버전을 골라 내려받습니다." },
          { title: "나머지는 한 번에 처리합니다", body: "형식과 품질이 정해지면 [웹 이미지 최적화](/workflows/web-image-optimization) 워크플로나 [이미지 변환](/convert-image)으로 폴더 전체에 적용하세요." },
        ],
      },
    ],
    faq: [
      {
        q: "WebP가 항상 JPG보다 작나요?",
        a: "이번 측정에서는 모든 이미지에서 WebP가 내용과 품질에 따라 11~47% 작았습니다. 다른 인코더나 설정에서는 차이가 줄거나 일부 이미지에서는 뒤집힐 수도 있으므로 내 이미지로 직접 확인해 보는 것이 좋습니다.",
      },
      {
        q: "PNG를 변환했더니 왜 더 커졌나요?",
        a: "브라우저의 PNG 인코더는 가장 작은 파일보다 속도를 우선하므로, 최적화된 PNG를 다시 저장하면 대개 커집니다. 색상 팔레트로 PNG를 줄이고 더 줄일 수 없으면 원본을 유지하는 이미지 압축을 쓰세요.",
      },
      {
        q: "JPG를 전부 WebP로 바꿔야 하나요?",
        a: "내 홈페이지에 쓰는 이미지라면, 표시되는 크기로 줄인 뒤 바꾸는 것이 대체로 좋습니다. 다른 사람에게 보내거나 WebP를 받지 않을 수 있는 서비스에 올리는 파일은 JPG로 두세요.",
      },
      {
        q: "Safari에서도 같은 결과가 나오나요?",
        a: "Safari는 자체 인코더를 쓰므로 JPG와 PNG 용량이 비슷하지만 똑같지는 않습니다. Safari는 WebP를 표시할 수는 있지만 웹 페이지에서 WebP로 저장할 수 없어, Intera의 WebP 옵션을 쓸 수 없습니다.",
      },
    ],
  },
};

export default guide;
