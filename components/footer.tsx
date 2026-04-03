export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>&copy; {currentYear} Raymond Flores. All rights reserved.</p>
          <p>
            Built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Next.js
            </a>
            {" & "}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Tailwind CSS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
