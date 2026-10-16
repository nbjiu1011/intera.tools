import { ArrowRight, Check, Globe, MonitorSmartphone, MousePointerClick, ShieldCheck, Upload, Download, Zap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroIllustration } from "@/components/home/HeroIllustration";
import { HomeExplorer } from "@/components/home/HomeExplorer";
import { PopularTools } from "@/components/home/PopularTools";
import { ToolCard } from "@/components/home/ToolCard";
import { AdSlot } from "@/components/ui/AdSlot";
import { siteConfig } from "@/config/site";
import { getToolSummaries } from "@/content";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { format } from "@/i18n/format";
import { buildMetadata, jsonLd, localizedUrl } from "@/lib/seo";
import { tools, type ToolCategory } from "@/lib/tools";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "", title: dict.meta.siteTitle, description: dict.meta.siteDescription, absoluteTitle: true });
}

function SectionHeading({ eyebrow, children, lead, action }: { eyebrow: string; children: React.ReactNode; lead?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div>
        <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase">{eyebrow}</p>
        <h2 className="mt-2 text-[1.85rem] leading-tight font-extrabold tracking-[-0.03em] text-ink sm:text-[2.2rem]">{children}</h2>
        {lead && <p className="mt-2 text-ink-2">{lead}</p>}
      </div>
      {action}
    </div>
  );
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const names = getToolSummaries(locale);
  const h = dict.home;
  const trustIcons = [Globe, ShieldCheck, Zap, MonitorSmartphone];
  const trustColors = ["text-brand", "text-success", "text-[#f59e0b]", "text-brand-purple"];
  const stepIcons = [MousePointerClick, Upload, Download];
  const groups: { category: ToolCategory; title: string; lead: string }[] = [
    { category: "image", title: dict.categories.imageTools, lead: dict.categories.imageToolsLead },
    { category: "pdf", title: dict.categories.pdfTools, lead: dict.categories.pdfToolsLead },
    { category: "everyday", title: dict.categories.everydayTools, lead: dict.categories.everydayToolsLead },
  ];

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
        potentialAction: {
          "@type": "SearchAction",
          target: `${localizedUrl(locale, "/tools")}?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/icon.svg`,
        email: siteConfig.contactEmail,
      },
      {
        "@type": "ItemList",
        name: dict.toolsPage.title,
        itemListElement: tools.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: names[t.slug].name,
          url: localizedUrl(locale, `/${t.slug}`),
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structured)} />

      {/* Hero */}
      <section className="relative mx-auto max-w-[1240px] px-4 pt-6 sm:px-6 lg:px-8 lg:pt-10">
        <div className="flex flex-col">
          <div className="relative z-10 animate-fade-up lg:max-w-[50%]">
            <span className="inline-flex items-center rounded-full bg-[#e8eeff] px-3.5 py-1.5 text-sm font-medium text-[#3b63e6] dark:bg-[#1b2655] dark:text-[#9db5ff]">
              {h.badge}
            </span>
            <h1 className="mt-6 text-[2.75rem] leading-[1.04] font-extrabold tracking-[-0.045em] text-ink min-[400px]:text-[3.1rem] sm:text-[3.9rem] lg:text-[4.1rem] xl:text-[4.4rem]">
              {h.titleLine1}
              <br />
              {h.titleLine2Before}
              <span className="text-gradient">{h.titleHighlight}</span>
              {h.titleLine2After}
            </h1>
            <p className="mt-6 text-[1.1rem] leading-relaxed text-ink-2 sm:text-[1.2rem]">
              {h.subtitle}
              <br />
              {h.subtitle2}
            </p>
          </div>
          <div className="relative order-3 mx-auto mt-10 w-full max-w-[340px] sm:max-w-[480px] lg:absolute lg:top-0 lg:right-2 lg:order-none lg:mt-0 lg:max-w-[600px] xl:right-0">
            <HeroIllustration noteTools={h.noteTools} noteValues={h.noteValues} alt={h.illustrationAlt} />
          </div>
          <div className="order-2 mt-8 lg:order-none lg:mt-10">
            <HomeExplorer />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="mx-auto mt-10 max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <ul className="glass grid grid-cols-2 gap-y-6 rounded-[1.75rem] px-5 py-6 shadow-card sm:px-8 lg:grid-cols-4 lg:divide-x lg:divide-line">
          {h.trust.map((item, i) => {
            const Icon = trustIcons[i];
            return (
              <li key={item.title} className="flex items-center gap-3.5 lg:justify-center lg:px-4">
                <Icon className={`size-8 shrink-0 ${trustColors[i]}`} strokeWidth={1.8} />
                <div>
                  <p className="font-bold text-ink">{item.title}</p>
                  <p className="text-sm text-ink-2">{item.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Popular tools */}
      <section className="mx-auto mt-20 max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="card rounded-[2rem] p-5 sm:p-8 lg:p-10">
          <SectionHeading
            eyebrow={h.popularEyebrow}
            lead={h.popularLead}
            action={
              <Link
                href={`/${locale}/tools`}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-brand/40 px-5 font-semibold text-brand transition hover:bg-brand hover:text-white"
              >
                {h.viewAll} <ArrowRight className="size-4" />
              </Link>
            }
          >
            {h.popularTitleBefore}
            <span className="text-gradient">{h.popularTitleHighlight}</span>
            {h.popularTitleAfter}
          </SectionHeading>
          <div className="mt-8">
            <PopularTools locale={locale} names={names} />
          </div>
        </div>
      </section>

      <AdSlot placement="home" className="mt-14 px-4" />

      {/* All tools */}
      <section className="mx-auto mt-14 max-w-[1240px] px-4 sm:px-6 lg:px-8" id="all-tools">
        <SectionHeading eyebrow={h.allEyebrow} lead={format(h.allLead, { count: tools.length })}>
          {h.allTitle}
        </SectionHeading>
        <div className="mt-8 grid gap-10">
          {groups.map((g) => (
            <div key={g.category}>
              <div className="mb-4 flex items-baseline gap-3">
                <h3 className="text-lg font-bold text-ink">{g.title}</h3>
                <p className="hidden text-sm text-ink-3 sm:block">{g.lead}</p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tools
                  .filter((t) => t.category === g.category)
                  .map((t) => (
                    <li key={t.slug}>
                      <ToolCard tool={t} name={names[t.slug].name} short={names[t.slug].short} href={`/${locale}/${t.slug}`} variant="compact" />
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={h.howEyebrow}>{h.howTitle}</SectionHeading>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {h.howSteps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <li key={step.title} className="card relative overflow-hidden p-6">
                <span className="absolute top-1 right-5 text-[4.5rem] leading-none font-black text-sunken select-none" aria-hidden>
                  {i + 1}
                </span>
                <span className="bg-brand-gradient relative grid size-12 place-items-center rounded-2xl text-white shadow-button">
                  <Icon className="size-6" />
                </span>
                <h3 className="relative mt-5 text-lg font-bold text-ink">{step.title}</h3>
                <p className="relative mt-1.5 text-ink-2">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Privacy band */}
      <section className="mx-auto mt-20 max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-gradient relative overflow-hidden rounded-[2rem] px-6 py-10 text-white sm:px-12 sm:py-14">
          <div className="absolute -top-20 -right-16 size-72 rounded-full bg-white/15 blur-2xl" aria-hidden />
          <div className="absolute -bottom-24 left-1/3 size-72 rounded-full bg-[#f0abfc]/30 blur-3xl" aria-hidden />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-white/75 uppercase">{h.privacyEyebrow}</p>
              <h2 className="mt-2 text-[1.9rem] leading-tight font-extrabold tracking-[-0.03em] sm:text-[2.3rem]">{h.privacyTitle}</h2>
              <p className="mt-4 max-w-xl text-white/85">{h.privacyBody}</p>
            </div>
            <ul className="grid gap-3">
              {h.privacyPoints.map((p) => (
                <li key={p} className="flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3.5 font-medium backdrop-blur">
                  <span className="grid size-7 place-items-center rounded-full bg-white text-brand">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
