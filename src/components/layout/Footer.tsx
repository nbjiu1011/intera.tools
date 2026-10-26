import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import type { ToolSummaries, WorkflowNames } from "@/components/I18nProvider";
import { localeLabels, locales, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import { format } from "@/i18n/format";
import { guideCategories } from "@/lib/guides";
import { tools, toolSections } from "@/lib/tools";
import { workflows } from "@/lib/workflows";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="border-b border-line pb-2 text-xs font-semibold tracking-[0.08em] text-ink-3 uppercase">{title}</p>
      <ul className="mt-3 grid gap-2 text-sm">{children}</ul>
    </div>
  );
}

const link = "text-ink-2 transition hover:text-ink";

export function Footer({ locale, dict, names, workflowNames }: { locale: Locale; dict: Dict; names: ToolSummaries; workflowNames: WorkflowNames }) {
  return (
    <footer className="mt-28 border-t border-line">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:grid-cols-6 lg:px-8">
        <div className="md:col-span-3 lg:col-span-2 lg:pr-8">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-2">{dict.footer.tagline}</p>
          <p className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-success">
            <ShieldCheck className="size-4" />
            {dict.footer.localNote}
          </p>
        </div>
        {toolSections.slice(0, 2).map((section) => (
          <Column key={section} title={dict.sections[section]}>
            {tools
              .filter((t) => t.section === section)
              .map((t) => (
                <li key={t.slug}>
                  <Link href={`/${locale}/${t.slug}`} className={link}>
                    {names[t.slug].name}
                  </Link>
                </li>
              ))}
          </Column>
        ))}
        <div className="grid content-start gap-8">
          {toolSections.slice(2).map((section) => (
            <Column key={section} title={dict.sections[section]}>
              {tools
                .filter((t) => t.section === section)
                .map((t) => (
                  <li key={t.slug}>
                    <Link href={`/${locale}/${t.slug}`} className={link}>
                      {names[t.slug].name}
                    </Link>
                  </li>
                ))}
            </Column>
          ))}
        </div>
        <div className="grid content-start gap-8">
          <Column title={dict.nav.workflows}>
            {workflows.map((w) => (
              <li key={w.slug}>
                <Link href={`/${locale}/workflows/${w.slug}`} className={link}>
                  {workflowNames[w.slug].name}
                </Link>
              </li>
            ))}
          </Column>
          <Column title={dict.nav.guides}>
            {guideCategories.map((c) => (
              <li key={c}>
                <Link href={`/${locale}/guides#${c}`} className={link}>
                  {dict.guideCategories[c]}
                </Link>
              </li>
            ))}
          </Column>
          <Column title={dict.footer.company}>
            <li><Link className={link} href={`/${locale}/about`}>{dict.nav.about}</Link></li>
            <li><Link className={link} href={`/${locale}/contact`}>{dict.nav.contact}</Link></li>
            <li><Link className={link} href={`/${locale}/privacy`}>{dict.footer.privacy}</Link></li>
            <li><Link className={link} href={`/${locale}/terms`}>{dict.footer.terms}</Link></li>
          </Column>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 px-4 py-6 text-xs text-ink-3 sm:px-6 lg:px-8">
          <p>{format(dict.footer.rights, { year: new Date().getFullYear() })}</p>
          <ul className="flex gap-4">
            {locales.map((l) => (
              <li key={l}>
                <Link href={`/${l}`} hrefLang={l} lang={l} className={l === locale ? "font-semibold text-ink" : "hover:text-ink"}>
                  {localeLabels[l].native}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
