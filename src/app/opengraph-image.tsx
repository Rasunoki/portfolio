import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
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
          background: "#0a0a0a",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#ffffff",
              color: "#0a0a0a",
              fontSize: 28,
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {site.initials}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>
        </div>

        {/* Name */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Joseph Rafael
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            A. Macasling
          </div>
          <div
            style={{
              marginTop: 28,
              height: 2,
              width: 220,
              background: "rgba(255,255,255,0.2)",
            }}
          />
        </div>

        {/* Role + location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              color: "#4f8ef7",
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Designer · Director · Photographer
          </div>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 24 }}>
            {site.location}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
