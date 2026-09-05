import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

// Static export turns this into out/404.html, which GitHub Pages serves for
// every unmatched path on the domain. It renders without the Header, whose
// scroll-spy assumes the section anchors of the home page exist.
export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main
        id="main-content"
        tabIndex={-1}
        className="relative flex min-h-screen items-center overflow-clip"
      >
        {/* Same decorative layers as the hero, so a bad path still looks like
            the rest of the site. */}
        <div className="no-print absolute inset-0 dot-grid" aria-hidden="true" />
        <div
          className="no-print pointer-events-none absolute right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-20">
          <div className="max-w-xl space-y-8">
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-widest text-primary">
                Error 404
              </p>
              <h1 className="gradient-text text-6xl font-bold leading-none lg:text-7xl">
                Page not
                <br />
                found
              </h1>
            </div>

            <p className="max-w-lg leading-relaxed text-muted-foreground">
              {
                "That link doesn't point anywhere on this site — it may have moved, or never existed. Everything lives on a single page, so the way back is short."
              }
            </p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Back to home
              </Link>
              <Link
                href="/#experience"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-all hover:border-primary/40 hover:bg-card/50"
              >
                <Compass size={16} aria-hidden="true" />
                See my experience
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
