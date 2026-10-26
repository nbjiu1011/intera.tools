import type { Locale } from "../../i18n/config";
import type { GuideContent } from "../types";

const guide: Record<Locale, GuideContent> = {
  en: {
    title: "How to Compress Images Without Losing Visible Quality",
    metaTitle: "Compress Images Without Losing Visible Quality",
    metaDescription:
      "Shrink JPG, PNG and WebP files while keeping them sharp: resize to display size first, pick the right compression level, and check results the right way.",
    summary:
      "Big savings on photos almost always come from lossy compression, so the realistic goal is not “zero loss” but “no loss you can see at the size the image is actually viewed”. This guide shows the order of operations that gets you there, what each setting in Compress Image really does, and how to check the result before you publish or send it.",
    takeaways: [
      "Resize to the largest size the image will be displayed at before you compress. Fewer pixels saves more than any quality setting.",
      "Start with Balanced (JPG/WebP quality 72, 160 PNG colors) and only move to Light or Strong after checking the result at 100% zoom.",
      "Compress from the original every time. Re-saving a JPG that was already compressed adds new damage each round.",
      "Keep screenshots, text and logos as PNG; JPG smears sharp edges. WebP helps most for photos and for images with transparency.",
    ],
    body: [
      { type: "h2", text: "Lossy vs lossless: what “without losing quality” really means" },
      {
        type: "p",
        text: "**Lossless** compression stores the image more efficiently but rebuilds every pixel exactly. PNG and lossless WebP work this way. **Lossy** compression throws away detail the eye is unlikely to miss, such as tiny colour variations inside busy textures. JPG and lossy WebP work this way, and that is where the large reductions on photos come from.",
      },
      {
        type: "p",
        text: "Intera Tools re-encodes every file you compress. JPG and WebP images are saved at a lower quality setting. PNG files are reduced to a palette of at most 256 colours (palette quantization), which is also lossy, but it keeps transparency and usually looks very close to the original. So the honest promise is “no visible loss at normal viewing size”, and you get there with the right settings and a quick check, not with a magic option.",
      },

      { type: "h2", text: "Resize first: pixel count matters more than the quality slider" },
      {
        type: "p",
        text: "A 12-megapixel phone photo is 4032 × 3024 px. If it will be shown in an 800 px wide article column, most of those pixels are wasted. Resizing it to 1600 × 1200 px keeps about 16% of the original pixels, and the file shrinks accordingly, before any quality setting is touched. Pushing the quality slider down far enough to get a similar saving on the full-size photo would almost always cause visible blocking and smearing.",
      },
      {
        type: "p",
        text: "To pick a target width, take the widest size the image will appear on screen and double it for high-density (Retina-class) displays. An 800 px column needs about 1600 px; a full-width banner usually needs 1920 to 2560 px. Never enlarge a small image: it adds pixels without adding detail.",
      },
      {
        type: "steps",
        items: [
          { title: "Open Resize Image", body: "Add your photos to [Resize Image](/resize-image). Up to 100 images, 50 MB each, are processed in your browser." },
          { title: "Choose Pixels and enter a width", body: "Under **Resize by**, pick **Pixels** and type the target **Width**. Leave **Keep aspect ratio** on so heights follow automatically; with several images, each one keeps its own ratio." },
          { title: "Leave “Don’t enlarge smaller images” on", body: "Images that are already smaller than the target stay at their current size instead of being blown up." },
          { title: "Continue to Compress Image", body: "Use **Continue with** on the results screen to send the resized files to Compress Image without uploading or re-selecting them." },
        ],
      },

      { type: "h2", text: "Choosing a level in Compress Image" },
      {
        type: "p",
        text: "[Compress Image](/compress-image) offers three levels. Each one sets a JPG/WebP quality and a PNG colour count, and the **Advanced** panel lets you override them: **JPG / WebP quality** from 10 to 95, and **PNG colors** from 16 to 256 in steps of 8. Picking a level again resets both sliders to that level’s values.",
      },
      {
        type: "table",
        caption: "What the three levels do (values from the current implementation)",
        head: ["Level", "JPG / WebP quality", "PNG colors", "Good for"],
        rows: [
          ["Light", "85", "256", "Portfolio shots, product close-ups, skies and skin tones"],
          ["Balanced", "72", "160", "Most photos for websites, documents and messaging"],
          ["Strong", "55", "64", "Busy textures, thumbnails, simple graphics with few colours"],
        ],
      },
      {
        type: "p",
        text: "Content decides how far you can go. Smooth gradients such as a clear sky, a studio backdrop or a face show artefacts first, as banding or blotchy patches, so keep those at Light or set quality to 80 or higher. Detailed textures like foliage, gravel or fabric hide artefacts well and often look fine at Strong. For PNG, flat graphics and icons survive 64 colours, while screenshots containing photos or gradients may band below 160.",
      },
      {
        type: "p",
        text: "There is a safety net: if a file re-encoded in its own format comes out larger than the original, Intera Tools keeps the original and labels it **Already optimized — original kept**. That check only applies within the same format. With **Convert to WebP** switched on you always get the WebP file, so compare the before and after sizes shown for each image.",
      },
      {
        type: "note",
        tone: "info",
        text: "Compression removes metadata such as camera details and GPS location, because the pixels are re-encoded into a new file (a file marked “original kept” is your untouched original, metadata included). That is usually a privacy plus, but keep your originals if you need the capture date or location later.",
      },

      { type: "h2", text: "When WebP helps" },
      {
        type: "p",
        text: "Google’s published figures put lossy WebP at 25–34% smaller than comparable JPG files at equivalent visual quality, and lossless WebP at about 26% smaller than PNG. WebP can also keep transparency in a lossy file, which makes it a strong choice for cut-out product shots or illustrations that would be very large as PNG.",
      },
      {
        type: "p",
        text: "WebP is not always the right output. Some upload forms, marketplaces and older programs accept only JPG or PNG, and Safari can’t create WebP files; there the toggle reads “This browser can’t create WebP files”. [WebP format explained](/guides/webp-format-explained) covers when to avoid it. If you are unsure which format wins for a particular image, test it rather than guessing.",
      },
      {
        type: "tool",
        slug: "image-format-comparison",
        text: "Encode one image as JPG, PNG, PNG-8 and WebP side by side and see the real file size of each before you decide.",
      },

      { type: "h2", text: "How to check the result" },
      {
        type: "ol",
        items: [
          "Open the original and the compressed file at 100% zoom (actual pixels). Thumbnails hide almost every artefact.",
          "Look at the same areas in both: sharp edges and text, smooth gradients, skin, and fine repeating patterns.",
          "Watch for the typical signs: square blocks in flat areas, halos or “ringing” around high-contrast edges, stepped bands in gradients, and grainy dithering in PNGs with too few colours.",
          "Then view the image at the size it will really be shown. A flaw visible only at 200% zoom on a 4000 px photo will not matter in an 800 px column.",
          "If something bothers you, go up one level or raise the quality by 5–10 points and compress the original again.",
        ],
      },

      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "**Re-compressing the same JPG again and again.** Every lossy save discards a little more, and the damage accumulates. Keep the original and always compress from it.",
          "**Saving screenshots as JPG.** Text and interface edges get fuzzy halos, and the file is often not even smaller. Keep screenshots as PNG and reduce **PNG colors** instead; see [PNG transparency explained](/guides/png-transparency-explained) for when PNG is the right container.",
          "**Compressing before resizing.** Resize first, then compress once. Resize Image saves JPGs at a high quality, so the extra save before compression costs very little.",
          "**Using Strong for everything.** Strong is meant for images where size matters most. Faces, skies and product shots usually deserve Light or Balanced.",
          "**Enlarging small images to look sharper.** Upscaling cannot add detail and makes the file bigger.",
        ],
      },
      {
        type: "workflow",
        slug: "web-image-optimization",
        text: "Preparing a whole folder for a website? This workflow caps the width, converts to WebP (or JPG), keeps any original that would get bigger, and gives you one ZIP with the total saved.",
      },
    ],
    faq: [
      {
        q: "Does compressing an image reduce its resolution?",
        a: "No. Compress Image keeps the width and height exactly as they are and only changes how the pixels are encoded. To change the dimensions, use Resize Image first.",
      },
      {
        q: "What quality setting is “good enough” for the web?",
        a: "Balanced (quality 72) is a sensible default for most photos once they are resized to display size. Images with large smooth areas, like skies or faces, often need 80–85 to stay clean. Always judge by checking at 100% zoom rather than by the number alone.",
      },
      {
        q: "Why did my file come back marked “Already optimized”?",
        a: "The re-encoded version was larger than your original, so Intera Tools kept the original. This happens with images that were already saved efficiently. Resizing to smaller dimensions or switching to WebP are the remaining options.",
      },
      {
        q: "Can I undo compression later?",
        a: "No. Lossy compression permanently discards detail, and saving the file again at a higher quality cannot bring it back. Keep your originals and treat compressed copies as exports.",
      },
    ],
    sources: [
      { label: "Google for Developers – WebP compression study figures", url: "https://developers.google.com/speed/webp" },
      { label: "Can I use – canvas toBlob() WebP encoding support", url: "https://caniuse.com/mdn-api_htmlcanvaselement_toblob_type_parameter_webp" },
    ],
  },

  ko: {
    title: "화질 저하 없이 이미지 용량 줄이는 법",
    metaTitle: "화질 그대로 이미지 용량 줄이는 법",
    metaDescription:
      "JPG, PNG, WebP 용량을 줄이면서도 선명함을 지키는 순서를 정리했습니다. 먼저 표시 크기에 맞게 줄이고, 압축 강도를 고르고, 결과를 제대로 확인하는 방법까지 안내합니다.",
    summary:
      "사진 용량을 크게 줄이는 방법은 거의 대부분 손실 압축입니다. 그래서 현실적인 목표는 ‘손실 0’이 아니라 ‘실제로 보는 크기에서 눈에 띄는 손실이 없는 것’입니다. 이 글에서는 그 목표에 가장 빨리 닿는 작업 순서와 이미지 압축 도구의 각 설정이 실제로 하는 일, 그리고 올리거나 보내기 전에 결과를 확인하는 방법을 설명합니다.",
    takeaways: [
      "압축하기 전에 이미지가 실제로 표시될 크기로 먼저 줄이세요. 픽셀 수를 줄이는 것이 어떤 품질 설정보다 효과가 큽니다.",
      "처음에는 ‘균형’(JPG/WebP 품질 72, PNG 160색)으로 시작하고, 100% 배율로 확인한 뒤에 ‘약하게’나 ‘강하게’로 바꾸세요.",
      "압축은 항상 원본에서 다시 하세요. 이미 압축한 JPG를 또 저장하면 그때마다 손상이 쌓입니다.",
      "스크린샷, 글자, 로고는 PNG로 두는 편이 좋습니다. WebP는 사진이나 투명 배경 이미지에서 효과가 가장 큽니다.",
    ],
    body: [
      { type: "h2", text: "손실 압축과 무손실 압축: ‘화질 저하 없이’의 진짜 의미" },
      {
        type: "p",
        text: "**무손실 압축**은 데이터를 더 효율적으로 저장할 뿐, 풀었을 때 모든 픽셀이 원본과 똑같습니다. PNG와 무손실 WebP가 이 방식입니다. **손실 압축**은 복잡한 질감 속 미세한 색 차이처럼 눈이 잘 알아채지 못하는 정보를 버립니다. JPG와 손실 WebP가 이 방식이고, 사진 용량이 크게 줄어드는 것도 바로 이 덕분입니다.",
      },
      {
        type: "p",
        text: "Intera Tools는 압축할 때 파일을 새로 인코딩합니다. JPG와 WebP는 더 낮은 품질 값으로 다시 저장하고, PNG는 최대 256색 팔레트로 색 수를 줄입니다(팔레트 양자화). PNG 쪽도 엄밀히는 손실 방식이지만 투명도는 그대로 유지되고, 대부분 원본과 거의 구별되지 않습니다. 결국 약속할 수 있는 것은 ‘보통 보는 크기에서 차이가 보이지 않는 것’이고, 이는 알맞은 설정과 간단한 확인으로 얻을 수 있습니다.",
      },

      { type: "h2", text: "먼저 크기부터: 품질 슬라이더보다 픽셀 수가 중요합니다" },
      {
        type: "p",
        text: "1200만 화소 스마트폰 사진은 4032 × 3024px입니다. 이 사진이 가로 800px짜리 블로그 본문에 들어간다면 대부분의 픽셀은 쓰이지 않습니다. 1600 × 1200px로 줄이면 픽셀 수가 원본의 약 16%로 줄고, 품질 설정을 건드리기 전에 이미 용량이 그만큼 작아집니다. 원본 크기 그대로 품질만 낮춰서 비슷한 용량을 맞추려 하면 거의 항상 깍두기 같은 블록이나 뭉개짐이 보이게 됩니다.",
      },
      {
        type: "p",
        text: "목표 너비는 화면에 표시될 가장 큰 너비에 2를 곱해 정하면 됩니다. 레티나급 고밀도 화면을 고려한 값입니다. 가로 800px 영역이라면 1600px 정도, 화면 전체 너비 배너라면 보통 1920~2560px이면 충분합니다. 작은 이미지를 키우는 것은 피하세요. 픽셀만 늘어날 뿐 디테일은 생기지 않습니다.",
      },
      {
        type: "steps",
        items: [
          { title: "이미지 크기 조절 열기", body: "[이미지 크기 조절](/resize-image)에 사진을 추가합니다. 최대 100장, 장당 50MB까지 브라우저 안에서 처리됩니다." },
          { title: "‘픽셀’을 고르고 너비 입력", body: "**변경 방식**에서 **픽셀**을 선택하고 목표 **너비**를 입력합니다. **가로세로 비율 유지**를 켜 두면 높이는 자동으로 맞춰지고, 여러 장이면 이미지마다 자기 비율을 유지합니다." },
          { title: "‘작은 이미지는 확대하지 않기’는 켠 상태로", body: "목표보다 이미 작은 이미지는 억지로 늘리지 않고 그대로 둡니다." },
          { title: "이미지 압축으로 이어서 작업", body: "결과 화면의 **이어서 작업하기**로 크기를 바꾼 파일을 다시 고를 필요 없이 이미지 압축 도구로 바로 보냅니다." },
        ],
      },

      { type: "h2", text: "이미지 압축 도구에서 강도 고르기" },
      {
        type: "p",
        text: "[이미지 압축](/compress-image)에는 세 가지 강도가 있습니다. 각 강도는 JPG/WebP 품질 값과 PNG 색상 수를 정해 두며, **고급 설정**에서 직접 바꿀 수 있습니다. **JPG / WebP 품질**은 10~95, **PNG 색상 수**는 16~256(8 단위)입니다. 강도를 다시 고르면 두 슬라이더 모두 해당 강도의 값으로 돌아갑니다.",
      },
      {
        type: "table",
        caption: "강도별 설정값 (현재 구현 기준)",
        head: ["압축 강도", "JPG / WebP 품질", "PNG 색상 수", "어울리는 이미지"],
        rows: [
          ["약하게", "85", "256", "포트폴리오, 상품 클로즈업, 하늘·피부가 넓게 나오는 사진"],
          ["균형", "72", "160", "웹사이트, 문서, 메신저용 일반 사진 대부분"],
          ["강하게", "55", "64", "질감이 복잡한 사진, 썸네일, 색이 적은 단순 그래픽"],
        ],
      },
      {
        type: "p",
        text: "얼마나 강하게 압축할 수 있는지는 사진 내용에 따라 다릅니다. 맑은 하늘, 단색 배경지, 얼굴처럼 부드럽게 이어지는 영역은 계단 같은 띠나 얼룩이 가장 먼저 드러나므로 ‘약하게’를 쓰거나 품질을 80 이상으로 두세요. 나뭇잎, 자갈, 원단처럼 질감이 촘촘한 사진은 손상이 잘 묻혀서 ‘강하게’로도 괜찮은 경우가 많습니다. PNG는 단순한 그래픽이나 아이콘이라면 64색으로도 충분하지만, 사진이나 그라데이션이 들어간 스크린샷은 160색 아래로 내리면 띠가 생길 수 있습니다.",
      },
      {
        type: "p",
        text: "안전장치도 있습니다. 같은 형식으로 다시 저장한 파일이 원본보다 커지면 원본을 그대로 두고 **이미 최적화됨 — 원본 유지**로 표시합니다. 다만 이 비교는 형식이 같을 때만 적용됩니다. **WebP로 변환**을 켜면 항상 WebP 파일을 돌려주므로, 이미지마다 표시되는 변경 전후 용량을 직접 확인하세요.",
      },
      {
        type: "note",
        tone: "info",
        text: "압축하면 픽셀을 새 파일로 다시 인코딩하기 때문에 카메라 정보, GPS 위치 같은 메타데이터가 사라집니다(‘원본 유지’로 표시된 파일은 메타데이터까지 그대로인 원본입니다). 개인정보 측면에서는 장점이지만, 촬영 날짜나 장소가 나중에 필요하다면 원본을 꼭 보관해 두세요.",
      },

      { type: "h2", text: "WebP가 유리한 경우" },
      {
        type: "p",
        text: "Google이 공개한 수치에 따르면 손실 WebP는 같은 시각적 품질의 JPG보다 25~34% 작고, 무손실 WebP는 PNG보다 약 26% 작습니다. 또 WebP는 손실 압축을 하면서도 투명도를 유지할 수 있어서, PNG로 저장하면 용량이 매우 커지는 누끼 상품 사진이나 일러스트에 특히 잘 맞습니다.",
      },
      {
        type: "p",
        text: "그렇다고 항상 WebP가 정답은 아닙니다. JPG나 PNG만 받는 업로드 양식, 오픈마켓, 오래된 프로그램이 아직 있고, Safari는 WebP 파일을 만들지 못합니다. 이 경우 토글 아래에 “이 브라우저는 WebP 파일을 만들 수 없습니다”라고 표시됩니다. WebP를 피해야 할 경우는 [WebP 형식 알아보기](/guides/webp-format-explained)에서 다룹니다. 어떤 형식이 더 작을지 확신이 서지 않으면 짐작하지 말고 직접 비교해 보세요.",
      },
      {
        type: "tool",
        slug: "image-format-comparison",
        text: "이미지 한 장을 JPG, PNG, PNG-8, WebP로 각각 인코딩해 실제 용량과 화질을 나란히 비교한 뒤 형식을 고를 수 있습니다.",
      },

      { type: "h2", text: "결과를 확인하는 방법" },
      {
        type: "ol",
        items: [
          "원본과 압축본을 100% 배율(실제 픽셀)로 엽니다. 썸네일 크기에서는 손상이 거의 보이지 않습니다.",
          "두 파일에서 같은 부분을 비교합니다. 선명한 경계와 글자, 부드러운 그라데이션, 피부, 촘촘한 반복 무늬를 중심으로 보세요.",
          "대표적인 손상 신호를 찾습니다. 평평한 영역의 네모난 블록, 대비가 큰 경계 주변의 번짐(링잉), 그라데이션의 계단 같은 띠, 색이 너무 적은 PNG의 자글자글한 점묘(디더링)입니다.",
          "그다음 실제로 표시될 크기로 다시 봅니다. 4000px 사진을 200%로 확대해야 보이는 흠은 800px 본문 이미지에서는 문제가 되지 않습니다.",
          "거슬리는 부분이 있으면 강도를 한 단계 낮추거나 품질을 5~10 올린 뒤, 원본으로 다시 압축합니다.",
        ],
      },

      { type: "h2", text: "자주 하는 실수" },
      {
        type: "ul",
        items: [
          "**같은 JPG를 여러 번 다시 압축하기.** 손실 압축은 저장할 때마다 조금씩 더 버리고, 그 손상은 누적됩니다. 원본을 보관하고 항상 원본에서 압축하세요.",
          "**스크린샷을 JPG로 저장하기.** 글자와 화면 요소 경계에 뿌연 번짐이 생기고, 용량도 생각만큼 줄지 않는 경우가 많습니다. 스크린샷은 PNG로 두고 **PNG 색상 수**를 줄이세요. PNG가 맞는 경우는 [PNG 투명 배경 가이드](/guides/png-transparency-explained)에서 자세히 다룹니다.",
          "**크기 변경보다 압축을 먼저 하기.** 크기를 먼저 줄이고, 압축은 한 번만 하세요. 이미지 크기 조절 도구는 JPG를 높은 품질로 저장하므로 중간에 한 번 더 저장되는 손해는 아주 작습니다.",
          "**모든 이미지에 ‘강하게’ 쓰기.** ‘강하게’는 용량이 가장 중요한 경우를 위한 설정입니다. 인물, 하늘, 상품 사진은 보통 ‘약하게’나 ‘균형’이 맞습니다.",
          "**작은 이미지를 키워서 선명하게 만들려 하기.** 확대해도 디테일은 생기지 않고 용량만 커집니다.",
        ],
      },
      {
        type: "workflow",
        slug: "web-image-optimization",
        text: "웹사이트에 올릴 이미지를 폴더째 준비한다면, 최대 너비 제한, WebP(또는 JPG) 변환, 오히려 커진 파일은 원본 유지까지 한 번에 처리하고 절약한 용량과 함께 ZIP으로 받을 수 있습니다.",
      },
    ],
    faq: [
      {
        q: "압축하면 해상도도 낮아지나요?",
        a: "아닙니다. 이미지 압축 도구는 가로·세로 픽셀 수를 그대로 두고 인코딩 방식만 바꿉니다. 해상도를 낮추려면 이미지 크기 조절 도구를 먼저 사용하세요.",
      },
      {
        q: "웹용으로는 품질을 얼마로 하면 되나요?",
        a: "표시 크기에 맞게 줄인 사진이라면 ‘균형’(품질 72)이 무난한 출발점입니다. 하늘이나 얼굴처럼 매끈한 영역이 넓은 사진은 80~85는 되어야 깔끔한 경우가 많습니다. 숫자만 보지 말고 100% 배율로 확인해서 판단하세요.",
      },
      {
        q: "‘이미 최적화됨’이라고 나오는 이유는 무엇인가요?",
        a: "다시 저장한 파일이 원본보다 커서 원본을 그대로 남긴 것입니다. 이미 효율적으로 저장된 이미지에서 자주 생깁니다. 더 줄이려면 해상도를 낮추거나 WebP로 변환하는 방법이 남아 있습니다.",
      },
      {
        q: "압축한 이미지를 원래대로 되돌릴 수 있나요?",
        a: "없습니다. 손실 압축으로 버려진 정보는 높은 품질로 다시 저장해도 돌아오지 않습니다. 원본은 따로 보관하고, 압축본은 내보내기용 사본으로 생각하세요.",
      },
    ],
    sources: [
      { label: "Google 개발자 문서 – WebP 압축 연구 수치", url: "https://developers.google.com/speed/webp" },
      { label: "Can I use – 캔버스 toBlob() WebP 인코딩 지원 현황", url: "https://caniuse.com/mdn-api_htmlcanvaselement_toblob_type_parameter_webp" },
    ],
  },
};

export default guide;
