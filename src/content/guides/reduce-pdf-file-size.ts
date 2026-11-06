import type { Locale } from "../../i18n/config";
import type { GuideContent } from "../types";

const guide: Record<Locale, GuideContent> = {
  en: {
    title: "PDF Too Large to Upload or Send? Find the Cause, Then Fix It",
    metaTitle: "PDF Too Large to Upload? Causes and Honest Fixes",
    metaDescription:
      "Why PDFs get big (full-size photos, scanned pages, extra pages) and what actually shrinks them: rebuild from smaller photos, drop pages, or re-render scans.",
    summary:
      "A PDF that won't fit an upload form or an email is almost always big for one of a few reasons: it holds full-resolution photos, every page is a high-resolution scan, or it simply contains pages nobody needs. Each cause has a different fix. This guide shows how to tell which one you have, what Intera Tools can and can't do about it (there is no one-click PDF compressor here), and which other tools offer real compression.",
    takeaways: [
      "Images are usually what makes a PDF large. Text and vector graphics take up very little space by comparison.",
      "Intera Tools has no PDF compressor. It can rebuild a PDF from photos with downscaling, remove pages, and re-render scanned pages at a lower resolution.",
      "Five high-resolution photos became a 33.8 MB PDF as they were, and 1.55 MB with the Photos to PDF Document workflow's shrink option on.",
      "Turning pages into JPGs and back makes text unselectable and does not shrink a normal text PDF. Use it only for scans that are images already.",
      "macOS Preview and Adobe Acrobat have built-in options that compress the images inside an existing PDF.",
    ],
    body: [
      { type: "h2", text: "Why some PDFs are huge" },
      {
        type: "p",
        text: "A PDF is a container. Text is stored as characters plus the fonts needed to draw them, and drawings are stored as lines and curves, so a 20-page report exported from a word processor is usually small. Images are different: they are stored as pixel data, and a PDF keeps whatever pixels you give it. Three things inflate a PDF in practice.",
      },
      {
        type: "ul",
        items: [
          "**Full-resolution photos.** A modern phone or camera photo has 12 megapixels or more. Placed on an A4 page, it carries far more pixels than a screen or a printer needs, and the PDF stores all of them. When we built a PDF from five high-resolution camera photos (10.6–19.3 megapixels, 3.7–9.7 MB each), the result was **33.8 MB**.",
          "**Scanned pages.** A scanner or scanning app turns every page into a picture, including pages that are only text. The higher the scan resolution and the more color in it, the larger each page gets.",
          "**Embedded fonts and extra objects.** PDFs embed fonts so the document looks the same everywhere. This is rarely the main cause, but documents using many fonts, or large character sets such as Korean, Chinese or Japanese, add some weight. Attachments, form data and edit history inside the file can also add size.",
        ],
      },
      {
        type: "p",
        text: "A quick test tells you which case you are in: open the PDF and try to select a sentence or search for a word. If you can, the text is real text and the weight is probably in the pictures. If nothing can be selected anywhere, the pages are images, which is typical of scans.",
      },

      { type: "h2", text: "Pick the fix that matches the cause" },
      {
        type: "table",
        caption: "Start with the first row that applies; the fixes can be combined",
        head: ["Cause", "How to recognize it", "Best fix"],
        rows: [
          ["You built the PDF from phone or camera photos", "The PDF is about as large as the photos added together", "Rebuild it with the [Photos to PDF Document](/workflows/images-to-pdf-document) workflow with **Shrink images for a smaller PDF** on"],
          ["The PDF contains pages you don't need to send", "Appendices, blank pages, duplicate scans, a whole manual when one section is asked for", "Delete pages with [Organize PDF](/organize-pdf), or keep only the needed ones with [Split PDF](/split-pdf)"],
          ["Every page is a high-resolution scan", "No text can be selected; each page is a picture", "Rescan at a lower resolution if you can; otherwise re-render with [PDF to JPG](/pdf-to-jpg) at 150 DPI and rebuild with [JPG to PDF](/jpg-to-pdf)"],
          ["A text document contains large photos", "Text is selectable, but the file is many MB", "Shrink the photos in the source document and export again, or compress the images with macOS Preview or Adobe Acrobat"],
          ["You only need a smaller copy of an existing PDF and none of the above fits", "Mixed content, forms, many fonts", "Use a dedicated PDF compressor such as Preview's **Reduce File Size** filter or Acrobat's compression; Intera Tools doesn't have one"],
        ],
      },
      {
        type: "note",
        tone: "warning",
        title: "What Intera Tools does not do",
        text: "There is no “compress PDF” tool on this site. [Merge PDF](/merge-pdf), [Organize PDF](/organize-pdf), [Split PDF](/split-pdf) and Rotate PDF copy pages as they are, without re-compressing images, so a page keeps the same weight it had in the original file. They make a PDF smaller only by leaving pages out.",
      },

      { type: "h2", text: "Fix 1: rebuild a photo PDF with smaller images" },
      {
        type: "p",
        text: "If the PDF is a set of photos (receipts, signed forms, handwritten notes, damage photos), the best result comes from rebuilding it from the original photos rather than trying to squeeze the finished PDF. In the [Photos to PDF Document](/workflows/images-to-pdf-document) workflow, **Shrink images for a smaller PDF** is on by default. It scales each photo down to at most **2000 px on the long edge** and saves it as JPG at **quality 80** before placing it on the page.",
      },
      {
        type: "table",
        caption: "Five high-resolution camera photos on A4 pages, measured on 2026-11-06 in Chrome on macOS",
        head: ["How the PDF was made", "PDF size"],
        rows: [
          ["JPG to PDF (photos embedded unchanged)", "33.8 MB"],
          ["Photos to PDF Document, shrink off", "33.8 MB"],
          ["Photos to PDF Document, shrink on", "1.55 MB"],
        ],
      },
      {
        type: "p",
        text: "2000 px across the long side of an A4 page works out to about 170 pixels per inch, which is plenty for reading on screen and acceptable for an office printout. If the PDF will be printed large or someone needs to zoom into fine detail, keep the originals and send them another way. Our [print resolution guide](/guides/print-resolution-dpi) explains how many pixels a print really needs.",
      },
      {
        type: "workflow",
        slug: "images-to-pdf-document",
        text: "Rebuild a photo PDF in one pass: set the page order, rotate pages, choose A4, and shrink each photo so the PDF stays small.",
      },

      { type: "h2", text: "Fix 2: send only the pages that matter" },
      {
        type: "p",
        text: "Upload forms often ask for one document, not a whole bundle. Removing pages is lossless: the remaining pages are copied exactly, with selectable text and untouched images.",
      },
      {
        type: "steps",
        items: [
          { title: "Delete a few pages", body: "Open the PDF in [Organize PDF](/organize-pdf), use the delete button on each page you don't need, check the **pages in the new PDF** count, then choose **Save PDF**." },
          { title: "Keep only a few pages", body: "In [Split PDF](/split-pdf), choose **Select pages**, click the pages you want, pick **One PDF with the selected pages** and run **Split PDF**. To type page numbers instead, use **Ranges** (for example `1-3, 7`) with **Merge all ranges into one PDF** on." },
          { title: "Check the new size", body: "The file shrinks by roughly what the removed pages contained on their own. Fonts or images that the remaining pages also use stay in the file, so deleting text pages saves much less than deleting photo pages." },
        ],
      },
      {
        type: "p",
        text: "Our guide to [extracting pages from a PDF](/guides/extract-pages-from-pdf) covers range syntax and what carries over in more detail.",
      },

      { type: "h2", text: "Fix 3: re-render image-only scans at a lower resolution" },
      {
        type: "p",
        text: "When every page is a scan and rescanning isn't possible, you can turn the pages into JPGs at a modest resolution and put them back into a PDF. This is a last resort with real costs: the result has **no selectable or searchable text** (Intera Tools doesn't do OCR), links and bookmarks are gone, and a document that had real text becomes larger, not smaller. Only use it on PDFs whose pages are pictures already.",
      },
      {
        type: "p",
        text: "The resolution you choose decides both size and legibility. We converted one text-heavy A4 page and one photo page with [PDF to JPG](/pdf-to-jpg):",
      },
      {
        type: "table",
        caption: "One A4 page rendered to JPG at each resolution, measured on 2026-11-06",
        head: ["Resolution", "Pixel size", "Text-heavy page", "Photo page"],
        rows: [
          ["72 DPI · small", "595 × 841", "159 KB", "86 KB"],
          ["150 DPI · standard", "1240 × 1753", "500 KB", "349 KB"],
          ["300 DPI · print", "2480 × 3507", "1.26 MB", "1.25 MB"],
        ],
      },
      {
        type: "p",
        text: "At 72 DPI small print becomes hard to read; at 300 DPI each page costs over a megabyte. **150 DPI** is the usual compromise for documents that will be read on screen, so a 10-page scan comes to roughly 3.5–5 MB. If the scanned PDF is currently several megabytes per page, that is a real saving; if it is already a few hundred KB per page, this route won't help.",
      },
      {
        type: "steps",
        items: [
          { title: "Render the pages", body: "In [PDF to JPG](/pdf-to-jpg), choose **JPG**, **150 DPI · standard** and **All pages**, then **Convert to images**. Files are named `name-page-01.jpg`, `name-page-02.jpg` and so on." },
          { title: "Rebuild the PDF", body: "On the result screen, choose **JPG to PDF** under **Continue with** — the images move over without downloading. (Or download the ZIP, unzip it and add the images to [JPG to PDF](/jpg-to-pdf).) Check that the thumbnails are in page order, set **Page size** to **A4** (or **US Letter** if the original was Letter), **Margin** to **None** and **One PDF with all images**, then **Convert to PDF**." },
          { title: "Compare before you replace", body: "JPG to PDF embeds the JPGs without compressing them again, so the PDF ends up about the size of the images combined. Open it, zoom into the smallest text, and keep the original until you are sure the copy is readable." },
        ],
      },

      { type: "h2", text: "Other tools that compress an existing PDF" },
      {
        type: "p",
        text: "When you need to shrink a PDF as it is, keeping selectable text, a real PDF compressor is the right tool. Two widely available options:",
      },
      {
        type: "ul",
        items: [
          "**Preview on a Mac:** open the PDF, choose **File → Export**, select **Reduce File Size** in the **Quartz Filter** menu and save. Apple notes that the compressed PDF may be of lower quality than the original, so save it under a new name and compare.",
          "**Adobe Acrobat:** Adobe documents a **Compress a PDF** feature, with **Advanced Optimization** for choosing how images and fonts are handled. Menu names vary between Acrobat versions.",
          "**The app that made the PDF:** exporting again with smaller images is often the cleanest fix. Microsoft's help for Office describes a **Minimum size (publishing online)** setting for when file size matters more than print quality.",
        ],
      },
    ],
    faq: [
      {
        q: "Can Intera Tools compress a PDF I already have?",
        a: "Not directly. There is no PDF compressor on the site. You can rebuild a photo PDF from the original photos with shrinking on, remove pages with Organize PDF or Split PDF, or re-render a scanned PDF at 150 DPI with PDF to JPG and JPG to PDF.",
      },
      {
        q: "Why didn't merging or splitting make my PDF smaller?",
        a: "Those tools copy pages exactly, without re-compressing images. A page weighs the same in the new file as in the old one, so the size only drops when pages are left out.",
      },
      {
        q: "Will converting my PDF to JPG and back reduce its size?",
        a: "Only for PDFs whose pages are already images, such as high-resolution scans. For a normal text PDF the result is usually larger, and the text can no longer be selected or searched in either case.",
      },
      {
        q: "Are my PDFs uploaded while I do this?",
        a: "No. Splitting, organizing, converting and building PDFs on Intera Tools happen in your browser, and the files are not sent to a server.",
      },
    ],
    sources: [
      { label: "Apple Support – Reduce the size of a PDF in Preview on Mac", url: "https://support.apple.com/guide/preview/reduce-the-size-of-a-pdf-prvw1509/mac" },
      { label: "Adobe – Optimizing and reducing PDF file size (Compress a PDF)", url: "https://www.adobe.com/learn/acrobat/web/compress-pdf" },
      { label: "Microsoft Support – Save or convert to PDF in Office desktop apps", url: "https://support.microsoft.com/en-us/office/save-or-convert-to-pdf-or-xps-in-office-desktop-apps-d85416c5-7d77-4fd6-a216-6f4bf7c7c110" },
    ],
  },

  ko: {
    title: "PDF 용량이 커서 업로드·전송이 안 될 때: 원인부터 찾고 줄이는 법",
    metaTitle: "PDF 용량 줄이기: 원인별 해결법",
    metaDescription:
      "PDF가 커지는 이유(원본 사진, 고해상도 스캔, 불필요한 페이지)와 실제로 효과가 있는 방법을 정리했습니다. 사진으로 다시 만들기, 페이지 빼기, 스캔본 다시 렌더링까지.",
    summary:
      "업로드 창이나 메일에 PDF가 들어가지 않는다면 이유는 대개 몇 가지로 좁혀집니다. 원본 해상도 사진이 그대로 들어 있거나, 모든 페이지가 고해상도 스캔 이미지이거나, 필요 없는 페이지까지 들어 있는 경우입니다. 원인마다 해결법이 다릅니다. 이 글에서는 내 PDF가 어느 경우인지 구분하는 법, Intera Tools로 할 수 있는 일과 할 수 없는 일(이 사이트에는 원클릭 PDF 압축 기능이 없습니다), 그리고 실제로 압축을 해 주는 다른 도구를 정리합니다.",
    takeaways: [
      "PDF 용량은 대부분 이미지에서 나옵니다. 글자와 도형은 이미지에 비하면 차지하는 용량이 아주 작습니다.",
      "Intera Tools에는 PDF 압축 도구가 없습니다. 사진을 줄여 PDF를 다시 만들거나, 페이지를 빼거나, 스캔 페이지를 낮은 해상도로 다시 렌더링하는 방법을 쓸 수 있습니다.",
      "고해상도 사진 5장을 그대로 넣은 PDF는 33.8MB, ‘사진으로 PDF 문서 만들기’에서 이미지 축소를 켜면 1.55MB였습니다.",
      "페이지를 JPG로 바꿨다가 다시 PDF로 만들면 글자를 선택할 수 없게 되고, 일반 문서 PDF는 오히려 커집니다. 이미 이미지로 된 스캔본에만 쓰세요.",
      "Mac의 미리보기와 Adobe Acrobat에는 기존 PDF 속 이미지를 압축하는 기능이 있습니다.",
    ],
    body: [
      { type: "h2", text: "PDF가 커지는 이유" },
      {
        type: "p",
        text: "PDF는 일종의 상자입니다. 글자는 문자와 그 문자를 그릴 글꼴로, 도형은 선과 곡선으로 저장되기 때문에 워드나 한글에서 내보낸 20쪽짜리 보고서는 보통 용량이 작습니다. 이미지는 다릅니다. 픽셀 데이터로 저장되고, PDF는 넣어 준 픽셀을 전부 그대로 보관합니다. 실제로 PDF를 키우는 원인은 크게 세 가지입니다.",
      },
      {
        type: "ul",
        items: [
          "**원본 해상도 사진.** 요즘 휴대폰·카메라 사진은 1,200만 화소가 넘습니다. A4 한 쪽에 넣으면 화면이나 프린터에 필요한 것보다 훨씬 많은 픽셀이 들어가고, PDF는 그 픽셀을 모두 저장합니다. 고해상도 카메라 사진 5장(1,060만~1,930만 화소, 장당 3.7~9.7MB)으로 PDF를 만들었더니 **33.8MB**가 나왔습니다.",
          "**스캔한 페이지.** 스캐너나 스캔 앱은 글자만 있는 페이지도 통째로 그림으로 만듭니다. 스캔 해상도가 높고 컬러일수록 페이지마다 용량이 커집니다.",
          "**포함된 글꼴과 기타 데이터.** PDF는 어디서 열어도 똑같이 보이도록 글꼴을 함께 넣습니다. 주된 원인인 경우는 드물지만, 글꼴을 많이 쓰거나 한글·한자처럼 글자 수가 많은 글꼴을 쓰면 용량이 늘어납니다. 첨부 파일, 입력 양식 데이터, 편집 기록이 들어 있어도 커질 수 있습니다.",
        ],
      },
      {
        type: "p",
        text: "어느 경우인지는 간단히 확인할 수 있습니다. PDF를 열고 문장을 드래그해 선택하거나 단어를 검색해 보세요. 된다면 글자는 진짜 텍스트이고 용량은 그림에서 나오는 것일 가능성이 큽니다. 어디에서도 선택이 안 된다면 페이지 자체가 이미지이며, 스캔본이 대표적입니다.",
      },

      { type: "h2", text: "원인에 맞는 해결법 고르기" },
      {
        type: "table",
        caption: "해당하는 첫 번째 줄부터 시작하세요. 여러 방법을 함께 써도 됩니다",
        head: ["원인", "알아보는 법", "가장 좋은 해결법"],
        rows: [
          ["휴대폰·카메라 사진으로 PDF를 만들었다", "PDF 용량이 넣은 사진 용량의 합과 비슷하다", "[사진으로 PDF 문서 만들기](/workflows/images-to-pdf-document)에서 **PDF 용량을 줄이도록 이미지 축소**를 켜고 다시 만들기"],
          ["보낼 필요 없는 페이지가 들어 있다", "부록, 빈 페이지, 중복 스캔, 일부만 필요한데 전체가 들어 있음", "[PDF 페이지 정리](/organize-pdf)로 페이지 삭제, 또는 [PDF 분할](/split-pdf)로 필요한 페이지만 추출"],
          ["모든 페이지가 고해상도 스캔이다", "글자가 전혀 선택되지 않고 페이지가 그림이다", "가능하면 낮은 해상도로 다시 스캔. 어렵다면 [PDF를 JPG로 변환](/pdf-to-jpg)에서 150 DPI로 바꾼 뒤 [JPG를 PDF로 변환](/jpg-to-pdf)으로 다시 만들기"],
          ["문서 안에 큰 사진이 들어 있다", "글자는 선택되는데 파일이 수 MB", "원본 문서에서 사진을 줄여 다시 내보내거나, Mac 미리보기·Adobe Acrobat으로 이미지 압축"],
          ["기존 PDF를 그대로 작게 만들어야 하고 위에 해당하지 않는다", "내용이 섞여 있음, 입력 양식, 글꼴이 많음", "미리보기의 **Reduce File Size** 필터나 Acrobat의 압축 기능 같은 PDF 압축 도구 사용. Intera Tools에는 없습니다"],
        ],
      },
      {
        type: "note",
        tone: "warning",
        title: "Intera Tools가 하지 않는 일",
        text: "이 사이트에는 ‘PDF 압축’ 도구가 없습니다. [PDF 합치기](/merge-pdf), [PDF 페이지 정리](/organize-pdf), [PDF 분할](/split-pdf), PDF 회전은 이미지를 다시 압축하지 않고 페이지를 그대로 복사하므로, 각 페이지의 용량은 원본과 같습니다. 이 도구들로 PDF가 작아지는 경우는 페이지를 뺄 때뿐입니다.",
      },

      { type: "h2", text: "방법 1: 사진 PDF는 작은 이미지로 다시 만들기" },
      {
        type: "p",
        text: "영수증, 서명한 서류, 필기, 파손 사진처럼 사진을 모은 PDF라면 완성된 PDF를 쥐어짜기보다 원본 사진으로 다시 만드는 편이 결과가 가장 좋습니다. [사진으로 PDF 문서 만들기](/workflows/images-to-pdf-document) 워크플로에서는 **PDF 용량을 줄이도록 이미지 축소**가 기본으로 켜져 있습니다. 각 사진의 긴 변을 **최대 2000px**로 줄이고 **품질 80**의 JPG로 저장한 뒤 페이지에 넣습니다.",
      },
      {
        type: "table",
        caption: "고해상도 카메라 사진 5장을 A4 페이지로, 2026-11-06 macOS Chrome에서 측정",
        head: ["만든 방법", "PDF 용량"],
        rows: [
          ["JPG를 PDF로 변환 (사진을 그대로 넣음)", "33.8MB"],
          ["사진으로 PDF 문서 만들기, 이미지 축소 끔", "33.8MB"],
          ["사진으로 PDF 문서 만들기, 이미지 축소 켬", "1.55MB"],
        ],
      },
      {
        type: "p",
        text: "A4 긴 변에 2000px이면 인치당 약 170픽셀로, 화면으로 읽기에는 충분하고 사무용 출력에도 무난합니다. 크게 인쇄하거나 세부를 확대해 봐야 하는 자료라면 원본을 다른 방법으로 보내세요. 인쇄에 실제로 몇 픽셀이 필요한지는 [인쇄 해상도 가이드](/guides/print-resolution-dpi)에 정리했습니다.",
      },
      {
        type: "workflow",
        slug: "images-to-pdf-document",
        text: "사진 PDF를 한 번에 다시 만듭니다. 페이지 순서와 방향을 정리하고, A4를 고르고, 사진을 줄여 PDF 용량을 작게 유지합니다.",
      },

      { type: "h2", text: "방법 2: 필요한 페이지만 보내기" },
      {
        type: "p",
        text: "제출 양식은 묶음 전체가 아니라 특정 서류 하나만 요구하는 경우가 많습니다. 페이지를 빼는 작업은 손실이 없습니다. 남은 페이지는 선택 가능한 글자와 이미지 그대로 정확히 복사됩니다.",
      },
      {
        type: "steps",
        items: [
          { title: "몇 페이지만 지울 때", body: "[PDF 페이지 정리](/organize-pdf)에서 PDF를 열고 필요 없는 페이지의 삭제 버튼을 누른 뒤, **새 PDF: N페이지** 표시를 확인하고 **PDF 저장**을 누릅니다." },
          { title: "몇 페이지만 남길 때", body: "[PDF 분할](/split-pdf)에서 **페이지 선택**을 고르고 원하는 페이지를 누른 다음 **선택한 페이지를 PDF 하나로**를 고르고 **PDF 분할하기**를 누릅니다. 번호로 입력하려면 **범위 지정**에서 `1-3, 7`처럼 쓰고 **모든 범위를 PDF 하나로 합치기**를 켜세요." },
          { title: "용량 확인", body: "파일은 대략 뺀 페이지가 단독으로 차지하던 만큼 줄어듭니다. 남은 페이지도 쓰는 글꼴이나 이미지는 그대로 남기 때문에, 글자 페이지를 지우면 사진 페이지를 지울 때보다 훨씬 적게 줄어듭니다." },
        ],
      },
      {
        type: "p",
        text: "범위 입력법과 무엇이 그대로 유지되는지는 [PDF에서 페이지 추출하기](/guides/extract-pages-from-pdf)에서 더 자세히 다룹니다.",
      },

      { type: "h2", text: "방법 3: 이미지뿐인 스캔본을 낮은 해상도로 다시 만들기" },
      {
        type: "p",
        text: "모든 페이지가 스캔 이미지이고 다시 스캔할 수 없다면, 페이지를 적당한 해상도의 JPG로 바꾼 뒤 다시 PDF로 묶을 수 있습니다. 대가가 분명한 최후의 방법입니다. 결과물에서는 **글자를 선택하거나 검색할 수 없고**(Intera Tools는 문자 인식(OCR)을 하지 않습니다), 링크와 책갈피도 사라지며, 원래 텍스트였던 문서는 오히려 커집니다. 이미 페이지가 그림으로 된 PDF에만 쓰세요.",
      },
      {
        type: "p",
        text: "어떤 해상도를 고르느냐가 용량과 가독성을 함께 결정합니다. 글자가 많은 A4 페이지와 사진 페이지를 각각 [PDF를 JPG로 변환](/pdf-to-jpg)으로 바꿔 본 결과입니다.",
      },
      {
        type: "table",
        caption: "A4 한 페이지를 해상도별 JPG로 변환, 2026-11-06 측정",
        head: ["해상도", "픽셀 크기", "글자 위주 페이지", "사진 페이지"],
        rows: [
          ["72 DPI · 작게", "595 × 841", "159KB", "86KB"],
          ["150 DPI · 표준", "1240 × 1753", "500KB", "349KB"],
          ["300 DPI · 인쇄용", "2480 × 3507", "1.26MB", "1.25MB"],
        ],
      },
      {
        type: "p",
        text: "72 DPI에서는 작은 글씨를 읽기 어렵고, 300 DPI에서는 페이지마다 1MB가 넘습니다. 화면으로 읽을 문서라면 **150 DPI**가 일반적인 타협점이며, 10쪽짜리 스캔본이면 대략 3.5~5MB가 됩니다. 지금 스캔본이 페이지당 몇 MB씩이라면 확실히 줄어들지만, 이미 페이지당 수백 KB라면 이 방법은 도움이 되지 않습니다.",
      },
      {
        type: "steps",
        items: [
          { title: "페이지를 이미지로 바꾸기", body: "[PDF를 JPG로 변환](/pdf-to-jpg)에서 **JPG**, **150 DPI · 표준**, **전체 페이지**를 고르고 **이미지로 변환**을 누릅니다. 파일 이름은 `이름-page-01.jpg`, `이름-page-02.jpg` 순으로 붙습니다." },
          { title: "PDF 다시 만들기", body: "결과 화면의 **이어서 작업하기**에서 **JPG를 PDF로 변환**을 고르면 이미지를 내려받지 않고 그대로 넘길 수 있습니다(또는 ZIP을 내려받아 압축을 풀고 [JPG를 PDF로 변환](/jpg-to-pdf)에 넣어도 됩니다). 썸네일이 페이지 순서대로인지 확인하고 **페이지 크기**는 **A4**(원본이 레터 용지면 **US Letter**), **여백**은 **없음**, **모든 이미지를 PDF 하나로**를 고른 뒤 **PDF로 변환**을 누릅니다." },
          { title: "바꾸기 전에 비교하기", body: "JPG를 PDF로 변환은 JPG를 다시 압축하지 않고 넣으므로 PDF 용량은 이미지 용량의 합과 비슷합니다. 결과를 열어 가장 작은 글씨까지 확대해 보고, 읽을 수 있다고 확인될 때까지 원본은 지우지 마세요." },
        ],
      },

      { type: "h2", text: "기존 PDF를 압축해 주는 다른 도구" },
      {
        type: "p",
        text: "글자를 선택 가능한 상태로 유지하면서 지금 있는 PDF를 그대로 줄이려면 PDF 압축 기능이 있는 도구가 맞습니다. 쉽게 쓸 수 있는 방법은 다음과 같습니다.",
      },
      {
        type: "ul",
        items: [
          "**Mac의 미리보기:** PDF를 열고 **파일 → 내보내기**에서 **Quartz 필터**를 **Reduce File Size**(파일 크기 줄이기)로 고른 뒤 저장합니다. Apple은 압축한 PDF의 품질이 원본보다 낮아질 수 있다고 안내하므로, 다른 이름으로 저장해 비교하세요.",
          "**Adobe Acrobat:** Adobe는 **Compress a PDF**(PDF 압축) 기능과, 이미지·글꼴 처리 방식을 고르는 **고급 최적화**를 안내합니다. 메뉴 이름은 Acrobat 버전마다 다릅니다.",
          "**PDF를 만든 원래 프로그램:** 이미지를 줄여 다시 내보내는 것이 가장 깔끔한 경우가 많습니다. Microsoft Office 도움말은 인쇄 품질보다 파일 크기가 중요할 때 쓰는 **최소 크기(온라인 게시)** 옵션을 안내합니다.",
        ],
      },
    ],
    faq: [
      {
        q: "이미 가지고 있는 PDF를 Intera Tools로 압축할 수 있나요?",
        a: "직접은 안 됩니다. PDF 압축 도구가 없습니다. 원본 사진으로 이미지 축소를 켜고 PDF를 다시 만들거나, PDF 페이지 정리·PDF 분할로 페이지를 빼거나, 스캔본이라면 PDF를 JPG로 변환(150 DPI)과 JPG를 PDF로 변환으로 다시 만드는 방법이 있습니다.",
      },
      {
        q: "합치거나 분할했는데 왜 용량이 그대로인가요?",
        a: "이 도구들은 이미지를 다시 압축하지 않고 페이지를 그대로 복사합니다. 페이지 하나의 용량이 새 파일에서도 같기 때문에, 페이지를 빼야만 용량이 줄어듭니다.",
      },
      {
        q: "PDF를 JPG로 바꿨다가 다시 PDF로 만들면 작아지나요?",
        a: "고해상도 스캔본처럼 페이지가 이미 이미지인 PDF에서만 그렇습니다. 일반 문서 PDF는 보통 더 커지고, 어느 경우든 글자를 선택하거나 검색할 수 없게 됩니다.",
      },
      {
        q: "작업하는 동안 PDF가 업로드되나요?",
        a: "아니요. Intera Tools의 PDF 분할, 페이지 정리, 변환, PDF 만들기는 모두 브라우저 안에서 처리되며 파일이 서버로 전송되지 않습니다.",
      },
    ],
    sources: [
      { label: "Apple 지원 – Mac의 미리보기에서 PDF 크기 줄이기", url: "https://support.apple.com/guide/preview/reduce-the-size-of-a-pdf-prvw1509/mac" },
      { label: "Adobe – PDF 최적화 및 파일 크기 줄이기(Compress a PDF)", url: "https://www.adobe.com/learn/acrobat/web/compress-pdf" },
      { label: "Microsoft 지원 – Office 데스크톱 앱에서 PDF로 저장 또는 변환", url: "https://support.microsoft.com/en-us/office/save-or-convert-to-pdf-or-xps-in-office-desktop-apps-d85416c5-7d77-4fd6-a216-6f4bf7c7c110" },
    ],
  },
};

export default guide;
