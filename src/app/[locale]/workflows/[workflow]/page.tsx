import { ChevronRight, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideCard } from "@/components/home/GuideCard";
import { ToolCard } from "@/components/home/ToolCard";
import { FavoriteButton, ToolView } from "@/components/tool/ToolView";
import { AdSlot } from "@/components/ui/AdSlot";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkflowWorkspace } from "@/components/workflows/WorkflowWorkspace";
import { siteConfig } from "@/config/site";
import { getGuideSummaries, getToolSummaries, getWorkflowContent } from "@/content";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { guides } from "@/lib/guides";
import { buildMetadata, jsonLd, localizedUrl } from "@/lib/seo";
import { toolMap } from "@/lib/tools";
import { isWorkflowSlug, workflowMap, workflows } from "@/lib/workflows";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => workflows.map((w) => ({ locale, workflow: w.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/workflows/[workflow]">): Promise<Metadata> {
  const { locale, workflow } = await params;
  if (!isLocale(locale) || !isWorkflowSlug(workflow)) return {};
  const c = getWorkflowContent(locale, workflow);
  return buildMetadata({ locale, path: `/workflows/${workflow}`, title: c.metaTitle, description: c.metaDescription });
}

export default async function WorkflowPage({ params }: PageProps<"/[locale]/workflows/[workflow]">) {
  const { locale, workflow: slug } = await params;
  if (!isLocale(locale) || !isWorkflowSlug(slug)) notFound();
  const def = workflowMap[slug];
  const dict = getDictionary(locale);
  const c = getWorkflowContent(locale, slug);
  const toolNames = getToolSummaries(locale);
  const url = localizedUrl(locale, `/workflows/${slug}`);
  const relatedGuides = getGuideSummaries(locale).filter((g) => guides.find((x) => x.slug === g.slug)?.workflows?.includes(slug));

  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: c.name,
        url,
        description: c.metaDescription,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any (web browser)",
        browserRequirements: "Requires JavaScript",
        inLanguage: locale,
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: dict.tool.home, item: localizedUrl(locale, "") },
          { "@type": "ListItem", position: 2, name: dict.workflowsPage.title, item: localizedUrl(locale, "/workflows") },
          { "@type": "ListItem", position: 3, name: c.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <ToolView slug={slug} id={`workflow:${slug}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structured)} />
      <div className="mx-auto max-w-[1240px] px-4 pt-6 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-3">
            <li><Link href={`/${locale}`} className="hover:text-ink">{dict.tool.home}</Link></li>
            <li aria-hidden><ChevronRight className="size-3.5" /></li>
            <li><Link href={`/${locale}/workflows`} className="hover:text-ink">{dict.workflowsPage.title}</Link></li>
            <li aria-hidden><ChevronRight className="size-3.5" /></li>
            <li aria-current="page" className="font-medium text-ink-2">{c.name}</li>
          </ol>
        </nav>

        <header className="mt-6 grid gap-4 border-t-2 border-ink pt-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-sm font-semibold text-ink-2">{dict.workflowCategories[def.category]}</p>
            <h1 className="mt-2 text-[2.1rem] leading-[1.05] font-bold tracking-[-0.04em] text-ink sm:text-[2.8rem]">{c.h1}</h1>
            <p className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-ink-2">{c.lead}</p>
          </div>
          <div className="flex flex-wrap items-start gap-2 lg:col-span-4 lg:justify-end">
            <span className="inline-flex h-9 items-center gap-1.5 rounded-md bg-success-soft px-3 text-sm font-medium text-success">
              <ShieldCheck className="size-4" />
              {dict.tool.badgeLocal}
            </span>
            <FavoriteButton id={`workflow:${slug}`} />
          </div>
          <ol className="flex flex-wrap gap-px overflow-hidden rounded-lg border border-line bg-line lg:col-span-12" aria-label={dict.workflowsPage.stepsLabel}>
            {c.stepLabels.map((label, i) => (
              <li key={label} className="flex min-w-[8rem] flex-1 items-baseline gap-2 bg-bg px-3 py-2.5 text-sm">
                <span className="font-semibold text-brand tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-medium text-ink">{label}</span>
              </li>
            ))}
          </ol>
        </header>

        <div className="mt-8">
          <WorkflowWorkspace slug={slug} />
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <section aria-labelledby="use-cases" className="mt-20">
          <SectionHeader id="use-cases" title={dict.toolPage.useCasesTitle} />
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {c.useCases.map((u) => (
              <li key={u.title} className="border-t border-line pt-4">
                <h3 className="font-bold text-ink">{u.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{u.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <AdSlot placement="tool" className="mt-20 px-4" />

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <section aria-labelledby="about" className="mt-20 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="about" className="text-[1.6rem] leading-tight font-bold tracking-[-0.03em] text-ink sm:text-[1.9rem]">{c.about.title}</h2>
            {c.about.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 leading-[1.85] text-ink-2">{p}</p>
            ))}
          </div>
          <aside className="h-fit rounded-xl border border-line bg-muted p-6 lg:col-span-5" aria-labelledby="limits">
            <h2 id="limits" className="text-lg font-bold text-ink">{dict.toolPage.limitsTitle}</h2>
            <ul className="mt-4 grid gap-3">
              {c.limits.map((l, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-ink" />
                  {l}
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section aria-labelledby="faq" className="mt-20">
          <SectionHeader id="faq" title={dict.tool.faqTitle} />
          <div className="mt-6 divide-y divide-line border-b border-line">
            {c.faq.map((f, i) => (
              <details key={i} className="group" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronRight className="size-5 shrink-0 text-ink-3 transition group-open:rotate-90" />
                </summary>
                <p className="-mt-1 max-w-3xl pb-5 leading-relaxed text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="tools" className="mt-20">
          <SectionHeader id="tools" title={dict.workflowsPage.toolsUsed} />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {def.tools.map((t) => (
              <li key={t}>
                <ToolCard tool={toolMap[t]} name={toolNames[t].name} short={toolNames[t].short} href={`/${locale}/${t}`} variant="compact" />
              </li>
            ))}
          </ul>
        </section>

        {relatedGuides.length > 0 && (
          <section aria-labelledby="guides" className="mt-20">
            <SectionHeader id="guides" title={dict.toolPage.guidesTitle} />
            <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedGuides.map((g) => (
                <li key={g.slug}>
                  <GuideCard guide={g} locale={locale} dict={dict} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </ToolView>
  );
}
