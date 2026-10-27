"use client";

import Link from "next/link";
import { Results } from "@/components/results";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { SpecBuilder } from "@/components/spec-builder";
import { ArrowIcon, CpuIcon, GpuIcon } from "@/components/icons";
import { useLocale } from "@/components/locale-provider";
import { CPUS, GPUS } from "@/lib/hardware";
import { GAME_COUNT } from "@/lib/games";

export function HomePage() {
  const { t } = useLocale();
  const [titleLine1, titleLine2, titleAccent, titleAfter] = t.home.title;

  return (
    <>
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden pb-14 pt-16 md:pb-20 md:pt-24">
          <div className="pointer-events-none absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_at_50%_0%,black_10%,transparent_70%)]" />
          <div className="pointer-events-none absolute left-1/2 top-[-18rem] h-[36rem] w-[56rem] -translate-x-1/2 rounded-full bg-accent/[0.09] blur-[120px]" />
          <div className="pointer-events-none absolute right-0 top-40 h-72 w-72 rounded-full bg-violet-500/[0.07] blur-[100px]" />

          <div className="container-x relative">
            <div className="mx-auto max-w-4xl text-center">
              <div className="rise inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                  {t.home.badge(GAME_COUNT)}
                </span>
              </div>

              <h1 className="rise rise-1 mt-7 text-balance text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.03em] sm:text-6xl md:text-7xl">
                {titleLine1}
                <br className="hidden sm:block" /> {titleLine2}{" "}
                <span className="relative whitespace-nowrap text-accent">
                  {titleAccent}
                  <svg
                    aria-hidden
                    viewBox="0 0 300 12"
                    className="absolute -bottom-2 left-0 h-2.5 w-full text-accent/35"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 9C60 3 120 2 180 5c40 2 80 3 118 1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                {titleAfter}
              </h1>

              <p className="rise rise-2 mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-white/55 md:text-lg">
                {t.home.subtitle}
              </p>

              <div className="rise rise-3 mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="#rig"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink-950 transition hover:bg-accent-soft"
                >
                  {t.home.build}
                  <ArrowIcon size={16} className="transition group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/games"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white"
                >
                  {t.home.browse}
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] text-white/30">
                <span className="inline-flex items-center gap-1.5">
                  <CpuIcon size={13} /> {t.home.cpus(CPUS.length)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <GpuIcon size={13} /> {t.home.gpus(GPUS.length)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  {t.home.browser}
                </span>
              </div>
            </div>
          </div>
        </section>

        <SpecBuilder />
        <Results />

        <section id="how" className="container-x scroll-mt-24 pt-24">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
              {t.home.how}
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              {t.home.howTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/45">
              {t.home.howBody}
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {t.home.steps.map((item, index) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition hover:border-white/15 hover:bg-white/[0.035]"
              >
                <span className="font-mono text-[11px] text-accent/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-medium tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-amber-400/15 bg-amber-400/[0.035] p-5">
            <h3 className="text-sm font-medium text-amber-200/90">
              {t.home.notTitle}
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/45">
              {t.home.notBody}
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
