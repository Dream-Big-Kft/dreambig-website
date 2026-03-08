import { Code2, Server, Cloud, Settings } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Custom Web Applications",
    description: "Full-stack applications built with modern frameworks and scalable architecture.",
  },
  {
    icon: Server,
    title: "Backend & API Development",
    description: "High-performance REST and GraphQL APIs designed for reliability and scale.",
  },
  {
    icon: Cloud,
    title: "Cloud Architecture",
    description: "AWS infrastructure, serverless systems, and scalable deployments.",
  },
  {
    icon: Settings,
    title: "Engineering Consulting",
    description: "Architecture reviews, system redesign, and performance optimization.",
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
            How We Help Teams Ship Faster
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative rounded-xl border border-border bg-card p-6 transition-all hover:border-muted-foreground/30 hover:bg-card/80"
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-muted">
                <service.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
