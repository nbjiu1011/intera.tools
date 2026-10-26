import { ChevronRight, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideCard } from "@/components/home/GuideCard";
import { ToolCard } from "@/components/home/ToolCard";
import { WorkflowCard } from "@/components/home/WorkflowCard";
import { FavoriteButton, ToolView } from "@/components/tool/ToolView";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { AdSlot } from "@/components/ui/AdSlot";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig } from "@/config/site";
import { getGuideSummaries, getToolContent, getToolSummaries, getWorkflowSummaries } from "@/content";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { format } from "@/i18n/format";
import { guidesForTool } from "@/lib/guides";
import { buildMetadata, jsonLd, localizedUrl } from "@/lib/seo";
import { isToolSlug, toolMap, tools } from "@/lib/tools";
import { workflows } from "@/lib/workflows";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => tools.map((t) => ({ locale, tool: t.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/[tool]">): Promise<Metadata> {
  const { locale, tool } = await params;
  if (!isLocale(locale) || !isToolSlug(tool)) return {};
  const content = getToolContent(locale, tool);
  return buildMetadata({ locale, path: `/${tool}`, title: content.metaTitle, description: content.metaDescription, ownImage: true });
}

const h2 = "text-[1.6rem] leading-tight font-bold tracking-[-0.03em] text-ink sm:text-[1.9rem]";

export default async function ToolPage({ params }: PageProps<"/[locale]/[tool]">) {
  const { locale, tool: slug } = await params;
  if (!isLocale(locale) || !isToolSlug(slug)) notFound();
  const tool = toolMap[slug];
  const dict = getDictionary(locale);
  const t = dict.toolPage;
  const content = getToolContent(locale, slug);
  const names = getToolSummaries(locale);
  const sectionName = dict.sections[tool.section];
  const url = localizedUrl(locale, `/${slug}`);
  const relatedGuides = getGuideSummaries(locale).filter((g) => guidesForTool(slug).some((r) => r.slug === g.slug));
  const relatedWorkflows = workflows.filter((w) => w.tools.includes(slug));
  const workflowNames = getWorkflowSummaries(locale);

  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: content.name,
        url,
        description: content.metaDescription,
        applicationCategory: tool.category === "everyday" ? "UtilitiesApplication" : "MultimediaApplication",
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
          { "@type": "ListItem", position: 2, name: sectionName, item: localizedUrl(locale, "/tools") },
          { "@type": "ListItem", position: 3, name: content.name, item: url },
        ],
      },
      {
        "@type": "HowTo",
        name: format(dict.tool.howTitle, { name: content.name }),
        step: content.steps.map((text, i) => ({ "@type": "HowToStep", position: i + 1, text })),
      },
      {
        "@type": "FAQPage",
        mainEntity: content.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <ToolView slug={slug}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structured)} />

      <div className="mx-auto max-w-[1240px] px-4 pt-6 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-3">
            <li><Link href={`/${locale}`} className="hover:text-ink">{dict.tool.home}</Link></li>
            <li aria-hidden><ChevronRight className="size-3.5" /></li>
            <li><Link href={`/${locale}/tools`} className="hover:text-ink">{sectionName}</Link></li>
            <li aria-hidden><ChevronRight className="size-3.5" /></li>
            <li aria-current="page" className="font-medium text-ink-2">{content.name}</li>
          </ol>
        </nav>

        {/* 1 — Name and core description */}
        <header className="mt-6 grid gap-4 border-t-2 border-ink pt-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h1 className="text-[2.1rem] leading-[1.05] font-bold tracking-[-0.04em] text-ink sm:text-[2.8rem]">{content.h1}</h1>
            <p className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-ink-2">{content.lead}</p>
          </div>
          <div className="flex flex-wrap items-start gap-2 lg:col-span-4 lg:justify-end">
            <span className="inline-flex h-9 items-center gap-1.5 rounded-md bg-success-soft px-3 text-sm font-medium text-success">
              <ShieldCheck className="size-4" />
              {dict.tool.badgeLocal}
            </span>
            <FavoriteButton id={slug} />
          </div>
        </header>

        {/* 2–5 — Workspace: files, options, preview, download and "continue with" */}
        <div className="mt-8">
          <ToolWorkspace slug={slug} />
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* How to */}
        <section aria-labelledby="how" className="mt-20">
          <SectionHeader id="how" title={format(dict.tool.howTitle, { name: content.name })} />
          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            {content.steps.map((step, i) => (
              <li key={i} className="border-t border-line pt-4">
                <span className="text-sm font-semibold text-brand tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 leading-relaxed text-ink">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 6 — Use cases */}
        <section aria-labelledby="use-cases" className="mt-20">
          <SectionHeader id="use-cases" title={t.useCasesTitle} />
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {content.useCases.map((u) => (
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
        {/* 7 — How it works, features, technical notes and limits */}
        <section aria-labelledby="about" className="mt-20 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="about" className={h2}>{content.about.title}</h2>
            {content.about.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 leading-[1.85] text-ink-2">{p}</p>
            ))}
            <ul className="mt-8 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {content.features.map((f) => (
                <li key={f.title} className="border-t border-line pt-3">
                  <h3 className="text-sm font-bold text-ink">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{f.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <aside className="h-fit rounded-xl border border-line bg-muted p-6 lg:col-span-5" aria-labelledby="limits">
            <h2 id="limits" className="text-lg font-bold text-ink">{t.limitsTitle}</h2>
            <ul className="mt-4 grid gap-3">
              {content.limits.map((l, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-ink" />
                  {l}
                </li>
              ))}
            </ul>
            <p className="mt-5 flex gap-2 border-t border-line pt-4 text-sm leading-relaxed text-ink-2">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" />
              {dict.tool.privacyBody}
            </p>
          </aside>
        </section>

        {/* 8 — FAQ */}
        <section aria-labelledby="faq" className="mt-20">
          <SectionHeader id="faq" title={dict.tool.faqTitle} />
          <div className="mt-6 divide-y divide-line border-b border-line">
            {content.faq.map((f, i) => (
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

        {/* 9 — Related tools */}
        <section aria-labelledby="related" className="mt-20">
          <SectionHeader id="related" title={dict.tool.relatedTitle} />
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {tool.related.map((r) => (
              <li key={r}>
                <ToolCard tool={toolMap[r]} name={names[r].name} short={names[r].short} href={`/${locale}/${r}`} variant="compact" />
              </li>
            ))}
          </ul>
        </section>

        {/* 10 — Related guides and workflows */}
        {(relatedGuides.length > 0 || relatedWorkflows.length > 0) && (
          <section aria-labelledby="guides" className="mt-20">
            <SectionHeader id="guides" title={relatedGuides.length ? t.guidesTitle : t.workflowsTitle} />
            <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedGuides.slice(0, 3).map((g) => (
                <li key={g.slug}>
                  <GuideCard guide={g} locale={locale} dict={dict} />
                </li>
              ))}
              {relatedWorkflows.slice(0, relatedGuides.length >= 3 ? 0 : 3 - Math.min(3, relatedGuides.length)).map((w) => (
                <li key={w.slug}>
                  <WorkflowCard workflow={w} name={workflowNames[w.slug].name} short={workflowNames[w.slug].short} locale={locale} dict={dict} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </ToolView>
  );
}
