/**
 * Absolute origin used for canonical links, sitemap entries and social images.
 *
 * Set `NEXT_PUBLIC_SITE_URL` in production (for example
 * `https://rigcheck.app`). The localhost fallback only exists so local builds
 * and previews have a valid absolute URL.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export const SITE_NAME = "RigCheck";

export const SITE_TAGLINE = "Can your PC run it?";
