import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { ServicesSection } from "@/components/landing/services-section";
import { ProcessSection } from "@/components/landing/process-section";
import { TechStackSection } from "@/components/landing/tech-stack-section";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <section id="services">
          <ServicesSection />
        </section>
        <section id="process">
          <ProcessSection />
        </section>
        <section id="tech">
          <TechStackSection />
        </section>
        <section id="contact">
          <CTASection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
