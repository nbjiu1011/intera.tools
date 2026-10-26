import type { Locale } from "../../i18n/config";
import type { GuideContent } from "../types";

const guide: Record<Locale, GuideContent> = {
  en: {
    title: "PNG Transparency Explained: Alpha Channels, JPG Backgrounds and Edge Halos",
    metaTitle: "PNG Transparency Explained: Alpha, JPG and Halos",
    metaDescription:
      "How PNG stores transparency, why JPG can't, what happens to transparent areas when you convert, and how to avoid white halos around logos and cut-outs.",
    summary:
      "A transparent PNG is not an image with a missing background. Every pixel carries an extra value that says how opaque it is, and that value is what makes soft edges, shadows and see-through logos possible. This guide explains how the different kinds of PNG transparency work, what happens when a format without transparency gets involved, and how to keep edges clean when you resize, compress or convert.",
    takeaways: [
      "Most transparent PNGs use an 8-bit alpha channel: 256 levels from fully transparent (0) to fully opaque (255) for every pixel.",
      "JPG has no alpha channel. Converting to JPG always fills transparent areas with a solid color, which you can choose in Intera Tools.",
      "Soft edges are partly transparent. Flattening them onto one color and then placing the image on another color leaves a visible halo.",
      "PNG compression in Intera Tools reduces the image to a palette of at most 256 colors but keeps transparency, including semi-transparent edges.",
      "WebP also supports transparency and is often much smaller than PNG, but it is not accepted everywhere.",
    ],
    body: [
      { type: "h2", text: "How a PNG stores transparency" },
      {
        type: "p",
        text: "A normal color pixel has three values: red, green and blue. A PNG with an alpha channel adds a fourth value, alpha, which records how opaque the pixel is. That is why you see the term **RGBA**. In the common 8-bit version, alpha ranges from 0 to 255: 0 means the pixel is completely invisible, 255 means it fully covers whatever is behind it, and everything in between blends with the background. A pixel at alpha 128 shows roughly half of its own color and half of the background.",
      },
      {
        type: "p",
        text: "This is what makes a drop shadow fade out, or lets the anti-aliased edge of a round logo look smooth on any background. PNG also allows 16 bits per channel, which gives 65,536 alpha levels, but browsers work with 8 bits per channel, so a 16-bit PNG that passes through a browser-based tool is saved back as an 8-bit PNG.",
      },
      {
        type: "p",
        text: "According to the PNG specification, color values are stored **unpremultiplied** (\"straight\" alpha): a pixel keeps its full color even when it is almost transparent. Browsers usually work with premultiplied values internally. The practical effect is small: when an image is re-saved, the hidden color of fully transparent pixels is lost and very faint pixels can shift by a step or two. You will not see this in normal use.",
      },
      { type: "h3", text: "The other kinds of PNG transparency" },
      {
        type: "table",
        caption: "PNG color types and how they handle transparency",
        head: ["PNG type", "How transparency is stored", "Soft edges?"],
        rows: [
          ["Truecolor with alpha (RGBA)", "A full alpha value for every pixel", "Yes"],
          ["Grayscale with alpha", "Gray value plus alpha for every pixel", "Yes"],
          ["Indexed (palette, often called PNG-8)", "Up to 256 colors; a `tRNS` chunk gives each palette entry its own alpha value", "Yes, if the palette contains semi-transparent entries"],
          ["Truecolor or grayscale without alpha", "Optional `tRNS` chunk marks one exact color as fully transparent", "No, pixels are either visible or invisible"],
        ],
      },
      {
        type: "p",
        text: "The palette type matters because it is how small transparent PNGs are made. Instead of storing four values per pixel, the file stores one small palette index per pixel plus a table of colors, and the `tRNS` table adds an alpha value to each color. A logo with a few flat colors and a smooth edge can fit comfortably into such a palette.",
      },

      { type: "h2", text: "Why JPG can't be transparent" },
      {
        type: "p",
        text: "JPG stores only color (or grayscale) information. There is no alpha channel in the format, so there is no way to mark a pixel as see-through. When a transparent image is saved as JPG, every transparent or semi-transparent pixel has to be blended onto a solid color first. This is called **flattening**.",
      },
      {
        type: "p",
        text: "In Intera Tools, [PNG to JPG](/png-to-jpg), [WebP to JPG](/webp-to-jpg) and [Convert Image](/convert-image) with JPG as the target show a **Background for transparent areas** option. It is white by default, and you can pick any color. The other image tools keep the original format, so resizing, cropping, rotating or watermarking a PNG saves a PNG with its transparency intact.",
      },
      {
        type: "note",
        tone: "warning",
        title: "A checkerboard is not always transparency",
        text: "Editors and many websites show transparent areas as a gray-and-white checkerboard. Some images downloaded from the web have that checkerboard painted into the pixels, so they only look transparent. If the pattern is still there after you place the image on a colored background, the file has no real transparency.",
      },

      { type: "h2", text: "Edge halos and fringes" },
      {
        type: "p",
        text: "Halos appear because edge pixels are partly transparent. Imagine a dark blue logo with a smooth edge. The outermost pixels might be dark blue at 30% opacity. If you flatten the logo onto white, those pixels become a pale blue-white mix. Place the resulting JPG on a dark website header and every edge now has a thin light outline, because the white is baked in.",
      },
      {
        type: "p",
        text: "The same thing happens in reverse: a logo flattened onto black looks dirty on a white page. Trying to remove the white afterwards with a \"magic wand\" or color-to-transparent tool rarely works, because the edge pixels are no longer pure white. They are a mix that the tool cannot separate cleanly.",
      },
      {
        type: "ul",
        items: [
          "Keep the original transparent PNG as your master copy and make other versions from it.",
          "If you must flatten, choose a background color that matches where the image will appear. A logo for a dark navy banner should be flattened onto that navy, not white.",
          "Check the result on both a light and a dark background before you publish it.",
        ],
      },

      { type: "h2", text: "Making transparent PNGs smaller" },
      {
        type: "p",
        text: "PNG is lossless, so a large transparent image with photos or gradients can be several megabytes. When [Compress Image](/compress-image) processes a PNG, it reduces the image to an optimized palette, at most 256 colors, and saves an indexed PNG. The palette entries include alpha, so transparent areas and soft edges are kept. The **Light**, **Balanced** and **Strong** levels use 256, 160 and 64 colors, and you can set the exact number with **PNG colors**.",
      },
      {
        type: "p",
        text: "Fewer colors mostly affect smooth gradients and soft shadows, which can show visible steps (banding). Logos, icons and screenshots usually survive even strong reduction. If the compressed file would be larger than the original, Intera Tools keeps the original file instead.",
      },
      {
        type: "p",
        text: "WebP is the other option. It supports full alpha, and Google reports that lossy WebP with transparency is typically about three times smaller than the equivalent PNG. The catch is compatibility: some upload forms, older software and many print workflows still expect PNG or JPG. See [WebP format explained](/guides/webp-format-explained) for details.",
      },

      { type: "h2", text: "Keeping a logo transparent" },
      {
        type: "steps",
        items: [
          { title: "Start from the transparent original", body: "Use the PNG (or SVG) from your designer or brand kit, not a screenshot or a JPG copy. A JPG version has already lost its transparency." },
          { title: "Resize first", body: "Use [Resize Image](/resize-image) to make it the size you need, for example 600 px wide for an email signature. The output stays a PNG with transparency." },
          { title: "Compress with care", body: "Run it through [Compress Image](/compress-image) on **Light** (256 colors). Zoom in on the edges. If they look stepped or a soft shadow shows bands, keep the uncompressed PNG." },
          { title: "Test on two backgrounds", body: "Place the file on a white and a dark surface (a document, slide or web page). Clean edges on both mean the transparency is correct." },
        ],
      },

      { type: "h2", text: "Making a white-background image for a marketplace" },
      {
        type: "p",
        text: "Large marketplaces such as Amazon ask for main product images on a pure white background (RGB 255, 255, 255), and a transparent PNG may be shown on whatever background the site happens to use. If your product is already cut out on a transparent background, flattening it onto white gives you a predictable result. Check your marketplace's current image guide for its exact rules.",
      },
      {
        type: "steps",
        items: [
          { title: "Open PNG to JPG", body: "Add your cut-out PNGs to [PNG to JPG](/png-to-jpg). You can add up to 100 at once." },
          { title: "Keep the background white", body: "Leave **Background for transparent areas** at white (#ffffff). Set **Quality** high, around 90 or above, so the area right next to the product stays clean white." },
          { title: "Need PNG instead?", body: "If the platform specifically requires PNG, convert the white-background JPG with [JPG to PNG](/jpg-to-png). The white background stays, but the file will be larger than the JPG." },
        ],
      },
      {
        type: "note",
        tone: "info",
        text: "Intera Tools does not remove backgrounds. It fills transparency that already exists. A photo taken on a gray table needs to be cut out in an editor first.",
      },
      {
        type: "workflow",
        slug: "ecommerce-image-optimizer",
        text: "Preparing a whole catalog? The online store image workflow resizes or pads every image to the same size on a background color, converts it, renames the files and gives you one ZIP.",
      },
      {
        type: "tool",
        slug: "png-to-jpg",
        text: "Convert transparent PNGs to JPG and choose the background color yourself. Everything runs in your browser.",
      },
    ],
    faq: [
      {
        q: "Why does my transparent PNG show a black background in some apps?",
        a: "The image is still transparent, but the app ignores the alpha channel. Transparent pixels often store black as their hidden color, so an app that skips alpha shows black. Open the file in a browser or a modern image viewer to check it, or flatten it onto the color you want before sending it to that app.",
      },
      {
        q: "Does converting a PNG to JPG and back restore the transparency?",
        a: "No. When the image is saved as JPG, transparent areas are filled with the background color and the alpha information is discarded. Converting the JPG back to PNG gives you a PNG with a solid background.",
      },
      {
        q: "Does compressing a PNG remove transparency?",
        a: "Not in Intera Tools. PNG compression reduces the number of colors, but each palette color keeps its own transparency value, so transparent and semi-transparent areas survive. Only output as JPG removes transparency.",
      },
      {
        q: "Is PNG-8 good enough for a logo?",
        a: "Often yes. Logos with a few flat colors and smooth edges fit well into a 256-color palette with transparency. Logos with gradients, glows or photographic elements may show banding, so compare the result with the original before replacing it.",
      },
    ],
    sources: [
      { label: "W3C – PNG Specification (Third Edition)", url: "https://www.w3.org/TR/png-3/" },
      { label: "Google for Developers – WebP transparency and size figures", url: "https://developers.google.com/speed/webp" },
      { label: "Amazon Seller Forums – Main image requirements (pure white background)", url: "https://sellercentral.amazon.com/seller-forums/discussions/t/13af96ea-6b07-4bf9-8dbe-a13292c2e3b1" },
    ],
  },

  ko: {
    title: "PNG 투명 배경 완벽 이해: 알파 채널, JPG 변환, 테두리 번짐",
    metaTitle: "PNG 투명 배경의 원리와 JPG 변환 시 주의점",
    metaDescription:
      "PNG가 투명도를 저장하는 방식, JPG가 투명 배경을 지원하지 못하는 이유, 변환할 때 투명 영역이 어떻게 되는지, 로고 테두리에 흰 띠가 생기지 않게 하는 방법을 정리했습니다.",
    summary:
      "투명 PNG는 배경이 '없는' 이미지가 아닙니다. 픽셀 하나하나에 얼마나 불투명한지를 나타내는 값이 따로 들어 있고, 이 값 덕분에 부드러운 가장자리, 그림자, 뒤가 비치는 로고를 표현할 수 있습니다. 이 글에서는 PNG 투명도의 종류와 원리, 투명도를 지원하지 않는 형식으로 바꿀 때 생기는 일, 크기 조절·압축·변환을 거쳐도 가장자리를 깔끔하게 유지하는 방법을 설명합니다.",
    takeaways: [
      "대부분의 투명 PNG는 8비트 알파 채널을 씁니다. 픽셀마다 완전 투명(0)부터 완전 불투명(255)까지 256단계로 표현합니다.",
      "JPG에는 알파 채널이 없습니다. JPG로 변환하면 투명한 부분은 반드시 단색으로 채워지며, Intera Tools에서는 그 색을 직접 고를 수 있습니다.",
      "부드러운 가장자리는 반투명 픽셀입니다. 한 가지 색 위에 합친 뒤 다른 색 배경에 올리면 테두리에 띠가 보입니다.",
      "Intera Tools의 PNG 압축은 색상을 최대 256색 팔레트로 줄이지만 반투명 가장자리를 포함한 투명도는 그대로 유지합니다.",
      "WebP도 투명도를 지원하고 PNG보다 훨씬 작은 경우가 많지만, 아직 모든 곳에서 받아 주지는 않습니다.",
    ],
    body: [
      { type: "h2", text: "PNG는 투명도를 어떻게 저장할까" },
      {
        type: "p",
        text: "일반적인 컬러 픽셀은 빨강, 초록, 파랑 세 가지 값으로 이루어집니다. 알파 채널이 있는 PNG는 여기에 픽셀이 얼마나 불투명한지를 나타내는 네 번째 값, 알파를 더합니다. 그래서 **RGBA**라고 부릅니다. 흔히 쓰는 8비트 방식에서 알파는 0부터 255까지입니다. 0은 완전히 보이지 않는 픽셀, 255는 뒤를 완전히 가리는 픽셀이고, 그 사이 값은 배경과 섞여 보입니다. 알파가 128인 픽셀은 자기 색과 배경색이 대략 반반 섞인 모습이 됩니다.",
      },
      {
        type: "p",
        text: "그림자가 서서히 옅어지거나, 동그란 로고의 가장자리가 어떤 배경 위에서도 매끄럽게 보이는 것이 바로 이 덕분입니다. PNG는 채널당 16비트(알파 65,536단계)도 지원하지만 브라우저는 채널당 8비트로 이미지를 다루기 때문에, 브라우저 기반 도구를 거친 16비트 PNG는 8비트 PNG로 저장됩니다.",
      },
      {
        type: "p",
        text: "PNG 규격에 따르면 색상 값은 알파와 곱하지 않은 상태(**straight alpha**)로 저장됩니다. 거의 투명한 픽셀도 원래 색을 그대로 갖고 있다는 뜻입니다. 반면 브라우저는 내부적으로 알파를 미리 곱한(premultiplied) 값을 쓰는 경우가 많습니다. 그래서 다시 저장할 때 완전히 투명한 픽셀에 숨어 있던 색 정보가 사라지거나, 아주 옅은 픽셀의 값이 한두 단계 달라질 수 있습니다. 눈으로 보이는 차이는 아닙니다.",
      },
      { type: "h3", text: "PNG 투명도의 다른 방식들" },
      {
        type: "table",
        caption: "PNG 색상 유형별 투명도 처리 방식",
        head: ["PNG 유형", "투명도 저장 방식", "부드러운 가장자리"],
        rows: [
          ["트루컬러 + 알파(RGBA)", "모든 픽셀마다 알파 값을 따로 저장", "가능"],
          ["그레이스케일 + 알파", "회색 값과 알파 값을 픽셀마다 저장", "가능"],
          ["인덱스(팔레트, 흔히 PNG-8)", "최대 256색 팔레트, `tRNS` 청크가 팔레트 색마다 알파 값을 지정", "팔레트에 반투명 색이 있으면 가능"],
          ["알파 없는 트루컬러·그레이스케일", "`tRNS` 청크로 특정 색 하나만 완전 투명 처리", "불가능, 보이거나 안 보이거나 둘 중 하나"],
        ],
      },
      {
        type: "p",
        text: "작은 용량의 투명 PNG를 만드는 핵심이 팔레트 방식입니다. 픽셀마다 값 네 개를 저장하는 대신 짧은 팔레트 번호 하나와 색상표만 저장하고, `tRNS` 표가 각 색에 알파 값을 붙여 줍니다. 단색 몇 가지와 매끄러운 가장자리로 이루어진 로고라면 이 팔레트 안에 충분히 담깁니다.",
      },

      { type: "h2", text: "JPG가 투명 배경을 가질 수 없는 이유" },
      {
        type: "p",
        text: "JPG는 색상(또는 흑백) 정보만 저장합니다. 형식 자체에 알파 채널이 없으니 '이 픽셀은 비친다'고 표시할 방법이 없습니다. 그래서 투명한 이미지를 JPG로 저장하려면 투명하거나 반투명한 픽셀을 먼저 단색 배경과 합쳐야 합니다. 이 과정을 **플래튼(flatten)** 이라고 합니다.",
      },
      {
        type: "p",
        text: "Intera Tools의 [PNG를 JPG로 변환](/png-to-jpg), [WebP를 JPG로 변환](/webp-to-jpg), 그리고 JPG를 선택한 [이미지 변환](/convert-image)에는 **투명 영역 배경색** 옵션이 있습니다. 기본값은 흰색이고 원하는 색으로 바꿀 수 있습니다. 다른 이미지 도구는 원래 형식을 유지하므로, PNG의 크기를 바꾸거나 자르거나 회전하거나 워터마크를 넣어도 투명도가 그대로 있는 PNG로 저장됩니다.",
      },
      {
        type: "note",
        tone: "warning",
        title: "체크무늬가 보인다고 다 투명한 건 아닙니다",
        text: "편집 프로그램이나 여러 웹사이트는 투명한 부분을 회색·흰색 체크무늬로 보여 줍니다. 그런데 인터넷에서 받은 이미지 중에는 이 체크무늬가 아예 픽셀로 그려져 있어 투명해 보이기만 하는 경우가 있습니다. 색이 있는 배경 위에 올렸는데도 체크무늬가 남아 있다면 실제 투명도가 없는 파일입니다.",
      },

      { type: "h2", text: "테두리에 생기는 흰 띠(헤일로)" },
      {
        type: "p",
        text: "테두리 띠가 생기는 이유는 가장자리 픽셀이 반투명이기 때문입니다. 가장자리가 매끄러운 남색 로고를 생각해 보세요. 가장 바깥 픽셀은 불투명도 30% 정도의 남색일 수 있습니다. 이 로고를 흰색 위에 합치면 그 픽셀은 연한 남색과 흰색이 섞인 색으로 굳어집니다. 이렇게 만든 JPG를 어두운 웹사이트 상단에 올리면 흰색이 이미 섞여 있으니 가장자리마다 옅은 테두리가 보이게 됩니다.",
      },
      {
        type: "p",
        text: "반대도 마찬가지입니다. 검은색 위에 합친 로고는 흰 페이지에서 지저분해 보입니다. 나중에 '자동 선택'이나 '특정 색을 투명하게' 같은 기능으로 흰색을 지워도 잘 되지 않습니다. 가장자리 픽셀은 이미 순수한 흰색이 아니라 섞인 색이어서 깔끔하게 분리할 수 없기 때문입니다.",
      },
      {
        type: "ul",
        items: [
          "투명한 원본 PNG를 원본 파일로 보관하고, 다른 버전은 항상 이 원본에서 만듭니다.",
          "꼭 합쳐야 한다면 이미지가 실제로 놓일 배경과 같은 색을 고릅니다. 남색 배너에 쓸 로고라면 흰색이 아니라 그 남색 위에 합칩니다.",
          "게시하기 전에 밝은 배경과 어두운 배경 양쪽에서 확인합니다.",
        ],
      },

      { type: "h2", text: "투명 PNG 용량 줄이기" },
      {
        type: "p",
        text: "PNG는 무손실 형식이라 사진이나 그라데이션이 들어간 큰 투명 이미지는 몇 MB가 되기도 합니다. [이미지 압축](/compress-image)은 PNG를 최대 256색의 최적화된 팔레트로 줄여 인덱스 PNG로 저장합니다. 팔레트의 각 색에 알파 값이 포함되므로 투명한 영역과 부드러운 가장자리는 그대로 남습니다. **압축 강도**의 **약하게**, **균형**, **강하게**는 각각 256색, 160색, 64색을 쓰며, **PNG 색상 수**로 직접 지정할 수도 있습니다.",
      },
      {
        type: "p",
        text: "색 수를 줄이면 주로 매끄러운 그라데이션과 부드러운 그림자에 계단 모양의 줄(밴딩)이 생길 수 있습니다. 로고, 아이콘, 스크린샷은 강하게 줄여도 대개 괜찮습니다. 압축한 파일이 원본보다 커지면 Intera Tools는 원본 파일을 그대로 돌려줍니다.",
      },
      {
        type: "p",
        text: "다른 선택지는 WebP입니다. WebP는 알파 채널을 완전히 지원하며, Google은 투명도가 있는 손실 WebP가 같은 PNG보다 보통 3배 정도 작다고 밝히고 있습니다. 다만 일부 업로드 양식, 오래된 프로그램, 인쇄 작업은 여전히 PNG나 JPG를 요구합니다. 자세한 내용은 [WebP 형식 알아보기](/guides/webp-format-explained)를 참고하세요.",
      },

      { type: "h2", text: "로고를 투명한 상태로 유지하는 방법" },
      {
        type: "steps",
        items: [
          { title: "투명한 원본에서 시작하기", body: "디자이너나 브랜드 자료에서 받은 PNG(또는 SVG)를 쓰세요. 화면 캡처나 JPG 사본은 이미 투명도를 잃은 상태입니다." },
          { title: "크기부터 맞추기", body: "[이미지 크기 조절](/resize-image)로 필요한 크기, 예를 들어 이메일 서명용 너비 600px로 줄입니다. 결과는 투명도가 그대로 있는 PNG입니다." },
          { title: "신중하게 압축하기", body: "[이미지 압축](/compress-image)에서 **약하게**(256색)로 압축한 뒤 가장자리를 확대해 봅니다. 계단 현상이 보이거나 그림자에 줄이 생기면 압축하지 않은 PNG를 쓰세요." },
          { title: "두 가지 배경에서 확인하기", body: "흰 배경과 어두운 배경(문서, 슬라이드, 웹페이지 등)에 각각 올려 봅니다. 양쪽 모두 가장자리가 깔끔하면 투명도가 제대로 된 것입니다." },
        ],
      },

      { type: "h2", text: "쇼핑몰용 흰 배경 이미지 만들기" },
      {
        type: "p",
        text: "아마존 같은 대형 마켓은 대표 상품 이미지를 순백색 배경(RGB 255, 255, 255)으로 올리도록 요구합니다. 투명 PNG를 그대로 올리면 사이트가 어떤 배경 위에 보여 줄지 알 수 없습니다. 상품 사진이 이미 배경을 지운 투명 PNG라면 흰색 위에 합쳐 두는 편이 결과를 예측하기 쉽습니다. 정확한 기준은 스마트스토어, 쿠팡 등 입점한 마켓의 최신 이미지 가이드를 확인하세요.",
      },
      {
        type: "steps",
        items: [
          { title: "PNG를 JPG로 변환 열기", body: "배경을 지운 PNG를 [PNG를 JPG로 변환](/png-to-jpg)에 추가합니다. 한 번에 최대 100장까지 넣을 수 있습니다." },
          { title: "배경은 흰색으로 두기", body: "**투명 영역 배경색**을 흰색(#ffffff) 그대로 둡니다. 상품 바로 옆 배경까지 깨끗한 흰색으로 남도록 **품질**은 90 이상으로 높게 설정하세요." },
          { title: "PNG가 꼭 필요하다면", body: "플랫폼이 PNG만 받는다면 흰 배경 JPG를 [JPG를 PNG로 변환](/jpg-to-png)으로 다시 바꿉니다. 흰 배경은 유지되지만 파일은 JPG보다 커집니다." },
        ],
      },
      {
        type: "note",
        tone: "info",
        text: "Intera Tools는 배경을 지워 주는 기능이 없습니다. 이미 있는 투명 영역을 채울 뿐입니다. 회색 탁자 위에서 찍은 사진은 먼저 편집 프로그램에서 배경을 제거해야 합니다.",
      },
      {
        type: "workflow",
        slug: "ecommerce-image-optimizer",
        text: "상품 이미지가 많다면 쇼핑몰 이미지 워크플로를 써 보세요. 모든 이미지를 같은 크기로 맞추거나 배경색 위에 여백을 넣어 정사각형으로 만들고, 형식 변환과 파일 이름 정리까지 한 뒤 ZIP 하나로 내려받을 수 있습니다.",
      },
      {
        type: "tool",
        slug: "png-to-jpg",
        text: "투명 PNG를 JPG로 바꾸면서 배경색을 직접 고르세요. 모든 처리는 브라우저 안에서 이루어집니다.",
      },
    ],
    faq: [
      {
        q: "투명 PNG가 어떤 앱에서는 검은 배경으로 보입니다. 왜 그런가요?",
        a: "이미지는 여전히 투명하지만 그 앱이 알파 채널을 무시하는 것입니다. 투명 픽셀에는 보이지 않는 색으로 검은색이 저장된 경우가 많아, 알파를 읽지 않는 앱에서는 검게 보입니다. 브라우저나 최신 이미지 뷰어로 열어 확인하거나, 그 앱에 보내기 전에 원하는 색 위에 합쳐 두세요.",
      },
      {
        q: "PNG를 JPG로 바꿨다가 다시 PNG로 바꾸면 투명도가 돌아오나요?",
        a: "아니요. JPG로 저장하는 순간 투명한 영역은 배경색으로 채워지고 알파 정보는 버려집니다. 그 JPG를 다시 PNG로 바꾸면 배경이 단색으로 채워진 PNG가 됩니다.",
      },
      {
        q: "PNG를 압축하면 투명 배경이 사라지나요?",
        a: "Intera Tools에서는 사라지지 않습니다. PNG 압축은 색 수를 줄이지만 팔레트의 각 색이 자기 투명도 값을 갖고 있어 투명·반투명 영역이 그대로 남습니다. 투명도가 사라지는 것은 JPG로 저장할 때뿐입니다.",
      },
      {
        q: "로고에 PNG-8을 써도 괜찮을까요?",
        a: "대부분 괜찮습니다. 단색 몇 가지와 매끄러운 가장자리로 된 로고는 투명도가 있는 256색 팔레트에 잘 들어갑니다. 그라데이션, 빛 번짐 효과, 사진이 들어간 로고는 줄무늬가 생길 수 있으니 원본과 비교한 뒤 바꾸세요.",
      },
    ],
    sources: [
      { label: "W3C – PNG 규격(3판)", url: "https://www.w3.org/TR/png-3/" },
      { label: "Google 개발자 문서 – WebP 투명도와 용량 수치", url: "https://developers.google.com/speed/webp" },
      { label: "Amazon 셀러 포럼 – 메인 이미지 기준(순백 배경)", url: "https://sellercentral.amazon.com/seller-forums/discussions/t/13af96ea-6b07-4bf9-8dbe-a13292c2e3b1" },
    ],
  },
};

export default guide;
