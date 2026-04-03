interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript"],
  },
  {
    title: "Front End",
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
    skills: ["Jest", "React Testing Library", "Chai", "Mocha", "NightwatchJS"],
  },
  {
    title: "Analytics & Compliance",
    skills: ["GA4", "Google Tag Manager", "OneTrust", "MixPanel", "FullStory"],
  },
  {
    title: "AI-Assisted Engineering",
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
    <section id="skills" className="py-24 bg-card/30">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-12">
          Skills
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div key={category.title} className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                  >
                    {skill}
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
