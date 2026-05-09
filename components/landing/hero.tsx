import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { HeroCodePanel } from "./hero-code-panel";

const valueProps = [
    "End-to-end custom software delivery",
    "Robust architecture designed for scale",
    "Long-term technical partnership and support",
    // "Senior engineers embedded in your team",
    // "Modern web & cloud architecture",
    // "Fast delivery without technical debt",
];

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-35 pb-24 lg:pt-40 lg:pb-24">
            {/* Background gradient effects */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-muted/40 to-transparent blur-3xl" />
                <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-muted/30 to-transparent blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-16">
                    {/* Left side - Content */}
                    <div className="mx-auto w-full max-w-2xl text-left lg:mx-0 lg:max-w-xl">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance leading-[1.1]">
                            Big Dreams Require Exceptional Engineering.
                        </h1>
                        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0">
                            Focus on your core business while we handle the technology.
                            We design, build, and manage custom web and mobile solutions that solve complex business challenges and drive long-term growth.
                        </p>

                        {/* Value propositions */}
                        <ul className="mt-8 space-y-4 flex flex-col items-start">
                            {valueProps.map((prop) => (
                                <li
                                    key={prop}
                                    className="flex items-start gap-3 text-lg text-foreground"
                                >
                                    <span className="flex h-5 w-5 mt-1 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                                        <Check className="w-3 h-3 text-background" />
                                    </span>
                                    {prop}
                                </li>
                            ))}
                        </ul>

                        {/* CTAs */}
                        <div className="mt-12 flex justify-end lg:justify-start flex-wrap gap-4">
                            <Button asChild size="lg" className="px-8 font-medium">
                                <a href="#contact">Start a Project</a>
                            </Button>
                        </div>
                    </div>

                    {/* Right side - Code/Dashboard Visual */}
                    <HeroCodePanel />
                </div>
            </div>
        </section>
    );
}
