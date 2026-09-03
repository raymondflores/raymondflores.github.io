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
    period: "Mar 2023 — Present",
    title: "Senior Software Engineer",
    company: "Caesars Sportsbook",
    companyUrl: "https://www.caesars.com/sportsbook-and-casino",
    description:
      "Own the multi-brand content and landing page platform, plus authentication and onboarding surfaces used by millions of monthly users across web and mobile.",
    highlights: [
      "Led a rebuild of the multi-brand content platform, diagnosing that client-side CMS fetching left content invisible to search crawlers; re-architected to build-time rendering with Astro. Organic clicks +137%, average search position 15.4 → 11.3, Lighthouse Performance 65 → 99, Total Blocking Time 0 ms — delivered in ~2 months leading 1 engineer and 1 QA",
      "Built a Node service on GCP Cloud Run orchestrating webhook-triggered rebuilds and deploys from CMS publishes, removing engineering from the content publishing path entirely",
      "Designed a CMS-driven variant page system letting marketing compose and ship dozens of pages with zero code or deploy requests; adopted as the standard across brands, on top of a self-serve landing page platform enabling rapid experimentation across 4 sportsbook and casino brands",
      "Designed a compliant content publishing process for an NJDGE regulatory requirement — separating authoring, approval, and publish rights across 4 brands and hundreds of pages; passed audit with zero compliance failures since",
      "Built GitLab CI/CD pipelines from scratch with webhook-triggered builds, automated checks, and release notifications, eliminating manual deploy steps",
      "Re-architected an affiliate attribution pipeline processing tens of thousands of events daily, restoring partner trust and improving acquisition quality",
      "Built the front end of authentication and onboarding used by millions of monthly users across web and React Native; implemented deep-linking architecture (AppsFlyer) and analytics instrumentation across iOS and Android",
      "Mentor engineers and set frontend architecture standards across the team",
    ],
    technologies: [
      "Astro",
      "React",
      "TypeScript",
      "React Native",
      "Node.js",
      "GCP Cloud Run",
      "Contentstack",
      "GitLab CI",
    ],
  },
  {
    period: "Sep 2021 — Sep 2024",
    title: "Co-Founder & CTO",
    company: "Nifted",
    description:
      "Co-founded a consumer hardware company selling networked digital display frames; sole technical founder of four.",
    highlights: [
      "Raised $150K and shipped ~200 units — first edition sold out in 10 minutes",
      "Built the entire stack: Raspberry Pi device software, a React/TypeScript display UI inside a Flutter shell, a Flutter companion app, a Nuxt/Vue storefront, and the API underneath",
      "Architected a Node/TypeScript GraphQL API (Apollo Server, TypeGraphQL, TypeORM, PostgreSQL) aggregating five third-party APIs and two blockchains into one normalized schema serving three heterogeneous clients, shaping payloads per client",
      "Built end-to-end Stripe payments — checkout sessions, webhook handling, order lifecycle, per-edition inventory — plus device identity, account claiming, and JWT/argon2 auth",
    ],
    technologies: [
      "Node.js",
      "TypeScript",
      "GraphQL",
      "TypeORM",
      "PostgreSQL",
      "Stripe",
      "Flutter",
      "Nuxt/Vue",
      "Raspberry Pi",
    ],
  },
  {
    period: "Jul 2021 — Feb 2023",
    title: "Senior Software Engineer",
    company: "Evaluate.xyz",
    description:
      "First engineering hire on a 3-person founding team building a chat-based NFT portfolio and analytics platform.",
    highlights: [
      "Built and maintained core product surfaces across a React/TypeScript frontend — portfolio views, collection search and discovery, price charting, in-app chat, and the shared design system",
      "Built real-time data visualization — WebSocket-driven live price and candlestick charts (apexcharts, d3, react-stockcharts) with heavy render-path optimization",
      "Platform grew to 1.4M+ users tracking 1,100+ NFT collections across Flow and Ethereum; raised a $4M seed (Rho Capital's Ignition Fund, Dapper Labs, Drive by DraftKings, Castle Island Ventures)",
    ],
    technologies: [
      "React",
      "TypeScript",
      "WebSockets",
      "d3",
      "apexcharts",
      "Tailwind CSS",
    ],
  },
  {
    period: "Mar 2021 — Sep 2021",
    title: "Software Engineer",
    company: "Tesla",
    companyUrl: "https://www.tesla.com",
    description:
      "Built customer-facing and internal tooling for the vehicle trade-in program.",
    highlights: [
      "Built and optimized the customer-facing vehicle trade-in flow on Tesla.com (React, PHP), improving submission completion and reducing checkout friction",
      "Built internal inventory tooling tracking trade-in vehicles through routing, disposition, and sale",
    ],
    technologies: ["React", "PHP", "Internal Tools"],
  },
  {
    period: "Sep 2020 — Mar 2021",
    title: "Senior Software Engineer",
    company: "Boom Sports",
    description:
      "Built React Native free-to-play gaming apps and the services behind them for NBC Sports and Barstool Sports.",
    highlights: [
      "Developed React Native free-to-play gaming apps for NBC Sports (NBC Sports Predictor) and Barstool Sports, supporting high concurrency during peak live events",
      "Built a user service (Node, Redis, MongoDB) handling authentication, sessions, and user state across multiple client applications",
      "Built admin tooling for daily and weekly contest management and real-time contest monitoring (React, Node, Express, MongoDB)",
    ],
    technologies: ["React Native", "Node.js", "Express", "MongoDB", "Redis"],
  },
  {
    period: "Jan 2019 — Aug 2020",
    title: "Senior Software Engineer II",
    company: "Ticketmaster",
    companyUrl: "https://www.ticketmaster.com",
    description:
      "Rebuilt the legacy call center application that managers used to run day-to-day operations.",
    highlights: [
      "Rebuilt Ticketmaster's legacy call center application from Visual Basic to React/Redux, achieving 87% faster load times and a 10× smaller codebase through table-driven architecture and reusable components",
      "Introduced real-time reporting and customizable dashboards, letting teams generate custom reports on demand",
      "Digitized and automated paper-based workflows, consolidating multiple internal tools into one and cutting manual processing cost",
    ],
    technologies: ["React", "Redux", "Real-time Dashboards"],
  },
  {
    period: "Oct 2016 — Jan 2019",
    title: "Co-Founder & CTO",
    company: "PokerSports",
    description:
      "Built and operated FantasyStud, a real-money fantasy sports platform, end to end.",
    highlights: [
      "Built an AngularJS SPA plus a separate admin console on an Express / PostgreSQL / Redis backend — 2,200+ commits over 2.5 years, ~15K lines across 22 service modules",
      "Implemented real-money payments with Braintree: deposits, user balance ledger, pot handling, winner payouts, and webhook reconciliation",
      "Built real-time multiplayer with socket.io and Redis, routing live balance, table-state, and notification events to specific user connections",
      "Designed and evolved the PostgreSQL schema across 38 migrations; ran production infrastructure (Linux, NGINX, PM2, scheduled jobs, Rollbar); hired and mentored 2 junior developers",
    ],
    technologies: [
      "AngularJS",
      "Express",
      "PostgreSQL",
      "Redis",
      "socket.io",
      "Braintree",
      "NGINX",
    ],
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
