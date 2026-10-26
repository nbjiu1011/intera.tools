import type { Locale } from "../../i18n/config";
import type { GuideContent } from "../types";

const guide: Record<Locale, GuideContent> = {
  en: {
    title: "How to Extract Pages from a PDF: Ranges, Selected Pages or Every N Pages",
    metaTitle: "Extract Pages from a PDF: Ranges, Selection, Every N",
    metaDescription:
      "Pull pages out of a PDF in your browser: range syntax, selecting pages by click, splitting every N pages, deleting pages, and saving pages as images.",
    summary:
      "Often you only need part of a PDF: the two pages of a contract that need a signature, one chapter of a manual, or each invoice from a scanned batch as its own file. Split PDF does this with three modes, and each suits a different job. This guide explains how each mode behaves, the exact range syntax, the mistakes that produce the wrong files, and when Organize PDF or PDF to JPG is the better tool.",
    takeaways: [
      "Split PDF has three modes: Ranges, Select pages and Every N pages. Before you run it, a notice tells you how many files you'll get.",
      "Range syntax is `1-3, 5, 8-10`. Each range becomes its own PDF unless you switch on Merge all ranges into one PDF.",
      "Extracted pages are copied, not re-rendered, so text stays selectable and quality doesn't change.",
      "To remove or reorder pages instead, use Organize PDF. For pictures of pages, use PDF to JPG at 72, 150 or 300 DPI.",
    ],
    body: [
      { type: "h2", text: "Pick the right tool first" },
      {
        type: "table",
        caption: "Which tool fits which job",
        head: ["What you want", "Tool", "What you get"],
        rows: [
          ["A few pages as a new PDF", "Split PDF, **Ranges** or **Select pages**", "One PDF, or one per range or page"],
          ["Equal chunks of a long PDF", "Split PDF, **Every N pages**", "One PDF per chunk"],
          ["The same PDF without some pages", "Organize PDF", "One PDF"],
          ["Pages in a different order or rotated", "Organize PDF", "One PDF"],
          ["Pages as pictures", "PDF to JPG", "One JPG or PNG per page"],
        ],
      },
      { type: "h2", text: "Mode 1: Ranges" },
      {
        type: "p",
        text: "When you open a PDF in [Split PDF](/split-pdf), the **Page ranges** field is pre-filled with the document cut in two halves, for example `1-5, 6-10` for a 10-page file. Replace it with the pages you want. The rules:",
      },
      {
        type: "ul",
        items: [
          "`1-3` means pages 1 to 3 inclusive; `5` means page 5 alone.",
          "Separate ranges with commas. Semicolons and spaces between ranges also work.",
          "Leave one end open: `8-` runs from page 8 to the last page, and `-3` from the first page to page 3.",
          "An en dash (`–`) or tilde (`~`) is accepted in place of the hyphen, which helps when you paste ranges from a document that turned hyphens into dashes.",
        ],
      },
      {
        type: "p",
        text: "Each range becomes a separate PDF, named after the original file plus its pages, such as `report-p1-3.pdf` and `report-p5.pdf`. While you type, the page thumbnails are color-coded by output file, and a notice such as \"Creates 3 PDF files\" confirms the count.",
      },
      {
        type: "p",
        text: "Switch on **Merge all ranges into one PDF** to get a single file with every range in it. The pages follow the order you typed, so `9-10, 1-2` produces pages 9, 10, 1, 2. Typing a page twice includes it twice. This makes the option handy for quick reordering as well as extracting.",
      },
      { type: "h2", text: "Mode 2: Select pages" },
      {
        type: "p",
        text: "Choose **Select pages** and click the thumbnails you want. A check mark appears on each selected page, the counter shows how many are selected, and **Select all** and **Clear** help with long documents. Then pick the output:",
      },
      {
        type: "ul",
        items: [
          "**One PDF with the selected pages** creates a single file ending in `-selected.pdf`.",
          "**Each selected page as its own PDF** creates one file per page, such as `report-p4.pdf`.",
        ],
      },
      {
        type: "p",
        text: "Selected pages always come out in document order, whatever order you clicked them in. If you need them in a different order, use Ranges with the merge option or Organize PDF.",
      },
      { type: "h2", text: "Mode 3: Every N pages" },
      {
        type: "p",
        text: "**Every N pages** cuts the document into chunks of equal length. Set **Split every** to the number of pages per file. A 25-page PDF split every 10 pages gives three files: pages 1–10, 11–20 and 21–25; the last file holds whatever is left over. Setting it to 1 saves every page as its own PDF. This mode suits a batch scan where every document has the same length, such as a stack of two-page forms scanned in one go.",
      },
      { type: "h2", text: "Step by step" },
      {
        type: "steps",
        items: [
          {
            title: "Add the PDF",
            body: "Open [Split PDF](/split-pdf) and drop in one PDF (up to 200 MB). The file is read in your browser and isn't uploaded.",
          },
          {
            title: "Choose a split mode",
            body: "Under **Split mode**, choose **Ranges**, **Select pages** or **Every N pages**.",
          },
          {
            title: "Define the pages",
            body: "Type the ranges, click the pages or set the chunk size. Check the colored thumbnails and the notice showing how many PDF files will be created.",
          },
          {
            title: "Split and download",
            body: "Click **Split PDF**. With several output files, use **Download all (ZIP)** or download them one at a time.",
          },
        ],
      },
      { type: "tool", slug: "split-pdf", text: "Extract pages by range, by selection or every N pages, without uploading the PDF." },
      { type: "h2", text: "Common range mistakes" },
      {
        type: "ul",
        items: [
          "**A space instead of a hyphen.** `1 3` means page 1 and page 3 as two separate parts, while `1-3` (or `1 - 3`) means pages 1 to 3. If the notice shows more files than you expected, check for a missing hyphen.",
          "**Reversed ranges.** `5-3` is rejected with \"Check the page range — use numbers like 1-3, 5 within 1–N.\" Write the lower number first. To reverse the order, type `5, 4, 3` with **Merge all ranges into one PDF** on.",
          "**Pages that don't exist.** Page 0 or a number beyond the last page triggers the same message.",
          "**Printed page numbers.** The tool counts pages from the first page of the file. A book whose cover and preface come before page \"1\" will have different numbers. Use the numbers under the thumbnails.",
          "**Words in the field.** `p. 3` or `3 to 5` aren't accepted; use only numbers, hyphens and commas.",
          "**Overlapping ranges.** `1-5, 3-8` creates two files that both contain pages 3–5. That can be intentional, but often isn't.",
        ],
      },
      { type: "h2", text: "Removing pages instead: Organize PDF" },
      {
        type: "p",
        text: "If what you really want is the same PDF without pages 4 and 7, [Organize PDF](/organize-pdf) is more direct. Load the file, use **Delete page** on the pages you don't want (**Restore page** brings one back) and click **Save PDF**. You can also drag pages into a new order, use **Rotate page**, **Insert blank page**, or **Add PDF** to bring in pages from another file.",
      },
      {
        type: "p",
        text: "Split PDF and Organize PDF both copy pages with pdf-lib, so quality is unchanged. Bookmarks, working form fields and links between pages belong to the original document and may not carry over to the new file.",
      },
      { type: "h2", text: "Saving pages as images: PDF to JPG" },
      {
        type: "p",
        text: "Sometimes a PDF won't do: an upload form only accepts JPG, or you want to drop one page into a slide or a chat message. [PDF to JPG](/pdf-to-jpg) renders pages to JPG or PNG under **Image format**, at one of three **Resolution** settings:",
      },
      {
        type: "table",
        caption: "Approximate output size for an A4 page",
        head: ["Resolution", "A4 page in pixels", "Good for"],
        rows: [
          ["**72 DPI · small**", "about 595 × 842", "Previews and chat messages"],
          ["**150 DPI · standard**", "about 1240 × 1754", "Reading on screen and most upload forms"],
          ["**300 DPI · print**", "about 2480 × 3508", "Printing, zooming into small text, OCR"],
        ],
      },
      {
        type: "p",
        text: "Under **Pages**, choose **All pages** or **Custom**. Custom uses the same range syntax as Split PDF, and a page listed twice is exported once. For JPG, a **JPG quality** slider runs from 40 to 100. PNG is the better choice for text and line art, JPG for scanned photos. Files are named like `report-page-04.jpg`. The images are pictures of the pages, so text in them can no longer be selected or searched. As the tool warns, 300 DPI on many pages can use a lot of memory on phones.",
      },
    ],
    faq: [
      {
        q: "Does extracting pages reduce quality?",
        a: "No. Split PDF copies the pages into a new file without re-rendering them. Only PDF to JPG turns pages into images, and its quality depends on the resolution you choose.",
      },
      {
        q: "Why is a one-page extract almost as large as the original?",
        a: "A copied page brings along everything it uses, such as embedded fonts and full-resolution images. If one page holds most of the document's images, or the fonts are large, extracting it saves little space.",
      },
      {
        q: "Can I split several PDFs at once?",
        a: "No. Split PDF works on one file at a time. To pick pages from several files into one document, load them all into Organize PDF and delete the pages you don't need.",
      },
      {
        q: "Can I extract pages from a password-protected PDF?",
        a: "Not directly. Encrypted PDFs can't be opened by the tool. Save an unprotected copy in a PDF app where you know the password, then split that copy.",
      },
    ],
  },
  ko: {
    title: "PDF에서 필요한 페이지만 추출하기: 범위 지정, 페이지 선택, N페이지마다 나누기",
    metaTitle: "PDF 페이지 추출하는 3가지 방법",
    metaDescription:
      "브라우저에서 PDF의 원하는 페이지만 뽑아내는 방법. 페이지 범위 입력 규칙, 클릭으로 페이지 선택, N페이지마다 나누기, 페이지 삭제, 페이지를 이미지로 저장하는 법까지 정리했습니다.",
    summary:
      "PDF 전체가 아니라 일부만 필요할 때가 많습니다. 계약서에서 서명할 두 페이지만, 매뉴얼에서 한 장(章)만, 한꺼번에 스캔한 청구서를 한 건씩 따로 떼어 내야 하는 경우입니다. PDF 분할에는 용도가 다른 세 가지 방식이 있습니다. 이 글에서는 방식별 동작과 정확한 범위 입력 규칙, 엉뚱한 결과가 나오는 흔한 실수, 그리고 PDF 페이지 정리나 PDF를 JPG로 변환이 더 나은 경우를 설명합니다.",
    takeaways: [
      "PDF 분할에는 범위 지정, 페이지 선택, N페이지마다의 세 가지 방식이 있으며, 실행 전에 파일이 몇 개 만들어지는지 안내가 나옵니다.",
      "범위는 `1-3, 5, 8-10`처럼 입력하며, '모든 범위를 PDF 하나로 합치기'를 켜지 않으면 범위마다 PDF가 따로 만들어집니다.",
      "추출한 페이지는 다시 렌더링하지 않고 복사하므로 글자 선택이 그대로 되고 화질도 바뀌지 않습니다.",
      "페이지를 지우거나 순서를 바꾸려면 PDF 페이지 정리를, 페이지를 이미지로 받으려면 PDF를 JPG로 변환(72·150·300 DPI)을 쓰세요.",
    ],
    body: [
      { type: "h2", text: "먼저 알맞은 도구 고르기" },
      {
        type: "table",
        caption: "작업별로 알맞은 도구",
        head: ["하고 싶은 일", "도구", "결과"],
        rows: [
          ["몇 페이지만 새 PDF로", "PDF 분할 **범위 지정** 또는 **페이지 선택**", "PDF 1개, 또는 범위나 페이지마다 1개씩"],
          ["긴 PDF를 같은 분량으로 나누기", "PDF 분할 **N페이지마다**", "묶음마다 PDF 1개"],
          ["일부 페이지만 뺀 같은 PDF", "PDF 페이지 정리", "PDF 1개"],
          ["페이지 순서 변경이나 회전", "PDF 페이지 정리", "PDF 1개"],
          ["페이지를 이미지로", "PDF를 JPG로 변환", "페이지마다 JPG 또는 PNG 1장"],
        ],
      },
      { type: "h2", text: "방식 1: 범위 지정" },
      {
        type: "p",
        text: "[PDF 분할](/split-pdf)에서 PDF를 열면 **페이지 범위** 칸에 문서를 반으로 나눈 값이 미리 들어 있습니다. 10페이지 파일이라면 `1-5, 6-10`입니다. 이 값을 원하는 페이지로 바꾸면 되며, 규칙은 다음과 같습니다.",
      },
      {
        type: "ul",
        items: [
          "`1-3`은 1페이지부터 3페이지까지, `5`는 5페이지 하나입니다.",
          "범위끼리는 쉼표로 구분합니다. 세미콜론이나 띄어쓰기로 구분해도 됩니다.",
          "한쪽 끝을 비워 둘 수 있습니다. `8-`은 8페이지부터 마지막 페이지까지, `-3`은 첫 페이지부터 3페이지까지입니다.",
          "하이픈 대신 엔 대시(`–`)나 물결표(`~`)를 써도 됩니다. 하이픈이 대시로 자동 변환된 문서에서 범위를 복사해 붙여 넣을 때 편리합니다.",
        ],
      },
      {
        type: "p",
        text: "범위마다 PDF가 하나씩 만들어지고, 파일 이름은 원본 이름 뒤에 페이지 번호가 붙어 `report-p1-3.pdf`, `report-p5.pdf`처럼 됩니다. 입력하는 동안 페이지 썸네일이 결과 파일별로 다른 색으로 표시되고, 'PDF 3개가 만들어집니다' 같은 안내로 개수를 확인할 수 있습니다.",
      },
      {
        type: "p",
        text: "**모든 범위를 PDF 하나로 합치기**를 켜면 모든 범위가 파일 하나에 담깁니다. 페이지는 입력한 순서를 따르므로 `9-10, 1-2`를 입력하면 9, 10, 1, 2페이지 순서가 되고, 같은 페이지를 두 번 적으면 두 번 들어갑니다. 그래서 페이지를 뽑는 용도뿐 아니라 간단히 순서를 바꾸는 용도로도 쓸 수 있습니다.",
      },
      { type: "h2", text: "방식 2: 페이지 선택" },
      {
        type: "p",
        text: "**페이지 선택**을 고르고 원하는 썸네일을 누르세요. 선택한 페이지에는 체크 표시가 나타나고 선택 개수가 표시됩니다. 페이지가 많을 때는 **전체 선택**과 **선택 해제**가 편리합니다. 그다음 결과 형태를 고릅니다.",
      },
      {
        type: "ul",
        items: [
          "**선택한 페이지를 PDF 하나로**를 고르면 이름이 `-selected.pdf`로 끝나는 파일 하나가 만들어집니다.",
          "**선택한 페이지를 각각 PDF로**를 고르면 `report-p4.pdf`처럼 페이지마다 파일이 하나씩 만들어집니다.",
        ],
      },
      {
        type: "p",
        text: "선택한 페이지는 누른 순서와 상관없이 항상 문서 순서대로 저장됩니다. 다른 순서가 필요하다면 범위 지정의 합치기 옵션이나 PDF 페이지 정리를 쓰세요.",
      },
      { type: "h2", text: "방식 3: N페이지마다" },
      {
        type: "p",
        text: "**N페이지마다**는 문서를 같은 분량으로 자릅니다. **분할 단위**에 파일 하나당 페이지 수를 입력하세요. 25페이지짜리 PDF를 10페이지마다 나누면 1~10, 11~20, 21~25페이지의 파일 3개가 되고, 마지막 파일에는 남은 페이지만 들어갑니다. 1을 입력하면 모든 페이지가 각각 PDF로 저장됩니다. 2페이지짜리 신청서 묶음을 한 번에 스캔한 경우처럼 문서마다 분량이 같은 일괄 스캔본에 알맞습니다.",
      },
      { type: "h2", text: "분할하는 순서" },
      {
        type: "steps",
        items: [
          {
            title: "PDF 추가",
            body: "[PDF 분할](/split-pdf)을 열고 PDF 하나(최대 200MB)를 끌어다 놓습니다. 파일은 브라우저에서 읽히며 업로드되지 않습니다.",
          },
          {
            title: "분할 방식 선택",
            body: "**분할 방식**에서 **범위 지정**, **페이지 선택**, **N페이지마다** 중 하나를 고릅니다.",
          },
          {
            title: "페이지 지정",
            body: "범위를 입력하거나 페이지를 누르거나 분할 단위를 정합니다. 색으로 구분된 썸네일과 PDF가 몇 개 만들어지는지 알려 주는 안내를 확인하세요.",
          },
          {
            title: "분할하고 다운로드",
            body: "**PDF 분할하기**를 누릅니다. 결과 파일이 여러 개라면 **모두 다운로드 (ZIP)**로 한꺼번에 받거나 하나씩 받으세요.",
          },
        ],
      },
      { type: "tool", slug: "split-pdf", text: "PDF를 업로드하지 않고 범위 지정, 페이지 선택, N페이지마다 방식으로 페이지를 추출합니다." },
      { type: "h2", text: "범위 입력에서 자주 하는 실수" },
      {
        type: "ul",
        items: [
          "**하이픈 대신 띄어쓰기.** `1 3`은 1페이지와 3페이지를 따로 뽑는다는 뜻이고, `1-3`(또는 `1 - 3`)은 1~3페이지를 뜻합니다. 안내에 예상보다 많은 파일 수가 나오면 하이픈이 빠지지 않았는지 확인하세요.",
          "**거꾸로 쓴 범위.** `5-3`은 '페이지 범위를 확인해 주세요. 1–N 사이에서 1-3, 5처럼 입력합니다.'라는 안내와 함께 거부됩니다. 작은 숫자를 먼저 쓰세요. 순서를 뒤집고 싶다면 **모든 범위를 PDF 하나로 합치기**를 켜고 `5, 4, 3`처럼 입력하면 됩니다.",
          "**없는 페이지.** 0페이지나 마지막 페이지보다 큰 번호도 같은 안내가 나옵니다.",
          "**인쇄된 쪽 번호.** 이 도구는 파일의 첫 페이지부터 1, 2, 3으로 셉니다. 표지와 머리말이 본문 1쪽보다 앞에 있는 책이라면 번호가 다릅니다. 썸네일 아래의 번호를 기준으로 하세요.",
          "**글자 섞어 쓰기.** `p. 3`이나 `3~5쪽`처럼 글자를 넣으면 인식되지 않습니다. 숫자, 하이픈, 쉼표만 쓰세요.",
          "**겹치는 범위.** `1-5, 3-8`은 3~5페이지가 두 파일에 모두 들어갑니다. 일부러 그런 것이 아니라면 범위를 다시 확인하세요.",
        ],
      },
      { type: "h2", text: "페이지를 지우는 게 목적이라면: PDF 페이지 정리" },
      {
        type: "p",
        text: "실제로 원하는 것이 '4페이지와 7페이지만 뺀 같은 PDF'라면 [PDF 페이지 정리](/organize-pdf)가 더 간단합니다. 파일을 불러와 필요 없는 페이지에서 **페이지 삭제**를 누르고(**페이지 복원**으로 되살릴 수 있습니다) **PDF 저장**을 누르면 됩니다. 페이지를 끌어 순서를 바꾸거나, **페이지 회전**, **빈 페이지 삽입**, 다른 파일의 페이지를 가져오는 **PDF 추가**도 쓸 수 있습니다.",
      },
      {
        type: "p",
        text: "PDF 분할과 PDF 페이지 정리는 모두 pdf-lib로 페이지를 복사하므로 화질은 그대로입니다. 다만 책갈피, 입력 가능한 양식 필드, 페이지 간 링크는 원본 문서 전체에 속한 정보라 새 파일에는 옮겨지지 않을 수 있습니다.",
      },
      { type: "h2", text: "페이지를 이미지로 저장하기: PDF를 JPG로 변환" },
      {
        type: "p",
        text: "PDF로는 곤란한 경우도 있습니다. 제출 양식이 JPG만 받거나, 한 페이지를 발표 자료나 메신저에 이미지로 넣고 싶을 때입니다. [PDF를 JPG로 변환](/pdf-to-jpg)은 **이미지 형식**에서 고른 JPG나 PNG로 페이지를 변환하며, **해상도**는 세 가지 중에서 고를 수 있습니다.",
      },
      {
        type: "table",
        caption: "A4 한 페이지의 대략적인 결과 크기",
        head: ["해상도", "A4 페이지 픽셀 크기", "알맞은 용도"],
        rows: [
          ["**72 DPI · 작게**", "약 595 × 842", "미리보기, 메신저 전송"],
          ["**150 DPI · 표준**", "약 1240 × 1754", "화면으로 읽기, 대부분의 제출 양식"],
          ["**300 DPI · 인쇄용**", "약 2480 × 3508", "인쇄, 작은 글자 확대, OCR"],
        ],
      },
      {
        type: "p",
        text: "**페이지**에서 **전체 페이지**나 **직접 지정**을 고릅니다. 직접 지정은 PDF 분할과 같은 범위 규칙을 쓰며, 같은 페이지를 두 번 적어도 한 번만 변환됩니다. JPG를 고르면 40~100 사이의 **JPG 품질** 슬라이더가 나타납니다. 글자나 도표 위주라면 PNG가, 사진을 스캔한 페이지라면 JPG가 알맞습니다. 파일 이름은 `report-page-04.jpg` 같은 형식입니다. 결과물은 페이지를 찍은 그림이라 글자를 선택하거나 검색할 수 없습니다. 도구의 안내대로 페이지가 많을 때 300 DPI는 휴대폰 메모리를 많이 사용할 수 있습니다.",
      },
    ],
    faq: [
      {
        q: "페이지를 추출하면 화질이 떨어지나요?",
        a: "아닙니다. PDF 분할은 페이지를 다시 렌더링하지 않고 새 파일로 복사합니다. 페이지를 이미지로 바꾸는 것은 PDF를 JPG로 변환뿐이며, 그 화질은 고른 해상도에 따라 달라집니다.",
      },
      {
        q: "한 페이지만 뽑았는데 용량이 원본과 비슷한 이유는 무엇인가요?",
        a: "복사한 페이지는 포함된 글꼴, 원본 해상도 이미지처럼 그 페이지가 쓰는 데이터를 모두 함께 가져갑니다. 문서의 이미지가 대부분 그 페이지에 있거나 글꼴 용량이 크다면 줄어드는 용량이 적습니다.",
      },
      {
        q: "PDF 여러 개를 한 번에 분할할 수 있나요?",
        a: "안 됩니다. PDF 분할은 한 번에 파일 하나만 처리합니다. 여러 파일에서 페이지를 골라 문서 하나로 만들려면 모두 PDF 페이지 정리에 불러온 뒤 필요 없는 페이지를 지우세요.",
      },
      {
        q: "비밀번호가 걸린 PDF에서도 페이지를 뽑을 수 있나요?",
        a: "바로는 안 됩니다. 암호화된 PDF는 열 수 없습니다. 비밀번호를 아는 PDF 프로그램에서 보호가 해제된 사본을 저장한 뒤 그 사본을 분할하세요.",
      },
    ],
  },
};

export default guide;
