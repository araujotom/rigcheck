/**
 * Absolute origin used for canonical links, sitemap entries and social images.
 *
 * `NEXT_PUBLIC_SITE_URL` wins when set (custom domain, other hosts). On Netlify
 * the build environment exposes the site's primary address as `URL`, so a
 * first deploy gets the right canonical origin without extra configuration.
 * The localhost fallback only exists so local builds and previews have a valid
 * absolute URL.
 */
const FALLBACK_SITE_URL = process.env.URL ?? "http://localhost:3000";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL
).replace(/\/+$/, "");

export const SITE_NAME = "RigCheck";

export const SITE_TAGLINE = "Can your PC run it?";
