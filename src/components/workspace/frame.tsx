"use client";

import { Check, LoaderCircle, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "@/components/I18nProvider";
import { format, formatBytes } from "@/i18n/format";
import { AddMoreButton, RejectionNotice, useDropTarget, type IntakeConfig } from "./intake";
import type { Rejection } from "@/lib/files";

export function Stepper({ step }: { step: 1 | 2 | 3 }) {
  const { dict } = useI18n();
  const labels = [dict.workspace.stepUpload, dict.workspace.stepOptions, dict.workspace.stepDone];
  return (
    <ol className="mx-auto mb-5 flex max-w-md items-center justify-center gap-2 text-xs font-semibold sm:text-sm" aria-label="Progress">
      {labels.map((label, i) => {
        const n = (i + 1) as 1 | 2 | 3;
        const done = n < step;
        const active = n === step;
        return (
          <li key={label} className="flex items-center gap-2" aria-current={active ? "step" : undefined}>
            <span
              className={`grid size-6 place-items-center rounded-full text-[11px] transition ${
                done ? "bg-success" : active ? "bg-brand-gradient" : "bg-sunken text-ink-3"
              }`}
            >
              {done ? <Check className="size-3.5" strokeWidth={3} /> : n}
            </span>
            <span className={active ? "text-ink" : "text-ink-3"}>{label}</span>
            {i < 2 && <span className="mx-1 h-px w-5 bg-line-strong sm:w-8" aria-hidden />}
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Two-pane workspace: files on the left, options on the right (stacked on mobile,
 * with the primary action pinned to the bottom of the screen).
 */
export function WorkspaceFrame({
  config,
  count,
  totalBytes,
  onAdd,
  onClear,
  rejections,
  onDismissRejections,
  files,
  options,
  action,
  overlay,
  hideToolbar = false,
}: {
  config: IntakeConfig;
  count: number;
  totalBytes: number;
  onAdd: (files: File[]) => void;
  onClear: () => void;
  rejections: Rejection[];
  onDismissRejections: () => void;
  files: React.ReactNode;
  options: React.ReactNode;
  action: React.ReactNode;
  overlay?: React.ReactNode;
  hideToolbar?: boolean;
}) {
  const { locale, dict } = useI18n();
  const drop = useDropTarget(onAdd);
  const cardRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const [floatAction, setFloatAction] = useState(false);

  // On small screens the options sit below the files; keep the main action reachable
  // with a floating bar while the workspace is on screen but its own button isn't.
  useEffect(() => {
    const card = cardRef.current;
    const inline = actionRef.current;
    if (!card || !inline || typeof IntersectionObserver === "undefined") return;
    let cardVisible = false;
    let inlineVisible = false;
    const update = () => setFloatAction(window.innerWidth < 1024 && cardVisible && !inlineVisible);
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === card) cardVisible = e.isIntersecting;
        else inlineVisible = e.isIntersecting;
      }
      update();
    });
    observer.observe(card);
    observer.observe(inline);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={cardRef} className="card relative overflow-hidden rounded-2xl animate-pop-in">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_360px]">
        <section
          {...drop.handlers}
          className={`relative min-h-[320px] bg-sunken/50 p-4 transition sm:p-6 lg:min-h-[480px] ${drop.over ? "bg-brand/[.06]" : ""}`}
        >
          {!hideToolbar && (
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-ink-2">
                <span className="font-semibold text-ink">
                  {count === 1 ? dict.workspace.fileCountOne : format(dict.workspace.fileCount, { count })}
                </span>
                <span className="mx-2 text-ink-3">·</span>
                {format(dict.workspace.totalSize, { size: formatBytes(totalBytes, locale) })}
              </p>
              <div className="flex items-center gap-2">
                {config.multiple && <AddMoreButton config={config} onFiles={onAdd} />}
                <button
                  type="button"
                  onClick={onClear}
                  className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-ink-3 transition hover:bg-danger-soft hover:text-danger"
                >
                  <Trash2 className="size-4" />
                  <span className="hidden sm:inline">{dict.workspace.removeAll}</span>
                </button>
              </div>
            </div>
          )}
          {rejections.length > 0 && (
            <div className="mb-4">
              <RejectionNotice rejections={rejections} onDismiss={onDismissRejections} />
            </div>
          )}
          {files}
          {drop.over && (
            <div className="pointer-events-none absolute inset-3 grid place-items-center rounded-2xl border-2 border-dashed border-brand bg-brand/[.05] text-lg font-semibold text-brand">
              {dict.dropzone.dropToAdd}
            </div>
          )}
        </section>
        <aside className="flex flex-col border-t border-line lg:border-t-0 lg:border-l">
          <div className="flex items-center justify-between px-5 pt-5 sm:px-6 sm:pt-6">
            <h2 className="text-lg font-bold tracking-[-0.01em] text-ink">{dict.workspace.options}</h2>
          </div>
          <div className="grid flex-1 content-start gap-6 px-5 py-5 sm:px-6">{options}</div>
          <div ref={actionRef} className="border-t border-line px-5 py-4 sm:px-6">
            {action}
          </div>
        </aside>
      </div>
      {overlay}
      {/* Portaled: the card's entrance animation would otherwise trap position:fixed. */}
      {floatAction &&
        !overlay &&
        createPortal(
          <div className="glass fixed inset-x-0 bottom-0 z-30 border-x-0 border-b-0 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_-18px_rgba(30,40,100,.45)] animate-fade-up lg:hidden">
            {action}
          </div>,
          document.body,
        )}
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  icon,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`bg-brand-gradient inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl px-6 text-[1.02rem] font-semibold transition hover:brightness-110 active:scale-[.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100 ${className}`}
    >
      {children}
      {icon}
    </button>
  );
}

export function ProcessingOverlay({
  done,
  total,
  label,
  onCancel,
}: {
  done: number;
  total: number;
  label?: string;
  onCancel: () => void;
}) {
  const { dict } = useI18n();
  const pct = total ? Math.min(100, Math.round((done / total) * 100)) : 0;
  return (
    <div className="absolute inset-0 z-20 grid place-items-center bg-surface/80 p-6 backdrop-blur-md" role="status" aria-live="polite">
      <div className="w-full max-w-sm text-center animate-pop-in">
        <div className="bg-brand-gradient mx-auto grid size-16 place-items-center rounded-2xl">
          <LoaderCircle className="size-8 animate-spin" />
        </div>
        <p className="mt-5 text-lg font-bold text-ink">{dict.workspace.processing}</p>
        <p className="mt-1 truncate text-sm text-ink-3">{label ?? dict.workspace.preparing}</p>
        <div
          className="mt-5 h-3 overflow-hidden rounded-full bg-sunken"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
        >
          <div className="bg-brand-gradient progress-stripes h-full rounded-full transition-[width] duration-300" style={{ width: `${Math.max(pct, 4)}%` }} />
        </div>
        <p className="mt-2 text-sm font-medium text-ink-2 tabular-nums">
          {total > 1 ? format(dict.workspace.progress, { done, total }) : `${pct}%`}
        </p>
        <button type="button" onClick={onCancel} className="mt-5 rounded-full px-4 py-2 text-sm font-semibold text-ink-2 hover:bg-muted hover:text-ink">
          {dict.workspace.cancel}
        </button>
      </div>
    </div>
  );
}
