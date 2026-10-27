"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { steamCoverUrl } from "@/lib/steam";
import type { Verdict } from "@/lib/types";
import { VERDICT_META, artBackground, glow } from "@/lib/ui";

export function VerdictBadge({
  verdict,
  size = "md",
  className = "",
}: {
  verdict: Verdict;
  size?: "sm" | "md";
  className?: string;
}) {
  const { t } = useLocale();
  const meta = VERDICT_META[verdict];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium backdrop-blur-md ${
        meta.bg
      } ${meta.border} ${meta.text} ${
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"
      } ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {t.verdicts[verdict]}
    </span>
  );
}

export function GameArt({
  title,
  year,
  hue,
  appId,
  cover,
  verdict,
  className = "",
  compact = false,
  eager = false,
}: {
  title: string;
  year: number;
  hue: number;
  appId?: number;
  cover?: string;
  verdict?: Verdict;
  className?: string;
  compact?: boolean;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const coverSrc = cover ?? steamCoverUrl(appId);
  const showCover = Boolean(coverSrc) && !failed;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: artBackground(hue) }}
    >
      {showCover ? (
        <Image
          src={coverSrc!}
          alt=""
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          loading={eager ? "eager" : "lazy"}
          className="object-cover transition duration-700 group-hover:scale-[1.035]"
          onError={() => setFailed(true)}
        />
      ) : (
        <>
          <div
            className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 opacity-70 blur-3xl"
            style={{ background: glow(hue) }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(115deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 14px)",
            }}
          />
        </>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/5" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" />

      <div className="relative flex h-full flex-col justify-between p-4">
        <div className="flex items-start justify-between gap-2">
          {verdict ? <VerdictBadge verdict={verdict} size="sm" /> : <span />}
          <span className="rounded-full border border-white/10 bg-black/30 px-2 py-0.5 font-mono text-[10px] text-white/70 backdrop-blur-sm">
            {year}
          </span>
        </div>
        <div>
          <h3
            className={`max-w-[92%] font-semibold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] ${
              compact ? "text-lg" : "text-xl"
            }`}
          >
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}

export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm text-white/50 transition hover:text-white"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </Link>
  );
}
