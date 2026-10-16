"use client";

import { Moon, Sun } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { dict } = useI18n();

  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("tn_theme", next);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this page.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dict.nav.themeToggle}
      title={dict.nav.themeToggle}
      className={`grid size-10 place-items-center rounded-full text-ink-2 transition hover:bg-muted hover:text-ink ${className}`}
    >
      <Moon className="size-[19px] dark:hidden" />
      <Sun className="hidden size-[19px] dark:block" />
    </button>
  );
}
