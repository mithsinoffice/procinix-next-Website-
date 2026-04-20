import { ImageResponse } from "next/og";

export const alt = "Procinix — Automation & Beyond";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#041F22",
          backgroundImage: [
            "radial-gradient(40% 50% at 85% 15%, rgba(143,99,248,0.35), transparent 70%)",
            "radial-gradient(60% 60% at 20% 90%, rgba(240,166,58,0.20), transparent 70%)",
            "radial-gradient(70% 70% at 50% 0%, rgba(17,197,198,0.30), transparent 70%)",
          ].join(", "),
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Top row: brand lockup */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: "rgba(17,197,198,0.1)",
              border: "1px solid rgba(17,197,198,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 900,
              color: "#18D6D3",
              letterSpacing: -1,
            }}
          >
            P
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: -0.5,
                color: "white",
              }}
            >
              procinix.ai
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#F0A63A",
                marginTop: 4,
              }}
            >
              Automation & Beyond
            </div>
          </div>
        </div>

        {/* Main headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 1000,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2.5,
              color: "white",
            }}
          >
            Don't change your business
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2.5,
              color: "#18D6D3",
              marginTop: 4,
            }}
          >
            to fit software.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 900,
              marginTop: 28,
            }}
          >
            A unified finance operations platform — agentic AI, intelligent
            workflows, and real-time analytics across Source-to-Pay,
            Order-to-Cash, and Record-to-Report.
          </div>
        </div>

        {/* Bottom row: chips + url */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            {["Agentic AI", "Multi-Entity", "99%+ Accuracy", "Enterprise"].map(
              (label) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    padding: "10px 18px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.15)",
                    backgroundColor: "rgba(255,255,255,0.04)",
                    fontSize: 15,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  {label}
                </div>
              ),
            )}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 600,
              color: "#18D6D3",
              letterSpacing: -0.3,
            }}
          >
            www.procinix.ai
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
