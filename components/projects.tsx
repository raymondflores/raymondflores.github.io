import { ExternalLink } from "lucide-react";

interface Screenshot {
  /** Path stem under `public/` — `.avif`, `.webp`, and `.jpg` all exist. */
  src: string;
  alt: string;
  caption: string;
}

interface Project {
  name: string;
  url: string;
  urlLabel: string;
  tagline: string;
  highlights: string[];
  screenshots?: Screenshot[];
  technologies: string[];
}

const projects: Project[] = [
  {
    name: "BirdieLab",
    url: "https://birdielab.app",
    urlLabel: "birdielab.app",
    tagline:
      "A golf round tracker for iOS and Android — hole-by-hole scoring, on-course GPS distances, USGA handicap index calculation, course discovery, and reviews.",
    highlights: [
      "Designed and shipped v1.4.0 end to end, owning both sides of the stack",
      "Expo SDK 54 / React Native / Apollo Client against a Node, Apollo Server v4, and TypeGraphQL API with DataLoader batching, rate limiting, and Supabase Postgres with ES256 JWT auth",
      "Push notifications, offline handling, an automated course data pipeline, an Astro landing page, and EAS build/submit with OTA updates on GitHub Actions CI",
    ],
    screenshots: [
      {
        src: "/birdielab-scorecard",
        alt: "BirdieLab scorecard screen showing strokes and putts for hole 1",
        caption: "Hole-by-hole scoring",
      },
      {
        src: "/birdielab-gps",
        alt: "BirdieLab GPS screen showing satellite hole view with distances to the green",
        caption: "GPS distance to the green",
      },
      {
        src: "/birdielab-round-summary",
        alt: "BirdieLab round summary screen showing a full 18-hole scorecard and performance stats",
        caption: "Round summary and stats",
      },
    ],
    technologies: [
      "Expo",
      "React Native",
      "Apollo Client",
      "Node.js",
      "TypeGraphQL",
      "Supabase",
      "Astro",
      "GitHub Actions",
    ],
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="animate-fade-up text-xs font-semibold uppercase tracking-widest text-primary mb-16">
          Projects
        </h2>

        <div className="grid gap-6">
          {projects.map((project) => (
            <div
              key={project.name}
              className="animate-fade-up group min-w-0 p-6 rounded-xl border border-border bg-card/30 hover:border-primary/30 hover:bg-card/60 transition-all lg:grid lg:grid-cols-2 lg:gap-10 lg:items-start"
            >
              <div className="space-y-4">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-muted hover:text-primary transition-colors"
                  >
                    {project.urlLabel}
                    <ExternalLink size={11} className="opacity-60" />
                  </a>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.tagline}
                </p>

                <ul className="space-y-2">
                  {project.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-border group-hover:border-primary/30 transition-colors"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/15"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.screenshots && (
                <div className="mt-8 flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 lg:mt-0">
                  {project.screenshots.map((shot) => (
                    <figure key={shot.src} className="w-[150px] shrink-0 snap-center sm:w-auto">
                      <div className="rounded-[1.75rem] border border-border bg-card p-1.5 shadow-lg shadow-black/40 group-hover:border-primary/30 transition-colors">
                        <picture>
                          <source srcSet={`${shot.src}.avif`} type="image/avif" />
                          <source srcSet={`${shot.src}.webp`} type="image/webp" />
                          <img
                            src={`${shot.src}.jpg`}
                            alt={shot.alt}
                            width={400}
                            height={866}
                            loading="lazy"
                            decoding="async"
                            className="block w-full h-auto rounded-[1.35rem]"
                          />
                        </picture>
                      </div>
                      <figcaption className="mt-3 text-center text-xs text-muted">
                        {shot.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
