import type { Locale } from "../../i18n/config";
import type { GuideContent } from "../types";

const guide: Record<Locale, GuideContent> = {
  en: {
    title: "How to Prepare Product Photos for an Online Store",
    metaTitle: "Product Photos for Online Stores: Size, Format, Names",
    metaDescription:
      "Prepare product images that look consistent and load fast: square canvas with white padding, sizes for Amazon and Shopify, JPG vs WebP, SEO file names, batches.",
    summary:
      "A catalogue looks professional when every product sits on the same canvas, at a similar scale, on the same background, and loads quickly. This guide covers the decisions that get you there: canvas shape and padding, what Amazon and Shopify actually ask for, which format and size to upload, how to name files, and how to process a whole shoot in one batch.",
    takeaways: [
      "Pick one canvas for the whole catalogue, usually a square, and pad products onto it rather than cropping them.",
      "Amazon accepts 500–10,000 px on the longest side but prefers over 1,000 px per side for zoom; Shopify says 2048 × 2048 px usually displays best for square images.",
      "Upload JPG for photos unless you need transparency; check that a platform accepts WebP before using it.",
      "Use short, descriptive, lowercase file names such as linen-shirt-white-front.jpg, and keep your untouched originals.",
    ],
    body: [
      { type: "h2", text: "Choose one canvas for the whole catalogue" },
      {
        type: "p",
        text: "Shoppers compare products side by side in grids. When one photo is landscape, the next is portrait and a third shows the product tiny in the corner, the grid looks messy and products seem different in size even when they aren't. Shopify's own advice for collection pages is to use a consistent aspect ratio so images display at the same size, and Coupang resizes non-square uploads automatically. A **square** canvas is the shape that survives the most platforms and themes without unexpected cropping.",
      },
      {
        type: "p",
        text: "Consistency also means a similar margin around every product. Decide roughly how much of the frame the product should fill (Amazon asks for about 85% on main images) and keep to it across the range, so a mug and a teapot look like they belong to the same shop.",
      },

      { type: "h2", text: "What Amazon and Shopify ask for" },
      {
        type: "table",
        caption: "From Amazon's seller guidance and Shopify's help centre; category style guides can add stricter rules",
        head: ["", "Amazon (main image)", "Shopify"],
        rows: [
          ["Size", "500–10,000 px on the longest side; over 1,000 px per side preferred so shoppers can zoom", "2048 × 2048 px usually displays best for square images; up to 5000 × 5000 px (25 MP)"],
          ["Background", "Pure white (RGB 255, 255, 255); product fills about 85% of the frame", "No rule; consistent ratio recommended"],
          ["Formats", "JPEG (preferred), PNG, TIFF, non-animated GIF", "PNG, JPEG, WebP and several others"],
        ],
      },
      {
        type: "p",
        text: "Amazon's main-image rules also exclude added text, logos, watermarks and inset images; those belong in secondary images, if anywhere. Other marketplaces publish their own rules, usually right inside the listing form, and they change from time to time, so treat the form as the final word.",
      },

      { type: "h2", text: "Pad the product onto the canvas, or crop it?" },
      {
        type: "p",
        text: "**Padding** places the whole photo inside the square and fills the empty space with a background colour. Nothing is cut off, which makes it the safe default for tall bottles, wide sofas and anything whose shape matters. **Cropping** fills the square completely but removes whatever falls outside it, so it only works when the product sits in the middle with room around it.",
      },
      {
        type: "p",
        text: "Padding only looks seamless when the padding colour matches the photo's background. White padding around a photo shot on light grey leaves visible bands on two sides. If your backdrop is not pure white, either pad with a colour that matches it or crop tighter so no padding is needed. For Amazon main images, padding cannot turn a grey backdrop white: shoot on white or remove the background in a photo editor first. Intera Tools does not remove backgrounds.",
      },
      {
        type: "p",
        text: "Watch the product scale too. If the product is small in the original shot, padding it to a square makes it smaller still. Crop closer first with [Crop Image](/crop-image), using the **1:1** ratio or a free crop, and then pad.",
      },

      { type: "h2", text: "Size: large enough to zoom, small enough to handle" },
      {
        type: "p",
        text: "A square master of around **2000 × 2000 px** covers both sets of guidance above: it is well over Amazon's 1,000 px zoom preference and close to Shopify's 2048 px recommendation. Hosted platforms create their own smaller versions for thumbnails and mobile, so uploading one good large image is enough. Never enlarge to reach a number: if your best shot is 1200 px wide, 1200 px is your ceiling, because upscaling adds pixels without detail.",
      },
      {
        type: "p",
        text: "At that size, file limits stop being a worry. A 2000 × 2000 px image holds 4 million pixels; even stored completely uncompressed in RGB that is 12 MB, and a JPG of it is far smaller. If you run your own site rather than a hosted platform, also serve resized copies for listing pages; [Compress images without losing quality](/guides/compress-images-without-losing-quality) explains how to size them.",
      },

      { type: "h2", text: "Format and quality" },
      {
        type: "ul",
        items: [
          "**JPG** for photos. It is accepted everywhere, and Amazon states a preference for JPEG. Use the **Light** level in [Compress Image](/compress-image) (quality 85) for main and zoom images; **Balanced** is usually fine for secondary shots.",
          "**PNG** for cut-outs, but only where the store actually shows transparency. For white-background listings, flatten the cut-out to JPG with [Convert Image](/convert-image) and set **Background for transparent areas** to white.",
          "**WebP** for your own website, where it is typically smaller than JPG at the same visual quality. Check before uploading it to a marketplace: Shopify lists WebP as supported, while Amazon's accepted formats do not include it.",
        ],
      },

      { type: "h2", text: "File names that help search" },
      {
        type: "p",
        text: "Google's image SEO guidance says file names give it “very light clues” about an image, and recommends short, descriptive names such as `my-new-black-kitten.jpg` over `IMG00023.JPG`. It also advises translating file names when you localise images. Alt text matters more, so fill in the alt or description field your store provides as well.",
      },
      {
        type: "p",
        text: "A practical pattern is **product-variant-view**: `linen-shirt-white-front.jpg`, `linen-shirt-white-back.jpg`. Use lowercase letters, hyphens instead of spaces, and no special characters, so names survive every upload system and URL unchanged. Descriptive names also keep your own folders searchable long after the shoot.",
      },

      { type: "h2", text: "Process the whole shoot in one batch" },
      {
        type: "steps",
        items: [
          { title: "Add every photo of the shoot", body: "Select all the product photos at once. They are processed in your browser and never uploaded." },
          { title: "Set the size", body: "Choose to pad each photo to an exact size on a white (or matching) background, for example 2000 × 2000 px. Use center-crop instead only for shots that are already framed with room around the product." },
          { title: "Pick format and quality", body: "JPG for marketplaces, WebP for your own site, with a quality setting that keeps edges and textures clean." },
          { title: "Rename with a pattern", body: "Use a pattern such as `linen-shirt-{n}` so the files come out numbered, lowercase and hyphenated." },
          { title: "Download one ZIP", body: "Upload the ZIP's contents to your store, and keep the untouched originals so you can re-export when requirements change." },
        ],
      },
      {
        type: "workflow",
        slug: "ecommerce-image-optimizer",
        text: "Size, convert, compress and rename a whole batch of product photos in one run, including padding them onto a white square, then download everything as a ZIP.",
      },
    ],
    faq: [
      {
        q: "What size should product photos be?",
        a: "A square of about 2000 × 2000 px is a solid default: it is above Amazon's 1,000 px zoom preference and close to Shopify's 2048 × 2048 px recommendation. Always check the current rules in your marketplace's listing form, and never upscale a smaller original to reach that size.",
      },
      {
        q: "Do product photos need a white background?",
        a: "Amazon requires pure white (RGB 255, 255, 255) on the main image. Other stores leave it to you, but a consistent white or neutral background makes a catalogue look tidy and makes padding to a square invisible.",
      },
      {
        q: "Should I upload JPG or PNG?",
        a: "JPG for normal product photos: smaller files and universal acceptance. PNG only for cut-outs where the store displays transparency. If the listing needs a white background, convert the cut-out to JPG with a white fill.",
      },
      {
        q: "Can Intera Tools remove the background from product photos?",
        a: "No. It can crop, resize, pad onto a coloured canvas, convert, compress and rename, but it does not cut products out of their background. Do that step in a photo editor first, then batch-process the results.",
      },
    ],
  },

  ko: {
    title: "온라인 쇼핑몰 상품 사진 준비하는 법",
    metaTitle: "쇼핑몰 상품 사진 크기·형식·파일명",
    metaDescription:
      "스마트스토어, 쿠팡, 해외 마켓에 올릴 상품 사진을 깔끔하게 준비하는 법. 정사각형 캔버스와 흰 여백, 권장 크기, JPG와 WebP 선택, 검색에 유리한 파일명, 일괄 처리까지 정리했습니다.",
    summary:
      "상품 목록이 깔끔해 보이려면 모든 상품이 같은 모양의 캔버스에, 비슷한 크기로, 같은 배경 위에 놓여 있고 빠르게 열려야 합니다. 이 글에서는 캔버스 비율과 여백, 쿠팡·스마트스토어·해외 플랫폼의 이미지 기준, 올릴 형식과 크기, 파일 이름 짓는 법, 촬영분 전체를 한 번에 처리하는 방법을 다룹니다.",
    takeaways: [
      "모든 상품을 같은 캔버스(대부분 정사각형)에 맞추고, 상품을 자르기보다 여백을 채워 넣는 방식을 기본으로 하세요.",
      "쿠팡 판매 가이드는 대표이미지 권장 500×500px, 5MB 이하, JPG·PNG를 안내합니다. 확대 보기를 생각하면 더 크게 준비하는 편이 낫습니다.",
      "사진은 JPG로 올리고, PNG는 투명 배경이 실제로 필요할 때만 쓰세요. WebP는 해당 플랫폼이 받는지 먼저 확인해야 합니다.",
      "파일명은 linen-shirt-white-front.jpg처럼 짧고 설명적인 영문 소문자로 짓고, 손대지 않은 원본은 따로 보관하세요.",
    ],
    body: [
      { type: "h2", text: "상품 전체에 하나의 캔버스 정하기" },
      {
        type: "p",
        text: "고객은 상품을 목록에서 나란히 놓고 비교합니다. 어떤 사진은 가로, 어떤 사진은 세로이고, 또 어떤 사진은 상품이 구석에 작게 찍혀 있으면 목록이 어수선해 보이고, 실제로는 비슷한 크기의 상품도 달라 보입니다. 쿠팡은 정사각형이 아닌 이미지를 등록하면 자동으로 리사이징한다고 안내하고, 네이버 쇼핑과 스마트스토어 목록도 정사각형 썸네일로 보여 주기 때문에 국내에서는 1:1로 준비하는 것이 일반적입니다. 내가 의도하지 않은 방식으로 잘리거나 줄어드는 일을 막으려면 처음부터 **정사각형**으로 만들어 두는 편이 안전합니다.",
      },
      {
        type: "p",
        text: "일관성에는 여백도 포함됩니다. 상품이 화면을 어느 정도 채울지 대략 정해 두고(아마존은 대표이미지에서 약 85%를 요구합니다) 모든 상품에 똑같이 적용하세요. 그래야 머그잔과 주전자가 한 가게의 상품처럼 보입니다.",
      },

      { type: "h2", text: "플랫폼별 이미지 기준" },
      {
        type: "table",
        caption: "각 플랫폼의 공개 안내 기준이며, 카테고리별 가이드나 상품 등록 화면의 안내가 우선합니다",
        head: ["플랫폼", "크기", "용량·형식", "배경·기타"],
        rows: [
          ["쿠팡 (대표이미지)", "최소 100px 이상, 권장 500 × 500px", "5MB 이하, JPG·PNG", "정사각형이 아니면 쿠팡이 자동 리사이징, 추가이미지는 9장까지"],
          ["네이버 스마트스토어", "정사각형(1:1)으로 준비하는 것이 일반적", "상품 등록 화면의 안내를 확인", "목록·검색 결과에 정사각형 썸네일로 노출"],
          ["Amazon (메인 이미지)", "긴 변 500~10,000px, 확대 보기를 위해 변당 1,000px 초과 권장", "JPEG(선호), PNG, TIFF, 움직이지 않는 GIF", "순백 배경(RGB 255, 255, 255), 상품이 화면의 약 85%"],
          ["Shopify", "정사각형은 2048 × 2048px이 가장 잘 보임, 최대 5000 × 5000px(25MP)", "20MB 미만, PNG·JPEG·WebP 등", "배경 규정 없음, 비율 통일 권장"],
        ],
      },
      {
        type: "p",
        text: "쿠팡이 권장하는 500 × 500px은 최소선에 가깝게 보는 것이 좋습니다. 고해상도 화면에서 크게 보거나 확대해 보는 고객을 생각하면 더 크게 준비해 두는 편이 낫고, 5MB 조건은 JPG 압축으로 어렵지 않게 맞출 수 있습니다. 스마트스토어의 정확한 픽셀·용량 기준은 정책에 따라 바뀔 수 있으니 상품 등록 화면에 표시되는 안내를 기준으로 삼으세요.",
      },

      { type: "h2", text: "여백을 채울까, 잘라낼까?" },
      {
        type: "p",
        text: "**여백 채우기(패딩)**는 사진 전체를 정사각형 안에 넣고 남는 공간을 배경색으로 채웁니다. 상품이 잘리는 일이 없어서 키 큰 병, 옆으로 긴 소파처럼 모양이 중요한 상품에 기본으로 쓰기 좋습니다. **자르기(크롭)**는 정사각형을 꽉 채우지만 바깥 부분은 사라지므로, 상품이 가운데 있고 주변에 여유가 있을 때만 알맞습니다.",
      },
      {
        type: "p",
        text: "여백은 사진 배경색과 같을 때만 자연스럽습니다. 밝은 회색 배경에서 찍은 사진에 흰 여백을 붙이면 양쪽에 띠가 보입니다. 배경이 순백이 아니라면 배경과 같은 색으로 여백을 채우거나, 여백이 필요 없도록 더 좁게 잘라 내세요. 흰 배경이 필수인 마켓이라면 여백으로 회색 배경을 하얗게 만들 수는 없으니, 흰 배경에서 촬영하거나 사진 편집 프로그램에서 먼저 배경을 지워야 합니다. Intera Tools에는 배경 제거 기능이 없습니다.",
      },
      {
        type: "p",
        text: "상품 크기도 함께 보세요. 원본에서 상품이 작게 찍혔다면 정사각형으로 여백을 채울수록 더 작아집니다. 이럴 때는 [이미지 자르기](/crop-image)에서 **1:1** 비율이나 **자유** 비율로 먼저 가깝게 잘라 낸 다음 여백을 채우세요.",
      },

      { type: "h2", text: "크기: 확대해 볼 만큼 크게, 다루기 쉬울 만큼 작게" },
      {
        type: "p",
        text: "**2000 × 2000px** 정도의 정사각형 원본을 만들어 두면 대부분의 기준을 함께 충족합니다. 쿠팡 권장 크기보다 넉넉하고, 아마존의 1,000px 확대 기준을 넘으며, Shopify 권장 2048px에도 가깝습니다. 플랫폼은 목록이나 모바일용 작은 이미지를 스스로 만들기 때문에 큰 이미지 한 장을 잘 준비해 올리면 됩니다. 단, 숫자를 맞추려고 작은 사진을 키우지는 마세요. 가장 좋은 컷이 가로 1200px이라면 1200px이 상한입니다. 확대해도 디테일은 생기지 않습니다.",
      },
      {
        type: "p",
        text: "이 크기라면 용량 걱정도 거의 없습니다. 2000 × 2000px은 400만 화소이고, 압축 없이 RGB로 저장해도 12MB이며, JPG로 저장하면 훨씬 작아집니다. 쿠팡의 5MB 조건도 품질을 적당히 두고 압축하면 충분히 맞출 수 있습니다. 자사몰을 직접 운영한다면 목록 페이지용으로 줄인 사본도 따로 쓰세요. 크기 정하는 법은 [화질 저하 없이 이미지 용량 줄이는 법](/guides/compress-images-without-losing-quality)에서 다룹니다.",
      },

      { type: "h2", text: "형식과 품질 고르기" },
      {
        type: "ul",
        items: [
          "**JPG**는 상품 사진의 기본입니다. 어느 마켓에서나 받고, 아마존은 JPEG를 선호한다고 밝히고 있습니다. 대표·확대 이미지는 [이미지 압축](/compress-image)의 **약하게**(품질 85), 추가 이미지는 보통 **균형**이면 충분합니다.",
          "**PNG**는 누끼 이미지용이지만, 쇼핑몰이 실제로 투명 배경을 보여 줄 때만 의미가 있습니다. 흰 배경이 필요한 곳이라면 [이미지 변환](/convert-image)에서 JPG로 바꾸고 **투명 영역 배경색**을 흰색으로 지정하세요.",
          "**WebP**는 자사몰에 쓰기 좋습니다. 같은 화질에서 보통 JPG보다 작습니다. 다만 마켓에 올리기 전에는 받는지 확인하세요. 쿠팡 안내는 JPG·PNG이고, 아마존의 허용 형식에도 WebP는 없습니다.",
        ],
      },

      { type: "h2", text: "검색에 도움이 되는 파일명" },
      {
        type: "p",
        text: "Google의 이미지 검색 가이드는 파일명이 이미지 주제에 대한 “아주 약한 단서”가 된다고 설명하며, `IMG00023.JPG`보다 `my-new-black-kitten.jpg`처럼 짧고 설명적인 이름을 권합니다. 대체 텍스트(alt)가 더 중요하므로 쇼핑몰이 제공하는 이미지 설명 칸도 꼭 채우세요. 자사몰 이미지가 Google 이미지 검색에 노출되는 경우 특히 의미가 있습니다.",
      },
      {
        type: "p",
        text: "실무에서는 **상품명-옵션-컷** 순서가 편합니다. `linen-shirt-white-front.jpg`, `linen-shirt-white-back.jpg`처럼 영문 소문자와 하이픈만 쓰고 공백과 특수문자는 빼세요. 한글 파일명도 쓸 수는 있지만 URL에서는 퍼센트 인코딩되어 길어지고, Mac에서 만든 한글 파일명은 Windows나 일부 업로드 시스템에서 자음과 모음이 분리되어 보이기도 합니다. 설명적인 이름은 촬영이 끝난 뒤 내 폴더에서 파일을 찾을 때도 도움이 됩니다.",
      },

      { type: "h2", text: "촬영분 전체를 한 번에 처리하기" },
      {
        type: "steps",
        items: [
          { title: "촬영한 사진 모두 추가", body: "상품 사진을 한꺼번에 선택합니다. 모든 처리는 브라우저 안에서 이뤄지고 업로드되지 않습니다." },
          { title: "크기 정하기", body: "흰색(또는 사진 배경과 같은 색) 배경으로 정확한 크기에 맞춰 여백을 채우도록 고르고, 예를 들어 2000 × 2000px로 지정합니다. 상품 주변에 여유가 있게 찍힌 사진만 가운데 자르기를 쓰세요." },
          { title: "형식과 품질 고르기", body: "마켓용은 JPG, 자사몰용은 WebP를 고르고, 경계와 질감이 깨끗하게 유지되는 품질로 설정합니다." },
          { title: "패턴으로 이름 바꾸기", body: "`linen-shirt-{n}` 같은 패턴을 쓰면 번호가 붙은 영문 소문자·하이픈 파일명으로 저장됩니다." },
          { title: "ZIP 하나로 받기", body: "ZIP 안의 파일을 쇼핑몰에 올리고, 손대지 않은 원본은 보관해 두세요. 플랫폼 기준이 바뀌면 원본에서 다시 만들면 됩니다." },
        ],
      },
      {
        type: "workflow",
        slug: "ecommerce-image-optimizer",
        text: "상품 사진 여러 장을 흰 정사각형 여백 맞추기, 형식 변환, 압축, 파일명 변경까지 한 번에 처리하고 ZIP으로 받을 수 있습니다.",
      },
    ],
    faq: [
      {
        q: "상품 사진은 몇 픽셀로 만들면 되나요?",
        a: "2000 × 2000px 정도의 정사각형이면 무난합니다. 쿠팡 권장 500 × 500px보다 넉넉하고 해외 플랫폼 기준에도 맞습니다. 다만 각 마켓의 상품 등록 화면에서 현재 기준을 확인하고, 작은 원본을 키워서 맞추지는 마세요.",
      },
      {
        q: "배경은 꼭 흰색이어야 하나요?",
        a: "아마존 메인 이미지는 순백(RGB 255, 255, 255)이 필수입니다. 국내 마켓은 카테고리별 가이드와 등록 화면 안내를 확인하세요. 규정이 없더라도 흰색이나 무채색 배경으로 통일하면 목록이 깔끔해지고 정사각형 여백도 티 나지 않습니다.",
      },
      {
        q: "JPG와 PNG 중 무엇으로 올려야 하나요?",
        a: "일반 상품 사진은 JPG가 맞습니다. 용량이 작고 어디서나 받습니다. PNG는 투명 배경을 실제로 보여 주는 곳에서 누끼 이미지를 쓸 때만 고르세요. 흰 배경이 필요하면 누끼 이미지를 흰색으로 채워 JPG로 바꾸면 됩니다.",
      },
      {
        q: "Intera Tools로 상품 사진 배경을 지울 수 있나요?",
        a: "아닙니다. 자르기, 크기 조절, 색 배경 여백 채우기, 형식 변환, 압축, 파일명 변경은 할 수 있지만 배경 제거 기능은 없습니다. 배경은 사진 편집 프로그램에서 먼저 지우고, 그 결과물을 일괄 처리하세요.",
      },
    ],
  },
};

export default guide;
