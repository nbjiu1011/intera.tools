"use client";

import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { Logo } from "@/components/ui/Logo";
import { ToolIcon } from "@/components/ui/ToolIcon";
import { guideCategories } from "@/lib/guides";
import { tools, toolSections } from "@/lib/tools";
import { workflows } from "@/lib/workflows";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

type MenuId = "tools" | "workflows" | "guides";

function ToolsMenu({ onNavigate }: { onNavigate: () => void }) {
  const { locale, dict, tools: names } = useI18n();
  return (
    <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
      {toolSections.map((section, i) => (
        <div key={section}>
          <p className="mb-2 flex items-baseline gap-2 border-b border-line pb-2 text-xs font-semibold tracking-[0.08em] text-ink-3 uppercase">
            <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            {dict.sections[section]}
          </p>
          <ul className="grid gap-0.5">
            {tools
              .filter((t) => t.section === section)
              .map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/${locale}/${t.slug}`}
                    onClick={onNavigate}
                    className="flex items-center gap-2.5 rounded-md px-1.5 py-1.5 text-sm text-ink-2 transition hover:bg-muted hover:text-ink"
                  >
                    <ToolIcon icon={t.icon} accent={t.accent} size="sm" className="!size-7 [&>svg]:!size-4" />
                    <span className="truncate font-medium">{names[t.slug].name}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
      <Link
        href={`/${locale}/tools`}
        onClick={onNavigate}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline sm:col-span-2 lg:col-span-4"
      >
        {dict.nav.viewAllTools} <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

function WorkflowsMenu({ onNavigate }: { onNavigate: () => void }) {
  const { locale, dict, workflows: names } = useI18n();
  return (
    <div className="grid gap-1">
      {workflows.map((w) => (
        <Link
          key={w.slug}
          href={`/${locale}/workflows/${w.slug}`}
          onClick={onNavigate}
          className="grid gap-0.5 rounded-md px-2 py-2 transition hover:bg-muted"
        >
          <span className="text-xs font-semibold tracking-[0.08em] text-ink-3 uppercase">{dict.workflowCategories[w.category]}</span>
          <span className="text-sm font-semibold text-ink">{names[w.slug].name}</span>
        </Link>
      ))}
      <Link href={`/${locale}/workflows`} onClick={onNavigate} className="mt-1 inline-flex items-center gap-1.5 px-2 text-sm font-semibold text-brand hover:underline">
        {dict.nav.viewAllWorkflows} <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

function GuidesMenu({ onNavigate }: { onNavigate: () => void }) {
  const { locale, dict } = useI18n();
  return (
    <div className="grid gap-0.5">
      {guideCategories.map((c) => (
        <Link
          key={c}
          href={`/${locale}/guides#${c}`}
          onClick={onNavigate}
          className="rounded-md px-2 py-2 text-sm font-medium text-ink-2 transition hover:bg-muted hover:text-ink"
        >
          {dict.guideCategories[c]}
        </Link>
      ))}
      <Link href={`/${locale}/guides`} onClick={onNavigate} className="mt-1 inline-flex items-center gap-1.5 px-2 text-sm font-semibold text-brand hover:underline">
        {dict.nav.viewAllGuides} <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

export function Header() {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close menus on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    if (mobileOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const section = pathname.split("/")[2] ?? "";
  const activeMenu: MenuId | null = section === "workflows" ? "workflows" : section === "guides" ? "guides" : section && section !== "about" && section !== "contact" && section !== "privacy" && section !== "terms" ? "tools" : null;

  const menus: { id: MenuId; label: string; panel: React.ReactNode; wide?: boolean }[] = [
    { id: "tools", label: dict.nav.tools, panel: <ToolsMenu onNavigate={() => setOpen(null)} />, wide: true },
    { id: "workflows", label: dict.nav.workflows, panel: <WorkflowsMenu onNavigate={() => setOpen(null)} /> },
    { id: "guides", label: dict.nav.guides, panel: <GuidesMenu onNavigate={() => setOpen(null)} /> },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur supports-[backdrop-filter]:bg-bg/85">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-2 px-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="mr-4 shrink-0 rounded-md" aria-label="Intera Tools home">
          <Logo />
        </Link>

        <nav ref={navRef} className="relative hidden items-center lg:flex" aria-label="Main">
          {menus.map((m) => (
            <div key={m.id} className={m.wide ? "" : "relative"}>
              <button
                type="button"
                aria-expanded={open === m.id}
                aria-controls={`menu-${m.id}`}
                onClick={() => setOpen((v) => (v === m.id ? null : m.id))}
                className={`flex h-16 items-center gap-1 border-b-2 px-3 text-[0.95rem] font-medium transition hover:text-ink ${
                  activeMenu === m.id || open === m.id ? "border-ink text-ink" : "border-transparent text-ink-2"
                }`}
              >
                {m.label}
                <ChevronDown className={`size-4 transition ${open === m.id ? "rotate-180" : ""}`} />
              </button>
              {open === m.id && (
                <div
                  id={`menu-${m.id}`}
                  className={`absolute top-[calc(100%+1px)] animate-pop-in rounded-b-xl border border-t-0 border-line bg-elevated p-5 shadow-pop ${
                    m.wide ? "left-0 w-[min(940px,calc(100vw-4rem))]" : "left-0 w-72"
                  }`}
                >
                  {m.panel}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Link href={`/${locale}/about`} className="hidden rounded-md px-3 py-2 text-sm font-medium text-ink-2 hover:text-ink xl:block">
            {dict.nav.about}
          </Link>
          <div className="hidden sm:block">
            <LocaleSwitcher />
          </div>
          <ThemeToggle />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-md text-ink hover:bg-muted lg:hidden"
            aria-label={dict.nav.menu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-[22px]" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" id="mobile-menu" role="dialog" aria-modal="true" aria-label={dict.nav.menu}>
          <button type="button" aria-label={dict.nav.close} className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[min(420px,100%)] animate-[fade-up_.2s_ease] flex-col bg-elevated shadow-pop">
            <div className="flex h-16 items-center justify-between border-b border-line px-4">
              <Logo />
              <button type="button" className="grid size-10 place-items-center rounded-md hover:bg-muted" aria-label={dict.nav.close} onClick={() => setMobileOpen(false)}>
                <X className="size-[22px]" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {menus.map((m) => (
                <details key={m.id} className="group border-b border-line" open={m.id === "tools"}>
                  <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {m.label}
                    <ChevronDown className="size-5 text-ink-3 transition group-open:rotate-180" />
                  </summary>
                  <div className="px-4 pb-5">
                    {m.id === "tools" ? <ToolsMenu onNavigate={() => setMobileOpen(false)} /> : m.panel}
                  </div>
                </details>
              ))}
              <div className="grid gap-1 px-4 py-4">
                <Link href={`/${locale}/about`} className="rounded-md py-2 font-medium text-ink-2">
                  {dict.nav.about}
                </Link>
                <Link href={`/${locale}/contact`} className="rounded-md py-2 font-medium text-ink-2">
                  {dict.nav.contact}
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-line px-4 py-3">
              <LocaleSwitcher align="left" up />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
