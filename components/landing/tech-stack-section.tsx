const technologies = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "Node.js", icon: "🟢" },
  { name: "AWS", icon: "☁️" },
  { name: "Docker", icon: "🐳" },
  { name: "GraphQL", icon: "◈" },
  { name: "PostgreSQL", icon: "🐘" },
];

export function TechStackSection() {
  return (
    <section className="border-y border-border/75 bg-muted/70 py-20 dark:border-white/8 dark:bg-card/55 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
            Technology Stack
          </h2>
          <p className="mt-8 text-muted-foreground">
            We use modern, battle-tested technologies to build reliable systems
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="card-hover-modern-light flex flex-col items-center justify-center rounded-xl border border-border bg-card p-6 hover:border-primary/20"
            >
              <span className="text-2xl mb-2 font-mono">{tech.icon}</span>
              <span className="text-sm font-medium text-foreground">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
