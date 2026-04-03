import { ExternalLink } from "lucide-react";

interface ExperienceItem {
  period: string;
  title: string;
  company: string;
  companyUrl?: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    period: "2023 — Present",
    title: "Senior Software Engineer",
    company: "Caesars Sportsbook",
    companyUrl: "https://www.caesars.com/sportsbook-and-casino",
    description:
      "Leading development of landing page platforms, authentication systems, and growth features for millions of users across web and mobile.",
    highlights: [
      "Led migration of landing pages from Next.js to Astro with build-time Contentstack integration, reducing page load times by ~40–60% and improving Lighthouse scores by ~25%",
      "Architected a landing page platform (Astro + Contentstack) enabling self-serve page creation across multiple brands, reducing engineering dependency by ~70% and accelerating time-to-market by ~3×",
      "Designed and implemented authentication and onboarding systems used by 3M+ users, increasing signup conversion by ~15% and reducing login-related support tickets by ~25%",
      "Led development of the Refer-A-Friend growth funnel across web and mobile, increasing user acquisition by ~20%+ MoM and improving referral conversion rates by ~15–20%",
      "Re-architected affiliate attribution pipeline processing ~10k+ events/day, restoring partner trust and increasing high-quality acquisition traffic by ~20%",
      "Established scalable analytics foundation (GA4 + GTM), improving tracking accuracy by ~30% and enabling self-serve reporting across marketing and product teams",
      "Improved release quality by 17% by introducing new branching and CI/CD workflows, reducing production incidents during peak events",
      "Mentored 3+ engineers and established frontend architecture best practices, reducing onboarding time by ~40% and improving team delivery velocity",
      "Led adoption of AI-assisted development workflows using multi-agent execution and structured prompting, increasing sprint velocity by ~25% and reducing cycle time by ~30%",
    ],
    technologies: [
      "React",
      "TypeScript",
      "React Native",
      "Astro",
      "GA4",
      "GTM",
      "Contentstack",
    ],
  },
  {
    period: "2021 — 2023",
    title: "Senior Software Engineer",
    company: "Evaluate.xyz",
    description:
      "First engineering hire, helping scale the platform from 0 to ~50K+ users within the first year.",
    highlights: [
      "Built core frontend architecture in React, enabling rapid feature iteration and reducing development time by ~35% in a 3-engineer team",
      "Designed scalable UI systems and component libraries supporting high-frequency product updates and experimentation",
      "Collaborated closely with founders on product direction, contributing to development that helped secure $4.5M in funding",
    ],
    technologies: ["React", "React Hooks", "Tailwind CSS", "TypeScript"],
  },
  {
    period: "2021",
    title: "Software Engineer",
    company: "Tesla",
    companyUrl: "https://www.tesla.com",
    description:
      "Developed and optimized vehicle trade-in features on Tesla.com.",
    highlights: [
      "Developed and optimized vehicle trade-in workflows on Tesla.com, improving completion rates by ~10–15% and reducing friction in customer submissions",
      "Built internal tools for vehicle processing and tracking, improving operational efficiency by ~20% and reducing manual intervention",
    ],
    technologies: ["React", "PHP", "Internal Tools"],
  },
  {
    period: "2020 — 2021",
    title: "Senior Software Engineer",
    company: "Boom Sports",
    description:
      "Developed React Native gaming apps for high-profile clients including NBC Sports and Barstool Sports.",
    highlights: [
      "Designed and built admin systems for managing large-scale gaming contests, reducing operational overhead by ~25–30%",
      "Developed React Native applications for major clients (NBC Sports, Barstool), supporting ~100K+ users and delivering high-performance mobile experiences during peak events",
    ],
    technologies: ["React Native", "Node.js", "Express", "MongoDB"],
  },
  {
    period: "2019 — 2020",
    title: "Senior Software Engineer II",
    company: "Ticketmaster",
    companyUrl: "https://www.ticketmaster.com",
    description:
      "Rebuilt legacy call center platform in React/Redux, achieving 87% faster load times and 10× reduction in codebase size.",
    highlights: [
      "Rebuilt legacy call center platform using React/Redux, achieving 87% faster load times and 10× reduction in codebase size, significantly improving maintainability and performance",
      "Introduced real-time dashboards and reporting tools, enabling faster operational decision-making across teams",
      "Automated workflows and consolidated legacy tools, improving operational efficiency by 20–60% and reducing manual processing costs",
    ],
    technologies: ["React", "Redux", "Real-time Dashboards"],
  },
  {
    period: "2018 — 2019",
    title: "Senior Backend Engineer",
    company: "Justuno",
    description:
      "Led app store integrations with Shopify, BigCommerce, and Cloudflare.",
    highlights: [
      "Built integrations with Shopify, BigCommerce, and Cloudflare, increasing platform adoption and daily installs by ~20–25%",
      "Developed notification systems and OAuth 2.0 authentication services used across multiple client applications",
      "Improved data accuracy and system reliability by processing and correcting hundreds of thousands of records",
    ],
    technologies: ["Node.js", "Express", "OAuth 2.0", "Shopify", "BigCommerce"],
  },
  {
    period: "2016 — 2018",
    title: "Lead Developer",
    company: "Pokersports",
    description:
      "Led all technical development for the real-time fantasy sports multiplayer platform.",
    highlights: [
      "Led end-to-end development of a real-time fantasy sports platform, including web and mobile applications supporting multiplayer gameplay",
      "Integrated payment (PayPal), communication (SendGrid), and real-time sports data APIs to power core product functionality",
      "Managed and mentored a team of 2 engineers, establishing development standards and improving code quality",
      "Built and maintained production infrastructure (NGINX, Apache, Linux), ensuring high performance and system reliability",
    ],
    technologies: ["Node.js", "Real-time", "PayPal API", "SendGrid"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-16">
          Experience
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-2 bottom-0 w-px bg-gradient-to-b from-primary/40 via-border to-transparent hidden md:block" />

          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="group relative grid md:grid-cols-[180px_1fr] gap-4 md:gap-10 pb-14 last:pb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-[5px] -translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 border-muted bg-background group-hover:border-primary group-hover:bg-primary/20 transition-all hidden md:block z-10" />

                {/* Date */}
                <div className="md:pl-6 text-xs text-muted font-mono pt-0.5 md:text-right md:pr-0">
                  {exp.period}
                </div>

                {/* Content */}
                <div className="space-y-4 rounded-xl p-5 -mx-2 group-hover:bg-card/50 transition-colors">
                  <div>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2 flex-wrap">
                      {exp.title}
                      <span className="text-muted font-normal">·</span>
                      {exp.companyUrl ? (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 hover:underline"
                        >
                          {exp.company}
                          <ExternalLink size={12} className="opacity-60" />
                        </a>
                      ) : (
                        <span>{exp.company}</span>
                      )}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-border group-hover:border-primary/30 transition-colors"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/15"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
