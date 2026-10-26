"use client";

import { CircleCheck, LoaderCircle, Mail, Send } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { TextInput } from "@/components/workspace/controls";
import { format } from "@/i18n/format";

type Topic = "bug" | "feature" | "privacy" | "business" | "other";

export function ContactForm({ email }: { email: string }) {
  const { locale, dict } = useI18n();
  const c = dict.contact;
  const [form, setForm] = useState({ name: "", email: "", topic: "bug" as Topic, message: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "invalid">("idle");
  const set = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || form.message.trim().length < 10) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      setStatus(res.ok ? "sent" : res.status === 400 ? "invalid" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="card animate-pop-in p-8 text-center" role="status">
        <CircleCheck className="mx-auto size-12 text-success" />
        <p className="mt-4 text-lg font-semibold text-ink">{c.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card grid gap-5 p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput label={`${c.name} ${c.nameOptional}`} value={form.name} onChange={(name) => set({ name })} maxLength={100} autoComplete="name" />
        <TextInput label={c.email} type="email" value={form.email} onChange={(email) => set({ email })} maxLength={200} autoComplete="email" />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="topic" className="text-sm font-semibold text-ink">
          {c.topic}
        </label>
        <select
          id="topic"
          value={form.topic}
          onChange={(e) => set({ topic: e.target.value as Topic })}
          className="h-11 rounded-xl border border-line bg-surface px-3 text-[0.95rem] text-ink outline-none focus:border-brand"
        >
          {(Object.keys(c.topics) as Topic[]).map((t) => (
            <option key={t} value={t}>
              {c.topics[t]}
            </option>
          ))}
        </select>
      </div>
      <TextInput label={c.message} multiline value={form.message} onChange={(message) => set({ message })} placeholder={c.messagePlaceholder} maxLength={5000} />
      {/* Honeypot for bots; hidden from people and assistive tech */}
      <div className="hidden" aria-hidden>
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set({ website: e.target.value })} />
        </label>
      </div>
      {status === "invalid" && <p className="rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger" role="alert">{c.invalid}</p>}
      {status === "error" && <p className="rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger" role="alert">{format(c.error, { email })}</p>}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-ink-3">{c.note}</p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-brand-gradient inline-flex h-12 items-center gap-2 rounded-lg px-7 font-semibold transition hover:brightness-110 disabled:opacity-70"
        >
          {status === "sending" ? <LoaderCircle className="size-5 animate-spin" /> : <Send className="size-4" />}
          {status === "sending" ? c.sending : c.send}
        </button>
      </div>
      <p className="flex items-center gap-2 border-t border-line pt-4 text-sm text-ink-2">
        <Mail className="size-4 text-brand" />
        <span>
          {c.emailUs.split("{email}")[0]}
          <a className="font-semibold text-brand hover:underline" href={`mailto:${email}`}>
            {email}
          </a>
          {c.emailUs.split("{email}")[1]}
        </span>
      </p>
    </form>
  );
}
