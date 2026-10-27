import { ImageResponse } from "next/og";
import { GAME_BY_SLUG } from "@/lib/games";

export const alt = "Game requirements on RigCheck";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = GAME_BY_SLUG.get(slug);

  if (!game) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            background: "#060709",
            color: "#f4f5f7",
            fontSize: 48,
          }}
        >
          Game not found — RigCheck
        </div>
      ),
      size,
    );
  }

  const titleSize = game.title.length > 34 ? 48 : game.title.length > 24 ? 56 : 66;
  const meta = [game.developer, String(game.year), ...game.genres.slice(0, 2)].join("  ·  ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#060709",
          padding: "64px 72px",
          color: "#f4f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "#c9f75a",
              color: "#060709",
              fontSize: 21,
              fontWeight: 700,
            }}
          >
            RC
          </div>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>
            <span>RIG</span>
            <span style={{ color: "#c9f75a" }}>CHECK</span>
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: 12,
              fontSize: 16,
              letterSpacing: 4,
              color: "rgba(244,245,247,0.4)",
            }}
          >
            PC REQUIREMENTS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.06,
              maxWidth: 1010,
            }}
          >
            {game.title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 22,
              color: "rgba(244,245,247,0.55)",
            }}
          >
            {meta}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#c9f75a",
            }}
          />
          <div style={{ display: "flex", fontSize: 22, color: "#c9f75a" }}>
            Can your PC run it?
          </div>
        </div>
      </div>
    ),
    size,
  );
}
