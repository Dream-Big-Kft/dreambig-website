const steps = [
  {
    number: "01",
    title: "Understand",
    description: "Understand your product and business goals",
  },
  {
    number: "02",
    title: "Design",
    description: "Design scalable architecture",
  },
  {
    number: "03",
    title: "Build",
    description: "Build and iterate quickly",
  },
  {
    number: "04",
    title: "Deliver",
    description: "Deliver production-ready systems",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-background py-20 dark:bg-background lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
            Our Development Approach
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border lg:hidden" />
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-border" />

            <div className="grid gap-8 lg:grid-cols-4 lg:gap-8">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="relative pl-20 lg:pl-0 lg:text-center"
                >
                  {/* Mobile timeline dot */}
                  <div className="absolute left-6 top-1 w-4 h-4 rounded-full bg-background border-2 border-foreground lg:hidden" />

                  {/* Desktop timeline dot */}
                  <div className="hidden lg:flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-background border-2 border-foreground">
                    <span className="text-lg font-bold text-foreground">
                      {step.number}
                    </span>
                  </div>

                  {/* Mobile number */}
                  <span className="lg:hidden text-sm font-mono text-muted-foreground mb-1 block">
                    Step {step.number}
                  </span>

                  <h3 className="mb-4 text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-base text-muted-foreground">
                    {step.description}
                  </p>

                  {/* Connector arrow for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-2 w-4 text-muted-foreground">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
