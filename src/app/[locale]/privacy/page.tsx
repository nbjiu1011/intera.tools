import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StaticPage } from "@/components/StaticPage";
import { getPageContent } from "@/content";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getPageContent(locale, "privacy");
  return buildMetadata({ locale, path: "/privacy", title: c.metaTitle, description: c.metaDescription });
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <StaticPage content={getPageContent(locale, "privacy")} dict={getDictionary(locale)} showUpdated showToc />;
}
