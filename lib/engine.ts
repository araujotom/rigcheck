import { CPU_BY_ID, GPU_BY_ID } from "@/lib/hardware";
import type {
  Bottleneck,
  ComponentCheck,
  Game,
  GameResult,
  GameWarning,
  Quality,
  RatedSpecs,
  Verdict,
} from "@/lib/types";

export const QUALITIES: Quality[] = ["Ultra", "High", "Medium", "Low"];
export const RESOLUTIONS = [2160, 1440, 1080, 720] as const;

/**
 * Presets ordered from most to least desirable. Resolution is weighted above
 * quality at each tier: native 1440p Medium beats 1080p Ultra, but 1080p Ultra
 * still beats dropping all the way to 1440p Low.
 */
const PRESET_ORDER: [number, Quality][] = [
  [2160, "Ultra"],
  [2160, "High"],
  [1440, "Ultra"],
  [2160, "Medium"],
  [1440, "High"],
  [1440, "Medium"],
  [1080, "Ultra"],
  [2160, "Low"],
  [1080, "High"],
  [1080, "Medium"],
  [1440, "Low"],
  [1080, "Low"],
  [720, "Ultra"],
  [720, "High"],
  [720, "Medium"],
  [720, "Low"],
];
const QUALITY_FACTOR: Record<Quality, number> = {
  Ultra: 0.84,
  High: 1,
  Medium: 1.3,
  Low: 1.8,
};

const RESOLUTION_FACTOR: Record<number, number> = {
  2160: 0.44,
  1440: 0.7,
  1080: 1,
  720: 1.45,
};

export const RESOLUTION_LABEL: Record<number, string> = {
  2160: "4K",
  1440: "1440p",
  1080: "1080p",
  720: "720p",
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/**
 * Rough frame-rate model.
 *
 * Everything is anchored to the game's "recommended" hardware, which we treat
 * as 1080p / High / ~60 FPS. GPU throughput scales sub-linearly with the
 * performance index, CPU throughput caps the frame rate, and VRAM shortages
 * cost texture quality. Deliberately simple — real engines are messier.
 */
export function estimateFps(
  game: Game,
  specs: RatedSpecs,
  resolution: number,
  quality: Quality,
): number {
  const gpuRatio = specs.gpuScore / game.rec.gpuScore;
  const cpuRatio = specs.cpuScore / game.rec.cpuScore;

  const vramRatio = specs.vram / game.rec.vram;
  const vramFactor =
    specs.vram < game.min.vram ? 0.45 : clamp(0.72 + 0.28 * vramRatio, 0.72, 1);

  const ramFactor =
    specs.ram < game.min.ram ? 0.7 : specs.ram < game.rec.ram ? 0.94 : 1;

  const anchor = game.fpsAtRecommended ?? 62;

  const gpuFps =
    anchor *
    Math.pow(Math.max(gpuRatio, 0.01), 0.95) *
    QUALITY_FACTOR[quality] *
    RESOLUTION_FACTOR[resolution] *
    vramFactor *
    ramFactor;

  const cpuFps =
    anchor * 2.2 * Math.pow(Math.max(cpuRatio, 0.01), 0.8) * Math.max(ramFactor, 0.85);

  const fps = Math.min(gpuFps, cpuFps);
  const capped = game.fpsCap ? Math.min(fps, game.fpsCap) : fps;

  return Math.max(3, capped);
}

export interface Preset {
  resolution: number;
  quality: Quality;
}

export function effectiveTarget(game: Game, targetFps: number) {
  return game.fpsCap ? Math.min(targetFps, game.fpsCap) : targetFps;
}

export function bestPreset(
  game: Game,
  specs: RatedSpecs,
  targetFps: number,
): { preset: Preset; fps: number; met: boolean; fallback: Preset; fallbackFps: number } {
  const presets: Preset[] = PRESET_ORDER.filter(
    ([resolution]) => resolution <= specs.maxResolution,
  ).map(([resolution, quality]) => ({ resolution, quality }));

  const target = effectiveTarget(game, targetFps);
  const lowest = presets[presets.length - 1];
  const lowestFps = estimateFps(game, specs, lowest.resolution, lowest.quality);

  for (const preset of presets) {
    const fps = estimateFps(game, specs, preset.resolution, preset.quality);
    if (Math.round(fps) >= target) {
      return { preset, fps, met: true, fallback: lowest, fallbackFps: lowestFps };
    }
  }

  return {
    preset: lowest,
    fps: lowestFps,
    met: false,
    fallback: lowest,
    fallbackFps: lowestFps,
  };
}

function verdictFor(
  preset: Preset | null,
  fps: number,
  targetFps: number,
  hardFail: boolean,
): Verdict {
  if (hardFail) return "no";
  if (!preset) return fps >= 25 ? "weak" : "no";

  const { resolution, quality } = preset;

  if (quality === "Ultra" && resolution >= 1080) return "maxed";
  if (quality === "High" && resolution >= 1440) return "maxed";
  if (quality === "High" && resolution >= 1080) return "great";
  if (quality === "Medium" && resolution >= 1440) return "great";
  if (quality === "Ultra" && resolution === 720) return "great";
  if (quality === "Medium" && resolution >= 1080 && fps >= targetFps * 1.2) {
    return "great";
  }
  return "playable";
}

export function evaluateGame(
  game: Game,
  specs: RatedSpecs,
  targetFps: number,
): GameResult {
  const gpuRatio = specs.gpuScore / game.rec.gpuScore;
  const cpuRatio = specs.cpuScore / game.rec.cpuScore;
  const gpu = GPU_BY_ID.get(specs.gpuId);
  const integrated = gpu?.kind === "integrated";

  // Integrated GPUs share system RAM, so the nominal "VRAM" figure is not a
  // hard limit. Warn about it, but never rule a game out on that basis alone.
  const hardFail =
    specs.gpuScore < game.min.gpuScore * 0.5 ||
    specs.cpuScore < game.min.cpuScore * 0.45 ||
    specs.ram < Math.min(4, game.min.ram) ||
    (!integrated && game.min.vram > 0 && specs.vram < game.min.vram * 0.5);

  const { preset, fps, met, fallbackFps } = bestPreset(game, specs, targetFps);
  const verdict = verdictFor(met ? preset : null, fallbackFps, targetFps, hardFail);

  const bottlenecks: Bottleneck[] = [];
  const gpuShort = specs.gpuScore < game.rec.gpuScore;
  const cpuShort = specs.cpuScore < game.rec.cpuScore;
  if (gpuShort && cpuShort) {
    if (gpuRatio <= cpuRatio) bottlenecks.push("gpu", "cpu");
    else bottlenecks.push("cpu", "gpu");
  } else if (gpuShort) {
    bottlenecks.push("gpu");
  } else if (cpuShort) {
    bottlenecks.push("cpu");
  }
  if (specs.ram < game.rec.ram) bottlenecks.push("ram");
  if (specs.vram < game.rec.vram) bottlenecks.push("vram");

  const warnings: GameWarning[] = [];
  if (specs.storage < game.min.storage) {
    warnings.push({
      key: "storage",
      need: game.min.storage,
      have: specs.storage,
    });
  }
  if (specs.vram < game.min.vram) {
    warnings.push({ key: "vram", need: game.min.vram });
  }
  if (specs.ram < game.min.ram) {
    warnings.push({ key: "ram", need: game.min.ram });
  }

  if (integrated && verdict !== "no") {
    warnings.push({ key: "integrated" });
  }

  const checks: ComponentCheck[] = [
    {
      key: "gpu",
      yours: gpu?.name ?? "Unknown",
      minimum: game.min.gpu,
      recommended: game.rec.gpu,
      ratio: gpuRatio,
      status:
        specs.gpuScore >= game.rec.gpuScore
          ? "recommended"
          : specs.gpuScore >= game.min.gpuScore
            ? "minimum"
            : "below",
    },
    {
      key: "cpu",
      yours: CPU_BY_ID.get(specs.cpuId)?.name ?? "Unknown",
      minimum: game.min.cpu,
      recommended: game.rec.cpu,
      ratio: cpuRatio,
      status:
        specs.cpuScore >= game.rec.cpuScore
          ? "recommended"
          : specs.cpuScore >= game.min.cpuScore
            ? "minimum"
            : "below",
    },
    {
      key: "ram",
      yours: `${specs.ram} GB`,
      minimum: `${game.min.ram} GB`,
      recommended: `${game.rec.ram} GB`,
      ratio: specs.ram / game.rec.ram,
      status:
        specs.ram >= game.rec.ram
          ? "recommended"
          : specs.ram >= game.min.ram
            ? "minimum"
            : "below",
    },
    {
      key: "vram",
      yours: `${specs.vram} GB`,
      minimum: `${game.min.vram} GB`,
      recommended: `${game.rec.vram} GB`,
      ratio: specs.vram / Math.max(game.rec.vram, 1),
      status:
        specs.vram >= game.rec.vram
          ? "recommended"
          : specs.vram >= game.min.vram
            ? "minimum"
            : "below",
    },
    {
      key: "storage",
      yours: `${specs.storage} GB`,
      minimum: `${game.min.storage} GB`,
      recommended: `${game.min.storage} GB`,
      ratio: specs.storage / Math.max(game.min.storage, 1),
      status:
        specs.storage >= game.min.storage
          ? "recommended"
          : specs.storage >= game.min.storage * 0.8
            ? "minimum"
            : "below",
    },
  ];

  return {
    game,
    verdict,
    preset: verdict === "no" ? null : preset,
    fps: Math.round(verdict === "no" ? 0 : fps),
    bottlenecks: Array.from(new Set(bottlenecks)).slice(0, 2),
    warnings,
    checks,
  };
}

export function evaluateAll(
  games: Game[],
  specs: RatedSpecs,
  targetFps: number,
): GameResult[] {
  return games.map((game) => evaluateGame(game, specs, targetFps));
}

export function fpsGrid(game: Game, specs: RatedSpecs) {
  return RESOLUTIONS.map((resolution) => ({
    resolution,
    label: RESOLUTION_LABEL[resolution],
    cells: QUALITIES.map((quality) => ({
      quality,
      fps: Math.round(estimateFps(game, specs, resolution, quality)),
    })),
  }));
}

/** Colour bucket for a frame rate, used by the UI. */
export function fpsTone(fps: number, target: number): "great" | "good" | "ok" | "bad" {
  if (fps >= target) return "great";
  if (fps >= target * 0.7) return "good";
  if (fps >= 30) return "ok";
  return "bad";
}
