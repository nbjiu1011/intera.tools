import { ChevronRight, ShieldCheck, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolCard } from "@/components/home/ToolCard";
import { ToolView } from "@/components/tool/ToolView";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { AdSlot } from "@/components/ui/AdSlot";
import { ToolIcon } from "@/components/ui/ToolIcon";
import { siteConfig } from "@/config/site";
import { getToolContent, getToolSummaries } from "@/content";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { format } from "@/i18n/format";
import { buildMetadata, jsonLd, localizedUrl } from "@/lib/seo";
import { isToolSlug, toolMap, tools } from "@/lib/tools";

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

export default async function ToolPage({ params }: PageProps<"/[locale]/[tool]">) {
  const { locale, tool: slug } = await params;
  if (!isLocale(locale) || !isToolSlug(slug)) notFound();
  const tool = toolMap[slug];
  const dict = getDictionary(locale);
  const content = getToolContent(locale, slug);
  const names = getToolSummaries(locale);
  const categoryName = {
    image: dict.categories.imageTools,
    pdf: dict.categories.pdfTools,
    everyday: dict.categories.everydayTools,
  }[tool.category];
  const url = localizedUrl(locale, `/${slug}`);

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
          { "@type": "ListItem", position: 2, name: categoryName, item: localizedUrl(locale, "/tools") },
          { "@type": "ListItem", position: 3, name: content.name, item: url },
        ],
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

      <div className="mx-auto max-w-[1240px] px-4 pt-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-3">
            <li><Link href={`/${locale}`} className="hover:text-brand">{dict.tool.home}</Link></li>
            <li aria-hidden><ChevronRight className="size-3.5" /></li>
            <li><Link href={`/${locale}/tools`} className="hover:text-brand">{categoryName}</Link></li>
            <li aria-hidden><ChevronRight className="size-3.5" /></li>
            <li aria-current="page" className="font-medium text-ink-2">{content.name}</li>
          </ol>
        </nav>

        <header className="mx-auto mt-8 max-w-3xl text-center sm:mt-10">
          <ToolIcon icon={tool.icon} accent={tool.accent} size="xl" className="shadow-[0_18px_40px_-18px_rgba(50,70,170,.5)]" />
          <h1 className="mt-5 text-[2.1rem] leading-[1.1] font-extrabold tracking-[-0.04em] text-ink sm:text-[2.9rem]">{content.h1}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-ink-2 sm:text-lg">{content.lead}</p>
          <ul className="mt-5 flex flex-wrap justify-center gap-2 text-sm">
            {[dict.tool.badgeFree, dict.tool.badgeNoSignup, dict.tool.badgeLocal].map((b, i) => (
              <li
                key={b}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium ${
                  i === 2 ? "bg-success-soft text-success" : "bg-surface text-ink-2 ring-1 ring-line"
                }`}
              >
                {i === 2 ? <ShieldCheck className="size-4" /> : <Sparkles className="size-3.5 text-brand" />}
                {b}
              </li>
            ))}
          </ul>
        </header>

        <div className="mt-10">
          <ToolWorkspace slug={slug} />
        </div>
      </div>

      <AdSlot placement="tool" className="mt-16 px-4" />

      <div className="mx-auto mt-16 max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <section aria-labelledby="how">
          <h2 id="how" className="text-[1.6rem] font-extrabold tracking-[-0.03em] text-ink sm:text-[1.9rem]">
            {format(dict.tool.howTitle, { name: content.name })}
          </h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {content.steps.map((step, i) => (
              <li key={i} className="card p-6">
                <span className="text-gradient text-sm font-bold">{format(dict.tool.step, { n: i + 1 })}</span>
                <p className="mt-2 leading-relaxed text-ink">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="features" className="mt-16">
          <h2 id="features" className="text-[1.6rem] font-extrabold tracking-[-0.03em] text-ink sm:text-[1.9rem]">
            {dict.tool.featuresTitle}
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {content.features.map((f) => (
              <li key={f.title} className="rounded-[1.25rem] border border-line bg-muted/60 p-6">
                <h3 className="font-bold text-ink">{f.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{f.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="about" className="mt-16 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 id="about" className="text-[1.6rem] font-extrabold tracking-[-0.03em] text-ink sm:text-[1.9rem]">
              {content.about.title}
            </h2>
            {content.about.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 leading-[1.85] text-ink-2">{p}</p>
            ))}
          </div>
          <aside className="h-fit rounded-[1.5rem] border border-success/25 bg-success-soft p-6">
            <ShieldCheck className="size-8 text-success" />
            <p className="mt-3 font-bold text-ink">{dict.tool.privacyTitle}</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{dict.tool.privacyBody}</p>
          </aside>
        </section>

        <section aria-labelledby="faq" className="mt-16">
          <h2 id="faq" className="text-[1.6rem] font-extrabold tracking-[-0.03em] text-ink sm:text-[1.9rem]">
            {dict.tool.faqTitle}
          </h2>
          <div className="mt-6 grid gap-3">
            {content.faq.map((f, i) => (
              <details key={i} className="group card overflow-hidden" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronRight className="size-5 shrink-0 text-ink-3 transition group-open:rotate-90" />
                </summary>
                <p className="-mt-1 px-6 pb-5 leading-relaxed text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="related" className="mt-16">
          <h2 id="related" className="text-[1.6rem] font-extrabold tracking-[-0.03em] text-ink sm:text-[1.9rem]">
            {dict.tool.relatedTitle}
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {tool.related.map((r) => (
              <li key={r}>
                <ToolCard tool={toolMap[r]} name={names[r].name} short={names[r].short} href={`/${locale}/${r}`} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </ToolView>
  );
}
