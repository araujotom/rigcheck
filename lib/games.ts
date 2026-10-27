import { STEAM_DATA } from "@/lib/steam";
import { SUMMARY_PT } from "@/lib/summaries-pt";
import type { Game } from "@/lib/types";

/**
 * Curated game requirements.
 *
 * Hardware names are the ones printed on the box (or the closest common
 * equivalent). The numeric scores next to them map those parts onto the
 * relative performance index in `lib/hardware.ts` so any PC can be compared,
 * not just the exact models listed by the publisher.
 *
 * Requirements drift with patches and driver updates, so treat every result as
 * an estimate with a healthy margin.
 */

const g = (
  slug: string,
  title: string,
  year: number,
  developer: string,
  genres: string[],
  hue: number,
  summary: string,
  min: Game["min"],
  rec: Game["rec"],
  opts: { cap?: number; fps?: number; popularity?: number; cover?: string } = {},
): Game => ({
  slug,
  title,
  year,
  developer,
  genres,
  hue,
  summary,
  min,
  rec,
  fpsCap: opts.cap,
  fpsAtRecommended: opts.fps,
  popularity: opts.popularity,
  cover: opts.cover,
});

export const GAMES: Game[] = [
  g("cyberpunk-2077", "Cyberpunk 2077", 2020, "CD Projekt Red", ["RPG", "Open World", "FPS"], 265,
    "Night City at its best: dense, ray-traced and genuinely demanding.",
    { cpu: "Core i7-6700 / Ryzen 5 1600", cpuScore: 32, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 12, vram: 6, storage: 70 },
    { cpu: "Core i7-12700 / Ryzen 7 7800X3D", cpuScore: 75, gpu: "RTX 2060 Super / RX 5700 XT", gpuScore: 29, ram: 16, vram: 8, storage: 70 }),

  g("elden-ring", "Elden Ring", 2022, "FromSoftware", ["Action RPG", "Open World"], 42,
    "The Lands Between, with a hard 60 FPS ceiling on PC.",
    { cpu: "Core i5-8400 / Ryzen 3 3300X", cpuScore: 34, gpu: "GTX 1060 3GB / RX 580", gpuScore: 15, ram: 12, vram: 3, storage: 60 },
    { cpu: "Core i7-8700K / Ryzen 5 3600X", cpuScore: 44, gpu: "GTX 1070 / RX Vega 56", gpuScore: 22, ram: 16, vram: 8, storage: 60 }, { cap: 60 }),

  g("baldurs-gate-3", "Baldur's Gate 3", 2023, "Larian Studios", ["RPG", "Turn-Based", "Co-op"], 32,
    "A 100-hour CRPG that scales from potato to pristine.",
    { cpu: "Core i5-4690 / Ryzen 3 1200", cpuScore: 16, gpu: "GTX 970 / RX 480", gpuScore: 14, ram: 8, vram: 4, storage: 150 },
    { cpu: "Core i7-8700K / Ryzen 5 3600", cpuScore: 46, gpu: "RTX 2060 Super / RX 5700 XT", gpuScore: 29, ram: 16, vram: 8, storage: 150 }),

  g("red-dead-redemption-2", "Red Dead Redemption 2", 2019, "Rockstar Games", ["Open World", "Action", "Western"], 18,
    "Still one of the best-looking open worlds ever built.",
    { cpu: "Core i5-2500K / FX-6300", cpuScore: 10, gpu: "GTX 770 / R9 280", gpuScore: 9, ram: 8, vram: 2, storage: 150 },
    { cpu: "Core i7-4770K / Ryzen 5 1500X", cpuScore: 21, gpu: "GTX 1060 6GB / RX 480", gpuScore: 17, ram: 12, vram: 6, storage: 150 }),

  g("gta-v", "Grand Theft Auto V", 2015, "Rockstar North", ["Open World", "Action", "Crime"], 145,
    "A decade-old benchmark that still runs on almost anything.",
    { cpu: "Core i5-2500K / FX-6300", cpuScore: 10, gpu: "GTX 660 / HD 7870", gpuScore: 6, ram: 4, vram: 1, storage: 100 },
    { cpu: "Core i5-3570K / FX-8350", cpuScore: 12, gpu: "GTX 960 / R9 280X", gpuScore: 9, ram: 8, vram: 2, storage: 100 }),

  g("the-witcher-3", "The Witcher 3: Wild Hunt", 2015, "CD Projekt Red", ["RPG", "Open World", "Fantasy"], 8,
    "Geralt's masterpiece, now with a much heavier next-gen update.",
    { cpu: "Core i5-2500K / Phenom II X4", cpuScore: 10, gpu: "GTX 660 / HD 7870", gpuScore: 6, ram: 6, vram: 2, storage: 50 },
    { cpu: "Core i7-3770 / FX-8350", cpuScore: 14, gpu: "GTX 770 / R9 280X", gpuScore: 8, ram: 8, vram: 2, storage: 50 }),

  g("counter-strike-2", "Counter-Strike 2", 2023, "Valve", ["FPS", "Competitive", "Free to Play"], 38,
    "Competitive shooters care about CPU headroom more than pixels.",
    { cpu: "Core i5-750 / Ryzen 3 1200", cpuScore: 5, gpu: "GTX 1050 Ti / RX 570", gpuScore: 11, ram: 8, vram: 2, storage: 85 },
    { cpu: "Core i5-12400F / Ryzen 5 5600", cpuScore: 60, gpu: "RTX 2060 / RX 5700", gpuScore: 25, ram: 16, vram: 6, storage: 85 }),

  g("fortnite", "Fortnite", 2017, "Epic Games", ["Battle Royale", "Shooter", "Free to Play"], 275,
    "Cartoonish art, but the Unreal Engine 5 modes are no joke.",
    { cpu: "Core i3-3225 / Ryzen 3 1200", cpuScore: 6, gpu: "Intel HD 4000", gpuScore: 1, ram: 8, vram: 1, storage: 30 },
    { cpu: "Core i5-8400 / Ryzen 5 2600", cpuScore: 34, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 16, vram: 6, storage: 30 }),

  // VALORANT is not on Steam, so it needs a manual popularity weight to sit
  // alongside the biggest Steam titles instead of sorting to the bottom.
  g("valorant", "VALORANT", 2020, "Riot Games", ["FPS", "Competitive", "Free to Play"], 350,
    "Runs on a toaster. High refresh rate is a different story.",
    { cpu: "Core i3-4150 / Ryzen 3 1200", cpuScore: 8, gpu: "Intel HD 4000", gpuScore: 1, ram: 4, vram: 1, storage: 30 },
    { cpu: "Core i5-9400F / Ryzen 5 2600", cpuScore: 42, gpu: "GTX 1050 Ti / RX 570", gpuScore: 11, ram: 8, vram: 4, storage: 30 },
    { popularity: 1_000_000, cover: "/covers/valorant.jpg" }),

  g("league-of-legends", "League of Legends", 2009, "Riot Games", ["MOBA", "Competitive", "Free to Play"], 205,
    "Fifteen years old and still the most-played game on earth.",
    { cpu: "Core i3-530 / Athlon II X2", cpuScore: 3, gpu: "Intel HD 4000", gpuScore: 1, ram: 2, vram: 1, storage: 16 },
    { cpu: "Core i5-3300 / Ryzen 3 1300X", cpuScore: 8, gpu: "GTX 1050 Ti / RX 560", gpuScore: 11, ram: 8, vram: 4, storage: 16 }),

  g("dota-2", "Dota 2", 2013, "Valve", ["MOBA", "Competitive", "Free to Play"], 12,
    "Source 2 scales beautifully, but teamfights hammer the CPU.",
    { cpu: "Core i3-2120 / Athlon 64 X2", cpuScore: 4, gpu: "Intel HD 3000", gpuScore: 1, ram: 4, vram: 1, storage: 15 },
    { cpu: "Core i5-8400 / Ryzen 5 2600", cpuScore: 34, gpu: "GTX 1050 Ti / RX 570", gpuScore: 11, ram: 8, vram: 4, storage: 15 }),

  g("apex-legends", "Apex Legends", 2019, "Respawn Entertainment", ["Battle Royale", "FPS", "Free to Play"], 358,
    "Source-engine movement with a surprisingly modest floor.",
    { cpu: "Core i3-6300 / Ryzen 3 1200", cpuScore: 16, gpu: "GT 640 / R7 250", gpuScore: 4, ram: 6, vram: 1, storage: 75 },
    { cpu: "Core i5-3570K / Ryzen 5 1600", cpuScore: 12, gpu: "GTX 970 / R9 290", gpuScore: 14, ram: 8, vram: 4, storage: 75 }),

  g("rainbow-six-siege", "Rainbow Six Siege", 2015, "Ubisoft Montreal", ["FPS", "Tactical", "Competitive"], 210,
    "Ten-year-old tactics, still sharp at high frame rates.",
    { cpu: "Core i3-560 / Phenom II X4", cpuScore: 3, gpu: "GTX 460 / HD 5770", gpuScore: 3, ram: 6, vram: 1, storage: 60 },
    { cpu: "Core i5-2500K / FX-8350", cpuScore: 10, gpu: "GTX 670 / R9 280X", gpuScore: 7, ram: 8, vram: 2, storage: 60 }),

  g("overwatch-2", "Overwatch 2", 2022, "Blizzard Entertainment", ["FPS", "Hero Shooter", "Free to Play"], 28,
    "Bright, fast and extremely well optimised.",
    { cpu: "Core i3-6100 / Ryzen 3 1300X", cpuScore: 15, gpu: "GTX 660 / HD 7850", gpuScore: 6, ram: 6, vram: 2, storage: 50 },
    { cpu: "Core i5-6600K / Ryzen 5 1600", cpuScore: 24, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 8, vram: 6, storage: 50 }),

  g("pubg", "PUBG: Battlegrounds", 2017, "Krafton", ["Battle Royale", "FPS", "Free to Play"], 45,
    "Notorious for CPU spikes when 100 players converge.",
    { cpu: "Core i5-4430 / Ryzen 3 1300X", cpuScore: 14, gpu: "GTX 960 / R9 280", gpuScore: 9, ram: 8, vram: 2, storage: 40 },
    { cpu: "Core i5-6600K / Ryzen 5 1600", cpuScore: 24, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 16, vram: 6, storage: 40 }),

  g("rust", "Rust", 2018, "Facepunch Studios", ["Survival", "Multiplayer", "Open World"], 22,
    "Base building, 200-player servers and merciless CPU load.",
    { cpu: "Core i7-3770 / Ryzen 5 1600", cpuScore: 14, gpu: "GTX 670 / R9 280", gpuScore: 7, ram: 8, vram: 2, storage: 25 },
    { cpu: "Core i7-4790K / Ryzen 5 3600", cpuScore: 21, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 16, vram: 6, storage: 25 }),

  g("escape-from-tarkov", "Escape from Tarkov", 2017, "Battlestate Games", ["FPS", "Extraction", "Hardcore"], 88,
    "Brutal on guns, brutal on RAM and CPU cache.",
    { cpu: "Core i5-2500K / FX-8350", cpuScore: 10, gpu: "GTX 660 / HD 7870", gpuScore: 6, ram: 8, vram: 2, storage: 40 },
    { cpu: "Core i7-8700K / Ryzen 5 3600", cpuScore: 46, gpu: "GTX 1660 / RX 5600 XT", gpuScore: 20, ram: 16, vram: 6, storage: 40 }),

  g("destiny-2", "Destiny 2", 2017, "Bungie", ["FPS", "Looter Shooter", "Free to Play"], 195,
    "A shooter that has aged gracefully on PC.",
    { cpu: "Core i3-4340 / Ryzen 3 1200", cpuScore: 10, gpu: "GTX 960 / R9 280", gpuScore: 9, ram: 6, vram: 4, storage: 105 },
    { cpu: "Core i5-7600K / Ryzen 5 1600", cpuScore: 27, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 8, vram: 6, storage: 105 }),

  g("call-of-duty-mw2019", "Call of Duty: Modern Warfare", 2019, "Infinity Ward", ["FPS", "Military"], 78,
    "Fast, loud and heavier than the specs suggest.",
    { cpu: "Core i3-4340 / Ryzen 3 1200", cpuScore: 10, gpu: "GTX 670 / HD 7950", gpuScore: 7, ram: 8, vram: 2, storage: 175 },
    { cpu: "Core i5-2500K / Ryzen 5 1600", cpuScore: 10, gpu: "GTX 1660 / RX 580", gpuScore: 20, ram: 12, vram: 6, storage: 175 }),

  g("halo-infinite", "Halo Infinite", 2021, "343 Industries", ["FPS", "Sci-Fi", "Free to Play"], 172,
    "Open-world Halo with a forgiving GPU floor.",
    { cpu: "Core i5-4440 / Ryzen 5 1600", cpuScore: 15, gpu: "GTX 1050 Ti / RX 570", gpuScore: 11, ram: 8, vram: 4, storage: 50 },
    { cpu: "Core i7-9700K / Ryzen 7 3700X", cpuScore: 52, gpu: "GTX 1660 / RX 5600 XT", gpuScore: 20, ram: 16, vram: 6, storage: 50 }),

  g("battlefield-1", "Battlefield 1", 2016, "DICE", ["FPS", "Military", "Large Scale"], 30,
    "64-player chaos, still gorgeous and still CPU-hungry.",
    { cpu: "Core i5-6600K / FX-6350", cpuScore: 24, gpu: "GTX 660 / HD 7850", gpuScore: 6, ram: 8, vram: 2, storage: 50 },
    { cpu: "Core i7-4790 / Ryzen 5 1600", cpuScore: 21, gpu: "GTX 1060 6GB / RX 480", gpuScore: 17, ram: 16, vram: 6, storage: 50 }),

  g("titanfall-2", "Titanfall 2", 2016, "Respawn Entertainment", ["FPS", "Movement", "Sci-Fi"], 190,
    "One of the best-optimised shooters of its generation.",
    { cpu: "Core i3-6300 / Ryzen 3 1200", cpuScore: 16, gpu: "GTX 660 / HD 7850", gpuScore: 6, ram: 8, vram: 2, storage: 45 },
    { cpu: "Core i5-6600 / Ryzen 5 1600", cpuScore: 24, gpu: "GTX 1060 6GB / RX 480", gpuScore: 17, ram: 16, vram: 6, storage: 45 }),

  g("doom-2016", "DOOM (2016)", 2016, "id Software", ["FPS", "Fast Paced", "Sci-Fi"], 15,
    "id Tech 6 black magic. Silky on almost any GPU.",
    { cpu: "Core i5-2400 / FX-8320", cpuScore: 9, gpu: "GTX 670 / HD 7870", gpuScore: 7, ram: 8, vram: 2, storage: 55 },
    { cpu: "Core i7-3770 / FX-8350", cpuScore: 14, gpu: "GTX 970 / R9 290", gpuScore: 14, ram: 8, vram: 4, storage: 55 }),

  g("doom-eternal", "DOOM Eternal", 2020, "id Software", ["FPS", "Fast Paced", "Sci-Fi"], 5,
    "Rip and tear at 200 FPS on hardware that shouldn't manage it.",
    { cpu: "Core i5-3570K / Ryzen 3 1200", cpuScore: 12, gpu: "GTX 1050 Ti / RX 570", gpuScore: 11, ram: 8, vram: 4, storage: 80 },
    { cpu: "Core i7-6700K / Ryzen 5 1600", cpuScore: 33, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 8, vram: 6, storage: 80 }),

  g("doom-the-dark-ages", "DOOM: The Dark Ages", 2025, "id Software", ["FPS", "Fast Paced", "Fantasy"], 20,
    "id Tech 8 with mandatory ray tracing. Bring a modern GPU.",
    { cpu: "Core i7-10700K / Ryzen 7 3700X", cpuScore: 51, gpu: "RTX 2060 Super / RX 6600", gpuScore: 29, ram: 16, vram: 8, storage: 100 },
    { cpu: "Core i7-12700K / Ryzen 7 7700X", cpuScore: 77, gpu: "RTX 4080 / RX 7900 XT", gpuScore: 65, ram: 32, vram: 16, storage: 100 }),

  g("monster-hunter-world", "Monster Hunter: World", 2018, "Capcom", ["Action RPG", "Co-op", "Hunting"], 100,
    "Fifteen-minute hunts with a lot of particles.",
    { cpu: "Core i5-4460 / Ryzen 3 1200", cpuScore: 15, gpu: "GTX 760 / R7 260X", gpuScore: 7, ram: 8, vram: 2, storage: 48 },
    { cpu: "Core i7-3770 / Ryzen 5 1600", cpuScore: 14, gpu: "GTX 1060 6GB / RX 570", gpuScore: 17, ram: 8, vram: 4, storage: 48 }),

  g("monster-hunter-wilds", "Monster Hunter Wilds", 2025, "Capcom", ["Action RPG", "Co-op", "Hunting"], 30,
    "The most demanding Monster Hunter yet, and it knows it.",
    { cpu: "Core i5-10400 / Ryzen 5 3600", cpuScore: 43, gpu: "GTX 1660 / RX 5500 XT", gpuScore: 20, ram: 16, vram: 6, storage: 75 },
    { cpu: "Core i5-12400 / Ryzen 5 5600", cpuScore: 60, gpu: "RTX 2070 Super / RX 6700 XT", gpuScore: 35, ram: 16, vram: 8, storage: 75 }),

  g("sekiro", "Sekiro: Shadows Die Twice", 2019, "FromSoftware", ["Action", "Souls-like", "Japan"], 350,
    "Deflect, posture, repeat. Capped at 60 FPS.",
    { cpu: "Core i3-2100 / Ryzen 3 1200", cpuScore: 4, gpu: "GTX 760 / HD 7950", gpuScore: 7, ram: 4, vram: 2, storage: 25 },
    { cpu: "Core i5-2500K / Ryzen 5 1600", cpuScore: 10, gpu: "GTX 970 / RX 570", gpuScore: 14, ram: 8, vram: 4, storage: 25 }, { cap: 60 }),

  g("dark-souls-3", "Dark Souls III", 2016, "FromSoftware", ["Action", "Souls-like", "Dark Fantasy"], 240,
    "Lothric still looks the part, and still caps at 60.",
    { cpu: "Core i3-2100 / Ryzen 3 1200", cpuScore: 4, gpu: "GTX 750 Ti / HD 7950", gpuScore: 6, ram: 4, vram: 2, storage: 25 },
    { cpu: "Core i5-2500K / Ryzen 5 1600", cpuScore: 10, gpu: "GTX 970 / RX 570", gpuScore: 14, ram: 8, vram: 4, storage: 25 }, { cap: 60 }),

  g("lies-of-p", "Lies of P", 2023, "Round8 Studio", ["Action", "Souls-like", "Steampunk"], 40,
    "A polished, surprisingly scalable Souls-like.",
    { cpu: "Core i3-6300 / Ryzen 3 1200", cpuScore: 16, gpu: "GTX 960 / RX 560", gpuScore: 9, ram: 8, vram: 2, storage: 50 },
    { cpu: "Core i5-8400 / Ryzen 5 2600", cpuScore: 34, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 16, vram: 6, storage: 50 }),

  g("resident-evil-2", "Resident Evil 2", 2019, "Capcom", ["Survival Horror", "Zombies", "Remake"], 355,
    "RE Engine efficiency at its finest.",
    { cpu: "Core i5-4460 / Ryzen 3 1200", cpuScore: 15, gpu: "GTX 760 / RX 560", gpuScore: 7, ram: 8, vram: 2, storage: 26 },
    { cpu: "Core i7-3770 / Ryzen 5 1600", cpuScore: 14, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 8, vram: 4, storage: 26 }),

  g("resident-evil-4-remake", "Resident Evil 4 (Remake)", 2023, "Capcom", ["Survival Horror", "Action", "Remake"], 25,
    "Leon's bad day, rendered beautifully.",
    { cpu: "Core i5-7500 / Ryzen 3 1200", cpuScore: 30, gpu: "RX 560 / GTX 1050 Ti", gpuScore: 11, ram: 8, vram: 4, storage: 60 },
    { cpu: "Core i7-8700 / Ryzen 5 3600", cpuScore: 42, gpu: "RTX 2060 / RX 5700", gpuScore: 25, ram: 16, vram: 8, storage: 60 }),

  g("resident-evil-village", "Resident Evil Village", 2021, "Capcom", ["Survival Horror", "Action", "First Person"], 285,
    "Vampires, werewolves and excellent frame pacing.",
    { cpu: "Core i5-7500 / Ryzen 3 1200", cpuScore: 30, gpu: "GTX 1050 Ti / RX 570", gpuScore: 11, ram: 8, vram: 4, storage: 50 },
    { cpu: "Core i7-8700 / Ryzen 5 3600", cpuScore: 42, gpu: "GTX 1070 / RX 5700", gpuScore: 22, ram: 16, vram: 8, storage: 50 }),

  g("silent-hill-2", "Silent Hill 2 (2024)", 2024, "Bloober Team", ["Survival Horror", "Psychological", "Remake"], 70,
    "Fog everywhere, and it costs frames to render it.",
    { cpu: "Core i5-8400 / Ryzen 5 2600", cpuScore: 34, gpu: "GTX 1080 / RX 5700 XT", gpuScore: 25, ram: 16, vram: 8, storage: 50 },
    { cpu: "Core i7-8700 / Ryzen 5 3600", cpuScore: 42, gpu: "RTX 2080 / RX 6800", gpuScore: 36, ram: 16, vram: 12, storage: 50 }),

  g("control", "Control", 2019, "Remedy Entertainment", ["Action", "Sci-Fi", "Third Person"], 300,
    "The Oldest House, and the first real ray-tracing showcase.",
    { cpu: "Core i5-4690 / Ryzen 5 1600", cpuScore: 16, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 8, vram: 6, storage: 45 },
    { cpu: "Core i7-4770 / Ryzen 5 2600", cpuScore: 21, gpu: "GTX 1080 / RX 5700 XT", gpuScore: 25, ram: 16, vram: 8, storage: 45 }),

  g("alan-wake-2", "Alan Wake 2", 2023, "Remedy Entertainment", ["Survival Horror", "Story Rich", "Third Person"], 255,
    "Gorgeous, cinematic and one of the heaviest games on PC.",
    { cpu: "Core i5-7600K / Ryzen 5 2600", cpuScore: 27, gpu: "RTX 2060 / RX 6600", gpuScore: 25, ram: 16, vram: 8, storage: 90 },
    { cpu: "Core i7-11700K / Ryzen 7 3700X", cpuScore: 59, gpu: "RTX 3070 / RX 6700 XT", gpuScore: 39, ram: 16, vram: 8, storage: 90 }),

  g("metro-exodus", "Metro Exodus", 2019, "4A Games", ["FPS", "Post-Apocalyptic", "Story Rich"], 50,
    "A grim, ray-traced journey across post-apocalyptic Russia.",
    { cpu: "Core i5-4440 / Ryzen 3 1200", cpuScore: 15, gpu: "GTX 1050 / RX 560", gpuScore: 11, ram: 8, vram: 2, storage: 60 },
    { cpu: "Core i7-4770K / Ryzen 5 2600", cpuScore: 21, gpu: "GTX 1070 / RX 5700", gpuScore: 22, ram: 12, vram: 8, storage: 60 }),

  g("death-stranding", "Death Stranding", 2020, "Kojima Productions", ["Adventure", "Open World", "Sci-Fi"], 200,
    "A walking simulator with a Decima engine budget.",
    { cpu: "Core i5-3470 / Ryzen 3 1200", cpuScore: 8, gpu: "GTX 1050 / RX 560", gpuScore: 11, ram: 8, vram: 3, storage: 80 },
    { cpu: "Core i7-3770 / Ryzen 5 1600", cpuScore: 14, gpu: "GTX 1060 6GB / RX 590", gpuScore: 17, ram: 8, vram: 6, storage: 80 }),

  g("horizon-zero-dawn", "Horizon Zero Dawn", 2020, "Guerrilla Games", ["Open World", "Action RPG", "Sci-Fi"], 35,
    "Robot dinosaurs and a very pretty Decima sunrise.",
    { cpu: "Core i5-2500K / FX-6300", cpuScore: 10, gpu: "GTX 780 / R9 290", gpuScore: 8, ram: 8, vram: 3, storage: 100 },
    { cpu: "Core i7-4770 / Ryzen 5 1500X", cpuScore: 21, gpu: "GTX 1060 6GB / RX 480", gpuScore: 17, ram: 16, vram: 6, storage: 100 }),

  g("horizon-forbidden-west", "Horizon Forbidden West", 2024, "Guerrilla Games", ["Open World", "Action RPG", "Sci-Fi"], 180,
    "The sequel turns the visual dial past eleven.",
    { cpu: "Core i5-8600 / Ryzen 5 3600", cpuScore: 34, gpu: "GTX 1650 / RX 5500 XT", gpuScore: 14, ram: 16, vram: 4, storage: 150 },
    { cpu: "Core i7-9700 / Ryzen 5 5600", cpuScore: 51, gpu: "RTX 3060 / RX 6600 XT", gpuScore: 27, ram: 16, vram: 8, storage: 150 }),

  g("god-of-war", "God of War", 2022, "Santa Monica Studio", ["Action", "Adventure", "Mythology"], 5,
    "Kratos on PC: a superb port of a superb game.",
    { cpu: "Core i5-2500K / Ryzen 3 1200", cpuScore: 10, gpu: "GTX 960 / RX 470", gpuScore: 9, ram: 8, vram: 4, storage: 70 },
    { cpu: "Core i5-6600K / Ryzen 5 1600", cpuScore: 24, gpu: "GTX 1060 6GB / RX 570", gpuScore: 17, ram: 8, vram: 6, storage: 70 }),

  g("spider-man-remastered", "Marvel's Spider-Man Remastered", 2022, "Insomniac Games", ["Action", "Open World", "Superhero"], 355,
    "Web-swinging through Manhattan at high frame rates.",
    { cpu: "Core i3-4160 / Ryzen 3 1200", cpuScore: 10, gpu: "GTX 950 / RX 470", gpuScore: 8, ram: 8, vram: 4, storage: 75 },
    { cpu: "Core i5-4670 / Ryzen 5 1600", cpuScore: 17, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 16, vram: 6, storage: 75 }),

  g("spider-man-miles-morales", "Spider-Man: Miles Morales", 2022, "Insomniac Games", ["Action", "Open World", "Superhero"], 310,
    "Shorter than the first game, and a touch heavier.",
    { cpu: "Core i5-4670 / Ryzen 5 1600", cpuScore: 17, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 8, vram: 6, storage: 75 },
    { cpu: "Core i5-8600 / Ryzen 5 3600", cpuScore: 34, gpu: "RTX 3070 / RX 6800", gpuScore: 39, ram: 16, vram: 8, storage: 75 }),

  g("spider-man-2", "Marvel's Spider-Man 2", 2025, "Insomniac Games", ["Action", "Open World", "Superhero"], 345,
    "The PC port arrived later, and asked for more.",
    { cpu: "Core i5-8600 / Ryzen 5 3600", cpuScore: 34, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 16, vram: 6, storage: 140 },
    { cpu: "Core i7-12700 / Ryzen 7 5800X", cpuScore: 75, gpu: "RTX 3060 Ti / RX 6700 XT", gpuScore: 33, ram: 16, vram: 8, storage: 140 }),

  g("ratchet-and-clank-rift-apart", "Ratchet & Clank: Rift Apart", 2023, "Insomniac Games", ["Action", "Platformer", "Sci-Fi"], 260,
    "Dimension-hopping, and the SSD gets a workout too.",
    { cpu: "Core i3-8100 / Ryzen 3 3100", cpuScore: 28, gpu: "GTX 960 / RX 470", gpuScore: 9, ram: 8, vram: 4, storage: 75 },
    { cpu: "Core i5-8400 / Ryzen 5 3600", cpuScore: 34, gpu: "RTX 2060 / RX 5700", gpuScore: 25, ram: 16, vram: 8, storage: 75 }),

  g("returnal", "Returnal", 2023, "Housemarque", ["Roguelike", "Third Person", "Sci-Fi"], 290,
    "Bullet-hell particles at 120 FPS if you can manage it.",
    { cpu: "Core i5-6400 / Ryzen 5 2600", cpuScore: 20, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 16, vram: 6, storage: 60 },
    { cpu: "Core i7-8700 / Ryzen 7 3700X", cpuScore: 42, gpu: "RTX 2070 Super / RX 6700 XT", gpuScore: 35, ram: 16, vram: 8, storage: 60 }),

  g("the-last-of-us-part-1", "The Last of Us Part I", 2023, "Naughty Dog", ["Action", "Story Rich", "Post-Apocalyptic"], 95,
    "A famously rough PC launch, since patched into shape.",
    { cpu: "Core i7-4770K / Ryzen 5 1500X", cpuScore: 21, gpu: "GTX 1050 Ti / RX 470", gpuScore: 11, ram: 16, vram: 4, storage: 80 },
    { cpu: "Core i7-8700 / Ryzen 5 3600", cpuScore: 42, gpu: "RTX 2070 Super / RX 6600 XT", gpuScore: 35, ram: 16, vram: 8, storage: 80 }),

  g("ghost-of-tsushima", "Ghost of Tsushima", 2024, "Sucker Punch", ["Open World", "Samurai", "Action"], 350,
    "One of the best PC ports in recent memory.",
    { cpu: "Core i5-8600 / Ryzen 5 3600", cpuScore: 34, gpu: "GTX 960 / RX 470", gpuScore: 9, ram: 8, vram: 4, storage: 75 },
    { cpu: "Core i5-11400 / Ryzen 5 5600", cpuScore: 51, gpu: "RTX 2060 / RX 5600 XT", gpuScore: 25, ram: 16, vram: 8, storage: 75 }),

  g("uncharted-legacy-of-thieves", "Uncharted: Legacy of Thieves", 2022, "Naughty Dog", ["Action", "Adventure", "Story Rich"], 155,
    "Two Uncharted games, one very pretty package.",
    { cpu: "Core i5-4430 / Ryzen 3 1200", cpuScore: 14, gpu: "GTX 960 / RX 470", gpuScore: 9, ram: 8, vram: 4, storage: 126 },
    { cpu: "Core i7-4770 / Ryzen 5 2600", cpuScore: 21, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 16, vram: 6, storage: 126 }),

  g("detroit-become-human", "Detroit: Become Human", 2019, "Quantic Dream", ["Narrative", "Sci-Fi", "Choices Matter"], 200,
    "A playable film that runs on almost anything modern.",
    { cpu: "Core i5-2400 / FX-8350", cpuScore: 9, gpu: "GTX 660 / HD 7870", gpuScore: 6, ram: 4, vram: 2, storage: 55 },
    { cpu: "Core i7-2700K / Ryzen 5 1600", cpuScore: 12, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 12, vram: 4, storage: 55 }),

  g("forza-horizon-5", "Forza Horizon 5", 2021, "Playground Games", ["Racing", "Open World", "Arcade"], 15,
    "Mexico at speed, with excellent scaling all the way up.",
    { cpu: "Core i5-4460 / Ryzen 3 1200", cpuScore: 15, gpu: "GTX 970 / RX 570", gpuScore: 14, ram: 8, vram: 4, storage: 110 },
    { cpu: "Core i5-8400 / Ryzen 5 2600", cpuScore: 34, gpu: "GTX 1070 / RX 590", gpuScore: 22, ram: 16, vram: 8, storage: 110 }),

  g("microsoft-flight-simulator", "Microsoft Flight Simulator", 2020, "Asobo Studio", ["Simulation", "Flight", "Realistic"], 200,
    "A planet-scale sim that eats CPU cores for breakfast.",
    { cpu: "Core i5-4460 / Ryzen 3 1200", cpuScore: 15, gpu: "GTX 770 / R9 270X", gpuScore: 8, ram: 8, vram: 2, storage: 150 },
    { cpu: "Core i7-9700K / Ryzen 7 3700X", cpuScore: 52, gpu: "RTX 2060 Super / RX 5700 XT", gpuScore: 29, ram: 16, vram: 8, storage: 150 }),

  g("starfield", "Starfield", 2023, "Bethesda Game Studios", ["RPG", "Space", "Open World"], 250,
    "A thousand planets, and a Creation Engine behind them.",
    { cpu: "Core i5-7600 / Ryzen 5 2600", cpuScore: 27, gpu: "GTX 1070 Ti / RX 5700", gpuScore: 24, ram: 16, vram: 8, storage: 125 },
    { cpu: "Core i5-10600K / Ryzen 5 5600X", cpuScore: 51, gpu: "RTX 2080 / RX 6800 XT", gpuScore: 36, ram: 16, vram: 8, storage: 125 }),

  g("diablo-4", "Diablo IV", 2023, "Blizzard Entertainment", ["ARPG", "Dark Fantasy", "Loot"], 355,
    "Click, loot, repeat. Endgame is where the frames go.",
    { cpu: "Core i3-8100 / Ryzen 3 1300X", cpuScore: 28, gpu: "GTX 970 / RX 570", gpuScore: 14, ram: 8, vram: 4, storage: 85 },
    { cpu: "Core i5-9600K / Ryzen 5 3600", cpuScore: 40, gpu: "RTX 2060 / RX 5700", gpuScore: 25, ram: 16, vram: 8, storage: 85 }),

  g("hogwarts-legacy", "Hogwarts Legacy", 2023, "Avalanche Software", ["RPG", "Fantasy", "Open World"], 40,
    "Hogwarts is gorgeous, Hogsmeade is not free.",
    { cpu: "Core i5-6600 / Ryzen 5 1400", cpuScore: 24, gpu: "GTX 960 / RX 470", gpuScore: 9, ram: 16, vram: 4, storage: 85 },
    { cpu: "Core i5-8400 / Ryzen 5 3600", cpuScore: 34, gpu: "GTX 1080 / RX 5700 XT", gpuScore: 25, ram: 16, vram: 8, storage: 85 }),

  g("dead-space", "Dead Space (2023)", 2023, "Motive Studio", ["Survival Horror", "Sci-Fi", "Remake"], 15,
    "The Ishimura, rebuilt with a lot more lighting.",
    { cpu: "Core i5-8600 / Ryzen 5 2600", cpuScore: 34, gpu: "GTX 1070 / RX 5700", gpuScore: 22, ram: 16, vram: 8, storage: 50 },
    { cpu: "Core i5-11600K / Ryzen 5 5600X", cpuScore: 55, gpu: "RTX 2070 / RX 6700 XT", gpuScore: 31, ram: 16, vram: 8, storage: 50 }),

  g("atomic-heart", "Atomic Heart", 2023, "Mundfish", ["FPS", "Sci-Fi", "Soviet"], 210,
    "Soviet retro-futurism with impressive tech underneath.",
    { cpu: "Core i5-4460 / Ryzen 3 1200", cpuScore: 15, gpu: "GTX 1050 Ti / RX 570", gpuScore: 11, ram: 8, vram: 4, storage: 90 },
    { cpu: "Core i7-7700 / Ryzen 5 2600", cpuScore: 37, gpu: "GTX 1070 / RX 5600 XT", gpuScore: 22, ram: 16, vram: 8, storage: 90 }),

  g("dying-light-2", "Dying Light 2", 2022, "Techland", ["Zombies", "Parkour", "Open World"], 30,
    "Night runs, and a big appetite for CPU threads.",
    { cpu: "Core i3-9100F / Ryzen 3 1200", cpuScore: 30, gpu: "GTX 1050 Ti / RX 570", gpuScore: 11, ram: 8, vram: 4, storage: 60 },
    { cpu: "Core i5-10400F / Ryzen 5 3600", cpuScore: 43, gpu: "RTX 2060 / RX 5700", gpuScore: 25, ram: 16, vram: 8, storage: 60 }),

  g("far-cry-6", "Far Cry 6", 2021, "Ubisoft Toronto", ["FPS", "Open World", "Action"], 355,
    "Yara in flames, with a reliable Dunia engine.",
    { cpu: "Core i5-4460 / Ryzen 3 1200", cpuScore: 15, gpu: "GTX 960 / RX 470", gpuScore: 9, ram: 8, vram: 4, storage: 60 },
    { cpu: "Core i7-7700 / Ryzen 5 3600", cpuScore: 37, gpu: "GTX 1080 / RX 5700 XT", gpuScore: 25, ram: 16, vram: 8, storage: 60 }),

  g("assassins-creed-valhalla", "Assassin's Creed Valhalla", 2020, "Ubisoft Montreal", ["Open World", "Action", "History"], 30,
    "England, longships and a CPU-heavy Anvil engine.",
    { cpu: "Core i5-4460 / Ryzen 3 1200", cpuScore: 15, gpu: "GTX 960 / RX 470", gpuScore: 9, ram: 8, vram: 4, storage: 50 },
    { cpu: "Core i7-6700 / Ryzen 5 1600", cpuScore: 33, gpu: "GTX 1080 / RX 5700 XT", gpuScore: 25, ram: 16, vram: 8, storage: 50 }),

  g("assassins-creed-mirage", "Assassin's Creed Mirage", 2023, "Ubisoft Bordeaux", ["Open World", "Stealth", "History"], 38,
    "A smaller, tighter AC that still wants a modern CPU.",
    { cpu: "Core i7-8700K / Ryzen 5 3600", cpuScore: 46, gpu: "GTX 1060 6GB / RX 5600 XT", gpuScore: 17, ram: 8, vram: 6, storage: 40 },
    { cpu: "Core i7-9700K / Ryzen 7 3700X", cpuScore: 52, gpu: "GTX 1660 Ti / RX 5700", gpuScore: 23, ram: 16, vram: 8, storage: 40 }),

  g("assassins-creed-shadows", "Assassin's Creed Shadows", 2025, "Ubisoft Quebec", ["Open World", "Stealth", "Japan"], 320,
    "Feudal Japan, ray tracing and a hefty hardware bill.",
    { cpu: "Core i7-8700K / Ryzen 5 3600", cpuScore: 46, gpu: "GTX 1060 6GB / RX 570", gpuScore: 17, ram: 16, vram: 6, storage: 115 },
    { cpu: "Core i5-11600K / Ryzen 5 5600X", cpuScore: 55, gpu: "RTX 3060 Ti / RX 6700 XT", gpuScore: 33, ram: 16, vram: 8, storage: 115 }),

  g("star-wars-jedi-fallen-order", "Star Wars Jedi: Fallen Order", 2019, "Respawn Entertainment", ["Action", "Star Wars", "Souls-like"], 200,
    "A galaxy-spanning adventure with a modest floor.",
    { cpu: "Core i3-3220 / Ryzen 3 1200", cpuScore: 6, gpu: "GTX 650 / HD 7750", gpuScore: 4, ram: 8, vram: 1, storage: 55 },
    { cpu: "Core i7-6700K / Ryzen 5 1600", cpuScore: 33, gpu: "GTX 1070 / RX 5700", gpuScore: 22, ram: 16, vram: 8, storage: 55 }),

  g("star-wars-jedi-survivor", "Star Wars Jedi: Survivor", 2023, "Respawn Entertainment", ["Action", "Star Wars", "Open World"], 210,
    "Bigger worlds, heavier shaders, and a patchy launch.",
    { cpu: "Core i5-8600K / Ryzen 5 3600", cpuScore: 34, gpu: "GTX 1070 / RX 5700", gpuScore: 22, ram: 8, vram: 8, storage: 155 },
    { cpu: "Core i5-11600K / Ryzen 5 5600X", cpuScore: 55, gpu: "RTX 2070 / RX 6700 XT", gpuScore: 31, ram: 16, vram: 8, storage: 155 }),

  g("it-takes-two", "It Takes Two", 2021, "Hazelight Studios", ["Co-op", "Platformer", "Adventure"], 160,
    "Best played with a friend. Runs on nearly anything.",
    { cpu: "Core i3-2100 / Ryzen 3 1200", cpuScore: 4, gpu: "GTX 660 / HD 7850", gpuScore: 6, ram: 8, vram: 2, storage: 50 },
    { cpu: "Core i5-3570K / Ryzen 5 1600", cpuScore: 12, gpu: "GTX 970 / RX 480", gpuScore: 14, ram: 16, vram: 4, storage: 50 }),

  g("valheim", "Valheim", 2021, "Iron Gate Studio", ["Survival", "Co-op", "Vikings"], 80,
    "Viking survival that hums along on older rigs.",
    { cpu: "Core i5-6600K / Ryzen 5 1600", cpuScore: 24, gpu: "GTX 950 / RX 470", gpuScore: 8, ram: 8, vram: 4, storage: 10 },
    { cpu: "Core i5-8400 / Ryzen 5 2600", cpuScore: 34, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 16, vram: 6, storage: 10 }),

  g("palworld", "Palworld", 2024, "Pocketpair", ["Survival", "Open World", "Co-op"], 190,
    "Pokémon with guns, and a surprisingly real GPU cost.",
    { cpu: "Core i5-3570K / Ryzen 3 1200", cpuScore: 12, gpu: "GTX 1050 / RX 570", gpuScore: 11, ram: 16, vram: 4, storage: 40 },
    { cpu: "Core i5-10400 / Ryzen 5 3600", cpuScore: 43, gpu: "GTX 1660 Super / RX 5600 XT", gpuScore: 22, ram: 16, vram: 8, storage: 40 }),

  g("grounded", "Grounded", 2022, "Obsidian Entertainment", ["Survival", "Co-op", "Open World", "Adventure"], 95,
    "A backyard survival game that is equal parts adorable and brutal.",
    { cpu: "Core i3-3225", cpuScore: 6, gpu: "GTX 650 Ti", gpuScore: 5, ram: 4, vram: 2, storage: 8 },
    { cpu: "Core i7-7700K / Ryzen 5 1600", cpuScore: 37, gpu: "GTX 1060 6GB / RX 470", gpuScore: 17, ram: 8, vram: 4, storage: 8 }),

  g("grounded-2", "Grounded 2", 2025, "Obsidian Entertainment / Eidos-Montréal", ["Survival", "Co-op", "Open World", "Adventure"], 105,
    "A bigger park, rideable bugs and far more teeth. Still in early access.",
    { cpu: "Ryzen 5 2600 / Core i5-8400", cpuScore: 32, gpu: "RX 5700 / GTX 1070 / Arc A580", gpuScore: 22, ram: 16, vram: 8, storage: 40 },
    { cpu: "Ryzen 5 5600X / Core i7-10700K", cpuScore: 61, gpu: "RX 6800 XT / RTX 3080", gpuScore: 44, ram: 16, vram: 10, storage: 40 }),

  g("helldivers-2", "Helldivers 2", 2024, "Arrowhead Game Studios", ["Co-op", "Third Person", "Sci-Fi"], 55,
    "Spread democracy. Watch your CPU temperatures.",
    { cpu: "Core i7-4790K / Ryzen 5 1500X", cpuScore: 21, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 8, vram: 6, storage: 100 },
    { cpu: "Core i7-9700K / Ryzen 7 3700X", cpuScore: 52, gpu: "RTX 2060 / RX 6600 XT", gpuScore: 25, ram: 16, vram: 8, storage: 100 }),

  g("black-myth-wukong", "Black Myth: Wukong", 2024, "Game Science", ["Action RPG", "Mythology", "Souls-like"], 45,
    "Unreal Engine 5 showcase with a serious ray-tracing tax.",
    { cpu: "Core i5-8400 / Ryzen 5 1600", cpuScore: 34, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 16, vram: 6, storage: 130 },
    { cpu: "Core i5-11600 / Ryzen 5 5600X", cpuScore: 51, gpu: "RTX 2060 / RX 5700 XT", gpuScore: 25, ram: 16, vram: 8, storage: 130 }),

  g("space-marine-2", "Warhammer 40,000: Space Marine 2", 2024, "Saber Interactive", ["Action", "Co-op", "Sci-Fi"], 20,
    "Thousands of Tyranids, and your CPU has to track them all.",
    { cpu: "Core i5-8600K / Ryzen 5 3600", cpuScore: 34, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 8, vram: 6, storage: 75 },
    { cpu: "Core i7-12700 / Ryzen 7 5800X", cpuScore: 75, gpu: "RTX 3070 / RX 6800", gpuScore: 39, ram: 16, vram: 8, storage: 75 }),

  g("stalker-2", "S.T.A.L.K.E.R. 2", 2024, "GSC Game World", ["FPS", "Survival", "Open World"], 85,
    "The Zone is beautiful, enormous and unoptimised in places.",
    { cpu: "Core i7-7700K / Ryzen 5 2600", cpuScore: 37, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 16, vram: 6, storage: 150 },
    { cpu: "Core i7-11700K / Ryzen 7 5800X", cpuScore: 59, gpu: "RTX 3070 Ti / RX 6800", gpuScore: 41, ram: 32, vram: 8, storage: 150 }),

  g("indiana-jones-great-circle", "Indiana Jones and the Great Circle", 2024, "MachineGames", ["Adventure", "Action", "First Person"], 35,
    "id Tech with mandatory ray tracing, and it looks incredible.",
    { cpu: "Core i7-10700K / Ryzen 7 3700X", cpuScore: 51, gpu: "RTX 2060 Super / RX 6600", gpuScore: 29, ram: 16, vram: 8, storage: 120 },
    { cpu: "Core i7-12700K / Ryzen 7 7700X", cpuScore: 77, gpu: "RTX 3080 / RX 6800 XT", gpuScore: 47, ram: 32, vram: 12, storage: 120 }),

  g("kingdom-come-deliverance-2", "Kingdom Come: Deliverance II", 2025, "Warhorse Studios", ["RPG", "Medieval", "Open World"], 40,
    "Bohemia, 1403. And a very pretty CryEngine.",
    { cpu: "Core i5-8400 / Ryzen 5 1600", cpuScore: 34, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 16, vram: 6, storage: 100 },
    { cpu: "Core i7-12700K / Ryzen 7 5800X3D", cpuScore: 77, gpu: "RTX 3080 / RX 6800 XT", gpuScore: 47, ram: 32, vram: 12, storage: 100 }),

  g("clair-obscur", "Clair Obscur: Expedition 33", 2025, "Sandfall Interactive", ["Turn-Based RPG", "Fantasy", "Story Rich"], 275,
    "A stylish turn-based RPG built in Unreal Engine 5.",
    { cpu: "Core i7-8700K / Ryzen 5 3600", cpuScore: 46, gpu: "GTX 1070 / RX 5700", gpuScore: 22, ram: 8, vram: 6, storage: 55 },
    { cpu: "Core i7-11700K / Ryzen 7 5800X", cpuScore: 59, gpu: "RTX 2070 / RX 6700 XT", gpuScore: 31, ram: 16, vram: 8, storage: 55 }),

  g("borderlands-4", "Borderlands 4", 2025, "Gearbox Software", ["Looter Shooter", "FPS", "Co-op"], 50,
    "Loot, cel shading and a surprisingly steep GPU bar.",
    { cpu: "Core i7-8700K / Ryzen 5 3600", cpuScore: 46, gpu: "RTX 2070 / RX 6700", gpuScore: 31, ram: 16, vram: 8, storage: 80 },
    { cpu: "Core i7-12700K / Ryzen 7 5800X3D", cpuScore: 77, gpu: "RTX 3080 / RX 6800 XT", gpuScore: 47, ram: 32, vram: 12, storage: 80 }),

  g("elden-ring-nightreign", "Elden Ring Nightreign", 2025, "FromSoftware", ["Roguelike", "Co-op", "Action RPG"], 270,
    "Three-player Elden Ring runs. Still capped at 60.",
    { cpu: "Core i5-10600 / Ryzen 5 3600", cpuScore: 48, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 12, vram: 6, storage: 60 },
    { cpu: "Core i7-12700 / Ryzen 7 5800X", cpuScore: 75, gpu: "GTX 1070 / RX 5700", gpuScore: 22, ram: 16, vram: 8, storage: 60 }, { cap: 60 }),

  g("battlefield-6", "Battlefield 6", 2025, "Battlefield Studios", ["FPS", "Military", "Large Scale"], 25,
    "64-player destruction, back to the modern day.",
    { cpu: "Core i5-8400 / Ryzen 5 2600", cpuScore: 34, gpu: "RTX 2060 / RX 5700", gpuScore: 25, ram: 16, vram: 8, storage: 80 },
    { cpu: "Core i7-12700 / Ryzen 7 5800X3D", cpuScore: 75, gpu: "RTX 3070 / RX 6800", gpuScore: 39, ram: 16, vram: 8, storage: 80 }),

  g("arc-raiders", "ARC Raiders", 2025, "Embark Studios", ["Extraction", "Third Person", "Sci-Fi"], 165,
    "Extraction shooting with a slick, scalable look.",
    { cpu: "Core i5-6600K / Ryzen 5 2600", cpuScore: 24, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 16, vram: 6, storage: 60 },
    { cpu: "Core i7-9700K / Ryzen 7 3700X", cpuScore: 52, gpu: "RTX 2070 / RX 6700", gpuScore: 31, ram: 16, vram: 8, storage: 60 }),

  g("marvel-rivals", "Marvel Rivals", 2024, "NetEase Games", ["Hero Shooter", "Free to Play", "Third Person"], 355,
    "Unreal Engine 5 superhero brawls at 6v6.",
    { cpu: "Core i5-6600K / Ryzen 5 2600", cpuScore: 24, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 16, vram: 6, storage: 70 },
    { cpu: "Core i5-10400 / Ryzen 5 3600", cpuScore: 43, gpu: "RTX 2060 / RX 5700", gpuScore: 25, ram: 16, vram: 8, storage: 70 }),

  g("sons-of-the-forest", "Sons of the Forest", 2023, "Endnight Games", ["Survival", "Horror", "Co-op"], 150,
    "Cannibals, construction and a serious shader load.",
    { cpu: "Core i5-8400 / Ryzen 5 2600", cpuScore: 34, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 12, vram: 6, storage: 20 },
    { cpu: "Core i5-11400 / Ryzen 5 3600", cpuScore: 51, gpu: "RTX 2070 / RX 6700", gpuScore: 31, ram: 16, vram: 8, storage: 20 }),

  g("sea-of-thieves", "Sea of Thieves", 2018, "Rare", ["Adventure", "Pirate", "Co-op"], 190,
    "Sailing with friends, and a scale-friendly engine.",
    { cpu: "Core i3-4170 / Ryzen 3 1200", cpuScore: 10, gpu: "GTX 660 / HD 7870", gpuScore: 6, ram: 8, vram: 2, storage: 70 },
    { cpu: "Core i7-4790 / Ryzen 5 1600", cpuScore: 21, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 16, vram: 6, storage: 70 }),

  g("rocket-league", "Rocket League", 2015, "Psyonix", ["Sports", "Competitive", "Free to Play"], 205,
    "Cars playing football. Consistently buttery on PC.",
    { cpu: "Core i3-2100 / Ryzen 3 1200", cpuScore: 4, gpu: "GTX 460 / HD 7750", gpuScore: 3, ram: 4, vram: 1, storage: 20 },
    { cpu: "Core i5-3570K / Ryzen 5 1600", cpuScore: 12, gpu: "GTX 1050 Ti / RX 560", gpuScore: 11, ram: 8, vram: 4, storage: 20 }),

  g("deadlock", "Deadlock", 2024, "Valve", ["MOBA", "Shooter", "Third Person"], 30,
    "Valve's new MOBA-shooter, still deep in development.",
    { cpu: "Core i5-6600 / Ryzen 5 2600", cpuScore: 24, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 8, vram: 6, storage: 50 },
    { cpu: "Core i5-10400 / Ryzen 5 5600", cpuScore: 43, gpu: "RTX 2060 / RX 5700", gpuScore: 25, ram: 16, vram: 8, storage: 50 }),

  g("world-of-warcraft", "World of Warcraft: The War Within", 2024, "Blizzard Entertainment", ["MMORPG", "Fantasy", "Subscription"], 40,
    "Twenty years old, and raids still hammer one CPU core.",
    { cpu: "Core i5-3450 / Ryzen 3 1200", cpuScore: 8, gpu: "GTX 760 / R7 260X", gpuScore: 7, ram: 8, vram: 2, storage: 115 },
    { cpu: "Core i7-6700K / Ryzen 5 3600", cpuScore: 33, gpu: "GTX 1080 / RX 5700 XT", gpuScore: 25, ram: 16, vram: 8, storage: 115 }),

  g("final-fantasy-xiv", "Final Fantasy XIV: Dawntrail", 2024, "Square Enix", ["MMORPG", "Fantasy", "Story Rich"], 260,
    "A graphics update made this MMO notably heavier.",
    { cpu: "Core i5-4460 / Ryzen 3 1200", cpuScore: 15, gpu: "GTX 970 / RX 480", gpuScore: 14, ram: 8, vram: 4, storage: 140 },
    { cpu: "Core i7-7700 / Ryzen 5 3600", cpuScore: 37, gpu: "RTX 2060 / RX 5700", gpuScore: 25, ram: 16, vram: 8, storage: 140 }),

  g("path-of-exile-2", "Path of Exile 2", 2024, "Grinding Gear Games", ["ARPG", "Dark Fantasy", "Free to Play"], 15,
    "Endgame maps are a stress test for any machine.",
    { cpu: "Core i5-4670 / Ryzen 3 1200", cpuScore: 17, gpu: "GTX 1050 Ti / RX 570", gpuScore: 11, ram: 8, vram: 4, storage: 100 },
    { cpu: "Core i7-8700 / Ryzen 5 3600", cpuScore: 42, gpu: "RTX 2060 / RX 5700", gpuScore: 25, ram: 16, vram: 8, storage: 100 }),

  g("deep-rock-galactic", "Deep Rock Galactic", 2020, "Ghost Ship Games", ["Co-op", "FPS", "Mining"], 42,
    "Rock and stone, at a very comfortable frame rate.",
    { cpu: "Core i3-530 / Ryzen 3 1200", cpuScore: 3, gpu: "GTX 460 / HD 5770", gpuScore: 3, ram: 6, vram: 1, storage: 3 },
    { cpu: "Core i5-4460 / Ryzen 5 1600", cpuScore: 15, gpu: "GTX 970 / RX 570", gpuScore: 14, ram: 8, vram: 4, storage: 3 }),

  g("lethal-company", "Lethal Company", 2023, "Zeekerss", ["Co-op", "Horror", "Indie"], 90,
    "Ugly on purpose, cheap to run, terrifying anyway.",
    { cpu: "Core i3-2100 / Ryzen 3 1200", cpuScore: 4, gpu: "GTX 650 / HD 7750", gpuScore: 4, ram: 4, vram: 2, storage: 2 },
    { cpu: "Core i5-4460 / Ryzen 5 1600", cpuScore: 15, gpu: "GTX 1050 Ti / RX 560", gpuScore: 11, ram: 8, vram: 4, storage: 2 }),

  g("peak", "PEAK", 2025, "Aggro Crab / Landfall", ["Co-op", "Climbing", "Indie"], 120,
    "A co-op climbing game with a tiny hardware footprint.",
    { cpu: "Core i5-6600 / Ryzen 3 1200", cpuScore: 24, gpu: "GTX 970 / RX 570", gpuScore: 14, ram: 8, vram: 4, storage: 10 },
    { cpu: "Core i7-9700 / Ryzen 5 3600", cpuScore: 51, gpu: "GTX 1660 / RX 5600 XT", gpuScore: 20, ram: 16, vram: 6, storage: 10 }),

  g("repo", "R.E.P.O.", 2025, "semiwork", ["Co-op", "Horror", "Physics"], 330,
    "Physics-based panic in dark corridors.",
    { cpu: "Core i5-8400 / Ryzen 5 2600", cpuScore: 34, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 8, vram: 6, storage: 10 },
    { cpu: "Core i7-9700 / Ryzen 5 3600", cpuScore: 51, gpu: "RTX 2060 / RX 5700", gpuScore: 25, ram: 16, vram: 6, storage: 10 }),

  g("satisfactory", "Satisfactory", 2024, "Coffee Stain Studios", ["Factory", "Open World", "Co-op"], 45,
    "Your factory will eventually be limited by CPU, not GPU.",
    { cpu: "Core i5-3570K / Ryzen 3 1200", cpuScore: 12, gpu: "GTX 660 / HD 7870", gpuScore: 6, ram: 8, vram: 2, storage: 20 },
    { cpu: "Core i5-8600 / Ryzen 5 3600", cpuScore: 34, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 16, vram: 6, storage: 20 }),

  g("factorio", "Factorio", 2020, "Wube Software", ["Factory", "Strategy", "Indie"], 30,
    "The factory must grow. The frame rate must not drop.",
    { cpu: "Core i5-2500K / Ryzen 3 1200", cpuScore: 10, gpu: "Intel HD 4000", gpuScore: 1, ram: 8, vram: 1, storage: 2 },
    { cpu: "Core i5-8400 / Ryzen 5 3600", cpuScore: 34, gpu: "GTX 1050 Ti / RX 560", gpuScore: 11, ram: 16, vram: 4, storage: 2 }),

  g("stardew-valley", "Stardew Valley", 2016, "ConcernedApe", ["Farming", "Indie", "Co-op"], 100,
    "A farm, a town, and almost no hardware requirements.",
    { cpu: "Core i3-2100 / Athlon II X2", cpuScore: 4, gpu: "Intel HD 4000", gpuScore: 1, ram: 4, vram: 1, storage: 1 },
    { cpu: "Core i5-3570K / Ryzen 3 1200", cpuScore: 12, gpu: "GTX 660 / HD 7850", gpuScore: 6, ram: 8, vram: 2, storage: 1 }),

  g("terraria", "Terraria", 2011, "Re-Logic", ["Sandbox", "Indie", "Co-op"], 130,
    "Two dimensions, thousands of hours, no GPU required.",
    { cpu: "Core i3-2100 / Athlon II X2", cpuScore: 4, gpu: "Intel HD 4000", gpuScore: 1, ram: 4, vram: 1, storage: 1 },
    { cpu: "Core i5-3570K / Ryzen 3 1200", cpuScore: 12, gpu: "GTX 660 / HD 7850", gpuScore: 6, ram: 8, vram: 2, storage: 1 }),

  g("balatro", "Balatro", 2024, "LocalThunk", ["Roguelike", "Card Game", "Indie"], 350,
    "Poker roguelike. Runs on a smart fridge.",
    { cpu: "Core i3-2100 / Athlon II X2", cpuScore: 4, gpu: "Integrated graphics", gpuScore: 1, ram: 4, vram: 1, storage: 1 },
    { cpu: "Core i3-8100 / Ryzen 3 1200", cpuScore: 28, gpu: "GTX 1050 / RX 560", gpuScore: 9, ram: 8, vram: 2, storage: 1 }),

  g("hades-2", "Hades II", 2024, "Supergiant Games", ["Roguelike", "Action", "Greek Mythology"], 350,
    "Fast, stylish and built to run everywhere.",
    { cpu: "Core i3-2100 / Ryzen 3 1200", cpuScore: 4, gpu: "GTX 650 / HD 7750", gpuScore: 4, ram: 8, vram: 2, storage: 10 },
    { cpu: "Core i5-3570K / Ryzen 5 1600", cpuScore: 12, gpu: "GTX 970 / RX 570", gpuScore: 14, ram: 16, vram: 4, storage: 10 }),

  g("minecraft", "Minecraft", 2011, "Mojang Studios", ["Sandbox", "Survival", "Multiplayer"], 120,
    "Vanilla is light. Shaders and 300 mods are not.",
    { cpu: "Core i3-3210 / Ryzen 3 1200", cpuScore: 5, gpu: "Intel HD 4000", gpuScore: 1, ram: 4, vram: 1, storage: 4 },
    { cpu: "Core i5-8400 / Ryzen 5 2600", cpuScore: 34, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 8, vram: 4, storage: 4 }),

  g("roblox", "Roblox", 2006, "Roblox Corporation", ["Sandbox", "Multiplayer", "Free to Play"], 15,
    "Performance depends entirely on which game you open.",
    { cpu: "Core i3-2120 / Ryzen 3 1200", cpuScore: 4, gpu: "Intel HD 4000", gpuScore: 1, ram: 4, vram: 1, storage: 20 },
    { cpu: "Core i5-4460 / Ryzen 5 1600", cpuScore: 15, gpu: "GTX 1050 / RX 560", gpuScore: 11, ram: 8, vram: 4, storage: 20 }),

  g("the-sims-4", "The Sims 4", 2014, "Maxis", ["Life Sim", "Sandbox", "Free to Play"], 100,
    "Base game is light. Forty expansion packs, less so.",
    { cpu: "Core i3-3220 / Ryzen 3 1200", cpuScore: 6, gpu: "GT 630 / HD 7750", gpuScore: 3, ram: 4, vram: 1, storage: 15 },
    { cpu: "Core i5-4460 / Ryzen 5 1600", cpuScore: 15, gpu: "GTX 1050 / RX 560", gpuScore: 11, ram: 8, vram: 4, storage: 15 }),

  g("cities-skylines-2", "Cities: Skylines II", 2023, "Colossal Order", ["City Builder", "Simulation", "Strategy"], 195,
    "A city sim that is limited by your CPU long before your GPU.",
    { cpu: "Core i7-6700K / Ryzen 5 2600", cpuScore: 33, gpu: "GTX 970 / RX 570", gpuScore: 14, ram: 16, vram: 4, storage: 60 },
    { cpu: "Core i7-9700K / Ryzen 7 3700X", cpuScore: 52, gpu: "RTX 3080 / RX 6800 XT", gpuScore: 47, ram: 16, vram: 8, storage: 60 }),

  g("total-war-warhammer-3", "Total War: Warhammer III", 2022, "Creative Assembly", ["Strategy", "Fantasy", "Turn-Based"], 280,
    "Ten thousand units, one very busy processor.",
    { cpu: "Core i3-8100 / Ryzen 3 1200", cpuScore: 28, gpu: "GTX 770 / R9 280X", gpuScore: 8, ram: 6, vram: 3, storage: 120 },
    { cpu: "Core i5-11400 / Ryzen 5 3600", cpuScore: 51, gpu: "RTX 2060 / RX 5700", gpuScore: 25, ram: 16, vram: 8, storage: 120 }),

  g("age-of-empires-4", "Age of Empires IV", 2021, "Relic Entertainment", ["RTS", "Strategy", "History"], 30,
    "A classic RTS with a tidy, scalable engine.",
    { cpu: "Core i5-4460 / Ryzen 3 1200", cpuScore: 15, gpu: "GTX 650 / HD 7750", gpuScore: 4, ram: 8, vram: 2, storage: 50 },
    { cpu: "Core i5-8400 / Ryzen 5 2600", cpuScore: 34, gpu: "GTX 970 / RX 570", gpuScore: 14, ram: 16, vram: 4, storage: 50 }),

  g("mount-and-blade-2-bannerlord", "Mount & Blade II: Bannerlord", 2020, "TaleWorlds", ["Strategy", "Medieval", "Sandbox"], 35,
    "A thousand soldiers on screen is a CPU benchmark.",
    { cpu: "Core i3-8100 / Ryzen 3 1200", cpuScore: 28, gpu: "GTX 660 / HD 7850", gpuScore: 6, ram: 8, vram: 2, storage: 60 },
    { cpu: "Core i5-9600K / Ryzen 5 3600", cpuScore: 40, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 16, vram: 6, storage: 60 }),

  g("subnautica", "Subnautica", 2018, "Unknown Worlds", ["Survival", "Underwater", "Open World"], 190,
    "Beautiful, terrifying, and light enough for old laptops.",
    { cpu: "Core i5-2500K / Ryzen 3 1200", cpuScore: 10, gpu: "GTX 550 Ti / HD 7750", gpuScore: 3, ram: 8, vram: 2, storage: 8 },
    { cpu: "Core i5-3570K / Ryzen 5 1600", cpuScore: 12, gpu: "GTX 960 / RX 470", gpuScore: 9, ram: 8, vram: 4, storage: 8 }),

  g("euro-truck-simulator-2", "Euro Truck Simulator 2", 2012, "SCS Software", ["Simulation", "Driving", "Relaxing"], 200,
    "Still updated, still runs on a decade-old office PC.",
    { cpu: "Core i5-2500K / Ryzen 3 1200", cpuScore: 10, gpu: "GTX 660 / HD 7850", gpuScore: 6, ram: 6, vram: 2, storage: 25 },
    { cpu: "Core i5-8400 / Ryzen 5 2600", cpuScore: 34, gpu: "GTX 1060 6GB / RX 580", gpuScore: 17, ram: 12, vram: 6, storage: 25 }),

  g("skyrim-se", "The Elder Scrolls V: Skyrim SE", 2016, "Bethesda Game Studios", ["RPG", "Fantasy", "Open World"], 205,
    "Mod it until it breaks, then mod it some more.",
    { cpu: "Core i5-750 / Ryzen 3 1200", cpuScore: 5, gpu: "GTX 470 / HD 7870", gpuScore: 3, ram: 8, vram: 2, storage: 12 },
    { cpu: "Core i5-2500K / Ryzen 5 1600", cpuScore: 10, gpu: "GTX 970 / RX 570", gpuScore: 14, ram: 8, vram: 4, storage: 12 }),
];

/** Convenience lookups used across the app. */

/**
 * Typical frame rate on the recommended GPU at 1080p / High.
 *
 * A single global anchor would make esports titles look unplayable and old
 * games look heavy, so each game gets its own calibration point. Anything not
 * listed falls back to 62 FPS.
 */
const FPS_AT_RECOMMENDED: Record<string, number> = {
  "counter-strike-2": 170,
  valorant: 240,
  "league-of-legends": 200,
  "dota-2": 150,
  "rocket-league": 180,
  fortnite: 110,
  "overwatch-2": 110,
  "apex-legends": 100,
  "rainbow-six-siege": 140,
  pubg: 85,
  "escape-from-tarkov": 75,
  "destiny-2": 100,
  "halo-infinite": 85,
  "battlefield-1": 90,
  "titanfall-2": 110,
  "doom-2016": 110,
  "doom-eternal": 150,
  "gta-v": 90,
  "the-witcher-3": 70,
  "red-dead-redemption-2": 60,
  "cyberpunk-2077": 58,
  "baldurs-gate-3": 60,
  "elden-ring": 60,
  "monster-hunter-world": 65,
  "monster-hunter-wilds": 55,
  sekiro: 60,
  "dark-souls-3": 60,
  "lies-of-p": 70,
  "resident-evil-2": 90,
  "resident-evil-4-remake": 70,
  "resident-evil-village": 80,
  "silent-hill-2": 55,
  control: 65,
  "alan-wake-2": 50,
  "metro-exodus": 75,
  "death-stranding": 90,
  "horizon-zero-dawn": 75,
  "horizon-forbidden-west": 55,
  "god-of-war": 75,
  "spider-man-remastered": 70,
  "spider-man-miles-morales": 65,
  "spider-man-2": 60,
  "ratchet-and-clank-rift-apart": 70,
  returnal: 65,
  "the-last-of-us-part-1": 60,
  "ghost-of-tsushima": 75,
  "uncharted-legacy-of-thieves": 75,
  "detroit-become-human": 75,
  "forza-horizon-5": 90,
  "microsoft-flight-simulator": 45,
  starfield: 55,
  "diablo-4": 90,
  "hogwarts-legacy": 60,
  "dead-space": 65,
  "atomic-heart": 70,
  "dying-light-2": 65,
  "far-cry-6": 75,
  "assassins-creed-valhalla": 65,
  "assassins-creed-mirage": 75,
  "assassins-creed-shadows": 55,
  "star-wars-jedi-fallen-order": 80,
  "star-wars-jedi-survivor": 60,
  "it-takes-two": 90,
  valheim: 80,
  palworld: 70,
  grounded: 80,
  "grounded-2": 65,
  "helldivers-2": 70,
  "black-myth-wukong": 55,
  "space-marine-2": 60,
  "stalker-2": 55,
  "indiana-jones-great-circle": 60,
  "kingdom-come-deliverance-2": 55,
  "clair-obscur": 60,
  "borderlands-4": 55,
  "elden-ring-nightreign": 60,
  "battlefield-6": 70,
  "arc-raiders": 70,
  "marvel-rivals": 70,
  "sons-of-the-forest": 65,
  "sea-of-thieves": 90,
  deadlock: 120,
  "world-of-warcraft": 90,
  "final-fantasy-xiv": 80,
  "path-of-exile-2": 70,
  "deep-rock-galactic": 100,
  "lethal-company": 90,
  peak: 90,
  repo: 90,
  satisfactory: 80,
  factorio: 120,
  "stardew-valley": 120,
  terraria: 120,
  balatro: 200,
  "hades-2": 120,
  minecraft: 120,
  roblox: 90,
  "the-sims-4": 100,
  "cities-skylines-2": 50,
  "total-war-warhammer-3": 65,
  "age-of-empires-4": 90,
  "mount-and-blade-2-bannerlord": 70,
  subnautica: 80,
  "euro-truck-simulator-2": 90,
  "skyrim-se": 100,
};

for (const game of GAMES) {
  game.fpsAtRecommended =
    FPS_AT_RECOMMENDED[game.slug] ?? game.fpsAtRecommended ?? 62;
  game.summaryPt = SUMMARY_PT[game.slug];

  const steam = STEAM_DATA[game.slug];
  if (steam) {
    game.steamAppId = steam.appId;
    game.steamPlayers = steam.players;
  }
}

// Rank every Steam title, including the rare zero-player entry, so sorting is
// deterministic even when the live endpoint has nothing to report.
const steamRanked = GAMES.filter((game) => game.steamAppId).sort(
  (a, b) => (b.steamPlayers ?? 0) - (a.steamPlayers ?? 0),
);
steamRanked.forEach((game, index) => {
  game.steamRank = index + 1;
});

export const GAME_BY_SLUG = new Map(GAMES.map((game) => [game.slug, game]));
export const ALL_GENRES = Array.from(new Set(GAMES.flatMap((game) => game.genres))).sort();
export const GAME_COUNT = GAMES.length;
