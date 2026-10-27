"use client";

import { useMemo, useState } from "react";
import { GameCard } from "@/components/game-card";
import { SearchIcon } from "@/components/icons";
import { useLocale } from "@/components/locale-provider";
import { useSpecs } from "@/components/specs-provider";
import { evaluateAll } from "@/lib/engine";
import { GAMES } from "@/lib/games";
import { STEAM_SNAPSHOT } from "@/lib/steam";
import type { Verdict } from "@/lib/types";
import { VERDICT_ORDER, VERDICT_RANK, demand, popularityOrder } from "@/lib/ui";

type Filter = "all" | "runnable" | Verdict;
type Sort = "popular" | "match" | "new" | "az";

const STATS: { key: Verdict; className: string }[] = [
  { key: "maxed", className: "text-accent" },
  { key: "great", className: "text-emerald-300" },
  { key: "playable", className: "text-sky-300" },
  { key: "weak", className: "text-amber-300" },
  { key: "no", className: "text-rose-300" },
];

export function Results() {
  const { t } = useLocale();
  const { resolved, specs } = useSpecs();
  const [filter, setFilter] = useState<Filter>("runnable");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("popular");

  const results = useMemo(
    () => evaluateAll(GAMES, resolved, specs.targetFps),
    [resolved, specs.targetFps],
  );

  const counts = useMemo(() => {
    const base: Record<Filter, number> = {
      all: results.length,
      runnable: 0,
      maxed: 0,
      great: 0,
      playable: 0,
      weak: 0,
      no: 0,
    };
    for (const result of results) {
      base[result.verdict] += 1;
      if (result.verdict !== "no") base.runnable += 1;
    }
    return base;
  }, [results]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = results.filter((result) => {
      if (filter === "runnable" && result.verdict === "no") return false;
      if (filter !== "all" && filter !== "runnable" && result.verdict !== filter) {
        return false;
      }
      if (!q) return true;
      const genreText = result.game.genres
        .map((genre) => `${genre} ${t.genres[genre] ?? ""}`)
        .join(" ");
      return `${result.game.title} ${result.game.developer} ${genreText}`
        .toLowerCase()
        .includes(q);
    });

    return filtered.sort((a, b) => {
      if (sort === "new") return b.game.year - a.game.year;
      if (sort === "az") return a.game.title.localeCompare(b.game.title);
      if (sort === "match") {
        return (
          VERDICT_RANK[b.verdict] - VERDICT_RANK[a.verdict] ||
          demand(b.game) - demand(a.game) ||
          b.game.year - a.game.year
        );
      }
      return (
        popularityOrder(b.game) - popularityOrder(a.game) ||
        VERDICT_RANK[b.verdict] - VERDICT_RANK[a.verdict] ||
        b.game.year - a.game.year
      );
    });
  }, [results, filter, query, sort, t]);

  const greatOrBetter = counts.maxed + counts.great;
  const offTarget = counts.weak + counts.no;
  const resLabel = specs.maxResolution === 2160 ? "4K" : `${specs.maxResolution}p`;

  return (
    <section id="results" className="container-x scroll-mt-24 pt-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent/70">
            {t.results.step}
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            {t.results.headline(greatOrBetter)}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/45">
            {t.results.summary(
              counts.playable,
              offTarget,
              resolved.gpuName,
              resolved.cpuName,
              specs.ram,
              specs.targetFps,
              resLabel,
            )}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {STATS.map((stat) => (
            <button
              key={stat.key}
              type="button"
              onClick={() =>
                setFilter(filter === stat.key ? "runnable" : stat.key)
              }
              className={`rounded-xl border px-3.5 py-2 text-left transition ${
                filter === stat.key
                  ? "border-white/25 bg-white/[0.07]"
                  : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <span
                className={`block text-lg font-semibold leading-none tabular-nums ${stat.className}`}
              >
                {counts[stat.key]}
              </span>
              <span className="mt-1 block text-[10px] uppercase tracking-wide text-white/35">
                {t.verdicts[stat.key]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="sticky top-16 z-30 -mx-5 mt-8 border-y border-white/[0.07] bg-ink-950/85 px-5 py-3 backdrop-blur-xl md:-mx-8 md:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-1 overflow-x-auto pb-1 lg:pb-0">
            <FilterTab active={filter === "runnable"} onClick={() => setFilter("runnable")}>
              {t.results.runnable}{" "}
              <span className="text-white/30">{counts.runnable}</span>
            </FilterTab>
            <FilterTab active={filter === "all"} onClick={() => setFilter("all")}>
              {t.results.all} <span className="text-white/30">{counts.all}</span>
            </FilterTab>
            {VERDICT_ORDER.map((verdict) => (
              <FilterTab
                key={verdict}
                active={filter === verdict}
                onClick={() => setFilter(verdict)}
              >
                {t.verdicts[verdict]}{" "}
                <span className="text-white/30">{counts[verdict]}</span>
              </FilterTab>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label className="relative flex-1 lg:w-56">
              <SearchIcon
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                aria-label={t.results.searchAria}
                placeholder={t.results.searchPlaceholder}
                className="h-9 w-full rounded-lg border border-white/10 bg-white/[0.03] pl-8 pr-3 text-xs text-white placeholder:text-white/30 focus:border-accent/40 focus:outline-none"
              />
            </label>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as Sort)}
              aria-label={t.results.sortAria}
              className="h-9 rounded-lg border border-white/10 bg-white/[0.03] px-2 text-xs text-white/70 focus:border-accent/40 focus:outline-none"
            >
              <option value="popular">{t.sort.popular}</option>
              <option value="match">{t.sort.match}</option>
              <option value="new">{t.sort.new}</option>
              <option value="az">{t.sort.az}</option>
            </select>
          </div>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-white/10 py-16 text-center">
          <p className="text-sm text-white/50">{t.results.noResults}</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("runnable");
            }}
            className="mt-3 text-xs text-accent underline underline-offset-4"
          >
            {t.results.clear}
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((result, index) => (
            <GameCard key={result.game.slug} result={result} eager={index < 4} />
          ))}
        </div>
      )}

      <div className="mt-8 space-y-1 text-center text-[11px] text-white/25">
        <p>{t.results.disclaimer}</p>
        <p>{t.results.snapshot(STEAM_SNAPSHOT)}</p>
      </div>
    </section>
  );
}

function FilterTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs transition ${
        active
          ? "bg-white/10 font-medium text-white"
          : "text-white/45 hover:bg-white/[0.05] hover:text-white/80"
      }`}
    >
      {children}
    </button>
  );
}
