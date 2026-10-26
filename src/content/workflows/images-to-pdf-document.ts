import type { Locale } from "../../i18n/config";
import type { WorkflowContent } from "../types";

const content: Record<Locale, WorkflowContent> = {
  en: {
    name: "Photos to PDF Document",
    short: "Arrange, rotate and shrink photos into one compact PDF",
    metaTitle: "Photos to One PDF – Arrange, Rotate & Shrink",
    metaDescription:
      "Combine photos of receipts, forms or pages into a single PDF: reorder and rotate them, choose A4 or Letter pages and shrink large photos to keep the PDF small. Free, private.",
    h1: "Photos to PDF document",
    lead: "Turn phone photos of receipts, forms, notes or signed pages into one tidy PDF — in the right order, the right way up, and small enough to email.",
    stepLabels: ["Add photos", "Arrange & rotate", "Build PDF", "Download"],
    useCases: [
      {
        title: "Expense receipts",
        body: "Photograph a week of receipts, drop them in, put them in date order and send accounting one A4 PDF instead of a dozen image attachments.",
      },
      {
        title: "Signed paperwork",
        body: "Signed a contract on paper? Photograph each page, rotate any that came out sideways and save them as a single document named after the contract.",
      },
      {
        title: "Class notes or whiteboards",
        body: "Collect photos of notes or whiteboard sessions into one PDF per lesson. Shrinking keeps a 30-page document small enough to share in chat or by email.",
      },
    ],
    about: {
      title: "What happens to your photos",
      paragraphs: [
        "Pages follow the order of the thumbnails: drag them or use the arrow buttons to rearrange, and the rotate button turns a photo 90° clockwise. Each photo becomes one page. On A4 or US Letter pages the photo is scaled to fit inside the margins and centered, and with “Auto” orientation landscape photos get landscape pages. “Fit to image” makes each page exactly the size of its photo.",
        "Phone photos are often 3–8 MB each, which adds up quickly in a PDF. With “Shrink images for a smaller PDF” on, each photo is scaled down to at most 2000 pixels on its long edge and saved as JPG at quality 80 before it’s placed on the page. That is still sharp enough to read text on an A4 page while usually cutting the PDF size by a large factor. Turn it off to embed the photos at full resolution — unrotated JPGs and PNGs are then embedded without re-compression.",
        "The PDF is built in your browser with the same engine as the JPG to PDF tool. When it’s ready you can download it or continue with Merge PDF, Organize PDF or Split PDF without uploading it again.",
      ],
    },
    limits: [
      "Accepts JPG, PNG, WebP, GIF, BMP and AVIF photos, up to 100 per document and 50 MB each.",
      "Text in the photos stays an image: there is no OCR, so the PDF isn’t searchable or selectable.",
      "No automatic page detection or perspective correction — crop photos first if they show a lot of table or background.",
      "With shrinking on, PNG images are converted to JPG, so transparent areas become white.",
      "Very large photos can exceed the canvas limit on iPhone and iPad (about 16.7 megapixels).",
    ],
    faq: [
      {
        q: "How big will my PDF be?",
        a: "With shrinking on, a page made from a typical phone photo is usually a few hundred kilobytes, depending on how much detail it has. Without shrinking, each page is about as large as the original photo.",
      },
      {
        q: "Can I combine the result with existing PDFs?",
        a: "Yes. On the result screen choose “Merge PDF” under “Continue with” and add your other PDFs there.",
      },
      {
        q: "Is the text in the PDF searchable?",
        a: "No. The photos are placed as images; Intera Tools doesn’t perform text recognition (OCR).",
      },
      {
        q: "Are my documents uploaded?",
        a: "No. The photos are read and the PDF is created entirely in your browser, which matters for receipts and contracts with personal details.",
      },
    ],
  },
  ko: {
    name: "사진으로 PDF 문서 만들기",
    short: "사진 순서·방향을 정리하고 용량을 줄여 PDF 하나로",
    metaTitle: "사진 여러 장 PDF 하나로 – 순서·회전·용량 줄이기",
    metaDescription:
      "영수증, 서류, 필기 사진을 PDF 하나로 묶습니다. 순서를 바꾸고 회전하고, A4·레터 용지를 고르고, 큰 사진은 줄여 PDF 용량을 작게 유지합니다. 무료이며 업로드가 없습니다.",
    h1: "사진으로 PDF 문서 만들기",
    lead: "휴대폰으로 찍은 영수증, 신청서, 필기, 서명한 서류 사진을 올바른 순서와 방향으로 정리해 메일로 보내기 좋은 PDF 하나로 만듭니다.",
    stepLabels: ["사진 추가", "순서·회전 정리", "PDF 만들기", "내려받기"],
    useCases: [
      {
        title: "경비 영수증 정리",
        body: "일주일 치 영수증을 찍어 넣고 날짜순으로 정렬하면, 이미지 첨부 열 몇 개 대신 A4 PDF 한 개로 회계 담당자에게 보낼 수 있습니다.",
      },
      {
        title: "서명한 서류 제출",
        body: "종이로 계약서에 서명했다면 페이지마다 사진을 찍고, 옆으로 누운 사진은 회전한 뒤 계약서 이름을 붙인 문서 하나로 저장하세요.",
      },
      {
        title: "수업 필기·화이트보드",
        body: "필기나 화이트보드 사진을 수업마다 PDF 하나로 모읍니다. 이미지 축소를 켜면 30쪽짜리 문서도 메신저나 메일로 보내기 좋은 용량이 됩니다.",
      },
    ],
    about: {
      title: "사진은 이렇게 처리됩니다",
      paragraphs: [
        "페이지는 썸네일 순서를 따릅니다. 끌어서 옮기거나 화살표 버튼으로 순서를 바꾸고, 회전 버튼을 누르면 시계 방향으로 90°씩 돌아갑니다. 사진 한 장이 한 페이지가 됩니다. A4나 US Letter 용지에서는 사진이 여백 안에 들어가도록 줄어 가운데에 놓이고, 방향을 ‘자동’으로 두면 가로 사진에는 가로 페이지가 쓰입니다. ‘이미지에 맞춤’은 페이지 크기를 사진 크기와 똑같이 만듭니다.",
        "휴대폰 사진은 한 장에 3~8MB인 경우가 많아 PDF로 묶으면 금세 커집니다. ‘PDF 용량을 줄이도록 이미지 축소’를 켜면 각 사진의 긴 변을 최대 2000px로 줄이고 품질 80의 JPG로 저장한 뒤 페이지에 넣습니다. A4 한 쪽에서 글자를 읽기에는 충분히 선명하면서 PDF 용량은 크게 줄어드는 경우가 대부분입니다. 원본 해상도 그대로 넣으려면 끄세요. 이때 회전하지 않은 JPG와 PNG는 다시 압축하지 않고 그대로 들어갑니다.",
        "PDF는 JPG를 PDF로 변환 도구와 같은 엔진으로 브라우저에서 만들어집니다. 완성되면 내려받거나, 다시 올릴 필요 없이 PDF 합치기·PDF 페이지 정리·PDF 분할로 이어서 작업할 수 있습니다.",
      ],
    },
    limits: [
      "JPG, PNG, WebP, GIF, BMP, AVIF 사진을 문서 하나에 최대 100장, 장당 50MB까지 넣을 수 있습니다.",
      "사진 속 글자는 이미지 그대로입니다. 문자 인식(OCR)을 하지 않으므로 PDF에서 검색하거나 선택할 수 없습니다.",
      "문서 테두리 자동 인식이나 원근 보정은 없습니다. 책상이나 배경이 많이 찍혔다면 먼저 사진을 잘라 주세요.",
      "이미지 축소를 켜면 PNG도 JPG로 바뀌므로 투명한 부분은 흰색이 됩니다.",
      "아주 큰 사진은 iPhone·iPad의 캔버스 한도(약 1,670만 화소)를 넘을 수 있습니다.",
    ],
    faq: [
      {
        q: "PDF 용량은 얼마나 되나요?",
        a: "이미지 축소를 켜면 일반적인 휴대폰 사진 한 장으로 만든 페이지는 사진의 디테일에 따라 대개 수백 KB 정도입니다. 축소를 끄면 페이지마다 원본 사진과 비슷한 용량이 됩니다.",
      },
      {
        q: "만든 PDF를 다른 PDF와 합칠 수 있나요?",
        a: "네. 결과 화면의 ‘이어서 작업하기’에서 PDF 합치기를 고른 뒤 다른 PDF를 추가하면 됩니다.",
      },
      {
        q: "PDF 안의 글자를 검색할 수 있나요?",
        a: "아니요. 사진은 이미지로 들어가며, Intera Tools는 문자 인식(OCR)을 하지 않습니다.",
      },
      {
        q: "서류가 업로드되나요?",
        a: "아니요. 사진을 읽고 PDF를 만드는 과정이 모두 브라우저 안에서 이루어집니다. 개인정보가 담긴 영수증이나 계약서에는 특히 중요한 점입니다.",
      },
    ],
  },
};

export default content;
