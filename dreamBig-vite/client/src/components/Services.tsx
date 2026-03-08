import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { config } from "@/config";

type ServicesProps = {
    sectionRef: React.RefObject<HTMLDivElement>;
}

export default function Services(props: ServicesProps) {
    const { sectionRef } = props;
    return (
        <section id="services" className="py-20 md:py-32 bg-muted" ref={sectionRef}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        {config.services.title}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {config.services.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
                    {config.services.services.map((service, index) => {
                        const IconComponent = service.icon;
                        // Use accent colors from config
                        const accentColor = `hsl(${config.colors[`accent${index + 1}` as keyof typeof config.colors]})`;
                        return (
                            <Card key={index} className="card-hover-modern-light" data-testid={`card-service-${index}`} role="listitem">
                                <CardHeader>
                                    <div className="mb-4">
                                        <IconComponent className="w-10 h-10 icon-hover-modern" strokeWidth={1.5} aria-hidden="true" style={{ color: accentColor }} />
                                    </div>
                                    <CardTitle className="text-xl">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base leading-relaxed">
                                        {service.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
