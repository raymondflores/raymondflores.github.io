import { Code2, Monitor, Server, FlaskConical, BarChart3, Bot } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["JavaScript", "TypeScript"],
  },
  {
    title: "Front End",
    icon: Monitor,
    skills: [
      "React",
      "React Native",
      "Expo",
      "Next.js",
      "Redux",
      "Zustand",
      "React Query",
      "Tailwind CSS",
      "Apollo Client",
      "HTML",
      "CSS",
      "Firebase",
    ],
  },
  {
    title: "Back End",
    icon: Server,
    skills: [
      "Node.js",
      "Express",
      "GraphQL",
      "Apollo Server",
      "TypeGraphQL",
      "REST APIs",
      "WebSockets",
      "SQL",
      "NoSQL",
      "Supabase",
      "PostgreSQL",
    ],
  },
  {
    title: "Testing",
    icon: FlaskConical,
    skills: ["Jest", "React Testing Library", "Chai", "Mocha", "NightwatchJS"],
  },
  {
    title: "Analytics & Compliance",
    icon: BarChart3,
    skills: ["GA4", "Google Tag Manager", "OneTrust", "MixPanel", "FullStory"],
  },
  {
    title: "AI-Assisted Engineering",
    icon: Bot,
    skills: [
      "Cursor",
      "Amazon Q",
      "Kiro",
      "LLM-assisted workflows",
      "Prompt Engineering",
      "AI-accelerated prototyping",
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Subtle section separator gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/20 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-16">
          Skills
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="group p-6 rounded-xl border border-border bg-card/30 hover:border-primary/30 hover:bg-card/60 transition-all"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <Icon size={16} />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs rounded-md bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
