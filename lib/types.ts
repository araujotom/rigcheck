export type GpuBrand = "NVIDIA" | "AMD" | "Intel";

export interface Cpu {
  id: string;
  name: string;
  brand: "Intel" | "AMD";
  /** Relative gaming performance, 0-100 (100 = Ryzen 7 9800X3D). */
  score: number;
  cores: number;
  threads: number;
  year: number;
  /** GPU id of the integrated graphics, when the CPU has one. */
  igpu?: string;
}

export interface Gpu {
  id: string;
  name: string;
  brand: GpuBrand;
  /** Relative raster performance, 0-100 (100 = RTX 5090). */
  score: number;
  vram: number;
  year: number;
  kind: "discrete" | "integrated";
}

export interface Requirement {
  cpu: string;
  cpuScore: number;
  gpu: string;
  gpuScore: number;
  ram: number;
  vram: number;
  storage: number;
}

export interface Game {
  slug: string;
  title: string;
  year: number;
  developer: string;
  genres: string[];
  /** Hue used to generate the game's cover artwork. */
  hue: number;
  summary: string;
  /** Brazilian Portuguese summary, when available. */
  summaryPt?: string;
  min: Requirement;
  rec: Requirement;
  /** Hard engine FPS ceiling, if the game has one. */
  fpsCap?: number;
  /** Typical FPS on the recommended GPU at 1080p / High. Defaults to 62. */
  fpsAtRecommended?: number;
  /** Steam app ID used for cover art and player data. */
  steamAppId?: number;
  /** Local cover path for titles without Steam art. */
  cover?: string;
  /** Current Steam players at snapshot time. */
  steamPlayers?: number;
  /**
   * Manual popularity weight for titles without a Steam player count.
   * Only used for sorting; it is never displayed as a player number.
   */
  popularity?: number;
  /** Popularity rank within the RigCheck library, 1 = most played. */
  steamRank?: number;
}

export interface UserSpecs {
  cpuId: string;
  gpuId: string;
  ram: number;
  vram: number;
  storage: number;
  /** Highest resolution the user wants to target. */
  maxResolution: 1080 | 1440 | 2160;
  targetFps: number;
}

/** User specs enriched with the performance index of the selected parts. */
export interface RatedSpecs extends UserSpecs {
  cpuScore: number;
  gpuScore: number;
}

export type Verdict = "maxed" | "great" | "playable" | "weak" | "no";

export type Bottleneck = "gpu" | "cpu" | "ram" | "vram";

export type GameWarning =
  | { key: "storage"; need: number; have: number }
  | { key: "vram"; need: number }
  | { key: "ram"; need: number }
  | { key: "integrated" };

export interface ComponentCheck {
  key: "cpu" | "gpu" | "ram" | "vram" | "storage";
  yours: string;
  minimum: string;
  recommended: string;
  ratio: number;
  status: "below" | "minimum" | "recommended";
}

export interface GameResult {
  game: Game;
  verdict: Verdict;
  preset: { resolution: number; quality: Quality } | null;
  fps: number;
  bottlenecks: Bottleneck[];
  warnings: GameWarning[];
  checks: ComponentCheck[];
}

export type Quality = "Low" | "Medium" | "High" | "Ultra";
