# RigCheck

A "can I run it?" site that scores a curated game library against your actual
CPU, GPU, RAM and VRAM — no signup, no tracking, no accounts. Everything is
computed in the browser; the only network traffic is cover art.

Pick your parts and RigCheck returns a verdict per game (maxed out → won't run),
a recommended resolution/quality preset, an estimated frame rate, and the part
holding you back.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Self-hosted Inter and JetBrains Mono
- Fully static pages for the home page and all game detail pages

## Run locally

Node 20.9 or newer is required.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run typecheck      # tsc --noEmit
npm run build          # production build
npm start              # serve the production build
npm run refresh:steam  # update the Steam player snapshot (see below)
```

For production, set `NEXT_PUBLIC_SITE_URL` to the public origin (see
`.env.example`). It feeds canonical links, `sitemap.xml`, `robots.txt` and the
generated social images; without it the build falls back to
`http://localhost:3000`.

## How the estimate works

The core data lives in:

- `lib/hardware.ts` — relative 0–100 gaming scores for CPUs and GPUs, plus each
  part's VRAM, cores and year.
- `lib/games.ts` — 100+ games with minimum/recommended requirements, with those
  requirements mapped onto the same 0–100 score scale.
- `lib/steam.ts` — Steam app IDs, the frozen player-count snapshot and cover-art
  URL helper.
- `lib/i18n.ts` — English and Brazilian Portuguese UI copy.
- `lib/summaries-pt.ts` — optional Portuguese game summaries.

`lib/engine.ts` then:

1. Anchors each game to `fpsAtRecommended` (frames per second at 1080p / High on
   the recommended hardware).
2. Scales GPU throughput by the GPU score ratio and CPU throughput by the CPU
   score ratio, applying resolution, quality, VRAM and RAM factors.
3. Walks presets from 4K Ultra down to 720p Low and picks the most desirable one
   that still hits your target frame rate.
4. Assigns a verdict and lists the first component that falls short.

Frame-rate caps (for example, 60 FPS in Elden Ring) and per-game performance
anchors live alongside the game data.

This is intentionally a model, not a benchmark. Drivers, patches, upscaling and
background apps all move real-world numbers.

## Adding a game

Append an entry to `GAMES` in `lib/games.ts`:

```ts
g(
  "hollow-knight-silksong", // slug, also the URL
  "Hollow Knight: Silksong", // title
  2025, // release year
  "Team Cherry", // developer
  ["Metroidvania", "Action"], // genres
  210, // cover-art hue (0–360)
  "One-line summary shown on the detail page.",
  // minimum requirements
  {
    cpu: "Core i5-8400",
    cpuScore: 34,
    gpu: "GTX 1050 Ti",
    gpuScore: 11,
    ram: 8,
    vram: 4,
    storage: 20,
  },
  // recommended requirements
  {
    cpu: "Core i5-12400",
    cpuScore: 60,
    gpu: "RTX 2060",
    gpuScore: 25,
    ram: 16,
    vram: 6,
    storage: 20,
  },
  { cap: 60, fps: 90 }, // optional: FPS cap and 1080p/High anchor
);
```

Use scores from `lib/hardware.ts` where the exact part exists; otherwise pick the
closest tier. Game detail pages and the library are generated from this array, so
you don't need to touch the routing. The current FPS anchors are collected in the
`FPS_AT_RECOMMENDED` map at the bottom of the file if you want to tune a game
without touching its entry.

If the game is on Steam, add an entry to `STEAM_DATA` in `lib/steam.ts`:

```ts
"hollow-knight-silksong": { appId: 1030300, players: 12345 },
```

The app ID is used for the cover art and the player count feeds the "Most
played" sort. For a Portuguese summary, add the slug to
`SUMMARY_PT` in `lib/summaries-pt.ts`. Non-Steam games fall back to the generated
gradient artwork. Add `cover` to the optional `g()` options to use a local image
instead (VALORANT uses an official Riot key art in `public/covers/valorant.jpg`).
They sort after Steam titles by default; pass `popularity` to give one a manual
sort weight (VALORANT uses this too).

## Cover art and Steam popularity

Covers come from Steam's public CDN:

```text
https://cdn.akamai.steamstatic.com/steam/apps/{appId}/library_hero.jpg
```

`library_hero.jpg` is used for both cards and detail heroes because it exists for
every Steam title in the library; the narrower capsule image is missing for a
few older games. Non-Steam titles use a local image when `cover` is set, and the
generated gradient art otherwise. The Steam host is allowed in `next.config.ts`
under `images.remotePatterns`, so Next can optimize the remote images.

Player counts are a **frozen snapshot**, not a live feed. Refresh them with:

```bash
npm run refresh:steam
```

The script walks `STEAM_DATA`, calls Steam's public current-players endpoint
(`ISteamUserStats/GetNumberOfCurrentPlayers`), rewrites the `players` values and
sets `STEAM_SNAPSHOT` to today. Failed lookups, and apps Steam has no public
stats for, keep their previous value. Use
`npm run refresh:steam -- --dry` to see what would change without writing.

The UI shows that date under the results and library grids. The default result
filter is "Can run" and the default sort is "Most played"; both can be changed
from the controls.

## Language

The header has an `EN` / `PT` toggle. The choice is stored in
`localStorage` under `rigcheck.locale.v1`, can be shared with `?lang=pt-BR`, and
auto-detects Portuguese browsers on first visit. A small inline script sets the
document's `<html lang>` before first paint, and the React providers apply the
saved language and rig in a layout effect so the *selected rig* never flashes
its defaults. Game titles, hardware names and the official requirement strings
stay in their original form; everything else is translated. The wordmark is
localized too: **RigCheck** in English, **Dá pra rodar?** in Portuguese
(`Dictionary.brand`, split into plain + accent parts).

**Known limitation:** because the site is fully static and the server cannot
know the visitor's language, the prerendered HTML is always English. Portuguese
visitors see English text for the few milliseconds between first paint and
hydration. Fixing this properly needs route-based locales (`/pt/...`) or
cookie-based dynamic rendering; both trade away some of the static build.

## Adding hardware

Append to `CPUS` or `GPUS` in `lib/hardware.ts`:

```ts
{ id: "rtx-5060", name: "GeForce RTX 5060", brand: "NVIDIA", score: 31, vram: 8, year: 2025, kind: "discrete" }
```

Scores are relative (RTX 5090 = 100, Ryzen 7 9800X3D = 100). IDs are used in
share links, so keep them stable.

### Integrated graphics

The GPU list is split by `kind: "discrete" | "integrated"`, and the picker groups
them as **Discrete graphics** / **Integrated graphics** (`Gráficos dedicados` /
`Gráficos integrados` in Portuguese). The integrated entries track the top of the
Steam Hardware Survey (September 2026), including the generic buckets players
actually show up in — "AMD Radeon Graphics", "AMD Radeon(TM) Graphics", Intel
UHD/Iris Xe, Radeon 780M/760M/680M/740M, Vega 8/7/6/3 and Intel Arc Graphics.
The generic buckets are represented by family-level cards, not guessed models.

Two behaviours matter when editing this list:

1. **APUs link to their iGPU.** A CPU can carry `igpu: "vega-7"`. Selecting that
   CPU (for example the Ryzen 5 5600G) switches the GPU to its integrated chip
   when the current GPU is integrated or still the default RTX 3060. A dGPU the
   visitor picked explicitly is kept.
2. **Integrated GPUs use shared memory.** Their `vram` value is a nominal
   minimum, not a hard limit. At runtime the app derives
   `min(8, max(nominal, floor(systemRam / 4)))` and shows it as
   `(shared)` / `(compartilhada)`. The engine skips the VRAM hard-fail for these
   chips and shows a warning about shared system memory and dual-channel RAM
   instead.

GPU auto-detection normalises WebGL renderer strings (stripping `(R)`, `(TM)`,
parentheticals and "Graphics"). When a string is clearly an iGPU but has no model
number, the app reports "integrated graphics detected" and asks the visitor to
pick the closest chip rather than guessing.

Scores for iGPUs are approximate: they vary with memory speed, channel count and
the laptop's power limit, so treat them as a tier, not a precise benchmark.

## State and sharing

The selected rig is stored in `localStorage` under `rigcheck.specs.v1` and
mirrored into the home page URL
(`?cpu=…&gpu=…&ram=…&vram=…&storage=…&res=…&fps=…`). Game pages keep clean,
canonical URLs. "Share rig" always copies a home-page link with the current rig,
so the recipient sees the same results.

## SEO and sharing

- Every page sets a canonical URL (`/`, `/games`, `/games/{slug}`), so rig and
  language query parameters never create duplicate pages.
- `app/sitemap.ts` lists the home page, the library and every game;
  `app/robots.ts` allows crawling and points at the sitemap.
- `app/opengraph-image.tsx` and `app/games/[slug]/opengraph-image.tsx` generate
  1200×630 social cards at build time.
- Game pages embed `VideoGame` JSON-LD (title, developer, year, genres, image).

## Deploy

The app has no server dependencies. It deploys to Netlify as a normal Next.js
site: Netlify installs its OpenNext adapter automatically, so there is no plugin
to add or version to pin. `netlify.toml` sets the build command, the `.next`
publish directory and Node 22.

Netlify exposes the site's primary address as `URL` during the build, and
`lib/site.ts` uses it automatically, so a first Git deploy gets correct canonical
links without extra setup. `NEXT_PUBLIC_SITE_URL` overrides it when you want to
force an origin (or on a host that does not provide `URL`). Both values are
inlined at build time, so changing them requires a redeploy.

### Git integration

Push the project to GitHub, GitLab or Bitbucket, then choose **Add new site →
Import an existing project** in the Netlify dashboard. Netlify detects Next.js
from `package.json` and uses `netlify.toml` for the build settings. Later pushes
redeploy automatically. Optionally set `NEXT_PUBLIC_SITE_URL` under **Site
configuration → Environment variables** if you want to override the detected
URL.

### Netlify CLI

`npx` downloads the CLI on demand.

```bash
npx netlify-cli login
npx netlify-cli sites:create --name rigcheck
npx netlify-cli link --name rigcheck
npx netlify-cli env:set NEXT_PUBLIC_SITE_URL https://rigcheck.netlify.app
npx netlify-cli deploy --build --prod
```

Replace `rigcheck` with a free site name and use the exact URL Netlify assigns.
If `sites:create` already linked the folder, `link` just confirms it. The
`env:set` step is optional but makes the canonical origin explicit for locally
built CLI deploys. To update the site later, run the last command again.

### After the first deploy

- Check `/`, a game page, `/sitemap.xml`, `/robots.txt`, an Open Graph image
  (`/opengraph-image` or `/games/{slug}/opengraph-image`) and a missing URL
  (the 404 page).
- Confirm Steam cover art loads; images are optimized through Netlify's Image
  CDN using the remote pattern in `next.config.ts`.
- When you attach a custom domain, Netlify's `URL` follows it on the next build.
  Redeploy, and update `NEXT_PUBLIC_SITE_URL` too if you set an explicit override.

Any other Node host works too: `npm run build && npm start`.
