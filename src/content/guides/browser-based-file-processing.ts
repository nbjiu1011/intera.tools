import type { Locale } from "../../i18n/config";
import type { GuideContent } from "../types";

const guide: Record<Locale, GuideContent> = {
  en: {
    title: "Browser-Based vs Upload-Based File Tools: How They Work and How to Check",
    metaTitle: "Browser-Based vs Upload File Tools: How to Check",
    metaDescription:
      "How in-browser file tools process images and PDFs without uploading them, how to verify that yourself, what Intera Tools does send, and the real trade-offs.",
    summary:
      "Most online converters work by uploading your file to a server, processing it there and sending the result back. Browser-based tools download the program instead and run it on your device, so the file itself never travels. This guide explains how that works technically, how you can check any site's claim with your own browser, exactly what Intera Tools sends over the network, and where the browser approach falls short.",
    takeaways: [
      "In a browser-based tool, the page's code reads the file from your device into memory and processes it there. No copy of the file goes to a server.",
      "You can verify this yourself: watch the Network tab in your browser's developer tools while processing, or go offline after the tool has loaded.",
      "Intera Tools sends anonymous usage events (tool, file count, size range, error type) but never file names, file contents or typed text. Pages also load Google AdSense.",
      "The trade-off is that your device does the work. Very large files, older phones and features that need server software such as OCR are where upload-based tools still have the edge.",
    ],
    body: [
      { type: "h2", text: "Two ways to build a file tool" },
      {
        type: "p",
        text: "With an **upload-based** tool, your browser sends the whole file to the service's server. Software on the server converts or compresses it, stores the result for a while and gives you a download link. What happens to the file afterwards depends on the provider's retention policy, their security and any subcontractors they use. You have to trust their description.",
      },
      {
        type: "p",
        text: "With a **browser-based** tool, the direction is reversed. Your browser downloads the tool's code, a set of JavaScript files, once. When you choose a file, the code reads it from your disk into the tab's memory, processes it there and offers the result as a download. The server only ever delivered the program. It never receives the document.",
      },

      { type: "h2", text: "How in-browser processing works" },
      {
        type: "p",
        text: "Several standard browser features make this possible. Here is how Intera Tools uses them:",
      },
      {
        type: "ul",
        items: [
          "**File API.** When you pick, drop or paste a file, the page gets a `File` object, a handle to data on your device. Reading it copies the bytes into the tab's memory, not onto the network.",
          "**Object URLs.** To show or decode an image, the page creates a temporary `blob:` address that points to the data in memory. The browser's own image decoder reads it, applies the EXIF orientation and hands back pixels.",
          "**Canvas.** Image tools draw the pixels onto an off-screen canvas, resize, crop, rotate or watermark them there, and ask the browser to encode the result as JPG, PNG or WebP. PNG compression uses the UPNG library in a background thread (a Web Worker) to build a palette of at most 256 colors.",
          "**PDF libraries in JavaScript.** Merging, splitting, rotating and reorganizing PDFs, and turning images into a PDF, use pdf-lib, which edits the PDF structure directly. Rendering pages to images (PDF to JPG, page previews) uses Mozilla's pdf.js in a Web Worker.",
          "**Downloads.** The finished file is turned into another `blob:` URL and saved by your browser. Batches are packed into a ZIP in the browser with the fflate library.",
        ],
      },

      { type: "h2", text: "How to check it yourself" },
      {
        type: "p",
        text: "You don't have to take any site's word for it, including ours. Both tests below work on any website that claims to process files locally.",
      },
      {
        type: "steps",
        items: [
          { title: "Open the developer tools", body: "In Chrome, Edge or Firefox on a computer, press F12 (or Cmd+Option+I on a Mac) and open the **Network** tab. Click the clear button so the list is empty." },
          { title: "Process a file", body: "Add a file you can recognize by size, for example a 5 MB PDF, and run the tool." },
          { title: "Read the list", body: "Sort by size or look at the request and response sizes. An upload would show up as a request carrying roughly the size of your file. On Intera Tools you will see code files, entries starting with `blob:` (local memory, not network transfers), a small POST to `/api/events` (a few hundred bytes), Cloudflare's page analytics beacon and possibly ad-related requests to Google domains." },
        ],
      },
      {
        type: "p",
        text: "The offline test is even simpler and works on phones too: load the tool page, process one small test file so all the code it needs has been fetched, then turn on airplane mode and process the real file. If the tool still works, the processing cannot be happening on a server.",
      },
      {
        type: "note",
        tone: "info",
        text: "If a tool fails in airplane mode, that alone does not prove it uploads files. It may simply need a code file it hasn't downloaded yet. The Network tab gives you the definite answer.",
      },

      { type: "h2", text: "What Intera Tools does send" },
      {
        type: "p",
        text: "Processing is local, but the site is not silent. To be specific, these are the things that leave your browser:",
      },
      {
        type: "ul",
        items: [
          "**Anonymous usage events.** A tool or guide was opened, files were added or rejected, processing started, finished, failed or was cancelled, a result was downloaded, you continued to another tool, or a search on the home page found results or not. Each event carries the event name, a timestamp, the page language and a device class (mobile, tablet or desktop, based on window width). Depending on the event it also includes the tool name, the number of files, an input size range (such as \"1–5MB\"), the processing time, an error code (such as \"encrypted\"), and how files were added (picked, dropped, pasted or passed from another tool).",
          "**Error reports.** If a script error occurs, its message, cut to 160 characters, is sent so broken tools can be found.",
          "**Never included:** file names, file contents, image pixels, PDF text, or anything you type, such as QR code text, watermark text or search terms. Events use no cookies or identifiers. The server keeps only a fixed list of fields and does not record your IP address or browser user agent with them.",
          "**No events at all** if your browser sends Do Not Track or Global Privacy Control.",
          "**Page analytics by our host.** The hosting provider, Cloudflare, adds its Web Analytics script, which reports page views, the referring page, browser type and page-load timing without cookies. It runs on the page, not on your files.",
          "**Advertising.** Pages load Google AdSense, which pays for the site. Google may use cookies to serve and measure ads, as described in the [privacy policy](/privacy). The ad code is a third-party script on the page, but Intera Tools never passes your files to it, and the tools don't depend on it.",
        ],
      },

      { type: "h2", text: "The honest trade-offs" },
      {
        type: "p",
        text: "Running on your device has real costs. These are the limits you are most likely to hit:",
      },
      {
        type: "ul",
        items: [
          "**Memory.** The file, the decoded pixels and the result all have to fit into the tab's memory. A 12-megapixel photo takes about 48 MB once decoded, whatever its JPG size. Intera Tools accepts up to 100 images of 50 MB each and up to 50 PDFs of 200 MB each, but a phone may run out of memory well before those limits.",
          "**iPhone and iPad canvas limit.** Safari on iOS caps a canvas at about 16.7 megapixels, so larger images can't be processed there. Resizing them on a computer first is the workaround.",
          "**Speed depends on your device.** Quantizing a large PNG or rendering a 300-page PDF takes noticeably longer on an older phone than on a laptop. A server with a fast CPU doesn't care what you're holding.",
          "**The browser's encoders and decoders.** Output quality comes from each browser's built-in JPG and WebP encoders, not from specialized server tools. Safari can't encode WebP, and HEIC photos can only be opened in Safari because other browsers can't decode them.",
          "**No server-side tricks.** There is no OCR, no Ghostscript-style recompression of the images inside a PDF, and no support for password-protected PDFs. Those need software that is impractical to ship to a browser or that we haven't built.",
          "**Keep the tab open.** Closing the tab or locking a phone during a long job can stop it. Mobile browsers may pause background tabs.",
        ],
      },

      { type: "h2", text: "Side by side" },
      {
        type: "table",
        head: ["", "Browser-based", "Upload-based"],
        rows: [
          ["Where the file goes", "Stays on your device", "Copied to the provider's server"],
          ["What you have to trust", "The code your browser runs, which you can observe", "The provider's retention and security policies"],
          ["Upload/download time", "None for the file itself", "Both ways, limited by your connection"],
          ["Works offline after loading", "Usually yes", "No"],
          ["Very large files", "Limited by device memory", "Limited by the provider's plan"],
          ["Speed", "Depends on your device", "Depends on the server and queue"],
          ["OCR, advanced PDF compression", "Generally not available", "Often available"],
          ["Account needed", "No", "Sometimes, especially for large files"],
        ],
      },
      {
        type: "p",
        text: "For contracts, ID scans, medical documents or anything covered by a confidentiality agreement, keeping the file on your device removes a whole category of risk. For a 2 GB scanned book that needs OCR, an upload-based service, or desktop software, is the more practical tool. Pick per task, and use the Network tab test when a site's privacy claim matters to you.",
      },
      {
        type: "tool",
        slug: "merge-pdf",
        text: "Try the Network tab test with Merge PDF: combine two PDFs and check that nothing the size of your files leaves the browser.",
      },
    ],
    faq: [
      {
        q: "If nothing is uploaded, why does the Network tab show requests while I use a tool?",
        a: "Those are code files being downloaded (for example the PDF renderer the first time you open a PDF), `blob:` entries that refer to data in memory, the small anonymous usage event, Cloudflare's page analytics and ad requests. None of them carry your file. Compare their sizes with the size of your file.",
      },
      {
        q: "Can the site see my files after I close the tab?",
        a: "No. Files are only held in the tab's memory while it is open. Closing the tab releases that memory along with any temporary `blob:` addresses. Nothing was sent to a server, so there is no copy elsewhere to delete.",
      },
      {
        q: "Why did a large image fail on my iPhone but work on my computer?",
        a: "Safari on iOS limits canvases to about 16.7 megapixels and gives web pages less memory than a desktop browser. Larger images are rejected or run out of memory. Resize the image on a computer first, or use a desktop browser.",
      },
      {
        q: "Does using an ad blocker break the tools?",
        a: "The tools don't depend on the ad script, so they keep working when ads are blocked.",
      },
    ],
    sources: [
      { label: "MDN: HTMLCanvasElement.toBlob()", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob" },
      { label: "Can I use: WebP in canvas toBlob()", url: "https://caniuse.com/mdn-api_htmlcanvaselement_toblob_type_parameter_webp" },
      { label: "Can I use: HEIF/HEIC image format", url: "https://caniuse.com/heif" },
      { label: "pdf-lib: encryption handling (README)", url: "https://github.com/Hopding/pdf-lib#encryption-handling" },
      { label: "Cloudflare Web Analytics", url: "https://www.cloudflare.com/web-analytics/" },
      { label: "Cloudflare docs: Web Analytics dimensions", url: "https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/" },
    ],
  },

  ko: {
    title: "브라우저 처리 방식과 업로드 방식 파일 도구: 작동 원리와 확인 방법",
    metaTitle: "업로드 없는 파일 처리, 직접 확인하는 법",
    metaDescription:
      "브라우저 기반 도구가 이미지와 PDF를 업로드 없이 처리하는 원리, 직접 확인하는 방법, Intera Tools가 실제로 전송하는 정보, 그리고 현실적인 한계를 정리했습니다.",
    summary:
      "대부분의 온라인 변환 사이트는 파일을 서버에 업로드해 처리한 뒤 결과를 돌려줍니다. 브라우저 기반 도구는 반대로 프로그램을 내려받아 내 기기에서 실행하기 때문에 파일 자체는 어디로도 이동하지 않습니다. 이 글에서는 그 기술적인 원리, 어떤 사이트의 주장이든 내 브라우저로 직접 확인하는 방법, Intera Tools가 네트워크로 보내는 정보의 정확한 범위, 그리고 브라우저 방식이 불리한 점을 설명합니다.",
    takeaways: [
      "브라우저 기반 도구에서는 페이지의 코드가 내 기기의 파일을 메모리로 읽어 그 자리에서 처리합니다. 파일 사본은 서버로 가지 않습니다.",
      "개발자 도구의 네트워크 탭을 켜 두고 처리해 보거나, 도구를 불러온 뒤 비행기 모드로 바꿔 보면 직접 확인할 수 있습니다.",
      "Intera Tools는 도구 이름, 파일 개수, 용량 구간, 오류 유형 같은 익명 사용 통계를 보내지만 파일 이름, 파일 내용, 입력한 텍스트는 보내지 않습니다. 페이지에는 Google 애드센스가 함께 로드됩니다.",
      "대신 작업은 내 기기가 합니다. 아주 큰 파일, 오래된 휴대폰, OCR처럼 서버 소프트웨어가 필요한 기능은 여전히 업로드 방식이 유리합니다.",
    ],
    body: [
      { type: "h2", text: "파일 도구를 만드는 두 가지 방식" },
      {
        type: "p",
        text: "**업로드 방식** 도구에서는 브라우저가 파일 전체를 서비스의 서버로 보냅니다. 서버의 프로그램이 변환이나 압축을 하고, 결과를 일정 기간 보관하면서 다운로드 링크를 줍니다. 그 뒤 파일이 어떻게 되는지는 업체의 보관 정책, 보안 수준, 위탁 업체에 달려 있고, 사용자는 업체의 설명을 믿을 수밖에 없습니다.",
      },
      {
        type: "p",
        text: "**브라우저 기반** 도구는 방향이 반대입니다. 브라우저가 도구의 코드, 즉 자바스크립트 파일들을 한 번 내려받습니다. 파일을 고르면 이 코드가 디스크에서 파일을 읽어 탭의 메모리에 올리고, 그 자리에서 처리한 뒤 결과를 다운로드로 내줍니다. 서버는 프로그램을 전달했을 뿐 문서는 받지 않습니다.",
      },

      { type: "h2", text: "브라우저 안에서 처리되는 원리" },
      {
        type: "p",
        text: "이 방식은 브라우저의 표준 기능 몇 가지로 이루어집니다. Intera Tools는 이렇게 활용합니다.",
      },
      {
        type: "ul",
        items: [
          "**File API.** 파일을 선택하거나 끌어다 놓거나 붙여 넣으면 페이지는 `File` 객체, 즉 내 기기에 있는 데이터를 가리키는 핸들을 받습니다. 이를 읽으면 바이트가 탭의 메모리로 복사될 뿐 네트워크로 나가지 않습니다.",
          "**객체 URL.** 이미지를 표시하거나 해독할 때 페이지는 메모리 속 데이터를 가리키는 임시 `blob:` 주소를 만듭니다. 브라우저에 내장된 이미지 디코더가 이를 읽어 EXIF 회전 정보를 적용하고 픽셀로 바꿔 줍니다.",
          "**캔버스.** 이미지 도구는 화면에 보이지 않는 캔버스에 픽셀을 그려 크기 조절, 자르기, 회전, 워터마크를 처리한 뒤 브라우저에 JPG, PNG, WebP 인코딩을 요청합니다. PNG 압축은 백그라운드 스레드(Web Worker)에서 UPNG 라이브러리로 최대 256색 팔레트를 만듭니다.",
          "**자바스크립트 PDF 라이브러리.** PDF 합치기, 분할, 회전, 페이지 정리, 이미지를 PDF로 만들기는 PDF 구조를 직접 편집하는 pdf-lib를 씁니다. 페이지를 이미지로 그리는 작업(PDF를 JPG로 변환, 페이지 미리보기)은 Mozilla의 pdf.js가 Web Worker에서 처리합니다.",
          "**다운로드.** 완성된 파일은 다시 `blob:` URL이 되어 브라우저가 저장합니다. 여러 파일은 fflate 라이브러리로 브라우저 안에서 ZIP으로 묶습니다.",
        ],
      },

      { type: "h2", text: "직접 확인하는 방법" },
      {
        type: "p",
        text: "어떤 사이트의 말도, 저희 말도 그대로 믿을 필요는 없습니다. 아래 두 가지 방법은 '파일을 기기에서 처리한다'고 주장하는 어느 사이트에서나 통합니다.",
      },
      {
        type: "steps",
        items: [
          { title: "개발자 도구 열기", body: "PC의 Chrome, Edge, Firefox에서 F12(Mac은 Cmd+Option+I)를 누르고 **네트워크(Network)** 탭을 엽니다. 지우기 버튼을 눌러 목록을 비웁니다." },
          { title: "파일 처리하기", body: "용량으로 알아보기 쉬운 파일, 예를 들어 5MB짜리 PDF를 넣고 도구를 실행합니다." },
          { title: "목록 살펴보기", body: "크기순으로 정렬하거나 요청·응답 크기를 확인합니다. 업로드가 있다면 내 파일과 비슷한 크기의 요청이 보여야 합니다. Intera Tools에서는 코드 파일, `blob:`으로 시작하는 항목(네트워크 전송이 아닌 로컬 메모리), `/api/events`로 가는 수백 바이트짜리 작은 POST 요청, Cloudflare의 페이지 분석 요청, 그리고 Google 도메인으로 가는 광고 관련 요청 정도가 보입니다." },
        ],
      },
      {
        type: "p",
        text: "오프라인 테스트는 더 간단하고 휴대폰에서도 할 수 있습니다. 도구 페이지를 열고 작은 테스트 파일을 한 번 처리해 필요한 코드를 모두 불러온 다음, 비행기 모드를 켜고 실제 파일을 처리해 보세요. 그래도 작동한다면 서버에서 처리하는 것이 아닙니다.",
      },
      {
        type: "note",
        tone: "info",
        text: "비행기 모드에서 도구가 실패했다고 해서 파일을 업로드한다는 뜻은 아닙니다. 아직 내려받지 않은 코드 파일이 필요했을 수도 있습니다. 확실한 답은 네트워크 탭에서 얻을 수 있습니다.",
      },

      { type: "h2", text: "Intera Tools가 실제로 보내는 정보" },
      {
        type: "p",
        text: "처리는 기기 안에서 하지만 사이트가 아무것도 보내지 않는 것은 아닙니다. 브라우저 밖으로 나가는 정보를 구체적으로 정리하면 다음과 같습니다.",
      },
      {
        type: "ul",
        items: [
          "**익명 사용 이벤트.** 도구나 가이드를 열었는지, 파일을 추가했거나 거부됐는지, 처리를 시작·완료·실패·취소했는지, 결과를 내려받았는지, 다른 도구로 이어서 작업했는지, 홈 화면 검색에 결과가 있었는지 여부입니다. 각 이벤트에는 이벤트 이름, 시각, 페이지 언어, 창 너비로 구분한 기기 유형(모바일·태블릿·데스크톱)이 들어갑니다. 이벤트에 따라 도구 이름, 파일 개수, 입력 용량 구간(예: '1–5MB'), 처리 시간, 오류 코드(예: 'encrypted'), 파일을 추가한 방식(선택, 끌어다 놓기, 붙여 넣기, 다른 도구에서 넘겨받기)이 포함됩니다.",
          "**오류 보고.** 스크립트 오류가 나면 고장 난 도구를 찾기 위해 오류 메시지를 160자로 잘라 보냅니다.",
          "**절대 포함되지 않는 것:** 파일 이름, 파일 내용, 이미지 픽셀, PDF 텍스트, QR 코드 내용·워터마크 문구·검색어처럼 직접 입력한 내용. 이벤트에는 쿠키나 식별자를 쓰지 않습니다. 서버는 정해진 항목만 남기며 IP 주소와 브라우저 정보(User-Agent)는 함께 기록하지 않습니다.",
          "브라우저에서 Do Not Track이나 Global Privacy Control을 켜 두었다면 **이벤트를 전혀 보내지 않습니다.**",
          "**호스팅 업체의 페이지 분석.** 호스팅 업체인 Cloudflare가 Web Analytics 스크립트를 넣어 페이지 조회, 유입 페이지, 브라우저 종류, 페이지 로딩 시간을 쿠키 없이 집계합니다. 이 스크립트는 페이지에서 동작할 뿐 파일에는 접근하지 않습니다.",
          "**광고.** 사이트 운영비를 충당하기 위해 페이지에 Google 애드센스가 로드됩니다. Google은 [개인정보처리방침](/privacy)에 설명된 대로 광고 게재와 측정에 쿠키를 쓸 수 있습니다. 광고 코드는 페이지에 들어 있는 외부 스크립트이지만 Intera Tools는 파일을 이 코드에 넘기지 않으며, 도구가 광고 코드에 의존하지도 않습니다.",
        ],
      },

      { type: "h2", text: "솔직한 장단점" },
      {
        type: "p",
        text: "내 기기에서 실행하는 데는 분명한 대가가 있습니다. 가장 자주 부딪히는 한계는 다음과 같습니다.",
      },
      {
        type: "ul",
        items: [
          "**메모리.** 원본 파일, 해독된 픽셀, 결과물이 모두 탭의 메모리에 들어가야 합니다. 1,200만 화소 사진은 JPG 용량과 관계없이 해독하면 약 48MB를 차지합니다. Intera Tools는 이미지를 장당 50MB, 최대 100장까지, PDF를 파일당 200MB, 최대 50개까지 받지만 휴대폰은 그보다 훨씬 먼저 메모리가 부족해질 수 있습니다.",
          "**iPhone·iPad의 캔버스 한도.** iOS의 Safari는 캔버스 크기를 약 1,670만 화소로 제한하므로 그보다 큰 이미지는 처리할 수 없습니다. PC에서 먼저 크기를 줄이는 것이 해결책입니다.",
          "**속도는 기기 성능에 좌우됩니다.** 큰 PNG의 색상 축소나 300쪽짜리 PDF 렌더링은 노트북보다 오래된 휴대폰에서 눈에 띄게 오래 걸립니다. 서버는 사용자가 어떤 기기를 쓰든 같은 속도를 냅니다.",
          "**브라우저의 인코더와 디코더.** 결과물의 화질은 각 브라우저에 내장된 JPG·WebP 인코더가 결정하며, 서버용 전문 도구를 쓰지 않습니다. Safari는 WebP를 만들 수 없고, HEIC 사진은 다른 브라우저가 해독하지 못해 Safari에서만 열립니다.",
          "**서버에서만 가능한 기능은 없습니다.** OCR(문자 인식), Ghostscript 같은 방식의 PDF 내부 이미지 재압축, 비밀번호가 걸린 PDF는 지원하지 않습니다. 브라우저로 옮기기 어려운 소프트웨어이거나 아직 만들지 않은 기능입니다.",
          "**탭을 열어 두세요.** 긴 작업 중에 탭을 닫거나 휴대폰 화면을 잠그면 작업이 멈출 수 있습니다. 모바일 브라우저는 백그라운드 탭을 일시 정지하기도 합니다.",
        ],
      },

      { type: "h2", text: "한눈에 비교" },
      {
        type: "table",
        head: ["", "브라우저 기반", "업로드 방식"],
        rows: [
          ["파일 위치", "내 기기에 그대로", "업체 서버로 복사"],
          ["믿어야 하는 대상", "직접 관찰할 수 있는, 브라우저가 실행하는 코드", "업체의 보관·보안 정책"],
          ["업로드·다운로드 시간", "파일 자체는 없음", "양방향 모두, 인터넷 속도에 좌우"],
          ["불러온 뒤 오프라인 사용", "대부분 가능", "불가능"],
          ["아주 큰 파일", "기기 메모리에 따라 제한", "업체 요금제에 따라 제한"],
          ["속도", "내 기기 성능에 좌우", "서버 성능과 대기열에 좌우"],
          ["OCR, 고급 PDF 압축", "대체로 불가능", "제공하는 경우가 많음"],
          ["회원가입", "필요 없음", "큰 파일은 필요한 경우가 있음"],
        ],
      },
      {
        type: "p",
        text: "계약서, 신분증 사본, 진료 기록, 비밀유지 약정이 걸린 자료라면 파일을 기기 밖으로 내보내지 않는 것만으로 위험 하나가 통째로 사라집니다. 반대로 OCR이 필요한 2GB짜리 스캔 도서라면 업로드 방식 서비스나 PC용 프로그램이 더 현실적입니다. 작업마다 맞는 도구를 고르고, 개인정보 보호가 중요한 상황이라면 네트워크 탭으로 직접 확인해 보세요.",
      },
      {
        type: "tool",
        slug: "merge-pdf",
        text: "PDF 합치기로 네트워크 탭 테스트를 해 보세요. PDF 두 개를 합치면서 파일 크기만 한 요청이 브라우저 밖으로 나가지 않는지 확인할 수 있습니다.",
      },
    ],
    faq: [
      {
        q: "업로드하지 않는데 왜 도구를 쓰는 동안 네트워크 탭에 요청이 보이나요?",
        a: "코드 파일을 내려받는 요청(예: PDF를 처음 열 때 PDF 렌더러), 메모리 속 데이터를 가리키는 `blob:` 항목, 작은 익명 사용 이벤트, Cloudflare 페이지 분석, 광고 요청입니다. 어느 것도 파일을 담고 있지 않습니다. 각 요청 크기를 내 파일 크기와 비교해 보세요.",
      },
      {
        q: "탭을 닫은 뒤에도 사이트가 제 파일을 볼 수 있나요?",
        a: "아니요. 파일은 탭이 열려 있는 동안 메모리에만 있고, 탭을 닫으면 그 메모리와 임시 `blob:` 주소가 함께 해제됩니다. 서버로 보낸 적이 없으니 지워야 할 사본도 없습니다.",
      },
      {
        q: "큰 이미지가 PC에서는 되는데 iPhone에서는 실패합니다. 왜 그런가요?",
        a: "iOS의 Safari는 캔버스를 약 1,670만 화소로 제한하고, 웹페이지에 데스크톱 브라우저보다 적은 메모리를 줍니다. 그래서 큰 이미지는 거부되거나 메모리가 부족해집니다. PC에서 먼저 크기를 줄이거나 데스크톱 브라우저를 쓰세요.",
      },
      {
        q: "광고 차단기를 쓰면 도구가 작동하지 않나요?",
        a: "도구는 광고 코드에 의존하지 않으므로 광고를 차단해도 그대로 작동합니다.",
      },
    ],
    sources: [
      { label: "MDN: HTMLCanvasElement.toBlob()", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob" },
      { label: "Can I use: 캔버스 toBlob()의 WebP 지원", url: "https://caniuse.com/mdn-api_htmlcanvaselement_toblob_type_parameter_webp" },
      { label: "Can I use: HEIF/HEIC 이미지 형식 지원", url: "https://caniuse.com/heif" },
      { label: "pdf-lib: 암호화 문서 처리(README)", url: "https://github.com/Hopding/pdf-lib#encryption-handling" },
      { label: "Cloudflare Web Analytics 소개", url: "https://www.cloudflare.com/web-analytics/" },
      { label: "Cloudflare 문서: Web Analytics 집계 항목", url: "https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/" },
    ],
  },
};

export default guide;
