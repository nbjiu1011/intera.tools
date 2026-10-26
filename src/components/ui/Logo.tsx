/** Intera Tools mark: a faceted hexagon in the brand gradient. Original artwork. */
export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <defs>
        <linearGradient id="tn-a" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#56a0ff" />
          <stop offset=".55" stopColor="#5b6dff" />
          <stop offset="1" stopColor="#9b5cf6" />
        </linearGradient>
        <linearGradient id="tn-b" x1="20" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff9ad5" />
          <stop offset="1" stopColor="#b26cff" />
        </linearGradient>
      </defs>
      <path d="M20 2.5 35.2 11.25v17.5L20 37.5 4.8 28.75v-17.5Z" fill="url(#tn-a)" />
      <path d="M20 2.5 35.2 11.25 20 20 4.8 11.25Z" fill="url(#tn-b)" opacity=".9" />
      <path d="M20 20v17.5L4.8 28.75v-17.5Z" fill="#000" opacity=".1" />
      <path d="M20 13.2 26 16.6v6.8L20 26.8l-6-3.4v-6.8Z" fill="#fff" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark />
      <span className="text-[1.35rem] font-extrabold tracking-[-0.03em] whitespace-nowrap text-ink">
        Intera <span className="text-gradient font-bold">Tools</span>
      </span>
    </span>
  );
}
