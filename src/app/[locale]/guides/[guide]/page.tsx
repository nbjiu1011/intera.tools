import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideBody, headingId, Inline } from "@/components/guides/GuideBody";
import { GuideCard } from "@/components/home/GuideCard";
import { ToolCard } from "@/components/home/ToolCard";
import { GuideView } from "@/components/tool/ToolView";
import { AdSlot } from "@/components/ui/AdSlot";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig } from "@/config/site";
import { getGuideContent, getGuideSummaries, getToolSummaries, getWorkflowSummaries, readingMinutes } from "@/content";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { format } from "@/i18n/format";
import { guideMap, guides, isGuideSlug } from "@/lib/guides";
import { buildMetadata, jsonLd, localizedUrl } from "@/lib/seo";
import { toolMap } from "@/lib/tools";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => guides.map((g) => ({ locale, guide: g.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/guides/[guide]">): Promise<Metadata> {
  const { locale, guide } = await params;
  if (!isLocale(locale) || !isGuideSlug(guide)) return {};
  const c = getGuideContent(locale, guide);
  const meta = buildMetadata({ locale, path: `/guides/${guide}`, title: c.metaTitle, description: c.metaDescription });
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: "article", publishedTime: guideMap[guide].published, modifiedTime: guideMap[guide].updated },
  };
}

/** Guide markup → plain text for structured data. */
function plain(text: string) {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*|`/g, "");
}

function formatDate(date: string, locale: Locale) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export default async function GuidePage({ params }: PageProps<"/[locale]/guides/[guide]">) {
  const { locale, guide: slug } = await params;
  if (!isLocale(locale) || !isGuideSlug(slug)) notFound();
  const def = guideMap[slug];
  const dict = getDictionary(locale);
  const g = dict.guidesPage;
  const c = getGuideContent(locale, slug);
  const toolNames = getToolSummaries(locale);
  const workflowNames = getWorkflowSummaries(locale);
  const url = localizedUrl(locale, `/guides/${slug}`);
  const toc = c.body.filter((b) => b.type === "h2");
  // Related: guides sharing a tool, then the same category.
  const related = getGuideSummaries(locale)
    .filter((x) => x.slug !== slug)
    .map((x) => ({ x, score: guideMap[x.slug].tools.filter((t) => def.tools.includes(t)).length * 2 + (x.category === def.category ? 1 : 0) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((r) => r.x);

  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: c.title,
        description: c.metaDescription,
        url,
        inLanguage: locale,
        datePublished: def.published,
        dateModified: def.updated,
        author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
        publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url, logo: { "@type": "ImageObject", url: `${siteConfig.url}/icon.svg` } },
        mainEntityOfPage: url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: dict.tool.home, item: localizedUrl(locale, "") },
          { "@type": "ListItem", position: 2, name: g.title, item: localizedUrl(locale, "/guides") },
          { "@type": "ListItem", position: 3, name: c.title, item: url },
        ],
      },
      ...(c.faq?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plain(f.a) } })),
            },
          ]
        : []),
    ],
  };

  return (
    <article className="mx-auto max-w-[1240px] px-4 pt-6 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structured)} />
      <GuideView slug={slug} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-3">
          <li><Link href={`/${locale}`} className="hover:text-ink">{dict.tool.home}</Link></li>
          <li aria-hidden><ChevronRight className="size-3.5" /></li>
          <li><Link href={`/${locale}/guides`} className="hover:text-ink">{g.title}</Link></li>
          <li aria-hidden><ChevronRight className="size-3.5" /></li>
          <li><Link href={`/${locale}/guides#${def.category}`} className="hover:text-ink">{dict.guideCategories[def.category]}</Link></li>
        </ol>
      </nav>

      <header className="mt-6 border-t-2 border-ink pt-6">
        <p className="text-sm font-semibold text-ink-2">{dict.guideCategories[def.category]}</p>
        <h1 className="mt-3 max-w-4xl text-[2.2rem] leading-[1.08] font-bold tracking-[-0.04em] text-balance text-ink sm:text-[3rem]">{c.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-2">{c.summary}</p>
        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-3">
          <span>{siteConfig.name}</span>
          <time dateTime={def.updated}>{format(g.updated, { date: formatDate(def.updated, locale) })}</time>
          <span>{format(g.minutes, { n: readingMinutes(locale, c) })}</span>
        </p>
      </header>

      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-24">
            <p className="border-b border-line pb-2 text-xs font-semibold tracking-[0.08em] text-ink-3 uppercase">{g.onThisPage}</p>
            <ol className="mt-3 grid gap-2 text-sm">
              {toc.map((h, i) => (
                <li key={i}>
                  <a href={`#${headingId(h.text, i)}`} className="text-ink-2 hover:text-ink">
                    {h.text}
                  </a>
                </li>
              ))}
              {c.faq?.length ? (
                <li>
                  <a href="#faq" className="text-ink-2 hover:text-ink">
                    {g.faq}
                  </a>
                </li>
              ) : null}
            </ol>
          </div>
        </aside>

        <div className="min-w-0 lg:col-span-8">
          <section aria-labelledby="takeaways" className="rounded-xl border border-line bg-muted p-6">
            <h2 id="takeaways" className="text-sm font-semibold tracking-[0.08em] text-ink-3 uppercase">
              {g.takeaways}
            </h2>
            <ul className="mt-3 grid gap-2">
              {c.takeaways.map((t, i) => (
                <li key={i} className="flex gap-3 leading-relaxed text-ink">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
                  <span>
                    <Inline text={t} locale={locale} />
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <GuideBody blocks={c.body} locale={locale} dict={dict} toolNames={toolNames} workflowNames={workflowNames} />

          {c.faq?.length ? (
            <section aria-labelledby="faq" className="mt-14">
              <h2 id="faq" className="scroll-mt-24 border-t border-line pt-6 text-[1.5rem] font-bold tracking-[-0.025em] text-ink">
                {g.faq}
              </h2>
              <div className="mt-4 divide-y divide-line border-b border-line">
                {c.faq.map((f, i) => (
                  <details key={i} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <ChevronRight className="size-5 shrink-0 text-ink-3 transition group-open:rotate-90" />
                    </summary>
                    <p className="-mt-1 pb-4 leading-relaxed text-ink-2">
                      <Inline text={f.a} locale={locale} />
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}

          {c.sources?.length ? (
            <section aria-labelledby="sources" className="mt-14">
              <h2 id="sources" className="border-t border-line pt-6 text-sm font-semibold tracking-[0.08em] text-ink-3 uppercase">
                {g.sources}
              </h2>
              <ol className="mt-3 grid gap-1.5 text-sm">
                {c.sources.map((src) => (
                  <li key={src.url}>
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-ink-2 underline decoration-line-strong underline-offset-[3px] hover:text-ink">
                      {src.label}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
        </div>
      </div>

      <AdSlot placement="home" className="mt-20" />

      <section aria-labelledby="tools" className="mt-20">
        <SectionHeader id="tools" title={dict.tool.relatedTitle} />
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {def.tools.map((t) => (
            <li key={t}>
              <ToolCard tool={toolMap[t]} name={toolNames[t].name} short={toolNames[t].short} href={`/${locale}/${t}`} variant="compact" />
            </li>
          ))}
        </ul>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related" className="mt-20">
          <SectionHeader id="related" title={g.related} />
          <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((x) => (
              <li key={x.slug}>
                <GuideCard guide={x} locale={locale} dict={dict} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
