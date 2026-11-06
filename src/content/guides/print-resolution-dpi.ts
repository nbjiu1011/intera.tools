import type { Locale } from "../../i18n/config";
import type { GuideContent } from "../types";

const guide: Record<Locale, GuideContent> = {
  en: {
    title: "Print Resolution Explained: DPI, PPI and How Many Pixels You Need",
    metaTitle: "Print Resolution: DPI vs Pixels for A4, Photos and Cards",
    metaDescription:
      "How many pixels do you need to print? The formula, pixel sizes for A4, A5, photos and business cards at 150 and 300 DPI, and why the DPI tag changes nothing.",
    summary:
      "Print shops ask for “300 DPI”, but an image file is really just a grid of pixels. This guide explains what DPI and PPI mean, gives the one formula you need to turn a paper size into pixels, lists calculated sizes for common prints, explains why changing the DPI number in a file doesn't add any detail, and shows exactly what Intera's Resize Image, PDF to JPG and JPG to PDF tools produce.",
    takeaways: [
      "Pixels = inches × DPI, and inches = mm ÷ 25.4. An A4 page at 300 DPI is 2480 × 3508 px; at 150 DPI it is 1240 × 1754 px.",
      "The DPI value stored in a file only sets a nominal print size. Changing it from 72 to 300 leaves every pixel the same.",
      "Enlarging an image adds pixels but no detail. If you don't have enough pixels for 300 DPI, print smaller or accept a lower resolution.",
      "PDF to JPG renders an A4 page at 595 × 841, 1240 × 1753 or 2480 × 3507 px for 72, 150 and 300 DPI.",
      "300 DPI is a target for prints viewed up close. Posters seen from a distance can use less; ask the print shop for its minimum.",
    ],
    body: [
      { type: "h2", text: "DPI, PPI and pixels" },
      {
        type: "p",
        text: "**PPI** (pixels per inch) describes an image: how many of its pixels end up in each inch of paper. **DPI** (dots per inch) strictly describes a printer: how many ink dots it can place per inch, and a printer uses many dots to reproduce one pixel. In everyday use, and in most upload and print-shop requirements, “300 DPI” simply means 300 pixels per inch of print. This guide uses DPI in that everyday sense.",
      },
      {
        type: "p",
        text: "The key point is that a digital image has no physical size on its own. A 2480 × 3508 px image is 2480 × 3508 px whether you print it on A4 or on a postage stamp. The resolution only appears once you decide how big to print it.",
      },

      { type: "h2", text: "The formula" },
      {
        type: "p",
        text: "`pixels = inches × DPI`. For metric sizes, convert first: `inches = mm ÷ 25.4` (an inch is defined as exactly 25.4 mm). So A4 width at 300 DPI is 210 ÷ 25.4 × 300 = 2480.3, which rounds to 2480 px, and the height is 297 ÷ 25.4 × 300 = 3507.9, so 3508 px.",
      },
      {
        type: "table",
        caption: "Calculated as mm ÷ 25.4 × DPI, rounded to the nearest pixel. Width × height in the orientation shown.",
        head: ["Print size", "Millimetres", "150 DPI", "300 DPI"],
        rows: [
          ["A4", "210 × 297", "1240 × 1754 px", "2480 × 3508 px"],
          ["A5", "148 × 210", "874 × 1240 px", "1748 × 2480 px"],
          ["A3", "297 × 420", "1754 × 2480 px", "3508 × 4961 px"],
          ["4 × 6 in photo", "101.6 × 152.4", "600 × 900 px", "1200 × 1800 px"],
          ["5 × 7 in photo", "127 × 177.8", "750 × 1050 px", "1500 × 2100 px"],
          ["Business card, common Korean size", "90 × 50", "531 × 295 px", "1063 × 591 px"],
          ["Korean passport photo", "35 × 45", "207 × 266 px", "413 × 531 px"],
        ],
      },
      {
        type: "p",
        text: "Each A size is the next one up cut in half, so A5 at 300 DPI has exactly the width of A4 at 150 DPI in pixels, and A3 is A4 doubled. The passport row matches the 413 × 531 px that Korea's passport site recommends for online photos, which is a good sanity check that the formula is what offices use. For printed business cards and flyers, the shop will usually also want extra bleed around the edge; use the size and template your shop gives you.",
      },

      { type: "h2", text: "Working backwards: how big can I print this?" },
      {
        type: "p",
        text: "Divide the pixels by the DPI to get inches, then multiply by 25.4 for millimetres.",
      },
      {
        type: "ul",
        items: [
          "A 12-megapixel phone photo (4032 × 3024 px) prints at 300 DPI up to 13.4 × 10.1 in (341 × 256 mm), a little larger than A4. At 150 DPI it reaches 26.9 × 20.2 in (683 × 512 mm).",
          "A 1920 × 1080 px image, such as a video frame, is 6.4 × 3.6 in (163 × 91 mm) at 300 DPI.",
          "A 1080 × 1080 px social media image is 3.6 in (91 mm) square at 300 DPI.",
        ],
      },

      { type: "h2", text: "Why the DPI number in a file doesn't change detail" },
      {
        type: "p",
        text: "JPG and PNG files can store a resolution value, but it is only a hint for software about how large to print. Take a 3000 × 2000 px photo. Tagged 72 DPI, it claims to be 41.7 × 27.8 in; tagged 300 DPI, it claims 10 × 6.7 in. The pixels are identical, so the print at any given size looks identical too. When a file has no usable value, each program falls back on its own default, which is why the same image can show different print sizes in different apps.",
      },
      {
        type: "p",
        text: "What changes quality is the number of pixels available for the print size you want. If a requirement says “300 DPI at A4”, it really means “at least 2480 × 3508 px”. Upscaling a 1200 px image to 2480 px meets the number but not the intent: the software invents the extra pixels by interpolation, so the result is larger but no sharper. Intera's tools don't let you set or edit the DPI value; everything is controlled by pixel dimensions.",
      },

      { type: "h2", text: "What Intera's tools produce" },
      { type: "h3", text: "Resize Image" },
      {
        type: "p",
        text: "[Resize Image](/resize-image) sets exact pixel dimensions (or a percentage) and saves JPGs at quality 92. **Don’t enlarge smaller images** is on by default, so a request for 2480 px on a 1600 px image leaves it at 1600 px instead of upscaling. To prepare a 4 × 6 in print at 300 DPI from a phone photo, first crop it in [Crop Image](/crop-image): the 3:2 preset fits a landscape photo, while a portrait photo needs **Free** with a 2:3 width and height such as 1200 × 1800. Then resize to 1800 px on the long side. For shapes without a preset, such as 5 × 7 in or A4, use **Free** and type the width and height in the right ratio.",
      },
      { type: "h3", text: "PDF to JPG" },
      {
        type: "p",
        text: "[PDF to JPG](/pdf-to-jpg) offers 72, 150 and 300 DPI. The pixel size is the PDF page size in points (1/72 in) multiplied by DPI ÷ 72. An A4 page is 595.28 × 841.89 points, and in our measurement the tool produced **595 × 841**, **1240 × 1753** and **2480 × 3507 px**. That is one pixel short of the calculated 842, 1754 and 3508 in height because the fraction is dropped rather than rounded. File sizes for one A4 page in that test:",
      },
      {
        type: "table",
        head: ["Page content", "72 DPI", "150 DPI", "300 DPI"],
        rows: [
          ["Text-heavy page", "159 KB", "500 KB", "1.26 MB"],
          ["Photo page", "86 KB", "349 KB", "1.25 MB"],
        ],
      },
      {
        type: "p",
        text: "Higher DPI makes the PDF's text and vector graphics sharper because they are drawn fresh at each resolution. Photos embedded in the PDF cannot gain more detail than they already have. If you only need to print the document, print the PDF itself; converting to JPG turns text into pixels.",
      },
      { type: "h3", text: "JPG to PDF" },
      {
        type: "p",
        text: "In [JPG to PDF](/jpg-to-pdf), the **A4** and **US Letter** page sizes scale each image to fit inside the page and margin, so the effective resolution is the image's pixels divided by the printed inches. A 2480 × 3508 px image on A4 with **Margin: None** prints at 300 DPI; a 12 MP phone photo laid across A4 in landscape comes out around 366 DPI. With **Fit to image**, the page is made the same size as the image with one pixel per point, so a 2480 px wide image becomes a page about 875 mm wide. That is fine on screen, but choose A4 or US Letter if you plan to print.",
      },
      {
        type: "tool",
        slug: "resize-image",
        text: "Set exact pixel dimensions for a print size, without uploading your photos. Smaller images are not enlarged unless you turn that option off.",
      },

      { type: "h2", text: "When 300 DPI isn't necessary" },
      {
        type: "p",
        text: "300 DPI is a sensible target for things people hold or look at closely: photos, business cards, brochures, documents. The further away a print is viewed, the less detail the eye can resolve, so posters, banners and signs are often printed from files with fewer pixels per inch. Large-format printing services usually publish their own minimum, so ask the shop rather than guessing.",
      },
      {
        type: "ul",
        items: [
          "**You have fewer pixels than 300 DPI needs:** print smaller, or check how it looks at the lower resolution. Don't upscale just to hit a number.",
          "**The file will only be viewed on screen:** DPI is irrelevant; only the pixel dimensions matter.",
          "**You are printing a PDF with text:** send the PDF itself, not a JPG rendering of it.",
        ],
      },
    ],
    faq: [
      {
        q: "How many pixels is A4 at 300 DPI?",
        a: "2480 × 3508 px (210 ÷ 25.4 × 300 and 297 ÷ 25.4 × 300, rounded). At 150 DPI it is 1240 × 1754 px.",
      },
      {
        q: "My image says 72 DPI. Is it too low for printing?",
        a: "Not necessarily. The 72 is only a stored number. Check the pixel dimensions instead: a 3000 × 2000 px image has enough pixels for a 10 × 6.7 in print at 300 DPI, whatever its DPI tag says.",
      },
      {
        q: "Can Intera increase an image's DPI?",
        a: "Intera doesn't edit the DPI value; it works in pixels. You can enlarge an image with Resize Image by turning off “Don’t enlarge smaller images”, but that only interpolates new pixels and won't add real detail.",
      },
      {
        q: "Which DPI should I choose in PDF to JPG?",
        a: "72 DPI for quick previews, 150 DPI for reading on screen or sharing, and 300 DPI when the images will be printed or you need small text to stay crisp. At 300 DPI an A4 page is 2480 × 3507 px and was around 1.25 MB in our test.",
      },
    ],
    sources: [
      { label: "NIST – SI units: length (1 inch = 25.4 mm exactly)", url: "https://www.nist.gov/pml/owm/si-units-length" },
      { label: "Korea Ministry of Foreign Affairs – Online passport photo files (413 × 531 px, 300 dpi)", url: "https://www.passport.go.kr/home/kor/contents.do?menuPos=12" },
      { label: "Chungcheongnam-do Provincial Government – Business card order (90 × 50 mm)", url: "https://www.chungnam.go.kr/cnci/application_system/businesscardB.do" },
    ],
  },

  ko: {
    title: "인쇄 해상도 완전 정리: DPI, PPI와 필요한 픽셀 수",
    metaTitle: "인쇄 해상도 DPI와 픽셀 크기 계산법",
    metaDescription:
      "A4·A5, 명함 90×50mm, 4×6 사진을 150·300dpi로 인쇄하려면 몇 픽셀이 필요할까요? 계산 공식과 규격별 픽셀 표, 파일의 dpi 값이 화질과 무관한 이유를 정리했습니다.",
    summary:
      "인쇄소나 제출처에서 “300dpi로 보내 주세요”라고 하지만, 이미지 파일은 결국 픽셀의 격자일 뿐입니다. 이 글에서는 DPI와 PPI의 뜻, 용지 크기를 픽셀로 바꾸는 공식, A4·명함·사진 등 국내에서 자주 쓰는 규격의 픽셀 표를 정리하고, 파일에 기록된 dpi 값을 바꿔도 화질이 달라지지 않는 이유와 Intera의 이미지 크기 조절, PDF를 JPG로 변환, JPG를 PDF로 변환이 실제로 만드는 결과를 설명합니다.",
    takeaways: [
      "픽셀 = 인치 × dpi, 인치 = mm ÷ 25.4입니다. A4를 300dpi로 인쇄하려면 2480 × 3508픽셀, 150dpi면 1240 × 1754픽셀이 필요합니다.",
      "파일에 기록된 dpi 값은 인쇄 크기 정보일 뿐입니다. 72를 300으로 바꿔도 픽셀은 하나도 달라지지 않습니다.",
      "작은 이미지를 확대하면 픽셀 수는 늘지만 선명도는 늘지 않습니다. 픽셀이 부족하면 작게 인쇄하거나 낮은 해상도를 받아들이세요.",
      "PDF를 JPG로 변환은 A4 페이지를 72·150·300dpi에서 595×841, 1240×1753, 2480×3507픽셀로 만듭니다.",
      "300dpi는 가까이서 보는 인쇄물 기준입니다. 멀리서 보는 포스터는 더 낮아도 되는 경우가 많으니 인쇄소의 최소 기준을 확인하세요.",
    ],
    body: [
      { type: "h2", text: "DPI, PPI, 픽셀의 차이" },
      {
        type: "p",
        text: "**PPI**(pixels per inch)는 이미지의 픽셀이 종이 1인치에 몇 개 들어가는지를 뜻합니다. **DPI**(dots per inch)는 엄밀히는 프린터가 1인치에 찍는 잉크 점의 수이고, 프린터는 픽셀 하나를 표현하려고 여러 개의 점을 씁니다. 하지만 일상적으로나 대부분의 제출·인쇄 요구 사항에서 “300dpi”는 인쇄물 1인치당 300픽셀이라는 뜻으로 쓰입니다. 이 글에서도 그 의미로 씁니다.",
      },
      {
        type: "p",
        text: "핵심은 디지털 이미지에는 정해진 물리적 크기가 없다는 점입니다. 2480 × 3508픽셀 이미지는 A4에 인쇄하든 우표 크기로 인쇄하든 2480 × 3508픽셀입니다. 해상도는 얼마나 크게 인쇄할지 정하는 순간 정해집니다.",
      },

      { type: "h2", text: "계산 공식" },
      {
        type: "p",
        text: "`픽셀 = 인치 × dpi`이고, 밀리미터 규격은 먼저 `인치 = mm ÷ 25.4`로 바꿉니다(1인치는 정확히 25.4mm로 정의되어 있습니다). A4 가로를 300dpi로 계산하면 210 ÷ 25.4 × 300 = 2480.3이므로 2480픽셀, 세로는 297 ÷ 25.4 × 300 = 3507.9이므로 3508픽셀입니다.",
      },
      {
        type: "table",
        caption: "mm ÷ 25.4 × dpi로 계산해 가장 가까운 정수로 반올림한 값입니다. 표시한 방향 기준 가로 × 세로.",
        head: ["규격", "크기(mm)", "150dpi", "300dpi"],
        rows: [
          ["A4", "210 × 297", "1240 × 1754px", "2480 × 3508px"],
          ["A5", "148 × 210", "874 × 1240px", "1748 × 2480px"],
          ["A3", "297 × 420", "1754 × 2480px", "3508 × 4961px"],
          ["명함(국내 일반 규격)", "90 × 50", "531 × 295px", "1063 × 591px"],
          ["4×6인치 사진", "101.6 × 152.4", "600 × 900px", "1200 × 1800px"],
          ["10×15cm 사진", "100 × 150", "591 × 886px", "1181 × 1772px"],
          ["5×7인치 사진", "127 × 177.8", "750 × 1050px", "1500 × 2100px"],
          ["여권 사진", "35 × 45", "207 × 266px", "413 × 531px"],
        ],
      },
      {
        type: "p",
        text: "A 규격은 한 단계 큰 규격을 반으로 자른 크기라서, 300dpi A5의 픽셀 수는 150dpi A4와 정확히 같고 A3는 A4의 두 배입니다. 여권 사진 행의 413 × 531픽셀은 외교부가 온라인 여권 사진 파일로 권장하는 값과 같아서, 관공서도 이 공식을 그대로 쓴다는 것을 확인할 수 있습니다. 명함이나 전단을 인쇄소에 맡길 때는 보통 재단 여백(도련)을 더한 작업 크기를 요구하므로, 주문할 인쇄소의 템플릿 크기를 따르세요. ‘4×6 사진’과 10×15cm는 비슷하지만 같은 크기가 아니라는 점도 기억해 두세요.",
      },

      { type: "h2", text: "거꾸로 계산하기: 이 사진은 얼마나 크게 뽑을 수 있을까" },
      {
        type: "p",
        text: "픽셀을 dpi로 나누면 인치, 여기에 25.4를 곱하면 밀리미터가 됩니다.",
      },
      {
        type: "ul",
        items: [
          "1200만 화소 스마트폰 사진(4032 × 3024픽셀)은 300dpi 기준 341 × 256mm까지 인쇄할 수 있어 A4보다 조금 큽니다. 150dpi라면 683 × 512mm입니다.",
          "1920 × 1080픽셀 이미지(동영상 캡처 등)는 300dpi에서 163 × 91mm입니다.",
          "1080 × 1080픽셀 SNS 이미지는 300dpi에서 가로세로 91mm 정사각형입니다.",
        ],
      },

      { type: "h2", text: "파일의 dpi 값을 바꿔도 화질은 그대로인 이유" },
      {
        type: "p",
        text: "JPG나 PNG 파일에는 해상도 값을 기록할 수 있지만, 이 값은 프로그램에게 “이 크기로 인쇄하라”고 알려 주는 힌트일 뿐입니다. 3000 × 2000픽셀 사진에 72dpi가 기록되어 있으면 약 1058 × 706mm, 300dpi가 기록되어 있으면 254 × 169mm라고 표시됩니다. 픽셀은 똑같으므로 같은 크기로 인쇄하면 결과도 똑같습니다. 값이 없거나 쓸 수 없는 파일은 프로그램마다 자체 기본값을 쓰기 때문에, 같은 이미지가 앱에 따라 다른 인쇄 크기로 보이기도 합니다.",
      },
      {
        type: "p",
        text: "화질을 결정하는 것은 원하는 인쇄 크기에 비해 픽셀이 충분한가입니다. “A4 300dpi”라는 요구는 사실상 “2480 × 3508픽셀 이상”이라는 뜻입니다. 1200픽셀 이미지를 2480픽셀로 확대하면 숫자는 맞지만 늘어난 픽셀은 보간으로 만들어 낸 것이라 더 선명해지지 않습니다. Intera의 도구는 dpi 값을 설정하거나 수정하는 기능이 없고, 모든 것을 픽셀 크기로 다룹니다.",
      },

      { type: "h2", text: "Intera 도구가 만드는 결과" },
      { type: "h3", text: "이미지 크기 조절" },
      {
        type: "p",
        text: "[이미지 크기 조절](/resize-image)은 정확한 픽셀 크기(또는 배율)로 바꾸고 JPG를 품질 92로 저장합니다. **작은 이미지는 확대하지 않기**가 기본으로 켜져 있어서, 1600픽셀 이미지에 2480을 입력해도 확대하지 않고 1600픽셀로 둡니다. 스마트폰 사진으로 4×6인치 사진을 300dpi로 뽑으려면 먼저 [이미지 자르기](/crop-image)에서 자릅니다. 가로 사진은 3:2 프리셋을 쓰면 되고, 세로 사진은 프리셋이 없으므로 **자유**를 고르고 1200 × 1800처럼 2:3 비율로 입력합니다. 그다음 긴 변을 1800픽셀로 줄이면 됩니다. 5×7인치나 A4처럼 프리셋이 없는 비율은 **자유**를 고르고 너비와 높이를 비율에 맞게 직접 입력하세요.",
      },
      { type: "h3", text: "PDF를 JPG로 변환" },
      {
        type: "p",
        text: "[PDF를 JPG로 변환](/pdf-to-jpg)은 72·150·300dpi 중에서 고를 수 있습니다. 픽셀 크기는 PDF 페이지 크기(포인트, 1포인트 = 1/72인치)에 dpi ÷ 72를 곱한 값입니다. A4는 595.28 × 841.89포인트이고, 직접 측정한 결과 **595 × 841**, **1240 × 1753**, **2480 × 3507픽셀**이 나왔습니다. 계산값(세로 842, 1754, 3508)보다 1픽셀 작은 것은 소수점을 반올림하지 않고 버리기 때문입니다. 같은 측정에서 A4 한 페이지의 파일 크기는 다음과 같았습니다.",
      },
      {
        type: "table",
        head: ["페이지 내용", "72dpi", "150dpi", "300dpi"],
        rows: [
          ["글자가 많은 페이지", "159KB", "500KB", "1.26MB"],
          ["사진 페이지", "86KB", "349KB", "1.25MB"],
        ],
      },
      {
        type: "p",
        text: "dpi를 높이면 PDF 안의 글자와 벡터 그래픽은 해상도에 맞춰 새로 그려지므로 더 선명해집니다. 하지만 PDF에 들어 있는 사진은 원래 가진 픽셀 이상으로 선명해지지 않습니다. 문서를 인쇄만 할 거라면 JPG로 바꾸지 말고 PDF를 그대로 인쇄하세요. JPG로 바꾸면 글자도 픽셀이 됩니다.",
      },
      { type: "h3", text: "JPG를 PDF로 변환" },
      {
        type: "p",
        text: "[JPG를 PDF로 변환](/jpg-to-pdf)에서 **A4**나 **US Letter**를 고르면 이미지를 페이지와 여백 안에 맞춰 넣으므로, 실제 인쇄 해상도는 이미지 픽셀 ÷ 인쇄되는 인치로 정해집니다. 2480 × 3508픽셀 이미지를 A4에 **여백: 없음**으로 넣으면 300dpi, 1200만 화소 사진을 A4 가로로 넣으면 약 366dpi가 됩니다. **이미지에 맞춤**을 고르면 1픽셀을 1포인트로 계산해 페이지를 이미지 크기로 만들기 때문에, 가로 2480픽셀 이미지는 가로 약 875mm짜리 페이지가 됩니다. 화면으로 볼 때는 문제없지만, 인쇄할 계획이라면 A4나 US Letter를 고르세요.",
      },
      {
        type: "tool",
        slug: "resize-image",
        text: "인쇄 크기에 맞는 픽셀 크기로 사진을 줄여 보세요. 파일은 업로드되지 않으며, 작은 이미지는 옵션을 끄지 않는 한 확대되지 않습니다.",
      },

      { type: "h2", text: "300dpi가 꼭 필요하지 않은 경우" },
      {
        type: "p",
        text: "300dpi는 사진, 명함, 리플릿, 문서처럼 손에 들고 가까이서 보는 인쇄물에 알맞은 기준입니다. 멀리서 볼수록 눈이 구분할 수 있는 디테일이 줄어들기 때문에 포스터, 현수막, 간판 같은 대형 출력물은 1인치당 픽셀이 더 적은 파일로 인쇄하는 경우가 많습니다. 대형 출력 업체는 대개 자체 최소 기준을 안내하므로 짐작하지 말고 업체에 확인하세요.",
      },
      {
        type: "ul",
        items: [
          "**300dpi에 필요한 픽셀이 부족할 때**: 더 작게 인쇄하거나 낮은 해상도로 어떻게 보이는지 확인하세요. 숫자를 맞추려고 확대하지는 마세요.",
          "**화면으로만 볼 파일일 때**: dpi는 의미가 없고 픽셀 크기만 중요합니다.",
          "**글자가 있는 PDF를 인쇄할 때**: JPG로 바꾼 파일이 아니라 PDF 원본을 보내세요.",
        ],
      },
    ],
    faq: [
      {
        q: "A4 300dpi는 몇 픽셀인가요?",
        a: "2480 × 3508픽셀입니다(210 ÷ 25.4 × 300, 297 ÷ 25.4 × 300을 반올림). 150dpi라면 1240 × 1754픽셀입니다.",
      },
      {
        q: "명함 90×50mm를 300dpi로 만들려면 몇 픽셀이 필요한가요?",
        a: "1063 × 591픽셀입니다. 인쇄소에 따라 재단 여백을 더한 작업 크기를 요구하므로, 실제 파일은 주문할 인쇄소의 템플릿 크기에 맞추세요.",
      },
      {
        q: "이미지 정보에 72dpi라고 나오는데 인쇄하기엔 낮은 건가요?",
        a: "꼭 그렇지는 않습니다. 72는 기록된 숫자일 뿐이니 픽셀 크기를 확인하세요. 3000 × 2000픽셀이면 dpi 값과 상관없이 300dpi 기준 254 × 169mm까지 인쇄할 수 있습니다.",
      },
      {
        q: "PDF를 JPG로 변환할 때 몇 dpi를 고르면 되나요?",
        a: "빠른 미리보기는 72dpi, 화면으로 보거나 공유할 때는 150dpi, 인쇄하거나 작은 글자를 선명하게 남겨야 할 때는 300dpi를 고르세요. 300dpi에서 A4 한 페이지는 2480 × 3507픽셀이고, 측정에서는 약 1.25MB였습니다.",
      },
    ],
    sources: [
      { label: "미국 국립표준기술연구소(NIST) – 길이 단위(1인치 = 25.4mm)", url: "https://www.nist.gov/pml/owm/si-units-length" },
      { label: "외교부 여권안내 – 온라인용 사진파일 안내(413×531픽셀, 300dpi)", url: "https://www.passport.go.kr/home/kor/contents.do?menuPos=12" },
      { label: "충청남도 – 명함 신청(90 × 50mm)", url: "https://www.chungnam.go.kr/cnci/application_system/businesscardB.do" },
    ],
  },
};

export default guide;
