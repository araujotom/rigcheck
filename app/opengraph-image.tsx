import { ImageResponse } from "next/og";
import { CPUS, GPUS } from "@/lib/hardware";
import { GAME_COUNT } from "@/lib/games";

export const alt = "RigCheck — can your PC run it?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
              width: 46,
              height: 46,
              borderRadius: 11,
              background: "#c9f75a",
              color: "#060709",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            RC
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>
            <span>RIG</span>
            <span style={{ color: "#c9f75a" }}>CHECK</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            Can your PC
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            <span>run it</span>
            <span style={{ color: "#c9f75a" }}>?</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 22,
            color: "rgba(244,245,247,0.55)",
          }}
        >
          <span>{GAME_COUNT} games</span>
          <span style={{ color: "rgba(201,247,90,0.8)" }}>·</span>
          <span>{CPUS.length} CPUs</span>
          <span style={{ color: "rgba(201,247,90,0.8)" }}>·</span>
          <span>{GPUS.length} GPUs</span>
          <span style={{ color: "rgba(201,247,90,0.8)" }}>·</span>
          <span>No signup</span>
        </div>
      </div>
    ),
    size,
  );
}
