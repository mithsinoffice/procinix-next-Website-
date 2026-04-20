import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#041F22",
          backgroundImage:
            "radial-gradient(60% 60% at 30% 20%, rgba(17,197,198,0.35), transparent 70%)",
          borderRadius: 40,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 140,
            fontWeight: 900,
            letterSpacing: -4,
            color: "#18D6D3",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          P
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 42,
            right: 38,
            width: 16,
            height: 16,
            borderRadius: 999,
            backgroundColor: "#F0A63A",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
