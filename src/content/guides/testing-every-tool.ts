import type { Locale } from "../../i18n/config";
import type { GuideContent } from "../types";

const guide: Record<Locale, GuideContent> = {
  en: {
    title: "I Ran Every Intera Tool on Real Files. Here's What Broke and What I Fixed",
    metaTitle: "Testing Every Tool With Real Files: What I Fixed",
    metaDescription:
      "A test log from the person who runs Intera Tools: how each tool was checked with real files in Chrome, Firefox and Safari's engine, and the bugs that turned up.",
    summary:
      "After the redesign in late October 2026, I went through every tool on this site with real files instead of trusting that it worked. I opened every downloaded result and checked it, in three browser engines. Most things held up. A few didn't, and some of the descriptions I had written were simply wrong. This is the list, written down so you know what was checked and what changed.",
    takeaways: [
      "All 17 tools and 4 workflows were run with real files, and every downloaded result was opened and checked, not just the success message.",
      "The worst bug: typing a page range with spaces, like `1 - 3`, in Split PDF mixed copies of the whole document into the result.",
      "Several descriptions overstated things, for example \"unlimited PDFs\" (the real limit is 50 per batch). They now match what the code does.",
      "Safari's engine makes JPGs about 1.5–1.9 times larger than Chrome at the same setting, so I replaced a claim that the two were similar.",
    ],
    body: [
      { type: "h2", text: "How I tested" },
      {
        type: "p",
        text: "A tool can say \"Done\" and still hand you a broken file, so a success message wasn't enough. For each tool I used real photos, screenshots and PDFs, downloaded the result, and opened it to check the thing the tool promises. I ran the same flows in Chrome, in Firefox, and in WebKit, the engine behind Safari, because so many people open links on an iPhone.",
      },
      {
        type: "table",
        caption: "What I checked in the downloaded files. Everything passed except Split PDF, which failed at first and is fixed (see below).",
        head: ["Tool", "What I checked"],
        rows: [
          ["PNG to JPG, Convert Image", "Transparent areas in a PNG become white in the JPG, not black"],
          ["Resize, Compress, Rotate", "Phone photos with an EXIF rotation tag come out upright"],
          ["Merge PDF", "Page count of the merged file equals the sum of the inputs"],
          ["Rotate PDF", "Pages are actually rotated 90° when reopened in another viewer"],
          ["Split PDF", "The range `1 - 2, 5` produces two files with the right pages"],
          ["All tools", "A corrupted image, a password-protected PDF and an unsupported file each get a clear error"],
        ],
      },

      { type: "h2", text: "Bugs I found and fixed" },
      { type: "h3", text: "1. Page ranges with spaces gave the wrong pages" },
      {
        type: "p",
        text: "In [Split PDF](/split-pdf), `1-3` worked, but `1 - 3`, with spaces around the dash, didn't. The parser read the numbers and the dash as separate pieces, and the output included copies of the whole document. Plenty of people type ranges with spaces, so this was the most serious problem I found. Spaces around a dash are now joined, so `1 - 3` means pages 1 to 3, and a range outside the document shows an error instead of a guess.",
      },
      { type: "h3", text: "2. The mobile menu didn't open properly" },
      {
        type: "p",
        text: "After the redesign, the menu button on phones opened a panel that stayed trapped inside the header, so most of it couldn't be seen or tapped. Desktop testing never showed it, and I only caught it by testing at phone width. The menu now opens as a panel on top of the page.",
      },
      { type: "h3", text: "3. Small layout problems on the result screen" },
      {
        type: "ul",
        items: [
          "On narrow screens the Download button was squeezed flat next to the file list. It now takes the full width on phones.",
          "When a file was rejected (too large, wrong type), a long file name could push the explanation off the edge of the screen. It now wraps.",
        ],
      },
      { type: "h3", text: "4. A missing next step after PDF to JPG" },
      {
        type: "p",
        text: "One common job is to turn a heavy scanned PDF into images and back into a smaller PDF. After [PDF to JPG](/pdf-to-jpg), the \"Continue with\" list didn't offer [JPG to PDF](/jpg-to-pdf), so you had to download a ZIP, unzip it and upload again. It is now in the list, and the images pass straight to the next tool without leaving the browser.",
      },

      { type: "h2", text: "Descriptions that were wrong" },
      {
        type: "p",
        text: "Checking the text against the code was more humbling than checking the code. A few sentences I had written promised more than the tools do:",
      },
      {
        type: "table",
        head: ["What a page said", "What is actually true"],
        rows: [
          ["The PDF tools take unlimited files", "Up to 50 PDFs per batch, each up to 200 MB"],
          ["JPGs are never re-compressed in JPG to PDF", "JPGs go in unchanged, except photos with an EXIF rotation tag, which are re-saved at high quality so they stand upright"],
          ["Results in Safari are about the same as in Chrome", "In WebKit, JPGs at the same setting came out about 1.5–1.9 times larger than in Chrome"],
          ["A guide pointed to a \"restore page\" button", "That button doesn't exist. The guide now points to **Undo changes**, which is what's really there"],
        ],
      },
      {
        type: "p",
        text: "I also hadn't mentioned that Cloudflare, the hosting company, adds its Web Analytics script to the site. It uses no cookies and never sees your files, but it should have been in the [privacy policy](/privacy) from the start. It is there now.",
      },

      { type: "h2", text: "What I took from this" },
      {
        type: "ul",
        items: [
          "Test at phone width, and in Safari's engine, every time. Both bugs that would have hit the most people only showed up there.",
          "Open the output file. A success message only tells you the code finished.",
          "Write limits as numbers, and check each number against the code. Words like \"unlimited\" and \"never\" are usually wrong.",
        ],
      },
      {
        type: "note",
        tone: "info",
        title: "Found something broken?",
        text: "If a tool gives you a wrong result, tell me what you did and which browser you used through the [contact page](/contact). Please don't send the file itself. The tools never upload it, and you shouldn't have to either.",
      },
    ],
    faq: [
      {
        q: "Were the fixes tested again afterwards?",
        a: "Yes. After the fixes I rebuilt the site and ran all 21 flows again with the same files, with no console errors. The page range fix was also checked with ranges that go past the last page.",
      },
      {
        q: "Does Safari work with every tool?",
        a: "The core flows work in WebKit, Safari's engine. Two differences remain because of what Safari itself can do: it can't create WebP files, so WebP output is unavailable there (workflows switch to JPG and tell you), and it makes larger JPGs at the same quality setting.",
      },
    ],
  },
  ko: {
    title: "도구 21개를 실제 파일로 전부 테스트해 보니: 고장 난 것과 고친 것",
    metaTitle: "도구 전체 실사용 테스트와 수정 기록",
    metaDescription:
      "Intera Tools 운영자의 테스트 기록입니다. Chrome, Firefox, Safari 엔진에서 실제 파일로 모든 도구를 확인한 방법과 그 과정에서 발견해 고친 문제를 정리했습니다.",
    summary:
      "2026년 10월 말 사이트를 새로 단장한 뒤, 잘 되겠거니 하고 넘어가지 않고 모든 도구를 실제 파일로 하나씩 돌려 봤습니다. 내려받은 결과물은 전부 직접 열어 확인했고, 브라우저 엔진 세 가지에서 같은 과정을 반복했습니다. 대부분은 문제없었지만 몇 가지는 고장 나 있었고, 제가 써 둔 설명 중에는 사실과 다른 문장도 있었습니다. 무엇을 확인했고 무엇이 바뀌었는지 기록해 둡니다.",
    takeaways: [
      "도구 17개와 워크플로 4개를 실제 파일로 실행하고, 완료 메시지가 아니라 내려받은 결과물을 열어서 확인했습니다.",
      "가장 심각한 버그는 PDF 나누기에서 `1 - 3`처럼 띄어 쓴 페이지 범위를 넣으면 문서 전체 사본이 결과에 섞여 나오던 문제였습니다.",
      "'PDF 무제한'처럼 과장된 설명이 있었습니다(실제로는 한 번에 50개). 지금은 코드가 실제로 하는 일과 일치합니다.",
      "Safari 엔진은 같은 설정에서 JPG를 Chrome보다 약 1.5~1.9배 크게 만듭니다. 둘이 비슷하다고 썼던 설명을 고쳤습니다.",
    ],
    body: [
      { type: "h2", text: "어떻게 테스트했나" },
      {
        type: "p",
        text: "도구가 '완료'라고 표시해도 결과 파일이 망가져 있을 수 있습니다. 그래서 완료 메시지만 보고 넘어가지 않았습니다. 도구마다 실제 사진, 스크린샷, PDF를 넣고 결과를 내려받은 뒤, 그 도구가 약속하는 내용이 정말 지켜졌는지 파일을 열어 확인했습니다. 아이폰을 쓰는 분이 많으니 Chrome과 Firefox뿐 아니라 Safari의 엔진인 WebKit에서도 같은 과정을 반복했습니다.",
      },
      {
        type: "table",
        caption: "내려받은 파일에서 확인한 내용. PDF 나누기만 처음에 실패해서 고쳤고(아래 참고), 나머지는 모두 통과했습니다.",
        head: ["도구", "확인한 것"],
        rows: [
          ["PNG를 JPG로, 이미지 변환", "PNG의 투명한 부분이 JPG에서 검은색이 아니라 흰색이 되는지"],
          ["크기 조절, 압축, 회전", "EXIF 회전 정보가 있는 휴대폰 사진이 똑바로 세워져 나오는지"],
          ["PDF 합치기", "합친 파일의 페이지 수가 원본 페이지 수의 합과 같은지"],
          ["PDF 회전", "다른 뷰어로 다시 열어도 페이지가 실제로 90° 돌아가 있는지"],
          ["PDF 나누기", "범위 `1 - 2, 5`를 넣으면 올바른 페이지로 파일 2개가 나오는지"],
          ["모든 도구", "손상된 이미지, 암호 걸린 PDF, 지원하지 않는 파일에 알아볼 수 있는 오류가 뜨는지"],
        ],
      },

      { type: "h2", text: "찾아서 고친 버그" },
      { type: "h3", text: "1. 띄어 쓴 페이지 범위가 엉뚱한 결과를 냄" },
      {
        type: "p",
        text: "[PDF 나누기](/split-pdf)에서 `1-3`은 잘 됐는데 하이픈 앞뒤를 띄운 `1 - 3`은 제대로 처리되지 않았습니다. 숫자와 하이픈을 따로따로 읽는 바람에 결과에 문서 전체 사본이 섞여 나왔습니다. 범위를 띄어 쓰는 분이 많으니 이번에 찾은 문제 중 가장 심각했습니다. 지금은 하이픈 앞뒤 공백을 붙여 읽어서 `1 - 3`이 1~3페이지로 처리되고, 문서 범위를 벗어난 값을 넣으면 추측하지 않고 오류를 보여 줍니다.",
      },
      { type: "h3", text: "2. 모바일 메뉴가 제대로 열리지 않음" },
      {
        type: "p",
        text: "리디자인 이후 휴대폰에서 메뉴 버튼을 누르면 메뉴 창이 헤더 안에 갇혀서 대부분 보이지도 눌리지도 않았습니다. 컴퓨터 화면에서는 전혀 드러나지 않았고, 휴대폰 너비로 테스트하고 나서야 발견했습니다. 지금은 메뉴가 페이지 위에 패널로 열립니다.",
      },
      { type: "h3", text: "3. 결과 화면의 작은 레이아웃 문제" },
      {
        type: "ul",
        items: [
          "좁은 화면에서 다운로드 버튼이 파일 목록 옆에 끼어 납작하게 찌그러졌습니다. 지금은 휴대폰에서 가로 전체를 차지합니다.",
          "파일이 거부됐을 때(용량 초과, 지원하지 않는 형식) 파일 이름이 길면 안내 문구가 화면 밖으로 잘렸습니다. 지금은 줄을 바꿔 끝까지 보입니다.",
        ],
      },
      { type: "h3", text: "4. PDF를 JPG로 변환한 뒤 다음 단계가 빠져 있음" },
      {
        type: "p",
        text: "무거운 스캔 PDF를 이미지로 바꿨다가 다시 작은 PDF로 만드는 일이 꽤 흔합니다. 그런데 [PDF를 JPG로 변환](/pdf-to-jpg)의 '이어서 작업하기' 목록에 [JPG를 PDF로 변환](/jpg-to-pdf)이 없어서, ZIP을 내려받아 압축을 풀고 다시 올려야 했습니다. 지금은 목록에 들어 있고, 이미지가 브라우저를 벗어나지 않고 바로 다음 도구로 넘어갑니다.",
      },

      { type: "h2", text: "사실과 달랐던 설명" },
      {
        type: "p",
        text: "코드를 점검하는 것보다 설명을 코드와 대조하는 일이 더 뼈아팠습니다. 제가 쓴 문장 중 몇 개는 도구가 실제로 하는 것보다 더 많이 약속하고 있었습니다.",
      },
      {
        type: "table",
        head: ["페이지에 적혀 있던 내용", "실제"],
        rows: [
          ["PDF 도구는 파일 개수 제한이 없다", "한 번에 최대 50개, 파일당 200MB까지"],
          ["JPG를 PDF로 변환할 때 JPG는 절대 재압축하지 않는다", "JPG는 그대로 들어가지만, EXIF 회전 정보가 있는 사진은 똑바로 세우기 위해 높은 화질로 다시 저장"],
          ["Safari에서도 결과가 Chrome과 거의 같다", "WebKit에서는 같은 설정의 JPG가 Chrome보다 약 1.5~1.9배 큼"],
          ["가이드에 '페이지 복원' 버튼 안내가 있었다", "그런 버튼은 없음. 실제로 있는 **변경 취소** 버튼으로 고침"],
        ],
      },
      {
        type: "p",
        text: "호스팅 업체인 Cloudflare가 사이트에 Web Analytics 스크립트를 넣는다는 사실도 알리지 않고 있었습니다. 쿠키를 쓰지 않고 처리하는 파일에도 접근하지 않지만, 처음부터 [개인정보처리방침](/privacy)에 적어 뒀어야 했습니다. 지금은 적혀 있습니다.",
      },

      { type: "h2", text: "이번에 배운 것" },
      {
        type: "ul",
        items: [
          "휴대폰 너비와 Safari 엔진에서 매번 테스트할 것. 가장 많은 사람이 겪었을 문제 두 가지가 거기서만 드러났습니다.",
          "결과 파일을 직접 열어 볼 것. 완료 메시지는 코드가 끝났다는 뜻일 뿐입니다.",
          "제한은 숫자로 쓰고, 그 숫자를 코드와 대조할 것. '무제한'이나 '절대' 같은 말은 대개 틀립니다.",
        ],
      },
      {
        type: "note",
        tone: "info",
        title: "고장 난 걸 발견하셨나요?",
        text: "도구가 잘못된 결과를 냈다면 [문의 페이지](/contact)로 어떤 작업을 했는지, 어떤 브라우저를 썼는지 알려 주세요. 파일 자체는 보내지 않으셔도 됩니다. 도구가 파일을 업로드하지 않는 것처럼, 여러분도 파일을 보낼 필요가 없어야 하니까요.",
      },
    ],
    faq: [
      {
        q: "고친 뒤에 다시 테스트했나요?",
        a: "네. 수정한 뒤 사이트를 다시 빌드해서 같은 파일로 21개 과정을 모두 다시 돌렸고, 콘솔 오류도 없었습니다. 페이지 범위 수정은 마지막 페이지를 넘어가는 범위까지 넣어서 확인했습니다.",
      },
      {
        q: "Safari에서도 모든 도구가 되나요?",
        a: "Safari의 엔진인 WebKit에서 핵심 기능은 모두 동작합니다. 다만 Safari 자체의 특성 때문에 두 가지 차이가 있습니다. WebP 파일을 만들 수 없어서 WebP 저장은 쓸 수 없고(워크플로는 JPG로 바꿔 저장하고 알려 줍니다), 같은 품질 설정에서 JPG가 더 크게 만들어집니다.",
      },
    ],
  },
};

export default guide;
