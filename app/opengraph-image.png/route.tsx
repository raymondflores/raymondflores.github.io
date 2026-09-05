import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// A route (rather than the `opengraph-image` file convention) so the static
// export lands at `/opengraph-image.png`. The convention emits an extensionless
// file, which GitHub Pages serves as application/octet-stream and scrapers reject.
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

const assets = join(process.cwd(), "assets");

const interRegular = readFileSync(join(assets, "fonts/Inter-Regular.ttf"));
const interBold = readFileSync(join(assets, "fonts/Inter-Bold.ttf"));
const portrait = `data:image/jpeg;base64,${readFileSync(
  join(assets, "og-portrait.jpg")
).toString("base64")}`;

const stack = ["TypeScript", "React", "Node.js", "React Native", "Astro"];

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#0a0f1e",
          fontFamily: "Inter",
        }}
      >
        {/* Glow blobs — radial-gradient stands in for blur(), which satori omits.
            The site's dot-grid texture is skipped here: satori does not tile
            background gradients, so it would render as flat color. */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -60,
            width: 700,
            height: 700,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle, rgba(56,189,248,0.20) 0%, rgba(56,189,248,0) 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: -140,
            width: 620,
            height: 620,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle, rgba(34,211,238,0.14) 0%, rgba(34,211,238,0) 65%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            height: "100%",
            padding: "72px 76px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", width: 660 }}>
            {/* Location badge. Deliberately NOT an "Open to new
                opportunities" pill — the hero carries no such badge, and the
                share card should not advertise what the site itself does
                not. */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "flex-start",
                gap: 10,
                padding: "9px 18px",
                borderRadius: 999,
                backgroundColor: "rgba(56,189,248,0.10)",
                border: "1px solid rgba(56,189,248,0.25)",
                color: "#38bdf8",
                fontSize: 21,
                fontWeight: 600,
              }}
            >
              {/* lucide map-pin, inlined — satori renders SVG but not React icon components */}
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Austin, TX
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 34,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 92,
                  fontWeight: 700,
                  color: "#f1f5f9",
                  lineHeight: 1.02,
                  letterSpacing: "-0.035em",
                }}
              >
                Raymond Flores
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 18,
                  fontSize: 34,
                  fontWeight: 600,
                  color: "#38bdf8",
                  letterSpacing: "-0.01em",
                }}
              >
                Senior Software Engineer
              </div>
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 25,
                color: "#94a3b8",
                lineHeight: 1.45,
                maxWidth: 560,
              }}
            >
              10+ years owning the layer between services and the client.
            </div>

            {/* Stack chips */}
            <div
              style={{
                display: "flex",
                marginTop: 36,
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              {stack.map((tech) => (
                <div
                  key={tech}
                  style={{
                    display: "flex",
                    padding: "8px 16px",
                    borderRadius: 8,
                    border: "1px solid #1e2d40",
                    backgroundColor: "rgba(17,24,39,0.6)",
                    color: "#94a3b8",
                    fontSize: 20,
                    fontWeight: 500,
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Portrait */}
          <div style={{ display: "flex", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: -46,
                display: "flex",
                backgroundImage:
                  "radial-gradient(circle, rgba(56,189,248,0.30) 0%, rgba(56,189,248,0) 70%)",
              }}
            />
            <img
              src={portrait}
              alt=""
              width={340}
              height={340}
              style={{
                width: 340,
                height: 340,
                borderRadius: 24,
                border: "1px solid rgba(56,189,248,0.30)",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        {/* Bottom accent rule */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 5,
            display: "flex",
            backgroundImage:
              "linear-gradient(90deg, #38bdf8 0%, #22d3ee 45%, rgba(34,211,238,0) 100%)",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
      ],
    }
  );
}
