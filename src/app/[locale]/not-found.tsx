"use client";

import { ArrowRight, Compass } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";

export default function NotFound() {
  const { locale, dict } = useI18n();
  return (
    <div className="mx-auto grid max-w-xl place-items-center px-4 py-24 text-center">
      <span className="bg-brand-gradient grid size-20 place-items-center rounded-2xl">
        <Compass className="size-10" />
      </span>
      <p className="text-gradient mt-6 text-6xl font-black tracking-tight">404</p>
      <h1 className="mt-3 text-2xl font-extrabold tracking-[-0.02em] text-ink">{dict.notFound.title}</h1>
      <p className="mt-2 text-ink-2">{dict.notFound.lead}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href={`/${locale}`} className="inline-flex h-12 items-center rounded-full border border-line px-6 font-semibold text-ink hover:bg-muted">
          {dict.notFound.back}
        </Link>
        <Link href={`/${locale}/tools`} className="bg-brand-gradient inline-flex h-12 items-center gap-2 rounded-lg px-6 font-semibold">
          {dict.notFound.browse} <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
