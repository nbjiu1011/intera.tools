"use client";

import { ImagePlus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { ColorInput, FieldGroup, Notice, Segmented, Slider, TextInput, Toggle } from "@/components/workspace/controls";
import { ImageBatchTool, type ImageItem } from "@/components/workspace/ImageBatchTool";
import { format } from "@/i18n/format";
import { ACCEPT, acceptAttr } from "@/lib/files";
import { loadImage, type LoadedImage } from "@/lib/image/codec";
import { drawWatermark, watermarkImage, type WatermarkOptions, type WatermarkPosition } from "@/lib/image/ops";

const positions: WatermarkPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "middle-left",
  "center",
  "middle-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

function Preview({ item, options, logo }: { item: ImageItem; options: WatermarkOptions; logo: LoadedImage | null }) {
  const { dict } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const el = new Image();
    el.onload = () => setImg(el);
    el.src = item.url;
    return () => setImg(null);
  }, [item.url]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;
    const max = 1100;
    const scale = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    const w = Math.round(img.naturalWidth * scale);
    const h = Math.round(img.naturalHeight * scale);
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    drawWatermark(ctx, w, h, options, logo);
  }, [img, options, logo]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={format(dict.watermark.previewOf, { name: item.file.name })}
      className="checkerboard mx-auto block max-h-[min(460px,55vh)] max-w-full rounded-xl object-contain shadow-[0_14px_40px_-20px_rgba(30,40,100,.5)]"
      style={{ width: "auto", height: "auto" }}
    />
  );
}

export default function WatermarkImage() {
  const { dict } = useI18n();
  const m = dict.watermark;
  const [o, setO] = useState<WatermarkOptions>({
    type: "text",
    text: m.textDefault,
    font: "sans",
    bold: true,
    size: 7,
    color: "#ffffff",
    opacity: 60,
    rotation: 0,
    position: "bottom-right",
    tile: false,
    logoSize: 22,
  });
  const [logo, setLogo] = useState<LoadedImage | null>(null);
  const [logoName, setLogoName] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const logoInput = useRef<HTMLInputElement>(null);
  const set = (patch: Partial<WatermarkOptions>) => setO((prev) => ({ ...prev, ...patch }));

  useEffect(() => () => logo?.release(), [logo]);

  const pickLogo = async (file?: File) => {
    if (!file) return;
    try {
      const loaded = await loadImage(file);
      setLogo(loaded);
      setLogoName(file.name);
    } catch {
      setLogo(null);
      setLogoName("");
    }
  };

  return (
    <ImageBatchTool
      slug="watermark-image"
      accept={ACCEPT.rasterEditable}
      doneTitle={m.done}
      actionLabel={() => m.action}
      process={(item) => watermarkImage(item.file, o, logo ? { source: logo.source, width: logo.width, height: logo.height } : null)}
      blocker={() => (o.type === "text" && !o.text.trim() ? m.needText : o.type === "image" && !logo ? m.needLogo : null)}
      renderFiles={(items, remove) => {
        const current = items.find((i) => i.id === selected) ?? items[0];
        return (
          <div className="grid gap-4">
            <div className="grid min-h-[300px] place-items-center rounded-2xl bg-surface/60 p-3">
              <Preview item={current} options={o} logo={logo} />
            </div>
            {items.length > 0 && (
              <ul className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
                {items.map((item) => (
                  <li key={item.id} className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() => setSelected(item.id)}
                      aria-pressed={item.id === current.id}
                      aria-label={format(m.previewOf, { name: item.file.name })}
                      className={`block size-16 overflow-hidden rounded-xl border-2 transition ${
                        item.id === current.id ? "border-brand" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.url} alt="" className="size-full object-cover" />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(item.id)}
                      aria-label={format(dict.workspace.remove, { name: item.file.name })}
                      className="absolute -top-1.5 -right-1.5 grid size-6 place-items-center rounded-full bg-[#0c1226]/70 text-white hover:bg-danger"
                    >
                      <X className="size-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      }}
      renderOptions={() => (
        <>
          <FieldGroup label={m.type}>
            <Segmented
              label={m.type}
              value={o.type}
              onChange={(type) => set({ type })}
              options={[
                { value: "text", label: m.typeText },
                { value: "image", label: m.typeImage },
              ]}
            />
          </FieldGroup>

          {o.type === "text" ? (
            <>
              <TextInput label={m.text} value={o.text} onChange={(text) => set({ text })} maxLength={120} />
              <FieldGroup label={m.font}>
                <Segmented
                  label={m.font}
                  size="sm"
                  value={o.font}
                  onChange={(font) => set({ font })}
                  options={[
                    { value: "sans", label: m.fontSans },
                    { value: "serif", label: m.fontSerif },
                    { value: "mono", label: m.fontMono },
                  ]}
                />
              </FieldGroup>
              <div className="grid grid-cols-[1fr_auto] items-end gap-3">
                <ColorInput label={m.color} value={o.color} onChange={(color) => set({ color })} />
                <div className="pb-2.5">
                  <Toggle checked={o.bold} onChange={(bold) => set({ bold })} label={m.bold} />
                </div>
              </div>
              <Slider label={m.size} min={2} max={30} value={o.size} onChange={(size) => set({ size })} format={(v) => `${v}%`} />
            </>
          ) : (
            <div className="grid gap-2">
              <span className="text-sm font-semibold text-ink">{m.logo}</span>
              <input
                ref={logoInput}
                type="file"
                className="sr-only"
                tabIndex={-1}
                accept={acceptAttr(ACCEPT.anyImage)}
                onChange={(e) => {
                  void pickLogo(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
              <button
                type="button"
                onClick={() => logoInput.current?.click()}
                className="flex h-14 items-center gap-3 rounded-2xl border-2 border-dashed border-line-strong px-4 text-left text-sm font-semibold text-ink-2 transition hover:border-brand hover:text-brand"
              >
                {logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logo.source.src} alt="" className="checkerboard size-9 rounded-lg object-contain" />
                ) : (
                  <ImagePlus className="size-5" />
                )}
                <span className="min-w-0 flex-1 truncate">{logo ? logoName : m.chooseLogo}</span>
                {logo && <span className="text-xs text-brand">{m.replaceLogo}</span>}
              </button>
              <p className="text-xs text-ink-3">{m.logoHint}</p>
              <Slider label={m.logoSize} min={5} max={80} value={o.logoSize} onChange={(logoSize) => set({ logoSize })} format={(v) => `${v}%`} />
            </div>
          )}

          <Slider label={m.opacity} min={5} max={100} value={o.opacity} onChange={(opacity) => set({ opacity })} format={(v) => `${v}%`} />
          <Slider label={m.rotation} min={-90} max={90} value={o.rotation} onChange={(rotation) => set({ rotation })} format={(v) => `${v}°`} />
          <Toggle checked={o.tile} onChange={(tile) => set({ tile })} label={m.tile} />
          {!o.tile && (
            <FieldGroup label={m.position}>
              <div className="grid w-fit grid-cols-3 gap-1.5 rounded-2xl bg-sunken p-1.5">
                {positions.map((p) => (
                  <button
                    key={p}
                    type="button"
                    aria-label={m.positions[p]}
                    aria-pressed={o.position === p}
                    title={m.positions[p]}
                    onClick={() => set({ position: p })}
                    className={`grid size-10 place-items-center rounded-xl transition ${
                      o.position === p ? "bg-brand text-white shadow-button" : "bg-surface text-ink-3 hover:text-ink"
                    }`}
                  >
                    <span className={`size-2.5 rounded-full ${o.position === p ? "bg-white" : "bg-current"}`} />
                  </button>
                ))}
              </div>
            </FieldGroup>
          )}
          {o.type === "image" && !logo && <Notice tone="warning">{m.needLogo}</Notice>}
        </>
      )}
    />
  );
}
