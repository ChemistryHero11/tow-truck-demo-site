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
          background: "#0f172a",
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
        {/* Large tow truck icon in center */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Tow truck SVG icon */}
          <svg
            width="200"
            height="200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f97316"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 17h4V5H2v12h3" />
            <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1" />
            <circle cx="7.5" cy="17.5" r="2.5" fill="#f97316" stroke="#f97316" />
            <circle cx="17.5" cy="17.5" r="2.5" fill="#f97316" stroke="#f97316" />
          </svg>

          {/* Company name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "32px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                background: "#f97316",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 17h4V5H2v12h3" />
                <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1" />
                <circle cx="7.5" cy="17.5" r="2.5" />
                <circle cx="17.5" cy="17.5" r="2.5" />
              </svg>
            </div>
            <div
              style={{
                fontSize: "72px",
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
              fontSize: "36px",
              color: "rgba(255,255,255,0.8)",
              marginTop: "24px",
              fontWeight: "600",
            }}
          >
            24/7 Emergency Towing & Roadside Assistance
          </div>

          {/* Location */}
          <div
            style={{
              fontSize: "28px",
              color: "#f97316",
              marginTop: "16px",
              fontWeight: "500",
            }}
          >
            Houston, TX • 30 Min Response Time
          </div>
        </div>

        {/* Orange glow effect behind truck */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            zIndex: -1,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
