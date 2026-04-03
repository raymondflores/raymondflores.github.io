import { Mail, Github, Linkedin, FileText } from "lucide-react";

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
    <section id="contact" className="py-24 bg-card/30">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-8">
          Contact
        </h2>

        <div className="space-y-8">
          <div className="max-w-xl">
            <p className="text-2xl text-foreground font-medium text-balance">
              If you would like to discuss a project or just say hi, I&apos;m
              always down to chat.
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <link.icon
                  size={20}
                  className="text-muted group-hover:text-primary transition-colors"
                />
                <span className="text-sm">{link.value}</span>
              </a>
            ))}
          </div>

          <a
            href="/RaymondFloresResume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            <FileText size={18} />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
