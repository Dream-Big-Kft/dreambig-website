import { Button } from "@/components/ui/button";
import { SectionId } from "@/hooks/useScrollToSection";
import { config } from "@/config";

type HeroProps = {
    scrollToSection: (section: SectionId) => void;
    sectionRef: React.RefObject<HTMLDivElement>;
}

export default function Hero(props: HeroProps) {
    const { scrollToSection, sectionRef } = props;

    return (
        <section className="relative flex align-center bg-background min-h-[80vh]" ref={sectionRef}>
            <div className="absolute top-[15%] left-0 w-[90%] h-auto">
                <img
                    src={config.hero.backgroundImage}
                    alt={config.hero.ariaLabel}
                    className="w-full h-auto object-contain object-left"
                    loading="eager"
                />
            </div>


            <div className="z-10 flex items-center justify-center lg:justify-start absolute top-[48%] right-[24%]">
                <div className="bg-card border border-card-border rounded-lg shadow-lg p-6 md:p-8 lg:p-10 w-full max-w-[44rem] text-left">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-card-foreground mb-4 lg:mb-6">
                        {config.hero.title}
                    </h1>
                    <div className="w-16 h-0.5 bg-primary mb-4 lg:mb-6"></div>
                    <p className="text-sm md:text-base lg:text-lg text-card-foreground/90 mb-6 lg:mb-8 leading-relaxed">
                        {config.hero.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            variant="default"
                            size="lg"
                            onClick={() => scrollToSection("contact")}
                            className="text-base btn-hover-modern-light w-full sm:w-auto"
                            data-testid="button-hero-consultation"
                        >
                            {config.hero.ctaButton}
                        </Button>
                    </div>
                </div>
            </div>




            {/* <div className="custom-shape-divider-bottom-1761638904">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill" />
                </svg>
            </div> */}
        </section>
    );
}
