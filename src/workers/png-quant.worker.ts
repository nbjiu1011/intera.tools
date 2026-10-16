/// <reference lib="webworker" />
import UPNG from "upng-js";

// Lossy PNG optimisation: reduce to an optimal palette (like pngquant) and
// re-deflate. Runs off the main thread because quantizing large images is slow.

type Request = { id: number; rgba: ArrayBuffer; width: number; height: number; colors: number };

self.onmessage = (event: MessageEvent<Request>) => {
  const { id, rgba, width, height, colors } = event.data;
  try {
    const png = UPNG.encode([rgba], width, height, colors);
    (self as unknown as Worker).postMessage({ id, png }, [png]);
  } catch (error) {
    (self as unknown as Worker).postMessage({ id, error: String(error) });
  }
};
