import type { Locale } from "../../i18n/config";
import type { GuideContent } from "../types";

const guide: Record<Locale, GuideContent> = {
  en: {
    title: "How to Merge PDF Files Safely Without Uploading Them",
    metaTitle: "How to Merge PDF Files Safely Without Uploading Them",
    metaDescription:
      "Merge contracts, IDs and statements without sending them to a server: how in-browser merging works, setting the order, and what a merge keeps and drops.",
    summary:
      "Most online PDF mergers upload your files to a server, merge them there and send the result back. That's fine for a menu or a flyer, but not for a signed contract, a payslip or a copy of your ID. This guide explains how merging in the browser avoids the upload, how to get the page order right, and what a merge keeps and drops, based on how the underlying PDF library actually behaves.",
    takeaways: [
      "Uploading confidential PDFs leaves copies on computers you don't control. In-browser merging keeps the files on your device.",
      "Merge PDF uses the open-source pdf-lib library inside your browser tab. Pages are copied as they are, not re-rendered, so text stays sharp and searchable.",
      "Page content, annotations and links to websites carry over. Bookmarks, working form fields, links within the document and document properties don't.",
      "Password-protected PDFs have to be unlocked first. Use Organize PDF afterwards to delete, rotate or reorder individual pages.",
    ],
    body: [
      { type: "h2", text: "Why uploading confidential PDFs is a risk" },
      {
        type: "p",
        text: "When a website merges PDFs on its server, your files are transferred to, and at least temporarily stored on, machines you don't control. A privacy policy may promise deletion after an hour, but you can't check when that happens, who can access the files in the meantime, whether they end up in logs or backups, or which country the server is in. For documents with ID numbers, bank details, signatures, medical information or client data, that's a real exposure.",
      },
      {
        type: "p",
        text: "At work there is a second issue: uploading company or client documents to an unapproved online service can break your employer's data-handling rules or a confidentiality agreement, even if nothing ever leaks.",
      },
      { type: "h2", text: "How merging in the browser works" },
      {
        type: "p",
        text: "When you open [Merge PDF](/merge-pdf), your browser downloads the page's code, including the open-source pdf-lib library. When you click **Merge PDF**, pdf-lib reads each file from your device's memory, copies its pages into a new document, and the browser offers that document as a download. The PDFs are never sent anywhere, and the result exists only in your browser tab until you download it or close the tab.",
      },
      {
        type: "p",
        text: "You can check this yourself. Open your browser's developer tools (F12 on most desktop browsers), switch to the Network tab and then add your files. You'll see the site's scripts load and occasional small anonymous usage events, such as which tool ran, how many files and a rough size range, but never file names, file contents or a request carrying your PDFs.",
      },
      { type: "h2", text: "Step by step" },
      {
        type: "steps",
        items: [
          {
            title: "Add your PDFs",
            body: "Open [Merge PDF](/merge-pdf) and drop your files onto the page or choose them. You can add up to 50 files of up to 200 MB each. Every file shows a thumbnail of its first page and its page count.",
          },
          {
            title: "Set the order",
            body: "Drag the tiles into place or use the arrow buttons on each tile. **Sort A–Z** sorts by file name with numbers in natural order, so `scan-2` comes before `scan-10`. The **Merge order** list in the options shows the final sequence.",
          },
          {
            title: "Check for problem files",
            body: "Encrypted or damaged files are flagged with a warning, crossed out in **Merge order** and left out of the merge. You need at least two valid files.",
          },
          {
            title: "Merge and download",
            body: "Click **Merge PDF**. The result is named `merged-N-files.pdf`, where N is the number of files merged. Download it, or under **Continue with**, send it straight to Organize PDF, Split PDF or another PDF tool without adding it again.",
          },
        ],
      },
      { type: "tool", slug: "merge-pdf", text: "Combine PDFs in your browser. Nothing is uploaded." },
      { type: "h2", text: "Getting the order right" },
      {
        type: "p",
        text: "Merge PDF arranges whole files: every page of the first file, then every page of the second, and so on. If your files are named in the order they belong (`01-contract.pdf`, `02-annex-a.pdf`), **Sort A–Z** gets it right in one click. If you need to mix pages from different files, for example inserting a signed signature page into the middle of a contract, use Organize PDF instead (see below).",
      },
      { type: "h2", text: "What a merge keeps and what it drops" },
      {
        type: "p",
        text: "pdf-lib copies each page together with everything the page refers to: its text, fonts, images and the annotations attached to it. It doesn't copy the parts of a PDF that belong to the document as a whole rather than to a single page. We checked this by merging a test PDF that contained a bookmark, a filled-in form field, an internal link and a web link, then inspecting the output.",
      },
      {
        type: "table",
        caption: "What survives a merge with pdf-lib",
        head: ["Item", "After merging"],
        rows: [
          ["Page content: text, images, vector graphics, embedded fonts", "Kept as is; not re-rendered or recompressed, and text stays selectable and searchable"],
          ["Page size and rotation", "Kept; files with mixed page sizes stay mixed"],
          ["Annotations such as comments, highlights and stamps", "Kept on their pages"],
          ["Links to websites", "Kept and still work"],
          ["Links to other pages in the same document, such as clickable tables of contents", "May stop working, because they point at pages in the original file"],
          ["Bookmarks (the document outline)", "Not kept"],
          ["Fillable form fields", "Entered values usually remain visible, but the fields may no longer work as an editable form"],
          ["Title, author and other document properties", "Not carried over"],
          ["File attachments, page labels and accessibility tags", "Not kept; they are stored at document level"],
          ["Digital signatures", "No longer valid; a signature only certifies the exact original file"],
        ],
      },
      {
        type: "note",
        tone: "tip",
        text: "If bookmarks, a working form or a verifiable digital signature matter, send those files separately rather than merged, or use desktop PDF software that rebuilds bookmarks.",
      },
      {
        type: "p",
        text: "Because pages are copied rather than recompressed, the merged file is roughly as large as the originals combined. Merging doesn't shrink files. If the result is too big to attach, compression has to happen in a separate step.",
      },
      { type: "h2", text: "Password-protected PDFs" },
      {
        type: "p",
        text: "pdf-lib can't open encrypted PDFs, so Merge PDF shows \"This PDF is password-protected. Remove the password first, then try again.\" This also applies to PDFs that open without a password but restrict printing or editing; those are encrypted too. If you know the password, open the file in a PDF app you trust and save an unprotected copy, then merge that copy. Delete the unprotected copy once you no longer need it.",
      },
      { type: "h2", text: "Tidy up the result with Organize PDF" },
      {
        type: "p",
        text: "[Organize PDF](/organize-pdf) works page by page. Drag pages into a new order, use **Rotate page** or **Delete page** on individual pages (**Restore page** brings one back), **Insert blank page** where you need a separator, and **Add PDF** to bring in more files. When several files are loaded, each page is marked with its source file's letter and color. Click **Save PDF** to get the new document. Organize PDF copies pages the same way as Merge PDF, so the same list of kept and dropped items applies.",
      },
      {
        type: "p",
        text: "For interleaving, such as putting front and back scans in the right order or slotting a page into the middle of another file, you can skip Merge PDF entirely: load all the files into Organize PDF and arrange the pages there. If some of your pages are photos or scans saved as images, turn them into a PDF first with [JPG to PDF](/jpg-to-pdf).",
      },
      { type: "tool", slug: "organize-pdf", text: "Reorder, rotate, delete or insert pages, and combine files page by page." },
    ],
    faq: [
      {
        q: "Are my PDFs really not uploaded?",
        a: "No, they aren't. The merge runs in your browser with pdf-lib, and the files stay in your device's memory. You can confirm it in the Network tab of your browser's developer tools while you merge.",
      },
      {
        q: "Does merging reduce quality?",
        a: "No. Pages are copied without re-rendering or recompressing text and images. The merged file is about as large as the originals combined.",
      },
      {
        q: "Why did my bookmarks disappear after merging?",
        a: "Bookmarks belong to the document as a whole, not to individual pages, and pdf-lib only copies pages. Internal links and interactive form fields may stop working for the same reason.",
      },
      {
        q: "Can I merge password-protected PDFs?",
        a: "Not directly. Encrypted files are flagged and left out. Open them with the password in a PDF app, save an unprotected copy and merge that.",
      },
      {
        q: "Can I merge PDFs on my phone?",
        a: "Yes, Merge PDF works in mobile browsers too. Very large files may be slow, or fail on phones with little memory, because everything is processed on the device.",
      },
    ],
  },
  ko: {
    title: "PDF 업로드 없이 안전하게 합치는 방법",
    metaTitle: "PDF 업로드 없이 안전하게 합치기",
    metaDescription:
      "계약서, 신분증 사본, 명세서를 서버에 올리지 않고 PDF를 합치는 방법. 브라우저에서 합치는 원리, 순서 정하기, 합칠 때 유지되는 것과 사라지는 것, 비밀번호 PDF 처리법을 정리했습니다.",
    summary:
      "온라인 PDF 합치기 서비스는 대부분 파일을 서버에 올려 합친 뒤 결과를 돌려줍니다. 메뉴판이나 전단지라면 괜찮지만, 서명한 계약서나 급여명세서, 신분증 사본이라면 이야기가 다릅니다. 이 글에서는 업로드 없이 브라우저에서 합치는 원리와 페이지 순서를 맞추는 방법, 그리고 실제 PDF 라이브러리 동작을 기준으로 합칠 때 유지되는 것과 사라지는 것을 설명합니다.",
    takeaways: [
      "기밀 PDF를 업로드하면 내가 관리할 수 없는 서버에 사본이 남습니다. 브라우저에서 합치면 파일이 기기 밖으로 나가지 않습니다.",
      "PDF 합치기는 브라우저 탭 안에서 오픈 소스 pdf-lib 라이브러리로 동작합니다. 페이지를 다시 렌더링하지 않고 그대로 복사하므로 글자가 선명하고 검색도 됩니다.",
      "페이지 내용, 주석, 웹사이트 링크는 유지됩니다. 책갈피, 입력 가능한 양식 필드, 문서 내부 링크, 문서 속성은 유지되지 않습니다.",
      "비밀번호가 걸린 PDF는 먼저 해제해야 합니다. 합친 뒤 PDF 페이지 정리에서 페이지별로 삭제, 회전, 순서 변경을 할 수 있습니다.",
    ],
    body: [
      { type: "h2", text: "기밀 PDF를 업로드하면 왜 위험할까" },
      {
        type: "p",
        text: "웹사이트가 서버에서 PDF를 합치면 파일은 내가 관리할 수 없는 컴퓨터로 전송되고, 적어도 잠시 동안 그곳에 저장됩니다. 개인정보처리방침에 '1시간 후 삭제'라고 적혀 있어도 실제로 언제 지워지는지, 그사이 누가 볼 수 있는지, 로그나 백업에 남는지, 서버가 어느 나라에 있는지는 확인할 방법이 없습니다. 주민등록번호, 계좌 정보, 서명, 진료 기록, 고객 정보가 담긴 문서라면 실제로 노출될 위험이 있습니다.",
      },
      {
        type: "p",
        text: "회사 업무라면 문제가 하나 더 있습니다. 승인되지 않은 온라인 서비스에 회사나 고객의 문서를 올리는 것만으로도, 실제 유출이 없더라도 사내 보안 규정이나 비밀유지계약을 어기는 일이 될 수 있습니다.",
      },
      { type: "h2", text: "브라우저에서 합치는 원리" },
      {
        type: "p",
        text: "[PDF 합치기](/merge-pdf) 페이지를 열면 오픈 소스 pdf-lib 라이브러리를 포함한 페이지 코드가 브라우저로 내려받아집니다. **PDF 합치기** 버튼을 누르면 pdf-lib가 기기 메모리에 있는 각 파일을 읽어 페이지를 새 문서로 복사하고, 브라우저가 그 문서를 다운로드 파일로 건네줍니다. PDF는 어디로도 전송되지 않으며, 결과물은 내려받거나 탭을 닫을 때까지 브라우저 탭 안에만 존재합니다.",
      },
      {
        type: "p",
        text: "직접 확인할 수도 있습니다. 브라우저 개발자 도구(대부분의 PC 브라우저에서 F12)를 열고 네트워크 탭으로 이동한 뒤 파일을 추가해 보세요. 사이트 스크립트가 로드되는 요청과 가끔 보내는 작은 익명 이용 통계(어떤 도구를 썼는지, 파일 개수, 대략적인 용량 구간)는 보이지만, 파일 이름이나 내용, PDF를 실어 보내는 요청은 보이지 않습니다.",
      },
      { type: "h2", text: "합치는 순서" },
      {
        type: "steps",
        items: [
          {
            title: "PDF 추가",
            body: "[PDF 합치기](/merge-pdf)를 열고 파일을 끌어다 놓거나 선택합니다. 파일당 최대 200MB, 최대 50개까지 추가할 수 있습니다. 각 파일에는 첫 페이지 썸네일과 페이지 수가 표시됩니다.",
          },
          {
            title: "순서 정하기",
            body: "타일을 끌어 옮기거나 타일의 화살표 버튼을 누릅니다. **이름순 정렬**은 숫자를 자연스러운 순서로 정렬하므로 `scan-2`가 `scan-10`보다 앞에 옵니다. 옵션의 **합칠 순서** 목록에서 최종 순서를 확인할 수 있습니다.",
          },
          {
            title: "문제 있는 파일 확인",
            body: "암호화되었거나 손상된 파일에는 경고가 표시되고, **합칠 순서**에서 취소선이 그어진 채 병합에서 빠집니다. 정상 파일이 2개 이상 있어야 합칠 수 있습니다.",
          },
          {
            title: "합치고 다운로드",
            body: "**PDF 합치기**를 누릅니다. 결과 파일 이름은 `merged-N-files.pdf`이며, N은 합친 파일 개수입니다. 그대로 다운로드하거나, **이어서 작업하기**에서 PDF 페이지 정리, PDF 분할 같은 다른 PDF 도구로 다시 추가할 필요 없이 바로 보낼 수 있습니다.",
          },
        ],
      },
      { type: "tool", slug: "merge-pdf", text: "업로드 없이 브라우저에서 PDF를 하나로 합칩니다." },
      { type: "h2", text: "순서를 제대로 맞추려면" },
      {
        type: "p",
        text: "PDF 합치기는 파일 단위로 이어 붙입니다. 첫 번째 파일의 모든 페이지 뒤에 두 번째 파일의 모든 페이지가 오는 식입니다. 파일 이름을 미리 `01-계약서.pdf`, `02-별첨.pdf`처럼 붙여 두면 **이름순 정렬** 한 번으로 순서가 맞습니다. 계약서 중간에 서명한 페이지를 끼워 넣는 것처럼 여러 파일의 페이지를 섞어야 한다면, 아래에서 설명하는 PDF 페이지 정리를 쓰세요.",
      },
      { type: "h2", text: "합칠 때 유지되는 것과 사라지는 것" },
      {
        type: "p",
        text: "pdf-lib는 페이지와 함께 그 페이지가 참조하는 것, 즉 글자, 글꼴, 이미지, 페이지에 붙은 주석을 복사합니다. 반면 개별 페이지가 아니라 문서 전체에 속한 정보는 복사하지 않습니다. 책갈피, 입력된 양식 필드, 문서 내부 링크, 웹 링크가 들어 있는 테스트 PDF를 실제로 합친 뒤 결과 파일을 열어 확인했습니다.",
      },
      {
        type: "table",
        caption: "pdf-lib로 합칠 때 유지되는 항목",
        head: ["항목", "합친 뒤"],
        rows: [
          ["페이지 내용: 글자, 이미지, 벡터 그래픽, 포함된 글꼴", "그대로 유지되며, 다시 렌더링하거나 재압축하지 않아 글자 선택과 검색도 됩니다"],
          ["페이지 크기와 회전", "유지됩니다. 크기가 다른 페이지는 다른 그대로 남습니다"],
          ["메모, 형광펜, 도장 같은 주석", "해당 페이지에 그대로 남습니다"],
          ["웹사이트 링크", "유지되며 그대로 작동합니다"],
          ["클릭하면 이동하는 목차처럼 같은 문서의 다른 페이지로 가는 링크", "원본 파일의 페이지를 가리키고 있어 작동하지 않을 수 있습니다"],
          ["책갈피(문서 개요)", "유지되지 않습니다"],
          ["입력 가능한 양식 필드", "입력한 값은 대개 보이지만, 더 이상 입력할 수 있는 양식으로 작동하지 않을 수 있습니다"],
          ["제목, 작성자 등 문서 속성", "옮겨지지 않습니다"],
          ["첨부 파일, 페이지 라벨, 접근성 태그", "문서 단위로 저장되는 정보라 유지되지 않습니다"],
          ["디지털 서명(전자서명)", "효력이 없어집니다. 서명은 원래 파일 그대로일 때만 검증됩니다"],
        ],
      },
      {
        type: "note",
        tone: "tip",
        text: "책갈피, 입력 가능한 양식, 검증 가능한 전자서명이 중요하다면 해당 파일은 합치지 말고 따로 보내거나, 책갈피를 다시 만들어 주는 PC용 PDF 프로그램을 쓰세요.",
      },
      {
        type: "p",
        text: "페이지를 재압축하지 않고 복사하기 때문에 합친 파일의 용량은 원본 용량을 모두 더한 것과 비슷합니다. 합치기만으로는 용량이 줄지 않으니, 첨부 한도를 넘는다면 압축은 따로 해야 합니다.",
      },
      { type: "h2", text: "비밀번호가 걸린 PDF" },
      {
        type: "p",
        text: "pdf-lib는 암호화된 PDF를 열 수 없어서 '비밀번호로 보호된 PDF입니다. 비밀번호를 해제한 뒤 다시 시도해 주세요.'라는 안내가 나옵니다. 열 때는 비밀번호를 묻지 않지만 인쇄나 편집을 제한해 둔 PDF도 암호화된 파일이라 마찬가지입니다. 비밀번호를 알고 있다면 믿을 수 있는 PDF 프로그램에서 파일을 열어 보호가 해제된 사본을 저장한 뒤 그 사본을 합치세요. 해제한 사본은 다 쓴 뒤 지우는 것이 좋습니다.",
      },
      { type: "h2", text: "PDF 페이지 정리로 마무리하기" },
      {
        type: "p",
        text: "[PDF 페이지 정리](/organize-pdf)는 페이지 단위로 작업합니다. 페이지를 끌어서 순서를 바꾸고, 각 페이지에서 **페이지 회전**이나 **페이지 삭제**를 누르세요(**페이지 복원**으로 되살릴 수 있습니다). 구분용 페이지가 필요하면 **빈 페이지 삽입**을, 파일을 더 넣으려면 **PDF 추가**를 씁니다. 파일을 여러 개 불러오면 페이지마다 원본 파일을 나타내는 알파벳과 색이 표시됩니다. **PDF 저장**을 누르면 새 문서가 만들어집니다. PDF 페이지 정리도 PDF 합치기와 같은 방식으로 페이지를 복사하므로, 위 표의 유지·삭제 항목이 똑같이 적용됩니다.",
      },
      {
        type: "p",
        text: "앞뒷면 스캔을 순서대로 끼워 맞추거나 다른 파일의 중간에 페이지를 넣는 작업이라면 PDF 합치기를 거칠 필요 없이 처음부터 모든 파일을 PDF 페이지 정리에 불러와 배치하면 됩니다. 일부 페이지가 사진이나 이미지로 저장된 스캔본이라면 먼저 [JPG를 PDF로 변환](/jpg-to-pdf)에서 PDF로 바꾸세요.",
      },
      { type: "tool", slug: "organize-pdf", text: "페이지 순서 변경, 회전, 삭제, 빈 페이지 삽입은 물론 여러 파일을 페이지 단위로 합칠 수 있습니다." },
    ],
    faq: [
      {
        q: "PDF가 정말 업로드되지 않나요?",
        a: "업로드되지 않습니다. 병합은 브라우저 안에서 pdf-lib로 처리되고 파일은 기기 메모리에만 있습니다. 합치는 동안 브라우저 개발자 도구의 네트워크 탭을 보면 직접 확인할 수 있습니다.",
      },
      {
        q: "합치면 화질이 떨어지나요?",
        a: "아닙니다. 글자와 이미지를 다시 렌더링하거나 재압축하지 않고 페이지를 그대로 복사합니다. 합친 파일 용량은 원본을 모두 더한 정도입니다.",
      },
      {
        q: "합치고 나니 책갈피가 사라졌어요.",
        a: "책갈피는 개별 페이지가 아니라 문서 전체에 속한 정보인데, pdf-lib는 페이지만 복사하기 때문입니다. 같은 이유로 문서 내부 링크나 입력 가능한 양식 필드도 작동하지 않을 수 있습니다.",
      },
      {
        q: "비밀번호가 걸린 PDF도 합칠 수 있나요?",
        a: "바로는 안 됩니다. 암호화된 파일은 경고와 함께 병합에서 빠집니다. PDF 프로그램에서 비밀번호를 입력해 연 뒤 보호가 해제된 사본을 저장해 합치세요.",
      },
      {
        q: "휴대폰에서도 합칠 수 있나요?",
        a: "모바일 브라우저에서도 똑같이 쓸 수 있습니다. 다만 모든 처리를 기기에서 하므로 아주 큰 파일은 느리거나, 메모리가 적은 휴대폰에서는 실패할 수 있습니다.",
      },
    ],
  },
};

export default guide;
