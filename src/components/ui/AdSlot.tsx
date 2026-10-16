"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/components/I18nProvider";
import { adsenseConfig } from "@/config/site";
import { format } from "@/i18n/format";

type Placement = keyof typeof adsenseConfig.slots;

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Reserved ad area. Ads only ever appear between content sections — never inside
 * the upload/options/download controls of a tool. Height is reserved up front so
 * the page doesn't jump when an ad loads (CLS).
 */
export function AdSlot({ placement, className = "" }: { placement: Placement; className?: string }) {
  const { dict } = useI18n();
  const insRef = useRef<HTMLModElement>(null);
  const slot = adsenseConfig.slots[placement];
  const enabled = Boolean(adsenseConfig.client && slot);

  useEffect(() => {
    if (!enabled || !insRef.current || insRef.current.dataset.adsbygoogleStatus) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blockers or consent refusal: leave the space empty.
    }
  }, [enabled]);

  if (!enabled && process.env.NODE_ENV === "production") return null;

  return (
    <aside aria-label={dict.ads.label} className={`mx-auto w-full max-w-[970px] ${className}`}>
      <p className="mb-1.5 text-center text-[11px] font-medium tracking-[0.12em] text-ink-3 uppercase">{dict.ads.label}</p>
      {enabled ? (
        <ins
          ref={insRef}
          className="adsbygoogle block min-h-[100px] w-full sm:min-h-[120px]"
          data-ad-client={adsenseConfig.client}
          data-ad-slot={slot}
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="grid min-h-[100px] place-items-center rounded-2xl border border-dashed border-line-strong text-xs text-ink-3 sm:min-h-[120px]">
          {format(dict.ads.placeholder, { slot: placement })}
        </div>
      )}
    </aside>
  );
}
