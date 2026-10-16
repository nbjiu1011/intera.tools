import { Crop, FileText, Image as ImageIcon, RefreshCw, Type, type LucideIcon } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";

// Original layered illustration: a tilted glass app window with glossy tool
// tiles floating around it, a gradient ribbon and soft clouds. Everything is
// sized in container units so it scales cleanly from phone to desktop.

function Tile({
  Icon,
  gradient,
  className,
  rotate,
  delay,
  label,
}: {
  Icon: LucideIcon;
  gradient: string;
  className: string;
  rotate: number;
  delay: string;
  label?: string;
}) {
  return (
    <div
      className={`absolute animate-float ${className}`}
      style={{ ["--r" as string]: `${rotate}deg`, animationDelay: delay }}
    >
      <div
        className="relative grid aspect-square w-full place-items-center rounded-[26%]"
        style={{
          background: gradient,
          boxShadow:
            "inset 0 0.35cqw 0.2cqw rgba(255,255,255,.6), inset 0 -1.2cqw 2.2cqw rgba(0,0,0,.18), 0 3cqw 5cqw -1.6cqw rgba(45,55,140,.5)",
        }}
      >
        {/* side thickness */}
        <div
          className="absolute inset-0 -z-10 translate-x-[0.9cqw] translate-y-[1.2cqw] rounded-[26%] opacity-70 blur-[0.2cqw]"
          style={{ background: gradient, filter: "brightness(.72)" }}
        />
        <div className="pointer-events-none absolute inset-x-[12%] top-[7%] h-[36%] rounded-[45%] bg-gradient-to-b from-white/50 to-white/0" />
        {label ? (
          <span className="relative font-black text-white drop-shadow-[0_0.4cqw_0.5cqw_rgba(0,0,0,.2)]" style={{ fontSize: "7cqw" }}>
            {label}
          </span>
        ) : (
          <Icon className="relative size-[48%] text-white drop-shadow-[0_0.4cqw_0.5cqw_rgba(0,0,0,.2)]" strokeWidth={2.3} />
        )}
      </div>
    </div>
  );
}

function Cloud({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 120 70" className={`absolute ${className}`} aria-hidden>
      <defs>
        <radialGradient id="cl" cx="40%" cy="30%" r="80%">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".7" stopColor="#eef2ff" />
          <stop offset="1" stopColor="#d9e1ff" />
        </radialGradient>
      </defs>
      <path
        d="M24 64c-12 0-20-8-20-18 0-9 7-16 16-17 2-13 13-23 27-23 11 0 20 6 25 15 3-1 6-2 9-2 13 0 23 10 23 22v1c7 2 12 8 12 15 0 4-3 7-7 7Z"
        fill="url(#cl)"
      />
    </svg>
  );
}

export function HeroIllustration({ noteTools, noteValues, alt }: { noteTools: string; noteValues: string; alt: string }) {
  return (
    <div role="img" aria-label={alt} className="relative aspect-[1.18] w-full select-none [container-type:inline-size]">
      {/* glow */}
      <div className="absolute top-[8%] left-[18%] size-[70%] rounded-full bg-[radial-gradient(circle,rgba(120,150,255,.35),transparent_65%)] blur-2xl dark:bg-[radial-gradient(circle,rgba(90,110,255,.35),transparent_65%)]" />
      <div className="absolute right-[2%] bottom-[10%] size-[34%] rounded-full bg-[radial-gradient(circle,rgba(255,170,230,.45),transparent_70%)] blur-2xl dark:opacity-50" />

      {/* ribbon behind the window */}
      <svg viewBox="0 0 600 510" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <linearGradient id="rb" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#7aa2ff" stopOpacity=".9" />
            <stop offset=".45" stopColor="#a78bfa" stopOpacity=".8" />
            <stop offset="1" stopColor="#f0abfc" stopOpacity=".6" />
          </linearGradient>
          <linearGradient id="rb2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity=".9" />
            <stop offset="1" stopColor="#c7d2fe" stopOpacity=".2" />
          </linearGradient>
        </defs>
        <path
          d="M30 360C40 250 150 200 260 250s210 90 310 0"
          fill="none"
          stroke="url(#rb)"
          strokeWidth="56"
          strokeLinecap="round"
          opacity=".8"
        />
        <path d="M34 344C50 245 155 196 262 240s206 88 304 2" fill="none" stroke="url(#rb2)" strokeWidth="7" strokeLinecap="round" />
      </svg>

      {/* app window */}
      <div
        className="absolute top-[13%] left-[20%] h-[62%] w-[66%]"
        style={{ transform: "perspective(1400px) rotateX(10deg) rotateY(-22deg) rotateZ(7deg)" }}
      >
        <div className="glass relative size-full overflow-hidden rounded-[4cqw] shadow-[0_4cqw_8cqw_-3cqw_rgba(50,60,150,.35)]">
          <div className="flex items-center gap-[1cqw] border-b border-line px-[3cqw] py-[2cqw]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-[1.6cqw] rounded-full bg-[#c9d3f5] dark:bg-[#3a4577]" />
            ))}
            <span className="ml-[2cqw] h-[2cqw] w-[30%] rounded-full bg-[#e3e9fb] dark:bg-[#26305a]" />
          </div>
          <div className="flex items-center gap-[2cqw] px-[6cqw] pt-[9cqw]">
            <LogoMark className="size-[8cqw]" />
            <span className="font-extrabold tracking-[-0.03em] whitespace-nowrap text-ink" style={{ fontSize: "5.4cqw" }}>
              Intera<span className="text-gradient ml-[0.25em] font-bold">Tools</span>
            </span>
          </div>
          <div className="mt-[4cqw] grid gap-[2cqw] px-[6cqw]">
            <span className="h-[1.8cqw] w-[70%] rounded-full bg-[#e3e9fb] dark:bg-[#26305a]" />
            <span className="h-[1.8cqw] w-[50%] rounded-full bg-[#e3e9fb] dark:bg-[#26305a]" />
          </div>
          <div className="absolute right-[5cqw] bottom-[5cqw] left-[6cqw] grid grid-cols-3 gap-[2cqw]">
            {["#dfe8ff", "#ffe3e3", "#e5f7ec"].map((c) => (
              <span key={c} className="h-[7cqw] rounded-[1.6cqw] dark:opacity-30" style={{ background: c }} />
            ))}
          </div>
        </div>
      </div>

      {/* front ribbon tail */}
      <svg viewBox="0 0 600 510" className="pointer-events-none absolute inset-0 size-full" aria-hidden>
        <defs>
          <linearGradient id="rf" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#93b4ff" stopOpacity=".0" />
            <stop offset=".3" stopColor="#93b4ff" stopOpacity=".85" />
            <stop offset="1" stopColor="#c4b5fd" stopOpacity=".9" />
          </linearGradient>
        </defs>
        <path d="M60 455C140 400 230 385 330 420s170 30 230-20" fill="none" stroke="url(#rf)" strokeWidth="34" strokeLinecap="round" opacity=".75" />
      </svg>

      <Cloud className="top-[22%] left-[1%] w-[17%] opacity-90 dark:opacity-40" />
      <Cloud className="right-[6%] bottom-[22%] w-[22%] dark:opacity-40" />

      <span className="absolute top-[3%] left-[57%] size-[5%] rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff,#b8c8ff_60%,#8aa0ff)] shadow-lg" />
      <span className="absolute top-[40%] right-[0%] size-[3%] rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff,#b8c8ff_60%,#8aa0ff)]" />
      <span className="absolute bottom-[8%] left-[38%] size-[2.4%] rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff,#f5c2ff)]" />

      <Tile
        Icon={ImageIcon}
        gradient="linear-gradient(150deg,#9cc0ff 0%,#5a86ff 55%,#3d5ff0 100%)"
        className="top-[3%] left-[11%] w-[21%]"
        rotate={-9}
        delay="0s"
      />
      <Tile
        Icon={FileText}
        gradient="linear-gradient(150deg,#ffb0a8 0%,#fb6464 55%,#e2404f 100%)"
        className="top-[10%] right-[18%] w-[19%]"
        rotate={10}
        delay="-2s"
      />
      <Tile
        Icon={Crop}
        gradient="linear-gradient(150deg,#d2b8ff 0%,#9c6cfa 55%,#7443e6 100%)"
        className="top-[45%] left-[5%] w-[17%]"
        rotate={-6}
        delay="-4s"
      />
      <Tile
        Icon={RefreshCw}
        gradient="linear-gradient(150deg,#9ff3c8 0%,#3fd68f 55%,#18ae6b 100%)"
        className="top-[42%] right-[3%] w-[17%]"
        rotate={9}
        delay="-1s"
      />
      <Tile
        Icon={Type}
        label="T"
        gradient="linear-gradient(150deg,#ffe29a 0%,#ffb340 55%,#f38c12 100%)"
        className="bottom-[9%] left-[42%] w-[16%]"
        rotate={-4}
        delay="-3s"
      />

      {/* handwritten notes */}
      <p
        className="absolute -top-[2%] -right-[4%] hidden rotate-[-6deg] font-hand leading-[1.05] whitespace-pre-line text-ink-3 sm:block"
        style={{ fontSize: "4.4cqw" }}
        aria-hidden
      >
        {noteTools}
      </p>
      <svg viewBox="0 0 80 50" className="absolute top-[11%] -right-[1%] hidden w-[9%] rotate-[50deg] text-ink-3 sm:block" aria-hidden>
        <path d="M76 6C60 30 35 40 8 36" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M16 28 7 36l11 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p
        className="absolute -right-[3%] bottom-[0%] hidden rotate-[-8deg] font-hand leading-[1.05] whitespace-pre-line text-ink-3 sm:block"
        style={{ fontSize: "4.2cqw" }}
        aria-hidden
      >
        {noteValues}
      </p>
    </div>
  );
}
