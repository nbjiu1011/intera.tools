import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideCard } from "@/components/home/GuideCard";
import { HomeSearch } from "@/components/home/HomeSearch";
import { QuickActions } from "@/components/home/QuickActions";
import { WorkflowCard } from "@/components/home/WorkflowCard";
import { AdSlot } from "@/components/ui/AdSlot";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToolIcon } from "@/components/ui/ToolIcon";
import { siteConfig } from "@/config/site";
import { getGuideContent, getGuideSummaries, getToolSummaries, getWorkflowSummaries } from "@/content";
import { buildSearchEntries } from "@/content/search";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { format } from "@/i18n/format";
import { isGuideSlug } from "@/lib/guides";
import { buildMetadata, jsonLd, localizedUrl } from "@/lib/seo";
import { isToolSlug, tools, toolSections } from "@/lib/tools";
import { isWorkflowSlug, workflows } from "@/lib/workflows";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "", title: dict.meta.siteTitle, description: dict.meta.siteDescription, absoluteTitle: true });
}

/** "compress-image" | "workflow:slug" | "guide:slug" → link label and href. */
function resolveLink(locale: Locale, id: string) {
  const [kind, slug] = id.includes(":") ? id.split(":") : ["tool", id];
  if (kind === "tool" && isToolSlug(slug)) return { href: `/${locale}/${slug}`, label: getToolSummaries(locale)[slug].name };
  if (kind === "workflow" && isWorkflowSlug(slug)) return { href: `/${locale}/workflows/${slug}`, label: getWorkflowSummaries(locale)[slug].name };
  if (kind === "guide" && isGuideSlug(slug)) return { href: `/${locale}/guides/${slug}`, label: getGuideContent(locale, slug).title };
  throw new Error(`Unknown home link "${id}"`);
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const h = dict.home;
  const names = getToolSummaries(locale);
  const workflowNames = getWorkflowSummaries(locale);
  const guideList = getGuideSummaries(locale);

  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: localizedUrl(locale, ""),
        inLanguage: locale,
        description: dict.meta.siteDescription,
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/icon.svg`,
        email: siteConfig.contactEmail,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structured)} />

      {/* 01 — Hero + search */}
      <section className="mx-auto max-w-[1240px] px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-sm font-semibold text-ink-2">
              <span className="mr-3 tabular-nums text-ink">01</span>
              {h.eyebrow}
            </p>
            <h1 className="mt-6 text-[2.6rem] leading-[1.02] font-bold tracking-[-0.045em] text-balance text-ink sm:text-[3.6rem] lg:text-[4.4rem]">
              {h.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{h.subtitle}</p>
          </div>
          <div className="lg:col-span-8">
            <HomeSearch entries={buildSearchEntries(locale)} />
          </div>
        </div>
        <div className="mt-12">
          <QuickActions />
        </div>
      </section>

      {/* 02 — Solve a problem */}
      <section className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6 lg:px-8" aria-labelledby="problems">
        <SectionHeader id="problems" index={h.problemsEyebrow} title={h.problemsTitle} lead={h.problemsLead} />
        <ul className="mt-8 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {h.problems.map((p) => (
            <li key={p.title} className="flex flex-col bg-bg p-5">
              <p className="font-semibold leading-snug text-ink">{p.title}</p>
              <ul className="mt-auto grid gap-1.5 pt-5">
                {p.links.map((id) => {
                  const l = resolveLink(locale, id);
                  return (
                    <li key={id}>
                      <Link href={l.href} className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline">
                        <ArrowRight className="size-3.5 shrink-0" />
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {/* 03 — Workflows */}
      <section className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6 lg:px-8" aria-labelledby="workflows">
        <SectionHeader
          id="workflows"
          index={h.workflowsEyebrow}
          title={h.workflowsTitle}
          lead={h.workflowsLead}
          action={
            <Link href={`/${locale}/workflows`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:underline">
              {h.allWorkflows} <ArrowRight className="size-4" />
            </Link>
          }
        />
        <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {workflows.map((w, i) => (
            <li key={w.slug}>
              <WorkflowCard workflow={w} name={workflowNames[w.slug].name} short={workflowNames[w.slug].short} locale={locale} dict={dict} index={i} />
            </li>
          ))}
        </ul>
      </section>

      <AdSlot placement="home" className="mt-20 px-4" />

      {/* 04 — All tools */}
      <section className="mx-auto mt-20 max-w-[1240px] px-4 sm:px-6 lg:px-8" aria-labelledby="tools">
        <SectionHeader
          id="tools"
          index={h.toolsEyebrow}
          title={h.toolsTitle}
          lead={format(h.toolsLead, { count: tools.length })}
          action={
            <Link href={`/${locale}/tools`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:underline">
              {h.allTools} <ArrowRight className="size-4" />
            </Link>
          }
        />
        <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {toolSections.map((section) => (
            <div key={section}>
              <h3 className="border-b border-line pb-2 text-sm font-semibold text-ink">{dict.sections[section]}</h3>
              <ul className="mt-2">
                {tools
                  .filter((t) => t.section === section)
                  .map((t) => (
                    <li key={t.slug}>
                      <Link href={`/${locale}/${t.slug}`} className="group flex items-center gap-3 border-b border-line py-2.5 transition hover:border-ink">
                        <ToolIcon icon={t.icon} accent={t.accent} size="sm" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-ink">{names[t.slug].name}</span>
                          <span className="block truncate text-xs text-ink-3">{names[t.slug].short}</span>
                        </span>
                        <ArrowUpRight className="size-4 shrink-0 text-ink-3 transition group-hover:text-ink" />
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 05 — Guides */}
      <section className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6 lg:px-8" aria-labelledby="guides">
        <SectionHeader
          id="guides"
          index={h.guidesEyebrow}
          title={h.guidesTitle}
          lead={h.guidesLead}
          action={
            <Link href={`/${locale}/guides`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:underline">
              {h.allGuides} <ArrowRight className="size-4" />
            </Link>
          }
        />
        <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {guideList.slice(0, 6).map((g) => (
            <li key={g.slug}>
              <GuideCard guide={g} locale={locale} dict={dict} />
            </li>
          ))}
        </ul>
      </section>

      {/* 06 — Privacy & benefits */}
      <section className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6 lg:px-8" aria-labelledby="benefits">
        <SectionHeader id="benefits" index={h.benefitsEyebrow} title={h.benefitsTitle} />
        <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {h.benefits.map((b, i) => (
            <li key={b.title} className="border-t border-line pt-4">
              <span className="text-sm font-semibold text-brand tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-bold tracking-[-0.015em] text-ink">{b.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{b.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
