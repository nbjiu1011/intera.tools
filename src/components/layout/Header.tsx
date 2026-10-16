"use client";

import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { Logo } from "@/components/ui/Logo";
import { ToolIcon } from "@/components/ui/ToolIcon";
import { tools, type ToolCategory } from "@/lib/tools";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const categoryOrder: ToolCategory[] = ["image", "pdf", "everyday"];

function useToolGroups() {
  const { dict, tools: names } = useI18n();
  const titles: Record<ToolCategory, string> = {
    image: dict.categories.imageTools,
    pdf: dict.categories.pdfTools,
    everyday: dict.categories.everydayTools,
  };
  return categoryOrder.map((category) => ({
    category,
    title: titles[category],
    items: tools.filter((t) => t.category === category).map((t) => ({ ...t, name: names[t.slug].name })),
  }));
}

function ToolsMenu({ onNavigate }: { onNavigate: () => void }) {
  const { locale, dict } = useI18n();
  const groups = useToolGroups();
  return (
    <div className="grid gap-6 md:grid-cols-[1.4fr_1.4fr_1fr]">
      {groups.map((group) => (
        <div key={group.category}>
          <p className="mb-2 px-2 text-xs font-semibold tracking-[0.08em] text-ink-3 uppercase">{group.title}</p>
          <ul className={group.items.length > 6 ? "grid grid-cols-1 gap-0.5 lg:grid-cols-2" : "grid gap-0.5"}>
            {group.items.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/${locale}/${t.slug}`}
                  onClick={onNavigate}
                  className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-sm text-ink-2 transition hover:bg-muted hover:text-ink"
                >
                  <ToolIcon icon={t.icon} accent={t.accent} size="sm" />
                  <span className="truncate font-medium">{t.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          {group.category === "everyday" && (
            <Link
              href={`/${locale}/tools`}
              onClick={onNavigate}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-sm font-semibold text-brand hover:underline"
            >
              {dict.nav.viewAllTools} <ArrowRight className="size-4" />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

export function Header() {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    if (mobileOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const navLink = (href: string, label: string) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={`rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition hover:text-ink ${active ? "text-ink" : "text-ink-2"}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-[background,box-shadow,border-color] duration-300 ${
        scrolled || menuOpen ? "glass border-x-0 border-t-0 shadow-[0_8px_30px_-20px_rgba(30,40,100,.35)]" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1240px] items-center gap-2 px-4 sm:px-6 lg:h-[76px] lg:px-8">
        <Link href={`/${locale}`} className="mr-2 shrink-0 rounded-lg" aria-label="Intera Tools home">
          <Logo />
        </Link>

        <nav className="hidden items-center lg:ml-6 lg:flex" aria-label="Main">
          <div ref={menuRef} className="relative">
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="tools-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition hover:text-ink ${menuOpen ? "text-ink" : "text-ink-2"}`}
            >
              {dict.nav.tools}
              <ChevronDown className={`size-4 transition ${menuOpen ? "rotate-180" : ""}`} />
            </button>
            {menuOpen && (
              <div
                id="tools-menu"
                className="card absolute top-14 left-0 w-[min(860px,calc(100vw-4rem))] animate-pop-in p-5 shadow-pop"
              >
                <ToolsMenu onNavigate={() => setMenuOpen(false)} />
              </div>
            )}
          </div>
          {navLink(`/${locale}/about`, dict.nav.about)}
          {navLink(`/${locale}/contact`, dict.nav.contact)}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
          <div className="hidden sm:block">
            <LocaleSwitcher />
          </div>
          <ThemeToggle />
          <Link
            href={`/${locale}/tools`}
            className="bg-brand-gradient ml-2 hidden h-11 items-center gap-2 rounded-full px-5 text-[0.95rem] font-semibold text-white shadow-button transition hover:brightness-110 active:scale-[.98] md:inline-flex"
          >
            {dict.nav.allTools}
            <ArrowRight className="size-4" />
          </Link>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-ink hover:bg-muted lg:hidden"
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
          <button
            type="button"
            aria-label={dict.nav.close}
            className="absolute inset-0 bg-[#0a0e1f]/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-[min(400px,100%)] animate-[fade-up_.25s_ease] flex-col bg-elevated shadow-pop">
            <div className="flex h-[68px] items-center justify-between border-b border-line px-4">
              <Logo />
              <button
                type="button"
                className="grid size-10 place-items-center rounded-full hover:bg-muted"
                aria-label={dict.nav.close}
                onClick={() => setMobileOpen(false)}
              >
                <X className="size-[22px]" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-5">
              <ToolsMenu onNavigate={() => setMobileOpen(false)} />
              <div className="mt-6 grid gap-1 border-t border-line pt-4">
                <Link href={`/${locale}/about`} className="rounded-xl px-2 py-2.5 font-medium text-ink-2 hover:bg-muted">
                  {dict.nav.about}
                </Link>
                <Link href={`/${locale}/contact`} className="rounded-xl px-2 py-2.5 font-medium text-ink-2 hover:bg-muted">
                  {dict.nav.contact}
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-line px-4 py-3">
              <LocaleSwitcher align="left" up />
              <Link
                href={`/${locale}/tools`}
                className="bg-brand-gradient inline-flex h-11 items-center gap-2 rounded-full px-5 font-semibold text-white shadow-button"
              >
                {dict.nav.allTools}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
