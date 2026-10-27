"use client";

import Link from "next/link";
import { GameArt } from "@/components/game-art";
import { ArrowUpRightIcon } from "@/components/icons";
import { useLocale } from "@/components/locale-provider";
import type { GameResult } from "@/lib/types";
import { VERDICT_META, presetLabel } from "@/lib/ui";

export function GameCard({
  result,
  eager = false,
}: {
  result: GameResult;
  eager?: boolean;
}) {
  const { t } = useLocale();
  const { game, verdict, fps, preset } = result;
  const meta = VERDICT_META[verdict];
  const genres = game.genres.slice(0, 2).map((genre) => t.genres[genre] ?? genre);

  return (
    <Link
      href={`/games/${game.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900/70 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,1)]"
    >
      <GameArt
        title={game.title}
        year={game.year}
        hue={game.hue}
        appId={game.steamAppId}
        cover={game.cover}
        verdict={verdict}
        className="aspect-[16/10]"
        eager={eager}
      />

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] text-white/40">{genres.join(" · ")}</p>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[22px] font-semibold leading-none tracking-tight tabular-nums">
                {verdict === "no" ? "—" : fps}
              </span>
              <span className="text-[11px] text-white/40">{t.card.fps}</span>
            </div>
            <p className="mt-1 text-[11px] text-white/50">
              {verdict === "no"
                ? t.card.belowMin
                : preset
                  ? presetLabel(preset.resolution, t.qualities[preset.quality])
                  : "—"}
            </p>
          </div>

          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/30 transition group-hover:border-accent/40 group-hover:text-accent">
            <ArrowUpRightIcon size={14} />
          </span>
        </div>

        {result.bottlenecks.length > 0 ? (
          <div className="mt-auto flex items-center gap-2 pt-4">
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${meta.dot} opacity-80`} />
            <span className="truncate text-[10px] text-white/35">
              {t.card.limited(
                result.bottlenecks.map((bottleneck) => t.bottlenecks[bottleneck]).join(" + "),
              )}
            </span>
          </div>
        ) : (
          <div className="mt-auto pt-4">
            <span className="text-[10px] text-white/25">{t.card.noBottleneck}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
