import type { Locale } from "../../i18n/config";
import type { GuideContent } from "../types";

const guide: Record<Locale, GuideContent> = {
  en: {
    title: "A PDF won’t open, merge or split: what each error means and how to fix it",
    metaTitle: "PDF Won’t Open, Merge or Split? Fixes for Each Error",
    metaDescription:
      "Why a PDF fails in Intera Tools and what to do: password-protected and damaged files, page range errors, large PDFs on phones, scanned PDFs and merge minimums.",
    summary:
      "Intera Tools handles PDFs in your browser with two engines. One draws page previews and images, and the other copies pages into the new file. When a file can’t be processed you get a specific message. Find yours below to see the cause and the fix, which usually takes a minute or two.",
    takeaways: [
      "Password-protected PDFs aren’t supported. That includes files that open freely but restrict printing or editing. If the document is yours, remove the protection in the app that set it.",
      "“This PDF looks damaged” usually means an incomplete download or a file that isn’t really a PDF. Download it again, or save a fresh copy from a viewer.",
      "Page ranges are numbers and dashes separated by commas, such as `1-3, 5, 8-`, all within the page count.",
      "Scanned PDFs merge and split normally, but their text is a picture. Intera Tools doesn’t do OCR.",
    ],
    body: [
      { type: "h2", text: "Quick diagnosis" },
      {
        type: "table",
        caption: "Match the message you see to its cause",
        head: ["Message or symptom", "Most likely cause", "What to do"],
        rows: [
          ["This PDF is password-protected…", "An open password or a permissions (owner) password", "Remove it in the original app or Acrobat, or ask the sender"],
          ["This PDF looks damaged or isn’t a valid PDF file.", "Incomplete download, broken file, or an image or web page named .pdf", "Download again, re-save from a viewer, check the real file type"],
          ["Add at least two PDF files to merge.", "Fewer than two usable files, often because one card shows an error", "Fix or remove the file with the red message"],
          ["Check the page range — use numbers like 1-3, 5 within 1–N.", "Typo, page 0, a page past the end, or a reversed range", "Use the syntax below"],
          ["No pages selected.", "Select pages mode with nothing selected", "Click the pages you want"],
          ["File is larger than 200 MB. / Only 50 files can be added at once.", "Per-file or per-batch limit", "Work in stages"],
          ["Your device ran out of memory…", "Big files, or 300 DPI rendering on a phone", "Fewer files, lower DPI, or a computer"],
          ["Text can’t be selected in the result", "A scanned PDF (pages are images)", "Needs OCR software"],
        ],
      },

      { type: "h2", text: "“This PDF is password-protected. Remove the password first, then try again.”" },
      {
        type: "p",
        text: "PDFs can have two kinds of password. A **document open password** (user password) is needed to view the file at all. A **permissions password** (owner password) lets anyone open the file but restricts printing, copying or editing. Both encrypt the file, and the engine Intera Tools uses to build new PDFs can’t work with encrypted files. With an open password, the message appears as soon as you add the file. With only a permissions password, the page previews may look normal, and the message appears when you click **Merge PDF**, **Split PDF**, **Save rotated PDF** or **Save PDF**.",
      },
      {
        type: "p",
        text: "If the document is yours, or you’re allowed to edit it, and you know the password, make an unprotected copy first:",
      },
      {
        type: "steps",
        items: [
          { title: "Go back to the source", body: "Export the PDF again from the app that created it (Word, a scanning app, accounting software) without a password, or ask the sender for an unprotected copy." },
          { title: "Remove security in Acrobat", body: "In paid Adobe Acrobat (not the free Reader), open the document's security settings and remove the password protection. Menu names differ between Acrobat versions, and you need to enter the permissions password to remove it." },
          { title: "Print to a new PDF", body: "Open the file with its password in a viewer such as Chrome, then choose Print → Save as PDF (on Windows, Microsoft Print to PDF). This only works if the document allows printing. Links, bookmarks and form fields can be lost, so check the copy before deleting the original." },
        ],
      },
      {
        type: "note",
        tone: "warning",
        text: "Intera Tools doesn’t remove or crack passwords. If you don’t know the password, or the file isn’t yours, ask the owner for an unprotected version. Don’t try to get around the protection.",
      },

      { type: "h2", text: "“This PDF looks damaged or isn’t a valid PDF file.”" },
      {
        type: "p",
        text: "The engines couldn’t read the file’s structure, either when you added it or while the new file was being built. The usual causes:",
      },
      {
        type: "ul",
        items: [
          "**An incomplete download or attachment.** A PDF keeps the index of its contents near the end, so a file cut off part-way often can’t be read. Download it again and compare its size with the source.",
          "**Not actually a PDF.** A photo or web page saved with a `.pdf` name passes the type check, then fails here. If it opens in an image viewer, rename it back to `.jpg` or `.png` and use [JPG to PDF](/jpg-to-pdf).",
          "**Structural errors from the app that made it.** Some files open in a forgiving viewer but fail when a new file is built. Open the file in Chrome, Edge, Acrobat or Preview, write a clean copy with Print → Save as PDF, and use that copy.",
        ],
      },
      {
        type: "p",
        text: "**“The file is empty.”** means 0 bytes, almost always from a download or sync that didn’t finish.",
      },

      { type: "h2", text: "“Add at least two PDF files to merge.”" },
      {
        type: "p",
        text: "[Merge PDF](/merge-pdf) needs two or more PDFs it can read. Files whose card shows a password or damage message don’t count. If you added two files and still see this, find the card with red text and fix or replace that file. To include photos or image scans, turn them into a PDF with [JPG to PDF](/jpg-to-pdf) first. To combine files and reorder individual pages in one step, use [Organize PDF](/organize-pdf), which also accepts several PDFs.",
      },
      { type: "tool", slug: "merge-pdf", text: "Combine PDFs in any order. Pages are copied as they are, without re-rendering." },

      { type: "h2", text: "“Check the page range — use numbers like 1-3, 5 within 1–N.”" },
      {
        type: "p",
        text: "In [Split PDF](/split-pdf) (**Ranges** mode) and [PDF to JPG](/pdf-to-jpg) (**Custom** pages), you type page numbers. N is the document’s page count.",
      },
      {
        type: "table",
        head: ["You type", "Meaning"],
        rows: [
          ["`5`", "Page 5 only"],
          ["`1-3`", "Pages 1, 2 and 3"],
          ["`8-`", "Page 8 to the last page"],
          ["`-4`", "First page to page 4"],
          ["`1-3, 5, 8-10`", "Several ranges, separated by commas"],
        ],
      },
      {
        type: "p",
        text: "The message appears for page 0, a page past the end, a reversed range like `5-3`, or text such as `p2` or `1-3-5`. In Split PDF, each comma-separated range becomes its own file unless you tick **Merge all ranges into one PDF**. In **Select pages** mode, **“No pages selected.”** just means you haven’t clicked a page yet.",
      },
      { type: "tool", slug: "split-pdf", text: "Extract page ranges, chosen pages or every N pages into new PDFs." },

      { type: "h2", text: "Large PDFs and “Your device ran out of memory”" },
      {
        type: "p",
        text: "PDF tools accept up to 50 files of up to 200 MB each. Split, Rotate and PDF to JPG take one file at a time. The browser holds the files in memory while it works, often in more than one copy, and phones give a tab far less memory than computers. If a big job fails with **“Your device ran out of memory. Try fewer or smaller files.”**, or the tab reloads, work in stages: merge ten files, then merge the results. Close other tabs, or use a computer for very large documents.",
      },
      {
        type: "p",
        text: "Turning pages into images takes even more memory. In PDF to JPG, an A4 page at **300 DPI · print** is 2480 × 3508 pixels, about 8.7 MP or roughly 35 MB of raw pixels while it’s drawn. Pages are rendered one at a time, but choosing 300 DPI for more than 10 pages shows the hint “300 DPI on many pages can use a lot of memory on phones.” On iPhone and iPad, one image is limited to about 16.7 MP, so an A3 page at 300 DPI (about 17.4 MP) fails with “The image is too large for this device”. **150 DPI · standard** is plenty for screens and sharing.",
      },

      { type: "h2", text: "Scanned PDFs: pages work, text doesn’t" },
      {
        type: "p",
        text: "Scanners and scanning apps usually store each page as a photo inside the PDF. Intera Tools merges, splits, rotates and reorders those pages like any others, copying them without recompression. It doesn’t turn the picture of text into real text, though. There’s no OCR, so text in the result still can’t be selected or searched. For that, use a scanning app or desktop PDF software with text recognition. Fix sideways scans with [Rotate PDF](/rotate-pdf), and see [how to extract pages from a PDF](/guides/extract-pages-from-pdf) for pulling pages out.",
      },
    ],
    faq: [
      {
        q: "The PDF opens in my viewer without a password. Why does Intera Tools say it’s password-protected?",
        a: "It probably has a permissions (owner) password. That doesn’t stop viewing, but the file is still encrypted, so it can’t be edited here. If the document is yours, remove the security in the app that set it, or print it to a new PDF if printing is allowed.",
      },
      {
        q: "Can Intera Tools unlock a PDF if I forgot the password?",
        a: "No. Intera Tools doesn’t remove or recover passwords. Ask whoever created the file for an unprotected copy, or export it again from the original source.",
      },
      {
        q: "Will merging or splitting reduce the quality of my pages?",
        a: "No. Merge, Split, Rotate and Organize copy pages into the new PDF without re-rendering them, so text stays text and images aren’t recompressed. Only PDF to JPG turns pages into pictures.",
      },
    ],
    sources: [
      { label: "Adobe Acrobat Help: Remove passwords from PDFs", url: "https://helpx.adobe.com/acrobat/desktop/protect-documents/protect-with-passwords/remove-passwords-from-pdfs.html" },
      { label: "pdf-lib: encryption handling (README)", url: "https://github.com/Hopding/pdf-lib#encryption-handling" },
    ],
  },

  ko: {
    title: "PDF가 열리지 않거나 합치기·분할이 안 될 때: 오류 메시지별 원인과 해결법",
    metaTitle: "PDF가 안 열리거나 합치기가 안 될 때 해결법",
    metaDescription:
      "비밀번호가 걸린 PDF, 손상된 파일, 페이지 범위 오류, 휴대폰 메모리 부족, 스캔 PDF까지 Intera Tools에서 PDF가 처리되지 않는 원인과 해결 방법을 메시지별로 정리했습니다.",
    summary:
      "Intera Tools는 브라우저 안에서 두 가지 엔진으로 PDF를 다룹니다. 하나는 미리보기와 이미지 변환을 위해 페이지를 그리고, 다른 하나는 새 파일에 페이지를 복사합니다. 처리할 수 없는 파일이면 구체적인 메시지가 표시되니, 아래에서 같은 문구를 찾아 원인을 확인하세요. 대부분 1–2분이면 해결됩니다.",
    takeaways: [
      "비밀번호가 걸린 PDF는 지원하지 않습니다. 열 때는 비밀번호가 필요 없지만 인쇄·편집을 제한한 파일도 마찬가지입니다. 본인 문서라면 보호를 설정한 프로그램에서 먼저 해제하세요.",
      "‘손상되었거나 올바른 PDF 파일이 아닙니다’는 대개 다운로드가 덜 됐거나 실제로는 PDF가 아닌 파일입니다. 다시 받거나 뷰어에서 새로 저장해 보세요.",
      "페이지 범위는 `1-3, 5, 8-`처럼 쉼표로 구분해 입력하며, 전체 페이지 수 안에 있어야 합니다.",
      "스캔한 PDF도 합치기·분할은 정상적으로 됩니다. 다만 글자가 그림이라 선택되지 않고, Intera Tools는 OCR(문자 인식)을 하지 않습니다.",
    ],
    body: [
      { type: "h2", text: "빠른 진단표" },
      {
        type: "table",
        caption: "화면에 나온 메시지로 원인 찾기",
        head: ["메시지·증상", "가장 흔한 원인", "해결 방법"],
        rows: [
          ["비밀번호로 보호된 PDF입니다…", "열기 비밀번호 또는 권한(소유자) 비밀번호", "원래 프로그램이나 Acrobat에서 해제, 또는 보낸 사람에게 요청"],
          ["손상되었거나 올바른 PDF 파일이 아닙니다.", "다운로드 미완료, 깨진 파일, 이름만 .pdf인 이미지·웹페이지", "다시 받기, 뷰어에서 새로 저장, 실제 형식 확인"],
          ["합치려면 PDF 파일을 2개 이상 추가해 주세요.", "쓸 수 있는 파일이 2개 미만(대개 한 파일에 오류 표시)", "빨간 메시지가 있는 파일을 고치거나 빼기"],
          ["페이지 범위를 확인해 주세요…", "오타, 0페이지, 마지막 페이지 초과, 거꾸로 된 범위", "아래 입력 규칙 참고"],
          ["선택한 페이지가 없습니다.", "페이지 선택 방식에서 아무것도 고르지 않음", "원하는 페이지 클릭"],
          ["파일이 200 MB보다 큽니다. / 한 번에 50개까지 추가할 수 있습니다.", "파일당 용량 또는 개수 제한", "여러 번에 나눠 작업"],
          ["기기 메모리가 부족합니다…", "휴대폰에서 큰 파일이나 300 DPI 변환", "파일 수·DPI 줄이기, 또는 PC 이용"],
          ["결과물에서 글자가 선택되지 않음", "스캔 PDF(페이지가 이미지)", "OCR 프로그램 필요"],
        ],
      },

      { type: "h2", text: "“비밀번호로 보호된 PDF입니다. 비밀번호를 해제한 뒤 다시 시도해 주세요.”" },
      {
        type: "p",
        text: "PDF 비밀번호에는 두 종류가 있습니다. **열기 비밀번호**(사용자 비밀번호)는 파일을 보려면 반드시 입력해야 하고, **권한 비밀번호**(소유자 비밀번호)는 누구나 열 수 있게 두되 인쇄, 복사, 편집을 제한합니다. 둘 다 파일을 암호화하는데, Intera Tools가 새 PDF를 만들 때 쓰는 엔진은 암호화된 파일을 다루지 못합니다. 열기 비밀번호가 걸린 파일은 추가하자마자 이 메시지가 나옵니다. 권한 비밀번호만 걸린 파일은 미리보기가 정상적으로 보이다가 **PDF 합치기**, **PDF 분할하기**, **회전한 PDF 저장**, **PDF 저장** 버튼을 누를 때 메시지가 나올 수 있습니다.",
      },
      {
        type: "p",
        text: "본인 문서이거나 편집 권한이 있고 비밀번호를 알고 있다면, 먼저 보호가 없는 사본을 만드세요.",
      },
      {
        type: "steps",
        items: [
          { title: "원본에서 다시 저장하기", body: "문서를 만든 프로그램(워드, 한글, 스캔 앱, 회계 프로그램 등)에서 비밀번호 없이 PDF로 다시 내보내거나, 보낸 사람에게 비밀번호가 없는 파일을 요청합니다." },
          { title: "Acrobat에서 보안 제거하기", body: "유료 Adobe Acrobat(무료 Reader는 불가)에서 문서의 보안 설정을 열어 비밀번호 보호를 해제합니다. 메뉴 이름은 Acrobat 버전마다 다르며, 권한 비밀번호가 걸려 있다면 입력해야 해제됩니다." },
          { title: "새 PDF로 인쇄하기", body: "Chrome 같은 뷰어에서 비밀번호를 입력해 파일을 연 뒤 인쇄 → PDF로 저장(Windows는 Microsoft Print to PDF)을 고릅니다. 문서가 인쇄를 허용할 때만 가능하며, 링크·책갈피·입력 양식이 사라질 수 있으니 원본을 지우기 전에 결과를 확인하세요." },
        ],
      },
      {
        type: "note",
        tone: "warning",
        text: "Intera Tools는 비밀번호를 해제하거나 풀어 주지 않습니다. 비밀번호를 모르거나 다른 사람의 문서라면 보호를 우회하려 하지 말고, 문서 소유자에게 보호가 없는 사본을 요청하세요.",
      },

      { type: "h2", text: "“손상되었거나 올바른 PDF 파일이 아닙니다.”" },
      {
        type: "p",
        text: "파일을 추가할 때나 새 파일을 만들 때 엔진이 파일 구조를 해석하지 못한 경우입니다. 흔한 원인은 다음과 같습니다.",
      },
      {
        type: "ul",
        items: [
          "**다운로드나 첨부 파일이 끝까지 받아지지 않음.** PDF는 파일 끝부분에 내용의 목차를 담고 있어서 중간에 끊긴 파일은 읽지 못하는 경우가 많습니다. 다시 받은 뒤 원본과 용량을 비교해 보세요.",
          "**실제로는 PDF가 아님.** 사진이나 웹페이지가 `.pdf` 이름으로 저장되면 형식 확인은 통과하지만 여기서 실패합니다. 이미지 뷰어에서 열린다면 확장자를 `.jpg`나 `.png`로 되돌린 뒤 [JPG를 PDF로 변환](/jpg-to-pdf)을 이용하세요.",
          "**만든 프로그램 때문에 구조에 오류가 있음.** 관대한 뷰어에서는 열려도 새 파일을 만들 때 실패할 수 있습니다. Chrome, Edge, Acrobat, 미리보기(Mac)에서 연 뒤 인쇄 → PDF로 저장으로 깨끗한 사본을 만들어 사용하세요.",
        ],
      },
      {
        type: "p",
        text: "**“빈 파일입니다.”**는 용량이 0바이트라는 뜻으로, 대부분 다운로드나 동기화가 끝나지 않은 경우입니다.",
      },

      { type: "h2", text: "“합치려면 PDF 파일을 2개 이상 추가해 주세요.”" },
      {
        type: "p",
        text: "[PDF 합치기](/merge-pdf)는 읽을 수 있는 PDF가 2개 이상 있어야 합니다. 카드에 비밀번호나 손상 메시지가 표시된 파일은 개수에 들어가지 않으므로, 파일을 2개 넣었는데도 이 메시지가 보인다면 빨간 글씨가 있는 카드를 찾아 그 파일을 고치거나 바꾸세요. 사진이나 이미지로 된 스캔본을 함께 묶으려면 먼저 [JPG를 PDF로 변환](/jpg-to-pdf)으로 PDF를 만드세요. 합치면서 페이지 순서까지 바꾸려면 여러 PDF를 받는 [PDF 페이지 정리](/organize-pdf)가 편합니다.",
      },
      { type: "tool", slug: "merge-pdf", text: "PDF를 원하는 순서로 합칩니다. 페이지를 다시 렌더링하지 않고 그대로 복사합니다." },

      { type: "h2", text: "“페이지 범위를 확인해 주세요. 1–N 사이에서 1-3, 5처럼 입력합니다.”" },
      {
        type: "p",
        text: "[PDF 분할](/split-pdf)의 **범위 지정**과 [PDF를 JPG로 변환](/pdf-to-jpg)의 **직접 지정**에서는 페이지 번호를 입력합니다. N 자리에는 문서의 전체 페이지 수가 표시됩니다.",
      },
      {
        type: "table",
        head: ["입력", "의미"],
        rows: [
          ["`5`", "5페이지만"],
          ["`1-3`", "1, 2, 3페이지"],
          ["`8-`", "8페이지부터 마지막 페이지까지"],
          ["`-4`", "첫 페이지부터 4페이지까지"],
          ["`1-3, 5, 8-10`", "쉼표로 여러 범위를 구분"],
        ],
      },
      {
        type: "p",
        text: "0페이지, 마지막 페이지를 넘는 번호, `5-3`처럼 거꾸로 된 범위, `p2`나 `1-3-5` 같은 입력에서 이 메시지가 나타납니다. PDF 분할에서는 **모든 범위를 PDF 하나로 합치기**에 체크하지 않으면 쉼표로 구분한 범위마다 파일이 하나씩 만들어집니다. **페이지 선택** 방식의 **“선택한 페이지가 없습니다.”**는 아직 아무 페이지도 클릭하지 않았다는 뜻입니다.",
      },
      { type: "tool", slug: "split-pdf", text: "페이지 범위, 원하는 페이지, N페이지 단위로 PDF를 나눠 새 파일로 저장합니다." },

      { type: "h2", text: "큰 PDF와 “기기 메모리가 부족합니다”" },
      {
        type: "p",
        text: "PDF 도구는 최대 50개, 파일당 200MB까지 받고, 분할·회전·PDF를 JPG로 변환은 한 번에 파일 하나만 다룹니다. 브라우저는 작업하는 동안 파일을 메모리에 올려 두며 사본을 여러 개 만들기도 하는데, 휴대폰은 탭 하나에 PC보다 훨씬 적은 메모리를 줍니다. 큰 작업이 **“기기 메모리가 부족합니다. 파일 수나 크기를 줄여 주세요.”**로 실패하거나 탭이 새로고침되면 나눠서 진행하세요. 10개를 먼저 합친 뒤 그 결과끼리 다시 합치는 식입니다. 다른 탭을 닫거나, 아주 큰 문서는 PC에서 작업하세요.",
      },
      {
        type: "p",
        text: "페이지를 이미지로 바꿀 때는 메모리가 더 듭니다. PDF를 JPG로 변환에서 **300 DPI · 인쇄용**을 고르면 A4 한 페이지가 2480 × 3508픽셀(약 8.7MP)이 되고, 그리는 동안 픽셀 데이터만 35MB 정도를 차지합니다. 페이지는 한 장씩 처리되지만, 10페이지가 넘는 문서에 300 DPI를 고르면 “페이지가 많을 때 300 DPI는 휴대폰 메모리를 많이 사용할 수 있습니다.”라는 안내가 나옵니다. 아이폰·아이패드에서는 이미지 한 장이 약 16.7MP로 제한되므로 A3 페이지를 300 DPI(약 17.4MP)로 바꾸면 “이 기기에서 처리하기엔 이미지가 너무 큽니다”가 표시됩니다. 화면으로 보거나 공유할 용도라면 **150 DPI · 표준**으로 충분합니다.",
      },

      { type: "h2", text: "스캔한 PDF: 페이지는 되지만 글자는 안 됩니다" },
      {
        type: "p",
        text: "스캐너나 스캔 앱은 보통 각 페이지를 사진으로 PDF에 담습니다. Intera Tools는 이런 페이지도 다른 PDF와 똑같이 합치고, 나누고, 회전하고, 순서를 바꾸며, 다시 압축하지 않고 그대로 복사합니다. 다만 글자 그림을 실제 텍스트로 바꾸는 OCR 기능은 없어서 결과물에서도 글자를 선택하거나 검색할 수 없습니다. 이런 작업에는 문자 인식을 지원하는 스캔 앱이나 PC용 PDF 프로그램을 이용하세요. 옆으로 누운 스캔본은 [PDF 회전](/rotate-pdf)으로 바로잡고, 필요한 페이지만 꺼내는 방법은 [PDF에서 페이지 추출하기](/guides/extract-pages-from-pdf)를 참고하세요.",
      },
    ],
    faq: [
      {
        q: "뷰어에서는 비밀번호 없이 열리는데 왜 비밀번호로 보호된 PDF라고 나오나요?",
        a: "권한(소유자) 비밀번호가 걸려 있을 가능성이 큽니다. 이 비밀번호는 보는 것은 막지 않지만 파일을 암호화하기 때문에 여기서는 편집할 수 없습니다. 본인 문서라면 보호를 설정한 프로그램에서 해제하거나, 인쇄가 허용된 경우 새 PDF로 인쇄해 사용하세요.",
      },
      {
        q: "비밀번호를 잊어버렸는데 Intera Tools로 풀 수 있나요?",
        a: "아니요. Intera Tools는 비밀번호를 해제하거나 찾아 주지 않습니다. 파일을 만든 사람에게 보호가 없는 사본을 요청하거나 원본 프로그램에서 다시 내보내세요.",
      },
      {
        q: "합치거나 나누면 페이지 화질이 떨어지나요?",
        a: "아니요. 합치기, 분할, 회전, 페이지 정리는 페이지를 다시 렌더링하지 않고 새 PDF로 그대로 복사하므로 글자는 글자로 남고 이미지도 다시 압축되지 않습니다. 페이지를 그림으로 바꾸는 도구는 PDF를 JPG로 변환뿐입니다.",
      },
    ],
    sources: [
      { label: "Adobe Acrobat 도움말: PDF 비밀번호 제거", url: "https://helpx.adobe.com/acrobat/desktop/protect-documents/protect-with-passwords/remove-passwords-from-pdfs.html" },
      { label: "pdf-lib: 암호화 문서 처리(README)", url: "https://github.com/Hopding/pdf-lib#encryption-handling" },
    ],
  },
};

export default guide;
