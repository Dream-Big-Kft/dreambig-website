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
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
            Technology Stack
          </h2>
          <p className="mt-4 text-muted-foreground">
            We use modern, battle-tested technologies to build reliable systems
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 max-w-4xl mx-auto">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-card hover:border-muted-foreground/30 transition-colors"
            >
              <span className="text-2xl mb-2 font-mono">{tech.icon}</span>
              <span className="text-sm font-medium text-foreground">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
