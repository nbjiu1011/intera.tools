"use client";

import { ArrowLeftRight, Check, Copy, Download, Link2, Mail, MessageSquare, Phone, ShieldCheck, Type, Wifi, type LucideIcon } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { ColorInput, FieldGroup, Notice, Segmented, Slider, TextInput, Toggle } from "@/components/workspace/controls";
import { track } from "@/lib/analytics";
import { downloadBlob } from "@/lib/download";
import { useClientValue } from "@/lib/useClientValue";

type Kind = "url" | "text" | "wifi" | "email" | "phone" | "sms";
type Ec = "L" | "M" | "Q" | "H";

const kindIcons: Record<Kind, LucideIcon> = { url: Link2, text: Type, wifi: Wifi, email: Mail, phone: Phone, sms: MessageSquare };

function escapeWifi(s: string) {
  return s.replace(/([\\;,:"])/g, "\\$1");
}

function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export default function QrGenerator() {
  const { dict } = useI18n();
  const q = dict.qr;
  const [kind, setKind] = useState<Kind>("url");
  const [f, setF] = useState({
    url: "",
    text: "",
    ssid: "",
    password: "",
    enc: "WPA" as "WPA" | "WEP" | "nopass",
    hidden: false,
    email: "",
    subject: "",
    body: "",
    phone: "",
    sms: "",
  });
  const [fg, setFg] = useState("#111827");
  const [bg, setBg] = useState("#ffffff");
  const [ec, setEc] = useState<Ec>("M");
  const [margin, setMargin] = useState(2);
  const [size, setSize] = useState(1024);
  // Rendered result, tagged with the inputs it was made from so stale output is never shown.
  const [render, setRender] = useState<{ key: string; svg: string | null; error: "tooLong" | null }>({ key: "", svg: null, error: null });
  const [copied, setCopied] = useState(false);
  const set = (patch: Partial<typeof f>) => setF((prev) => ({ ...prev, ...patch }));

  const payload = useMemo(() => {
    switch (kind) {
      case "url": {
        const u = f.url.trim();
        if (!u) return "";
        return /^[a-z][a-z0-9+.-]*:/i.test(u) ? u : `https://${u}`;
      }
      case "text":
        return f.text;
      case "wifi":
        if (!f.ssid) return "";
        return `WIFI:T:${f.enc};S:${escapeWifi(f.ssid)};${f.enc !== "nopass" ? `P:${escapeWifi(f.password)};` : ""}${f.hidden ? "H:true;" : ""};`;
      case "email": {
        if (!f.email.trim()) return "";
        const params = [f.subject && `subject=${encodeURIComponent(f.subject)}`, f.body && `body=${encodeURIComponent(f.body)}`].filter(Boolean).join("&");
        return `mailto:${f.email.trim()}${params ? `?${params}` : ""}`;
      }
      case "phone":
        return f.phone.trim() ? `tel:${f.phone.replace(/[^\d+*#]/g, "")}` : "";
      case "sms":
        return f.phone.trim() ? `SMSTO:${f.phone.replace(/[^\d+]/g, "")}:${f.sms}` : "";
    }
  }, [kind, f]);
  const deferred = useDeferredValue(payload);

  const renderKey = JSON.stringify([deferred, ec, margin, fg, bg]);
  useEffect(() => {
    if (!deferred) return;
    let alive = true;
    import("qrcode")
      .then((QR) => QR.toString(deferred, { type: "svg", errorCorrectionLevel: ec, margin, color: { dark: fg, light: bg } }))
      .then((svg) => alive && setRender({ key: renderKey, svg, error: null }))
      .catch(() => alive && setRender({ key: renderKey, svg: null, error: "tooLong" }));
    return () => {
      alive = false;
    };
  }, [renderKey, deferred, ec, margin, fg, bg]);
  const current = deferred && render.key === renderKey ? render : null;
  // Keep showing the previous code while the next one renders, to avoid flicker.
  const svg = deferred ? (current?.svg ?? (render.svg && !render.error ? render.svg : null)) : null;
  const error = current?.error ?? null;

  const contrast = (Math.max(luminance(fg), luminance(bg)) + 0.05) / (Math.min(luminance(fg), luminance(bg)) + 0.05);
  const lowContrast = contrast < 4 || luminance(fg) > luminance(bg);

  const pngBlob = async () => {
    const QR = await import("qrcode");
    const url = await QR.toDataURL(deferred, { errorCorrectionLevel: ec, margin, width: size, color: { dark: fg, light: bg } });
    return (await fetch(url)).blob();
  };
  const fileBase = `qr-${kind}-${new Date().toISOString().slice(0, 10)}`;

  const download = async (type: "png" | "svg") => {
    if (!svg) return;
    const blob = type === "svg" ? new Blob([svg], { type: "image/svg+xml" }) : await pngBlob();
    downloadBlob(blob, `${fileBase}.${type}`);
    track("download", { tool: "qr-code-generator", kind: type, count: 1 });
    track("process_success", { tool: "qr-code-generator", kind });
  };

  const copy = async () => {
    try {
      const blob = await pngBlob();
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  const canCopy = useClientValue(() => "ClipboardItem" in window && Boolean(navigator.clipboard?.write), false);

  return (
    <div className="card overflow-hidden rounded-[1.75rem] animate-pop-in">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="grid content-start gap-6 p-5 sm:p-8">
          <FieldGroup label={q.type}>
            <div role="tablist" aria-label={q.type} className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {(Object.keys(kindIcons) as Kind[]).map((k) => {
                const Icon = kindIcons[k];
                const active = k === kind;
                return (
                  <button
                    key={k}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setKind(k)}
                    className={`flex h-[72px] flex-col items-center justify-center gap-1.5 rounded-2xl border text-sm font-semibold transition ${
                      active ? "border-brand bg-brand/[.07] text-brand shadow-[0_0_0_3px_rgba(79,123,255,.12)]" : "border-line text-ink-2 hover:border-line-strong hover:text-ink"
                    }`}
                  >
                    <Icon className="size-5" />
                    {q.types[k]}
                  </button>
                );
              })}
            </div>
          </FieldGroup>

          <div className="grid gap-4" role="tabpanel">
            {kind === "url" && <TextInput label={q.url} type="url" value={f.url} onChange={(url) => set({ url })} placeholder={q.urlPlaceholder} />}
            {kind === "text" && <TextInput label={q.text} multiline value={f.text} onChange={(text) => set({ text })} placeholder={q.textPlaceholder} maxLength={2000} />}
            {kind === "wifi" && (
              <>
                <TextInput label={q.ssid} value={f.ssid} onChange={(ssid) => set({ ssid })} />
                <FieldGroup label={q.encryption}>
                  <Segmented
                    label={q.encryption}
                    value={f.enc}
                    onChange={(enc) => set({ enc })}
                    options={[
                      { value: "WPA", label: q.encWpa },
                      { value: "WEP", label: q.encWep },
                      { value: "nopass", label: q.encNone },
                    ]}
                  />
                </FieldGroup>
                {f.enc !== "nopass" && <TextInput label={q.password} value={f.password} onChange={(password) => set({ password })} />}
                <Toggle checked={f.hidden} onChange={(hidden) => set({ hidden })} label={q.hidden} />
              </>
            )}
            {kind === "email" && (
              <>
                <TextInput label={q.email} type="email" value={f.email} onChange={(email) => set({ email })} placeholder="name@example.com" />
                <TextInput label={q.subject} value={f.subject} onChange={(subject) => set({ subject })} />
                <TextInput label={q.body} multiline value={f.body} onChange={(body) => set({ body })} />
              </>
            )}
            {(kind === "phone" || kind === "sms") && (
              <TextInput label={q.phone} type="tel" value={f.phone} onChange={(phone) => set({ phone })} placeholder="+1 555 123 4567" />
            )}
            {kind === "sms" && <TextInput label={q.smsMessage} multiline value={f.sms} onChange={(sms) => set({ sms })} />}
          </div>

          <div className="grid gap-5 border-t border-line pt-6">
            <h2 className="text-lg font-bold text-ink">{q.design}</h2>
            <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
              <ColorInput label={q.foreground} value={fg} onChange={setFg} />
              <button
                type="button"
                onClick={() => {
                  setFg(bg);
                  setBg(fg);
                }}
                aria-label={q.swap}
                title={q.swap}
                className="mb-1 grid size-9 place-items-center rounded-full text-ink-3 hover:bg-muted hover:text-ink"
              >
                <ArrowLeftRight className="size-4" />
              </button>
              <ColorInput label={q.background} value={bg} onChange={setBg} />
            </div>
            {lowContrast && <Notice tone="warning">{q.lowContrast}</Notice>}
            <FieldGroup label={q.errorCorrection}>
              <Segmented<Ec>
                label={q.errorCorrection}
                size="sm"
                value={ec}
                onChange={setEc}
                options={(["L", "M", "Q", "H"] as const).map((v) => ({ value: v, label: v, title: q.ecHint[v] }))}
              />
              <p className="text-xs text-ink-3">{q.ecHint[ec]}</p>
            </FieldGroup>
            <div className="grid gap-5 sm:grid-cols-2">
              <Slider label={q.margin} min={0} max={8} value={margin} onChange={setMargin} />
              <Slider label={q.size} min={256} max={2048} step={64} value={size} onChange={setSize} format={(v) => `${v}px`} />
            </div>
          </div>
        </div>

        <aside className="border-t border-line bg-sunken/50 p-5 sm:p-8 lg:border-t-0 lg:border-l">
          <div className="lg:sticky lg:top-28">
            <div
              role="img"
              aria-label={q.preview}
              className="checkerboard mx-auto grid aspect-square w-full max-w-[320px] place-items-center overflow-hidden rounded-3xl shadow-[0_20px_50px_-24px_rgba(30,40,100,.5)]"
            >
              {svg ? (
                <div className="size-full [&>svg]:size-full" dangerouslySetInnerHTML={{ __html: svg }} />
              ) : (
                <p className="px-8 text-center text-sm text-ink-3">{error ? q.tooLong : q.empty}</p>
              )}
            </div>
            {error && <div className="mt-4"><Notice tone="danger">{q.tooLong}</Notice></div>}
            <div className="mx-auto mt-6 grid max-w-[320px] gap-2.5">
              <button
                type="button"
                disabled={!svg}
                onClick={() => download("png")}
                className="bg-brand-gradient inline-flex h-13 items-center justify-center gap-2 rounded-2xl font-semibold text-white shadow-button transition hover:brightness-110 disabled:opacity-50 disabled:shadow-none"
              >
                <Download className="size-5" />
                {q.downloadPng}
              </button>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  disabled={!svg}
                  onClick={() => download("svg")}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-line bg-surface text-sm font-semibold text-ink-2 transition hover:border-brand hover:text-brand disabled:opacity-50"
                >
                  <Download className="size-4" />
                  {q.downloadSvg}
                </button>
                {canCopy && (
                  <button
                    type="button"
                    disabled={!svg}
                    onClick={copy}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-line bg-surface text-sm font-semibold text-ink-2 transition hover:border-brand hover:text-brand disabled:opacity-50"
                  >
                    {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
                    {copied ? q.copied : q.copy}
                  </button>
                )}
              </div>
              <p className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-ink-3">
                <ShieldCheck className="mt-px size-4 shrink-0 text-success" />
                {q.staticNote}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
