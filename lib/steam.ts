/**
 * Steam metadata snapshot.
 *
 * App IDs power the cover art; player counts are a frozen snapshot from Steam's
 * public current-players endpoint, not a live feed. Refresh the numbers when
 * they start to feel stale; the steps are in the README.
 */
export const STEAM_SNAPSHOT = "2026-10-27";

export interface SteamGame {
  appId: number;
  players: number;
}

export const STEAM_DATA: Record<string, SteamGame> = {
  "cyberpunk-2077": { appId: 1091500, players: 147536 },
  "elden-ring": { appId: 1245620, players: 28638 },
  "baldurs-gate-3": { appId: 1086940, players: 36403 },
  "red-dead-redemption-2": { appId: 1174180, players: 37757 },
  "gta-v": { appId: 271590, players: 64861 },
  "the-witcher-3": { appId: 292030, players: 50868 },
  "counter-strike-2": { appId: 730, players: 1132096 },
  "dota-2": { appId: 570, players: 1064897 },
  "apex-legends": { appId: 1172470, players: 191389 },
  "rainbow-six-siege": { appId: 359550, players: 48398 },
  "overwatch-2": { appId: 2357570, players: 52260 },
  "pubg": { appId: 578080, players: 748951 },
  "rust": { appId: 252490, players: 99709 },
  "escape-from-tarkov": { appId: 3932890, players: 33992 },
  "destiny-2": { appId: 1085660, players: 19279 },
  "call-of-duty-mw2019": { appId: 2000950, players: 1541 },
  "halo-infinite": { appId: 1240440, players: 538 },
  "battlefield-1": { appId: 1238840, players: 7618 },
  "titanfall-2": { appId: 1237970, players: 1422 },
  "doom-2016": { appId: 379720, players: 511 },
  "doom-eternal": { appId: 782330, players: 686 },
  "doom-the-dark-ages": { appId: 3017860, players: 678 },
  "monster-hunter-world": { appId: 582010, players: 22652 },
  "monster-hunter-wilds": { appId: 2246340, players: 31422 },
  "sekiro": { appId: 814380, players: 7964 },
  "dark-souls-3": { appId: 374320, players: 6197 },
  "lies-of-p": { appId: 1627720, players: 1512 },
  "resident-evil-2": { appId: 883710, players: 5862 },
  "resident-evil-4-remake": { appId: 2050650, players: 15915 },
  "resident-evil-village": { appId: 1196590, players: 3190 },
  "silent-hill-2": { appId: 2124490, players: 731 },
  "control": { appId: 870780, players: 1221 },
  "metro-exodus": { appId: 412020, players: 1572 },
  "death-stranding": { appId: 1190460, players: 106 },
  "horizon-zero-dawn": { appId: 1151640, players: 468 },
  "horizon-forbidden-west": { appId: 2420110, players: 1247 },
  "god-of-war": { appId: 1593500, players: 1934 },
  "spider-man-remastered": { appId: 1817070, players: 2594 },
  "spider-man-miles-morales": { appId: 1817190, players: 655 },
  "spider-man-2": { appId: 2651280, players: 2108 },
  "ratchet-and-clank-rift-apart": { appId: 1895880, players: 131 },
  "returnal": { appId: 1649240, players: 68 },
  "the-last-of-us-part-1": { appId: 1888930, players: 1910 },
  "ghost-of-tsushima": { appId: 2215430, players: 2889 },
  "uncharted-legacy-of-thieves": { appId: 1659420, players: 999 },
  "detroit-become-human": { appId: 1222140, players: 3826 },
  "forza-horizon-5": { appId: 1551360, players: 9003 },
  "microsoft-flight-simulator": { appId: 1250410, players: 2790 },
  "starfield": { appId: 1716740, players: 2680 },
  "diablo-4": { appId: 2344520, players: 10906 },
  "hogwarts-legacy": { appId: 990080, players: 10850 },
  "dead-space": { appId: 1693980, players: 620 },
  "atomic-heart": { appId: 668580, players: 3740 },
  "dying-light-2": { appId: 534380, players: 5426 },
  "far-cry-6": { appId: 2369390, players: 4984 },
  "assassins-creed-valhalla": { appId: 2208920, players: 2663 },
  "assassins-creed-mirage": { appId: 3035570, players: 320 },
  "assassins-creed-shadows": { appId: 3159330, players: 2418 },
  "star-wars-jedi-fallen-order": { appId: 1172380, players: 464 },
  "star-wars-jedi-survivor": { appId: 1774580, players: 854 },
  "it-takes-two": { appId: 1426210, players: 12455 },
  "valheim": { appId: 892970, players: 56407 },
  "palworld": { appId: 1623730, players: 48860 },
  "grounded": { appId: 962130, players: 2304 },
  "grounded-2": { appId: 2661300, players: 4880 },
  "helldivers-2": { appId: 553850, players: 54203 },
  "black-myth-wukong": { appId: 2358720, players: 16547 },
  "space-marine-2": { appId: 2183900, players: 16872 },
  "stalker-2": { appId: 1643320, players: 7350 },
  "indiana-jones-great-circle": { appId: 2677660, players: 298 },
  "kingdom-come-deliverance-2": { appId: 1771300, players: 15373 },
  "clair-obscur": { appId: 1903340, players: 4528 },
  "borderlands-4": { appId: 1285190, players: 3328 },
  "elden-ring-nightreign": { appId: 2622380, players: 25827 },
  "battlefield-6": { appId: 2807960, players: 39755 },
  "arc-raiders": { appId: 1808500, players: 52481 },
  "marvel-rivals": { appId: 2767030, players: 30867 },
  "sons-of-the-forest": { appId: 1326470, players: 15107 },
  "sea-of-thieves": { appId: 1172620, players: 3720 },
  "deadlock": { appId: 1422450, players: 0 },
  "final-fantasy-xiv": { appId: 39210, players: 13159 },
  "path-of-exile-2": { appId: 2694490, players: 13916 },
  "deep-rock-galactic": { appId: 548430, players: 9469 },
  "lethal-company": { appId: 1966720, players: 2434 },
  "peak": { appId: 3527290, players: 17938 },
  "repo": { appId: 3241660, players: 21763 },
  "satisfactory": { appId: 526870, players: 15428 },
  "factorio": { appId: 427520, players: 16976 },
  "stardew-valley": { appId: 413150, players: 81970 },
  "terraria": { appId: 105600, players: 43615 },
  "balatro": { appId: 2379780, players: 8105 },
  "hades-2": { appId: 1145350, players: 3731 },
  "the-sims-4": { appId: 1222670, players: 23566 },
  "cities-skylines-2": { appId: 949230, players: 11032 },
  "total-war-warhammer-3": { appId: 1142710, players: 39923 },
  "age-of-empires-4": { appId: 1466860, players: 13770 },
  "mount-and-blade-2-bannerlord": { appId: 261550, players: 31252 },
  "subnautica": { appId: 264710, players: 3444 },
  "euro-truck-simulator-2": { appId: 227300, players: 36703 },
  "skyrim-se": { appId: 489830, players: 24667 },
};

const STEAM_CDN = "https://cdn.akamai.steamstatic.com/steam/apps";

/** Wide library art works for both cards and the detail hero. */
export function steamCoverUrl(appId?: number): string | null {
  return appId ? `${STEAM_CDN}/${appId}/library_hero.jpg` : null;
}

export function formatSteamPlayers(count: number, locale = "en"): string {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count);
}
