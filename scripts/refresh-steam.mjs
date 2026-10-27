#!/usr/bin/env node
/**
 * Refresh the frozen Steam player snapshot in `lib/steam.ts`.
 *
 *   npm run refresh:steam          # fetch and write
 *   npm run refresh:steam -- --dry # fetch and report, no writes
 *
 * Uses Steam's public current-players endpoint, so no API key is needed.
 * Failed lookups keep the existing value instead of blanking the data.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STEAM_FILE = path.join(ROOT, "lib", "steam.ts");
const API =
  "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=";
const CONCURRENCY = 4;
const TIMEOUT_MS = 15_000;
const DRY_RUN = process.argv.includes("--dry");

const ENTRY =
  /^\s*"?([a-z0-9][a-z0-9-]*)"?:\s*\{\s*appId:\s*(\d+),\s*players:\s*(\d+)\s*\},?\s*$/gm;

function parseEntries(source) {
  return Array.from(source.matchAll(ENTRY), (match) => ({
    slug: match[1],
    appId: Number(match[2]),
    players: Number(match[3]),
  }));
}

async function fetchPlayers(appId) {
  const response = await fetch(`${API}${appId}`, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  // Steam answers with HTTP 404 *and* a JSON body for apps without public
  // stats (playtests, demos, region-locked titles). Read the body first so
  // that case can be told apart from a real HTTP failure.
  let body = null;
  try {
    body = await response.json();
  } catch {
    /* non-JSON error page */
  }

  if (body?.response?.result === 42) return null;
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const count = body?.response?.player_count;
  if (typeof count !== "number") throw new Error("no player_count in response");
  return count;
}

async function mapLimit(items, limit, task) {
  const results = new Array(items.length);
  let next = 0;

  async function worker() {
    while (next < items.length) {
      const index = next++;
      try {
        results[index] = { ok: true, value: await task(items[index]) };
      } catch (error) {
        results[index] = { ok: false, error };
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => worker()),
  );
  return results;
}

const source = await readFile(STEAM_FILE, "utf8");
const entries = parseEntries(source);

if (entries.length === 0) {
  console.error("No Steam entries found — did lib/steam.ts change shape?");
  process.exit(1);
}

console.log(
  `Refreshing ${entries.length} Steam app IDs${DRY_RUN ? " (dry run)" : ""}…`,
);

const outcomes = await mapLimit(entries, CONCURRENCY, (entry) =>
  fetchPlayers(entry.appId),
);

const players = new Map();
let changed = 0;
let failed = 0;
let unavailable = 0;

outcomes.forEach((outcome, index) => {
  const entry = entries[index];
  if (!outcome.ok) {
    failed += 1;
    players.set(entry.slug, entry.players);
    console.warn(`  ! ${entry.slug} (${entry.appId}): ${outcome.error.message}`);
    return;
  }

  if (outcome.value === null) {
    unavailable += 1;
    players.set(entry.slug, entry.players);
    console.warn(
      `  - ${entry.slug} (${entry.appId}): no public player stats, kept ${entry.players}`,
    );
    return;
  }

  players.set(entry.slug, outcome.value);
  if (outcome.value !== entry.players) changed += 1;
});

if (changed === 0 && failed === entries.length) {
  console.error("Every request failed — leaving lib/steam.ts untouched.");
  process.exit(1);
}

let next = source;
for (const entry of entries) {
  const value = players.get(entry.slug);
  if (value === undefined || value === entry.players) continue;

  const line = new RegExp(
    `(^\\s*"?${entry.slug}"?:\\s*\\{\\s*appId:\\s*${entry.appId},\\s*players:\\s*)\\d+`,
    "m",
  );
  next = next.replace(line, `$1${value}`);
}

if (changed > 0) {
  const today = new Date().toISOString().slice(0, 10);
  next = next.replace(
    /(export const STEAM_SNAPSHOT = ")\d{4}-\d{2}-\d{2}(";)/,
    `$1${today}$2`,
  );
}

const summary = `${changed} changed, ${failed} failed, ${unavailable} unavailable, ${
  entries.length - changed - failed - unavailable
} unchanged`;

if (DRY_RUN) {
  console.log(`Dry run: ${summary}.`);
} else {
  await writeFile(STEAM_FILE, next, "utf8");
  console.log(
    `Updated ${summary}. Snapshot date → ${new Date().toISOString().slice(0, 10)}.`,
  );
}
