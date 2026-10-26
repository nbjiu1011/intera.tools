"use client";

import { Check } from "lucide-react";
import { useId } from "react";

export function Field({
  label,
  hint,
  children,
  htmlFor,
  aside,
}: {
  label: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
  htmlFor?: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
          {label}
        </label>
        {aside}
      </div>
      {children}
      {hint && <p className="text-xs leading-relaxed text-ink-3">{hint}</p>}
    </div>
  );
}

/** Group heading for fields that use <Segmented> etc. (labels a radiogroup, not an input). */
export function FieldGroup({ label, hint, children, aside }: { label: string; hint?: React.ReactNode; children: React.ReactNode; aside?: React.ReactNode }) {
  const id = useId();
  return (
    <div className="grid gap-2" role="group" aria-labelledby={id}>
      <div className="flex items-center justify-between gap-3">
        <span id={id} className="text-sm font-semibold text-ink">
          {label}
        </span>
        {aside}
      </div>
      {children}
      {hint && <p className="text-xs leading-relaxed text-ink-3">{hint}</p>}
    </div>
  );
}

export function Segmented<T extends string | number>({
  value,
  onChange,
  options,
  label,
  columns,
  size = "md",
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: React.ReactNode; disabled?: boolean; title?: string }[];
  label: string;
  columns?: number;
  size?: "sm" | "md";
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="grid gap-1 rounded-2xl bg-sunken p-1"
      style={{ gridTemplateColumns: `repeat(${columns ?? options.length}, minmax(0, 1fr))` }}
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={String(o.value)}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={o.disabled}
            title={o.title}
            onClick={() => onChange(o.value)}
            className={`rounded-xl px-2 font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
              size === "sm" ? "h-9 text-[0.82rem]" : "h-10 text-sm"
            } ${active ? "bg-surface text-ink shadow-[0_2px_8px_-2px_rgba(30,40,100,.25)]" : "text-ink-2 hover:text-ink"}`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** Large selectable cards (e.g. compression levels). */
export function ChoiceCards<T extends string>({
  value,
  onChange,
  options,
  label,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; hint?: string; badge?: string }[];
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="grid gap-2">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
              active ? "border-brand bg-brand/[.06] shadow-[0_0_0_3px_rgba(36,81,255,.12)]" : "border-line hover:border-line-strong"
            }`}
          >
            <span
              className={`grid size-5 shrink-0 place-items-center rounded-full border-2 transition ${
                active ? "border-brand bg-brand text-white" : "border-line-strong"
              }`}
            >
              {active && <Check className="size-3" strokeWidth={3.5} />}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-ink">{o.label}</span>
              {o.hint && <span className="block text-xs text-ink-3">{o.hint}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function Slider({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  format = (v) => String(v),
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  label: string;
  format?: (v: number) => string;
}) {
  const id = useId();
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <Field
      label={label}
      htmlFor={id}
      aside={<output htmlFor={id} className="rounded-lg bg-sunken px-2 py-0.5 text-xs font-semibold tabular-nums text-ink-2">{format(value)}</output>}
    >
      <input
        id={id}
        type="range"
        className="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ["--fill" as string]: `${fill}%` }}
      />
    </Field>
  );
}

export function Toggle({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-4">
      <label htmlFor={id} className="cursor-pointer">
        <span className="block text-sm font-semibold text-ink">{label}</span>
        {hint && <span className="mt-0.5 block text-xs leading-relaxed text-ink-3">{hint}</span>}
      </label>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition ${checked ? "bg-brand" : "bg-line-strong"}`}
      >
        <span className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition ${checked ? "translate-x-5" : ""}`} />
      </button>
    </div>
  );
}

export function NumberInput({
  value,
  onChange,
  label,
  suffix,
  min = 1,
  max = 20000,
  placeholder,
}: {
  value: number | null;
  onChange: (v: number | null) => void;
  label: string;
  suffix?: string;
  min?: number;
  max?: number;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-ink-2">
        {label}
      </label>
      <div className="flex h-11 items-center rounded-xl border border-line bg-surface px-3 transition focus-within:border-brand focus-within:shadow-[0_0_0_3px_rgba(36,81,255,.15)]">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "") return onChange(null);
            const n = Math.round(Number(raw));
            if (Number.isFinite(n)) onChange(Math.min(max, Math.max(0, n)));
          }}
          className="min-w-0 flex-1 bg-transparent text-[0.95rem] text-ink tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />
        {suffix && <span className="text-xs text-ink-3">{suffix}</span>}
      </div>
    </div>
  );
}

export function TextInput({
  value,
  onChange,
  label,
  placeholder,
  type = "text",
  multiline = false,
  maxLength,
  autoComplete = "off",
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  maxLength?: number;
  autoComplete?: string;
}) {
  const id = useId();
  const cls =
    "w-full rounded-xl border border-line bg-surface px-3.5 text-[0.95rem] text-ink outline-none transition placeholder:text-ink-3 focus:border-brand focus:shadow-[0_0_0_3px_rgba(36,81,255,.15)]";
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={4}
          className={`${cls} resize-y py-3`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete={autoComplete}
          spellCheck={false}
          className={`${cls} h-11`}
        />
      )}
    </div>
  );
}

export function ColorInput({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  const id = useId();
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-ink-2">
        {label}
      </label>
      <div className="flex h-11 items-center gap-2.5 rounded-xl border border-line bg-surface pr-3 pl-1.5">
        <input
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="size-8 cursor-pointer rounded-lg border-0 bg-transparent p-0 [&::-moz-color-swatch]:rounded-lg [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-line [&::-webkit-color-swatch-wrapper]:p-0"
        />
        <span className="font-mono text-sm text-ink-2 uppercase">{value}</span>
      </div>
    </div>
  );
}

export function Notice({ tone = "info", children }: { tone?: "info" | "warning" | "danger" | "success"; children: React.ReactNode }) {
  const styles = {
    info: "bg-brand/[.07] text-ink-2 border-brand/20",
    warning: "bg-warning-soft text-ink-2 border-warning/30",
    danger: "bg-danger-soft text-danger border-danger/25",
    success: "bg-success-soft text-ink-2 border-success/25",
  }[tone];
  return <div className={`rounded-xl border px-3.5 py-2.5 text-xs leading-relaxed ${styles}`}>{children}</div>;
}
