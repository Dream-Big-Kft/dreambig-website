import {
  Cloud,
  Code2,
  Database,
  GraduationCap,
  Monitor,
  Server,
  Settings,
  Smartphone,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    title: "Custom Application Development",
    description:
      "Build tailored web and mobile applications using modern frameworks. From concept to deployment, we create scalable solutions that meet your exact requirements.",
  },
  {
    icon: Monitor,
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
    title: "Software Consulting",
    description:
      "Expert guidance on technology selection, architecture design, and development strategy. We help you make informed decisions for your software projects.",
  },
  {
    icon: Database,
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    title: "Database Solutions",
    description:
      "Design, implement, and optimize database systems for performance and scalability. We ensure your data infrastructure supports business growth.",
  },
  {
    icon: Settings,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    title: "Maintenance & Support",
    description:
      "Ongoing maintenance, updates, and support to keep your software running smoothly. We provide continuous improvement and bug fixes.",
  },
  {
    icon: GraduationCap,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    title: "Team Training",
    description:
      "Comprehensive training programs to upskill your development team. Learn modern practices, frameworks, and best practices from experienced professionals.",
  },
  {
    icon: Smartphone,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    title: "Mobile Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android. We create responsive, feature-rich mobile solutions that engage users.",
  },
  {
    icon: Server,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    title: "Backend & API Development",
    description:
      "High-performance REST and GraphQL APIs designed for reliability, maintainability, and scale across growing products.",
  },
  {
    icon: Cloud,
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
    title: "Cloud Architecture",
    description:
      "AWS infrastructure, deployment pipelines, and scalable cloud systems built for performance, resilience, and operational clarity.",
  },
  {
    icon: Settings,
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    title: "Engineering Consulting",
    description:
      "Architecture reviews, system redesign, and performance optimization to help teams move faster with fewer technical bottlenecks.",
  },
];

export function ServicesSection() {
  return (
    <section className="border-y border-border/75 bg-muted/75 py-24 dark:border-white/8 dark:bg-card/55 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
            How We Help Teams Ship Faster
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="card-hover-modern-light group relative isolate rounded-2xl border border-border bg-card p-8 hover:border-primary/20"
            >
              <div
                className={`mb-8 inline-flex h-12 w-12 items-center justify-center rounded-lg border ${service.color}`}
              >
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-5 text-2xl font-semibold tracking-tight text-foreground">
                {service.title}
              </h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
