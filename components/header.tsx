"use client";

import { useEffect, useState } from "react";
import { Menu, X, Download, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { OPEN_EVENT } from "@/components/command-palette";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = navItems.map((item) => item.href.slice(1));

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const [scrollProgress, setScrollProgress] = useState(0);
  // Rendered as the Mac shortcut on the server, corrected after mount so the
  // static export hydrates without a mismatch.
  const [shortcutLabel, setShortcutLabel] = useState("\u2318K");

  // Scroll-spy: a section is "active" once its top crosses the band just below
  // the fixed header. Sections without a nav entry (education) leave the band
  // empty, which keeps the previous section highlighted.
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }

        const next = sectionIds.find((id) => visible.has(id));
        if (next) setActiveSection(next);
      },
      { rootMargin: "-80px 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!/Mac|iPhone|iPad/.test(navigator.userAgent)) setShortcutLabel("Ctrl K");
  }, []);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(
        scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0
      );
    };

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <nav className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a
            href="#"
            className="text-base font-semibold text-foreground hover:text-primary transition-colors"
          >
            <span className="text-primary font-bold">R</span>aymond Flores
          </a>

          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative text-sm font-medium transition-colors",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -bottom-1.5 left-0 right-0 h-px bg-primary transition-opacity",
                          isActive ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
              aria-label="Open command palette"
              className="flex items-center gap-2 pl-2.5 pr-1.5 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:border-primary/30 hover:text-foreground transition-all"
            >
              <Search size={14} />
              <kbd className="font-mono text-xs text-muted border border-border rounded px-1.5 py-0.5">
                {shortcutLabel}
              </kbd>
            </button>
            <a
              href="/Raymond_Flores_2026.pdf"
              download
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all"
            >
              <Download size={14} />
              Resume
            </a>
            <ThemeToggle />
          </div>

          {/* Toggle sits outside the collapsible menu on mobile so it stays one
              tap away. */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              className="text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-72 mt-4" : "max-h-0"
          )}
        >
          <ul className="flex flex-col gap-4 pb-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);

              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "w-1 h-4 rounded-full bg-primary transition-opacity",
                        isActive ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.label}
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href="/Raymond_Flores_2026.pdf"
                download
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary pl-3"
              >
                <Download size={14} />
                Download Resume
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden"
      >
        <div
          className="h-full w-full origin-left bg-gradient-to-r from-primary to-accent"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>
    </header>
  );
}
