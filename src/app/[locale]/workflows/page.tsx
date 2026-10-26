import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkflowCard } from "@/components/home/WorkflowCard";
import { getWorkflowSummaries } from "@/content";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata, jsonLd, localizedUrl } from "@/lib/seo";
import { workflows } from "@/lib/workflows";

export async function generateMetadata({ params }: PageProps<"/[locale]/workflows">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/workflows", title: dict.workflowsPage.metaTitle, description: dict.workflowsPage.metaDescription });
}

export default async function WorkflowsPage({ params }: PageProps<"/[locale]/workflows">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const names = getWorkflowSummaries(locale);
  const p = dict.workflowsPage;

  const structured = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: p.title,
    itemListElement: workflows.map((w, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: names[w.slug].name,
      url: localizedUrl(locale, `/workflows/${w.slug}`),
    })),
  };

  return (
    <div className="mx-auto max-w-[1240px] px-4 pt-12 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structured)} />
      <header className="max-w-3xl">
        <h1 className="text-[2.6rem] leading-[1.02] font-bold tracking-[-0.045em] text-ink sm:text-[3.6rem]">{p.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-2">{p.lead}</p>
      </header>
      <ul className="mt-14 grid gap-10 sm:grid-cols-2">
        {workflows.map((w, i) => (
          <li key={w.slug}>
            <WorkflowCard workflow={w} name={names[w.slug].name} short={names[w.slug].short} locale={locale} dict={dict} index={i} />
          </li>
        ))}
      </ul>
    </div>
  );
}
