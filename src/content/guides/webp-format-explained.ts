import type { Locale } from "../../i18n/config";
import type { GuideContent } from "../types";

const guide: Record<Locale, GuideContent> = {
  en: {
    title: "WebP Explained: How It Works, Browser Support and When to Avoid It",
    metaTitle: "WebP Format Explained: Support, Savings and Limits",
    metaDescription:
      "What WebP is, how its lossy and lossless modes work, how much smaller it really is, which browsers support it, and when JPG or PNG is still the better choice.",
    summary:
      "WebP is an image format from Google that can replace both JPG and PNG on the web: it has a lossy mode for photos, a lossless mode for graphics, transparency and animation. It is supported by every current major browser, yet a WebP file can still cause trouble once it leaves the browser. This guide covers how the format works, what the size savings actually are, and when to convert to something else.",
    takeaways: [
      "WebP has a lossy mode based on the VP8 video codec and a separate lossless mode. Both support transparency, and both can be animated.",
      "Google's own studies report lossy WebP 25–34% smaller than JPEG at equal SSIM quality, and lossless WebP 26% smaller than PNG. Your images will vary.",
      "All current versions of Chrome, Edge, Firefox, Opera and Safari can display WebP. Creating WebP files in the browser is less universal: Safari has not supported canvas WebP encoding.",
      "WebP is a web delivery format. For email attachments, print shops, office software and strict upload forms, JPG or PNG is safer.",
    ],
    body: [
      { type: "h2", text: "What WebP is" },
      {
        type: "p",
        text: "Google introduced WebP in 2010 as a smaller alternative to JPEG for web pages, and later added lossless compression, transparency and animation. A WebP file is a container (RIFF) that holds either lossy or lossless image data, optionally with an alpha channel and multiple frames. The extension is `.webp` and the MIME type is `image/webp`. Images can be up to 16,383 × 16,383 pixels.",
      },
      { type: "h3", text: "Lossy mode" },
      {
        type: "p",
        text: "Lossy WebP uses the same method as a key frame in the VP8 video codec. The image is split into blocks. Each block is predicted from pixels that were already decoded next to it, and only the difference between the prediction and the real pixels is stored. That difference is transformed, quantized (the step where detail is discarded) and entropy-coded. Compared with JPEG, the block prediction and better entropy coding are where most of the savings come from.",
      },
      {
        type: "p",
        text: "One limitation is worth knowing: lossy WebP always stores color at half resolution horizontally and vertically (4:2:0 chroma subsampling). Photos hide this well, but small red text, thin colored lines and sharp color edges in screenshots can look slightly blurred or bleed. JPEG encoders can keep full color resolution, and PNG or lossless WebP never subsample.",
      },
      { type: "h3", text: "Lossless mode" },
      {
        type: "p",
        text: "Lossless WebP is a separate codec. Before compressing, it transforms the image: it predicts pixels from their neighbors, decorrelates the color channels, builds a palette when there are few colors, and keeps a cache of recently used colors. Repeated areas are stored as references to earlier pixels. The decoded image is identical to the original, just like PNG.",
      },
      { type: "h3", text: "Transparency and animation" },
      {
        type: "p",
        text: "Both modes support an 8-bit alpha channel. The lossy mode can pair lossy color with a separately compressed alpha channel, which is something neither JPEG (no alpha) nor PNG (lossless only) can do. Animated WebP is an alternative to GIF with full color and alpha. Note that most tools, including Intera Tools, read only the first frame of an animation.",
      },

      { type: "h2", text: "How much smaller is WebP?" },
      {
        type: "table",
        caption: "Size figures published by Google (developers.google.com/speed/webp)",
        head: ["Comparison", "Google's reported result"],
        rows: [
          ["Lossy WebP vs JPEG", "25–34% smaller at equal SSIM quality"],
          ["Lossless WebP vs PNG", "26% smaller"],
          ["Cost of adding transparency to lossless WebP", "about 22% more bytes"],
          ["Lossy WebP with transparency vs PNG", "typically about 3× smaller"],
        ],
      },
      {
        type: "p",
        text: "These are averages from Google's test sets, measured with Google's own encoder. Two things change the result for your files. First, image content: a detailed photo and a flat illustration behave very differently. Second, the encoder: browsers use their built-in encoders when a web tool creates WebP, and they don't expose every tuning option that a command-line encoder has. A WebP saved at \"quality 80\" is also not the same as a JPG at quality 80, because each format uses its own scale.",
      },
      {
        type: "p",
        text: "The reliable way to know is to test your own image. [Image Format Comparison](/image-format-comparison) encodes one image as JPG, PNG, PNG-8 and WebP in your browser, shows each file size next to the original, tells you whether transparency survived, and lets you compare the results side by side.",
      },
      {
        type: "tool",
        slug: "image-format-comparison",
        text: "Encode one image as JPG, PNG, PNG-8 and WebP and compare size and quality side by side, without uploading it.",
      },

      { type: "h2", text: "Browser support today" },
      {
        type: "p",
        text: "Displaying WebP is no longer a problem in browsers. MDN lists support in all current versions of Chrome, Edge, Firefox, Opera and Safari. The late arrivals were Firefox (version 65, 2019) and Safari (version 14, 2020). On a Mac, Safari 14 and 15 only displayed WebP on macOS Big Sur or later, so a very old Mac can still show a broken image. Can I use estimates global support at about 97%.",
      },
      {
        type: "p",
        text: "**Creating** WebP files in a browser is a different matter. Web tools like Intera Tools draw the image onto a canvas and ask the browser to encode it. Chrome and Edge can encode WebP this way, and Firefox has supported it since version 96. Safari has not: when asked for WebP, it returns a PNG instead. Intera Tools checks this before you start, and in browsers that can't encode WebP the WebP option is disabled with the message \"This browser can't create WebP files.\" Opening and converting WebP files to JPG or PNG still works in Safari.",
      },

      { type: "h2", text: "When not to use WebP" },
      {
        type: "ul",
        items: [
          "**Sending files to people.** The recipient might open the attachment in older desktop software, an office suite or a photo app that doesn't recognize `.webp`. JPG opens everywhere.",
          "**Upload forms with a fixed list of extensions.** Job portals, government sites, print services and many marketplaces accept only JPG or PNG, and reject or silently mangle WebP.",
          "**Print and professional editing.** WebP is 8-bit RGB only, with no CMYK and no high bit depth. Print shops usually ask for JPG, TIFF or PDF.",
          "**Small colored text and UI screenshots in lossy mode.** Chroma subsampling can soften colored detail. Use PNG or lossless WebP instead.",
          "**Repeated editing.** Each lossy save loses some detail, just like JPG. Keep an original and export WebP as the last step.",
        ],
      },
      {
        type: "note",
        tone: "tip",
        text: "A simple rule: use WebP for images that a web page will display, and JPG or PNG for files that a person or another program will open.",
      },

      { type: "h2", text: "Converting WebP" },
      {
        type: "p",
        text: "To turn a downloaded WebP into something every app can open, use [WebP to JPG](/webp-to-jpg). If the WebP has transparency, the transparent areas are filled with the color set under **Background for transparent areas** (white by default). To keep transparency, or to avoid another lossy step for a graphic, use [Convert Image](/convert-image) with **PNG** as the target. PNG is lossless, so nothing further is lost, but the file will usually be larger than the WebP.",
      },
      {
        type: "p",
        text: "Going the other way, [Convert Image](/convert-image) and [Compress Image](/compress-image) (with **Convert to WebP**) create WebP in browsers that support it. Converting a lossy WebP to JPG is a second lossy step. Detail already discarded by WebP can't be recovered, so use a high **Quality** setting (around 90) to avoid adding visible JPG artifacts on top. In all cases, re-encoding drops metadata such as EXIF and GPS location.",
      },
      {
        type: "workflow",
        slug: "web-image-optimization",
        text: "Preparing images for a website? The web image workflow limits the width, converts to WebP (or JPG as a fallback), keeps the original when the result would be larger, and reports the total savings.",
      },
    ],
    faq: [
      {
        q: "Is WebP always smaller than JPG?",
        a: "No. Google's studies report 25–34% smaller files on average at equal quality, but results depend on the image and the encoder. Some images come out the same size or larger. Test with your own image before converting a whole library.",
      },
      {
        q: "Why can't I select WebP as the output format in Safari?",
        a: "Safari can display WebP, but its canvas can't encode WebP files. When a page asks for WebP, Safari returns a PNG. Intera Tools detects this and disables the option. Use Chrome, Edge or Firefox to create WebP files.",
      },
      {
        q: "Does converting WebP to JPG lose quality?",
        a: "If the WebP is lossy, converting to JPG is a second lossy compression, so a little more detail is lost. At a high quality setting the difference is usually hard to see. Converting to PNG adds no further loss.",
      },
      {
        q: "Can WebP keep a transparent background?",
        a: "Yes. Both lossy and lossless WebP support an alpha channel. Converting a transparent PNG to WebP keeps the transparency, while converting to JPG fills it with a solid color.",
      },
    ],
  },

  ko: {
    title: "WebP 형식 알아보기: 작동 원리, 브라우저 지원, 피해야 할 상황",
    metaTitle: "WebP란? 용량 절감과 호환성 정리",
    metaDescription:
      "WebP가 무엇인지, 손실·무손실 방식이 어떻게 다른지, 실제로 얼마나 작아지는지, 어떤 브라우저가 지원하는지, 그리고 JPG나 PNG가 더 나은 경우는 언제인지 정리했습니다.",
    summary:
      "WebP는 Google이 만든 이미지 형식으로, 웹에서 JPG와 PNG를 모두 대신할 수 있습니다. 사진용 손실 압축, 그래픽용 무손실 압축, 투명 배경, 애니메이션을 모두 지원하고 주요 브라우저의 최신 버전은 전부 WebP를 표시합니다. 하지만 파일이 브라우저 밖으로 나가는 순간 문제가 생기기도 합니다. 이 글에서는 WebP의 원리, 실제 용량 절감 효과, 다른 형식으로 바꿔야 할 때를 설명합니다.",
    takeaways: [
      "WebP에는 VP8 동영상 코덱 기반의 손실 방식과 별도의 무손실 방식이 있으며, 두 방식 모두 투명 배경과 애니메이션을 지원합니다.",
      "Google 자체 연구에 따르면 손실 WebP는 같은 SSIM 화질에서 JPEG보다 25–34%, 무손실 WebP는 PNG보다 26% 작습니다. 실제 결과는 이미지마다 다릅니다.",
      "Chrome, Edge, Firefox, Opera, Safari 최신 버전은 모두 WebP를 표시합니다. 다만 브라우저에서 WebP 파일을 만드는 기능은 Safari가 지원하지 않습니다.",
      "WebP는 웹 게시용 형식입니다. 메일 첨부, 인쇄, 오피스 프로그램, 확장자가 정해진 업로드 양식에는 JPG나 PNG가 안전합니다.",
    ],
    body: [
      { type: "h2", text: "WebP란 무엇인가" },
      {
        type: "p",
        text: "WebP는 Google이 2010년에 웹페이지용으로 JPEG보다 작은 형식을 목표로 발표했고, 이후 무손실 압축, 투명 배경, 애니메이션이 추가되었습니다. WebP 파일은 RIFF라는 컨테이너 안에 손실 또는 무손실 이미지 데이터를 담고, 필요하면 알파 채널과 여러 프레임을 함께 저장합니다. 확장자는 `.webp`, MIME 타입은 `image/webp`이며 최대 16,383 × 16,383 픽셀까지 저장할 수 있습니다.",
      },
      { type: "h3", text: "손실 방식" },
      {
        type: "p",
        text: "손실 WebP는 VP8 동영상 코덱의 키프레임과 같은 방법을 씁니다. 이미지를 블록으로 나누고, 각 블록을 이미 복원된 옆 픽셀로부터 예측한 다음 예측값과 실제 픽셀의 차이만 저장합니다. 이 차이를 변환하고 양자화(디테일을 버리는 단계)한 뒤 엔트로피 부호화로 압축합니다. JPEG와 비교했을 때 절감 효과의 대부분은 블록 예측과 더 효율적인 엔트로피 부호화에서 나옵니다.",
      },
      {
        type: "p",
        text: "알아 둘 한계가 하나 있습니다. 손실 WebP는 색상 정보를 항상 가로·세로 절반 해상도로 저장합니다(4:2:0 크로마 서브샘플링). 사진에서는 거의 티가 나지 않지만, 작은 빨간 글씨나 가는 색선, 스크린샷의 선명한 색 경계는 약간 번지거나 흐려 보일 수 있습니다. JPEG는 인코더 설정에 따라 색상 해상도를 그대로 유지할 수 있고, PNG와 무손실 WebP는 서브샘플링을 하지 않습니다.",
      },
      { type: "h3", text: "무손실 방식" },
      {
        type: "p",
        text: "무손실 WebP는 별도의 코덱입니다. 압축 전에 주변 픽셀로 값을 예측하고, 색상 채널 간의 상관관계를 줄이고, 색이 적으면 팔레트를 만들고, 최근에 쓴 색을 캐시에 보관하는 등 이미지를 변환합니다. 반복되는 영역은 앞에 나온 픽셀을 참조하는 방식으로 저장합니다. 복원한 이미지는 PNG처럼 원본과 완전히 같습니다.",
      },
      { type: "h3", text: "투명 배경과 애니메이션" },
      {
        type: "p",
        text: "두 방식 모두 8비트 알파 채널을 지원합니다. 손실 방식에서는 손실 압축한 색상과 따로 압축한 알파 채널을 함께 쓸 수 있는데, 이는 JPEG(알파 없음)나 PNG(무손실만 가능)로는 할 수 없는 조합입니다. 움직이는 WebP는 GIF를 대신할 수 있고 풀 컬러와 투명도를 지원합니다. 다만 Intera Tools를 포함한 대부분의 도구는 애니메이션의 첫 프레임만 읽습니다.",
      },

      { type: "h2", text: "WebP는 얼마나 작을까" },
      {
        type: "table",
        caption: "Google이 발표한 용량 수치(developers.google.com/speed/webp)",
        head: ["비교 항목", "Google 발표 결과"],
        rows: [
          ["손실 WebP vs JPEG", "같은 SSIM 화질에서 25–34% 작음"],
          ["무손실 WebP vs PNG", "26% 작음"],
          ["무손실 WebP에 투명도를 추가할 때", "약 22% 증가"],
          ["투명도가 있는 손실 WebP vs PNG", "보통 약 3배 작음"],
        ],
      },
      {
        type: "p",
        text: "이 수치는 Google의 테스트 이미지 묶음을 Google 인코더로 압축한 평균값입니다. 내 파일에서는 두 가지 이유로 결과가 달라집니다. 첫째는 이미지 내용입니다. 디테일이 많은 사진과 단색 일러스트는 전혀 다르게 압축됩니다. 둘째는 인코더입니다. 웹 도구가 WebP를 만들 때는 브라우저에 내장된 인코더를 쓰는데, 명령줄 인코더만큼 세부 설정을 제공하지 않습니다. 또 WebP '품질 80'과 JPG '품질 80'은 형식마다 기준이 달라 같은 화질이 아닙니다.",
      },
      {
        type: "p",
        text: "가장 확실한 방법은 내 이미지로 직접 시험해 보는 것입니다. [이미지 포맷 비교](/image-format-comparison)는 이미지 한 장을 브라우저에서 JPG, PNG, PNG-8, WebP로 각각 저장해 원본 대비 용량, 투명도 유지 여부를 보여 주고 결과를 나란히 비교할 수 있게 해 줍니다.",
      },
      {
        type: "tool",
        slug: "image-format-comparison",
        text: "이미지 한 장을 JPG, PNG, PNG-8, WebP로 저장해 용량과 화질을 나란히 비교해 보세요. 업로드는 필요 없습니다.",
      },

      { type: "h2", text: "현재 브라우저 지원 현황" },
      {
        type: "p",
        text: "브라우저에서 WebP를 보는 데는 이제 문제가 없습니다. MDN 기준으로 Chrome, Edge, Firefox, Opera, Safari의 현재 버전은 모두 WebP를 지원합니다. 가장 늦게 합류한 것은 Firefox(65, 2019년)와 Safari(14, 2020년)입니다. Mac에서 Safari 14·15는 macOS Big Sur 이상에서만 WebP를 표시했기 때문에, 아주 오래된 Mac에서는 여전히 이미지가 깨져 보일 수 있습니다. Can I use는 전 세계 지원율을 약 97%로 집계합니다.",
      },
      {
        type: "p",
        text: "브라우저에서 WebP 파일을 **만드는** 것은 별개의 문제입니다. Intera Tools 같은 웹 도구는 이미지를 캔버스에 그린 뒤 브라우저에 인코딩을 요청합니다. Chrome과 Edge는 이 방식으로 WebP를 만들 수 있고, Firefox는 96 버전부터 지원합니다. Safari는 지원하지 않아 WebP를 요청하면 대신 PNG를 돌려줍니다. Intera Tools는 작업 전에 이를 확인하고, WebP를 만들 수 없는 브라우저에서는 \"이 브라우저는 WebP 파일을 만들 수 없습니다.\"라는 안내와 함께 WebP 옵션을 비활성화합니다. Safari에서도 WebP 파일을 열어 JPG나 PNG로 바꾸는 것은 가능합니다.",
      },

      { type: "h2", text: "WebP를 피하는 것이 좋은 경우" },
      {
        type: "ul",
        items: [
          "**다른 사람에게 파일을 보낼 때.** 받는 사람이 `.webp`를 인식하지 못하는 오래된 프로그램, 오피스 프로그램, 사진 앱으로 첨부 파일을 열 수 있습니다. JPG는 어디서나 열립니다.",
          "**허용 확장자가 정해진 업로드 양식.** 채용 사이트, 공공기관 민원 사이트, 인화 서비스, 여러 쇼핑몰은 JPG나 PNG만 받고 WebP는 거부하거나 제대로 처리하지 못합니다.",
          "**인쇄와 전문 편집.** WebP는 8비트 RGB만 지원하고 CMYK나 고비트 심도가 없습니다. 인쇄소는 보통 JPG, TIFF, PDF를 요구합니다.",
          "**작은 컬러 글씨나 UI 스크린샷을 손실 방식으로 저장할 때.** 크로마 서브샘플링 때문에 색이 있는 디테일이 뭉개질 수 있습니다. PNG나 무손실 WebP를 쓰세요.",
          "**여러 번 고쳐 저장할 때.** 손실 저장은 JPG처럼 저장할 때마다 디테일이 조금씩 줄어듭니다. 원본을 보관하고 WebP는 마지막 단계에서 만드세요.",
        ],
      },
      {
        type: "note",
        tone: "tip",
        text: "간단히 정리하면, 웹페이지에 표시할 이미지는 WebP로, 사람이나 다른 프로그램이 열어야 할 파일은 JPG나 PNG로 준비하면 됩니다.",
      },

      { type: "h2", text: "WebP 변환하기" },
      {
        type: "p",
        text: "내려받은 WebP를 어떤 앱에서도 열리게 하려면 [WebP를 JPG로 변환](/webp-to-jpg)을 쓰세요. WebP에 투명한 부분이 있으면 **투명 영역 배경색**에서 고른 색(기본값 흰색)으로 채워집니다. 투명도를 유지하거나 그래픽을 한 번 더 손실 압축하고 싶지 않다면 [이미지 변환](/convert-image)에서 **변환할 형식**을 **PNG**로 고르세요. PNG는 무손실이라 더 이상 화질이 떨어지지 않지만 파일은 보통 WebP보다 커집니다.",
      },
      {
        type: "p",
        text: "반대로 WebP를 만들려면 지원 브라우저에서 [이미지 변환](/convert-image)이나 [이미지 압축](/compress-image)의 **WebP로 변환** 옵션을 쓰면 됩니다. 손실 WebP를 JPG로 바꾸는 것은 손실 압축을 한 번 더 하는 셈입니다. WebP가 이미 버린 디테일은 되살릴 수 없으니, JPG 압축 흔적이 더해지지 않도록 **품질**을 90 정도로 높게 두세요. 어떤 경우든 다시 인코딩하면 EXIF, GPS 위치 같은 메타데이터는 제거됩니다.",
      },
      {
        type: "workflow",
        slug: "web-image-optimization",
        text: "웹사이트에 올릴 이미지라면 웹 이미지 최적화 워크플로를 써 보세요. 최대 너비를 제한하고 WebP(필요하면 JPG)로 변환하며, 결과가 더 커지면 원본을 유지하고 전체 절감량을 보여 줍니다.",
      },
    ],
    faq: [
      {
        q: "WebP는 항상 JPG보다 작은가요?",
        a: "아닙니다. Google 연구에서는 같은 화질 기준 평균 25–34% 작다고 하지만, 결과는 이미지와 인코더에 따라 다릅니다. 용량이 비슷하거나 오히려 커지는 이미지도 있습니다. 사진 전체를 바꾸기 전에 내 이미지로 먼저 시험해 보세요.",
      },
      {
        q: "Safari에서는 왜 WebP를 출력 형식으로 고를 수 없나요?",
        a: "Safari는 WebP를 표시할 수는 있지만 캔버스에서 WebP 파일을 만들지 못합니다. 페이지가 WebP를 요청하면 PNG를 돌려줍니다. Intera Tools는 이를 감지해 옵션을 비활성화합니다. WebP 파일을 만들려면 Chrome, Edge, Firefox를 쓰세요.",
      },
      {
        q: "WebP를 JPG로 바꾸면 화질이 떨어지나요?",
        a: "손실 WebP라면 JPG 변환은 두 번째 손실 압축이라 디테일이 조금 더 줄어듭니다. 품질을 높게 설정하면 대개 눈으로 구분하기 어렵습니다. PNG로 바꾸면 추가 손실은 없습니다.",
      },
      {
        q: "WebP도 투명 배경을 유지할 수 있나요?",
        a: "네. 손실·무손실 WebP 모두 알파 채널을 지원합니다. 투명 PNG를 WebP로 바꾸면 투명도가 유지되고, JPG로 바꾸면 단색으로 채워집니다.",
      },
    ],
  },
};

export default guide;
