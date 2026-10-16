export const locales = ["en", "ko"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, { short: string; native: string }> = {
  en: { short: "EN", native: "English" },
  ko: { short: "KO", native: "한국어" },
};

/** BCP 47 tags used for hreflang and Open Graph. */
export const localeTags: Record<Locale, string> = {
  en: "en",
  ko: "ko-KR",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
