"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { GameCard } from "@/components/game-card";
import { SearchIcon } from "@/components/icons";
import { useLocale } from "@/components/locale-provider";
import { useSpecs } from "@/components/specs-provider";
import { evaluateAll } from "@/lib/engine";
import { GAMES } from "@/lib/games";
import { STEAM_SNAPSHOT } from "@/lib/steam";
import { VERDICT_RANK, demand, popularityOrder } from "@/lib/ui";

type Sort = "popular" | "match" | "new" | "az";

export function GameLibrary() {
  const { t } = useLocale();
  const { resolved, specs } = useSpecs();
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState<Sort>("popular");

  const genres = useMemo(() => {
    const counts = new Map<string, number>();
    for (const game of GAMES) {
      for (const tag of game.genres) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 16)
      .map(([name]) => name);
  }, []);

  const results = useMemo(
    () => evaluateAll(GAMES, resolved, specs.targetFps),
    [resolved, specs.targetFps],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = results.filter((result) => {
      if (genre !== "All" && !result.game.genres.includes(genre)) return false;
      if (!q) return true;
      const genreText = result.game.genres
        .map((tag) => `${tag} ${t.genres[tag] ?? ""}`)
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
          demand(b.game) - demand(a.game)
        );
      }
      return (
        popularityOrder(b.game) - popularityOrder(a.game) ||
        VERDICT_RANK[b.verdict] - VERDICT_RANK[a.verdict]
      );
    });
  }, [results, query, genre, sort, t]);

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.06] pb-10 pt-14">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-30 [mask-image:radial-gradient(ellipse_at_30%_0%,black_10%,transparent_65%)]" />
        <div className="container-x relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent/70">
            {t.library.eyebrow}
          </p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                {t.library.title(GAMES.length)}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/45">
                {t.library.body}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                {t.library.yourRig}
              </p>
              <p className="mt-1 text-white/75">{resolved.gpuName}</p>
              <p className="text-white/45">
                {resolved.cpuName} · {specs.ram} GB RAM
              </p>
              <Link
                href="/#rig"
                className="mt-2 inline-block text-[11px] text-accent underline underline-offset-4"
              >
                {t.library.change}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setGenre("All")}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                genre === "All"
                  ? "border-accent/50 bg-accent/10 text-accent"
                  : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/25 hover:text-white"
              }`}
            >
              {t.library.all}
            </button>
            {genres.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setGenre(tag)}
                className={`rounded-full border px-3 py-1.5 text-xs transition ${
                  genre === tag
                    ? "border-accent/50 bg-accent/10 text-accent"
                    : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/25 hover:text-white"
                }`}
              >
                {t.genres[tag] ?? tag}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="relative w-full sm:w-72">
              <SearchIcon
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                aria-label={t.library.searchAria}
                placeholder={t.library.searchPlaceholder}
                className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus:border-accent/40 focus:outline-none"
              />
            </label>

            <div className="flex items-center gap-3">
              <span className="text-xs text-white/30">
                {t.library.shown(visible.length)}
              </span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as Sort)}
                aria-label={t.library.sortAria}
                className="h-10 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-xs text-white/70 focus:border-accent/40 focus:outline-none"
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
          <div className="mt-12 rounded-2xl border border-dashed border-white/10 py-20 text-center">
            <p className="text-sm text-white/50">{t.library.noResults}</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setGenre("All");
              }}
              className="mt-3 text-xs text-accent underline underline-offset-4"
            >
              {t.library.reset}
            </button>
          </div>
        ) : (
          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((result, index) => (
              <GameCard key={result.game.slug} result={result} eager={index < 4} />
            ))}
          </div>
        )}

        <p className="mt-8 text-center text-[11px] text-white/25">
          {t.results.snapshot(STEAM_SNAPSHOT)}
        </p>
      </section>
    </>
  );
}
