import type { Verdict } from "@/lib/types";

export const VERDICT_META: Record<
  Verdict,
  { text: string; bg: string; border: string; dot: string }
> = {
  maxed: {
    text: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30",
    dot: "bg-accent",
  },
  great: {
    text: "text-emerald-300",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/25",
    dot: "bg-emerald-400",
  },
  playable: {
    text: "text-sky-300",
    bg: "bg-sky-400/10",
    border: "border-sky-400/25",
    dot: "bg-sky-400",
  },
  weak: {
    text: "text-amber-300",
    bg: "bg-amber-400/10",
    border: "border-amber-400/25",
    dot: "bg-amber-400",
  },
  no: {
    text: "text-rose-300",
    bg: "bg-rose-500/10",
    border: "border-rose-500/25",
    dot: "bg-rose-400",
  },
};

export const VERDICT_ORDER: Verdict[] = ["maxed", "great", "playable", "weak", "no"];

export const VERDICT_RANK: Record<Verdict, number> = {
  maxed: 4,
  great: 3,
  playable: 2,
  weak: 1,
  no: 0,
};

export function initials(title: string) {
  const cleaned = title.replace(/[^a-zA-Z0-9 ]/g, " ").trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "PC";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function artBackground(hue: number) {
  return `radial-gradient(130% 120% at 12% 0%, hsl(${hue} 72% 34%) 0%, hsl(${hue} 64% 18%) 42%, #0b0e12 100%)`;
}

export function glow(hue: number) {
  return `radial-gradient(circle at center, hsl(${hue} 95% 62% / 0.55), transparent 70%)`;
}

export function presetLabel(resolution: number, quality: string) {
  const res = resolution === 2160 ? "4K" : `${resolution}p`;
  return `${res} ${quality}`;
}

/** Rough "how demanding is this game" score, used for default sorting. */
export function demand(game: { rec: { gpuScore: number; cpuScore: number } }) {
  return game.rec.gpuScore * 2 + game.rec.cpuScore;
}

/**
 * Popularity sort weight. Steam player counts are the default; non-Steam titles
 * can opt into a manual weight instead of always sorting to the bottom.
 */
export function popularityOrder(game: { steamPlayers?: number; popularity?: number }) {
  return game.popularity ?? game.steamPlayers ?? -1;
}
