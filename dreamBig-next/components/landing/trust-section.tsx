const trustBadges = [
  { label: "SaaS Companies", icon: "🏢" },
  { label: "Tech Startups", icon: "🚀" },
  { label: "Enterprise Teams", icon: "🏛️" },
];

export function TrustSection() {
  return (
    <section className="border-y border-border bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <p className="text-muted-foreground font-medium text-center lg:text-left">
            Trusted Engineering Partner
          </p>
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-3 text-foreground"
              >
                <span className="text-2xl">{badge.icon}</span>
                <span className="font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
