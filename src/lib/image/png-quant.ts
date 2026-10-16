import { ToolError } from "../errors";
import { context2d } from "./codec";

let worker: Worker | null = null;
let seq = 0;
const pending = new Map<number, { resolve: (b: ArrayBuffer) => void; reject: (e: unknown) => void }>();

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker(new URL("../../workers/png-quant.worker.ts", import.meta.url), { type: "module" });
    worker.onmessage = (event: MessageEvent<{ id: number; png?: ArrayBuffer; error?: string }>) => {
      const job = pending.get(event.data.id);
      if (!job) return;
      pending.delete(event.data.id);
      if (event.data.png) job.resolve(event.data.png);
      else job.reject(new Error(event.data.error));
    };
    worker.onerror = (e) => {
      for (const job of pending.values()) job.reject(e);
      pending.clear();
      worker?.terminate();
      worker = null;
    };
  }
  return worker;
}

/** Encode a canvas as a palette PNG with at most `colors` colors (0 = lossless). */
export async function quantizePng(canvas: HTMLCanvasElement, colors: number): Promise<Blob> {
  const { width, height } = canvas;
  const data = context2d(canvas).getImageData(0, 0, width, height).data;
  const rgba = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer;
  const id = ++seq;
  try {
    const png = await new Promise<ArrayBuffer>((resolve, reject) => {
      pending.set(id, { resolve, reject });
      getWorker().postMessage({ id, rgba, width, height, colors }, [rgba]);
    });
    return new Blob([png], { type: "image/png" });
  } catch {
    throw new ToolError("out-of-memory");
  }
}
