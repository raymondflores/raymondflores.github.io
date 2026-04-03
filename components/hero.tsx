import { Github, Linkedin, Mail, MapPin } from "lucide-react";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/raymondflores",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/raymondf22/",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:raymondfflores@gmail.com",
    label: "Email",
  },
];

export function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Name & Navigation */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground text-balance">
                Raymond Flores
              </h1>
              <p className="text-xl text-primary font-medium">
                Senior Software Engineer
              </p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={16} />
                <span>Austin, TX</span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-md">
              I build accessible, high-performance web applications for
              millions of users.
            </p>

            {/* Navigation Links */}
            <nav className="space-y-3">
              <a
                href="#about"
                className="group flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="w-8 h-px bg-muted group-hover:w-16 group-hover:bg-foreground transition-all" />
                <span className="text-sm font-medium uppercase tracking-widest">
                  About
                </span>
              </a>
              <a
                href="#experience"
                className="group flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="w-8 h-px bg-muted group-hover:w-16 group-hover:bg-foreground transition-all" />
                <span className="text-sm font-medium uppercase tracking-widest">
                  Experience
                </span>
              </a>
              <a
                href="#skills"
                className="group flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="w-8 h-px bg-muted group-hover:w-16 group-hover:bg-foreground transition-all" />
                <span className="text-sm font-medium uppercase tracking-widest">
                  Skills
                </span>
              </a>
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.label}
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - About Summary */}
          <div className="space-y-6">
            <p className="text-foreground leading-relaxed text-lg">
              {
                "I'm a developer passionate about crafting high-performance, scalable web applications. My work lies at the intersection of engineering excellence and user experience, creating products that not only work well but are meticulously built for scale."
              }
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Currently, I&apos;m a Senior Front End Engineer at{" "}
              <a
                href="https://www.caesars.com/sportsbook-and-casino"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground font-medium hover:text-primary transition-colors"
              >
                Caesars Sportsbook
              </a>
              , where I build authentication systems, growth features, and
              experimentation platforms used by millions of users across web
              and mobile.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With 10+ years of experience, I&apos;ve worked across sports
              betting, startups, and large enterprises including{" "}
              <span className="text-foreground font-medium">Tesla</span>,{" "}
              <span className="text-foreground font-medium">Ticketmaster</span>
              , and early-stage startups where I helped raise{" "}
              <span className="text-foreground font-medium">$4.5M</span> in
              funding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
