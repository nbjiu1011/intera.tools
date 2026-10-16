"use client";

import { Check, ChevronDown, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { localeLabels, locales, type Locale } from "@/i18n/config";

export function swapLocale(pathname: string, to: Locale): string {
  const parts = pathname.split("/");
  parts[1] = to;
  return parts.join("/") || `/${to}`;
}

function rememberLocale(locale: Locale) {
  document.cookie = `tn_locale=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LocaleSwitcher({ align = "right", up = false }: { align?: "left" | "right"; up?: boolean }) {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={dict.nav.language}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-ink-2 transition hover:bg-muted hover:text-ink"
      >
        <Globe className="size-[18px]" />
        {localeLabels[locale].short}
        <ChevronDown className={`size-3.5 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div
          role="menu"
          className={`card absolute z-50 w-44 animate-pop-in p-1.5 shadow-pop ${up ? "bottom-12" : "top-12"} ${align === "right" ? "right-0" : "left-0"}`}
        >
          {locales.map((l) => (
            <Link
              key={l}
              role="menuitem"
              href={swapLocale(pathname, l)}
              hrefLang={l}
              lang={l}
              onClick={() => {
                rememberLocale(l);
                setOpen(false);
              }}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-ink-2 hover:bg-muted hover:text-ink"
            >
              {localeLabels[l].native}
              {l === locale && <Check className="size-4 text-brand" />}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
