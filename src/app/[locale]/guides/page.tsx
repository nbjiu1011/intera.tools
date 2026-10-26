import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideCard } from "@/components/home/GuideCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getGuideSummaries } from "@/content";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { guideCategories } from "@/lib/guides";
import { buildMetadata, jsonLd, localizedUrl } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/guides">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/guides", title: dict.guidesPage.metaTitle, description: dict.guidesPage.metaDescription });
}

export default async function GuidesPage({ params }: PageProps<"/[locale]/guides">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const g = dict.guidesPage;
  const list = getGuideSummaries(locale);

  const structured = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: g.title,
    url: localizedUrl(locale, "/guides"),
    inLanguage: locale,
    hasPart: list.map((x) => ({ "@type": "Article", headline: x.title, url: localizedUrl(locale, `/guides/${x.slug}`) })),
  };

  return (
    <div className="mx-auto max-w-[1240px] px-4 pt-12 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structured)} />
      <header className="max-w-3xl">
        <h1 className="text-[2.6rem] leading-[1.02] font-bold tracking-[-0.045em] text-ink sm:text-[3.6rem]">{g.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-2">{g.lead}</p>
      </header>
      <nav aria-label={g.title} className="mt-8 flex flex-wrap gap-2">
        {guideCategories.map((c) => (
          <a key={c} href={`#${c}`} className="rounded-md border border-line px-3 py-1.5 text-sm font-medium text-ink-2 hover:border-ink hover:text-ink">
            {dict.guideCategories[c]}
          </a>
        ))}
      </nav>
      <div className="mt-14 grid gap-16">
        {guideCategories.map((c, i) => {
          const items = list.filter((x) => x.category === c);
          if (!items.length) return null;
          return (
            <section key={c} id={c} aria-labelledby={`h-${c}`} className="scroll-mt-24">
              <SectionHeader id={`h-${c}`} index={String(i + 1).padStart(2, "0")} title={dict.guideCategories[c]} />
              <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((x) => (
                  <li key={x.slug}>
                    <GuideCard guide={x} locale={locale} dict={dict} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
