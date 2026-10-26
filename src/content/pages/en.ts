import type { PageContent } from "../types";

const pages = {
  about: {
    metaTitle: "About Intera Tools – Free, Private Browser Tools",
    metaDescription:
      "Learn what Intera Tools is, why it exists and how its free image, PDF and QR code tools work right in your browser without sign-up or uploading your files.",
    h1: "About Intera Tools",
    lead: "Intera Tools is a collection of free online tools for everyday file tasks. Everything runs in your browser, so you can get things done without creating an account or uploading private files.",
    sections: [
      {
        title: "What Intera Tools is",
        paragraphs: [
          "Intera Tools brings together small, focused tools for the file chores that come up again and again. You can compress, resize, crop, rotate and watermark images, convert them between JPG, PNG and WebP, and compare how large one image becomes in each format. You can merge, split, rotate and organize PDFs (reorder or delete pages), turn images into a PDF, and turn PDF pages into images. There is also a QR code generator.",
          "Workflows chain several of these steps for common jobs — preparing product photos for a shop, sizing images for social media, turning photos into a PDF document and optimizing images for a website. Guides explain the background: which format to choose, how compression works, platform image sizes and how to fix common errors.",
          "The site is available in English and Korean, and every tool is free to use.",
        ],
      },
      {
        title: "Why it exists",
        paragraphs: [
          "Simple tasks like shrinking a photo for an email or combining two PDFs should not require signing up for an account or sending personal documents to an unknown server. Many online tools ask for exactly that.",
          "Intera Tools was built to offer a quicker, more private alternative: open a tool, pick your file, and download the result.",
        ],
      },
      {
        title: "How it works",
        paragraphs: [
          "The tools on Intera Tools use JavaScript that runs inside your web browser. When you choose a file, it is read and processed on your own device. Your files are never uploaded to or stored on Intera Tools servers.",
          "This approach is private because your files never leave your device, and it is often fast because there is no upload or download wait. Results stay in your browser tab until you download them or close the tab.",
        ],
      },
      {
        title: "Our principles",
        paragraphs: ["These principles guide how Intera Tools is built and run:"],
        bullets: [
          "Free: every tool can be used at no cost, with no paid tiers.",
          "Private by design: files are processed locally in your browser and are not uploaded.",
          "No sign-up: there are no accounts, logins or passwords.",
          "Accessible and works on any device: tools are designed to work on phones, tablets and computers with a modern browser.",
          "Honest about limits: because processing happens on your device, very large files depend on your device's available memory, and encrypted (password-protected) PDFs are not supported yet.",
        ],
      },
      {
        title: "How guides are written",
        paragraphs: [
          "Guides are written for specific tasks and checked against how the tools actually behave — the limits, file names and messages described are the ones you will see. Facts about other services, such as attachment limits or platform image sizes, are checked against the providers' own documentation where it is available, and we say so when sources disagree. Numbers we present as measurements come from tests we ran ourselves, with the method described in the guide.",
          "Platforms change their rules over time. Each guide shows the date it was last updated; if you spot something out of date, please tell us.",
        ],
      },
      {
        title: "Update history",
        paragraphs: ["Major changes to the service:"],
        bullets: [
          "26 October 2026 — Intera 2.0: workflows (e-commerce images, social media images, photos to PDF, web image optimization), a guides section, the Image Format Comparison tool, saved favorites and workflow presets, and a redesigned, simpler interface.",
          "16 October 2026 — Launch with 16 image, PDF and QR code tools in English and Korean.",
        ],
      },
      {
        title: "How Intera Tools is funded",
        paragraphs: [
          "Intera Tools is funded by advertising, which is what keeps the tools free. Ads are kept outside the working area of each tool so they do not get in the way of your task. You can read more about ads and cookies in our Privacy Policy.",
        ],
      },
      {
        title: "Feedback is welcome",
        paragraphs: [
          "If something does not work as expected, or you have an idea for a tool or improvement, please let us know through the contact page or by email at {email}. Every message is read.",
        ],
      },
    ],
  },

  privacy: {
    metaTitle: "Privacy Policy",
    metaDescription:
      "How Intera Tools handles your data: files stay in your browser and are never uploaded. Also covers anonymous statistics, cookies, ads and contact.",
    h1: "Privacy Policy",
    lead: "This policy explains what information Intera Tools ({site}) handles, why, and the choices you have. In short: the files you work with stay on your device.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "Intera Tools is operated by the Intera Tools operator (\"we\", \"us\"). Intera Tools provides free browser-based tools for images, PDFs and QR codes. There is no sign-up, no user accounts, no payments and no cloud storage.",
          "We collect as little information as we can. This policy describes each type of information involved in using the site and how it is handled.",
        ],
      },
      {
        title: "Files you process",
        paragraphs: [
          "All tools process your files locally in your web browser using JavaScript. Your files are never uploaded to or stored on Intera Tools servers, and we cannot see them.",
          "Results stay in your browser tab until you close it. The same applies to text you type into a tool, such as the content of a QR code: it is processed on your device and is not sent to us.",
        ],
      },
      {
        title: "Usage statistics",
        paragraphs: [
          "To understand which tools are used and to find and fix errors, we collect anonymous, first-party usage statistics.",
          "These statistics never include file names, file contents or text you type into tools. No cookies or persistent identifiers are used for them, so they cannot be used to recognize you across visits. They may include:",
        ],
        bullets: [
          "Events such as a page or tool being opened, processing started, completed or failed, and a download button being clicked.",
          "For failures, a general error type, for example \"unsupported format\" or \"encrypted PDF\".",
          "The number of files and an approximate size range.",
          "The site language in use and a coarse device class (mobile, tablet or desktop).",
        ],
      },
      {
        title: "Cookies and local storage",
        paragraphs: [
          "Intera Tools itself stores only a few small preferences in your browser. They make the site work the way you set it, stay on your device, are never sent to us and are not used for tracking. You can clear them at any time in your browser settings; the site then falls back to its defaults. Advertising cookies are described in the next section.",
          "The items are:",
        ],
        bullets: [
          "Theme preference (light or dark), saved in your browser's localStorage.",
          "Language choice, saved in a first-party cookie named tn_locale that lasts one year.",
          "Recently used tools and workflows and your favorites, saved in localStorage so they can be shown on the home page.",
          "Workflow settings and any presets you save (for example sizes, formats and file-name patterns), saved in localStorage. Files and their contents are never stored.",
        ],
      },
      {
        title: "Advertising (Google AdSense)",
        paragraphs: [
          "Intera Tools is funded by ads and may show ads served by Google AdSense. Google and its partners may use cookies or similar identifiers to serve and measure ads, including personalized ads based on your prior visits to this and other websites.",
          "You can manage or turn off personalized ads at Google Ads Settings (https://adssettings.google.com). To learn more about how Google uses information from sites that use its services, see https://policies.google.com/technologies/partner-sites.",
          "If you visit from the European Economic Area, the United Kingdom or Switzerland, you will be asked for consent through a Google-certified consent management platform before personalized ads are shown. Ads are always kept outside the working area of the tools.",
        ],
      },
      {
        title: "Contact form",
        paragraphs: [
          "If you use the contact form, we collect your email address, the topic and your message, plus your name if you choose to provide it. This information is sent to the Intera Tools operator, possibly through a messaging or webhook service that acts only as a processor on our behalf, and is used only to respond to your request.",
          "Please do not include confidential files or sensitive personal information in your message.",
        ],
      },
      {
        title: "Server logs",
        paragraphs: [
          "Like most websites, our hosting provider keeps standard server logs, which include your IP address, browser user agent, the requested URL and the time of the request. These logs are used for security and abuse prevention and are kept only for a short period.",
          "Our hosting provider, Cloudflare, also measures page views and page-load performance with Cloudflare Web Analytics. It does not use cookies or other identifiers stored on your device and collects information such as the page visited, the referring page, browser type and loading times. It never has access to the files you process.",
        ],
      },
      {
        title: "Data retention",
        paragraphs: ["We keep information only as long as needed for the purposes above:"],
        bullets: [
          "Files you process: never stored by us; they remain in your browser tab until you close it.",
          "Anonymous usage statistics: up to 14 months, then deleted.",
          "Contact form messages: deleted within one year after your inquiry is resolved, unless the law requires us to keep them longer.",
          "Server logs: kept short-term by the hosting provider for security purposes.",
          "Theme and language settings: stored in your browser until you clear them (the language cookie expires after one year).",
        ],
      },
      {
        title: "Your rights",
        paragraphs: [
          "Depending on where you live, you may have the right to access, correct or delete personal information about you, to object to or restrict its processing, and to withdraw consent. Because we do not have user accounts and our usage statistics are anonymous, the main personal information we may hold is what you send through the contact form.",
          "To access or delete your contact form data, or to ask any privacy question, email {email}. You can also control cookies and personalized ads through your browser settings, Google Ads Settings and, where applicable, the consent prompt. If you believe your rights have been infringed, you may also contact your local data protection authority.",
        ],
      },
      {
        title: "Children",
        paragraphs: [
          "Intera Tools is not directed at children under 13 (or under 16 in the European Economic Area), and we do not knowingly collect personal information from them. If you believe a child has sent us personal information through the contact form, please contact us and we will delete it.",
        ],
      },
      {
        title: "International visitors",
        paragraphs: [
          "Intera Tools is operated from the Republic of Korea and can be used worldwide. Information such as contact form messages and server logs may be processed in countries other than your own by the Intera Tools operator and its service providers. Your files are not transferred anywhere, because they never leave your device.",
        ],
      },
      {
        title: "Changes to this policy",
        paragraphs: [
          "We may update this policy when the service or legal requirements change. The updated version will be posted on this page with a new \"last updated\" date. If a change is significant, we will make it clearly visible on the site.",
        ],
      },
      {
        title: "Contact",
        paragraphs: [
          "If you have any questions about this policy or your information, please contact the Intera Tools operator at {email}.",
        ],
      },
    ],
  },

  terms: {
    metaTitle: "Terms of Use",
    metaDescription:
      "The terms for using Intera Tools' free online image, PDF and QR code tools, including acceptable use, your responsibility for your files, and liability limits.",
    h1: "Terms of Use",
    lead: "These terms govern your use of Intera Tools ({site}). Please read them carefully before using the tools.",
    sections: [
      {
        title: "Acceptance of these terms",
        paragraphs: [
          "By accessing or using Intera Tools, you agree to these Terms of Use and to our Privacy Policy. If you do not agree, please do not use the service. Intera Tools is operated by the Intera Tools operator (\"we\", \"us\").",
        ],
      },
      {
        title: "The service",
        paragraphs: [
          "Intera Tools provides free browser-based tools for working with images, PDFs and QR codes. Files are processed locally in your browser and are not uploaded to our servers.",
          "The service is provided free of charge and \"as is\". We may add, change, suspend or remove tools or features at any time, with or without notice.",
        ],
      },
      {
        title: "Your files and your responsibility",
        paragraphs: [
          "You are responsible for the files you process and for how you use the results. You must have the necessary rights or permissions for any file you work with.",
        ],
        bullets: [
          "Do not use the tools to remove or obscure watermarks, credits or copyright notices belonging to others.",
          "Do not use the tools to copy, alter or distribute copyrighted content without permission.",
          "Do not process files in a way that violates the privacy or other rights of others.",
        ],
      },
      {
        title: "Acceptable use",
        paragraphs: ["When using Intera Tools, you agree not to:"],
        bullets: [
          "Create, process or distribute illegal content, including content that infringes the rights of others.",
          "Use automated means, such as bots or scrapers, for mass use or scraping that overloads or disrupts the service.",
          "Attempt to break, hack, reverse engineer for malicious purposes, or interfere with the security or normal operation of the site.",
          "Use the service in any way that violates applicable laws or regulations.",
        ],
      },
      {
        title: "Intellectual property",
        paragraphs: [
          "The Intera Tools name, logo, site design, text and code are owned by the Intera Tools operator or its licensors and are protected by applicable laws. You may not copy or reuse them without permission, except as allowed by law.",
          "You keep all rights to your own files and to the results you create with the tools. We do not claim any ownership of them.",
        ],
      },
      {
        title: "Ads and third-party links",
        paragraphs: [
          "Intera Tools is funded by advertising and may display ads from third parties such as Google AdSense. The site may also contain links to third-party websites. We do not control and are not responsible for the content, products or practices of advertisers or third-party sites. Your dealings with them are solely between you and them.",
        ],
      },
      {
        title: "No warranty",
        paragraphs: [
          "To the extent permitted by law, the service is provided \"as is\" and \"as available\", without warranties of any kind, express or implied, including warranties of accuracy, reliability, fitness for a particular purpose or uninterrupted availability. Results can vary depending on your file, browser and device, and some files (for example very large files or encrypted PDFs) may not be processed.",
        ],
      },
      {
        title: "Limitation of liability",
        paragraphs: [
          "Please check every result before you use or share it, and always keep a backup of your original files. To the extent permitted by law, the Intera Tools operator is not liable for any indirect, incidental or consequential damages, or for any loss of data, files or profits, arising from your use of or inability to use the service.",
          "Nothing in these terms limits liability that cannot be limited under applicable law, including liability for intentional misconduct or gross negligence.",
        ],
      },
      {
        title: "Changes to these terms",
        paragraphs: [
          "We may update these terms from time to time. The updated version will be posted on this page with a new \"last updated\" date. By continuing to use Intera Tools after changes take effect, you accept the updated terms.",
        ],
      },
      {
        title: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of the Republic of Korea. Any dispute arising from or related to the service will be subject to the court having jurisdiction under the Civil Procedure Act of the Republic of Korea.",
        ],
      },
      {
        title: "Contact",
        paragraphs: ["If you have any questions about these terms, please contact the Intera Tools operator at {email}."],
      },
    ],
  },

  contact: {
    metaTitle: "Contact Intera Tools",
    metaDescription:
      "Contact Intera Tools to report a bug, suggest a new tool or ask a privacy question. Send a message through the form or by email; we usually reply within days.",
    h1: "Contact",
    lead: "Found a bug, have an idea, or a question about privacy? Send a message using the form below or email {email}. We usually reply within a few business days.",
    sections: [
      {
        title: "Reporting a bug",
        paragraphs: [
          "Please never send confidential or personal files. If a sample would help, use a file that contains nothing private.",
          "To help us reproduce the problem quickly, please include:",
        ],
        bullets: [
          "Which tool you were using.",
          "Your browser and device (for example, Chrome on Windows or Safari on iPhone).",
          "The file type and approximate file size.",
          "What you expected to happen and what happened instead, including any error message.",
        ],
      },
      {
        title: "Feature requests and privacy requests",
        paragraphs: [
          "Ideas for new tools or improvements are always welcome. Tell us what you are trying to do, and we will consider it for future updates.",
          "To access or delete information you have sent through this form, or to ask any privacy question, write to {email}. See our Privacy Policy for details.",
        ],
      },
    ],
  },
} satisfies Record<"about" | "privacy" | "terms" | "contact", PageContent>;

export default pages;
