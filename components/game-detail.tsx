"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { GameCard } from "@/components/game-card";
import { BackLink, VerdictBadge } from "@/components/game-art";
import { AlertIcon, ArrowIcon, MonitorIcon, TargetIcon } from "@/components/icons";
import { useLocale } from "@/components/locale-provider";
import { useSpecs } from "@/components/specs-provider";
import { QUALITIES, effectiveTarget, evaluateGame, fpsGrid, fpsTone } from "@/lib/engine";
import { formatSteamPlayers, steamCoverUrl, STEAM_SNAPSHOT } from "@/lib/steam";
import type { ComponentCheck, Game, GameWarning } from "@/lib/types";
import { artBackground, glow, initials, presetLabel } from "@/lib/ui";

const STATUS_CLASS: Record<ComponentCheck["status"], string> = {
  recommended: "text-accent",
  minimum: "text-amber-300",
  below: "text-rose-300",
};

const STATUS_BAR: Record<ComponentCheck["status"], string> = {
  recommended: "bg-accent",
  minimum: "bg-amber-400",
  below: "bg-rose-400",
};

export function GameDetail({ game, similar }: { game: Game; similar: Game[] }) {
  const { t, locale } = useLocale();
  const { resolved, specs } = useSpecs();

  const result = useMemo(
    () => evaluateGame(game, resolved, specs.targetFps),
    [game, resolved, specs.targetFps],
  );
  const grid = useMemo(() => fpsGrid(game, resolved), [game, resolved]);
  const similarResults = useMemo(
    () => similar.map((item) => evaluateGame(item, resolved, specs.targetFps)),
    [similar, resolved, specs.targetFps],
  );

  const cover = game.cover ?? steamCoverUrl(game.steamAppId);
  const summary = locale === "pt-BR" ? (game.summaryPt ?? game.summary) : game.summary;
  const targetLabel = `${specs.targetFps} FPS`;
  const toneTarget = effectiveTarget(game, specs.targetFps);
  const resolutionLabel =
    specs.maxResolution === 2160 ? "4K" : `${specs.maxResolution}p`;
  const bottleneckList = result.bottlenecks.map((bottleneck) => t.bottlenecks[bottleneck]);
  const bottleneckJoin = locale === "pt-BR" ? " e " : " and ";

  const warningText = (warning: GameWarning) => {
    if (warning.key === "storage") {
      return t.warnings.storage(warning.need, warning.have);
    }
    if (warning.key === "vram") return t.warnings.vram(warning.need);
    if (warning.key === "ram") return t.warnings.ram(warning.need);
    return t.warnings.integrated;
  };

  return (
    <div className="container-x py-8">
      <BackLink href="/games">{t.detail.allGames}</BackLink>

      {/* Hero */}
      <div className="relative mt-5 overflow-hidden rounded-3xl border border-white/10">
        <div className="absolute inset-0" style={{ background: artBackground(game.hue) }} />
        {cover ? (
          <Image
            src={cover}
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/80 to-ink-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/15 to-transparent" />
        {!cover ? (
          <>
            <div
              className="absolute inset-0 opacity-[0.13]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(115deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 16px)",
              }}
            />
            <div
              className="absolute -right-20 -top-24 h-80 w-80 opacity-60 blur-3xl"
              style={{ background: glow(game.hue) }}
            />
            <span className="pointer-events-none absolute -bottom-10 right-4 select-none text-[10rem] font-black leading-none tracking-tighter text-white/[0.06] md:text-[15rem]">
              {initials(game.title)}
            </span>
          </>
        ) : null}

        <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/60">
              <span className="rounded-full border border-white/15 bg-black/20 px-2.5 py-1 backdrop-blur-sm">
                {game.year}
              </span>
              <span className="rounded-full border border-white/15 bg-black/20 px-2.5 py-1 backdrop-blur-sm">
                {game.developer}
              </span>
              {game.genres.slice(0, 3).map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-white/55 backdrop-blur-sm"
                >
                  {t.genres[genre] ?? genre}
                </span>
              ))}
            </div>

            <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.03em] drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)] md:text-5xl">
              {game.title}
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/65">
              {summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-lg border border-white/15 bg-black/25 px-2.5 py-1.5 text-white/60 backdrop-blur-sm">
                {t.detail.minGpu}{" "}
                <span className="text-white/85">{game.min.gpu.split(" / ")[0]}</span>
              </span>
              <span className="rounded-lg border border-white/15 bg-black/25 px-2.5 py-1.5 text-white/60 backdrop-blur-sm">
                <span className="text-white/85">{game.min.storage} GB</span>{" "}
                {t.detail.install}
              </span>
              <span className="rounded-lg border border-white/15 bg-black/25 px-2.5 py-1.5 text-white/85 backdrop-blur-sm">
                {game.fpsCap ? t.detail.cap(game.fpsCap) : t.detail.uncapped}
              </span>
              {game.steamPlayers ? (
                <span
                  title={t.detail.snapshot(STEAM_SNAPSHOT)}
                  className="rounded-lg border border-white/15 bg-black/25 px-2.5 py-1.5 text-white/60 backdrop-blur-sm"
                >
                  <span className="text-white/85">
                    {formatSteamPlayers(game.steamPlayers, locale)}
                  </span>{" "}
                  {t.detail.playingOnSteam}
                </span>
              ) : null}
            </div>
          </div>

          {/* Verdict card */}
          <div className="rounded-2xl border border-white/15 bg-black/45 p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <VerdictBadge verdict={result.verdict} />
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/35">
                {t.detail.estimate}
              </span>
            </div>

            <div className="mt-5 flex items-end gap-2">
              <span className="text-6xl font-semibold leading-none tracking-tighter tabular-nums">
                {result.verdict === "no" ? "—" : result.fps}
              </span>
              <span className="pb-1.5 text-sm text-white/45">{t.detail.fps}</span>
            </div>

            <p className="mt-2 text-sm text-white/60">
              {result.verdict === "no"
                ? t.detail.belowMin
                : result.preset
                  ? t.detail.atPreset(
                      presetLabel(
                        result.preset.resolution,
                        t.qualities[result.preset.quality],
                      ),
                    )
                  : "—"}
            </p>

            <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs">
              <p className="flex items-start gap-2 text-white/50">
                <TargetIcon size={13} className="mt-0.5 shrink-0 text-accent/70" />
                {t.detail.target(specs.targetFps, resolutionLabel)}
              </p>
              <p className="flex items-start gap-2 text-white/50">
                <MonitorIcon size={13} className="mt-0.5 shrink-0 text-accent/70" />
                {bottleneckList.length > 0
                  ? t.detail.limitedBy(bottleneckList.join(bottleneckJoin))
                  : t.detail.noBottleneck}
              </p>
            </div>

            <Link
              href="/#rig"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-2 text-xs font-medium text-white/80 transition hover:border-accent/40 hover:text-white"
            >
              {t.detail.change}
              <ArrowIcon size={13} />
            </Link>
          </div>
        </div>
      </div>

      {result.warnings.length > 0 ? (
        <div className="mt-4 space-y-2">
          {result.warnings.map((warning) => (
            <p
              key={warning.key}
              className="flex items-start gap-2 rounded-xl border border-amber-400/20 bg-amber-400/[0.05] px-4 py-3 text-xs text-amber-100/80"
            >
              <AlertIcon size={14} className="mt-0.5 shrink-0 text-amber-300" />
              {warningText(warning)}
            </p>
          ))}
        </div>
      ) : null}

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* Your hardware */}
        <section className="min-w-0 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 md:p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-base font-medium tracking-tight">{t.detail.yourPc}</h2>
            <span className="font-mono text-[10px] text-white/30">
              {t.detail.recommended100}
            </span>
          </div>

          <div className="mt-4 divide-y divide-white/[0.06]">
            {result.checks.map((check) => (
              <div key={check.key} className="py-3.5 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-white/50">{t.checks[check.key]}</span>
                  <span className={`text-[11px] font-medium ${STATUS_CLASS[check.status]}`}>
                    {t.status[check.status]}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-white/85">{check.yours}</p>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.07]">
                  <div
                    className={`h-full rounded-full ${STATUS_BAR[check.status]}`}
                    style={{
                      width: `${Math.min(100, Math.max(4, check.ratio * 100))}%`,
                      opacity: 0.85,
                    }}
                  />
                </div>
                <p className="mt-1.5 truncate text-[10px] text-white/30">
                  {t.detail.minRec(check.minimum, check.recommended)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FPS grid */}
        <section className="min-w-0 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 md:p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-base font-medium tracking-tight">{t.detail.frameRate}</h2>
            <span className="font-mono text-[10px] text-white/30">
              {t.detail.avgNative}
            </span>
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-white/[0.08]">
            <div className="grid grid-cols-[56px_repeat(4,1fr)] bg-white/[0.03]">
              <span />
              {QUALITIES.map((quality) => (
                <span
                  key={quality}
                  className="py-2 text-center font-mono text-[10px] uppercase tracking-wider text-white/35"
                >
                  {quality === "Medium"
                    ? locale === "pt-BR"
                      ? "Méd"
                      : "Med"
                    : t.qualities[quality]}
                </span>
              ))}
            </div>

            {grid.map((row) => (
              <div
                key={row.resolution}
                className="grid grid-cols-[56px_repeat(4,1fr)] border-t border-white/[0.06]"
              >
                <span className="flex items-center px-2 font-mono text-[10px] text-white/35">
                  {row.label}
                </span>
                {row.cells.map((cell) => {
                  const tone = fpsTone(cell.fps, toneTarget);
                  return (
                    <div
                      key={cell.quality}
                      className={`border-l border-white/[0.06] px-1 py-2.5 text-center ${
                        tone === "great"
                          ? "bg-accent/[0.08] text-accent"
                          : tone === "good"
                            ? "text-emerald-300/90"
                            : tone === "ok"
                              ? "text-amber-300/90"
                              : "text-rose-300/70"
                      }`}
                    >
                      <span className="text-sm font-medium tabular-nums">{cell.fps}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <p className="mt-3 text-[11px] leading-relaxed text-white/30">
            {game.fpsCap && game.fpsCap < specs.targetFps
              ? t.detail.aimingCap(specs.targetFps, game.fpsCap)
              : t.detail.aiming(specs.targetFps)}
            {t.detail.upscaling}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-[10px] text-white/30">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {t.detail.hitsTarget}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {t.detail.close}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> {t.detail.thirty}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400" /> {t.detail.rough}
            </span>
          </div>
        </section>
      </div>

      {/* Requirements */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">{t.detail.official}</h2>
        <p className="mt-1.5 text-sm text-white/40">{t.detail.officialBody}</p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <RequirementCard
            title={t.detail.minimum}
            requirement={game.min}
            accent={false}
          />
          <RequirementCard
            title={t.detail.recommended}
            requirement={game.rec}
            accent
          />
        </div>
      </section>

      {/* Similar */}
      <section className="mt-14">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">{t.detail.similar}</h2>
            <p className="mt-1.5 text-sm text-white/40">{t.detail.similarBody}</p>
          </div>
          <Link
            href="/games"
            className="hidden items-center gap-1 text-xs text-white/40 transition hover:text-white sm:flex"
          >
            {t.detail.allGames} <ArrowIcon size={13} />
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {similarResults.map((item) => (
            <GameCard key={item.game.slug} result={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

function RequirementCard({
  title,
  requirement,
  accent,
}: {
  title: string;
  requirement: Game["min"];
  accent: boolean;
}) {
  const { t } = useLocale();
  const rows = [
    { label: t.detail.requirements.cpu, value: requirement.cpu },
    { label: t.detail.requirements.gpu, value: requirement.gpu },
    { label: t.detail.requirements.ram, value: `${requirement.ram} GB` },
    { label: t.detail.requirements.vram, value: `${requirement.vram} GB` },
    { label: t.detail.requirements.storage, value: `${requirement.storage} GB` },
  ];

  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent
          ? "border-accent/20 bg-accent/[0.04]"
          : "border-white/[0.08] bg-white/[0.02]"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`h-1.5 w-1.5 rounded-full ${accent ? "bg-accent" : "bg-white/30"}`}
        />
        <h3
          className={`font-mono text-[11px] uppercase tracking-[0.16em] ${
            accent ? "text-accent/80" : "text-white/45"
          }`}
        >
          {title}
        </h3>
      </div>

      <dl className="mt-4 space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[96px_1fr] gap-3 text-sm">
            <dt className="font-mono text-[10px] uppercase tracking-wider text-white/30">
              {row.label}
            </dt>
            <dd className="min-w-0 text-white/75">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
