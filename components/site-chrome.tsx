"use client";

import Link from "next/link";
import { CpuIcon, GlobeIcon } from "@/components/icons";
import { useLocale } from "@/components/locale-provider";

/**
 * The product wordmark. English keeps "RigCheck"; Portuguese uses
 * "Dá pra rodar?", which is longer, so it drops a size on narrow screens.
 */
function Wordmark() {
  const { locale, t } = useLocale();
  const [plain, accent] = t.brand;

  return (
    <span
      className={`whitespace-nowrap font-semibold tracking-tight ${
        locale === "pt-BR" ? "text-[13px] sm:text-[15px]" : "text-[15px]"
      }`}
    >
      {plain}
      <span className="text-accent">{accent}</span>
    </span>
  );
}

export function SiteHeader() {
  const { locale, t, toggleLocale } = useLocale();
  const switchLabel = locale === "pt-BR" ? t.nav.switchToEn : t.nav.switchToPt;

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-ink-950/80 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-ink-950 transition group-hover:rotate-6">
            <CpuIcon size={18} />
          </span>
          <Wordmark />
        </Link>

        <nav className="flex items-center gap-1 text-sm text-white/60">
          <Link
            href="/games"
            className="hidden rounded-full px-3 py-1.5 whitespace-nowrap transition hover:bg-white/5 hover:text-white sm:block"
          >
            {t.nav.browse}
          </Link>
          <Link
            href="/#how"
            className="hidden rounded-full px-3 py-1.5 whitespace-nowrap transition hover:bg-white/5 hover:text-white md:block"
          >
            {t.nav.how}
          </Link>
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={switchLabel}
            title={switchLabel}
            className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/55 transition hover:border-accent/40 hover:text-white sm:px-3"
          >
            <GlobeIcon size={13} />
            {locale === "pt-BR" ? "PT" : "EN"}
          </button>
          <Link
            href="/#rig"
            className="ml-1 whitespace-nowrap rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink-950 transition hover:bg-accent sm:ml-2 sm:px-4 sm:text-sm"
          >
            {t.nav.check}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className="mt-24 border-t border-white/[0.06] bg-ink-900/40">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-ink-950">
              <CpuIcon size={18} />
            </span>
            <Wordmark />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/45">
            {t.footer.blurb}
          </p>
        </div>

        <div className="text-sm">
          <p className="font-mono text-[11px] uppercase tracking-widest text-white/35">
            {t.footer.explore}
          </p>
          <ul className="mt-4 space-y-2.5 text-white/55">
            <li>
              <Link href="/games" className="transition hover:text-white">
                {t.footer.allGames}
              </Link>
            </li>
            <li>
              <Link href="/#rig" className="transition hover:text-white">
                {t.footer.checkPc}
              </Link>
            </li>
            <li>
              <Link href="/#how" className="transition hover:text-white">
                {t.footer.howItWorks}
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="font-mono text-[11px] uppercase tracking-widest text-white/35">
            {t.footer.disclaimer}
          </p>
          <p className="mt-4 text-white/45">{t.footer.disclaimerBody}</p>
          <p className="mt-3 text-xs text-white/25">{t.footer.artwork}</p>
        </div>
      </div>
      <div className="border-t border-white/[0.06]">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-6 text-xs text-white/30 sm:flex-row sm:items-center">
          <p>{t.footer.copyright(new Date().getFullYear())}</p>
          <p className="font-mono">{t.footer.estimates}</p>
        </div>
      </div>
    </footer>
  );
}
