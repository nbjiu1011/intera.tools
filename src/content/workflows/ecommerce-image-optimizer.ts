import type { Locale } from "../../i18n/config";
import type { WorkflowContent } from "../types";

const content: Record<Locale, WorkflowContent> = {
  en: {
    name: "E-commerce Image Optimizer",
    short: "Square, compress, convert and rename product photos in one batch",
    metaTitle: "Product Photo Optimizer – Resize, Compress & Rename",
    metaDescription:
      "Prepare product photos in one run: pad or crop to an exact size like 1000×1000, compress, convert to JPG or WebP and rename files with a pattern. Free, in your browser.",
    h1: "E-commerce image optimizer",
    lead: "Turn a folder of product shots into a consistent, upload-ready set: same canvas size, sensible file size, one format and clean file names — then download everything as a ZIP.",
    stepLabels: ["Add photos", "Fit to size", "Compress", "Pick format", "Rename", "Download ZIP"],
    useCases: [
      {
        title: "A new product line for your store",
        body: "Supplier photos arrive in different sizes and orientations. Pad them all onto a 1000×1000 white canvas so the catalog grid lines up, and name them product-01, product-02… in the order you added them.",
      },
      {
        title: "Marketplace upload limits",
        body: "Marketplaces often cap file size and prefer JPG. Convert PNG and WebP exports to JPG at quality 85 and check the size of every file before you upload.",
      },
      {
        title: "Re-using photos on your own site",
        body: "For your own shop pages, export the same set as WebP at 1200×1200 with lowercase, hyphenated names that describe the product instead of IMG_4031.",
      },
    ],
    about: {
      title: "How the workflow processes each photo",
      paragraphs: [
        "Each image is decoded once in your browser and then goes through the steps in order. Sizing comes first. “Exact size, padded” scales the photo down until it fits inside the width and height you set and centers it on the background color, so nothing is cropped and every file ends up exactly the same size. “Exact size, cropped” fills the frame and trims what sticks out (you choose whether to keep the top, center or bottom). “Fit inside” only scales down and keeps each photo’s own proportions, and “Keep size” leaves the pixels alone. Small photos are never enlarged by the padded or fit modes, because upscaling only adds blur; they are centered with more background instead.",
        "The image is then encoded in the format you chose. JPG and WebP use the quality slider (85 is a good starting point for product shots); PNG is saved losslessly. “Keep” uses the original format where the browser can write it — GIF, BMP, AVIF, SVG and HEIC inputs become PNG. When a photo with transparency is saved as JPG, transparent areas are filled with the padding background color, or white when you aren’t padding.",
        "Finally every file is renamed with your pattern. {n} is a running number padded to the same width for the whole batch (01–12, or 001–120), {name} is the original name, and {w} and {h} insert the output size. With “Lowercase, hyphens instead of spaces” on, a name like “Red Mug Front.JPG” becomes red-mug-front.jpg. Your settings are remembered in this browser, and you can save them as named presets for different shops or marketplaces.",
      ],
    },
    limits: [
      "Up to 100 images per run, 50 MB each; accepts JPG, PNG, WebP, GIF, BMP, AVIF, SVG and, in browsers that can decode it, HEIC.",
      "Background removal isn’t included: padding adds a solid color around the photo but doesn’t cut the product out of its original background.",
      "Metadata such as camera details and GPS location is not carried over, because each image is re-encoded.",
      "WebP output needs a browser that can encode WebP; where it can’t (for example Safari), files are saved as JPG instead.",
      "Very large photos can exceed the canvas limit on iPhone and iPad (about 16.7 megapixels); use a computer for those.",
      "Animated GIFs are flattened to their first frame.",
    ],
    faq: [
      {
        q: "Which size should I choose for product photos?",
        a: "Use what your shop or marketplace asks for. Square sizes between 1000×1000 and 2000×2000 are common because they allow zoom and keep catalog grids even. If you’re unsure, 1200×1200 with a white background is a safe default; the product-photo guide lists the requirements of several platforms.",
      },
      {
        q: "Will my photos be cropped?",
        a: "Only with “Exact size, cropped”. “Exact size, padded” and “Fit inside” always keep the whole photo.",
      },
      {
        q: "How are the numbers in file names ordered?",
        a: "In the order the photos appear in the workspace, which is the order you added them. Start the numbering at any value with “Start at”.",
      },
      {
        q: "Are my product photos uploaded anywhere?",
        a: "No. Every step runs in your browser tab; the photos and the ZIP never leave your device.",
      },
    ],
  },
  ko: {
    name: "쇼핑몰 이미지 최적화",
    short: "상품 사진 크기 맞춤·압축·변환·이름 정리를 한 번에",
    metaTitle: "상품 사진 일괄 최적화 – 크기·압축·이름 변경",
    metaDescription:
      "상품 사진을 1000×1000 같은 정해진 크기로 맞추고, 압축하고, JPG·WebP로 바꾸고, 규칙에 따라 파일 이름까지 정리합니다. 브라우저에서 무료로 처리됩니다.",
    h1: "쇼핑몰 이미지 최적화",
    lead: "크기도 형식도 제각각인 상품 사진을 같은 캔버스 크기, 적당한 용량, 하나의 형식, 깔끔한 파일 이름으로 한 번에 정리하고 ZIP으로 내려받습니다.",
    stepLabels: ["사진 추가", "크기 맞추기", "압축", "형식 선택", "이름 변경", "ZIP 받기"],
    useCases: [
      {
        title: "새 상품을 등록할 때",
        body: "공급처에서 받은 사진은 크기와 방향이 제각각입니다. 모두 1000×1000 흰 배경에 맞춰 넣으면 상품 목록이 가지런해지고, 파일 이름도 추가한 순서대로 product-01, product-02…로 정리됩니다.",
      },
      {
        title: "오픈마켓 업로드 규격에 맞출 때",
        body: "오픈마켓은 용량 제한이 있고 JPG를 권장하는 경우가 많습니다. PNG나 WebP로 받은 이미지를 품질 85의 JPG로 바꾸고, 올리기 전에 파일마다 용량을 확인하세요.",
      },
      {
        title: "자사몰에 같은 사진을 쓸 때",
        body: "자사몰 상세 페이지용으로는 같은 사진을 1200×1200 WebP로 만들고, IMG_4031 대신 상품을 설명하는 소문자·하이픈 이름을 붙일 수 있습니다.",
      },
    ],
    about: {
      title: "사진 한 장이 처리되는 순서",
      paragraphs: [
        "각 이미지는 브라우저에서 한 번 읽어 들인 뒤 단계 순서대로 처리됩니다. 먼저 크기를 맞춥니다. ‘정확한 크기 · 여백 채우기’는 사진을 지정한 가로·세로 안에 들어가도록 줄인 뒤 배경색 가운데에 놓기 때문에 잘리는 부분이 없고 모든 파일 크기가 똑같아집니다. ‘정확한 크기 · 잘라 채우기’는 프레임을 가득 채우고 넘치는 부분을 잘라내며, 위·가운데·아래 중 어느 쪽을 남길지 고를 수 있습니다. ‘영역 안에 맞추기’는 사진 비율을 그대로 둔 채 줄이기만 하고, ‘크기 유지’는 픽셀을 바꾸지 않습니다. 작은 사진은 확대하면 흐려지기만 하므로 여백 채우기와 영역 맞추기에서는 키우지 않고 배경을 더 넓게 둡니다.",
        "다음으로 선택한 형식으로 저장합니다. JPG와 WebP는 품질 슬라이더 값을 쓰며(상품 사진은 85에서 시작하면 무난합니다), PNG는 무손실로 저장합니다. ‘원본 유지’는 브라우저가 저장할 수 있는 한 원래 형식을 쓰고, GIF·BMP·AVIF·SVG·HEIC는 PNG가 됩니다. 투명한 부분이 있는 사진을 JPG로 저장하면 투명 영역은 여백 배경색으로, 여백을 쓰지 않을 때는 흰색으로 채워집니다.",
        "마지막으로 이름 규칙에 따라 파일 이름을 바꿉니다. {n}은 일련번호로, 묶음 전체의 자릿수에 맞춰 01–12나 001–120처럼 채워집니다. {name}은 원래 이름, {w}와 {h}는 결과 크기입니다. ‘소문자로, 공백은 하이픈(-)으로’를 켜면 “Red Mug Front.JPG”가 red-mug-front.jpg가 됩니다. 한글 이름도 그대로 유지됩니다. 설정은 이 브라우저에 기억되며, 쇼핑몰이나 마켓별로 이름을 붙여 프리셋으로 저장할 수 있습니다.",
      ],
    },
    limits: [
      "한 번에 최대 100장, 장당 50MB까지 처리하며 JPG, PNG, WebP, GIF, BMP, AVIF, SVG와 브라우저가 지원하는 경우 HEIC를 받습니다.",
      "배경 제거 기능은 없습니다. 여백 채우기는 사진 둘레에 단색을 더할 뿐, 원래 배경에서 상품만 오려 내지는 않습니다.",
      "이미지를 다시 저장하므로 촬영 정보나 GPS 위치 같은 메타데이터는 남지 않습니다.",
      "WebP로 저장하려면 브라우저가 WebP 인코딩을 지원해야 합니다. 지원하지 않는 경우(예: Safari)에는 JPG로 저장합니다.",
      "아주 큰 사진은 iPhone·iPad의 캔버스 한도(약 1,670만 화소)를 넘을 수 있으니 PC에서 작업하세요.",
      "움직이는 GIF는 첫 프레임만 남습니다.",
    ],
    faq: [
      {
        q: "상품 사진은 어떤 크기로 맞춰야 하나요?",
        a: "판매하는 쇼핑몰이나 마켓의 등록 기준을 따르는 것이 가장 정확합니다. 확대 보기와 목록 정렬 때문에 1000×1000에서 2000×2000 사이의 정사각형을 많이 씁니다. 잘 모르겠다면 1200×1200 흰 배경이 무난하며, 플랫폼별 기준은 상품 사진 가이드에 정리해 두었습니다.",
      },
      {
        q: "사진이 잘리나요?",
        a: "‘정확한 크기 · 잘라 채우기’를 고를 때만 잘립니다. ‘정확한 크기 · 여백 채우기’와 ‘영역 안에 맞추기’는 항상 사진 전체를 유지합니다.",
      },
      {
        q: "파일 이름의 번호는 어떤 순서로 붙나요?",
        a: "작업 영역에 보이는 순서, 즉 사진을 추가한 순서대로 붙습니다. ‘시작 번호’로 첫 번호를 바꿀 수 있습니다.",
      },
      {
        q: "상품 사진이 어딘가에 업로드되나요?",
        a: "아니요. 모든 단계가 브라우저 탭 안에서 처리되며 사진과 ZIP 파일은 기기 밖으로 나가지 않습니다.",
      },
    ],
  },
};

export default content;
