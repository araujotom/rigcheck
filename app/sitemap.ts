import type { MetadataRoute } from "next";
import { GAMES } from "@/lib/games";
import { SITE_URL } from "@/lib/site";
import { STEAM_SNAPSHOT } from "@/lib/steam";

export default function sitemap(): MetadataRoute.Sitemap {
  // Tie lastmod to the data snapshot instead of the build time so routine
  // deploys do not tell crawlers that every page changed.
  const lastModified = new Date(`${STEAM_SNAPSHOT}T00:00:00Z`);

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/games`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...GAMES.map((game) => ({
      url: `${SITE_URL}/games/${game.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
