const trustBadges = [
  { label: "SaaS Companies", icon: "🏢" },
  { label: "Tech Startups", icon: "🚀" },
  { label: "Enterprise Teams", icon: "🏛️" },
];

export function TrustSection() {
  return (
    <section className="border-y border-border bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center lg:items-center lg:justify-start gap-8 lg:gap-10">
          <p className="trust-reveal-left text-muted-foreground font-medium text-center lg:text-left">
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
                  <span className="font-medium whitespace-nowrap">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
