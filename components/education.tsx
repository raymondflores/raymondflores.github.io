import { GraduationCap } from "lucide-react";

export function Education() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-12">
          Education
        </h2>

        <div className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-8">
          <div className="text-sm text-muted font-mono">2011 - 2015</div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <GraduationCap size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground">
                Bachelor of Science in Computer Science
              </h3>
              <p className="text-muted-foreground">
                University of Texas - Rio Grande Valley
              </p>
              <p className="text-sm text-muted">Edinburg, TX</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
