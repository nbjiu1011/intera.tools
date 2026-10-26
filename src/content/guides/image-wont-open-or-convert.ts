import type { Locale } from "../../i18n/config";
import type { GuideContent } from "../types";

const guide: Record<Locale, GuideContent> = {
  en: {
    title: "An image won’t open, convert or compress: what each error means and how to fix it",
    metaTitle: "Image Won’t Open, Convert or Compress? Fixes by Error",
    metaDescription:
      "What each Intera Tools image error means and how to fix it: HEIC photos from iPhones, unsupported formats, the 16.7 MP iPhone limit, WebP in Safari and memory.",
    summary:
      "Intera Tools processes images inside your browser, so most failures come from what that browser and device can decode, hold in memory or save. Each problem shows a specific message. Find yours below to see the cause and the fix.",
    takeaways: [
      "HEIC photos from iPhones open only in Safari 17 or later. For Chrome, Edge or Firefox, convert them to JPG first, or set the iPhone camera to Most Compatible.",
      "On iPhone and iPad, one image can be at most about 16.7 megapixels. Resize 24 MP and 48 MP photos first, or use a computer.",
      "Safari can show WebP images but can’t create them. Pick JPG or PNG there, or use Chrome, Edge or Firefox.",
      "“Already optimized — original kept” is not an error. Compression wouldn’t have made the file smaller, so you get the original back unchanged.",
    ],
    body: [
      { type: "h2", text: "Quick diagnosis" },
      {
        type: "table",
        caption: "Match the message you see to its cause",
        head: ["Message or symptom", "Most likely cause", "What to do"],
        rows: [
          ["This file type isn’t supported here.", "The tool doesn’t accept this format (often HEIC, TIFF, RAW or PSD)", "Use a tool that accepts it, or export as JPG or PNG"],
          ["The image couldn’t be opened…", "HEIC outside Safari, or a damaged or mislabeled file", "Convert HEIC to JPG, or open the page in Safari"],
          ["File is larger than 50 MB. / Only 100 files can be added at once.", "Per-file or per-batch limit", "Resize, or add the rest in a second batch"],
          ["The image is too large for this device (… MP)…", "iPhone/iPad canvas limit (about 16.7 MP), or over 100 MP elsewhere", "Resize first, or use a computer"],
          ["This browser can’t save WebP files…", "Safari doesn’t encode WebP", "Choose JPG or PNG, or switch browser"],
          ["Your device ran out of memory…", "Too many large images at once", "Smaller batches, close other tabs"],
          ["Already optimized — original kept", "Compression wouldn’t make the file smaller", "Not an error. Resize, lower the quality, or try WebP"],
        ],
      },

      { type: "h2", text: "“This file type isn’t supported here.”" },
      {
        type: "p",
        text: "Each tool checks the file type (or the extension, if the browser reports no type) before adding a file. The upload area lists what the tool accepts:",
      },
      {
        type: "table",
        head: ["Tool", "Accepted formats"],
        rows: [
          ["[Compress Image](/compress-image)", "JPG, PNG, WebP"],
          ["Crop Image, Watermark Image, JPG to PDF", "JPG, PNG, WebP, GIF, BMP, AVIF"],
          ["[Convert Image](/convert-image) (also JPG to PNG, PNG to JPG, WebP to JPG), [Resize Image](/resize-image), Rotate Image", "JPG, PNG, WebP, GIF, BMP, AVIF, SVG, plus HEIC/HEIF where the browser can decode it"],
        ],
      },
      {
        type: "p",
        text: "No tool accepts TIFF, camera RAW (DNG, CR3, NEF and others) or PSD, because browsers can’t decode them. Export those as JPG or PNG first. To compress a GIF or SVG, convert it to PNG with [Convert Image](/convert-image). **“The file is empty.”** means a 0-byte file, usually from a download or copy that didn’t finish.",
      },

      { type: "h2", text: "HEIC photos from an iPhone" },
      {
        type: "p",
        text: "iPhones save photos as HEIC by default. According to caniuse.com, only Safari 17 or later (on Mac, iPhone or iPad) can decode HEIC. Chrome, Edge, Firefox and Samsung Internet can’t. In those browsers, Convert, Resize and Rotate accept the file, then show **“The image couldn’t be opened. It may be damaged or in a format this browser can’t read.”** Compress, Crop, Watermark and JPG to PDF reject it as unsupported. Renaming `.HEIC` to `.jpg` doesn’t help, because the contents are still HEIC.",
      },
      {
        type: "steps",
        items: [
          { title: "Convert in Safari", body: "Open [Convert Image](/convert-image) in Safari, add the HEIC files and choose JPG. The JPGs work in every browser and tool." },
          { title: "Convert in the Files app", body: "On iOS 16 or later, save the photos to Files. Touch and hold one, or select several, then choose Quick Actions → Convert Image → JPEG." },
          { title: "Change future photos", body: "Settings → Camera → Formats → Most Compatible saves new photos as JPEG. They take more storage than HEIC." },
          { title: "Convert while transferring", body: "In Settings → Apps → Photos (Settings → Photos on older iOS), set Transfer to Mac or PC to Automatic to convert photos copied over USB. AirDrop, Messages and Mail may also send JPEG when the receiving device can’t use HEIF." },
        ],
      },
      { type: "tool", slug: "convert-image", text: "Turn HEIC, WebP, AVIF or SVG files into JPG or PNG that open everywhere." },

      { type: "h2", text: "“The image couldn’t be opened…” for other files" },
      {
        type: "p",
        text: "If the file isn’t HEIC, the browser couldn’t decode it. Common causes are a download that stopped part-way, or a file that’s really something else, such as a web page saved as `.jpg`. Try opening it in your photo viewer. If it fails there too, download or export it again from the source. If it opens, save a fresh JPG or PNG copy from that app.",
      },

      { type: "h2", text: "“File is larger than 50 MB.” and “Only 100 files can be added at once.”" },
      {
        type: "p",
        text: "Image tools accept up to 100 files per batch and 50 MB per file. Files over a limit are listed under **“Some files were not added”**, and the rest are added normally. With 90 files already in the list, only 10 more fit. Process the first batch, choose **Start over**, then add the rest. Crop Image takes one file at a time, so a new file replaces the current one.",
      },

      { type: "h2", text: "“The image is too large for this device (… MP).”" },
      {
        type: "p",
        text: "To edit an image, the browser draws it at full size onto a canvas. On iPhone and iPad, WebKit caps a canvas at 16,777,216 pixels (4096 × 4096, about 16.7 MP). Apple doesn’t document this number, but developers report it consistently. Every iPhone and iPad browser uses WebKit, so Chrome there is affected too. Intera Tools checks the size first and shows this message instead of returning a blank image. On other devices the limit is 100 MP.",
      },
      {
        type: "ul",
        items: [
          "A 12 MP photo (4032 × 3024) fits. Recent iPhones with a 48 MP main camera can also save 24 MP and 48 MP photos, and their panoramas reach 63 MP. Those don’t fit.",
          "[Resize Image](/resize-image) can often still handle them on the phone, because only the smaller result is drawn onto a canvas. A width of 4000 px keeps a 4:3 photo at 12 MP. Then compress, crop or convert the resized copy.",
          "Otherwise, use a smaller size in the Files app’s Convert Image, or work on a computer.",
        ],
      },
      { type: "tool", slug: "resize-image", text: "Shrink oversized photos first so the other tools can handle them on your phone." },

      { type: "h2", text: "“This browser can’t save WebP files.”" },
      {
        type: "p",
        text: "Saving uses the browser’s built-in encoder. Chrome, Edge and Firefox can save WebP, but Safari on Mac, iPhone and iPad can only display it. Intera Tools checks this when the page loads and disables the WebP option with the hint **“This browser can’t create WebP files.”** If a WebP save still fails, you see **“This browser can’t save WebP files. Choose another format or use Chrome, Edge or Firefox.”** Choose JPG for photos or PNG for graphics with transparency. The [WebP guide](/guides/webp-format-explained) explains when WebP is worth it.",
      },

      { type: "h2", text: "“Your device ran out of memory. Try fewer or smaller files.”" },
      {
        type: "p",
        text: "A photo file is compressed, but while it’s being processed it takes about 4 bytes per pixel. One 24 MP photo needs roughly 96 MB. Phones give a browser tab far less memory than a computer does, and other tabs share it. If you see this message, or the page reloads by itself, close other tabs, process 10–20 photos at a time, or [resize](/resize-image) the images first.",
      },

      { type: "h2", text: "“Already optimized — original kept” after compressing" },
      {
        type: "p",
        text: "This result label is not an error. When [Compress Image](/compress-image) keeps the format, it compares the new file with the original. If the new file isn’t smaller, you get the original back byte for byte, not a bigger or worse copy. This happens often with images an app or website has already compressed hard, and with small PNGs that use few colors. To get more out of them (more in [compressing without losing quality](/guides/compress-images-without-losing-quality)):",
      },
      {
        type: "ul",
        items: [
          "Choose **Strong**, or lower **JPG / WebP quality** or **PNG colors** under advanced settings.",
          "Reduce the dimensions with [Resize Image](/resize-image). This usually saves the most when a photo is larger than it will be shown.",
          "Turn on **Convert to WebP** (not in Safari). A WebP result is always kept, so check the size shown.",
        ],
      },

      { type: "h2", text: "“Something went wrong while processing this file.”" },
      {
        type: "p",
        text: "This covers rare failures without a specific cause. Reload the page and try again. If it fails again, try another browser. If it works there, the first browser is the problem, not the file.",
      },
    ],
    faq: [
      {
        q: "Why does my HEIC photo open on my iPhone but not on my Windows PC?",
        a: "Only Safari 17 or later decodes HEIC. Chrome, Edge and Firefox can’t, on any system. Convert the photo to JPG in Safari or the Files app, or set the camera to Most Compatible so new photos are saved as JPEG.",
      },
      {
        q: "Does converting HEIC to JPG reduce quality?",
        a: "JPG is lossy, so the image is re-encoded. At Convert Image’s default quality of 92 the difference is very hard to see, but the JPG is usually larger than the HEIC.",
      },
      {
        q: "Are my files uploaded when an error happens?",
        a: "No. Checks and processing run entirely in your browser, and errors are shown locally. Nothing is sent to a server, whether a file succeeds or fails.",
      },
    ],
  },

  ko: {
    title: "이미지가 열리지 않거나 변환·압축이 안 될 때: 오류 메시지별 원인과 해결법",
    metaTitle: "이미지가 안 열리거나 변환이 안 될 때 해결법",
    metaDescription:
      "아이폰 HEIC 사진, 지원하지 않는 형식, 아이폰 16.7MP 제한, Safari WebP 저장 문제, 메모리 부족까지 Intera Tools 이미지 오류 메시지별 원인과 해결 방법을 정리했습니다.",
    summary:
      "Intera Tools는 브라우저 안에서 이미지를 처리합니다. 그래서 문제는 대부분 지금 쓰는 브라우저와 기기가 그 파일을 읽고, 메모리에 올리고, 원하는 형식으로 저장할 수 있느냐에서 생깁니다. 문제가 생기면 구체적인 메시지가 표시되니, 아래에서 같은 문구를 찾아 원인과 해결 방법을 확인하세요.",
    takeaways: [
      "아이폰 HEIC 사진은 Safari 17 이상에서만 열립니다. Chrome, Edge, Firefox에서는 먼저 JPG로 바꾸거나 카메라 포맷을 ‘높은 호환성’으로 바꾸세요.",
      "아이폰·아이패드에서는 이미지 한 장이 약 16.7MP까지만 처리됩니다. 24MP·48MP 사진은 먼저 크기를 줄이거나 PC에서 작업하세요.",
      "Safari는 WebP를 보여 줄 수는 있지만 만들지는 못합니다. JPG나 PNG를 고르거나 Chrome, Edge, Firefox를 이용하세요.",
      "‘이미 최적화됨 — 원본 유지’는 오류가 아닙니다. 압축해도 용량이 줄지 않아 원본을 그대로 돌려드린 것입니다.",
    ],
    body: [
      { type: "h2", text: "빠른 진단표" },
      {
        type: "table",
        caption: "화면에 나온 메시지로 원인 찾기",
        head: ["메시지·증상", "가장 흔한 원인", "해결 방법"],
        rows: [
          ["이 도구에서 지원하지 않는 파일 형식입니다.", "도구가 받지 않는 형식(HEIC, TIFF, RAW, PSD 등)", "해당 형식을 받는 도구 이용, 또는 JPG·PNG로 내보내기"],
          ["이미지를 열 수 없습니다…", "Safari가 아닌 브라우저의 HEIC, 손상되었거나 확장자가 잘못된 파일", "HEIC를 JPG로 변환하거나 Safari에서 열기"],
          ["파일이 50 MB보다 큽니다. / 한 번에 100개까지 추가할 수 있습니다.", "파일당 용량 또는 개수 제한", "크기를 줄이거나 나머지는 다음 묶음으로"],
          ["이 기기에서 처리하기엔 이미지가 너무 큽니다(…MP)…", "아이폰·아이패드 캔버스 제한(약 16.7MP), 그 밖의 기기는 100MP 초과", "먼저 크기 조절, 또는 PC 이용"],
          ["이 브라우저는 WebP 파일을 저장할 수 없습니다…", "Safari는 WebP를 만들지 못함", "JPG·PNG 선택 또는 브라우저 변경"],
          ["기기 메모리가 부족합니다…", "큰 이미지를 한꺼번에 너무 많이 처리", "나눠서 처리하고 다른 탭 닫기"],
          ["이미 최적화됨 — 원본 유지", "압축해도 용량이 줄지 않음", "오류 아님. 크기 조절, 품질 낮추기, WebP 시도"],
        ],
      },

      { type: "h2", text: "“이 도구에서 지원하지 않는 파일 형식입니다.”" },
      {
        type: "p",
        text: "각 도구는 파일을 추가하기 전에 파일 형식(브라우저가 형식을 알려 주지 않으면 확장자)을 확인합니다. 지원 형식은 업로드 영역에 표시됩니다.",
      },
      {
        type: "table",
        head: ["도구", "지원 형식"],
        rows: [
          ["[이미지 압축](/compress-image)", "JPG, PNG, WebP"],
          ["이미지 자르기, 워터마크 넣기, JPG를 PDF로 변환", "JPG, PNG, WebP, GIF, BMP, AVIF"],
          ["[이미지 변환](/convert-image)(JPG를 PNG로, PNG를 JPG로, WebP를 JPG로 포함), [이미지 크기 조절](/resize-image), 이미지 회전", "JPG, PNG, WebP, GIF, BMP, AVIF, SVG, 그리고 브라우저가 읽을 수 있는 경우 HEIC/HEIF"],
        ],
      },
      {
        type: "p",
        text: "TIFF, 카메라 RAW(DNG, CR3, NEF 등), 포토샵 PSD는 브라우저가 읽지 못해 어떤 도구에서도 받지 않습니다. 원래 프로그램에서 JPG나 PNG로 내보낸 뒤 사용하세요. GIF나 SVG를 압축하려면 먼저 [이미지 변환](/convert-image)으로 PNG로 바꾸면 됩니다. **“빈 파일입니다.”**는 용량이 0바이트인 파일로, 대개 다운로드나 복사가 끝까지 되지 않은 경우입니다.",
      },

      { type: "h2", text: "아이폰 HEIC 사진이 열리지 않을 때" },
      {
        type: "p",
        text: "아이폰은 기본적으로 사진을 HEIC 형식으로 저장합니다. caniuse.com에 따르면 HEIC는 Mac, 아이폰, 아이패드의 Safari 17 이상에서만 읽을 수 있고, Chrome, Edge, Firefox, 삼성 인터넷은 읽지 못합니다. 이런 브라우저에서는 이미지 변환·크기 조절·회전에 HEIC를 넣으면 파일은 추가되지만 **“이미지를 열 수 없습니다. 파일이 손상되었거나 이 브라우저가 읽을 수 없는 형식입니다.”**가 표시되고, 압축·자르기·워터마크·JPG를 PDF로 변환은 처음부터 지원하지 않는 형식으로 안내합니다. 확장자만 `.jpg`로 바꿔도 내용은 그대로 HEIC라서 해결되지 않습니다.",
      },
      {
        type: "steps",
        items: [
          { title: "Safari에서 변환하기", body: "Safari에서 [이미지 변환](/convert-image)을 열고 HEIC 파일을 넣은 뒤 JPG를 고릅니다. 변환한 JPG는 어느 브라우저, 어느 도구에서나 열립니다." },
          { title: "파일 앱에서 변환하기", body: "iOS 16 이상이라면 사진을 파일 앱에 저장한 뒤 길게 누르거나 여러 장을 선택하고 빠른 동작 → 이미지 변환 → JPEG를 고릅니다." },
          { title: "앞으로 찍을 사진 바꾸기", body: "설정 → 카메라 → 포맷 → 높은 호환성을 선택하면 새 사진이 JPEG로 저장됩니다. 대신 HEIC보다 저장 공간을 더 차지합니다." },
          { title: "옮길 때 자동 변환하기", body: "설정 → 앱 → 사진(이전 iOS는 설정 → 사진)에서 ‘Mac 또는 PC로 전송’을 ‘자동’으로 두면 USB로 옮기는 사진이 호환되는 형식으로 바뀝니다. AirDrop, 메시지, 메일도 받는 기기가 HEIF를 지원하지 않으면 JPEG로 보낼 수 있습니다." },
        ],
      },
      { type: "tool", slug: "convert-image", text: "HEIC, WebP, AVIF, SVG 파일을 어디서나 열리는 JPG·PNG로 바꿔 보세요." },

      { type: "h2", text: "HEIC가 아닌데 “이미지를 열 수 없습니다”가 나올 때" },
      {
        type: "p",
        text: "HEIC가 아니라면 브라우저가 파일 내용을 해석하지 못한 것입니다. 다운로드가 중간에 끊겼거나, 확장자만 `.jpg`이고 실제로는 웹페이지 같은 다른 파일인 경우가 흔합니다. 먼저 사진 뷰어로 열어 보세요. 뷰어에서도 안 열리면 원본에서 다시 받아야 하고, 열린다면 그 앱에서 JPG나 PNG로 새로 저장하면 됩니다.",
      },

      { type: "h2", text: "“파일이 50 MB보다 큽니다.”, “한 번에 100개까지 추가할 수 있습니다.”" },
      {
        type: "p",
        text: "이미지 도구는 한 번에 최대 100개, 파일당 50MB까지 받습니다. 기준을 넘은 파일은 **“일부 파일을 추가하지 못했습니다”** 아래에 따로 표시되고, 나머지는 정상적으로 추가됩니다. 이미 90개가 들어 있다면 10개만 더 들어갑니다. 첫 묶음을 처리한 뒤 **처음부터**를 누르고 나머지를 넣으세요. 이미지 자르기는 한 번에 파일 하나만 다루므로 새 파일을 넣으면 기존 파일이 바뀝니다.",
      },

      { type: "h2", text: "“이 기기에서 처리하기엔 이미지가 너무 큽니다(…MP).”" },
      {
        type: "p",
        text: "이미지를 편집하려면 브라우저가 원본 크기 그대로 캔버스에 그려야 합니다. 아이폰·아이패드의 WebKit 엔진은 캔버스 하나를 16,777,216픽셀(4096 × 4096, 약 16.7MP)까지만 허용합니다. Apple 공식 문서에 나온 수치는 아니지만 개발자들 사이에서 일관되게 확인되는 값입니다. 아이폰·아이패드의 브라우저는 모두 WebKit을 쓰기 때문에 Chrome에서도 마찬가지입니다. Intera Tools는 빈 이미지를 내놓는 대신 미리 크기를 확인해 이 메시지를 보여 줍니다. 그 밖의 기기에서는 100MP까지 처리합니다.",
      },
      {
        type: "ul",
        items: [
          "12MP 사진(4032 × 3024)은 문제없습니다. 48MP 메인 카메라가 달린 최근 아이폰은 24MP·48MP 사진도 저장할 수 있고 파노라마는 최대 63MP인데, 이런 사진은 제한을 넘습니다.",
          "[이미지 크기 조절](/resize-image)은 줄어든 결과만 캔버스에 그리기 때문에 휴대폰에서도 처리되는 경우가 많습니다. 4:3 사진은 너비를 4000px로 하면 12MP가 됩니다. 줄인 사진으로 압축, 자르기, 변환을 이어 가세요.",
          "파일 앱의 이미지 변환에서 작은 크기를 고르거나 PC에서 작업하는 방법도 있습니다.",
        ],
      },
      { type: "tool", slug: "resize-image", text: "큰 사진의 크기를 먼저 줄이면 휴대폰에서도 다른 도구를 쓸 수 있습니다." },

      { type: "h2", text: "“이 브라우저는 WebP 파일을 저장할 수 없습니다.”" },
      {
        type: "p",
        text: "파일 저장은 브라우저에 내장된 인코더가 맡습니다. Chrome, Edge, Firefox는 WebP를 저장할 수 있지만, Mac·아이폰·아이패드의 Safari는 WebP를 보여 주기만 할 뿐 만들지 못합니다. Intera Tools는 페이지를 열 때 이를 확인해 WebP 옵션을 끄고 **“이 브라우저는 WebP 파일을 만들 수 없습니다.”**라고 안내합니다. 그래도 저장 단계에서 실패하면 **“이 브라우저는 WebP 파일을 저장할 수 없습니다. 다른 형식을 고르거나 Chrome, Edge, Firefox를 이용해 주세요.”**가 표시됩니다. 사진은 JPG, 투명 배경이 필요한 그래픽은 PNG를 고르세요. WebP가 언제 유리한지는 [WebP 가이드](/guides/webp-format-explained)에서 다룹니다.",
      },

      { type: "h2", text: "“기기 메모리가 부족합니다. 파일 수나 크기를 줄여 주세요.”" },
      {
        type: "p",
        text: "사진 파일은 압축되어 있지만, 처리하는 동안에는 픽셀당 약 4바이트를 차지합니다. 24MP 사진 한 장에 메모리가 약 96MB 필요하다는 뜻입니다. 휴대폰은 브라우저 탭에 PC보다 훨씬 적은 메모리를 주고, 다른 탭도 그 메모리를 나눠 씁니다. 이 메시지가 나오거나 페이지가 저절로 새로고침되면 다른 탭을 닫고, 10–20장씩 나눠 처리하거나, 먼저 [크기를 줄여](/resize-image) 보세요.",
      },

      { type: "h2", text: "압축 결과가 “이미 최적화됨 — 원본 유지”일 때" },
      {
        type: "p",
        text: "결과 화면의 이 표시는 오류가 아닙니다. [이미지 압축](/compress-image)은 같은 형식으로 저장할 때 새 파일과 원본의 용량을 비교해, 새 파일이 더 작지 않으면 더 크거나 화질만 낮아진 사본 대신 원본을 그대로 돌려드립니다. 앱이나 웹사이트에서 이미 강하게 압축된 이미지, 색이 적은 작은 PNG에서 자주 나타납니다. 더 줄이고 싶다면 다음을 시도해 보세요([화질을 지키며 이미지 용량 줄이기](/guides/compress-images-without-losing-quality) 참고).",
      },
      {
        type: "ul",
        items: [
          "**강하게**를 고르거나, 고급 설정에서 **JPG / WebP 품질** 또는 **PNG 색상 수**를 낮추세요.",
          "[이미지 크기 조절](/resize-image)로 해상도를 줄이세요. 실제로 보여 줄 크기보다 큰 사진이라면 보통 이 방법이 가장 효과적입니다.",
          "**WebP로 변환**을 켜 보세요(Safari 제외). 이때는 결과가 항상 WebP로 저장되므로 표시된 용량을 확인하세요.",
        ],
      },

      { type: "h2", text: "“파일을 처리하는 중 문제가 발생했습니다.”" },
      {
        type: "p",
        text: "특정 원인에 해당하지 않는 드문 오류입니다. 페이지를 새로고침하고 다시 시도해 보세요. 그래도 안 되면 다른 브라우저에서 열어 보세요. 다른 브라우저에서 된다면 문제는 파일이 아니라 처음 쓰던 브라우저에 있습니다.",
      },
    ],
    faq: [
      {
        q: "아이폰에서는 열리는 HEIC 사진이 Windows PC에서는 왜 안 열리나요?",
        a: "HEIC는 Safari 17 이상에서만 읽을 수 있고, Chrome, Edge, Firefox는 운영체제와 상관없이 읽지 못합니다. Safari나 아이폰 파일 앱에서 JPG로 변환하거나, 카메라 포맷을 ‘높은 호환성’으로 바꿔 앞으로는 JPEG로 저장되게 하세요.",
      },
      {
        q: "HEIC를 JPG로 바꾸면 화질이 떨어지나요?",
        a: "JPG는 손실 압축 형식이라 다시 인코딩됩니다. 이미지 변환의 기본 품질인 92에서는 차이를 눈으로 알아보기 어렵지만, 용량은 대개 원래 HEIC보다 커집니다.",
      },
      {
        q: "오류가 나면 파일이 서버로 전송되나요?",
        a: "아니요. 형식 확인부터 처리까지 모두 브라우저 안에서 이루어지고, 오류 메시지도 기기 안에서 표시됩니다. 성공하든 실패하든 파일은 서버로 전송되지 않습니다.",
      },
    ],
  },
};

export default guide;
