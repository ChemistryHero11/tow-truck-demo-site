import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "RapidTow - 24/7 Emergency Towing & Roadside Assistance";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Hazard stripes at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "repeating-linear-gradient(90deg, #f97316, #f97316 20px, #0f172a 20px, #0f172a 40px)",
          }}
        />

        {/* Logo container */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "#f97316",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
            }}
          >
            🚛
          </div>
          <div
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "white",
              letterSpacing: "4px",
            }}
          >
            RAPID<span style={{ color: "#f97316" }}>TOW</span>
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "42px",
            color: "white",
            fontWeight: "bold",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          24/7 Emergency Towing & Recovery
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "28px",
            color: "rgba(255,255,255,0.7)",
            marginBottom: "32px",
          }}
        >
          Houston&apos;s Fastest Response • 30 Min Average ETA
        </div>

        {/* CTA Banner */}
        <div
          style={{
            background: "#f97316",
            padding: "16px 48px",
            borderRadius: "12px",
            fontSize: "32px",
            fontWeight: "bold",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          📞 Call Now for Immediate Help
        </div>

        {/* Hazard stripes at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "repeating-linear-gradient(90deg, #f97316, #f97316 20px, #0f172a 20px, #0f172a 40px)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
