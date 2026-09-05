"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light";

// Kept in sync with the restore script in app/layout.tsx, which reads the same
// key before first paint.
const STORAGE_KEY = "theme";

const themeColor: Record<Theme, string> = {
  dark: "#0a0f1e",
  light: "#f8fafc",
};

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", themeColor[theme]);
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  // The restore script has already put the stored theme on <html> before first
  // paint, so read it back instead of re-deriving it — that way the icon always
  // matches what is on screen. Dark is the default when nothing is stored.
  useEffect(() => {
    const stored =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(stored);
    applyTheme(stored);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage — the theme still applies for this page.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className={cn(
        "no-print flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all",
        className
      )}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
