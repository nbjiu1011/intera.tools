// Passes result files to the next tool on client-side navigation ("Continue with…"),
// so nothing has to be downloaded and re-selected. Lives only in memory.

let pending: { files: File[]; from: string } | null = null;

export function setHandoff(files: File[], from: string) {
  pending = { files, from };
}

export function takeHandoff(): { files: File[]; from: string } | null {
  const value = pending;
  pending = null;
  return value;
}
