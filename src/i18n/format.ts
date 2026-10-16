/** Replace {name} placeholders. Missing values are left as-is so gaps are visible. */
export function format(template: string, vars: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

export function formatBytes(bytes: number, locale: string = "en"): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  const digits = unit === 0 || value >= 100 ? 0 : value >= 10 ? 1 : 2;
  return `${value.toLocaleString(locale, { maximumFractionDigits: digits })} ${units[unit]}`;
}

export function formatPercent(ratio: number, locale: string = "en"): string {
  return ratio.toLocaleString(locale, { style: "percent", maximumFractionDigits: ratio < 0.1 ? 1 : 0 });
}
