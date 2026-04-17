const trustBadges = [
  { label: "SaaS Companies", icon: "🏢" },
  { label: "Tech Startups", icon: "🚀" },
  { label: "Enterprise Teams", icon: "🏛️" },
];

export function TrustSection() {
  return (
    <section className="border-y border-border bg-card/50">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-start lg:gap-10">
          <p className="trust-reveal-left text-center font-medium text-muted-foreground lg:text-left">
            Trusted Engineering Partner
          </p>
          <div className="trust-marquee w-full lg:flex-1">
            <div className="trust-marquee-track">
              {[...trustBadges, ...trustBadges, ...trustBadges, ...trustBadges].map((badge, index) => (
                <div
                  key={`${badge.label}-${index}`}
                  className="trust-marquee-item flex items-center gap-3 text-foreground"
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <span className="whitespace-nowrap font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
