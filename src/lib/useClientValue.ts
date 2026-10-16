import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** A browser-only value that hydrates safely: `server` during SSR/hydration, then `read()`. */
export function useClientValue<T>(read: () => T, server: T): T {
  return useSyncExternalStore(noopSubscribe, read, () => server);
}
