import type { ToolContent } from "../types";
import type { ToolSlug } from "../../lib/tools";

const content = {
  "merge-pdf": {
    name: "Merge PDF",
    short: "Combine multiple PDFs into one file in any order.",
    metaTitle: "Merge PDF – Combine PDF Files Online for Free",
    metaDescription:
      "Merge PDF files into one document for free. Reorder files by drag and drop, then combine them in your browser. No uploads, no sign-up, no watermark.",
    h1: "Merge PDF Files Online",
    lead: "Combine several PDFs into a single document in the order you choose. Everything runs in your browser, so your files never leave your device.",
    steps: [
      "Add your PDF files by dragging them onto the page or choosing them with the file picker.",
      "Arrange the files with drag and drop or the move buttons, or sort them A–Z by name.",
      "Merge the files and download your combined PDF.",
    ],
    features: [
      {
        title: "Private by design",
        body: "Files are processed locally in your browser and are never uploaded to or stored on our servers.",
      },
      {
        title: "Full control over order",
        body: "Each file shows a first-page thumbnail and its page count, so you can reorder, sort or remove files before merging.",
      },
      {
        title: "No quality loss",
        body: "Pages are copied into the new PDF as they are, so text, images and layout stay exactly as in the originals.",
      },
    ],
    about: {
      title: "How to combine PDF files without uploading them",
      paragraphs: [
        "Merging PDFs is useful whenever related documents should travel together: a signed contract with its annexes, a set of scanned receipts for an expense report, or chapters of a report that were exported separately. Instead of sending five attachments, you send one file that opens in the right order. With Intera Tools you can add as many PDFs as you need, add more at any time, and see each file's first page and page count before you merge.",
        "Because merging happens entirely in your browser, the files you add are never uploaded to a server. That makes the tool a good fit for confidential documents such as contracts, ID copies or invoices. The merged PDF exists only in your browser tab until you download it or close the tab. There is no sign-up, no watermark and no limit on how many files or tasks you run.",
        "Page content is copied without re-rendering, so there is no loss in quality. Bookmarks (the document outline) and some interactive form features may not carry over to the merged file. Password-protected PDFs are not supported yet, and the tool tells you clearly if a file is encrypted or damaged. Each PDF can be up to 200 MB, though very large documents may be slow or fail on phones.",
      ],
    },
    faq: [
      {
        q: "Is it safe to merge confidential PDFs here?",
        a: "Yes. Your files are processed locally in your browser and are never uploaded to or stored on Intera Tools servers. The result stays in your browser tab until you close it.",
      },
      {
        q: "How many PDFs can I merge at once?",
        a: "Intera Tools sets no limit on the number of files or tasks. The practical limit is your device's memory, and each PDF can be up to 200 MB.",
      },
      {
        q: "Will the merged PDF lose quality?",
        a: "No. Pages are copied as they are, without re-compressing text or images. Bookmarks and some interactive form features may not be carried over, though.",
      },
      {
        q: "Can I merge password-protected PDFs?",
        a: "Not yet. If a file is encrypted, the tool tells you so clearly instead of silently skipping it. Damaged files are reported the same way.",
      },
      {
        q: "Does it work on my phone?",
        a: "Yes. The tool works in desktop, tablet and mobile browsers with the same features, although very large documents may be slow or fail on phones with limited memory.",
      },
    ],
  },

  "split-pdf": {
    name: "Split PDF",
    short: "Extract pages or split a PDF into several files.",
    metaTitle: "Split PDF – Extract Pages from a PDF Online Free",
    metaDescription:
      "Split a PDF by page ranges, selected pages or every N pages. Free, no sign-up and no uploads: your PDF is processed privately in your browser.",
    h1: "Split PDF Files Online",
    lead: "Extract the pages you need or break a long PDF into smaller files. Choose custom ranges, pick pages visually, or split at a fixed interval.",
    steps: [
      "Add the PDF you want to split by dragging it onto the page or using the file picker.",
      "Choose a mode: enter page ranges, click page thumbnails to select them, or split every N pages.",
      "Split the PDF and download the files individually or together as a ZIP.",
    ],
    features: [
      {
        title: "Three ways to split",
        body: "Use custom ranges like 1-3, 5, 8-10, select pages by clicking thumbnails, or split the document every N pages.",
      },
      {
        title: "Lossless output",
        body: "Pages are copied into the new files without re-rendering, so text and images keep their original quality.",
      },
      {
        title: "Stays on your device",
        body: "Your PDF is split locally in your browser and is never uploaded to or stored on our servers.",
      },
    ],
    about: {
      title: "Ways to split a PDF and when to use them",
      paragraphs: [
        "Custom ranges are the quickest option when you already know the page numbers. Type something like 1-3, 5, 8-10 and each range becomes its own PDF, or merge all ranges into a single file instead. This works well for pulling one chapter out of a long manual, or for sending a colleague only the pages they need rather than the whole document.",
        "If you would rather see the pages, switch to page selection and click the thumbnails you want. You can extract them into one PDF or save each selected page as a separate file. Fixed-interval mode splits the document every N pages, which is handy for a batch of scanned forms that each have the same number of pages. When several files are created, you can download them together as a ZIP.",
        "All splitting happens in your browser, so the original PDF is never uploaded. That matters for contracts, bank statements and other confidential documents. There is no sign-up, no watermark and no task limit. Password-protected PDFs are not supported yet, and the tool clearly reports encrypted or damaged files. When you are done, you can send the results straight to another tool without uploading them again.",
      ],
    },
    faq: [
      {
        q: "How do I enter page ranges?",
        a: "Separate ranges with commas and use a hyphen for consecutive pages, for example 1-3, 5, 8-10. Each range becomes its own PDF unless you choose to merge them into one file.",
      },
      {
        q: "Can I save each page as a separate PDF?",
        a: "Yes. In page selection mode, choose your pages and pick the option to save each page as a separate PDF. Multiple files download as a ZIP.",
      },
      {
        q: "Does splitting reduce quality?",
        a: "No. Pages are copied as they are without re-rendering, so the output looks exactly like the original.",
      },
      {
        q: "Is my PDF uploaded anywhere?",
        a: "No. The file is processed locally in your browser and never reaches Intera Tools servers. Results stay in your browser tab until you close it.",
      },
      {
        q: "Is there a file size limit?",
        a: "Each PDF can be up to 200 MB. Very large documents depend on your device's memory and may be slow or fail on phones.",
      },
    ],
  },

  "rotate-pdf": {
    name: "Rotate PDF",
    short: "Turn all or selected PDF pages in 90° steps.",
    metaTitle: "Rotate PDF – Rotate PDF Pages Online for Free",
    metaDescription:
      "Rotate PDF pages online for free. Turn all pages or single pages left or right in 90° steps with no quality loss. Private and processed in your browser.",
    h1: "Rotate PDF Pages Online",
    lead: "Fix sideways or upside-down pages with a few clicks. Rotate the whole document or only the pages that need it, without changing their quality.",
    steps: [
      "Add your PDF by dragging it onto the page or choosing it with the file picker.",
      "Rotate all pages at once, or turn individual pages left or right in 90° steps from their thumbnails.",
      "Apply the rotation and download the corrected PDF.",
    ],
    features: [
      {
        title: "Page-by-page control",
        body: "Thumbnails of every page show which pages are sideways, so you can rotate only those or the whole document.",
      },
      {
        title: "Text stays selectable",
        body: "Rotation is saved in the PDF page settings instead of re-rendering pages, so text remains selectable and quality is unchanged.",
      },
      {
        title: "No uploads",
        body: "Your document is processed locally in your browser and is never sent to or stored on our servers.",
      },
    ],
    about: {
      title: "Fix scanned and sideways pages without losing quality",
      paragraphs: [
        "Rotated pages are common in scanned documents, where a landscape table or a sheet fed into the scanner the wrong way ends up sideways or upside down. Documents assembled from different sources often have the same problem. Intera Tools shows a thumbnail of every page so you can spot those pages quickly, then rotate them left or right in 90° steps, or rotate the entire document at once.",
        "Rather than turning each page into an image, Intera Tools stores the rotation in the PDF's page settings. The page content itself is not re-rendered, so text stays selectable and images keep their original quality. The file is processed entirely in your browser and never uploaded, which makes the tool suitable for contracts, invoices and other confidential paperwork.",
        "Rotating PDFs is free, with no sign-up, no watermark and no daily limit, and it works the same on desktop, tablet and mobile browsers. Password-protected PDFs are not supported yet, and the tool tells you clearly when a file is encrypted or damaged. After rotating, you can continue with another tool, such as merging or reorganizing pages, without uploading the file again.",
      ],
    },
    faq: [
      {
        q: "Can I rotate just one page?",
        a: "Yes. Each page has its own rotate controls, so you can turn individual pages left or right while leaving the rest unchanged.",
      },
      {
        q: "Will rotating make my PDF blurry?",
        a: "No. The rotation is stored in the PDF page settings rather than by re-rendering the page, so quality is unchanged and text stays selectable.",
      },
      {
        q: "Does the rotation stay when I open the file elsewhere?",
        a: "Yes. The new orientation is saved in the PDF itself, so standard PDF viewers display the pages the same way.",
      },
      {
        q: "Are my files uploaded?",
        a: "No. Rotation happens locally in your browser, and your PDF is never uploaded to or stored on Intera Tools servers.",
      },
      {
        q: "Can I rotate a password-protected PDF?",
        a: "Not yet. Encrypted PDFs are not supported, and the tool tells you clearly when a file is protected.",
      },
    ],
  },

  "organize-pdf": {
    name: "Organize PDF",
    short: "Reorder, delete, rotate and add pages in a PDF.",
    metaTitle: "Organize PDF – Reorder and Delete PDF Pages Online",
    metaDescription:
      "Rearrange PDF pages by drag and drop, delete or rotate pages, insert blank pages and add pages from other PDFs. Free, private and done in your browser.",
    h1: "Organize PDF Pages",
    lead: "Rearrange, remove, rotate and add pages in one visual editor. See every page as a thumbnail and shape the document exactly the way you need.",
    steps: [
      "Add your PDF by dragging it onto the page or choosing it with the file picker.",
      "Drag thumbnails to reorder pages, and delete, rotate or insert pages as needed.",
      "Apply your changes and download the reorganized PDF.",
    ],
    features: [
      {
        title: "Visual page editor",
        body: "A grid of page thumbnails lets you reorder pages by drag and drop, delete pages or rotate them.",
      },
      {
        title: "Insert and add pages",
        body: "Insert a blank page anywhere or add pages from other PDFs, and reset all changes if you want to start over.",
      },
      {
        title: "Keyboard accessible",
        body: "Move buttons offer an alternative to dragging, so you can reorder pages using only the keyboard.",
      },
    ],
    about: {
      title: "One place to rearrange and clean up a PDF",
      paragraphs: [
        "Organizing a PDF usually means several small fixes at once: a page in the wrong position, a blank scanned page to remove, a sideways page, or a missing page that lives in another file. Intera Tools' organizer brings these steps together. Every page appears as a thumbnail, so you can drag pages into the right order, delete the ones you do not need and rotate pages that are turned the wrong way.",
        "You can also insert a blank page, for example as a separator or to keep double-sided printing aligned, and add pages from other PDFs to build one document from several sources. If you change your mind, reset brings the document back to its original state. Move buttons work with the keyboard as an alternative to dragging. Pages are copied without re-rendering, so the result keeps the quality of the original.",
        "Everything happens locally in your browser. The PDF is never uploaded to or stored on our servers, which keeps confidential files such as contracts or invoices on your device. The tool is free, adds no watermark and works on desktop, tablet and mobile browsers. Password-protected PDFs are not supported yet, and encrypted or damaged files are reported with a clear message.",
      ],
    },
    faq: [
      {
        q: "How do I delete pages from a PDF?",
        a: "Add your PDF, delete the pages you do not need from the thumbnail grid, then download the result. The remaining pages keep their original quality.",
      },
      {
        q: "Can I combine pages from different PDFs?",
        a: "Yes. You can add pages from other PDFs to the document you are editing and move them to any position.",
      },
      {
        q: "Can I reorder pages without a mouse?",
        a: "Yes. Each page has move buttons that work with the keyboard as an alternative to drag and drop.",
      },
      {
        q: "What if I make a mistake?",
        a: "Use reset to discard all changes and return to the original pages and order.",
      },
      {
        q: "Are my documents uploaded?",
        a: "No. All editing happens in your browser, and your files are never uploaded to or stored on Intera Tools servers.",
      },
    ],
  },

  "jpg-to-pdf": {
    name: "JPG to PDF",
    short: "Turn JPG, PNG and other images into a PDF.",
    metaTitle: "JPG to PDF – Convert Images to PDF Online Free",
    metaDescription:
      "Convert JPG, PNG, WebP, GIF and BMP images to PDF for free. Choose page size, orientation and margins. Private: images are processed in your browser.",
    h1: "Convert JPG to PDF",
    lead: "Turn photos, scans and screenshots into a clean PDF. Set the order, page size and margins, then create one PDF or one per image.",
    steps: [
      "Add your images (JPG, PNG, WebP, GIF or BMP) by dragging them onto the page or using the file picker.",
      "Arrange the images and choose the page size, orientation and margin.",
      "Create one PDF with all images or a separate PDF per image, then download.",
    ],
    features: [
      {
        title: "Original image quality",
        body: "JPGs are embedded without re-compression and PNGs are embedded losslessly, so images look the same as your originals.",
      },
      {
        title: "Flexible page layout",
        body: "Fit pages to each image or use A4 or US Letter, with auto, portrait or landscape orientation and no, small or large margins.",
      },
      {
        title: "One PDF or many",
        body: "Combine all images into a single PDF or create a separate PDF for each image, downloadable together as a ZIP.",
      },
    ],
    about: {
      title: "Turn images into a PDF that is easy to share",
      paragraphs: [
        "A PDF is often the easiest way to send a set of images: scanned pages of a form, photos of receipts, or screenshots that belong together. Recipients open one file with pages in a fixed order instead of a folder of loose pictures. Intera Tools accepts JPG, PNG, WebP, GIF and BMP files, and you can reorder the images before converting so the pages appear exactly in the sequence you want.",
        "Choose Fit to image to make each page match its picture, or pick A4 or US Letter for documents meant to be printed. Orientation can follow each image automatically or be fixed to portrait or landscape, and margins can be none, small or large. JPG files are placed into the PDF without re-compression, PNG files are embedded losslessly, and other formats are converted to PNG first. For GIFs, the first frame is used.",
        "Conversion runs entirely in your browser, so your photos and scans are never uploaded to our servers. That is useful for ID copies, signed documents or invoices. There is no sign-up, no watermark and no file limit. When the PDF is ready, you can download it or continue with another tool, for example to merge it with other PDFs, without uploading it again.",
      ],
    },
    faq: [
      {
        q: "Which image formats can I convert to PDF?",
        a: "JPG, PNG, WebP, GIF and BMP. For GIFs only the first frame is used, and formats other than JPG and PNG are converted to PNG before being added.",
      },
      {
        q: "Will my photos lose quality?",
        a: "No. JPGs are embedded without re-compression and PNGs are embedded losslessly, so the images keep their original quality.",
      },
      {
        q: "Can I make a separate PDF for each image?",
        a: "Yes. Choose to create one PDF per image instead of a single combined PDF. Multiple files can be downloaded together as a ZIP.",
      },
      {
        q: "Which page size should I choose?",
        a: "Fit to image makes each page the size of its picture. Choose A4 or US Letter if you plan to print the PDF or need a standard page size.",
      },
      {
        q: "Are my images uploaded?",
        a: "No. Images are converted locally in your browser and are never uploaded to or stored on Intera Tools servers.",
      },
    ],
  },

  "pdf-to-jpg": {
    name: "PDF to JPG",
    short: "Save PDF pages as JPG or PNG images.",
    metaTitle: "PDF to JPG – Convert PDF Pages to Images Online",
    metaDescription:
      "Convert PDF pages to JPG or PNG images for free. Pick 72, 150 or 300 DPI, set JPG quality and choose pages. Processed in your browser, never uploaded.",
    h1: "Convert PDF to JPG",
    lead: "Turn each page of a PDF into an image. Choose JPG or PNG, a resolution up to 300 DPI and the pages you need.",
    steps: [
      "Add your PDF by dragging it onto the page or choosing it with the file picker.",
      "Pick JPG or PNG, a resolution and JPG quality, and choose all pages or a page range.",
      "Convert the pages and download each image individually or all of them as a ZIP.",
    ],
    features: [
      {
        title: "Three resolutions",
        body: "Choose 72 DPI for small files, 150 DPI as the balanced default, or 300 DPI for print quality.",
      },
      {
        title: "JPG or PNG output",
        body: "Save pages as JPG with adjustable quality, or as PNG when you prefer lossless images.",
      },
      {
        title: "Private conversion",
        body: "Pages are rendered locally in your browser, so your PDF is never uploaded to or stored on our servers.",
      },
    ],
    about: {
      title: "When to convert PDF pages to images",
      paragraphs: [
        "Images are easier to use than PDFs in many places: a slide in a presentation, a post on social media, a preview in a chat message, or an upload form that only accepts pictures. Converting a PDF to JPG lets you share a single page, such as a certificate or a floor plan, without sending the whole document. You can convert every page or enter a custom page range.",
        "Resolution controls how sharp and how large the images are. 72 DPI keeps files small for quick sharing on screen, 150 DPI is the default and works well for most uses, and 300 DPI is suited to printing. JPG produces smaller files and lets you adjust quality, while PNG is useful for pages with sharp text or line drawings. Multiple images can be downloaded together as a ZIP.",
        "Pages are rendered in your browser with the pdf.js PDF engine, entirely on your device, so the PDF is never uploaded. In rare PDFs with unusual fonts, the rendered images can look slightly different from the original. Password-protected PDFs are not supported yet, and the tool reports encrypted or damaged files clearly. Long documents at 300 DPI need more memory and may be slow on phones.",
      ],
    },
    faq: [
      {
        q: "What resolution should I use?",
        a: "150 DPI is a good default for screens and everyday documents. Choose 300 DPI for printing, or 72 DPI when you need small files.",
      },
      {
        q: "Should I choose JPG or PNG?",
        a: "JPG gives smaller files and lets you adjust quality, which suits photos and scans. PNG is a good choice for pages with crisp text or diagrams.",
      },
      {
        q: "Can I convert only some pages?",
        a: "Yes. Enter a custom page range to convert just the pages you need instead of the whole document.",
      },
      {
        q: "Why does an image look slightly different from the PDF?",
        a: "Pages are rendered by the pdf.js engine in your browser. In rare PDFs that use unusual fonts, text can look slightly different from the original.",
      },
      {
        q: "Is my PDF uploaded?",
        a: "No. Conversion happens in your browser, and neither the PDF nor the images are uploaded to or stored on Intera Tools servers.",
      },
    ],
  },

  "qr-code-generator": {
    name: "QR Code Generator",
    short: "Create QR codes for links, Wi-Fi, text and more.",
    metaTitle: "QR Code Generator – Free Static QR Codes, No Sign-Up",
    metaDescription:
      "Create free QR codes for URLs, text, Wi-Fi, email, phone and SMS. Customize colors and size, then download PNG or SVG. Static codes that never expire.",
    h1: "Free QR Code Generator",
    lead: "Create a QR code for a link, Wi-Fi network, email, phone number or text message. Customize it and download it as PNG or SVG.",
    steps: [
      "Choose a content type, such as URL, Wi-Fi or email, and fill in the details.",
      "Adjust colors, error correction, margin and size to suit where the code will be used.",
      "Download your QR code as a PNG or SVG file.",
    ],
    features: [
      {
        title: "Six content types",
        body: "Encode a URL, plain text, Wi-Fi login, email, phone number or SMS with a pre-filled message.",
      },
      {
        title: "Customizable design",
        body: "Set foreground and background colors with a low-contrast warning, plus error correction, quiet-zone margin and a size from 256 to 2048 px.",
      },
      {
        title: "Static and permanent",
        body: "Content is encoded directly in the code, with no redirect or tracking, so your QR codes never expire.",
      },
    ],
    about: {
      title: "Static QR codes that work without a middleman",
      paragraphs: [
        "Intera Tools creates static QR codes. The information you enter is encoded directly into the pattern, so scanning the code opens your link or joins your network without passing through a redirect service. There is no tracking and nothing that can be switched off later: the code keeps working as long as the content it contains is still valid. Codes are generated entirely in your browser.",
        "Different content types cover common uses. A URL code links to a website or a menu, while a Wi-Fi code lets guests join a network using its name, password and security type (WPA/WPA2, WEP or no password), including hidden networks. Email codes can pre-fill the address, subject and body, phone codes start a call, and SMS codes prepare a message to a given number. Plain text works for short notes.",
        "For reliable scanning, keep strong contrast between foreground and background; the tool warns you when the colors are too similar. A higher error correction level (Q or H) helps when the code may get scratched or partly covered, while L or M keeps the pattern simpler. Leave a quiet-zone margin around the code. Download PNG for screens and documents, or SVG for printing at any size.",
      ],
    },
    faq: [
      {
        q: "Do these QR codes expire?",
        a: "No. They are static QR codes with the content encoded directly, so there is no redirect that could stop working. They keep working as long as the content itself is valid.",
      },
      {
        q: "Can I make a QR code for my Wi-Fi?",
        a: "Yes. Choose Wi-Fi, enter the network name and password, select WPA/WPA2, WEP or no password, and mark the network as hidden if needed.",
      },
      {
        q: "Should I download PNG or SVG?",
        a: "PNG works well for websites, documents and messages. SVG is a vector format that stays sharp at any size, which makes it ideal for print.",
      },
      {
        q: "Which error correction level should I choose?",
        a: "M is a sensible choice for most uses. Choose Q or H if the code may be damaged or partly covered; higher levels make the pattern denser.",
      },
      {
        q: "Are scans of my QR code tracked?",
        a: "No. Codes are generated in your browser and contain your content directly, with no redirect and no scan tracking.",
      },
    ],
  },
} satisfies Partial<Record<ToolSlug, ToolContent>>;

export default content;
