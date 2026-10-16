// Before launch, set NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_CONTACT_EMAIL to the
// production domain and an inbox you control (see .env.example).
export const siteConfig = {
  name: "Intera Tools",
  tagline: "Free Online Tools for Everyone",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://intera.tools").replace(/\/$/, ""),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "support@intera.tools",
  /** Date shown as "last updated" on the legal pages. */
  legalUpdated: "2026-10-16",
};

/** Search engine ownership tokens (Google Search Console, Naver Search Advisor, Bing Webmaster). */
export const verification = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  naver: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION ?? "",
  bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "",
};

export const adsenseConfig = {
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
  slots: {
    tool: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL ?? "",
    home: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME ?? "",
  },
};
