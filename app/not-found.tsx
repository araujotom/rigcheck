"use client";

import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ArrowIcon } from "@/components/icons";
import { useLocale } from "@/components/locale-provider";

export default function NotFound() {
  const { t } = useLocale();

  return (
    <>
      <SiteHeader />
      <main className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent/70">
          {t.notFound.eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          {t.notFound.title}
        </h1>
        <p className="mt-3 max-w-md text-sm text-white/45">{t.notFound.body}</p>
        <Link
          href="/games"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink-950 transition hover:bg-accent-soft"
        >
          {t.notFound.browse}
          <ArrowIcon size={16} />
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
