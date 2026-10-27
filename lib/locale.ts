import type { Locale } from "@/lib/i18n";

export const LOCALE_STORAGE_KEY = "rigcheck.locale.v1";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "pt-BR";
}

/**
 * Resolve the locale from `?lang`, then localStorage, then the browser.
 *
 * Keep this in sync with `LOCALE_BOOT_SCRIPT`: the inline script runs before
 * first paint so `<html lang>` is already correct when the page appears.
 */
export function resolveLocale(): Locale {
  if (typeof window === "undefined") return "en";

  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get("lang");
  if (urlLang === "pt" || urlLang === "pt-BR") return "pt-BR";
  if (urlLang === "en") return "en";

  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    /* private mode */
  }

  return navigator.language?.toLowerCase().startsWith("pt") ? "pt-BR" : "en";
}

/**
 * Runs before the body is parsed, so the document language is right before
 * hydration instead of after a language effect.
 */
export const LOCALE_BOOT_SCRIPT = `(function(){try{
var p=new URLSearchParams(window.location.search).get("lang");
var s=null;try{s=window.localStorage.getItem(${JSON.stringify(LOCALE_STORAGE_KEY)})}catch(e){}
var l=p==="pt"||p==="pt-BR"?"pt-BR":p==="en"?"en":(s==="pt-BR"||s==="en"?s:((navigator.language||"").toLowerCase().indexOf("pt")===0?"pt-BR":"en"));
var r=document.documentElement;r.lang=l;r.setAttribute("data-locale",l);
}catch(e){}})();`;
