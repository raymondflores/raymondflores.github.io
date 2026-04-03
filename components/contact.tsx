import { Mail, Github, Linkedin, FileText, ArrowRight } from "lucide-react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "raymondfflores@gmail.com",
    href: "mailto:raymondfflores@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@raymondflores",
    href: "https://github.com/raymondflores",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "@raymondf22",
    href: "https://www.linkedin.com/in/raymondf22/",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-16">
          Contact
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* CTA */}
          <div className="space-y-6">
            <h3 className="text-3xl lg:text-4xl font-bold text-foreground text-balance leading-tight">
              {"Let's build something great together."}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {"Whether you're looking to hire, collaborate, or just want to say hello — I'm always open to a conversation."}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="mailto:raymondfflores@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Say Hello
                <ArrowRight size={16} />
              </a>
              <a
                href="/RaymondFloresResume.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:border-primary/40 hover:bg-card/50 transition-all"
              >
                <FileText size={16} />
                Download Resume
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card/30 hover:border-primary/30 hover:bg-card/60 transition-all"
              >
                <div className="p-2 rounded-lg bg-card border border-border group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary text-muted transition-all">
                  <link.icon size={16} />
                </div>
                <div>
                  <p className="text-xs text-muted mb-0.5">{link.label}</p>
                  <p className="text-sm text-foreground font-medium group-hover:text-primary transition-colors">
                    {link.value}
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="ml-auto text-muted opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all -translate-x-1 group-hover:translate-x-0"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
