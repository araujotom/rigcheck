"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DICTIONARIES, type Dictionary, type Locale } from "@/lib/i18n";
import { LOCALE_STORAGE_KEY, resolveLocale } from "@/lib/locale";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

interface LocaleContextValue {
  locale: Locale;
  t: Dictionary;
  hydrated: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [hydrated, setHydrated] = useState(false);

  // Apply the saved/browser locale before paint. The server can only render
  // English, so doing this in an effect after paint would show a visible swap.
  useIsomorphicLayoutEffect(() => {
    setLocaleState(resolveLocale());
    setHydrated(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "pt-BR" ? "pt-BR" : "en";
    document.documentElement.dataset.locale = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* private mode */
    }

    const url = new URL(window.location.href);
    if (next === "pt-BR") url.searchParams.set("lang", "pt-BR");
    else url.searchParams.delete("lang");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "pt-BR" ? "en" : "pt-BR");
  }, [locale, setLocale]);

  const t = DICTIONARIES[locale];

  const value = useMemo(
    () => ({ locale, t, hydrated, setLocale, toggleLocale }),
    [locale, t, hydrated, setLocale, toggleLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
