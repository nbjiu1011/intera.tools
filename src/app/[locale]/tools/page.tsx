import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ToolsExplorer } from "@/components/home/ToolsExplorer";
import { AdSlot } from "@/components/ui/AdSlot";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/tools">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/tools", title: dict.toolsPage.metaTitle, description: dict.toolsPage.metaDescription });
}

export default async function ToolsPage({ params }: PageProps<"/[locale]/tools">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return (
    <div className="mx-auto max-w-[1240px] px-4 pt-12 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <h1 className="text-[2.6rem] leading-[1.02] font-bold tracking-[-0.045em] text-ink sm:text-[3.6rem]">{dict.toolsPage.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-2">{dict.toolsPage.lead}</p>
      </header>
      <div className="mt-10">
        <Suspense>
          <ToolsExplorer />
        </Suspense>
      </div>
      <AdSlot placement="home" className="mt-16" />
    </div>
  );
}
