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
    period: "2023 - Present",
    title: "Senior Front End Engineer",
    company: "Caesars Sportsbook",
    companyUrl: "https://www.caesars.com/sportsbook-and-casino",
    description:
      "Leading development of experimentation platforms, authentication systems, and growth features for millions of users across web and mobile.",
    highlights: [
      "Architected a landing page experimentation platform using Astro and Contentstack enabling self-serve page creation, conversion tracking, and A/B testing",
      "Led development of the Refer-A-Friend growth funnel driving measurable increases in user acquisition",
      "Designed authentication and onboarding systems used by millions across multiple sportsbook brands",
      "Proposed new Git branching and release framework, improving release quality scores by 17%",
    ],
    technologies: [
      "React",
      "TypeScript",
      "React Native",
      "Astro",
      "GA4",
      "Contentstack",
    ],
  },
  {
    period: "2021 - 2023",
    title: "Senior Software Engineer",
    company: "Evaluate.xyz",
    description:
      "First non-founder engineer, helping build the platform from 0 users to tens of thousands.",
    highlights: [
      "Played a key role in raising $4.5M in funding from investors including Rho Capital Partners, Drive by DraftKings, and Dapper Labs",
      "Built the initial front-end iteration of the product, shaping early architecture and patterns",
      "Designed and delivered the UI/UX using React, React Hooks, and Tailwind CSS",
    ],
    technologies: ["React", "React Hooks", "Tailwind CSS", "TypeScript"],
  },
  {
    period: "2021",
    title: "Software Engineer",
    company: "Tesla",
    companyUrl: "https://www.tesla.com",
    description:
      "Developed key features for Tesla.com's vehicle trade-in platform.",
    highlights: [
      "Built customer trade-in workflows and operational processing systems using React and PHP",
      "Optimized internal tools for tracking and processing trade-in vehicles",
    ],
    technologies: ["React", "PHP", "Internal Tools"],
  },
  {
    period: "2020 - 2021",
    title: "Senior Software Engineer",
    company: "Boom Sports",
    description:
      "Developed React Native gaming apps for high-profile clients including NBC Sports and Barstool Sports.",
    highlights: [
      "Built NBC Sports Predictor app reaching wide audiences",
      "Designed admin tools for managing daily and weekly contests using React.js, Node, Express, and MongoDB",
    ],
    technologies: ["React Native", "Node.js", "Express", "MongoDB"],
  },
  {
    period: "2019 - 2020",
    title: "Senior Software Engineer II",
    company: "Ticketmaster",
    companyUrl: "https://www.ticketmaster.com",
    description:
      "Rebuilt legacy call center app in React/Redux, achieving 87% faster load times and 10x smaller codebase.",
    highlights: [
      "Replaced slow, hard-to-maintain system with modern React/Redux architecture",
      "Introduced real-time reporting and customizable dashboards",
      "Digitized and automated paper-based workflows, boosting efficiency by 20-60%",
    ],
    technologies: ["React", "Redux", "Real-time Dashboards"],
  },
  {
    period: "2018 - 2019",
    title: "Senior Backend Engineer",
    company: "Justuno",
    description:
      "Led app store integrations with Shopify, BigCommerce, and Cloudflare.",
    highlights: [
      "Enabled one-click installations significantly increasing daily downloads",
      "Developed push notifications as a service with Node.js/Express",
      "Built a secure OAuth 2.0 server for third-party app authentication",
    ],
    technologies: ["Node.js", "Express", "OAuth 2.0", "Shopify", "BigCommerce"],
  },
  {
    period: "2016 - 2018",
    title: "Lead Developer",
    company: "Pokersports",
    description:
      "Led all technical development for the Real-Time Fantasy Sports Multiplayer Card Game.",
    highlights: [
      "Integrated PayPal Merchant API, SendGrid, and FantasyData for payments and real-time stats",
      "Managed a team of two junior developers, providing mentorship and code reviews",
    ],
    technologies: ["Node.js", "Real-time", "PayPal API", "SendGrid"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-12">
          Experience
        </h2>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group grid md:grid-cols-[200px_1fr] gap-4 md:gap-8"
            >
              <div className="text-sm text-muted font-mono">{exp.period}</div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2 flex-wrap">
                    {exp.title} &middot;{" "}
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:underline"
                      >
                        {exp.company}
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      exp.company
                    )}
                  </h3>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>

                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground leading-relaxed pl-4 border-l border-border"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
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
    </section>
  );
}
