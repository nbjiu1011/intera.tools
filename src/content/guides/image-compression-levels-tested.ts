import type { Locale } from "../../i18n/config";
import type { GuideContent } from "../types";

// Measurements: live intera.tools Compress Image in Chrome 156 (macOS), 6 Nov 2026, on five
// Wikimedia Commons featured pictures. SSIM on luminance at full size (scikit-image 0.24).
// 1 MB = 1,048,576 bytes.

const guide: Record<Locale, GuideContent> = {
  en: {
    title: "Light, Balanced or Strong? Image compression levels tested",
    metaTitle: "Image Compression Levels Tested: Size vs Quality",
    metaDescription:
      "We compressed five high-resolution photos at every level and measured file size and SSIM quality. See how much each level saves and which one to pick.",
    summary:
      "Compress Image offers three levels. To show what they actually do, we ran the same five large photos through each level on the live site, measured every file and compared each result with its original using SSIM, a standard image-similarity score.",
    takeaways: [
      "Across five photos (33.81 MB), **Light** saved 74%, **Balanced** 83% and **Strong** 87%.",
      "Average similarity to the original (SSIM) stayed high: **0.983**, **0.975** and **0.967**.",
      "Smooth images shrink far more than detailed ones: a storm sky lost 88–95%, a leopard's fur 73–86%.",
      "Resizing to the size you need saves more than any level: 1280 px wide cut the same photos by 96%.",
    ],
    body: [
      { type: "h2", text: "How we tested" },
      {
        type: "p",
        text: "We used the public [Compress Image](/compress-image) tool in Chrome 156 on macOS — the same code every visitor runs — and downloaded each result. The test photos are five featured pictures from Wikimedia Commons, between 10.6 and 19.3 megapixels, saved by their photographers at very high JPEG quality with full-resolution color. That makes them larger than typical phone photos, so the savings below are on the high side; a photo your phone has already compressed will shrink less.",
      },
      {
        type: "p",
        text: "To judge quality we computed **SSIM** (structural similarity) between each result and its original at full resolution. SSIM is 1 for identical images and drops as structure is lost. It is a widely used objective measure, but it's not a replacement for looking at the image yourself, especially at 100% zoom in areas with fine texture.",
      },
      { type: "h2", text: "File sizes at each level" },
      {
        type: "table",
        caption: "Compress Image, live site, Chrome 156, 6 November 2026. 1 MB = 1,048,576 bytes.",
        head: ["Photo", "Original", "Light", "Balanced", "Strong", "Balanced + WebP"],
        rows: [
          ["Coastal cliffs, 4032 × 2636", "9.22 MB", "2.55 MB", "1.80 MB", "1.38 MB", "1.43 MB"],
          ["Leopard, 4285 × 2859", "9.74 MB", "2.58 MB", "1.78 MB", "1.33 MB", "1.30 MB"],
          ["Outdoor sculpture, 4912 × 3264", "4.17 MB", "1.08 MB", "758 KB", "563 KB", "368 KB"],
          ["Desert dune, 5385 × 3590", "6.97 MB", "2.00 MB", "1.30 MB", "991 KB", "875 KB"],
          ["Storm sky, 4335 × 3137", "3.71 MB", "443 KB", "223 KB", "174 KB", "104 KB"],
          ["**Total**", "**33.81 MB**", "**8.64 MB (−74%)**", "**5.85 MB (−83%)**", "**4.40 MB (−87%)**", "**4.05 MB (−88%)**"],
        ],
      },
      {
        type: "p",
        text: "Each step down saves less than the one before: going from the original to Light removed about 25 MB, Light to Balanced another 2.8 MB, and Balanced to Strong about 1.5 MB. Most of the gain comes from re-encoding at all, because the originals were stored at a much higher quality than is needed for viewing.",
      },
      { type: "h2", text: "Quality: how close the results stay" },
      {
        type: "table",
        caption: "SSIM between each compressed file and its original (1 = identical), luminance at full resolution.",
        head: ["Photo", "Light", "Balanced", "Strong", "Balanced + WebP"],
        rows: [
          ["Coastal cliffs", "0.982", "0.970", "0.958", "0.966"],
          ["Leopard", "0.975", "0.962", "0.948", "0.952"],
          ["Outdoor sculpture", "0.990", "0.983", "0.976", "0.972"],
          ["Desert dune", "0.981", "0.974", "0.967", "0.968"],
          ["Storm sky", "0.989", "0.988", "0.986", "0.987"],
          ["**Average**", "**0.983**", "**0.975**", "**0.967**", "**0.969**"],
        ],
      },
      {
        type: "p",
        text: "The leopard scored lowest at every level. Fur, grass and other fine, random texture is exactly what lossy compression removes first, so these images both shrink less and lose more. The storm sky is the opposite: large smooth gradients compress extremely well and barely changed even at Strong (0.986).",
      },
      { type: "h3", text: "Balanced with WebP" },
      {
        type: "p",
        text: "Turning on **Convert to WebP** at the Balanced level made the set 31% smaller than Balanced JPG (4.05 MB vs 5.85 MB) at almost the same average SSIM (0.969 vs 0.975) — close to what Strong JPG achieves in size, with slightly better similarity on average. The catch is compatibility: some apps and upload forms still don't accept WebP, and Safari can't create WebP files at all, so the option isn't available there. See [WebP explained](/guides/webp-format-explained) before switching everything.",
      },
      { type: "h2", text: "Screenshots and PNG files" },
      {
        type: "p",
        text: "A 1440 × 900 PNG screenshot went from 89 KB to 38 KB (Light), 36 KB (Balanced) and 31 KB (Strong) with an SSIM of 1.000 at every level. PNGs are compressed by reducing them to a color palette (256, 160 or 64 colors), and an interface screenshot uses few enough colors that the palette loses nothing visible. Photos saved as PNG behave differently — a palette causes banding in smooth gradients — so for photos, converting to JPG or WebP is the better route ([which format to use](/guides/jpg-png-webp-size-comparison)).",
      },
      { type: "h2", text: "Resizing beats any compression level" },
      {
        type: "p",
        text: "For comparison, we resized the same five photos with [Resize Image](/resize-image), which saves JPGs at quality 92. At 2560 px wide the set came to 4.52 MB (−87%), at 1920 px 2.41 MB (−93%) and at 1280 px 1.20 MB (−96%) — smaller than any compression level, while each pixel keeps more quality. If the image will be shown at 1600 px on a website or attached to an email, resize first and then compress lightly.",
      },
      {
        type: "workflow",
        slug: "web-image-optimization",
        text: "Resize to a maximum width, convert to WebP and compress a whole folder in one run, with the savings shown per file.",
      },
      { type: "h2", text: "Which level should you pick?" },
      {
        type: "table",
        head: ["Situation", "Level", "Why"],
        rows: [
          ["Photos you'll keep, print or edit again", "Light", "Highest similarity (0.983 average) while still saving about three quarters."],
          ["Website, email, messenger, most uploads", "Balanced", "Most of Strong's saving with higher similarity on detailed photos."],
          ["Hard size limit you must get under", "Strong (or resize first)", "Smallest files; check fine textures at 100% before sending."],
          ["Images only for the web, modern browsers", "Balanced + WebP", "Strong-like size with Balanced-like similarity, if WebP is accepted where it's going."],
        ],
      },
      {
        type: "note",
        tone: "info",
        title: "Results differ between browsers",
        text: "Compression runs on your browser's built-in encoders. In our tests of the same code in WebKit, the engine behind Safari, JPG files at the same setting came out about 1.5–1.9 times larger than in Chrome. If you work on an iPhone or a Mac with Safari, expect smaller savings at each level.",
      },
    ],
    faq: [
      {
        q: "Why did my photo shrink less than in these tests?",
        a: "These originals were saved at very high quality, which leaves a lot to remove. Photos from phones and most websites are already compressed, so re-compressing them saves less — sometimes nothing, in which case the tool keeps your original and marks it “Already optimized — original kept”.",
      },
      {
        q: "Is an SSIM of 0.97 good?",
        a: "It means the result is structurally very close to the original, but SSIM is an average over the whole image. Look at fine detail at 100% zoom; if you can't see a difference, the level is fine for your use.",
      },
      {
        q: "Does compressing twice reduce quality further?",
        a: "Yes. Each lossy re-encode removes a little more information. Compress once from the original instead of re-compressing an already compressed copy.",
      },
      {
        q: "Are the photos uploaded during compression?",
        a: "No. Compression happens in your browser; the files never leave your device.",
      },
    ],
    sources: [
      { label: "Wikimedia Commons: “01 Calanche Piana” by Myrabella (CC BY-SA 3.0)", url: "https://commons.wikimedia.org/wiki/File:01_Calanche_Piana.jpg" },
      { label: "Wikimedia Commons: juvenile leopard by Giles Laurent (CC BY-SA 4.0)", url: "https://commons.wikimedia.org/wiki/File:001_Juvenile_leopard_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg" },
      { label: "Wikimedia Commons: “Horas de Chumbo” by Jules Verne Times Two (CC BY-SA 4.0)", url: "https://commons.wikimedia.org/wiki/File:%22Horas_de_Chumbo%22,_by_Rui_Chafes,_Parque_das_Na%C3%A7%C3%B5es,_Lisbon,_Portugal_julesvernex2-2.jpg" },
      { label: "Wikimedia Commons: Dune 45 at sunrise by Giles Laurent (CC BY-SA 4.0)", url: "https://commons.wikimedia.org/wiki/File:006_Dune_45_in_Sossusvlei_at_sunrise_Photo_by_Giles_Laurent.jpg" },
      { label: "Wikimedia Commons: “Extremes Wetter” by Friedrich Haag (CC BY-SA 4.0)", url: "https://commons.wikimedia.org/wiki/File:004_2018_05_14_Extremes_Wetter.jpg" },
      { label: "scikit-image: structural similarity (SSIM)", url: "https://scikit-image.org/docs/stable/api/skimage.metrics.html#skimage.metrics.structural_similarity" },
    ],
  },
  ko: {
    title: "약하게, 균형, 강하게? 이미지 압축 강도 실측 비교",
    metaTitle: "이미지 압축 강도별 용량·화질 실측",
    metaDescription:
      "고해상도 사진 5장을 압축 강도별로 줄여 용량과 SSIM 화질 지표를 직접 쟀습니다. 단계별로 얼마나 줄고 어떤 단계를 고르면 좋은지 정리했습니다.",
    summary:
      "이미지 압축 도구에는 세 단계가 있습니다. 각 단계가 실제로 어떤 결과를 내는지 보여 주기 위해, 같은 큰 사진 5장을 운영 중인 사이트에서 단계마다 압축하고 파일 용량을 재고 표준 이미지 유사도 지표인 SSIM으로 원본과 비교했습니다.",
    takeaways: [
      "사진 5장(33.81MB) 기준 **약하게**는 74%, **균형**은 83%, **강하게**는 87% 줄었습니다.",
      "원본과의 평균 유사도(SSIM)는 **0.983**, **0.975**, **0.967**로 높게 유지됐습니다.",
      "매끈한 사진일수록 훨씬 많이 줄어듭니다. 폭풍 하늘은 88~95%, 표범 털 사진은 73~86% 줄었습니다.",
      "어떤 압축 단계보다 크기 조절의 효과가 큽니다. 같은 사진을 가로 1280px로 줄이자 96% 줄었습니다.",
    ],
    body: [
      { type: "h2", text: "측정 방법" },
      {
        type: "p",
        text: "macOS의 Chrome 156에서 누구나 쓰는 공개 [이미지 압축](/compress-image) 도구로 압축하고 결과 파일을 내려받았습니다. 테스트 사진은 위키미디어 공용의 우수 사진 5장으로, 1,060만~1,930만 화소이며 촬영자가 매우 높은 JPG 품질과 원본 해상도의 색 정보로 저장한 파일입니다. 그래서 일반적인 휴대폰 사진보다 용량이 크고, 아래 절감률도 높게 나오는 편입니다. 휴대폰이 이미 압축한 사진은 이보다 덜 줄어듭니다.",
      },
      {
        type: "p",
        text: "화질은 원본 해상도에서 결과물과 원본 사이의 **SSIM**(구조적 유사도)으로 비교했습니다. 두 이미지가 같으면 1이고 구조가 손실될수록 낮아집니다. 널리 쓰이는 객관적 지표이지만 직접 보는 것을 대신하지는 못하므로, 미세한 질감이 있는 부분은 100%로 확대해 확인하는 것이 좋습니다.",
      },
      { type: "h2", text: "단계별 용량" },
      {
        type: "table",
        caption: "이미지 압축, 운영 사이트, Chrome 156, 2026년 11월 6일. 1MB = 1,048,576바이트.",
        head: ["사진", "원본", "약하게", "균형", "강하게", "균형 + WebP"],
        rows: [
          ["해안 절벽, 4032 × 2636", "9.22MB", "2.55MB", "1.80MB", "1.38MB", "1.43MB"],
          ["표범, 4285 × 2859", "9.74MB", "2.58MB", "1.78MB", "1.33MB", "1.30MB"],
          ["야외 조형물, 4912 × 3264", "4.17MB", "1.08MB", "758KB", "563KB", "368KB"],
          ["사막 모래 언덕, 5385 × 3590", "6.97MB", "2.00MB", "1.30MB", "991KB", "875KB"],
          ["폭풍 하늘, 4335 × 3137", "3.71MB", "443KB", "223KB", "174KB", "104KB"],
          ["**합계**", "**33.81MB**", "**8.64MB(−74%)**", "**5.85MB(−83%)**", "**4.40MB(−87%)**", "**4.05MB(−88%)**"],
        ],
      },
      {
        type: "p",
        text: "단계가 강해질수록 추가로 줄어드는 폭은 작아집니다. 원본에서 약하게로 약 25MB가 줄었고, 약하게에서 균형으로 2.8MB, 균형에서 강하게로 약 1.5MB가 더 줄었습니다. 원본이 화면으로 보기에 필요한 것보다 훨씬 높은 품질로 저장돼 있었기 때문에, 대부분의 효과는 다시 저장하는 것 자체에서 나옵니다.",
      },
      { type: "h2", text: "화질: 원본과 얼마나 비슷한가" },
      {
        type: "table",
        caption: "압축 결과와 원본 사이의 SSIM(1 = 동일), 원본 해상도의 밝기 성분 기준.",
        head: ["사진", "약하게", "균형", "강하게", "균형 + WebP"],
        rows: [
          ["해안 절벽", "0.982", "0.970", "0.958", "0.966"],
          ["표범", "0.975", "0.962", "0.948", "0.952"],
          ["야외 조형물", "0.990", "0.983", "0.976", "0.972"],
          ["사막 모래 언덕", "0.981", "0.974", "0.967", "0.968"],
          ["폭풍 하늘", "0.989", "0.988", "0.986", "0.987"],
          ["**평균**", "**0.983**", "**0.975**", "**0.967**", "**0.969**"],
        ],
      },
      {
        type: "p",
        text: "표범 사진은 모든 단계에서 점수가 가장 낮았습니다. 털이나 풀처럼 촘촘하고 불규칙한 질감은 손실 압축이 가장 먼저 덜어 내는 부분이라, 이런 사진은 덜 줄어들면서 더 많이 손실됩니다. 폭풍 하늘은 반대입니다. 넓고 매끈한 그라데이션은 아주 잘 압축되어 강하게 단계에서도 거의 변하지 않았습니다(0.986).",
      },
      { type: "h3", text: "균형 + WebP" },
      {
        type: "p",
        text: "균형 단계에서 **WebP로 변환**을 켜면 균형 JPG보다 31% 작아졌고(4.05MB 대 5.85MB) 평균 SSIM은 거의 같았습니다(0.969 대 0.975). 용량은 강하게 JPG와 비슷하면서 평균 유사도는 조금 더 높은 셈입니다. 다만 호환성을 따져야 합니다. 아직 WebP를 받지 않는 앱이나 업로드 양식이 있고, Safari는 WebP 파일을 만들 수 없어 이 옵션을 쓸 수 없습니다. 모두 바꾸기 전에 [WebP 형식 설명](/guides/webp-format-explained)을 확인하세요.",
      },
      { type: "h2", text: "스크린샷과 PNG 파일" },
      {
        type: "p",
        text: "1440 × 900 PNG 스크린샷은 89KB에서 38KB(약하게), 36KB(균형), 31KB(강하게)로 줄었고 SSIM은 모든 단계에서 1.000이었습니다. PNG는 색상 팔레트(256·160·64색)로 줄이는 방식으로 압축하는데, 화면 캡처는 쓰는 색이 적어 팔레트로 줄여도 눈에 보이는 손실이 없습니다. PNG로 저장한 사진은 다릅니다. 팔레트 때문에 부드러운 그라데이션에 계단 현상이 생길 수 있으니, 사진은 JPG나 WebP로 바꾸는 편이 낫습니다([어떤 형식을 쓸까](/guides/jpg-png-webp-size-comparison)).",
      },
      { type: "h2", text: "어떤 압축 단계보다 효과가 큰 크기 조절" },
      {
        type: "p",
        text: "비교를 위해 같은 사진 5장을 JPG 품질 92로 저장하는 [이미지 크기 조절](/resize-image)로 줄였습니다. 가로 2560px에서는 4.52MB(−87%), 1920px에서는 2.41MB(−93%), 1280px에서는 1.20MB(−96%)로, 어떤 압축 단계보다 작으면서 화소 하나하나의 품질은 더 높게 유지됩니다. 홈페이지에 1600px로 보여 주거나 메일에 첨부할 이미지라면 먼저 크기를 줄이고 가볍게 압축하세요.",
      },
      {
        type: "workflow",
        slug: "web-image-optimization",
        text: "최대 가로 크기 제한, WebP 변환, 압축을 폴더 전체에 한 번에 적용하고 파일별 절감량을 확인하세요.",
      },
      { type: "h2", text: "어떤 단계를 골라야 할까요?" },
      {
        type: "table",
        head: ["상황", "단계", "이유"],
        rows: [
          ["보관·인쇄하거나 다시 편집할 사진", "약하게", "평균 유사도가 가장 높으면서(0.983) 용량은 약 4분의 3이 줄어듭니다."],
          ["홈페이지, 메일, 메신저, 대부분의 업로드", "균형", "강하게에 가까운 절감 효과를 내면서 디테일이 많은 사진의 유사도가 더 높습니다."],
          ["꼭 맞춰야 하는 용량 제한이 있을 때", "강하게(또는 먼저 크기 조절)", "가장 작습니다. 보내기 전에 미세한 질감을 100%로 확인하세요."],
          ["최신 브라우저에서만 쓰는 웹용 이미지", "균형 + WebP", "올릴 곳에서 WebP를 받아 준다면, 강하게 수준의 용량에 균형 수준의 유사도를 얻습니다."],
        ],
      },
      {
        type: "note",
        tone: "info",
        title: "브라우저마다 결과가 다릅니다",
        text: "압축은 브라우저에 내장된 인코더로 이루어집니다. 같은 코드를 Safari의 엔진인 WebKit에서 테스트했더니 같은 설정의 JPG가 Chrome보다 약 1.5~1.9배 컸습니다. iPhone이나 Mac의 Safari에서 작업한다면 단계별 절감 폭이 더 작을 수 있습니다.",
      },
    ],
    faq: [
      {
        q: "제 사진은 왜 이 테스트보다 덜 줄어드나요?",
        a: "테스트 원본은 매우 높은 품질로 저장돼 덜어 낼 것이 많았습니다. 휴대폰이나 대부분의 웹사이트에서 받은 사진은 이미 압축돼 있어 다시 압축해도 덜 줄고, 아예 줄지 않으면 원본을 그대로 두고 ‘이미 최적화됨 — 원본 유지’로 표시합니다.",
      },
      {
        q: "SSIM 0.97이면 좋은 건가요?",
        a: "구조적으로 원본에 매우 가깝다는 뜻이지만, SSIM은 이미지 전체의 평균값입니다. 세밀한 부분을 100%로 확대해 보고 차이가 보이지 않는다면 그 단계로 충분합니다.",
      },
      {
        q: "두 번 압축하면 화질이 더 떨어지나요?",
        a: "네. 손실 압축으로 다시 저장할 때마다 정보가 조금씩 더 사라집니다. 이미 압축한 사본을 다시 압축하지 말고 원본에서 한 번만 압축하세요.",
      },
      {
        q: "압축하는 동안 사진이 업로드되나요?",
        a: "아니요. 압축은 브라우저 안에서 이루어지며 파일은 기기 밖으로 나가지 않습니다.",
      },
    ],
    sources: [
      { label: "위키미디어 공용: “01 Calanche Piana”, Myrabella(CC BY-SA 3.0)", url: "https://commons.wikimedia.org/wiki/File:01_Calanche_Piana.jpg" },
      { label: "위키미디어 공용: 어린 표범, Giles Laurent(CC BY-SA 4.0)", url: "https://commons.wikimedia.org/wiki/File:001_Juvenile_leopard_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg" },
      { label: "위키미디어 공용: “Horas de Chumbo”, Jules Verne Times Two(CC BY-SA 4.0)", url: "https://commons.wikimedia.org/wiki/File:%22Horas_de_Chumbo%22,_by_Rui_Chafes,_Parque_das_Na%C3%A7%C3%B5es,_Lisbon,_Portugal_julesvernex2-2.jpg" },
      { label: "위키미디어 공용: 일출의 듄 45, Giles Laurent(CC BY-SA 4.0)", url: "https://commons.wikimedia.org/wiki/File:006_Dune_45_in_Sossusvlei_at_sunrise_Photo_by_Giles_Laurent.jpg" },
      { label: "위키미디어 공용: “Extremes Wetter”, Friedrich Haag(CC BY-SA 4.0)", url: "https://commons.wikimedia.org/wiki/File:004_2018_05_14_Extremes_Wetter.jpg" },
      { label: "scikit-image: 구조적 유사도(SSIM)", url: "https://scikit-image.org/docs/stable/api/skimage.metrics.html#skimage.metrics.structural_similarity" },
    ],
  },
};

export default guide;
