import { Github, Linkedin, Mail, MapPin, Download } from "lucide-react";

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
    <section id="about" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-100" />

      {/* Glow blobs */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            {/* Availability badge — commented out for now
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
              Open to new opportunities
            </div>
            */}

            {/* Name + Title */}
            <div className="space-y-3">
              <h1 className="text-6xl lg:text-7xl font-bold leading-none gradient-text">
                Raymond<br />Flores
              </h1>
              <p className="text-xl text-muted-foreground font-medium">
                Senior Full-Stack Engineer
              </p>
              <div className="flex items-center gap-1.5 text-muted">
                <MapPin size={13} />
                <span className="text-sm">Austin, TX</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-muted-foreground leading-relaxed max-w-lg">
              {"Full-stack engineer with 10+ years in TypeScript, React, and Node. I own the layer between services and the client — designing APIs, choosing rendering and architecture strategies, and shipping the interfaces on top. Experience spans platform work at consumer scale to founding two companies where I built everything from device firmware to payment ledgers. Comfortable where correctness matters: regulated gaming, real-money transactions, and production systems under load."}
            </p>

            {/* Social + Resume buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card/60 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all text-sm font-medium backdrop-blur-sm"
                >
                  <link.icon size={15} />
                  {link.label}
                </a>
              ))}
              <a
                href="/Raymond_Flores_2026.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Download size={15} />
                Resume
              </a>
            </div>

            {/* Section nav */}
            <nav className="space-y-2.5 pt-2">
              {[
                { label: "Experience", href: "#experience" },
                { label: "Projects", href: "#projects" },
                { label: "Skills", href: "#skills" },
                { label: "Contact", href: "#contact" },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="group flex items-center gap-4 text-muted hover:text-foreground transition-colors"
                >
                  <span className="w-8 h-px bg-muted group-hover:w-16 group-hover:bg-primary transition-all duration-300" />
                  <span className="text-xs font-medium uppercase tracking-widest">{label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Right: Photo + Stats */}
          <div className="flex flex-col items-center lg:items-center gap-6">
            {/* Profile photo */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 blur-2xl scale-110 pointer-events-none" />
              <div className="relative w-64 h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden border border-primary/20 glow-primary">
                <img
                  src="/raymond.jpg"
                  alt="Raymond Flores"
                  className="w-full h-full object-cover object-[center_15%]"
                />
              </div>
            </div>

            {/* Currently at card */}
            <div className="w-full max-w-xs p-4 rounded-xl bg-card/60 border border-border backdrop-blur-sm hover:border-primary/30 transition-colors">
              <p className="text-xs text-muted uppercase tracking-widest mb-3 font-medium">Currently at</p>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-dot shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Caesars Sportsbook</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Senior Software Engineer</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted leading-relaxed">
                  Building the multi-brand content platform &amp; the auth surfaces millions of users sign in through.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
