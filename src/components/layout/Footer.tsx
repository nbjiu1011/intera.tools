import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import type { ToolSummaries } from "@/components/I18nProvider";
import { localeLabels, locales, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import { format } from "@/i18n/format";
import { tools, type ToolCategory } from "@/lib/tools";

export function Footer({ locale, dict, names }: { locale: Locale; dict: Dict; names: ToolSummaries }) {
  const column = (category: ToolCategory, title: string) => (
    <div>
      <p className="text-sm font-semibold text-ink">{title}</p>
      <ul className="mt-3 grid gap-2">
        {tools
          .filter((t) => t.category === category)
          .map((t) => (
            <li key={t.slug}>
              <Link href={`/${locale}/${t.slug}`} className="text-sm text-ink-2 transition hover:text-brand">
                {names[t.slug].name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );

  return (
    <footer className="relative mt-24 border-t border-line bg-elevated/70">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_0.9fr] lg:px-8">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-ink-2">{dict.footer.tagline}</p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-success-soft px-3 py-1.5 text-xs font-medium text-success">
            <ShieldCheck className="size-4" />
            {dict.footer.localNote}
          </p>
        </div>
        {column("image", dict.categories.imageTools)}
        <div className="grid content-start gap-8">
          {column("pdf", dict.categories.pdfTools)}
          {column("everyday", dict.categories.everydayTools)}
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{dict.footer.company}</p>
          <ul className="mt-3 grid gap-2 text-sm text-ink-2">
            <li><Link className="hover:text-brand" href={`/${locale}/about`}>{dict.nav.about}</Link></li>
            <li><Link className="hover:text-brand" href={`/${locale}/contact`}>{dict.nav.contact}</Link></li>
            <li><Link className="hover:text-brand" href={`/${locale}/privacy`}>{dict.footer.privacy}</Link></li>
            <li><Link className="hover:text-brand" href={`/${locale}/terms`}>{dict.footer.terms}</Link></li>
          </ul>
          <p className="mt-8 text-sm font-semibold text-ink">{dict.nav.language}</p>
          <ul className="mt-3 flex gap-3 text-sm">
            {locales.map((l) => (
              <li key={l}>
                <Link
                  href={`/${l}`}
                  hrefLang={l}
                  lang={l}
                  className={l === locale ? "font-semibold text-ink" : "text-ink-2 hover:text-brand"}
                >
                  {localeLabels[l].native}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-[1240px] px-4 py-6 text-xs text-ink-3 sm:px-6 lg:px-8">
          {format(dict.footer.rights, { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
