import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Fallback for builds without git history (shallow clone, source tarball, no git
// binary). Bump this when you change page content and the git lookup below is
// unavailable — a wrong-but-stable date beats stamping "modified now" on every build.
const FALLBACK_LAST_MODIFIED = "2026-09-05T17:02:35-05:00";

// Paths whose commits represent a real content change to the one page this site
// serves. sitemap.ts and robots.ts are excluded so editing the metadata routes
// does not itself claim the content changed.
const CONTENT_PATHS = [
  "app",
  "components",
  ":(exclude)app/sitemap.ts",
  ":(exclude)app/robots.ts",
];

/**
 * Date of the last commit touching page content, read from git at build time.
 * Runs during `next build` only (this route is force-static), so nothing here
 * ships to the browser or runs at request time.
 */
function contentLastModified(): Date {
  try {
    const committerDate = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", ...CONTENT_PATHS],
      { cwd: process.cwd(), encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();

    if (committerDate) {
      const parsed = new Date(committerDate);
      if (!Number.isNaN(parsed.getTime())) return parsed;
    }
  } catch {
    // git missing or not a repository — fall through to the constant.
  }

  return new Date(FALLBACK_LAST_MODIFIED);
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://raymondflores.github.io",
      lastModified: contentLastModified(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
