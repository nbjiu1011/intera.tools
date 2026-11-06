import type { Locale } from "../../i18n/config";
import type { GuideContent } from "../types";

const guide: Record<Locale, GuideContent> = {
  en: {
    title: "No Uploads, No Sign-Up: The Rules I Set for Intera Tools",
    metaTitle: "No Uploads, No Sign-Up: How Intera Tools Is Run",
    metaDescription:
      "Why files never leave your browser on Intera Tools, what is stored on your device, which features are left out on purpose, and how the site pays for itself.",
    summary:
      "Most of what I do with images and PDFs is small: shrink a photo for a form, merge two scans, rotate a page. Those are often private files, such as IDs, contracts and medical papers, and I never liked uploading them to a server just to get them back a few seconds later. Intera Tools is built around that. These are the rules I set for it, and where each one has a cost.",
    takeaways: [
      "Your files are processed by your own browser and are never uploaded. You can check this yourself in the browser's network panel.",
      "There is no account. Recent tools, favorites and presets are stored in your browser and are never sent to me.",
      "Limits are real numbers: up to 100 images of 50 MB each, or 50 PDFs of 200 MB each, because everything runs in your device's memory.",
      "Features the browser can't do well, such as true PDF compression, are left out and explained instead of being faked.",
    ],
    body: [
      { type: "h2", text: "1. Files stay in your browser" },
      {
        type: "p",
        text: "When you add a file, the page reads it in your browser. Images are drawn and re-encoded with the browser's own image tools, and PDFs are taken apart and rebuilt by a PDF library that runs inside the page. The result is created on your device and saved straight to your downloads. There is no server step in between, so there is no copy for me to keep, lose or leak.",
      },
      {
        type: "p",
        text: "You don't have to take my word for it. Open your browser's developer tools (F12 on Windows, Option+Command+I on a Mac), go to the **Network** tab, then run a tool. You'll see requests for ads and analytics, but no request that carries your file. [How browser-based processing works](/guides/browser-based-file-processing) explains the details.",
      },
      {
        type: "note",
        tone: "warning",
        title: "The cost",
        text: "Your device does the work, so a large batch on an old phone is slower than it would be on a server, and very large files can run out of memory. That's why the limits below exist.",
      },

      { type: "h2", text: "2. No account, and nothing about you on my side" },
      {
        type: "p",
        text: "There is no sign-up because there is nothing to sign up for. The conveniences that usually need an account are kept in your own browser instead:",
      },
      {
        type: "ul",
        items: [
          "Recently used tools and favorites",
          "Workflow settings and presets you saved",
          "Light or dark theme, and the language you picked",
        ],
      },
      {
        type: "p",
        text: "Clearing your browser's site data removes all of it, and it never syncs between devices. That's the trade-off: no account to lose, but no history on your other computer either. The [privacy policy](/privacy) lists every item.",
      },

      { type: "h2", text: "3. Limits are written as numbers" },
      {
        type: "table",
        head: ["Files", "Per batch", "Per file"],
        rows: [
          ["Images (JPG, PNG, WebP, GIF, BMP, AVIF, SVG, HEIC in Safari)", "Up to 100", "Up to 50 MB"],
          ["PDFs", "Up to 50", "Up to 200 MB"],
        ],
      },
      {
        type: "p",
        text: "An earlier version of a page said \"unlimited\". It wasn't true, and I removed it when I [tested every tool](/guides/testing-every-tool). If a file goes over a limit, the tool tells you which file and why, rather than failing silently.",
      },

      { type: "h2", text: "4. Missing features are explained, not faked" },
      {
        type: "p",
        text: "Some things are hard to do well inside a browser. Rather than offer a button that produces a bad result, I leave the feature out and say so:",
      },
      {
        type: "ul",
        items: [
          "**There is no PDF compressor.** In a browser, the practical way to shrink a PDF is to turn every page into a picture. That makes text unselectable, and a document that is mostly text barely shrinks or even grows. [Reduce PDF file size](/guides/reduce-pdf-file-size) covers what does work.",
          "**HEIC photos only open in Safari**, because other browsers can't decode them. Elsewhere you get a clear \"can't open this image\" error, and the tool pages state the limitation up front.",
          "**Safari can't create WebP files.** There, WebP output is turned off, and workflows save JPG and tell you.",
        ],
      },

      { type: "h2", text: "5. Numbers are measured or sourced" },
      {
        type: "p",
        text: "When a page says how much a setting saves, the number comes from running this site's own tools on real files. [Image compression levels tested](/guides/image-compression-levels-tested) shows the method and the photos. Facts from outside, such as passport photo sizes or social media dimensions, link to the official page they came from. When I couldn't find an official number, for example the upload limit of a particular job site, I left it out rather than guess.",
      },

      { type: "h2", text: "6. How the site pays for itself" },
      {
        type: "p",
        text: "The tools are free and paid for by Google AdSense ads. AdSense places the ads automatically, so I don't hand-pick every position. If an ad ever covers a button or the file area on your screen, please tell me through the [contact page](/contact) and I'll change the settings. The host, Cloudflare, also records anonymous page statistics without cookies. Neither of them can see your files, because your files never reach the site.",
      },
    ],
    faq: [
      {
        q: "If nothing is uploaded, why does the page need the internet?",
        a: "The page itself, its scripts and the ads come from the web. Once a tool has loaded, the processing happens on your device. Some tools load an extra part, such as the PDF renderer, the first time you use them, so stay online until the tool is ready.",
      },
      {
        q: "Can I use Intera Tools for confidential documents?",
        a: "The files aren't uploaded, which removes the biggest risk of online converters. Your device and browser still matter: browser extensions can read pages you open, and downloaded files stay in your downloads folder until you delete them.",
      },
    ],
  },
  ko: {
    title: "업로드도 가입도 없는 파일 도구를 만들며 정한 원칙",
    metaTitle: "업로드·가입 없는 파일 도구의 운영 원칙",
    metaDescription:
      "Intera Tools 운영자가 직접 정리한 원칙입니다. 파일이 브라우저 밖으로 나가지 않는 이유, 기기에 저장되는 정보, 일부러 넣지 않은 기능, 사이트 운영비를 마련하는 방법을 설명합니다.",
    summary:
      "제가 이미지나 PDF로 하는 일은 대부분 사소합니다. 서류 제출용으로 사진 용량을 줄이고, 스캔본 두 개를 합치고, 페이지 하나를 돌리는 정도입니다. 그런데 그런 파일은 신분증, 계약서, 진료 서류처럼 민감한 경우가 많습니다. 몇 초 뒤에 돌려받을 파일을 굳이 남의 서버에 올리는 게 늘 꺼림칙했습니다. Intera Tools는 그 생각에서 출발했습니다. 사이트를 만들며 정한 원칙과, 그 원칙 때문에 감수하는 점을 함께 적어 둡니다.",
    takeaways: [
      "파일은 여러분의 브라우저가 직접 처리하며 업로드되지 않습니다. 브라우저의 네트워크 패널에서 직접 확인할 수 있습니다.",
      "계정이 없습니다. 최근 사용 도구, 즐겨찾기, 프리셋은 브라우저에 저장되고 저에게 전송되지 않습니다.",
      "제한은 숫자로 밝힙니다. 모든 처리가 기기 메모리에서 이루어지기 때문에 이미지는 100장·장당 50MB, PDF는 50개·파일당 200MB까지입니다.",
      "제대로 된 PDF 압축처럼 브라우저에서 잘 할 수 없는 기능은 흉내 내지 않고, 빼 두고 이유를 설명합니다.",
    ],
    body: [
      { type: "h2", text: "1. 파일은 브라우저 안에만 머문다" },
      {
        type: "p",
        text: "파일을 넣으면 페이지가 브라우저 안에서 그 파일을 읽습니다. 이미지는 브라우저에 내장된 이미지 기능으로 다시 그리고 저장하며, PDF는 페이지 안에서 실행되는 PDF 라이브러리가 분해하고 다시 조립합니다. 결과물은 여러분의 기기에서 만들어져 곧바로 다운로드 폴더에 저장됩니다. 중간에 서버를 거치지 않으니 제가 보관하거나 잃어버리거나 유출할 사본 자체가 없습니다.",
      },
      {
        type: "p",
        text: "제 말을 믿으실 필요는 없습니다. 브라우저의 개발자 도구(Windows는 F12, Mac은 Option+Command+I)를 열고 **네트워크(Network)** 탭으로 간 뒤 도구를 실행해 보세요. 광고와 통계 요청은 보이지만, 파일을 담아 보내는 요청은 없습니다. 자세한 원리는 [브라우저에서 파일을 처리하는 방식](/guides/browser-based-file-processing)에 정리해 두었습니다.",
      },
      {
        type: "note",
        tone: "warning",
        title: "감수하는 점",
        text: "작업을 여러분의 기기가 하기 때문에, 오래된 휴대폰에서 많은 파일을 처리하면 서버보다 느립니다. 아주 큰 파일은 메모리가 부족해질 수도 있습니다. 아래의 제한은 그래서 있습니다.",
      },

      { type: "h2", text: "2. 계정이 없고, 제 쪽에는 여러분에 대한 정보가 없다" },
      {
        type: "p",
        text: "가입할 대상이 없으니 가입도 없습니다. 보통 계정이 있어야 하는 편의 기능은 대신 여러분의 브라우저에 저장됩니다.",
      },
      {
        type: "ul",
        items: [
          "최근 사용한 도구와 즐겨찾기",
          "저장한 워크플로 설정과 프리셋",
          "밝은·어두운 테마, 선택한 언어",
        ],
      },
      {
        type: "p",
        text: "브라우저의 사이트 데이터를 지우면 모두 사라지고, 다른 기기와 동기화되지도 않습니다. 잃어버릴 계정이 없는 대신 다른 컴퓨터에서는 기록을 이어 볼 수 없다는 뜻입니다. 저장되는 항목은 [개인정보처리방침](/privacy)에 모두 적어 두었습니다.",
      },

      { type: "h2", text: "3. 제한은 숫자로 쓴다" },
      {
        type: "table",
        head: ["파일", "한 번에", "파일당"],
        rows: [
          ["이미지(JPG, PNG, WebP, GIF, BMP, AVIF, SVG, Safari에서는 HEIC)", "최대 100장", "최대 50MB"],
          ["PDF", "최대 50개", "최대 200MB"],
        ],
      },
      {
        type: "p",
        text: "예전 설명 중에는 '무제한'이라고 쓴 페이지가 있었습니다. 사실이 아니어서 [모든 도구를 테스트하면서](/guides/testing-every-tool) 지웠습니다. 제한을 넘는 파일이 있으면 도구가 조용히 실패하지 않고, 어떤 파일이 왜 안 되는지 알려 줍니다.",
      },

      { type: "h2", text: "4. 없는 기능은 흉내 내지 않고 설명한다" },
      {
        type: "p",
        text: "브라우저 안에서 잘 해내기 어려운 일이 있습니다. 나쁜 결과를 내는 버튼을 두느니 기능을 빼고 그 사실을 밝히기로 했습니다.",
      },
      {
        type: "ul",
        items: [
          "**PDF 압축 기능이 없습니다.** 브라우저에서 PDF를 줄이는 현실적인 방법은 모든 페이지를 그림으로 바꾸는 것뿐인데, 그러면 글자를 선택할 수 없게 되고, 글자 위주 문서는 거의 줄지 않거나 오히려 커집니다. 실제로 효과가 있는 방법은 [PDF 용량 줄이기](/guides/reduce-pdf-file-size)에 정리했습니다.",
          "**HEIC 사진은 Safari에서만 열립니다.** 다른 브라우저는 HEIC를 해석하지 못해서 '이미지를 열 수 없다'는 오류가 뜹니다. 이 제한은 도구 설명에 미리 적어 두었습니다.",
          "**Safari는 WebP 파일을 만들 수 없습니다.** Safari에서는 WebP 저장 옵션이 꺼지고, 워크플로는 JPG로 저장한 뒤 알려 줍니다.",
        ],
      },

      { type: "h2", text: "5. 숫자는 직접 재거나 출처를 단다" },
      {
        type: "p",
        text: "어떤 설정으로 용량이 얼마나 줄어드는지 적을 때는 이 사이트의 도구로 실제 파일을 처리해서 잰 값을 씁니다. 측정 방법과 사진은 [이미지 압축 강도 실측 비교](/guides/image-compression-levels-tested)에 공개했습니다. 여권 사진 규격이나 SNS 이미지 크기처럼 외부 사실은 원래 출처인 공식 페이지를 링크합니다. 특정 채용 사이트의 업로드 한도처럼 공식 수치를 찾지 못한 경우에는 짐작해서 쓰지 않고 뺐습니다.",
      },

      { type: "h2", text: "6. 운영비는 이렇게 마련한다" },
      {
        type: "p",
        text: "도구는 무료이고, 운영비는 Google AdSense 광고로 충당합니다. 광고 위치는 AdSense가 자동으로 정하기 때문에 제가 하나하나 고르지는 않습니다. 광고가 버튼이나 파일 영역을 가리는 화면을 보셨다면 [문의 페이지](/contact)로 알려 주세요. 설정을 바꾸겠습니다. 호스팅 업체인 Cloudflare도 쿠키 없이 익명 방문 통계를 기록합니다. 둘 다 여러분의 파일은 볼 수 없습니다. 파일이 사이트에 도달하지 않기 때문입니다.",
      },
    ],
    faq: [
      {
        q: "업로드하지 않는다면 왜 인터넷 연결이 필요한가요?",
        a: "페이지 자체와 스크립트, 광고는 웹에서 받아 옵니다. 도구가 한 번 불러와진 뒤에는 처리가 여러분의 기기에서 이루어집니다. PDF 렌더러처럼 처음 쓸 때 추가로 불러오는 부분이 있으니, 도구가 준비될 때까지는 연결을 유지해 주세요.",
      },
      {
        q: "기밀 문서에 써도 되나요?",
        a: "파일이 업로드되지 않으므로 온라인 변환기의 가장 큰 위험은 없습니다. 다만 기기와 브라우저 환경은 여전히 중요합니다. 브라우저 확장 프로그램은 여러분이 연 페이지를 읽을 수 있고, 내려받은 파일은 지우기 전까지 다운로드 폴더에 남아 있습니다.",
      },
    ],
  },
};

export default guide;
