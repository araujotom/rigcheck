import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GameDetail } from "@/components/game-detail";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { GAMES, GAME_BY_SLUG } from "@/lib/games";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { steamCoverUrl } from "@/lib/steam";

export function generateStaticParams() {
  return GAMES.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = GAME_BY_SLUG.get(slug);
  if (!game) return { title: "Game not found — RigCheck" };

  const title = `${game.title} — can my PC run it?`;
  const description = `${game.summary} Minimum and recommended specs, plus how your rig compares.`;

  return {
    title,
    description,
    alternates: { canonical: `/games/${game.slug}` },
    openGraph: {
      type: "article",
      url: `/games/${game.slug}`,
      title,
      description,
      siteName: SITE_NAME,
    },
  };
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = GAME_BY_SLUG.get(slug);
  if (!game) notFound();

  const similar = GAMES.filter(
    (candidate) =>
      candidate.slug !== game.slug &&
      candidate.genres.some((genre) => game.genres.includes(genre)),
  )
    .sort((a, b) => b.year - a.year)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    url: `${SITE_URL}/games/${game.slug}`,
    description: game.summary,
    datePublished: String(game.year),
    author: { "@type": "Organization", name: game.developer },
    genre: game.genres,
    gamePlatform: "PC",
    operatingSystem: "Windows",
    image: game.cover
      ? `${SITE_URL}${game.cover}`
      : (steamCoverUrl(game.steamAppId) ?? undefined),
  };

  return (
    <>
      <SiteHeader />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GameDetail game={game} similar={similar} />
      </main>
      <SiteFooter />
    </>
  );
}
