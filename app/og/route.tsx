import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site.config";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.06) 0%, transparent 50%)",
          color: "#f0f0f0",
          fontFamily: "system-ui",
        }}
      >
        {/* Star dots */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.15) 0%, transparent 100%), radial-gradient(1px 1px at 30% 60%, rgba(200,200,200,0.1) 0%, transparent 100%), radial-gradient(1.5px 1.5px at 50% 10%, rgba(255,255,255,0.12) 0%, transparent 100%), radial-gradient(1px 1px at 70% 40%, rgba(180,180,180,0.08) 0%, transparent 100%), radial-gradient(1px 1px at 90% 80%, rgba(255,255,255,0.1) 0%, transparent 100%)",
          }}
        />

        <div style={{ fontSize: 24, color: "#a0a0a0", marginBottom: 8 }}>
          Welcome to my universe ✦
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            background: "linear-gradient(135deg, #ffffff, #a0a0a0)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 24, color: "#707070", marginTop: 16 }}>
          {siteConfig.tagline}
        </div>
        <div
          style={{
            marginTop: 40,
            width: 80,
            height: 3,
            borderRadius: 2,
            background: "linear-gradient(90deg, #ffffff, #555555)",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
