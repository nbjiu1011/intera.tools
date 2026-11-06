import type { Locale } from "../../i18n/config";
import type { GuideContent } from "../types";

const guide: Record<Locale, GuideContent> = {
  en: {
    title: "How to Turn Phone Photos of Documents into a Clean PDF",
    metaTitle: "Scan Documents to PDF with Your Phone: A Clean Result",
    metaDescription:
      "Photograph paper documents so they read well, crop and rotate them, then build one ordered A4 PDF in your browser. What built-in scanners do and Intera can't.",
    summary:
      "A phone camera is a perfectly good scanner if you shoot carefully and finish the pages properly. This guide covers how to photograph paper so the result is legible, when your phone's built-in scanner is the better choice, and how to turn ordinary photos into a single, ordered, reasonably sized PDF with Intera Tools, including what it won't do for you: straighten a skewed page or recognize the text.",
    takeaways: [
      "Good light, a flat page and a phone held parallel above it matter more than any app setting.",
      "iPhone Notes and Files and the Google Drive app on Android have document scanners that detect page edges and fix perspective.",
      "With Intera Tools, crop each photo, then build the PDF with the Photos to PDF Document workflow: order, rotation, A4 and shrinking in one step.",
      "Intera Tools has no perspective correction and no OCR, so shoot straight on and expect the text in the PDF to be an image.",
      "Photos and PDFs are processed in your browser and never uploaded, which matters for IDs, contracts and medical papers.",
    ],
    body: [
      { type: "h2", text: "Shoot the page so it reads well" },
      {
        type: "p",
        text: "No tool can recover text that is blurred, in shadow or cut off, so the photo is where quality is decided. These habits make the biggest difference:",
      },
      {
        type: "ul",
        items: [
          "**Use even, soft light.** Daylight near a window works well. A single ceiling lamp tends to put the shadow of your phone and hand right on the page, so step to the side or move the paper rather than shooting with the light behind you.",
          "**Flatten the paper.** Unfold creases, hold curled edges down with something outside the frame, and use a plain, dark surface so the page edges stand out.",
          "**Hold the phone parallel to the page, directly above it.** Shooting at an angle turns the rectangle into a trapezoid with smaller text at the far end. Built-in scanners can correct this; Intera Tools can't.",
          "**Fill the frame, but leave a thin border.** Get close enough that the page fills most of the picture, without cutting off the edges. You will crop the background away afterwards.",
          "**Skip the flash on glossy paper.** It creates a bright spot that wipes out the text underneath. Use it only if the room is too dark otherwise.",
          "**Check sharpness before moving on.** Tap to focus on the text, then zoom into the photo you just took. Retaking now is easier than discovering a blurry page later.",
          "**One page per photo, in order.** Shooting pages in sequence makes ordering the PDF almost automatic.",
        ],
      },

      { type: "h2", text: "When your phone's built-in scanner is the better choice" },
      {
        type: "p",
        text: "If you are holding the paper right now, try the scanner already on your phone first. It finds the page edges and straightens the page for you, which is exactly what a plain photo lacks.",
      },
      {
        type: "ul",
        items: [
          "**iPhone and iPad:** in **Notes**, tap the attachment (paperclip) button and choose **Scan Documents**; in the **Files** app, tap the **More** button and choose **Scan Documents**. In Auto mode the page is captured automatically, and you can drag the corners to fit the page before tapping **Keep Scan**.",
          "**Android:** in the **Google Drive** app, tap the **Camera** button at the bottom right. A blue outline shows the area to be cropped, and before saving you can crop and rotate, apply a filter, add pages and choose to save as **PDF** or **JPG**.",
        ],
      },
      {
        type: "p",
        text: "Keep in mind where the result goes: a Drive scan is saved to your Google Drive, and Notes and Files may sync to iCloud depending on your settings. Intera Tools is useful when you already have the photos (sent by someone else, taken earlier, or shot with the regular camera), when you want to combine photos from different sources, or when the pages should stay on your device.",
      },

      { type: "h2", text: "From photos to PDF with Intera Tools" },
      {
        type: "p",
        text: "The tools accept JPG, PNG, WebP, GIF, BMP and AVIF. iPhones save photos as HEIC by default, which most browsers other than Safari can't read; our guide on [images that won't open](/guides/image-wont-open-or-convert) explains how to convert them or switch the camera to JPG, and covers the size limit Safari on iPhone and iPad sets for very large photos.",
      },
      {
        type: "steps",
        items: [
          { title: "Crop away the background", body: "Open each photo in [Crop Image](/crop-image), keep the aspect ratio on **Free** and drag the box to the edges of the page, or type exact **X**, **Y**, **Width** and **Height** values. Crop Image works on one image at a time; download each cropped page before starting the next." },
          { title: "Add the pages to the workflow", body: "Drop all cropped photos into [Photos to PDF Document](/workflows/images-to-pdf-document). Each photo becomes one page, numbered in the corner of its thumbnail." },
          { title: "Fix order and rotation", body: "Drag thumbnails or use the arrow buttons to put pages in order. The rotate button turns a page 90° clockwise per tap, so a sideways photo needs one or three taps. (To save upright copies of the photos themselves, use [Rotate Image](/rotate-image) instead.)" },
          { title: "Choose the page settings", body: "Set **Page size** to **A4** (or **US Letter**), leave **Orientation** on **Auto** so landscape photos get landscape pages, and pick a **Margin**: **None** fills the page, **Small** leaves about 7 mm. Keep **Shrink images for a smaller PDF** on and type a **PDF file name**." },
          { title: "Run and check", body: "Choose **Run workflow**, open the result and zoom into the smallest text on each page before you send it." },
        ],
      },
      {
        type: "workflow",
        slug: "images-to-pdf-document",
        text: "Turn document photos into one ordered PDF: drag pages into place, rotate them, choose A4 or US Letter and keep the file small.",
      },

      { type: "h2", text: "How big will the PDF be?" },
      {
        type: "p",
        text: "With shrinking on, each photo is scaled to at most 2000 px on its long edge and saved as JPG at quality 80. On an A4 page that is about 170 pixels per inch, sharp enough to read printed text comfortably. In our test with five high-resolution camera photos, the PDF was **1.55 MB** with shrinking on and **33.8 MB** with it off. Turn it off only when someone needs the full resolution, for example to print the pages large.",
      },
      {
        type: "note",
        tone: "tip",
        title: "Receipts and odd-sized paper",
        text: "Long, narrow receipts look tiny on an A4 page because they are scaled to fit the height. Choose **Fit to image** as the page size if the PDF is only for viewing on screen, or crop tightly so the receipt fills as much of the page as possible.",
      },

      { type: "h2", text: "What Intera Tools won't do" },
      {
        type: "table",
        head: ["Feature", "Intera Tools", "What to do instead"],
        rows: [
          ["Detect page edges automatically", "No; you crop by hand", "Crop Image with the Free ratio, or your phone's scanner"],
          ["Straighten a page shot at an angle (perspective correction)", "No; crops are rectangles", "Reshoot from directly above, or use Notes, Files or Google Drive scanning"],
          ["Recognize text (OCR), make the PDF searchable", "No; text in the PDF is part of the image", "Use a scanner app or desktop software with OCR"],
          ["Black-and-white or contrast filters", "No", "Use the filters in a built-in scanner, or good lighting"],
          ["Order, rotate, page size, margins, shrinking", "Yes", "Photos to PDF Document workflow"],
        ],
      },

      { type: "h2", text: "Privacy for sensitive papers" },
      {
        type: "p",
        text: "Scans tend to be the documents you least want copied: ID cards, contracts, payslips, medical forms. On Intera Tools the photos are read, cropped and assembled into a PDF inside your browser, and nothing is uploaded to a server. The files leave your device only when you send them yourself. If a PDF should contain fewer pages than you scanned, remove them afterwards with [Organize PDF](/organize-pdf); to add the scan to another PDF, use [Merge PDF](/merge-pdf).",
      },
    ],
    faq: [
      {
        q: "Can Intera Tools straighten a document photographed at an angle?",
        a: "No. Cropping is rectangular and there is no perspective correction, so photograph the page from directly above. If you can't reshoot, a phone scanner such as iPhone Notes or Google Drive can adjust the corners.",
      },
      {
        q: "Can I search or copy the text in the PDF?",
        a: "No. The pages are photos, and Intera Tools doesn't perform OCR, so the text can't be selected or searched. You need an app with text recognition for that.",
      },
      {
        q: "Why is my PDF so large?",
        a: "Probably because shrinking was off, so each full-resolution photo went into the PDF unchanged. Run the workflow again with Shrink images for a smaller PDF on; five camera photos dropped from 33.8 MB to 1.55 MB in our test.",
      },
      {
        q: "Are my document photos uploaded?",
        a: "No. Cropping, rotating and building the PDF all happen in your browser, and the files are not sent to Intera Tools.",
      },
    ],
    sources: [
      { label: "Apple Support – How to scan documents on your iPhone or iPad", url: "https://support.apple.com/en-us/108963" },
      { label: "Google Drive Help – Scan documents with Google Drive (Android)", url: "https://support.google.com/drive/answer/3145835?hl=en&co=GENIE.Platform%3DAndroid" },
    ],
  },

  ko: {
    title: "휴대폰으로 찍은 서류 사진, 깔끔한 PDF로 만드는 법",
    metaTitle: "휴대폰으로 서류 스캔해 PDF 만들기",
    metaDescription:
      "종이 서류를 읽기 좋게 찍는 요령부터 자르기·회전, 순서를 맞춘 A4 PDF 만들기까지. 휴대폰 기본 스캐너와 Intera Tools로 할 수 없는 일도 정리했습니다.",
    summary:
      "조심해서 찍고 마무리만 제대로 하면 휴대폰 카메라도 훌륭한 스캐너입니다. 이 글에서는 글자가 잘 읽히도록 종이를 찍는 법, 휴대폰 기본 스캐너가 더 나은 경우, 그리고 일반 사진을 Intera Tools로 순서가 맞고 용량도 적당한 PDF 하나로 만드는 법을 설명합니다. 비스듬히 찍힌 페이지를 펴 주거나 글자를 인식하는 일처럼 Intera Tools가 해 주지 않는 것도 함께 짚습니다.",
    takeaways: [
      "앱 설정보다 고른 조명, 평평한 종이, 종이와 평행하게 위에서 든 휴대폰이 훨씬 중요합니다.",
      "iPhone의 메모·파일 앱과 Android의 Google Drive 앱에는 페이지 가장자리를 찾아 원근을 보정하는 문서 스캐너가 있습니다.",
      "Intera Tools에서는 사진을 한 장씩 자른 뒤 ‘사진으로 PDF 문서 만들기’로 순서, 회전, A4, 용량 줄이기를 한 번에 처리합니다.",
      "Intera Tools에는 원근 보정과 문자 인식(OCR)이 없습니다. 정면에서 찍고, PDF 속 글자는 이미지라는 점을 알아두세요.",
      "사진과 PDF는 브라우저 안에서 처리되고 업로드되지 않습니다. 신분증, 계약서, 진료 서류라면 특히 중요합니다.",
    ],
    body: [
      { type: "h2", text: "글자가 잘 읽히게 찍기" },
      {
        type: "p",
        text: "흐리거나 그림자가 지거나 잘린 글자는 어떤 도구로도 살릴 수 없습니다. 결과물의 품질은 사진을 찍는 순간 정해집니다. 다음 습관이 가장 큰 차이를 만듭니다.",
      },
      {
        type: "ul",
        items: [
          "**고르고 부드러운 빛.** 창가의 자연광이 좋습니다. 천장 조명 하나 아래에서 찍으면 휴대폰과 손 그림자가 종이 위에 바로 생기기 쉬우니, 조명을 등지지 말고 옆으로 비켜서거나 종이를 옮기세요.",
          "**종이를 평평하게.** 접힌 자국은 펴고, 말려 올라오는 가장자리는 화면 밖에서 눌러 둡니다. 무늬 없는 어두운 바탕에 두면 종이 테두리가 잘 구분됩니다.",
          "**휴대폰을 종이와 평행하게, 바로 위에서.** 비스듬히 찍으면 직사각형이 사다리꼴이 되고 먼 쪽 글자가 작아집니다. 기본 스캐너는 이를 보정하지만 Intera Tools는 못 합니다.",
          "**화면을 채우되 테두리는 약간 남기기.** 종이가 화면 대부분을 차지할 만큼 다가가되 가장자리가 잘리지 않게 합니다. 바탕은 나중에 잘라내면 됩니다.",
          "**광택지에는 플래시 끄기.** 반사된 밝은 점이 그 아래 글자를 지워 버립니다. 방이 너무 어두울 때만 쓰세요.",
          "**다음 장으로 넘어가기 전에 선명도 확인.** 글자를 눌러 초점을 맞추고, 찍은 사진을 확대해 봅니다. 나중에 흐린 페이지를 발견하는 것보다 지금 다시 찍는 편이 쉽습니다.",
          "**한 장에 한 페이지, 순서대로.** 페이지 순서대로 찍어 두면 PDF 순서 정리가 거의 저절로 됩니다.",
        ],
      },

      { type: "h2", text: "휴대폰 기본 스캐너가 더 나은 경우" },
      {
        type: "p",
        text: "지금 종이를 손에 들고 있다면 휴대폰에 이미 있는 스캐너부터 써 보세요. 페이지 가장자리를 찾아 반듯하게 펴 주는데, 이것이 일반 사진에 없는 기능입니다.",
      },
      {
        type: "ul",
        items: [
          "**iPhone·iPad:** **메모** 앱에서 첨부(클립) 버튼을 누르고 **문서 스캔**을 고르거나, **파일** 앱에서 **더 보기** 버튼을 누르고 **문서 스캔**을 고릅니다. 자동 모드에서는 페이지가 저절로 촬영되고, **스캔 유지**를 누르기 전에 모서리를 끌어 페이지에 맞출 수 있습니다.",
          "**Android:** **Google Drive** 앱에서 오른쪽 아래 **카메라** 버튼을 누릅니다. 파란 테두리가 잘라낼 영역을 보여 주며, 저장 전에 자르기·회전, 필터, 페이지 추가를 할 수 있고 **PDF** 또는 **JPG**로 저장할 수 있습니다.",
        ],
      },
      {
        type: "p",
        text: "결과가 어디에 저장되는지도 생각해 두세요. Drive 스캔은 Google Drive에 저장되고, 메모와 파일 앱은 설정에 따라 iCloud와 동기화될 수 있습니다. Intera Tools는 이미 찍어 둔 사진(다른 사람이 보내 줬거나, 예전에 찍었거나, 일반 카메라로 찍은 사진)이 있을 때, 여러 곳에서 온 사진을 한데 묶을 때, 서류를 기기 밖으로 내보내고 싶지 않을 때 유용합니다.",
      },

      { type: "h2", text: "Intera Tools로 사진을 PDF로 만들기" },
      {
        type: "p",
        text: "JPG, PNG, WebP, GIF, BMP, AVIF를 받습니다. iPhone은 기본적으로 사진을 HEIC로 저장하는데, Safari가 아닌 대부분의 브라우저는 HEIC를 읽지 못합니다. 변환하는 법이나 카메라를 JPG로 바꾸는 법, 그리고 iPhone·iPad의 Safari가 아주 큰 사진에 두는 크기 한도는 [이미지가 열리지 않을 때](/guides/image-wont-open-or-convert)에 정리했습니다.",
      },
      {
        type: "steps",
        items: [
          { title: "바탕 잘라내기", body: "사진을 [이미지 자르기](/crop-image)에서 열고 비율을 **자유**로 둔 채 상자를 종이 가장자리에 맞추거나, **X**, **Y**, **너비**, **높이** 값을 직접 입력합니다. 이미지 자르기는 한 번에 한 장씩 처리하므로, 한 장을 잘라 내려받은 뒤 다음 장으로 넘어가세요." },
          { title: "워크플로에 페이지 넣기", body: "잘라낸 사진을 모두 [사진으로 PDF 문서 만들기](/workflows/images-to-pdf-document)에 넣습니다. 사진 한 장이 한 페이지가 되고, 썸네일 모서리에 페이지 번호가 표시됩니다." },
          { title: "순서와 방향 맞추기", body: "썸네일을 끌거나 화살표 버튼으로 순서를 맞춥니다. 회전 버튼은 누를 때마다 시계 방향으로 90°씩 돌리므로, 옆으로 누운 사진은 한 번 또는 세 번 누르면 됩니다. (사진 파일 자체를 바로 세워 저장하려면 [이미지 회전](/rotate-image)을 쓰세요.)" },
          { title: "페이지 설정 고르기", body: "**페이지 크기**는 **A4**(또는 **US Letter**), **방향**은 **자동**으로 두면 가로 사진에는 가로 페이지가 쓰입니다. **여백**은 **없음**이면 페이지를 가득 채우고, **좁게**는 약 7mm를 남깁니다. **PDF 용량을 줄이도록 이미지 축소**는 켜 두고 **PDF 파일 이름**을 입력하세요." },
          { title: "실행하고 확인하기", body: "**워크플로 실행**을 누른 뒤, 보내기 전에 결과를 열어 페이지마다 가장 작은 글씨까지 확대해 확인하세요." },
        ],
      },
      {
        type: "workflow",
        slug: "images-to-pdf-document",
        text: "서류 사진을 순서가 맞는 PDF 하나로 만듭니다. 페이지를 끌어 정리하고, 회전하고, A4·US Letter를 고르고, 용량은 작게 유지합니다.",
      },

      { type: "h2", text: "PDF 용량은 얼마나 될까" },
      {
        type: "p",
        text: "이미지 축소를 켜면 사진마다 긴 변을 최대 2000px로 줄이고 품질 80의 JPG로 저장합니다. A4 페이지에서는 인치당 약 170픽셀로, 인쇄된 글자를 편하게 읽기에 충분합니다. 고해상도 카메라 사진 5장으로 테스트했을 때 축소를 켜면 **1.55MB**, 끄면 **33.8MB**였습니다. 페이지를 크게 인쇄해야 하는 등 원본 해상도가 꼭 필요할 때만 끄세요.",
      },
      {
        type: "note",
        tone: "tip",
        title: "영수증이나 크기가 다른 종이",
        text: "길고 좁은 영수증은 A4 높이에 맞춰 줄어들기 때문에 페이지에서 아주 작게 보입니다. 화면으로만 볼 PDF라면 페이지 크기를 **이미지에 맞춤**으로 고르거나, 영수증이 페이지를 최대한 채우도록 바짝 잘라 주세요.",
      },

      { type: "h2", text: "Intera Tools가 하지 않는 일" },
      {
        type: "table",
        head: ["기능", "Intera Tools", "대신 할 수 있는 방법"],
        rows: [
          ["페이지 가장자리 자동 인식", "없음, 직접 자릅니다", "이미지 자르기(자유 비율) 또는 휴대폰 스캐너"],
          ["비스듬히 찍은 페이지 펴기(원근 보정)", "없음, 직사각형으로만 자릅니다", "바로 위에서 다시 찍기, 또는 메모·파일·Google Drive 스캔"],
          ["문자 인식(OCR), 검색 가능한 PDF", "없음, PDF 속 글자는 이미지입니다", "OCR 기능이 있는 스캔 앱이나 데스크톱 프로그램"],
          ["흑백·대비 보정 필터", "없음", "기본 스캐너의 필터를 쓰거나 조명을 잘 맞추기"],
          ["순서, 회전, 페이지 크기, 여백, 용량 줄이기", "있음", "사진으로 PDF 문서 만들기 워크플로"],
        ],
      },

      { type: "h2", text: "민감한 서류와 개인정보" },
      {
        type: "p",
        text: "스캔하는 서류는 신분증, 계약서, 급여명세서, 진단서처럼 가장 남에게 넘기기 싫은 문서인 경우가 많습니다. Intera Tools에서는 사진을 읽고, 자르고, PDF로 묶는 과정이 모두 브라우저 안에서 이루어지며 서버로 아무것도 업로드되지 않습니다. 파일은 직접 보낼 때만 기기 밖으로 나갑니다. 찍은 것보다 적은 페이지만 보내야 한다면 [PDF 페이지 정리](/organize-pdf)로 빼고, 다른 PDF에 덧붙이려면 [PDF 합치기](/merge-pdf)를 쓰세요.",
      },
    ],
    faq: [
      {
        q: "비스듬히 찍힌 서류를 반듯하게 펼 수 있나요?",
        a: "아니요. 직사각형으로만 자르고 원근 보정 기능이 없으니 종이 바로 위에서 찍어 주세요. 다시 찍을 수 없다면 iPhone 메모 앱이나 Google Drive 같은 휴대폰 스캐너에서 모서리를 맞출 수 있습니다.",
      },
      {
        q: "PDF 속 글자를 검색하거나 복사할 수 있나요?",
        a: "아니요. 페이지는 사진이고 Intera Tools는 문자 인식(OCR)을 하지 않으므로 글자를 선택하거나 검색할 수 없습니다. 문자 인식 기능이 있는 앱이 필요합니다.",
      },
      {
        q: "PDF 용량이 왜 이렇게 크죠?",
        a: "이미지 축소가 꺼져 있어 원본 해상도 사진이 그대로 들어갔을 가능성이 큽니다. ‘PDF 용량을 줄이도록 이미지 축소’를 켜고 다시 실행하세요. 테스트에서 카메라 사진 5장이 33.8MB에서 1.55MB로 줄었습니다.",
      },
      {
        q: "서류 사진이 업로드되나요?",
        a: "아니요. 자르기, 회전, PDF 만들기는 모두 브라우저 안에서 처리되며 파일이 Intera Tools로 전송되지 않습니다.",
      },
    ],
    sources: [
      { label: "Apple 지원 – iPhone 또는 iPad에서 문서를 스캔하는 방법", url: "https://support.apple.com/en-us/108963" },
      { label: "Google Drive 고객센터 – Google Drive로 문서 스캔하기(Android)", url: "https://support.google.com/drive/answer/3145835?hl=en&co=GENIE.Platform%3DAndroid" },
    ],
  },
};

export default guide;
