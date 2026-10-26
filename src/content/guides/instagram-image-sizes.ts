import type { Locale } from "../../i18n/config";
import type { GuideContent } from "../types";

const guide: Record<Locale, GuideContent> = {
  en: {
    title: "Instagram Image Sizes and Aspect Ratios: Feed, Grid, Stories and Reels",
    metaTitle: "Instagram Image Sizes: Feed, Grid, Stories and Reels",
    metaDescription:
      "Pixel sizes for Instagram posts (1:1, 4:5, 3:4, 1.91:1), Stories and Reels (9:16), how the 3:4 profile grid crops posts, and how to prepare images.",
    summary:
      "Instagram stores feed photos at up to 1080 pixels wide and only accepts a limited range of shapes. Upload anything outside that range and the app crops or scales it for you, rarely where you would have. This guide lists the sizes that come through intact, explains how the profile grid has cropped posts since it switched to 3:4 tiles, and shows how to prepare images in your browser before you post.",
    takeaways: [
      "Work at 1080 px wide: 1080 × 1350 (4:5) or 1080 × 1440 (3:4) for portrait posts, 1080 × 1080 for square posts, 1080 × 1920 for Stories and Reels.",
      "The profile grid shows every post as a 3:4 thumbnail, so square and landscape posts lose their sides there, even though the feed shows them in full.",
      "Keep text and faces away from the top and bottom of 9:16 Stories and Reels, where Instagram draws its own buttons and captions.",
      "Crop to the exact ratio yourself before uploading, so you decide what gets cut instead of Instagram.",
    ],
    body: [
      { type: "h2", text: "Instagram sizes at a glance" },
      {
        type: "p",
        text: "Every size below is 1080 pixels wide, because that is the widest Instagram keeps a feed photo. What changes from one format to the next is the height, which follows from the aspect ratio.",
      },
      {
        type: "table",
        caption: "Recommended upload sizes",
        head: ["Format", "Aspect ratio", "Pixels (W × H)", "Notes"],
        rows: [
          ["Square post", "1:1", "1080 × 1080", "The grid crops it to 3:4, trimming both sides"],
          ["Portrait post", "4:5", "1080 × 1350", "The tallest shape in Instagram's long-standing range; the grid trims a thin strip at each side"],
          ["Tall portrait post", "3:4", "1080 × 1440", "Supported since 2025; same shape as a grid tile, so it is uncropped in both the feed and the grid"],
          ["Landscape post", "1.91:1", "1080 × 566", "The widest shape allowed; smallest on screen, and the grid shows only its middle"],
          ["Story or Reel", "9:16", "1080 × 1920", "Full screen; app controls cover the top and bottom"],
          ["Profile photo", "1:1, shown as a circle", "At least 320 × 320", "Displayed small and round, so keep the subject centered"],
        ],
      },
      {
        type: "note",
        tone: "info",
        title: "Where these numbers come from",
        text: "Instagram's Help Center describes feed photos as stored at widths between 320 and 1080 pixels with aspect ratios between 1.91:1 and 4:5. Instagram added 3:4 photos in 2025, after the profile grid moved to 3:4 tiles. Not every help page or third-party guide reflects that yet, and some scheduling tools that post through Meta's API may still crop 3:4 images to 4:5. Instagram doesn't publish a firm upload size for profile photos; 320 × 320 is a common recommendation, not an official spec.",
      },
      { type: "h2", text: "What Instagram does with other sizes" },
      {
        type: "p",
        text: "According to Instagram's Help Center, a photo between 320 and 1080 pixels wide keeps its resolution as long as its shape falls inside the supported range. A wider photo is scaled down to 1080 pixels. A photo narrower than 320 pixels is enlarged to 320 and looks soft. A photo whose shape is outside the range is cropped to fit: a 9:16 screenshot posted to the feed is cut down to a portrait shape, and a panorama is cut to 1.91:1. The post editor lets you move that crop, but not escape the limits.",
      },
      {
        type: "p",
        text: "Instagram also re-encodes every photo it receives, even one that already has the right size. You can't switch that off, but you can avoid adding a second round of loss on top of it. Upload a good-quality JPG, not one that has already been compressed hard for another purpose, at the final size and ratio. Instagram then only has to re-encode it, without scaling or cropping first.",
      },
      { type: "h2", text: "Why 1080 pixels wide" },
      {
        type: "p",
        text: "1080 pixels is the most Instagram keeps, so anything wider is downscaled on Instagram's side. Doing it yourself lets you choose the crop, check the result before posting and upload less over mobile data. Going below 1080 doesn't save anything you'd notice. It only makes the photo softer on high-density phone screens. Stories and Reels use the same width, in a 1080 × 1920 frame.",
      },
      {
        type: "p",
        text: "Resolution settings such as 72 or 300 DPI make no difference here. Instagram ignores the DPI value stored in the file; only the pixel dimensions count.",
      },
      { type: "h2", text: "The profile grid crops posts to 3:4" },
      {
        type: "p",
        text: "Since early 2025 the profile grid has shown posts as vertical 3:4 tiles instead of squares. The feed still shows each post at the ratio you uploaded. Only the grid thumbnail is cropped, from the center. Here is how much that removes at the sizes above (calculated from the ratios):",
      },
      {
        type: "ul",
        items: [
          "**4:5 (1080 × 1350):** the thumbnail shows the middle 1012 pixels of the width, so about 34 pixels disappear from each side.",
          "**1:1 (1080 × 1080):** only the middle 810 pixels of the width remain, so 135 pixels disappear from each side. Text near the edges of square graphics is what usually gets clipped.",
          "**1.91:1 (1080 × 566):** less than 40% of the width is visible in the grid.",
          "**3:4 (1080 × 1440):** nothing is cropped, because the post already has the tile's shape.",
        ],
      },
      {
        type: "p",
        text: "If your grid matters, for example for a shop or portfolio account, post at 3:4. Or post at 4:5 and keep important content inside the central 3:4 area. Many phone cameras shoot 4:3 photos by default, and held upright that is exactly 3:4, so those photos only need resizing to 1080 × 1440.",
      },
      { type: "h2", text: "Safe zones for Stories and Reels" },
      {
        type: "p",
        text: "A 9:16 frame fills the screen, but Instagram draws on top of it: the progress bar, account name and close button at the top, and the reply field, caption and action buttons at the bottom. Instagram doesn't publish one official overlay map for regular posts. Meta's ad guidance for Stories, which is widely quoted, recommends keeping roughly the top and bottom 14% free of text and logos. On a 1920-pixel frame, that's about 250 pixels.",
      },
      {
        type: "ul",
        items: [
          "Keep headlines, faces and logos in the middle of the frame, at least about 250 pixels from the top edge.",
          "Leave more room at the bottom of Reels than of Stories. Reels show the caption, audio info and like, comment and share buttons there and along the right edge.",
          "A Reel's cover appears in the profile grid as a 3:4 crop of the frame's center, so put the title of a cover image in the middle.",
          "Overlay positions change between app versions and devices, so preview the Story or Reel on your phone before sharing it.",
        ],
      },
      { type: "h2", text: "How to prepare a photo with Crop Image" },
      {
        type: "p",
        text: "[Crop Image](/crop-image) works on one image at a time. Its **Aspect ratio** presets are **Free**, 1:1, 4:3, 3:2, 16:9, 4:5 and 9:16. For 3:4 and 1.91:1 there is no preset. Use **Free** and type the size you want.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Open your photo",
            body: "Open [Crop Image](/crop-image) and drop the photo onto the page or choose it. It is processed in your browser and isn't uploaded.",
          },
          {
            title: "Choose the ratio",
            body: "Under **Aspect ratio**, choose **4:5** for a portrait post, **1:1** for a square post or **9:16** for a Story or Reel. The crop box jumps to the largest centered area with that shape.",
          },
          {
            title: "Position the crop",
            body: "Drag the box or its handles; the ratio stays locked. To nudge the box by 1 pixel, select it and use the arrow keys (hold Shift to move 10 pixels). For 3:4 or 1.91:1, choose **Free** and enter **Width** and **Height** in the same proportion, for example 3024 × 4032 for 3:4 or 4032 × 2111 for 1.91:1.",
          },
          {
            title: "Crop, then resize to 1080",
            body: "Click **Crop image**. The crop keeps the photo's original resolution, so under **Continue with**, choose Resize Image. Set **Width** to 1080 with **Keep aspect ratio** on, and download the result.",
          },
        ],
      },
      { type: "tool", slug: "crop-image", text: "Crop a photo to 1:1, 4:5 or 9:16 in your browser, with no upload." },
      {
        type: "workflow",
        slug: "social-media-image-prep",
        text: "Preparing a whole batch, or the same photos for several platforms? The Social Media Image Prep workflow crops and resizes many images at once to presets including Instagram 1080 × 1080, 1080 × 1350, 1080 × 1440 and Story/Reels 1080 × 1920, then downloads them as a ZIP.",
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Placing text right up to the edges of a square graphic, which the 3:4 grid then clips.",
          "Mixing ratios in a carousel. Instagram shows every slide in one shared shape, so crop all slides to the same ratio first.",
          "Compressing a photo hard before uploading. Instagram compresses it again, and the artifacts add up.",
        ],
      },
    ],
    faq: [
      {
        q: "Is 4:5 or 3:4 better for feed posts?",
        a: "3:4 (1080 × 1440) takes up more screen height and shows uncropped in the profile grid. 4:5 (1080 × 1350) is the older limit, and every tool that posts to Instagram accepts it. If you schedule posts through a third-party app, check that it supports 3:4 before switching.",
      },
      {
        q: "Why does my photo look blurry after posting?",
        a: "Usually because the photo was small to begin with (Instagram enlarges anything under 320 pixels wide), or because it had already been compressed heavily before Instagram compressed it again. Upload a good-quality JPG that is 1080 pixels wide.",
      },
      {
        q: "What size should a Reel cover be?",
        a: "Make it 1080 × 1920 like the Reel itself, with the title near the middle. The profile grid shows only a 3:4 crop of the center.",
      },
      {
        q: "Are my photos uploaded when I crop or resize them on Intera Tools?",
        a: "No. Cropping and resizing run in your browser, and the files never leave your device. Because the image is re-encoded, the result also drops the original metadata, including GPS location.",
      },
    ],
  },
  ko: {
    title: "인스타그램 이미지 사이즈와 비율 총정리: 피드, 프로필 그리드, 스토리, 릴스",
    metaTitle: "인스타그램 이미지 사이즈·비율 총정리",
    metaDescription:
      "인스타그램 피드(1:1, 4:5, 3:4, 1.91:1)와 스토리·릴스(9:16)의 권장 픽셀 크기, 3:4 프로필 그리드에서 잘리는 범위, 업로드 전에 사진을 준비하는 방법을 정리했습니다.",
    summary:
      "인스타그램은 피드 사진을 최대 가로 1080픽셀로 저장하고 정해진 범위의 비율만 받습니다. 이 범위를 벗어난 사진을 올리면 앱이 알아서 자르거나 줄이는데, 내가 원하는 위치로 잘라 주는 경우는 드뭅니다. 이 글에서는 잘리지 않고 그대로 올라가는 사이즈와 3:4로 바뀐 프로필 그리드의 크롭 방식, 업로드 전에 브라우저에서 사진을 준비하는 방법을 설명합니다.",
    takeaways: [
      "가로 1080px로 맞추세요. 세로형 게시물은 1080 × 1350(4:5) 또는 1080 × 1440(3:4), 정사각형은 1080 × 1080, 스토리·릴스는 1080 × 1920입니다.",
      "프로필 그리드는 모든 게시물을 3:4 썸네일로 보여 줍니다. 피드에서는 전체가 보여도 정사각형·가로형 사진은 그리드에서 양옆이 잘립니다.",
      "9:16 스토리·릴스는 위아래에 앱 버튼과 캡션이 겹치므로 글자와 얼굴은 화면 가운데에 두세요.",
      "업로드 전에 비율을 직접 맞춰 잘라 두면 인스타그램이 아니라 내가 잘릴 부분을 정할 수 있습니다.",
    ],
    body: [
      { type: "h2", text: "한눈에 보는 인스타그램 사이즈" },
      {
        type: "p",
        text: "아래 사이즈는 모두 가로가 1080픽셀입니다. 인스타그램이 피드 사진을 저장하는 최대 너비가 1080픽셀이기 때문입니다. 형식마다 달라지는 것은 비율에 따라 정해지는 세로 길이뿐입니다.",
      },
      {
        type: "table",
        caption: "권장 업로드 사이즈",
        head: ["형식", "비율", "픽셀(가로 × 세로)", "참고"],
        rows: [
          ["정사각형 게시물", "1:1", "1080 × 1080", "그리드에서는 3:4로 잘려 양옆이 줄어듭니다"],
          ["세로형 게시물", "4:5", "1080 × 1350", "기존 허용 범위에서 가장 긴 세로 비율이며, 그리드에서 양옆이 조금 잘립니다"],
          ["긴 세로형 게시물", "3:4", "1080 × 1440", "2025년부터 지원되며, 그리드 칸과 비율이 같아 피드와 그리드 모두 잘리지 않습니다"],
          ["가로형 게시물", "1.91:1", "1080 × 566", "허용되는 가장 넓은 비율로, 화면에서 가장 작게 보이고 그리드에는 가운데만 나옵니다"],
          ["스토리·릴스", "9:16", "1080 × 1920", "전체 화면이며, 위아래에 앱 버튼이 겹칩니다"],
          ["프로필 사진", "1:1(원형으로 표시)", "320 × 320 이상", "작은 원으로 표시되므로 인물을 가운데에 두세요"],
        ],
      },
      {
        type: "note",
        tone: "info",
        title: "수치의 출처",
        text: "인스타그램 고객센터는 피드 사진을 가로 320~1080픽셀, 비율 1.91:1~4:5 범위로 저장한다고 안내합니다. 3:4 사진은 프로필 그리드가 3:4로 바뀐 뒤인 2025년에 추가되었습니다. 아직 일부 도움말 페이지와 외부 가이드에는 반영되지 않았고, Meta API로 게시하는 일부 예약 도구는 3:4 이미지를 4:5로 자를 수 있습니다. 프로필 사진의 업로드 크기는 공식적으로 정해져 있지 않으며, 320 × 320은 흔히 쓰이는 권장값일 뿐 공식 규격은 아닙니다.",
      },
      { type: "h2", text: "규격에 맞지 않는 사진은 어떻게 처리될까" },
      {
        type: "p",
        text: "인스타그램 고객센터에 따르면, 가로 320~1080픽셀이고 비율이 지원 범위 안에 있는 사진은 해상도가 그대로 유지됩니다. 이보다 넓은 사진은 1080픽셀로 줄어들고, 가로 320픽셀보다 작은 사진은 320픽셀로 확대되어 흐릿해집니다. 비율이 범위를 벗어나면 범위에 맞게 잘립니다. 9:16 스크린숏을 피드에 올리면 세로형 비율로 잘리고, 파노라마 사진은 1.91:1로 잘립니다. 게시물 편집 화면에서 자를 위치는 옮길 수 있지만 허용 범위를 벗어날 수는 없습니다.",
      },
      {
        type: "p",
        text: "인스타그램은 사이즈가 맞는 사진이라도 업로드된 사진을 모두 다시 인코딩합니다. 이 과정은 끌 수 없지만, 그 위에 화질 손실이 한 번 더 쌓이는 것은 피할 수 있습니다. 다른 용도로 이미 강하게 압축한 파일 말고, 화질이 좋은 JPG를 최종 사이즈와 비율로 올리세요. 그러면 인스타그램은 크기를 바꾸거나 자르지 않고 다시 인코딩만 합니다.",
      },
      { type: "h2", text: "왜 가로 1080픽셀일까" },
      {
        type: "p",
        text: "인스타그램이 저장하는 최대 너비가 1080픽셀이므로 이보다 큰 사진은 인스타그램 쪽에서 줄어듭니다. 이 작업을 직접 하면 자를 위치를 내가 정하고 게시 전에 결과를 확인할 수 있으며, 모바일 데이터로 올릴 때 용량도 줄어듭니다. 1080픽셀보다 작게 만들어도 체감할 만한 이득은 없고, 고해상도 휴대폰 화면에서 사진이 흐려 보이기만 합니다. 스토리와 릴스도 같은 너비의 1080 × 1920 화면을 씁니다.",
      },
      {
        type: "p",
        text: "72DPI, 300DPI 같은 해상도 설정은 여기서 아무 의미가 없습니다. 인스타그램은 파일에 기록된 DPI 값을 무시하고 픽셀 크기만 봅니다.",
      },
      { type: "h2", text: "프로필 그리드는 3:4로 잘립니다" },
      {
        type: "p",
        text: "2025년 초부터 프로필 그리드는 게시물을 정사각형 대신 세로로 긴 3:4 칸으로 보여 줍니다. 피드에서는 여전히 올린 비율 그대로 보이고, 그리드 썸네일만 가운데를 기준으로 잘립니다. 위 사이즈별로 잘리는 범위를 비율로 계산하면 다음과 같습니다.",
      },
      {
        type: "ul",
        items: [
          "**4:5(1080 × 1350):** 가로 중 가운데 1012픽셀만 보입니다. 양옆이 약 34픽셀씩 잘립니다.",
          "**1:1(1080 × 1080):** 가운데 810픽셀만 남고 양옆이 135픽셀씩 잘립니다. 정사각형 카드뉴스에서 가장자리에 붙은 글자가 잘리는 것이 이 때문입니다.",
          "**1.91:1(1080 × 566):** 그리드에는 가로의 40%도 보이지 않습니다.",
          "**3:4(1080 × 1440):** 그리드 칸과 비율이 같아 잘리는 부분이 없습니다.",
        ],
      },
      {
        type: "p",
        text: "쇼핑몰이나 포트폴리오 계정처럼 그리드가 중요하다면 3:4로 올리세요. 4:5로 올린다면 중요한 내용을 가운데 3:4 영역 안에 두면 됩니다. 휴대폰 카메라는 기본 설정이 4:3인 경우가 많은데, 세로로 들고 찍으면 정확히 3:4이므로 1080 × 1440으로 크기만 줄이면 됩니다.",
      },
      { type: "h2", text: "스토리·릴스의 안전 영역" },
      {
        type: "p",
        text: "9:16 화면은 휴대폰 전체를 채우지만, 위에는 진행 표시줄·계정 이름·닫기 버튼이, 아래에는 답장 입력창·캡션·버튼이 겹칩니다. 일반 게시물용 공식 오버레이 영역은 따로 공개되어 있지 않습니다. 널리 인용되는 Meta의 스토리 광고 가이드는 위아래 약 14%를 글자와 로고 없이 비워 두라고 권장하며, 1920픽셀 화면에서는 약 250픽셀입니다.",
      },
      {
        type: "ul",
        items: [
          "제목, 얼굴, 로고는 화면 가운데에 두고, 위쪽 끝에서 최소 250픽셀 정도 떨어뜨리세요.",
          "릴스는 스토리보다 아래쪽 여백을 더 넉넉히 두세요. 아래쪽과 오른쪽 가장자리에 캡션, 오디오 정보, 좋아요·댓글·공유 버튼이 표시됩니다.",
          "릴스 커버는 프로필 그리드에서 화면 가운데를 3:4로 자른 모양으로 보이므로, 커버 이미지의 제목은 가운데에 넣으세요.",
          "오버레이 위치는 앱 버전과 기기에 따라 달라지므로, 공유하기 전에 휴대폰에서 미리 확인하세요.",
        ],
      },
      { type: "h2", text: "이미지 자르기로 사진 준비하기" },
      {
        type: "p",
        text: "[이미지 자르기](/crop-image)는 한 번에 한 장씩 작업합니다. **비율** 프리셋은 **자유**, 1:1, 4:3, 3:2, 16:9, 4:5, 9:16입니다. 3:4와 1.91:1은 프리셋이 없으니 **자유**를 고르고 크기를 직접 입력하세요.",
      },
      {
        type: "steps",
        items: [
          {
            title: "사진 열기",
            body: "[이미지 자르기](/crop-image)를 열고 사진을 끌어다 놓거나 선택합니다. 사진은 브라우저에서 처리되며 업로드되지 않습니다.",
          },
          {
            title: "비율 고르기",
            body: "**비율**에서 세로형 게시물은 **4:5**, 정사각형은 **1:1**, 스토리·릴스는 **9:16**을 고릅니다. 자르기 영역이 해당 비율로 가능한 가장 큰 가운데 영역으로 바뀝니다.",
          },
          {
            title: "자를 위치 맞추기",
            body: "영역이나 모서리 핸들을 끌어 조정합니다. 비율은 고정된 채로 유지됩니다. 영역을 선택한 뒤 방향키를 누르면 1픽셀씩(Shift를 누르면 10픽셀씩) 움직입니다. 3:4나 1.91:1이 필요하면 **자유**를 고르고 **너비**와 **높이**를 비율에 맞춰 입력하세요. 예를 들어 3:4는 3024 × 4032, 1.91:1은 4032 × 2111입니다.",
          },
          {
            title: "자른 뒤 1080으로 줄이기",
            body: "**이미지 자르기**를 누릅니다. 자른 결과는 원본 해상도를 그대로 유지하므로, **이어서 작업하기**에서 이미지 크기 조절을 고르세요. **가로세로 비율 유지**를 켠 채 **너비**를 1080으로 입력하고 결과를 다운로드합니다.",
          },
        ],
      },
      { type: "tool", slug: "crop-image", text: "업로드 없이 브라우저에서 사진을 1:1, 4:5, 9:16으로 자릅니다." },
      {
        type: "workflow",
        slug: "social-media-image-prep",
        text: "사진이 여러 장이거나 같은 사진을 여러 플랫폼용으로 만들어야 하나요? SNS 이미지 준비 워크플로는 인스타그램 1080 × 1080, 1080 × 1350, 1080 × 1440, 스토리·릴스 1080 × 1920 등의 프리셋에 맞춰 여러 장을 한 번에 자르고 크기를 맞춘 뒤 ZIP으로 내려받게 해 줍니다.",
      },
      { type: "h2", text: "자주 하는 실수" },
      {
        type: "ul",
        items: [
          "정사각형 이미지의 가장자리 끝까지 글자를 넣어, 3:4 그리드에서 글자가 잘리는 경우.",
          "캐러셀에 비율이 다른 사진을 섞는 경우. 캐러셀은 모든 사진을 같은 모양으로 보여 주므로 미리 같은 비율로 잘라 두세요.",
          "업로드 전에 사진을 강하게 압축하는 경우. 인스타그램이 한 번 더 압축하면서 깨짐이 겹칩니다.",
        ],
      },
    ],
    faq: [
      {
        q: "피드 게시물은 4:5와 3:4 중 무엇이 좋을까요?",
        a: "3:4(1080 × 1440)는 화면을 세로로 더 많이 차지하고 프로필 그리드에서도 잘리지 않습니다. 4:5(1080 × 1350)는 예전부터 쓰던 한계 비율이라 인스타그램에 게시하는 모든 도구가 지원합니다. 외부 예약 게시 앱을 쓴다면 3:4를 지원하는지 먼저 확인하세요.",
      },
      {
        q: "올리고 나니 사진이 흐려 보이는 이유는 무엇인가요?",
        a: "원본이 너무 작았거나(가로 320픽셀 미만은 확대됩니다), 이미 강하게 압축된 사진을 인스타그램이 한 번 더 압축했기 때문인 경우가 대부분입니다. 가로 1080픽셀의 화질 좋은 JPG로 올려 보세요.",
      },
      {
        q: "릴스 커버는 어떤 크기로 만들어야 하나요?",
        a: "릴스와 같은 1080 × 1920으로 만들고 제목은 가운데 근처에 두세요. 프로필 그리드에는 가운데를 3:4로 자른 부분만 보입니다.",
      },
      {
        q: "Intera Tools에서 자르거나 크기를 바꾸면 사진이 업로드되나요?",
        a: "아닙니다. 자르기와 크기 조절은 브라우저 안에서 처리되어 파일이 기기 밖으로 나가지 않습니다. 이미지를 다시 인코딩하므로 결과물에는 GPS 위치를 포함한 원본 메타데이터도 빠집니다.",
      },
    ],
  },
};

export default guide;
