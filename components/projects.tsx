import { ExternalLink } from "lucide-react";

interface Project {
  name: string;
  url: string;
  urlLabel: string;
  tagline: string;
  highlights: string[];
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
        <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-16">
          Projects
        </h2>

        <div className="grid gap-6">
          {projects.map((project) => (
            <div
              key={project.name}
              className="group p-6 rounded-xl border border-border bg-card/30 hover:border-primary/30 hover:bg-card/60 transition-all space-y-4"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}
