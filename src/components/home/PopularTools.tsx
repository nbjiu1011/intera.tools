import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ToolIcon } from "@/components/ui/ToolIcon";
import type { Locale } from "@/i18n/config";
import { toolMap, type ToolSlug } from "@/lib/tools";

// Large showcase cards with small illustrative mockups of each tool's result.

function Landscape({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 100" className={className} aria-hidden preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#9cc2ff" />
          <stop offset="1" stopColor="#e9e2ff" />
        </linearGradient>
      </defs>
      <rect width="160" height="100" fill="url(#sky)" />
      <circle cx="122" cy="26" r="11" fill="#fff6d8" />
      <path d="M0 78 38 40l22 22 18-16 34 32H0Z" fill="#6f86d9" />
      <path d="M48 100 96 52l64 48Z" fill="#4b62bf" />
      <path d="M0 100V82c30-8 70-6 160 4v14Z" fill="#3c8f7a" />
    </svg>
  );
}

function CompressMock() {
  return (
    <div className="relative h-full">
      <div className="absolute top-6 left-6 h-[130px] w-[62%] overflow-hidden rounded-xl shadow-[0_14px_30px_-12px_rgba(40,60,160,.45)]">
        <Landscape className="size-full" />
      </div>
      <div className="absolute top-12 right-5 grid w-[38%] gap-2 rounded-xl bg-white/90 p-3 shadow-[0_14px_30px_-14px_rgba(40,60,160,.45)] dark:bg-[#1a2245]/90">
        {[100, 34].map((w, i) => (
          <div key={w} className="grid gap-1">
            <span className="h-1.5 w-8 rounded-full bg-[#cfd8f6] dark:bg-[#33407a]" />
            <span
              className="h-2.5 rounded-full"
              style={{ width: `${w}%`, background: i ? "linear-gradient(90deg,#4f7bff,#8b5cf6)" : "#dfe5f8" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function MergeMock() {
  const page = (cls: string, accent: string) => (
    <div className={`absolute h-[118px] w-[88px] rounded-lg bg-white p-2.5 shadow-[0_12px_26px_-12px_rgba(160,40,60,.45)] dark:bg-[#1f2747] ${cls}`}>
      <span className="block h-2 w-10 rounded-full" style={{ background: accent }} />
      {[80, 92, 70, 86, 60].map((w, i) => (
        <span key={i} className="mt-1.5 block h-1.5 rounded-full bg-[#eceff7] dark:bg-[#2c3560]" style={{ width: `${w}%` }} />
      ))}
    </div>
  );
  return (
    <div className="relative h-full">
      {page("top-9 left-[6%] -rotate-[12deg]", "#ff8a8a")}
      {page("top-6 left-[20%] rotate-[3deg]", "#ffb26b")}
      <div className="absolute top-[72px] left-[54%] z-10 grid size-10 -translate-x-1/2 place-items-center rounded-full bg-white text-[#ec4b4b] shadow-lg dark:bg-[#1f2747]">
        <ArrowRight className="size-5" />
      </div>
      {page("top-5 right-[7%] w-[96px] h-[130px] ring-2 ring-[#ff8a8a]/40", "linear-gradient(90deg,#ff8a8a,#ffb26b)")}
    </div>
  );
}

function ImageToPdfMock() {
  return (
    <div className="relative h-full">
      <div className="absolute top-8 left-[10%] h-[96px] w-[120px] -rotate-6 overflow-hidden rounded-lg border-4 border-white shadow-[0_12px_26px_-12px_rgba(60,40,160,.45)] dark:border-[#1f2747]">
        <Landscape className="size-full" />
      </div>
      <div className="absolute top-5 right-[12%] h-[140px] w-[108px] rounded-lg bg-white p-3 shadow-[0_16px_30px_-14px_rgba(60,40,160,.5)] dark:bg-[#1f2747]">
        <div className="h-[58px] overflow-hidden rounded-md">
          <Landscape className="size-full" />
        </div>
        {[90, 70, 80].map((w, i) => (
          <span key={i} className="mt-2 block h-1.5 rounded-full bg-[#eceff7] dark:bg-[#2c3560]" style={{ width: `${w}%` }} />
        ))}
        <span className="absolute -right-2 -bottom-2 rounded-md bg-[#f08a0c] px-1.5 py-0.5 text-[10px] font-bold text-white shadow">PDF</span>
      </div>
    </div>
  );
}

function QrMock() {
  // Decorative pattern only — not a scannable code.
  const cells = Array.from({ length: 121 }, (_, i) => {
    const x = i % 11;
    const y = Math.floor(i / 11);
    const finder = (x < 3 && y < 3) || (x > 7 && y < 3) || (x < 3 && y > 7);
    return finder || (x * 7 + y * 13 + x * y) % 5 < 2;
  });
  return (
    <div className="relative grid h-full place-items-center">
      <div className="rounded-2xl bg-white p-3 shadow-[0_16px_30px_-14px_rgba(20,120,80,.5)]">
        <div className="grid grid-cols-11 gap-[2px]">
          {cells.map((on, i) => (
            <span key={i} className={`size-[9px] rounded-[2px] ${on ? "bg-[#14213d]" : "bg-transparent"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

const showcase: { slug: ToolSlug; tint: string; Mock: () => React.ReactElement }[] = [
  { slug: "compress-image", tint: "from-[#e4ecff] to-[#d9e3ff] dark:from-[#1a2756] dark:to-[#16204a]", Mock: CompressMock },
  { slug: "merge-pdf", tint: "from-[#ffe9e9] to-[#ffdede] dark:from-[#3a1d2a] dark:to-[#2d1724]", Mock: MergeMock },
  { slug: "jpg-to-pdf", tint: "from-[#eeeaff] to-[#e3ddff] dark:from-[#251f55] dark:to-[#1d1946]", Mock: ImageToPdfMock },
  { slug: "qr-code-generator", tint: "from-[#e2f8ec] to-[#d4f3e3] dark:from-[#123629] dark:to-[#0f2c22]", Mock: QrMock },
];

export function PopularTools({
  locale,
  names,
}: {
  locale: Locale;
  names: Record<ToolSlug, { name: string; short: string }>;
}) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {showcase.map(({ slug, tint, Mock }) => {
        const tool = toolMap[slug];
        return (
          <li key={slug}>
            <Link
              href={`/${locale}/${slug}`}
              className="group card flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className={`relative h-[190px] bg-gradient-to-br ${tint}`}>
                <Mock />
                <span className="absolute top-3.5 right-3.5 rounded-xl bg-white shadow-md dark:bg-[#10162d]">
                  <ToolIcon icon={tool.icon} accent={tool.accent} size="sm" />
                </span>
              </div>
              <div className="flex flex-1 items-start justify-between gap-3 p-5">
                <div>
                  <h3 className="font-bold tracking-[-0.015em] text-ink">{names[slug].name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{names[slug].short}</p>
                </div>
                <ArrowUpRight className="mt-0.5 size-5 shrink-0 text-ink-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
