"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries/en";
import type { ToolSlug } from "@/lib/tools";
import type { WorkflowSlug } from "@/lib/workflows";

export type ToolSummaries = Record<ToolSlug, { name: string; short: string }>;
export type WorkflowNames = Record<WorkflowSlug, { name: string; short: string }>;

type I18nValue = { locale: Locale; dict: Dict; tools: ToolSummaries; workflows: WorkflowNames };

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ value, children }: { value: I18nValue; children: React.ReactNode }) {
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside <I18nProvider>");
  return value;
}
