"use client";

import { useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="/Raymond_Flores_2026.pdf"
              download
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all"
            >
              <Download size={14} />
              Resume
            </a>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-72 mt-4" : "max-h-0"
          )}
        >
          <ul className="flex flex-col gap-4 pb-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/Raymond_Flores_2026.pdf"
                download
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
              >
                <Download size={14} />
                Download Resume
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
