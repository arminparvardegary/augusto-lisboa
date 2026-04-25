import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Augusto Lisboa · Better Food, Better Mood";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#F5EFE6",
          color: "#3D2B1F",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>· Augusto · Lisboa · Belém ·</div>
          <div style={{ display: "flex" }}>Est. 2021</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 28, color: "#B8894A", fontStyle: "italic" }}>
            A better morning in
          </div>
          <div style={{ fontSize: 168, lineHeight: 1, letterSpacing: -3 }}>
            Belém.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
          }}
        >
          <div style={{ maxWidth: 520 }}>
            Better food, better mood. Specialty coffee and brunch on Rua de
            Belém.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            augustolisboa.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
