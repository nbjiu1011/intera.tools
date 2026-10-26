"use client";

import { Bookmark, Plus, X } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { format } from "@/i18n/format";
import { useStored } from "@/lib/local";

type Preset<T> = { name: string; settings: T };

/**
 * Workflow settings remembered in this browser (last used), plus named presets.
 * Stored values are merged over the defaults so new options get sensible values.
 */
export function useWorkflowSettings<T extends object>(slug: string, defaults: T) {
  const [stored, setStored] = useStored<Partial<T> | null>(`tn_wf_${slug}`, null);
  const [presets, setPresets] = useStored<Preset<Partial<T>>[]>(`tn_wf_${slug}_presets`, []);
  const settings = { ...defaults, ...(stored ?? {}) } as T;
  const update = (patch: Partial<T>) => setStored({ ...settings, ...patch });
  return {
    settings,
    update,
    presets,
    savePreset: (name: string) => setPresets([{ name, settings }, ...presets.filter((p) => p.name !== name)].slice(0, 12)),
    applyPreset: (p: Preset<Partial<T>>) => setStored({ ...defaults, ...p.settings }),
    deletePreset: (name: string) => setPresets(presets.filter((p) => p.name !== name)),
  };
}

export function PresetBar<T extends object>({ wf }: { wf: ReturnType<typeof useWorkflowSettings<T>> }) {
  const { dict } = useI18n();
  const w = dict.workflow;
  const [name, setName] = useState("");
  const save = () => {
    const n = name.trim();
    if (!n) return;
    wf.savePreset(n.slice(0, 40));
    setName("");
  };
  return (
    <div className="grid gap-2 border-b border-line pb-5">
      <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
        <Bookmark className="size-4" />
        {w.presets}
      </p>
      {wf.presets.length ? (
        <ul className="flex flex-wrap gap-1.5">
          {wf.presets.map((p) => (
            <li key={p.name} className="flex items-center rounded-lg border border-line text-sm">
              <button type="button" onClick={() => wf.applyPreset(p)} className="px-2.5 py-1 font-medium text-ink-2 hover:text-ink">
                {p.name}
              </button>
              <button
                type="button"
                onClick={() => wf.deletePreset(p.name)}
                aria-label={format(w.deletePreset, { name: p.name })}
                className="grid size-7 place-items-center border-l border-line text-ink-3 hover:text-danger"
              >
                <X className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-ink-3">{w.noPresets}</p>
      )}
      <form
        className="flex gap-1.5"
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
      >
        <label className="sr-only" htmlFor="preset-name">
          {w.presetName}
        </label>
        <input
          id="preset-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={w.presetName}
          maxLength={40}
          className="h-9 min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 text-sm text-ink outline-none placeholder:text-ink-3 focus:border-brand"
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className="inline-flex h-9 items-center gap-1 rounded-lg border border-line px-3 text-sm font-semibold text-ink hover:bg-muted disabled:opacity-40"
        >
          <Plus className="size-4" />
          {w.savePreset}
        </button>
      </form>
      <p className="text-xs text-ink-3">{w.lastUsed}</p>
    </div>
  );
}
