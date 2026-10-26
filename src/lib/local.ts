"use client";

import { useCallback, useState, useSyncExternalStore } from "react";

// Small, per-browser preferences (recent tools, favorites, saved workflow settings).
// Nothing here is sent anywhere; storage can be unavailable (private mode), in which
// case everything still works for the current page.

const listeners = new Map<string, Set<() => void>>();
const cache = new Map<string, { raw: string | null; value: unknown }>();

function readRaw(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = readRaw(key);
  const hit = cache.get(key);
  // Same snapshot object while the stored string is unchanged (useSyncExternalStore needs that).
  if (hit && hit.raw === raw) return hit.value as T;
  let value: T = fallback;
  if (raw != null) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = fallback;
    }
  }
  cache.set(key, { raw, value });
  return value;
}

export function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota or privacy mode: keep working without persistence.
  }
  listeners.get(key)?.forEach((l) => l());
}

function subscribe(key: string, listener: () => void) {
  if (!listeners.has(key)) listeners.set(key, new Set());
  listeners.get(key)!.add(listener);
  const onStorage = (e: StorageEvent) => e.key === key && listener();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.get(key)?.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** A JSON value in localStorage, shared by every component that uses the same key. */
export function useStored<T>(key: string, fallback: T): [T, (next: T) => void] {
  // Snapshots must be referentially stable, so keep the first fallback object.
  const [initial] = useState(fallback);
  const value = useSyncExternalStore(
    useCallback((l: () => void) => subscribe(key, l), [key]),
    () => readJson(key, initial),
    () => initial,
  );
  const set = useCallback((next: T) => writeJson(key, next), [key]);
  return [value, set];
}

/* -------------------------------------------------- recent tools & favorites */

const RECENT = "tn_recent";
const FAVORITES = "tn_favorites";
const EMPTY: string[] = [];

/** Remember that a tool or workflow page was opened ("compress-image", "workflow:…"). */
export function rememberVisit(id: string) {
  const list = readJson<string[]>(RECENT, EMPTY).filter((x) => x !== id);
  writeJson(RECENT, [id, ...list].slice(0, 8));
}

export function useRecent() {
  return useStored<string[]>(RECENT, EMPTY);
}

export function useFavorites() {
  const [list, set] = useStored<string[]>(FAVORITES, EMPTY);
  const toggle = useCallback(
    (id: string) => set(list.includes(id) ? list.filter((x) => x !== id) : [id, ...list].slice(0, 24)),
    [list, set],
  );
  return { list, toggle, has: (id: string) => list.includes(id) };
}
