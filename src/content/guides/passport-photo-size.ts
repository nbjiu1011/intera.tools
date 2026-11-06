import type { Locale } from "../../i18n/config";
import type { GuideContent } from "../types";

const guide: Record<Locale, GuideContent> = {
  en: {
    title: "Passport Photo Size: From Centimetres to the Right Pixel File",
    metaTitle: "Passport Photo Size in Pixels: Crop and Resize Correctly",
    metaDescription:
      "Turn an official passport photo size into pixels: 3.5 × 4.5 cm is 413 × 531 px at 300 DPI. Official specs for Korea, the UK and the US, and how to crop to 7:9.",
    summary:
      "Passport offices define photos in centimetres or inches, but online applications ask for a file. This guide shows how to get from one to the other: read the physical size, turn it into an aspect ratio, then into pixels at a given DPI. It lists the official specs we could check for Korea, the UK and the US, and walks through cropping and resizing a photo to an exact size in Intera Tools, including where that is the wrong thing to do.",
    takeaways: [
      "Pixels = size in inches × DPI, and inches = mm ÷ 25.4. Korea's 3.5 × 4.5 cm photo at 300 DPI is exactly the 413 × 531 px that the Korean passport site recommends.",
      "3.5 × 4.5 cm is a 7:9 ratio. Intera's Crop Image has no 7:9 preset, so use Free and type a width and height such as 700 × 900; the 4:5 preset is close but wrong.",
      "Head size matters as much as frame size. In a Korean photo the crown-to-chin length must be 3.2–3.6 cm of the 4.5 cm height, roughly 71–80%.",
      "The UK online service tells you not to crop at all. Always follow the country's own instructions.",
      "Intera only changes pixels and file size. It cannot check background, lighting, expression or any other rule, and rules change, so confirm on the official site.",
    ],
    body: [
      { type: "h2", text: "Start from the official size, not from a pixel number" },
      {
        type: "p",
        text: "Pixel sizes you find on random websites are often copied from another country or another document. The reliable path is to take the physical size from the government page and convert it yourself. That gives you three numbers to work with: the **aspect ratio** (the shape of the photo), the **pixel dimensions** (how many pixels wide and tall at a given DPI), and the **head size** (how much of the frame the head must fill).",
      },
      {
        type: "table",
        caption: "Checked on the official sites on 6 November 2026. Rules change; confirm on the official page before you apply.",
        head: ["Country", "Printed photo", "Head size", "Digital file for online applications", "How recent"],
        rows: [
          ["South Korea (passport.go.kr)", "3.5 × 4.5 cm", "3.2–3.6 cm from crown (excluding hair) to chin", "Online renewal: JPG/JPEG, 500 KB or less, 413 × 531 px recommended (uploads accepted between 395–431 px wide and 507–550 px tall), 300 DPI recommended", "Taken within 6 months"],
          ["United Kingdom (GOV.UK)", "45 mm high × 35 mm wide", "29–34 mm", "At least 600 px wide and 750 px tall, 50 KB to 10 MB. Do not crop the photo; the service crops it", "Taken in the last month"],
          ["United States (travel.state.gov)", "2 × 2 in (51 × 51 mm)", "See the official page", "Separate requirements for online renewal and for visa photos; check the page for your application", "See the official page"],
        ],
      },

      { type: "h2", text: "From centimetres to pixels" },
      {
        type: "p",
        text: "One inch is exactly 25.4 mm, so the conversion is `pixels = mm ÷ 25.4 × DPI`. For the Korean photo at 300 DPI: 35 ÷ 25.4 × 300 = 413.4, and 45 ÷ 25.4 × 300 = 531.5 (531.496 before rounding). Rounded, that is **413 × 531 px**, the exact size the Korean passport site recommends. Its accepted range of 395–431 by 507–550 px allows a little slack, but the ratio still has to look right or the face ends up stretched.",
      },
      {
        type: "ul",
        items: [
          "**Korea, 3.5 × 4.5 cm:** ratio 7:9. At 300 DPI: 413 × 531 px. At 600 DPI: 827 × 1063 px.",
          "**United States, 2 × 2 in:** ratio 1:1. At 300 DPI: 600 × 600 px.",
          "**UK digital:** the minimum 600 × 750 px is a 4:5 shape, not the 7:9 of the printed photo, because the service crops the upload itself. That is one more reason not to pre-crop a UK photo.",
        ],
      },
      { type: "h3", text: "Head size as a share of the frame" },
      {
        type: "p",
        text: "Dividing the head size by the photo height gives a ratio that works at any pixel size. Korea: 3.2–3.6 cm out of 4.5 cm is **71–80%** of the height, with 3.4 cm (about 76%) in the middle. UK printed photo: 29–34 mm out of 45 mm is **64–76%**. If the crown-to-chin distance in your crop is outside that range, the photo will be rejected however perfect the pixel size is.",
      },

      { type: "h2", text: "Cropping and resizing to an exact size with Intera" },
      {
        type: "p",
        text: "This applies when the authority wants a file you crop yourself, such as Korea's online renewal, or when you are preparing a file to print at a photo shop. Start from a photo that already meets the rules (plain white or light background, even lighting, neutral expression); cropping cannot fix those.",
      },
      {
        type: "steps",
        items: [
          { title: "Open the photo in Crop Image and choose Free", body: "[Crop Image](/crop-image) handles one image at a time. Under **Aspect ratio**, pick **Free**. The presets are Free, 1:1, 4:3, 3:2, 16:9, 4:5 and 9:16; none of them is 7:9. The 4:5 preset (0.80) is close to 7:9 (0.78) but would make the photo slightly too wide." },
          { title: "Measure the head", body: "Drag the top edge of the box to the crown of the head (not the top of the hair) and the bottom edge to the chin. The **Height** field now shows the head length in pixels, for example 680." },
          { title: "Work out the crop size", body: "For Korea, divide the head length by 0.76 to get the crop height, then multiply the height by 7/9 for the width. A 680 px head gives 680 ÷ 0.76 ≈ 895, so use **Height 900** and **Width 700**. Type both values; in Free mode they are independent." },
          { title: "Position the box", body: "Set **X** and **Y** so the face is centred horizontally and the crown sits a little below the top edge. Click the box and use the arrow keys to nudge it 1 px at a time, or 10 px with Shift. Then crop. JPG files are saved as JPG (quality 95); PNG files stay PNG." },
          { title: "Resize to the exact pixels", body: "On the result, choose **Continue with** → Resize Image. Under **Resize by** keep **Pixels**, leave **Keep aspect ratio** on and type **413** as the **Width**; the height fills in as 531 because 700 × 900 is exactly 7:9. If it shows 530 or 532, your crop was a pixel off; the Korean range still accepts it, but you can redo the crop." },
          { title: "Check format and file size", body: "Resize Image saves JPGs at quality 92. A 413 × 531 px JPG is small, but check the size shown in the results against the limit (500 KB for Korea). If the file is a PNG, convert it to JPG with [PNG to JPG](/png-to-jpg). Only use [Compress Image](/compress-image) if you are still over the limit." },
        ],
      },
      {
        type: "note",
        tone: "warning",
        title: "What Intera cannot check",
        text: "Intera Tools only changes the frame, pixel count and file size. It does not detect faces, measure the head for you, check the background, glasses, lighting or expression, or confirm that a photo will be accepted. Korea also rejects photos whose background was removed or which were altered with filters or AI tools, and GOV.UK requires photos unaltered by software, so don't try to fix those problems by editing.",
      },
      {
        type: "tool",
        slug: "crop-image",
        text: "Crop one photo to exact pixel dimensions with the X, Y, Width and Height fields, then continue straight to Resize Image.",
      },

      { type: "h2", text: "When not to crop it yourself" },
      {
        type: "ul",
        items: [
          "**UK online applications:** GOV.UK says not to crop the photo because the service does it. Upload the full photo with head, shoulders and upper body, at least 600 × 750 px.",
          "**Korean passports:** passport.go.kr has its own **online passport photo size adjustment** tool (온라인 여권 사진 크기 조정) with a guide outline for the face, plus a **photo verification** check. It accepts JPG or PNG files under 1 MB. If a studio file is larger than that, resize it in Intera first and finish in the official tool.",
          "**When the photo studio already supplied a digital file** in the right size. Re-encoding it gains nothing.",
        ],
      },

      { type: "h2", text: "Mistakes that get photos rejected" },
      {
        type: "ul",
        items: [
          "**Stretching to fit.** Typing a width and a height that don't match the photo's ratio squashes the face. Korea lists faces flattened sideways or vertically by editing as a reason for rejection. Keep the ratio locked when resizing.",
          "**Enlarging a small photo.** Upscaling adds pixels but no detail. Korea rejects blurry, low-resolution photos reused from other documents. Intera's **Don’t enlarge smaller images** option is on by default for this reason.",
          "**Using an old photo.** Korea requires a photo taken within 6 months, the UK within the last month.",
          "**Cropping too tight or too loose.** The frame can be the right size while the head is too big or too small. Check the head ratio, not just the pixel numbers.",
        ],
      },
      {
        type: "p",
        text: "The same maths applies to any print job. For more on DPI and how many pixels you need for paper sizes, see [print resolution explained](/guides/print-resolution-dpi).",
      },
    ],
    faq: [
      {
        q: "What pixel size is a 3.5 × 4.5 cm photo?",
        a: "At 300 DPI it is 413 × 531 px (35 ÷ 25.4 × 300 and 45 ÷ 25.4 × 300, rounded). At 600 DPI it is 827 × 1063 px. The shape is always 7:9.",
      },
      {
        q: "Can I use the 4:5 crop preset for a passport photo?",
        a: "Not for 3.5 × 4.5 cm photos. 4:5 is 0.80 and 7:9 is about 0.78, so a 4:5 crop is slightly too wide. Choose Free and type the width and height in a 7:9 ratio, such as 700 × 900.",
      },
      {
        q: "Does changing the DPI in the file make a photo acceptable?",
        a: "No. Authorities judge the pixel dimensions, sharpness and composition. The DPI value stored in a file only tells software how large to print it; it doesn't add detail. Korea's 300 DPI recommendation is met by a 413 × 531 px image printed at 3.5 × 4.5 cm.",
      },
      {
        q: "Will Intera tell me whether my photo meets the rules?",
        a: "No. It crops, resizes and compresses in your browser without uploading the photo, but it does not check faces, backgrounds or any other requirement. Use the official verification tool where one exists, such as the one on passport.go.kr, and confirm the current rules on the official site.",
      },
    ],
    sources: [
      { label: "Korea Ministry of Foreign Affairs – Passport photo requirements (2022.10 revision)", url: "https://www.passport.go.kr/home/kor/contents.do?menuPos=32" },
      { label: "Korea Ministry of Foreign Affairs – Photo files for online renewal", url: "https://www.passport.go.kr/home/kor/contents.do?menuPos=12" },
      { label: "Korea Ministry of Foreign Affairs – Online passport photo size adjustment", url: "https://www.passport.go.kr/home/kor/photoVerify/index.do?menuPos=34" },
      { label: "GOV.UK – Rules for digital passport photos", url: "https://www.gov.uk/photos-for-passports/rules-for-digital-photos" },
      { label: "GOV.UK – Printed passport photos", url: "https://www.gov.uk/photos-for-passports/photo-requirements" },
      { label: "U.S. Department of State – Passport photos", url: "https://travel.state.gov/en/passports/apply/help/photos.html" },
    ],
  },

  ko: {
    title: "여권 사진 규격과 온라인 제출용 사진 파일 만들기",
    metaTitle: "여권 사진 규격과 온라인 사진 파일 만들기",
    metaDescription:
      "여권 사진은 3.5×4.5cm, 머리 길이 3.2~3.6cm, 6개월 이내 촬영입니다. 온라인 재발급용 413×531px·500KB 이하 JPG 파일을 만드는 방법과 주의할 점을 정리했습니다.",
    summary:
      "여권 사진 규격은 센티미터로 정해져 있지만 온라인 재발급에는 사진 파일을 내야 합니다. 이 글에서는 외교부 여권안내 홈페이지에 공개된 여권 사진 규정과 온라인용 사진 파일 기준을 정리하고, 3.5×4.5cm가 어떻게 413×531픽셀이 되는지 계산한 뒤, Intera Tools로 사진을 정확한 크기로 자르고 줄이는 방법과 직접 자르면 안 되는 경우를 설명합니다.",
    takeaways: [
      "여권 사진은 가로 3.5cm × 세로 4.5cm, 머리 길이(머리카락을 제외한 정수리부터 턱까지) 3.2~3.6cm, 신청일 전 6개월 이내에 촬영한 흰색 배경 사진이어야 합니다.",
      "온라인 재발급용 파일은 JPG/JPEG, 500KB 이하, 가로 413 × 세로 531픽셀 권장(가로 395~431, 세로 507~550픽셀만 업로드 가능)입니다.",
      "413×531은 3.5×4.5cm를 300dpi로 환산한 값입니다(픽셀 = mm ÷ 25.4 × dpi). 비율은 7:9입니다.",
      "Intera의 이미지 자르기에는 7:9 프리셋이 없으므로 ‘자유’를 고르고 너비·높이를 700 × 900처럼 직접 입력합니다. 4:5 프리셋은 비슷하지만 맞지 않습니다.",
      "Intera는 픽셀과 용량만 바꿉니다. 배경·조명·표정 등 규정 적합 여부는 확인하지 못하며 규정은 바뀔 수 있으니 반드시 공식 사이트에서 확인하세요.",
    ],
    body: [
      { type: "h2", text: "외교부가 정한 여권 사진 규정" },
      {
        type: "table",
        caption: "외교부 여권안내 홈페이지(passport.go.kr) 기준, 2026년 11월 6일 확인. 규정은 바뀔 수 있으니 신청 전 공식 페이지를 확인하세요.",
        head: ["항목", "기준"],
        rows: [
          ["사진 크기", "가로 3.5cm × 세로 4.5cm"],
          ["머리 길이", "정수리(머리카락을 제외한 머리 최상부)부터 턱까지 3.2~3.6cm"],
          ["촬영 시기", "여권발급 신청일 전 6개월 이내"],
          ["배경", "균일하고 잉크 자국이 없는 흰색, 테두리 없음"],
          ["보정", "사진 편집 프로그램·필터로 임의 보정한 사진, AI로 편집·합성한 사진, 배경을 지우거나 합성한 사진은 허용 불가"],
          ["인화 사진", "일반 종이 출력 불가, 인화지(유광·무광)에 인화한 선명한 사진(해상도 300DPI 권장)"],
        ],
      },
      {
        type: "p",
        text: "여권안내 홈페이지에는 이 밖에도 얼굴 방향, 표정(입을 다문 무표정), 안경 빛 반사, 컬러렌즈, 장신구, 영유아 사진 기준이 그림과 함께 자세히 나와 있습니다. 사진 크기만 맞춘다고 통과되는 것이 아니므로 촬영 전에 한 번 읽어 보는 것이 좋습니다.",
      },

      { type: "h2", text: "온라인 재발급용 사진 파일 기준" },
      {
        type: "ul",
        items: [
          "파일 형식 **JPG/JPEG**, 파일 크기 **500KB 이하**",
          "가로 **413 × 세로 531픽셀** 권장. 가로 395~431픽셀, 세로 507~550픽셀 범위만 업로드 가능",
          "해상도 300dpi 권장, 6개월 이내 촬영",
          "머리 길이는 파일을 3.5×4.5cm로 인화했다고 가정했을 때 3.2~3.6cm가 되어야 하며, 시스템 사전 품질검사를 통과해도 발급 심사에서 반려될 수 있음",
          "다른 용도의 사진을 재사용해 해상도가 낮아지거나 흐려진 사진, 얼굴이 좌우·상하로 납작하게 변형된 사진은 제출 불가",
        ],
      },
      {
        type: "p",
        text: "외교부는 휴대폰 등 모바일 기기로 촬영한 사진이나 과도하게 보정한 사진은 실물과 다르게 보일 수 있어 권장하지 않는다고 안내합니다. 사진관에서 촬영한다면 온라인 제출용 파일을 함께 받을 수 있는지 물어보세요. 규격에 맞는 파일을 받았다면 다시 손댈 필요가 없습니다.",
      },

      { type: "h2", text: "3.5×4.5cm가 413×531픽셀이 되는 이유" },
      {
        type: "p",
        text: "1인치는 정확히 25.4mm이므로 `픽셀 = mm ÷ 25.4 × dpi`로 계산합니다. 300dpi에서 가로는 35 ÷ 25.4 × 300 = 413.4, 세로는 45 ÷ 25.4 × 300 = 531.5(반올림 전 531.496)이므로 **413 × 531픽셀**이 됩니다. 외교부가 권장하는 값과 정확히 같습니다. 비율은 35:45 = **7:9**(약 0.78)이고, 600dpi로 계산하면 827 × 1063픽셀입니다.",
      },
      {
        type: "p",
        text: "머리 길이도 비율로 바꿔 두면 편합니다. 4.5cm 중 3.2~3.6cm이므로 사진 높이의 **약 71~80%**, 가운데 값인 3.4cm는 약 76%입니다. 파일 크기가 413×531로 정확해도 이 비율에서 벗어나면 반려될 수 있습니다.",
      },

      { type: "h2", text: "Intera로 정확한 크기로 자르고 줄이기" },
      {
        type: "p",
        text: "배경, 조명, 표정이 이미 규정에 맞는 사진이 있고 크기만 맞추면 되는 경우의 방법입니다. 자르기로는 배경이나 조명 문제를 고칠 수 없습니다.",
      },
      {
        type: "steps",
        items: [
          { title: "이미지 자르기에서 ‘자유’ 선택", body: "[이미지 자르기](/crop-image)에 사진 한 장을 넣고 **비율**에서 **자유**를 고릅니다. 프리셋은 자유, 1:1, 4:3, 3:2, 16:9, 4:5, 9:16이며 7:9는 없습니다. 4:5(0.80)는 7:9(약 0.78)보다 조금 넓어서 맞지 않습니다." },
          { title: "머리 길이 재기", body: "선택 상자의 위쪽 모서리를 정수리(머리카락 위가 아니라 머리 최상부)에, 아래쪽 모서리를 턱 끝에 맞춥니다. 이때 **높이** 칸에 표시되는 값이 머리 길이(픽셀)입니다. 예: 680." },
          { title: "자를 크기 계산", body: "머리 길이를 0.76으로 나누면 자를 높이, 그 높이에 7/9를 곱하면 너비가 됩니다. 머리가 680픽셀이면 680 ÷ 0.76 ≈ 895이므로 **높이 900**, **너비 700**을 입력합니다. 자유 모드에서는 너비와 높이를 따로 입력할 수 있습니다." },
          { title: "위치 맞추고 자르기", body: "**X**, **Y** 값을 조정해 얼굴이 가로 가운데에 오고 정수리 위에 약간의 여백이 남게 합니다. 상자를 클릭한 뒤 방향키로 1픽셀씩(Shift를 누르면 10픽셀씩) 옮길 수 있습니다. 자르면 JPG는 JPG(품질 95)로, PNG는 PNG로 저장됩니다." },
          { title: "413×531로 줄이기", body: "결과 화면에서 **이어서 작업하기** → 이미지 크기 조절을 고릅니다. **변경 방식**은 **픽셀**, **가로세로 비율 유지**는 켠 채로 **너비**에 **413**을 입력하면 700×900이 정확히 7:9이므로 높이가 531로 채워집니다. 530이나 532가 나오면 자르기가 1픽셀 어긋난 것으로, 업로드 가능 범위 안이지만 다시 잘라도 됩니다." },
          { title: "형식과 용량 확인", body: "이미지 크기 조절은 JPG를 품질 92로 저장합니다. 413×531 크기 JPG는 용량이 작지만 결과 화면에 표시되는 크기가 500KB 이하인지 확인하세요. PNG라면 [PNG를 JPG로 변환](/png-to-jpg)으로 바꾸고, 그래도 500KB를 넘을 때만 [이미지 압축](/compress-image)을 사용하세요." },
        ],
      },
      {
        type: "note",
        tone: "warning",
        title: "Intera가 확인하지 못하는 것",
        text: "Intera Tools는 자르는 범위, 픽셀 수, 용량만 바꿉니다. 얼굴을 인식하거나 머리 길이를 대신 재 주지 않고, 배경색·조명·안경·표정을 검사하지도 않으며, 사진이 접수될지 보장하지 않습니다. 배경 제거, 필터, AI 보정은 외교부 규정상 허용되지 않으므로 이런 문제는 편집으로 고치려 하지 말고 다시 촬영하세요.",
      },
      {
        type: "tool",
        slug: "crop-image",
        text: "X, Y, 너비, 높이를 픽셀 단위로 입력해 사진 한 장을 정확한 크기로 자르고, 바로 이미지 크기 조절로 이어갈 수 있습니다.",
      },

      { type: "h2", text: "외교부 공식 도구도 함께 쓰세요" },
      {
        type: "p",
        text: "여권안내 홈페이지에는 **온라인 여권 사진 크기 조정**과 **온라인 여권 사진 검증** 메뉴가 있습니다. 크기 조정 도구는 1MB 미만 JPG·PNG 파일을 올려 확대·축소·이동으로 얼굴을 붉은 점선 안에 맞춘 뒤 저장하는 방식이고, 저장한 사진은 사진 검증으로 미리 확인할 수 있습니다. 얼굴 위치 가이드가 있으므로 여권용이라면 이 도구가 더 적합합니다. 사진관에서 받은 파일이 1MB를 넘어 올라가지 않을 때는 Intera의 [이미지 크기 조절](/resize-image)로 먼저 줄인 뒤 공식 도구에서 마무리하면 됩니다.",
      },

      { type: "h2", text: "반려되기 쉬운 실수" },
      {
        type: "ul",
        items: [
          "**비율을 무시하고 늘리기**: 사진 비율과 다른 너비·높이를 함께 입력하면 얼굴이 납작해지거나 길어집니다. 외교부도 얼굴이 변형된 사진은 제출 불가로 명시합니다. 크기를 바꿀 때는 비율 유지를 켜 두세요.",
          "**작은 사진 확대**: 확대하면 픽셀 수만 늘고 선명도는 그대로입니다. 다른 용도 사진을 재사용해 흐려진 사진은 반려 대상입니다. Intera의 **작은 이미지는 확대하지 않기**가 기본으로 켜져 있는 이유입니다.",
          "**오래된 사진**: 신청일 전 6개월 이내에 촬영한 사진이어야 합니다.",
          "**머리 크기 비율 확인 누락**: 413×531이 맞아도 얼굴을 너무 크게 또는 작게 자르면 머리 길이 기준(약 71~80%)을 벗어납니다.",
        ],
      },
      {
        type: "p",
        text: "같은 계산은 명함, A4 문서 등 다른 인쇄물에도 그대로 쓸 수 있습니다. 자세한 내용은 [인쇄 해상도와 DPI 가이드](/guides/print-resolution-dpi)를 참고하세요.",
      },
    ],
    faq: [
      {
        q: "3.5×4.5cm 사진은 몇 픽셀인가요?",
        a: "300dpi 기준 413 × 531픽셀입니다(35 ÷ 25.4 × 300, 45 ÷ 25.4 × 300을 반올림). 외교부가 온라인 재발급용으로 권장하는 값과 같으며, 비율은 7:9입니다.",
      },
      {
        q: "증명사진이나 반명함 사진 파일을 그대로 써도 되나요?",
        a: "외교부의 사진 크기 조정 안내에는 증명사진, 반명함 사진, 비자 사진 등은 사용할 수 없다고 적혀 있습니다. 여권 규정(3.5×4.5cm, 머리 길이 3.2~3.6cm, 흰색 배경, 6개월 이내)에 맞춰 촬영한 사진을 쓰세요.",
      },
      {
        q: "파일의 dpi 값을 300으로 바꾸면 되나요?",
        a: "dpi 값은 인쇄할 때의 크기 정보일 뿐 사진의 선명도를 바꾸지 않습니다. 중요한 것은 픽셀 수(413×531)와 사진 자체의 선명도입니다. 413×531픽셀을 3.5×4.5cm로 인화하면 자연히 300dpi가 됩니다.",
      },
      {
        q: "Intera로 만든 사진이 규정에 맞는지 알려 주나요?",
        a: "아닙니다. Intera는 사진을 업로드하지 않고 브라우저에서 자르기·크기 조절·압축만 합니다. 규정 적합 여부는 여권안내 홈페이지의 온라인 여권 사진 검증으로 확인하고, 최신 규정도 그곳에서 확인하세요.",
      },
    ],
    sources: [
      { label: "외교부 여권안내 – 여권사진 규격 안내(2022.10 개정)", url: "https://www.passport.go.kr/home/kor/contents.do?menuPos=32" },
      { label: "외교부 여권안내 – 온라인용 사진파일 안내", url: "https://www.passport.go.kr/home/kor/contents.do?menuPos=12" },
      { label: "외교부 여권안내 – 온라인 여권 사진 크기 조정", url: "https://www.passport.go.kr/home/kor/photoVerify/index.do?menuPos=34" },
      { label: "미국 국립표준기술연구소(NIST) – 1인치 = 25.4mm 정의", url: "https://www.nist.gov/pml/owm/si-units-length" },
    ],
  },
};

export default guide;
