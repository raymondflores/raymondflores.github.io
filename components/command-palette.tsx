"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Copy,
  Download,
  FolderGit2,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Search,
  User,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// The header's trigger button dispatches this on `window` — a one-line seam that
// avoids lifting palette state into the (server) page component.
export const OPEN_EVENT = "command-palette:open";

type Command = {
  id: string;
  label: string;
  group: "Jump to" | "Actions";
  icon: LucideIcon;
  /** Extra terms that match but are not shown, e.g. "cv" finding the resume. */
  keywords?: string;
  hint?: string;
  run: () => void;
};

const scrollTo = (id: string) => () => {
  // No `behavior` — inherits `scroll-behavior` from `html`, which the
  // prefers-reduced-motion block in globals.css already flips to `auto`.
  document.getElementById(id)?.scrollIntoView();
};

// Locking the page is the one piece of open/close state that has to land
// synchronously: `close()` returns straight into `command.run()`, and a `body`
// still stuck at `overflow: hidden` silently swallows the `scrollIntoView`
// above — React has not committed the close (nor run the effect cleanup that
// would unlock it) until after the handler returns.
const setPageLocked = (locked: boolean) => {
  document.body.style.overflow = locked ? "hidden" : "";
};

const openExternal = (url: string) => () => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const EMAIL = "raymondfflores@gmail.com";
const RESUME = "/Raymond_Flores_2026.pdf";

function buildCommands(toast: (message: string) => void): Command[] {
  return [
    { id: "about", label: "About", group: "Jump to", icon: User, keywords: "home top intro hero", run: scrollTo("about") },
    { id: "experience", label: "Experience", group: "Jump to", icon: Briefcase, keywords: "work history jobs caesars", run: scrollTo("experience") },
    { id: "projects", label: "Projects", group: "Jump to", icon: FolderGit2, keywords: "side birdielab case study", run: scrollTo("projects") },
    { id: "skills", label: "Skills", group: "Jump to", icon: Wrench, keywords: "tech stack tools languages", run: scrollTo("skills") },
    { id: "education", label: "Education", group: "Jump to", icon: GraduationCap, keywords: "school degree university utrgv", run: scrollTo("education") },
    { id: "contact", label: "Contact", group: "Jump to", icon: Mail, keywords: "hire reach out get in touch", run: scrollTo("contact") },
    {
      id: "copy-email",
      label: "Copy email address",
      group: "Actions",
      icon: Copy,
      keywords: "clipboard mail",
      hint: EMAIL,
      run: async () => {
        try {
          await navigator.clipboard.writeText(EMAIL);
          toast("Copied " + EMAIL);
        } catch {
          // Clipboard access is denied outside secure contexts — show the
          // address so it can still be selected by hand.
          toast("Copy failed — " + EMAIL);
        }
      },
    },
    {
      id: "email",
      label: "Send an email",
      group: "Actions",
      icon: Mail,
      keywords: "mailto contact hello say hi",
      run: () => {
        window.location.href = "mailto:" + EMAIL;
      },
    },
    {
      id: "resume",
      label: "Download resume",
      group: "Actions",
      icon: Download,
      keywords: "cv pdf",
      run: () => {
        const link = document.createElement("a");
        link.href = RESUME;
        link.download = "";
        link.click();
      },
    },
    { id: "github", label: "Open GitHub", group: "Actions", icon: Github, keywords: "code repos source", hint: "@raymondflores", run: openExternal("https://github.com/raymondflores") },
    { id: "linkedin", label: "Open LinkedIn", group: "Actions", icon: Linkedin, keywords: "profile network", hint: "@raymondf22", run: openExternal("https://www.linkedin.com/in/raymondf22/") },
  ];
}

type Match = { score: number; indices: number[] };

/**
 * Subsequence match with the usual fuzzy-finder bonuses: consecutive runs and
 * word-start hits score high, scattered hits get penalized by the gaps they
 * skip. Returns null when `query` is not a subsequence of `target` at all.
 */
function fuzzyMatch(query: string, target: string): Match | null {
  const haystack = target.toLowerCase();
  const indices: number[] = [];
  let score = 0;
  let cursor = 0;
  let previous = -2;

  for (const char of query.toLowerCase()) {
    if (char === " ") continue;

    const found = haystack.indexOf(char, cursor);
    if (found === -1) return null;

    if (found === previous + 1) score += 8;
    if (found === 0 || /[\s\-/@.]/.test(haystack[found - 1])) score += 6;
    score -= Math.min(found - cursor, 6);

    indices.push(found);
    previous = found;
    cursor = found + 1;
  }

  return { score, indices };
}

function filterCommands(commands: Command[], query: string) {
  const trimmed = query.trim();
  if (!trimmed) return commands.map((command) => ({ command, indices: [] as number[] }));

  return commands
    .map((command) => {
      const label = fuzzyMatch(trimmed, command.label);
      // Keyword hits rank below label hits and never light up the label.
      const keyword = command.keywords ? fuzzyMatch(trimmed, command.keywords) : null;

      if (label) return { command, indices: label.indices, score: label.score + 20 };
      if (keyword) return { command, indices: [] as number[], score: keyword.score };
      return null;
    })
    .filter((result): result is NonNullable<typeof result> => result !== null)
    .sort((a, b) => b.score - a.score);
}

function Highlight({ text, indices }: { text: string; indices: number[] }) {
  if (indices.length === 0) return <>{text}</>;

  const marked = new Set(indices);
  return (
    <>
      {[...text].map((char, index) =>
        marked.has(index) ? (
          <span key={index} className="text-primary">
            {char}
          </span>
        ) : (
          <span key={index}>{char}</span>
        )
      )}
    </>
  );
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const returnFocusTo = useRef<HTMLElement | null>(null);

  const showToast = useCallback((message: string) => setToast(message), []);
  const commands = useMemo(() => buildCommands(showToast), [showToast]);
  const results = useMemo(() => filterCommands(commands, query), [commands, query]);

  const close = useCallback(() => {
    setOpen(false);
    setPageLocked(false);
  }, []);

  const runCommand = useCallback(
    (command: Command) => {
      close();
      command.run();
    },
    [close]
  );

  // ⌘K / Ctrl+K from anywhere, plus the header trigger's custom event.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((wasOpen) => !wasOpen);
      }
    };

    const onOpen = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  // `scrollbar-gutter: stable` on `html` keeps the gutter reserved whether or
  // not the page is locked, so nothing shifts underneath the overlay.
  useEffect(() => {
    if (!open) return;

    // Every open starts from a clean query, however it was closed last time.
    setQuery("");
    setActiveIndex(0);

    returnFocusTo.current = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();

    setPageLocked(true);

    // Backstop for Escape: a click on a result can move focus off the input,
    // which owns the keydown handler the rest of the time.
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onEscape);

    return () => {
      window.removeEventListener("keydown", onEscape);
      setPageLocked(false);
      // `preventScroll` matters: this cleanup runs *after* the command has
      // already started a smooth scroll, and a scrolling focus() would cancel
      // it and snap back to whatever was focused when the palette opened.
      returnFocusTo.current?.focus({ preventScroll: true });
    };
  }, [open, close]);

  useEffect(() => setActiveIndex(0), [query]);

  // Keep the highlighted row inside the scroll viewport.
  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, results.length]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }

    if (event.key === "Tab") {
      // The dialog holds exactly one focusable control; trap it there.
      event.preventDefault();
      return;
    }

    if (results.length === 0) return;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((current) => (current + step + results.length) % results.length);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(results.length - 1);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      runCommand(results[activeIndex].command);
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[15vh]"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="animate-fade-up relative w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card shadow-2xl glow-primary"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search size={16} className="shrink-0 text-muted" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onInputKeyDown}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-palette-list"
                aria-activedescendant={
                  results.length > 0 ? `command-${results[activeIndex].command.id}` : undefined
                }
                aria-autocomplete="list"
                autoComplete="off"
                spellCheck={false}
                placeholder="Jump to a section, copy my email…"
                className="w-full bg-transparent py-4 text-sm text-foreground outline-none placeholder:text-muted"
              />
            </div>

            <div
              ref={listRef}
              id="command-palette-list"
              role="listbox"
              aria-label="Commands"
              className="max-h-80 overflow-y-auto p-2"
            >
              {results.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-muted">
                  No matches for{" "}
                  <span className="text-muted-foreground">&ldquo;{query.trim()}&rdquo;</span>
                </p>
              ) : (
                results.map(({ command, indices }, index) => {
                  const isActive = index === activeIndex;
                  const isNewGroup = index === 0 || results[index - 1].command.group !== command.group;

                  return (
                    <div key={command.id} role="presentation">
                      {isNewGroup && (
                        <p
                          role="presentation"
                          className={cn(
                            "px-3 pb-1.5 text-[0.65rem] font-semibold uppercase tracking-widest text-muted",
                            index === 0 ? "pt-1" : "pt-3"
                          )}
                        >
                          {command.group}
                        </p>
                      )}
                      <button
                        id={`command-${command.id}`}
                        role="option"
                        aria-selected={isActive}
                        data-active={isActive}
                        tabIndex={-1}
                        onMouseMove={() => setActiveIndex(index)}
                        onClick={() => runCommand(command)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                          isActive ? "bg-primary/10 text-foreground" : "text-muted-foreground"
                        )}
                      >
                        <command.icon
                          size={15}
                          aria-hidden="true"
                          className={cn("shrink-0", isActive ? "text-primary" : "text-muted")}
                        />
                        <span className="text-sm font-medium">
                          <Highlight text={command.label} indices={indices} />
                        </span>
                        {command.hint && (
                          <span className="ml-auto truncate pl-3 font-mono text-xs text-muted">
                            {command.hint}
                          </span>
                        )}
                        <ArrowRight
                          size={13}
                          aria-hidden="true"
                          className={cn(
                            "shrink-0 text-primary transition-opacity",
                            isActive ? "opacity-100" : "opacity-0",
                            command.hint ? "ml-3" : "ml-auto"
                          )}
                        />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            <div className="flex items-center gap-4 border-t border-border bg-background/40 px-4 py-2.5 text-[0.7rem] text-muted">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono">↑↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono">↵</kbd>
                select
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono">esc</kbd>
                close
              </span>
            </div>
          </div>
        </div>
      )}

      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed bottom-6 left-1/2 z-[70] -translate-x-1/2"
      >
        {toast && (
          <p className="animate-fade-up rounded-lg border border-border bg-card px-4 py-2.5 text-xs text-foreground shadow-xl">
            {toast}
          </p>
        )}
      </div>
    </>
  );
}
