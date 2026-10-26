import type { Locale } from "../../i18n/config";
import type { GuideContent } from "../types";

const guide: Record<Locale, GuideContent> = {
  en: {
    title: "How to Make Photos Small Enough to Email",
    metaTitle: "Resize Photos for Email: Get Under Attachment Limits",
    metaDescription:
      "Gmail allows 25 MB of attachments, Outlook 20–25 MB. Learn how to resize and compress photos to fit, when to send one PDF instead, and why ZIP rarely helps.",
    summary:
      "Phone photos are often several megabytes each, so a handful of them can blow past an email provider's attachment limit. This guide lists the current limits, explains why you should stay well below them, and walks through resizing, compressing and bundling photos so they arrive as real attachments instead of bouncing or turning into a cloud link.",
    takeaways: [
      "Gmail allows 25 MB of attachments per message; Microsoft gives 20 MB or 25 MB for Outlook.com depending on the help page. Plan for 20 MB or less.",
      "Attachments grow by roughly a third when encoded for sending, so a total of about 15 MB is a safe target for unknown recipients.",
      "Resizing to 1600–2000 px on the long side and compressing at Balanced is enough for on-screen viewing and cuts most photos dramatically.",
      "For many photos, one PDF keeps them in order and in a single file. ZIP bundles files but barely shrinks JPGs.",
    ],
    body: [
      { type: "h2", text: "Attachment limits at a glance" },
      {
        type: "table",
        caption: "Limits for personal accounts as published by each provider; work and school accounts are set by the administrator",
        head: ["Service", "Limit", "What happens above it"],
        rows: [
          ["Gmail (personal)", "25 MB total attachments per message", "Gmail removes the attachment and inserts a Google Drive link instead"],
          ["Outlook.com", "25 MB per attachment (Outlook.com sending limits page); classic Outlook help gives 20 MB per message, including the text", "You can share a OneDrive link instead; OneDrive attachments can be up to 2 GB"],
          ["Microsoft 365 work accounts", "35 MB per message by default; admins can set 1–150 MB", "The message is rejected with a delivery failure notice"],
          ["Naver Mail", "Files above the regular attachment limit shown in the compose window", "They are sent as “large attachments”: a download link that expires after a set period"],
        ],
      },
      {
        type: "p",
        text: "Two details make these numbers smaller in practice. First, email attachments are converted to text (Base64) for sending, which makes them roughly a third larger in transit; Microsoft's own Exchange documentation describes this as a 33% encoding increase. Second, your message must also fit the **recipient's** server, and you rarely know that limit. A total of around **15 MB** of files comes to about 20 MB once encoded, so it still fits a 20 MB ceiling, which is why it is a good target when you are not sure who is on the other end.",
      },

      { type: "h2", text: "Work out a per-photo budget" },
      {
        type: "p",
        text: "Divide your target by the number of photos. Fifteen photos in a 15 MB budget means about 1 MB each; thirty photos means about 500 KB each. If the photos come straight from a phone, they are usually several times over that budget, and the quickest way to close the gap is to reduce the pixel count, not to crank compression up.",
      },
      {
        type: "p",
        text: "A long edge of **1600–2000 px** fills a laptop or phone screen comfortably and still allows zooming in a little. A typical 12-megapixel phone photo is 4032 × 3024 px; at 2000 × 1500 px it keeps about a quarter of the pixels, and at 1600 × 1200 px about 16%. Only send full-resolution originals when the recipient needs to print large or edit the photos, and in that case a cloud link is usually the better channel anyway.",
      },

      { type: "h2", text: "Resize and compress in two passes" },
      {
        type: "steps",
        items: [
          { title: "Add the photos to Resize Image", body: "Drop up to 100 photos into [Resize Image](/resize-image). Nothing is uploaded; everything happens in your browser." },
          { title: "Set a width in pixels", body: "Choose **Pixels** under **Resize by** and enter **1600** as the **Width**, with **Keep aspect ratio** on. With several images the width is applied to each one and the height follows its ratio, so portrait shots come out 1600 px wide and about 2133 px tall (for 3:4 photos). If you want the long edge capped exactly, resize landscape and portrait photos in two separate batches." },
          { title: "Continue with Compress Image", body: "On the results screen, choose **Continue with** → Compress Image. Pick **Balanced**; it is usually enough to land well inside the budget." },
          { title: "Check the total and download", body: "The results show each file's saving and the total saved. Download the files individually or with **Download all (ZIP)**." },
        ],
      },
      {
        type: "note",
        tone: "tip",
        title: "A privacy bonus",
        text: "Compressing re-encodes the pixels, so metadata such as the camera model and GPS location is not carried over. That matters when you email photos taken at home. Phone photos are also turned upright according to their orientation tag, so they don't arrive sideways.",
      },

      { type: "h2", text: "Many photos? Send one PDF instead" },
      {
        type: "p",
        text: "Twenty separate attachments are awkward to open on a phone, arrive in whatever order the mail app chooses, and are easy to miss. Putting them into a single PDF keeps the sequence you chose and gives the recipient one file to open, forward or print. This works well for receipts, documents photographed with a phone, property or damage photos, and anything that will be printed.",
      },
      {
        type: "p",
        text: "In [JPG to PDF](/jpg-to-pdf), drag the photos into order, choose a **Page size** (**A4**, **US Letter** or **Fit to image**), a **Margin**, and **One PDF with all images**. Upright JPGs are placed into the PDF as they are, without being compressed again, so the PDF is roughly the size of the photos you put in. That is why you should resize and compress **before** making the PDF. PNG files are embedded losslessly and can make a PDF very large, so convert photo PNGs to JPG first. If you'd rather do it in one go, the [images to PDF workflow](/workflows/images-to-pdf-document) can also downscale and recompress images while building the PDF.",
      },
      {
        type: "tool",
        slug: "jpg-to-pdf",
        text: "Combine resized photos into one PDF in the order you choose, on A4, US Letter or pages that fit each image.",
      },

      { type: "h2", text: "Does zipping help?" },
      {
        type: "p",
        text: "Barely, for photos. JPG, PNG and WebP are already compressed, and ZIP's general-purpose compression finds very little left to squeeze. A ZIP is still useful as a container: it keeps file names intact and turns fifty attachments into one. Just don't expect it to rescue an email that is over the limit; resize and compress first, then zip if you want a single file. Bear in mind that some recipients, especially on phones, find a ZIP less convenient than a PDF or plain image attachments.",
      },

      { type: "h2", text: "When a link is the better choice" },
      {
        type: "ul",
        items: [
          "The recipient needs full-resolution originals for printing, editing or archiving.",
          "Even after resizing, the total is well above 20 MB (for example, hundreds of event photos).",
          "You are sending video alongside the photos.",
          "The recipient's company is known to have a low attachment limit.",
        ],
      },
      {
        type: "p",
        text: "Gmail switches to a Google Drive link automatically when you go over the limit, and Outlook.com lets you share a file from OneDrive instead of attaching it. Keep in mind that the recipient then needs access to the link, and shared links can expire or be revoked, while a real attachment stays in their inbox.",
      },
    ],
    faq: [
      {
        q: "Why did Gmail turn my attachment into a Google Drive link?",
        a: "Your attachments added up to more than Gmail's 25 MB limit for personal accounts, so Gmail moved them to Google Drive and inserted a link. Resize and compress the photos until the total is comfortably below the limit, and they will be attached normally.",
      },
      {
        q: "Will resized photos look worse on the recipient's phone?",
        a: "Not at normal viewing sizes. A 1600–2000 px photo has more pixels than most phone screens display across, so it looks the same. The difference only shows if someone crops heavily or prints large.",
      },
      {
        q: "Is a PDF or a ZIP better for sending many photos?",
        a: "A PDF is easier for most people: it opens on any device, keeps your order and prints directly. A ZIP keeps each photo as a separate file, which is better if the recipient needs the individual images. Neither makes already-compressed JPGs much smaller.",
      },
      {
        q: "Do the photos leave my device while I resize them?",
        a: "No. Resizing, compressing and PDF creation run in your browser, and the files are not uploaded to Intera Tools. They only leave your device when you attach them to the email yourself.",
      },
    ],
    sources: [
      { label: "Gmail Help – Attachment size limit", url: "https://support.google.com/mail/answer/6584" },
      { label: "Microsoft Support – Sending limits in Outlook.com", url: "https://support.microsoft.com/en-us/outlook/sending-limits-in-outlook-com" },
      { label: "Microsoft Learn – Outlook “attachment size exceeds the allowable limit” (20 MB default)", url: "https://learn.microsoft.com/en-us/troubleshoot/outlook/message-body/attachment-size-exceeds-the-allowable-limit-error" },
      { label: "Microsoft Learn – Exchange Online limits (message size, 33% encoding increase)", url: "https://learn.microsoft.com/en-us/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits" },
    ],
  },

  ko: {
    title: "메일 첨부 용량에 맞게 사진 줄이는 법",
    metaTitle: "메일 첨부용 사진 용량 줄이기",
    metaDescription:
      "Gmail은 첨부 25MB, 네이버·다음 메일은 한도를 넘으면 대용량 첨부로 바뀝니다. 사진 크기 변경과 압축, PDF 묶기, ZIP의 한계까지 메일 보내기 전 꼭 알아둘 내용을 정리했습니다.",
    summary:
      "스마트폰 사진은 한 장에 몇 MB씩 되기 때문에 몇 장만 첨부해도 메일 서비스의 첨부 한도를 금방 넘습니다. 이 글에서는 주요 메일 서비스의 첨부 한도와 한도보다 여유 있게 맞춰야 하는 이유를 설명하고, 사진을 줄이고 압축하고 묶어서 대용량 첨부 링크가 아닌 일반 첨부로 보내는 방법을 안내합니다.",
    takeaways: [
      "Gmail 개인 계정은 메일 한 통에 첨부 25MB까지입니다. 네이버·다음 메일은 일반 첨부 한도를 넘으면 기간이 정해진 대용량 첨부(다운로드 링크)로 바뀝니다.",
      "첨부 파일은 전송 과정에서 약 3분의 1 커지므로, 받는 사람 환경을 모를 때는 합계 15MB 안팎을 목표로 잡으세요.",
      "긴 변 1600~2000px로 줄이고 ‘균형’으로 압축하면 화면으로 보기에는 충분하고 용량은 크게 줄어듭니다.",
      "사진이 많다면 PDF 하나로 묶는 편이 순서도 지키고 받는 사람도 편합니다. ZIP은 JPG 용량을 거의 줄이지 못합니다.",
    ],
    body: [
      { type: "h2", text: "메일 서비스별 첨부 한도" },
      {
        type: "table",
        caption: "개인 계정 기준이며, 회사·학교 계정은 관리자가 정한 한도를 따릅니다",
        head: ["서비스", "한도", "한도를 넘으면"],
        rows: [
          ["Gmail (개인 계정)", "메일 한 통의 첨부 합계 25MB", "Gmail이 첨부를 빼고 Google Drive 링크로 바꿔 넣습니다"],
          ["네이버 메일", "메일 쓰기 화면의 첨부 영역에 표시되는 일반 첨부 한도", "‘대용량 첨부’로 전환되어 파일 대신 다운로드 링크가 전달되며, 링크는 정해진 기간이 지나면 받을 수 없습니다"],
          ["다음 메일", "메일 쓰기 화면에 표시되는 일반 첨부 한도", "한도를 넘는 파일은 대용량 첨부로 전환되어 링크로 전달됩니다"],
          ["Outlook.com", "Microsoft 도움말에 따라 첨부당 25MB 또는 메일 한 통 20MB(본문 포함)로 안내", "OneDrive 링크로 공유할 수 있으며, OneDrive 파일은 2GB까지 가능합니다"],
          ["Microsoft 365 회사 계정", "기본값 메일 한 통 35MB, 관리자가 1~150MB로 설정 가능", "메일이 거부되고 전송 실패 알림(NDR)이 돌아옵니다"],
        ],
      },
      {
        type: "p",
        text: "네이버와 다음의 대용량 첨부는 메일에 파일이 들어가는 것이 아니라 서비스 서버에 올린 파일의 링크가 들어가는 방식입니다. 받는 사람이 기간 안에 내려받지 않으면 파일이 사라지고, 회사 메일처럼 외부 링크를 막아 둔 환경에서는 열지 못할 수도 있습니다. 서류 제출이나 보관이 목적이라면 사진을 줄여서 일반 첨부로 보내는 편이 확실합니다. 정확한 일반 첨부 한도는 서비스 정책에 따라 바뀔 수 있으니 메일 쓰기 화면에 표시되는 값을 기준으로 삼으세요.",
      },
      {
        type: "p",
        text: "숫자보다 여유 있게 맞춰야 하는 이유도 두 가지 있습니다. 첫째, 첨부 파일은 전송할 때 텍스트(Base64)로 바뀌면서 약 3분의 1 커집니다. Microsoft의 Exchange 문서도 이를 33% 인코딩 증가로 설명합니다. 둘째, 메일은 **받는 사람** 서버의 한도도 통과해야 하는데, 그 값은 보통 알 수 없습니다. 첨부 합계를 **15MB** 안팎으로 맞추면 인코딩 후 약 20MB가 되어 20MB 한도 안에 들어오기 때문에, 상대 환경을 모를 때 안전한 목표가 됩니다.",
      },

      { type: "h2", text: "사진 한 장당 용량 예산 정하기" },
      {
        type: "p",
        text: "목표 용량을 사진 장수로 나누면 됩니다. 15MB에 15장이면 장당 약 1MB, 30장이면 장당 약 500KB입니다. 스마트폰에서 바로 가져온 사진은 대개 이 예산의 몇 배이고, 차이를 메우는 가장 빠른 방법은 압축을 세게 하는 것이 아니라 픽셀 수를 줄이는 것입니다.",
      },
      {
        type: "p",
        text: "긴 변 **1600~2000px**이면 노트북이나 휴대폰 화면을 넉넉히 채우고, 조금 확대해 볼 여유도 있습니다. 1200만 화소 스마트폰 사진(4032 × 3024px)을 2000 × 1500px로 줄이면 픽셀이 약 4분의 1로, 1600 × 1200px로 줄이면 약 16%로 줄어듭니다. 받는 사람이 크게 인쇄하거나 편집해야 할 때만 원본을 보내고, 그런 경우에는 어차피 클라우드 링크가 더 알맞습니다.",
      },

      { type: "h2", text: "크기 변경과 압축, 두 단계로 끝내기" },
      {
        type: "steps",
        items: [
          { title: "이미지 크기 조절에 사진 추가", body: "[이미지 크기 조절](/resize-image)에 사진을 최대 100장까지 끌어다 놓습니다. 파일은 업로드되지 않고 브라우저 안에서 처리됩니다." },
          { title: "픽셀 단위로 너비 지정", body: "**변경 방식**에서 **픽셀**을 고르고 **너비**에 **1600**을 입력한 뒤 **가로세로 비율 유지**를 켭니다. 여러 장일 때는 너비가 모든 사진에 적용되고 높이는 각 사진의 비율을 따르므로, 3:4 세로 사진은 가로 1600px, 세로 약 2133px이 됩니다. 긴 변을 정확히 맞추고 싶다면 가로 사진과 세로 사진을 나눠서 두 번 처리하세요." },
          { title: "이어서 이미지 압축", body: "결과 화면에서 **이어서 작업하기** → 이미지 압축을 고릅니다. 압축 강도는 **균형**이면 대부분 예산 안에 넉넉히 들어옵니다." },
          { title: "합계 확인 후 다운로드", body: "결과 화면에 파일별 감소율과 전체 절약 용량이 표시됩니다. 한 장씩 받거나 **모두 다운로드 (ZIP)**로 한꺼번에 받으세요." },
        ],
      },
      {
        type: "note",
        tone: "tip",
        title: "개인정보 보호 효과",
        text: "압축하면 픽셀을 새로 인코딩하기 때문에 카메라 모델, GPS 위치 같은 메타데이터가 따라가지 않습니다. 집에서 찍은 사진을 메일로 보낼 때 특히 의미가 있습니다. 또 휴대폰 사진의 회전 정보를 반영해 바로 세운 상태로 저장하므로 받는 쪽에서 옆으로 누워 보이지 않습니다.",
      },

      { type: "h2", text: "사진이 많다면 PDF 하나로 보내기" },
      {
        type: "p",
        text: "첨부 파일이 스무 개씩 되면 휴대폰에서 열기 번거롭고, 메일 앱이 정한 순서대로 보여서 놓치는 사진이 생기기 쉽습니다. PDF 한 파일로 묶으면 내가 정한 순서가 유지되고, 받는 사람은 파일 하나만 열거나 전달하거나 인쇄하면 됩니다. 영수증, 휴대폰으로 찍은 서류, 하자·현장 사진, 인쇄할 자료에 특히 잘 맞습니다.",
      },
      {
        type: "p",
        text: "[JPG를 PDF로 변환](/jpg-to-pdf)에서 사진을 끌어 순서를 정하고, **페이지 크기**(**A4**, **US Letter**, **이미지에 맞춤**)와 **여백**을 고른 뒤 **모든 이미지를 PDF 하나로**를 선택합니다. 회전 정보가 없는 JPG는 다시 압축하지 않고 그대로 PDF에 들어가므로, PDF 용량은 넣은 사진 용량의 합과 비슷합니다. 그래서 PDF를 만들기 **전에** 크기를 줄이고 압축해야 합니다. PNG는 무손실로 들어가 PDF가 매우 커질 수 있으니 사진 PNG는 먼저 JPG로 바꾸세요. 한 번에 처리하고 싶다면 [이미지 PDF 문서 만들기 워크플로](/workflows/images-to-pdf-document)에서 PDF를 만들면서 이미지 축소와 재압축까지 할 수 있습니다.",
      },
      {
        type: "tool",
        slug: "jpg-to-pdf",
        text: "줄인 사진을 원하는 순서대로 PDF 하나에 담을 수 있습니다. A4, US Letter, 이미지 크기에 맞춘 페이지 중에서 고르세요.",
      },

      { type: "h2", text: "ZIP으로 압축하면 줄어들까?" },
      {
        type: "p",
        text: "사진이라면 거의 줄지 않습니다. JPG, PNG, WebP는 이미 압축된 형식이라 ZIP의 범용 압축이 더 줄일 여지가 별로 없습니다. 그래도 ZIP은 묶음으로서는 쓸모가 있습니다. 파일 이름이 그대로 유지되고, 첨부 오십 개를 파일 하나로 만들 수 있습니다. 다만 한도를 넘은 메일을 ZIP으로 살릴 수 있다고 기대하지는 마세요. 먼저 크기를 줄이고 압축한 다음, 파일 하나로 보내고 싶을 때 ZIP으로 묶으면 됩니다. 휴대폰으로 메일을 확인하는 사람에게는 ZIP보다 PDF나 사진 그대로가 더 편할 수 있다는 점도 기억해 두세요.",
      },

      { type: "h2", text: "링크로 보내는 편이 나은 경우" },
      {
        type: "ul",
        items: [
          "받는 사람이 인쇄·편집·보관용으로 원본 해상도가 꼭 필요할 때",
          "줄인 뒤에도 합계가 20MB를 크게 넘을 때(예: 행사 사진 수백 장)",
          "사진과 함께 동영상도 보내야 할 때",
          "받는 쪽 회사 메일의 첨부 한도가 낮다고 알고 있을 때",
        ],
      },
      {
        type: "p",
        text: "Gmail의 Google Drive 링크, 네이버·다음의 대용량 첨부, Outlook의 OneDrive 링크가 이런 경우를 위한 기능입니다. 다만 링크는 받는 사람에게 접근 권한이 있어야 하고, 기간이 지나거나 공유가 해제되면 열 수 없습니다. 일반 첨부는 받은편지함에 그대로 남는다는 점에서 차이가 있습니다.",
      },
    ],
    faq: [
      {
        q: "Gmail에서 첨부 파일이 Google Drive 링크로 바뀌었어요. 왜 그런가요?",
        a: "첨부 합계가 개인 계정 한도인 25MB를 넘었기 때문입니다. 이 경우 Gmail이 파일을 Google Drive로 옮기고 링크를 넣습니다. 사진 크기를 줄이고 압축해서 합계를 한도보다 넉넉히 낮추면 일반 첨부로 보낼 수 있습니다.",
      },
      {
        q: "네이버 메일에서 대용량 첨부로 보내면 안 되나요?",
        a: "보낼 수는 있지만 링크에 다운로드 기간이 있어 기간이 지나면 받는 사람이 파일을 받을 수 없습니다. 서류 제출처럼 기록이 남아야 하거나, 외부 링크를 막아 둔 회사 메일로 보낼 때는 사진을 줄여 일반 첨부로 보내는 편이 안전합니다.",
      },
      {
        q: "크기를 줄인 사진이 휴대폰에서 흐릿하게 보이지 않을까요?",
        a: "보통 크기로 볼 때는 차이가 없습니다. 긴 변 1600~2000px 사진은 대부분의 휴대폰 화면이 가로로 표시하는 픽셀보다 크기 때문에 똑같이 선명하게 보입니다. 크게 잘라 내거나 큰 크기로 인쇄할 때만 차이가 납니다.",
      },
      {
        q: "사진을 줄이는 동안 파일이 외부로 전송되나요?",
        a: "아닙니다. 크기 변경, 압축, PDF 만들기는 모두 브라우저 안에서 실행되며 Intera Tools 서버로 업로드되지 않습니다. 파일이 기기 밖으로 나가는 것은 직접 메일에 첨부해 보낼 때뿐입니다.",
      },
    ],
    sources: [
      { label: "Gmail 고객센터 – 첨부파일 크기 제한", url: "https://support.google.com/mail/answer/6584" },
      { label: "Microsoft 지원 – Outlook.com 보내기 제한", url: "https://support.microsoft.com/en-us/outlook/sending-limits-in-outlook-com" },
      { label: "Microsoft Learn – Outlook 첨부 크기 한도 초과 오류(기본 20MB)", url: "https://learn.microsoft.com/en-us/troubleshoot/outlook/message-body/attachment-size-exceeds-the-allowable-limit-error" },
      { label: "Microsoft Learn – Exchange Online 한도(메일 크기, 33% 인코딩 증가)", url: "https://learn.microsoft.com/en-us/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits" },
    ],
  },
};

export default guide;
