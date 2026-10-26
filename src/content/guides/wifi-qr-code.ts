import type { Locale } from "../../i18n/config";
import type { GuideContent } from "../types";

const guide: Record<Locale, GuideContent> = {
  en: {
    title: "How to Make a Wi-Fi QR Code Guests Can Scan to Connect",
    metaTitle: "Wi-Fi QR Code: Format, Phone Support and Printing Tips",
    metaDescription:
      "Make a Wi-Fi QR code that phones join with one scan: the WIFI: text format, which phones read it natively, security trade-offs and how to print it reliably.",
    summary:
      "A Wi-Fi QR code saves guests from typing a long password: they point their camera at it and tap to join. The code is simpler than it looks. It holds a short line of text with your network name and password. This guide explains that format, which phones read it without an app, what it means for security, and how to print a code that scans on the first try.",
    takeaways: [
      "A Wi-Fi QR code contains plain text such as `WIFI:T:WPA;S:CafeGuest;P:espresso42;;`, including the password, unencrypted.",
      "The iPhone Camera app reads Wi-Fi codes (since iOS 11), and so does Android 10 and later from Wi-Fi settings, with many camera apps and Google Lens too.",
      "Anyone who can photograph the code can read the password, so print codes for a guest network, not your main one.",
      "For print, use a dark code on a light background, keep the quiet zone, download SVG or a large PNG, and test from where people will actually stand.",
    ],
    body: [
      { type: "h2", text: "What a Wi-Fi QR code contains" },
      {
        type: "p",
        text: "The QR code standard itself has no Wi-Fi feature. Wi-Fi codes follow a text convention documented by the open-source ZXing barcode project. Both iOS and Android recognize it. A typical code contains:",
      },
      { type: "p", text: "`WIFI:T:WPA;S:CafeGuest;P:espresso42;;`" },
      {
        type: "table",
        caption: "Fields in a Wi-Fi QR code",
        head: ["Field", "Meaning", "What the Intera generator writes"],
        rows: [
          ["`T:`", "Security type", "`WPA` for **WPA/WPA2**, `WEP` for **WEP**, `nopass` for **None**"],
          ["`S:`", "Network name (SSID); required", "The name exactly as you typed it, with special characters escaped"],
          ["`P:`", "Password", "Left out when **Security** is **None**"],
          ["`H:`", "Hidden network", "`H:true` when **Hidden network** is switched on, otherwise omitted"],
        ],
      },
      {
        type: "p",
        text: "Each field ends with a semicolon, and the whole string ends with a second one. According to ZXing's documentation, the order of the fields doesn't matter to readers.",
      },
      { type: "h3", text: "Special characters are escaped automatically" },
      {
        type: "p",
        text: "Semicolons separate the fields, so a password such as `tea;time` would cut the string short. The ZXing format handles this with escaping: backslash, semicolon, comma, double quote and colon must each be preceded by a backslash. The Intera Tools generator does this for you. You type `tea;time`, and the code contains `tea\\;time`. Always enter the name and password exactly as they are.",
      },
      {
        type: "note",
        tone: "warning",
        title: "Test unusual passwords on both platforms",
        text: "Not every scanner app removes the escape backslashes correctly. If your network name or password contains `\\ ; , : \"`, scan the preview with both an iPhone and an Android phone before you print.",
      },
      { type: "h2", text: "Which phones can scan it" },
      {
        type: "ul",
        items: [
          "**iPhone and iPad:** the built-in Camera app has recognized Wi-Fi QR codes since iOS 11. Point the camera at the code and tap the prompt that appears to join.",
          "**Android 10 and later:** Wi-Fi settings can scan a network QR code, usually from a QR icon next to the option for adding a network, and can show your current network as a QR code. Many camera apps and Google Lens also recognize Wi-Fi codes. Menu names vary by manufacturer.",
          "**Older Android phones:** need a QR scanner app that supports Wi-Fi codes.",
          "**Laptops:** generally can't join from a QR code, so print the network name and password in text as well for people who need to type them.",
        ],
      },
      { type: "h2", text: "Making the code, step by step" },
      {
        type: "steps",
        items: [
          {
            title: "Choose Wi-Fi",
            body: "Open the [QR Code Generator](/qr-code-generator) and select **Wi-Fi** under **Content type**.",
          },
          {
            title: "Enter the network name",
            body: "Type the **Network name (SSID)** exactly as it appears in your phone's Wi-Fi list. Capital letters, spaces and symbols all count.",
          },
          {
            title: "Pick the security type",
            body: "Under **Security**, choose **WPA/WPA2** for almost any current router, **WEP** only for very old equipment, or **None** for an open network. With **None**, the password field disappears.",
          },
          {
            title: "Add the password",
            body: "Type the **Password**. Switch on **Hidden network** only if your router doesn't broadcast its name; otherwise leave it off.",
          },
          {
            title: "Adjust the design",
            body: "Under **Design**, set **Foreground** and **Background**, **Error correction**, **Quiet zone** and **Size**. The preview updates as you type.",
          },
          {
            title: "Test, then download",
            body: "Scan the preview on screen with your phone. Then use **Download PNG**, which uses the chosen **Size** of 256 to 2048 pixels, or **Download SVG**, a vector file that stays sharp at any print size. **Copy image** puts a PNG on your clipboard.",
          },
        ],
      },
      { type: "tool", slug: "qr-code-generator", text: "Create a Wi-Fi QR code in your browser. The password is never sent to a server." },
      { type: "h2", text: "Security: the code is the password" },
      {
        type: "p",
        text: "A Wi-Fi QR code isn't encrypted. Anyone who scans it, or decodes it from a photo of your wall, can read the password in plain text. The code generated here is static: it has no expiry, tracking or redirect, and it keeps working until you change the network name or password.",
      },
      {
        type: "ul",
        items: [
          "**Use a guest network for codes you display.** Many routers offer a separate guest network that keeps visitors off the network where your computers, printers and file storage are.",
          "**Don't post a photo of the code**, for example a fridge sticker in a social media story. It reveals the password just as well as the printed code does.",
          "**Plan for password changes.** When you change the password, every printed code stops working and needs reprinting.",
          "**Avoid WEP.** It is outdated and easy to break. A QR code doesn't make a WEP network any safer.",
        ],
      },
      {
        type: "p",
        text: "The code is generated entirely in your browser. Intera Tools doesn't receive the network name or password, and its anonymous usage statistics never include text you type.",
      },
      { type: "h2", text: "Printing a code that scans reliably" },
      {
        type: "ul",
        items: [
          "**Contrast:** use a dark code on a light background. Some scanners can't read inverted codes (light on dark). The generator warns you when contrast is low or the foreground is lighter than the background.",
          "**Quiet zone:** this is the blank border scanners use to find the code. The QR standard calls for 4 modules (squares). The default here is 2, which works on a plain white page; raise it to 4 if the code sits on a colored or busy background or close to the edge of a card.",
          "**Error correction:** L, M, Q and H let roughly 7%, 15%, 25% and 30% of the code be damaged and still scan. Higher levels add more squares, so the same text makes a denser code. M suits a framed or laminated card; Q or H suits a sticker that may get scratched or dirty.",
          "**Sharpness:** SVG scales to any size without blurring. If you use PNG, download it at a large **Size** rather than enlarging a small file in a word processor.",
          "**Physical size:** a code that is too small for the distance it is scanned from is the most common failure. Print a test copy and scan it from where guests will actually stand or sit.",
        ],
      },
      {
        type: "note",
        tone: "tip",
        text: "Next to the code, add a line such as \"Scan with your camera to join\" and the network name. People recognize the code faster, and those whose phones can't scan it can still connect manually.",
      },
    ],
    faq: [
      {
        q: "Do guests need an app to scan a Wi-Fi QR code?",
        a: "Usually not. The iPhone Camera app reads Wi-Fi codes on iOS 11 and later, and Android 10 and later can scan them from Wi-Fi settings, with many camera apps and Google Lens too. Only older Android phones need a separate scanner app.",
      },
      {
        q: "Does a Wi-Fi QR code expire?",
        a: "No. It is static text, so it works until you change the network name, password or security type. Then you need a new code.",
      },
      {
        q: "My router uses WPA3. Which option should I choose?",
        a: "There is no separate WPA3 option. Choose WPA/WPA2 and test the code with the phones your guests are likely to use. Older devices without WPA3 support can't join a WPA3-only network at all, with or without a QR code.",
      },
      {
        q: "Can someone get my password from the QR code?",
        a: "Yes. The password is stored as plain text, and any QR reader can display it. That's why codes on display should point to a guest network.",
      },
      {
        q: "Is my Wi-Fi password sent anywhere when I make the code?",
        a: "No. The code is created in your browser, and the network name and password aren't sent to Intera Tools or anyone else.",
      },
    ],
    sources: [
      { label: "ZXing wiki: Barcode Contents (Wi-Fi network config)", url: "https://github.com/zxing/zxing/wiki/Barcode-Contents" },
      { label: "Apple Support: Scan a QR code with your iPhone or iPad", url: "https://support.apple.com/en-us/102680" },
      { label: "Android Help: Connect to Wi-Fi networks (share by QR code)", url: "https://support.google.com/android/answer/9075847" },
      { label: "Android Open Source Project: Wi-Fi Easy Connect (Android 10)", url: "https://source.android.com/docs/core/connect/wifi-easy-connect" },
      { label: "DENSO WAVE: QR Code error correction levels", url: "https://www.qrcode.com/en/about/error_correction.html" },
      { label: "DENSO WAVE: QR Code quiet zone (margin)", url: "https://www.qrcode.com/en/howto/code.html" },
    ],
  },
  ko: {
    title: "와이파이 QR 코드 만들기: 찍기만 하면 연결되는 손님용 QR",
    metaTitle: "와이파이 QR 코드 만들기와 인쇄 요령",
    metaDescription:
      "카메라로 찍으면 바로 연결되는 와이파이 QR 코드 만드는 법. WIFI: 문자열 형식, 앱 없이 인식되는 휴대폰, 보안상 주의할 점, 손님 휴대폰에서 한 번에 인식되도록 인쇄하는 요령을 정리했습니다.",
    summary:
      "와이파이 QR 코드가 있으면 손님이 긴 비밀번호를 입력할 필요 없이 카메라를 대고 눌러서 바로 연결할 수 있습니다. 원리는 생각보다 단순해서, 네트워크 이름과 비밀번호가 담긴 짧은 문자열 한 줄이 들어 있을 뿐입니다. 이 글에서는 그 형식과 앱 없이 인식되는 휴대폰, 보안상 알아 둘 점, 한 번에 인식되도록 인쇄하는 방법을 설명합니다.",
    takeaways: [
      "와이파이 QR 코드에는 `WIFI:T:WPA;S:CafeGuest;P:espresso42;;`처럼 비밀번호를 포함한 평문이 암호화 없이 들어 있습니다.",
      "아이폰 기본 카메라(iOS 11 이상)와 안드로이드 10 이상의 Wi-Fi 설정에서 인식되며, 상당수 카메라 앱과 Google 렌즈도 인식합니다.",
      "코드를 사진으로 찍을 수 있는 사람은 누구나 비밀번호를 알 수 있으므로, 인쇄해 붙이는 코드는 메인 네트워크 말고 게스트 네트워크로 만드세요.",
      "인쇄할 때는 밝은 배경에 어두운 코드를 쓰고, 여백을 지키고, SVG나 큰 PNG로 받아, 실제로 찍을 거리에서 시험해 보세요.",
    ],
    body: [
      { type: "h2", text: "와이파이 QR 코드에 들어 있는 내용" },
      {
        type: "p",
        text: "QR 코드 표준 자체에는 와이파이 기능이 없습니다. 와이파이 QR 코드는 오픈 소스 바코드 프로젝트인 ZXing이 문서로 정리한 문자열 규칙을 따르고, iOS와 안드로이드가 모두 이 규칙을 인식합니다. 보통 아래와 같은 내용이 들어갑니다.",
      },
      { type: "p", text: "`WIFI:T:WPA;S:CafeGuest;P:espresso42;;`" },
      {
        type: "table",
        caption: "와이파이 QR 코드의 항목",
        head: ["항목", "의미", "Intera 생성기가 넣는 값"],
        rows: [
          ["`T:`", "보안 방식", "**WPA/WPA2**는 `WPA`, **WEP**은 `WEP`, **없음**은 `nopass`"],
          ["`S:`", "네트워크 이름(SSID), 필수", "입력한 이름 그대로이며, 특수 문자는 이스케이프 처리"],
          ["`P:`", "비밀번호", "**보안 방식**이 **없음**이면 생략"],
          ["`H:`", "숨겨진 네트워크", "**숨겨진 네트워크**를 켜면 `H:true`, 끄면 생략"],
        ],
      },
      {
        type: "p",
        text: "각 항목은 세미콜론으로 끝나고, 전체 문자열은 세미콜론 하나로 한 번 더 끝납니다. ZXing 문서에 따르면 읽는 쪽에서는 항목 순서를 따지지 않습니다.",
      },
      { type: "h3", text: "특수 문자는 자동으로 처리됩니다" },
      {
        type: "p",
        text: "세미콜론이 항목을 구분하기 때문에 `tea;time` 같은 비밀번호는 그대로 넣으면 중간에서 끊깁니다. ZXing 형식에서는 백슬래시, 세미콜론, 쉼표, 큰따옴표, 콜론 앞에 백슬래시를 붙여 이 문제를 해결합니다. Intera Tools 생성기가 이 작업을 대신 해 주므로, `tea;time`을 입력하면 코드에는 `tea\\;time`이 들어갑니다. 이름과 비밀번호는 항상 실제 그대로 입력하세요.",
      },
      {
        type: "note",
        tone: "warning",
        title: "특수 문자가 있다면 두 플랫폼에서 시험하세요",
        text: "모든 스캐너 앱이 이스케이프용 백슬래시를 제대로 지우는 것은 아닙니다. 네트워크 이름이나 비밀번호에 `\\ ; , : \"`가 들어 있다면, 인쇄하기 전에 아이폰과 안드로이드 휴대폰으로 미리보기를 각각 찍어 보세요.",
      },
      { type: "h2", text: "어떤 휴대폰에서 인식될까" },
      {
        type: "ul",
        items: [
          "**아이폰·아이패드:** 기본 카메라 앱이 iOS 11부터 와이파이 QR 코드를 인식합니다. 카메라를 코드에 대고 화면에 나타나는 안내를 누르면 연결됩니다.",
          "**안드로이드 10 이상:** Wi-Fi 설정에서 네트워크 QR 코드를 스캔할 수 있습니다. 보통 네트워크 추가 항목 옆의 QR 아이콘을 누르면 되며, 현재 연결된 네트워크를 QR 코드로 보여 줄 수도 있습니다. 상당수 카메라 앱과 Google 렌즈도 와이파이 코드를 인식합니다. 메뉴 이름은 제조사마다 다릅니다.",
          "**구형 안드로이드 휴대폰:** 와이파이 코드를 지원하는 QR 스캐너 앱이 필요합니다.",
          "**노트북:** 대부분 QR 코드로 연결할 수 없으므로, 직접 입력해야 하는 사람을 위해 네트워크 이름과 비밀번호를 글자로도 적어 두세요.",
        ],
      },
      { type: "h2", text: "코드 만드는 순서" },
      {
        type: "steps",
        items: [
          {
            title: "Wi-Fi 선택",
            body: "[QR 코드 생성기](/qr-code-generator)를 열고 **내용 종류**에서 **Wi-Fi**를 고릅니다.",
          },
          {
            title: "네트워크 이름 입력",
            body: "휴대폰의 Wi-Fi 목록에 보이는 그대로 **네트워크 이름(SSID)**을 입력합니다. 대소문자, 띄어쓰기, 기호까지 모두 같아야 합니다.",
          },
          {
            title: "보안 방식 선택",
            body: "**보안 방식**은 요즘 공유기라면 거의 **WPA/WPA2**입니다. **WEP**은 아주 오래된 장비에만, **없음**은 비밀번호 없는 네트워크에만 고르세요. **없음**을 고르면 비밀번호 칸이 사라집니다.",
          },
          {
            title: "비밀번호 입력",
            body: "**비밀번호**를 입력합니다. **숨겨진 네트워크**는 공유기가 이름을 숨기도록 설정된 경우에만 켜고, 그렇지 않으면 꺼 두세요.",
          },
          {
            title: "디자인 조정",
            body: "**디자인**에서 **코드 색상**과 **배경 색상**, **오류 복원 수준**, **여백(Quiet zone)**, **크기**를 정합니다. 입력하는 대로 미리보기가 바로 바뀝니다.",
          },
          {
            title: "시험한 뒤 다운로드",
            body: "화면의 미리보기를 휴대폰으로 찍어 연결되는지 확인합니다. 그다음 **PNG 다운로드**(지정한 **크기** 256~2048픽셀)나 **SVG 다운로드**(어떤 크기로 인쇄해도 선명한 벡터 파일)를 누르세요. **이미지 복사**를 누르면 PNG가 클립보드에 복사됩니다.",
          },
        ],
      },
      { type: "tool", slug: "qr-code-generator", text: "브라우저에서 와이파이 QR 코드를 만듭니다. 비밀번호는 서버로 전송되지 않습니다." },
      { type: "h2", text: "보안: 코드가 곧 비밀번호입니다" },
      {
        type: "p",
        text: "와이파이 QR 코드는 암호화되어 있지 않습니다. 코드를 찍거나, 벽에 붙은 코드를 찍은 사진을 해독한 사람이면 누구나 비밀번호를 평문으로 볼 수 있습니다. 여기서 만드는 코드는 정적 코드라서 만료, 추적, 리디렉션이 없고, 네트워크 이름이나 비밀번호를 바꾸기 전까지 계속 작동합니다.",
      },
      {
        type: "ul",
        items: [
          "**걸어 두는 코드는 게스트 네트워크로 만드세요.** 많은 공유기가 별도의 게스트 네트워크를 제공해, 손님이 PC·프린터·저장 장치가 연결된 네트워크에 들어오지 못하게 해 줍니다.",
          "**코드가 찍힌 사진을 올리지 마세요.** 냉장고에 붙인 스티커가 SNS 스토리에 찍혀도 인쇄된 코드를 보여 준 것과 마찬가지로 비밀번호가 드러납니다.",
          "**비밀번호 변경에 대비하세요.** 비밀번호를 바꾸면 인쇄해 둔 코드는 모두 쓸 수 없게 되어 다시 인쇄해야 합니다.",
          "**WEP은 피하세요.** 오래되어 쉽게 뚫리는 방식이며, QR 코드를 만든다고 더 안전해지지는 않습니다.",
        ],
      },
      {
        type: "p",
        text: "코드는 전부 브라우저 안에서 만들어집니다. Intera Tools는 네트워크 이름이나 비밀번호를 받지 않으며, 익명 이용 통계에도 사용자가 입력한 텍스트는 절대 포함되지 않습니다.",
      },
      { type: "h2", text: "잘 인식되게 인쇄하는 요령" },
      {
        type: "ul",
        items: [
          "**대비:** 밝은 배경에 어두운 코드를 쓰세요. 색을 반전한 코드(어두운 배경에 밝은 코드)는 일부 스캐너가 읽지 못합니다. 대비가 낮거나 코드 색이 배경보다 밝으면 생성기가 경고를 띄웁니다.",
          "**여백(Quiet zone):** 스캐너가 코드를 찾을 때 쓰는 빈 테두리입니다. QR 표준은 모듈(작은 사각형) 4칸 너비를 요구합니다. 여기서는 기본값이 2로, 흰 종이에 인쇄하면 충분합니다. 하지만 색이 있거나 복잡한 배경 위, 또는 카드 가장자리 가까이에 둔다면 4로 올리세요.",
          "**오류 복원 수준:** L, M, Q, H는 코드의 약 7%, 15%, 25%, 30%가 손상되어도 읽힐 수 있게 합니다. 수준을 높이면 사각형이 늘어나 같은 내용이라도 코드가 더 촘촘해집니다. 액자나 코팅한 카드라면 M으로 충분하고, 긁히거나 더러워질 수 있는 스티커라면 Q나 H가 좋습니다.",
          "**선명도:** SVG는 어떤 크기로 키워도 흐려지지 않습니다. PNG를 쓴다면 작은 파일을 문서 프로그램에서 늘리지 말고, 처음부터 **크기**를 크게 정해 받으세요.",
          "**실제 크기:** 인식이 안 되는 가장 흔한 원인은 찍는 거리에 비해 코드가 너무 작은 경우입니다. 시험 인쇄를 한 뒤 손님이 실제로 서거나 앉는 자리에서 찍어 보세요.",
        ],
      },
      {
        type: "note",
        tone: "tip",
        text: "코드 옆에 '카메라로 찍으면 와이파이에 연결됩니다' 같은 안내 문구와 네트워크 이름을 함께 적어 두세요. 손님이 코드를 더 빨리 알아보고, 스캔이 안 되는 기기는 직접 연결할 수 있습니다.",
      },
    ],
    faq: [
      {
        q: "와이파이 QR 코드를 찍으려면 앱이 필요한가요?",
        a: "대부분 필요 없습니다. 아이폰은 iOS 11 이상의 기본 카메라 앱이, 안드로이드는 10 이상의 Wi-Fi 설정이 인식하며, 상당수 카메라 앱과 Google 렌즈도 인식합니다. 구형 안드로이드 휴대폰만 별도의 스캐너 앱이 필요합니다.",
      },
      {
        q: "와이파이 QR 코드에 유효 기간이 있나요?",
        a: "없습니다. 정적인 문자열이라 네트워크 이름, 비밀번호, 보안 방식을 바꾸기 전까지 계속 작동합니다. 바꿨다면 새 코드를 만들어야 합니다.",
      },
      {
        q: "공유기가 WPA3를 쓰는데 어떤 옵션을 골라야 하나요?",
        a: "WPA3 옵션은 따로 없습니다. WPA/WPA2를 고르고, 손님들이 주로 쓸 만한 휴대폰으로 시험해 보세요. WPA3를 지원하지 않는 구형 기기는 QR 코드와 상관없이 WPA3 전용 네트워크에 연결할 수 없습니다.",
      },
      {
        q: "QR 코드로 비밀번호를 알아낼 수 있나요?",
        a: "그렇습니다. 비밀번호가 평문으로 들어 있어 QR 리더라면 누구나 내용을 볼 수 있습니다. 걸어 두는 코드는 게스트 네트워크로 만들어야 하는 이유입니다.",
      },
      {
        q: "코드를 만들 때 와이파이 비밀번호가 어딘가로 전송되나요?",
        a: "아닙니다. 코드는 브라우저 안에서 만들어지며, 네트워크 이름과 비밀번호는 Intera Tools를 포함해 어디로도 전송되지 않습니다.",
      },
    ],
    sources: [
      { label: "ZXing 위키: 바코드 내용 형식(Wi-Fi 설정)", url: "https://github.com/zxing/zxing/wiki/Barcode-Contents" },
      { label: "Apple 지원: iPhone 또는 iPad로 QR 코드 스캔하기", url: "https://support.apple.com/en-us/102680" },
      { label: "Android 고객센터: Wi-Fi 네트워크 연결(QR 코드로 공유)", url: "https://support.google.com/android/answer/9075847" },
      { label: "Android 오픈소스 프로젝트: Wi-Fi Easy Connect(Android 10)", url: "https://source.android.com/docs/core/connect/wifi-easy-connect" },
      { label: "DENSO WAVE: QR 코드 오류 복원 수준", url: "https://www.qrcode.com/en/about/error_correction.html" },
      { label: "DENSO WAVE: QR 코드 여백(Quiet zone)", url: "https://www.qrcode.com/en/howto/code.html" },
    ],
  },
};

export default guide;
