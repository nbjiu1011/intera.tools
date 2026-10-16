import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { StaticPage } from "@/components/StaticPage";
import { siteConfig } from "@/config/site";
import { getPageContent } from "@/content";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getPageContent(locale, "contact");
  return buildMetadata({ locale, path: "/contact", title: c.metaTitle, description: c.metaDescription });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <StaticPage content={getPageContent(locale, "contact")} dict={getDictionary(locale)}>
      <div className="mx-auto mt-10 max-w-3xl">
        <ContactForm email={siteConfig.contactEmail} />
      </div>
    </StaticPage>
  );
}
