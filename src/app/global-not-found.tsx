import { ArrowRight, Compass } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import { InlineScript, themeScript } from "@/components/ui/InlineScript";
import { Logo } from "@/components/ui/Logo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "404 — Page not found | Intera Tools",
  description: "The page you are looking for doesn’t exist.",
};

// Rendered for URLs that match no route. There is no locale here, so the page is bilingual.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.variable} data-theme="light" suppressHydrationWarning>
      <head>
        <InlineScript html={themeScript} />
      </head>
      <body>
        <div className="relative isolate min-h-dvh">
          <div className="page-backdrop" aria-hidden />
          <header className="mx-auto flex h-[76px] max-w-[1240px] items-center px-4 sm:px-6 lg:px-8">
            <Link href="/en" aria-label="Intera Tools home">
              <Logo />
            </Link>
          </header>
          <main className="relative mx-auto grid max-w-xl place-items-center px-4 py-20 text-center">
            <span className="bg-brand-gradient grid size-20 place-items-center rounded-[1.6rem] text-white shadow-button">
              <Compass className="size-10" />
            </span>
            <p className="text-gradient mt-6 text-6xl font-black tracking-tight">404</p>
            <h1 className="mt-3 text-2xl font-extrabold tracking-[-0.02em] text-ink">This page wandered off</h1>
            <p className="mt-2 text-ink-2">The page you’re looking for doesn’t exist or has moved.</p>
            <p className="mt-1 text-ink-3" lang="ko">
              찾으시는 페이지가 없거나 다른 곳으로 옮겨졌습니다.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/en/tools" className="bg-brand-gradient inline-flex h-12 items-center gap-2 rounded-full px-6 font-semibold text-white shadow-button">
                Browse all tools <ArrowRight className="size-4" />
              </Link>
              <Link href="/ko/tools" lang="ko" className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-surface px-6 font-semibold text-ink">
                전체 도구 보기
              </Link>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
