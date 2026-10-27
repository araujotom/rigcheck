import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { GAME_COUNT } from "@/lib/games";
import { SITE_NAME } from "@/lib/site";

const description = `Check your CPU, GPU and RAM against ${GAME_COUNT} PC games. See the verdict, recommended settings, estimated frame rate and the part holding you back — in your browser, with no signup.`;

export const metadata: Metadata = {
  description,
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: `${SITE_NAME} — can your PC run it?`,
    description,
  },
};

export default function Page() {
  return <HomePage />;
}
