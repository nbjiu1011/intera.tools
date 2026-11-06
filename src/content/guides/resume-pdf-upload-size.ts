import type { Locale } from "../../i18n/config";
import type { GuideContent } from "../types";

const guide: Record<Locale, GuideContent> = {
  en: {
    title: "How to Make a Resume and Portfolio PDF That Uploads Cleanly",
    metaTitle: "Resume and Portfolio PDF: Size, Order and Naming",
    metaDescription:
      "Make a resume or portfolio PDF that fits the upload limit: export with real text, shrink portfolio images first, merge and order files, and name it clearly.",
    summary:
      "Application forms reject files that are too large, accept only one attachment, or quietly mangle a document that was never a proper PDF. Most of these problems come from three things: oversized portfolio images, several separate files that should be one, and pages in the wrong order or orientation. This guide walks through building a single, tidy PDF: exporting the resume correctly, shrinking images before they go into the PDF, combining and ordering the files, naming the result and checking it before you press submit.",
    takeaways: [
      "Export the resume from your word processor as PDF. Don't print it and scan it, or photograph it: a recruiter's search and many applicant systems need real, selectable text.",
      "Portfolio images are what make the file large. Shrink them before building the PDF: five camera photos went from 33.8 MB to 1.55 MB as a PDF with shrinking on.",
      "Combine files with Merge PDF and fix order, sideways pages or extra pages with Organize PDF. Neither re-compresses pages, so text stays selectable.",
      "Name the file so it is recognizable in someone else's downloads folder, for example Jane_Smith_Product_Designer.pdf, unless the posting asks for a specific format.",
      "Upload limits differ by site and by posting. Read the limit on the form itself rather than relying on a number from elsewhere.",
    ],
    body: [
      { type: "h2", text: "What usually goes wrong" },
      {
        type: "table",
        head: ["Problem", "Typical cause", "Fix"],
        rows: [
          ["File is over the upload limit", "Full-resolution screenshots, photos or design exports in the portfolio", "Shrink the images before making the PDF"],
          ["Only one file can be attached", "Resume, cover letter and portfolio are separate PDFs", "Combine them with [Merge PDF](/merge-pdf)"],
          ["Pages are out of order or sideways", "Files merged in the wrong order, scanned certificates rotated", "Rearrange and rotate pages with [Organize PDF](/organize-pdf)"],
          ["Text can't be selected or searched", "The resume was scanned, photographed or exported as an image", "Export again from the original document as PDF"],
          ["The recruiter can't tell whose file it is", "Generic names such as `resume_final2.pdf`", "Rename it with your name and the role"],
        ],
      },

      { type: "h2", text: "Step 1: export the resume as a real PDF" },
      {
        type: "p",
        text: "Start from the original document, not from a printout. In Microsoft Word on Windows, choose **File → Save a Copy**, pick **PDF** in the file type list and save; on a Mac, use **File → Save As** and choose **PDF** under **File Format**. In Google Docs, use **File → Download** and choose the PDF file type. Exported this way, the text in the PDF is real text: it can be selected, searched and read by screen readers. Word's PDF options also include **Document structure tags for accessibility**, which helps screen-reading software.",
      },
      {
        type: "p",
        text: "Check it straight away: open the PDF, drag across a sentence, and use **Ctrl+F** (or **Cmd+F**) to search for your own surname. If nothing highlights, the page is a picture of text. Employers who search their applicant pool for a skill or a name will not find you in that file, so fix it now rather than later.",
      },

      { type: "h2", text: "Step 2: shrink portfolio images before they go into the PDF" },
      {
        type: "p",
        text: "A resume exported from a word processor is rarely the problem. Portfolio pages are: screenshots from a large monitor, photos of physical work and design exports can each be several megabytes. A PDF stores whatever pixels you give it, so the cheapest place to save space is before the images are placed on pages. You have three options, from most to least control:",
      },
      {
        type: "ul",
        items: [
          "**Build portfolio pages from images directly.** If each portfolio page is one image, add them to the [Photos to PDF Document](/workflows/images-to-pdf-document) workflow and leave **Shrink images for a smaller PDF** on. It caps each image at 2000 px on the long edge and saves it as JPG quality 80. In our test, five high-resolution camera photos made a **33.8 MB** PDF with shrinking off and **1.55 MB** with it on.",
          "**Resize before placing images in a layout.** If you lay out your portfolio in Word, Keynote, Canva or similar, shrink the images first with [Resize Image](/resize-image). At 1920 px wide, our five test photos came out between 143 KB and 870 KB each (JPG quality 92), so fifteen such images add up to roughly 2–13 MB instead of more than 50 MB for the originals.",
          "**Compress without changing dimensions.** [Compress Image](/compress-image) at **Balanced** cut the same photos by 80–94%. Use it when the pixel size must stay as it is.",
        ],
      },
      {
        type: "note",
        tone: "tip",
        title: "Keep text-heavy images sharp",
        text: "UI screenshots and diagrams with small text suffer from heavy compression sooner than photos do. Zoom into one at 100% after shrinking. If the text looks smeared, use **Light** compression or a larger width for those images only.",
      },
      {
        type: "workflow",
        slug: "images-to-pdf-document",
        text: "Turn portfolio images into a compact PDF: order the pages, rotate any sideways image, choose A4 or US Letter and shrink each image.",
      },

      { type: "h2", text: "Step 3: combine and order the files" },
      {
        type: "steps",
        items: [
          { title: "Merge the PDFs", body: "Add the resume, cover letter and portfolio PDFs to [Merge PDF](/merge-pdf). Drag the cards or use the arrow buttons until the **Merge order** list reads the way a recruiter should read it, usually resume first. Then choose **Merge PDF**." },
          { title: "Fine-tune individual pages", body: "If a page needs to move, a scanned certificate is sideways, or a blank page slipped in, choose **Continue with** → Organize PDF on the result screen. Drag pages into place, rotate or delete them, and choose **Save PDF**." },
          { title: "Know what carries over", body: "Pages are copied as they are, so text stays selectable and images are not re-compressed. Links to websites keep working; bookmarks and document properties such as the title are not carried into the merged file." },
        ],
      },
      {
        type: "p",
        text: "Both tools run in your browser and need PDFs as input, so convert any loose image (a scanned certificate, for example) to PDF first with [JPG to PDF](/jpg-to-pdf). Our [guide to merging PDFs safely](/guides/merge-pdf-files-safely) explains in more detail what survives a merge.",
      },

      { type: "h2", text: "Step 4: name the file" },
      {
        type: "p",
        text: "Merge PDF saves the result as `merged-3-files.pdf` and Organize PDF adds `-organized` to the name, so rename the final file before uploading. A good default is your name plus the role: `Jane_Smith_Product_Designer.pdf`, or `Jane_Smith_Resume.pdf` and `Jane_Smith_Portfolio.pdf` when they must stay separate. Leave out words like \"final\" and version numbers, and avoid characters that Windows doesn't allow in file names (`\\ / : * ? \" < > |`). If the posting specifies a naming format, follow it exactly.",
      },

      { type: "h2", text: "Step 5: check before you submit" },
      {
        type: "ul",
        items: [
          "**Size:** compare the file size with the limit shown on the upload form. Limits differ between job sites, company career pages and even individual postings, so read the one in front of you.",
          "**Format:** most forms accept PDF, but some ask for a specific format or a set number of files. The posting or the upload field usually says so.",
          "**Opens everywhere:** open the PDF in a second viewer, such as your browser and a phone, and page through it all.",
          "**Text:** search for your name once more in the final file. Merging and organizing don't change this, but it is the last chance to catch a scanned page.",
          "**Links:** click your portfolio or LinkedIn link in the PDF to make sure it opens.",
        ],
      },

      { type: "h2", text: "If it still doesn't fit" },
      {
        type: "p",
        text: "Cut the portfolio before you cut the quality. Recruiters skim, and a focused selection of your strongest projects often works better than everything you have made. Use [Split PDF](/split-pdf) with **Select pages** to keep a shorter version, and offer the full portfolio as a link if the application allows one. For more ways to bring a PDF down, see [PDF too large to upload or send](/guides/reduce-pdf-file-size).",
      },
    ],
    faq: [
      {
        q: "What is the maximum file size for a resume upload?",
        a: "There is no single answer: each job site, company career page and application system sets its own limit, and some postings set a lower one. Check the text next to the upload button or in the posting's application instructions.",
      },
      {
        q: "Should the resume and portfolio be one file or two?",
        a: "Follow the form. If there is only one upload slot, merge them with the resume first. If there are separate slots, upload them separately so each can be opened on its own.",
      },
      {
        q: "Will merging make my resume text unselectable?",
        a: "No. Merge PDF and Organize PDF copy pages without converting them to images, so text stays selectable and searchable. Only scanning or photographing a printout, or converting pages to JPG, turns text into an image.",
      },
      {
        q: "Are my resume and portfolio uploaded to Intera Tools?",
        a: "No. Merging, organizing, resizing and PDF creation run in your browser, and the files are not sent to a server. They only leave your device when you upload them to the application form.",
      },
    ],
    sources: [
      { label: "Microsoft Support – Save or convert to PDF in Office desktop apps", url: "https://support.microsoft.com/en-us/office/save-or-convert-to-pdf-or-xps-in-office-desktop-apps-d85416c5-7d77-4fd6-a216-6f4bf7c7c110" },
      { label: "Google Docs Editors Help – Create, view, or download a file", url: "https://support.google.com/docs/answer/49114?hl=en" },
    ],
  },

  ko: {
    title: "이력서·포트폴리오 PDF, 업로드에서 막히지 않게 만드는 법",
    metaTitle: "이력서·포트폴리오 PDF 용량·순서·파일명",
    metaDescription:
      "이력서와 포트폴리오를 업로드 한도에 맞는 PDF 하나로 만드는 법. 텍스트 PDF로 내보내기, 이미지 먼저 줄이기, 합치기와 순서 정리, 파일명까지 정리했습니다.",
    summary:
      "입사지원 시스템은 용량이 큰 파일을 거부하거나, 첨부를 하나만 받거나, 제대로 된 PDF가 아닌 파일을 엉뚱하게 보여 주기도 합니다. 이런 문제는 대부분 세 가지에서 생깁니다. 너무 큰 포트폴리오 이미지, 하나로 묶어야 할 여러 파일, 순서나 방향이 틀린 페이지입니다. 이 글에서는 이력서를 올바르게 PDF로 내보내고, 이미지를 PDF에 넣기 전에 줄이고, 파일을 합쳐 순서를 정리하고, 파일명을 붙이고, 제출 전에 점검하는 과정을 차례로 안내합니다.",
    takeaways: [
      "이력서는 워드·한글·Google Docs에서 PDF로 내보내세요. 출력해서 스캔하거나 사진으로 찍으면 글자가 그림이 되어 검색도, 선택도 되지 않습니다.",
      "파일을 키우는 건 포트폴리오 이미지입니다. PDF를 만들기 전에 줄이세요. 카메라 사진 5장으로 만든 PDF가 이미지 축소를 켜자 33.8MB에서 1.55MB가 되었습니다.",
      "PDF 합치기로 파일을 묶고, 순서·방향·불필요한 페이지는 PDF 페이지 정리로 고칩니다. 두 도구 모두 페이지를 다시 압축하지 않아 글자가 그대로 선택됩니다.",
      "공고에 정해진 형식이 없다면 ‘홍길동_마케팅_이력서.pdf’처럼 이름과 지원 직무가 드러나게 파일명을 붙이세요.",
      "업로드 용량 한도는 채용 사이트와 공고마다 다릅니다. 다른 곳에서 본 숫자보다 지금 쓰는 업로드 화면의 안내를 기준으로 삼으세요.",
    ],
    body: [
      { type: "h2", text: "자주 생기는 문제" },
      {
        type: "table",
        head: ["문제", "흔한 원인", "해결"],
        rows: [
          ["업로드 용량 초과", "포트폴리오에 원본 해상도 스크린샷·사진·디자인 결과물이 들어감", "PDF를 만들기 전에 이미지를 줄이기"],
          ["첨부 파일을 하나만 받음", "이력서, 자기소개서, 포트폴리오가 각각 따로 있음", "[PDF 합치기](/merge-pdf)로 하나로 묶기"],
          ["페이지 순서가 틀리거나 옆으로 누움", "합친 순서가 잘못됨, 스캔한 자격증이 돌아가 있음", "[PDF 페이지 정리](/organize-pdf)로 순서 변경·회전"],
          ["글자가 선택·검색되지 않음", "이력서를 스캔하거나 사진으로 찍었거나 이미지로 내보냄", "원본 문서에서 PDF로 다시 내보내기"],
          ["누구 파일인지 알 수 없음", "`이력서_최종2.pdf` 같은 이름", "이름과 지원 직무를 넣어 파일명 변경"],
        ],
      },

      { type: "h2", text: "1단계: 이력서를 ‘진짜’ PDF로 내보내기" },
      {
        type: "p",
        text: "출력물이 아니라 원본 문서에서 시작하세요. Windows의 Microsoft Word에서는 **파일 → 사본 저장**에서 파일 형식을 **PDF**로 고르고 저장합니다. Mac에서는 **파일 → 다른 이름으로 저장**에서 **파일 형식**을 **PDF**로 고릅니다. Google Docs에서는 **파일 → 다운로드**에서 PDF 형식을 고르면 됩니다. 한글(HWP) 문서도 프로그램의 PDF 저장 기능으로 내보내면 됩니다. 이렇게 만든 PDF의 글자는 진짜 텍스트라서 선택하고 검색할 수 있고, 화면 낭독 프로그램도 읽을 수 있습니다. Word의 PDF 옵션에는 화면 낭독 프로그램을 돕는 **접근성을 위한 문서 구조 태그** 항목도 있습니다.",
      },
      {
        type: "p",
        text: "바로 확인해 보세요. PDF를 열어 문장을 드래그하고, **Ctrl+F**(Mac은 **Cmd+F**)로 내 이름을 검색합니다. 아무것도 표시되지 않으면 그 페이지는 글자를 찍은 그림입니다. 담당자가 지원자 서류에서 기술이나 이름을 검색해도 찾을 수 없으니 지금 고쳐 두세요.",
      },

      { type: "h2", text: "2단계: 포트폴리오 이미지는 PDF에 넣기 전에 줄이기" },
      {
        type: "p",
        text: "문서 프로그램에서 내보낸 이력서는 문제가 되는 일이 드뭅니다. 문제는 포트폴리오입니다. 큰 모니터에서 찍은 스크린샷, 작업물 사진, 디자인 결과물은 한 장에 몇 MB씩 되기도 합니다. PDF는 넣어 준 픽셀을 그대로 저장하므로, 이미지를 페이지에 얹기 전에 줄이는 것이 가장 효과적입니다. 방법은 세 가지입니다.",
      },
      {
        type: "ul",
        items: [
          "**이미지로 바로 페이지 만들기.** 포트폴리오 한 페이지가 이미지 한 장이라면 [사진으로 PDF 문서 만들기](/workflows/images-to-pdf-document)에 넣고 **PDF 용량을 줄이도록 이미지 축소**를 켜 둔 채 실행하세요. 각 이미지의 긴 변을 최대 2000px로 줄이고 품질 80의 JPG로 저장합니다. 테스트에서 고해상도 카메라 사진 5장이 축소를 끄면 **33.8MB**, 켜면 **1.55MB**였습니다.",
          "**레이아웃에 넣기 전에 크기 줄이기.** 워드, 키노트, 파워포인트, Canva 등에서 포트폴리오를 구성한다면 먼저 [이미지 크기 조절](/resize-image)로 이미지를 줄이세요. 가로 1920px로 줄였을 때 테스트 사진 5장은 장당 143KB~870KB(JPG 품질 92)였습니다. 이런 이미지 15장이면 원본으로는 50MB가 넘던 것이 대략 2~13MB가 됩니다.",
          "**크기는 그대로 두고 압축만 하기.** [이미지 압축](/compress-image)의 **균형** 단계는 같은 사진을 80~94% 줄였습니다. 픽셀 크기를 바꾸면 안 될 때 쓰세요.",
        ],
      },
      {
        type: "note",
        tone: "tip",
        title: "글자가 많은 이미지는 선명하게",
        text: "작은 글씨가 있는 화면 캡처나 다이어그램은 사진보다 압축에 먼저 티가 납니다. 줄인 뒤 100%로 확대해 보고, 글자가 뭉개져 보이면 그 이미지만 **약하게** 압축하거나 더 큰 너비로 줄이세요.",
      },
      {
        type: "workflow",
        slug: "images-to-pdf-document",
        text: "포트폴리오 이미지를 가벼운 PDF로 만듭니다. 페이지 순서를 정하고, 누운 이미지는 회전하고, A4·US Letter를 고르고, 이미지마다 용량을 줄입니다.",
      },

      { type: "h2", text: "3단계: 파일 합치고 순서 정리하기" },
      {
        type: "steps",
        items: [
          { title: "PDF 합치기", body: "이력서, 자기소개서, 포트폴리오 PDF를 [PDF 합치기](/merge-pdf)에 넣습니다. 카드를 끌거나 화살표 버튼으로 **합칠 순서** 목록이 담당자가 읽을 순서가 되도록 맞추고(보통 이력서가 먼저), **PDF 합치기**를 누릅니다." },
          { title: "페이지 단위로 다듬기", body: "옮길 페이지가 있거나, 스캔한 자격증이 옆으로 누웠거나, 빈 페이지가 끼어 있다면 결과 화면에서 **이어서 작업하기** → PDF 페이지 정리를 고르세요. 페이지를 끌어 옮기고, 회전하거나 삭제한 뒤 **PDF 저장**을 누릅니다." },
          { title: "무엇이 유지되는지 알아두기", body: "페이지를 그대로 복사하므로 글자는 선택 가능한 상태로 남고 이미지는 다시 압축되지 않습니다. 웹사이트 링크는 그대로 작동하지만, 책갈피와 제목 같은 문서 속성은 합친 파일로 옮겨지지 않습니다." },
        ],
      },
      {
        type: "p",
        text: "두 도구 모두 브라우저에서 동작하고 PDF만 받으므로, 스캔한 자격증처럼 낱장 이미지는 먼저 [JPG를 PDF로 변환](/jpg-to-pdf)으로 PDF로 만드세요. 합칠 때 무엇이 남고 사라지는지는 [PDF 안전하게 합치기](/guides/merge-pdf-files-safely)에서 자세히 다룹니다.",
      },

      { type: "h2", text: "4단계: 파일명 붙이기" },
      {
        type: "p",
        text: "PDF 합치기는 결과를 `merged-3-files.pdf`로, PDF 페이지 정리는 이름 뒤에 `-organized`를 붙여 저장하므로 올리기 전에 이름을 바꾸세요. 기본은 ‘이름_지원직무’입니다. 예를 들어 `홍길동_마케팅.pdf`, 따로 내야 한다면 `홍길동_이력서.pdf`, `홍길동_포트폴리오.pdf`처럼 붙입니다. ‘최종’, ‘수정본’ 같은 말이나 버전 번호는 빼고, Windows에서 파일명에 쓸 수 없는 문자(`\\ / : * ? \" < > |`)도 피하세요. 공고에서 파일명 형식을 정했다면 그 형식을 그대로 따르는 것이 가장 중요합니다.",
      },

      { type: "h2", text: "5단계: 제출 전에 점검하기" },
      {
        type: "ul",
        items: [
          "**용량:** 업로드 화면에 표시된 한도와 파일 크기를 비교하세요. 사람인·잡코리아 같은 채용 사이트, 기업 채용 페이지, 공공기관 채용 시스템마다 한도가 다르고 공고별로 따로 정하기도 합니다. 정확한 숫자는 업로드 버튼 주변 안내, 공고의 ‘제출 서류’ 항목, 해당 사이트 고객센터 도움말에서 확인하세요.",
          "**형식:** 대부분 PDF를 받지만 특정 형식이나 파일 개수를 요구하는 공고도 있습니다. 공공기관 공고라면 블라인드 처리 요건(학교명, 사진 등 제외)이 있는지도 함께 확인하세요.",
          "**열리는지:** 브라우저와 휴대폰처럼 다른 뷰어에서 PDF를 열어 끝까지 넘겨 보세요.",
          "**글자:** 최종 파일에서 이름을 한 번 더 검색합니다. 합치기와 정리는 이 상태를 바꾸지 않지만, 스캔한 페이지가 섞였는지 잡아낼 마지막 기회입니다.",
          "**링크:** PDF 속 포트폴리오나 블로그 링크를 눌러 제대로 열리는지 확인하세요.",
        ],
      },

      { type: "h2", text: "그래도 용량이 넘친다면" },
      {
        type: "p",
        text: "화질보다 분량을 먼저 줄이세요. 담당자는 빠르게 훑어보기 때문에, 가진 작업을 모두 넣기보다 가장 강한 프로젝트 몇 개를 고른 편이 더 효과적인 경우가 많습니다. [PDF 분할](/split-pdf)의 **페이지 선택**으로 짧은 버전을 만들고, 지원서에서 허용한다면 전체 포트폴리오는 링크로 제공하세요. PDF 용량을 줄이는 다른 방법은 [PDF 용량이 커서 업로드·전송이 안 될 때](/guides/reduce-pdf-file-size)에 정리했습니다.",
      },
    ],
    faq: [
      {
        q: "이력서 업로드 용량은 최대 몇 MB인가요?",
        a: "정해진 답은 없습니다. 채용 사이트, 기업 채용 페이지, 지원 시스템마다 한도가 다르고 공고에 따라 더 낮게 정하기도 합니다. 업로드 버튼 옆 안내 문구나 공고의 지원 방법 안내를 확인하세요.",
      },
      {
        q: "이력서와 포트폴리오는 한 파일로 내야 하나요, 따로 내야 하나요?",
        a: "지원 양식을 따르세요. 첨부 칸이 하나뿐이면 이력서를 앞에 두고 합치고, 칸이 따로 있다면 각각 올려 하나씩 열어 볼 수 있게 하는 편이 좋습니다.",
      },
      {
        q: "합치면 이력서 글자를 선택할 수 없게 되나요?",
        a: "아니요. PDF 합치기와 PDF 페이지 정리는 페이지를 이미지로 바꾸지 않고 복사하므로 글자는 그대로 선택·검색됩니다. 출력물을 스캔하거나 사진으로 찍거나, 페이지를 JPG로 변환할 때만 글자가 그림이 됩니다.",
      },
      {
        q: "이력서와 포트폴리오가 Intera Tools에 업로드되나요?",
        a: "아니요. 합치기, 정리, 크기 조절, PDF 만들기는 모두 브라우저 안에서 처리되며 파일이 서버로 전송되지 않습니다. 지원서에 직접 올릴 때만 기기 밖으로 나갑니다.",
      },
    ],
    sources: [
      { label: "Microsoft 지원 – Office 데스크톱 앱에서 PDF로 저장 또는 변환", url: "https://support.microsoft.com/en-us/office/save-or-convert-to-pdf-or-xps-in-office-desktop-apps-d85416c5-7d77-4fd6-a216-6f4bf7c7c110" },
      { label: "Google Docs 편집기 고객센터 – 파일 만들기, 보기, 다운로드", url: "https://support.google.com/docs/answer/49114?hl=en" },
    ],
  },
};

export default guide;
