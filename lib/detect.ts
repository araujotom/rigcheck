import { GPUS } from "@/lib/hardware";

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/\((r|tm)\)/g, "")
    .replace(/graphics/g, "")
    .replace(/[^a-z0-9]/g, "");

const keyFor = (name: string) =>
  name
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/geforce|radeon|nvidia|amd|intel|graphics/g, "")
    .replace(/\d+gb/g, "")
    .replace(/[^a-z0-9]/g, "");

/** Signs that a renderer string belongs to a discrete card, not an iGPU. */
const DISCRETE_MARKER = /\b(rtx|gtx|geforce|rx\s?\d|arc\s?[ab]\d|vega\s?\d+)\b/i;

/**
 * Generic strings such as "AMD Radeon(TM) Graphics" or "Intel(R) UHD Graphics"
 * are integrated graphics without a model number: we can tell what family it
 * is, but not which chip. Treat them as a hint, not a match.
 */
function looksLikeUnidentifiedIntegrated(renderer: string) {
  return (
    /(radeon|intel|arc)/i.test(renderer) &&
    /graphics/i.test(renderer) &&
    !DISCRETE_MARKER.test(renderer)
  );
}

export interface Detection {
  gpuId?: string;
  renderer: string;
  matched: boolean;
  /** True for generic iGPU strings, where the user must pick the closest model. */
  integratedHint: boolean;
}

/** Best-effort GPU identification through the WebGL debug renderer string. */
export function detectGpu(): Detection | null {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  const gl =
    (canvas.getContext("webgl2") as WebGL2RenderingContext | null) ??
    (canvas.getContext("webgl") as WebGLRenderingContext | null);

  if (!gl) return null;

  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = debugInfo
    ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL))
    : String(gl.getParameter(gl.RENDERER));

  const compact = normalize(renderer);

  const candidates = GPUS.map((gpu) => ({ gpu, key: keyFor(gpu.name) }))
    .filter((entry) => entry.key.length >= 3 && compact.includes(entry.key))
    .sort((a, b) => b.key.length - a.key.length || b.gpu.score - a.gpu.score);

  return {
    gpuId: candidates[0]?.gpu.id,
    renderer,
    matched: Boolean(candidates[0]),
    integratedHint:
      !candidates[0] && looksLikeUnidentifiedIntegrated(renderer),
  };
}

/** Chrome caps deviceMemory at 8, so only very low values are informative. */
export function detectRam(): number | null {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const memory = nav.deviceMemory;
  return typeof memory === "number" && memory > 0 && memory <= 4 ? memory : null;
}
