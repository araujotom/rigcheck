import type { Metadata } from "next";
import { GameLibrary } from "@/components/game-library";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { GAME_COUNT } from "@/lib/games";

export const metadata: Metadata = {
  title: "Game library — RigCheck",
  description: `Browse all ${GAME_COUNT} games in the RigCheck database and see how each one scores against your CPU, GPU and RAM.`,
  alternates: { canonical: "/games" },
  openGraph: {
    url: "/games",
    title: "Game library — RigCheck",
    description: `Browse all ${GAME_COUNT} games in the RigCheck database and see how each one scores against your PC.`,
  },
};

export default function GamesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <GameLibrary />
      </main>
      <SiteFooter />
    </>
  );
}
