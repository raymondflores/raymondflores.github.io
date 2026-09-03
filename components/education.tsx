import { GraduationCap } from "lucide-react";

export function Education() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-12">
          Education
        </h2>

        <div className="group relative grid md:grid-cols-[180px_1fr] gap-4 md:gap-10">
          <div className="hidden md:block" />

          {/* Content */}
          <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card/30 hover:border-primary/30 hover:bg-card/60 transition-all -mx-2">
            <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
              <GraduationCap size={20} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-foreground">
                Bachelor of Science in Computer Science
              </h3>
              <p className="text-sm text-muted-foreground">
                University of Texas — Rio Grande Valley
              </p>
              <p className="text-xs text-muted">Edinburg, TX</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
