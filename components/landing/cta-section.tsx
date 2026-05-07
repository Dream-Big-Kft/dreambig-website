import { ContactForm } from "../ContactForm";

export function CTASection() {
  return (
    <section className="border-t border-border/70 bg-card/80 py-20 dark:border-white/8 dark:bg-background lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
            Let&apos;s Build Something Exceptional Together
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Whether you&apos;re launching a new React application, scaling your
            development team, or optimizing an existing codebase, we&apos;re ready
            to help. Tell us about your goals, and we&apos;ll map out a clear,
            actionable strategy for your project.
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
