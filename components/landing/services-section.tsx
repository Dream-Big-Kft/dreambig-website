import {
    CodeXml,
    FileSearch,
    MonitorSmartphone,
    Route,
    Smartphone,
    UsersRound
} from "lucide-react";

const services = [
    {
        icon: CodeXml,
        color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
        title: "Custom Web Development",
        description:
            "Build scalable, high-performing web applications tailored to your business goals. Powered by React, we deliver secure, modern, and highly interactive web solutions—from complex enterprise platforms to dynamic web portals.",
    },
    {
        icon: Smartphone,
        color: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
        title: "Mobile Development",
        description:
            "Create engaging, feature-rich mobile experiences for iOS and Android. Leveraging React Native, we design and build intuitive applications that deliver top-tier performance and keep your users connected on the go.",
    },
    {
        icon: MonitorSmartphone,
        color:
            "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
        title: "Hybrid & Cross-Platform",
        description:
            "Get the best of both worlds with seamless applications that span web and mobile. By utilizing the React ecosystem across all devices, we build versatile, code-sharing solutions that maximize your reach while streamlining development timelines.",
    },
    {
        icon: Route,
        color:
            "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
        title: "Technology Consulting",
        description:
            "Navigate complex technical decisions with confidence. We provide expert guidance on architecture design, tech stack selection, and digital strategy to ensure your project's success.",
    },
    {
        icon: UsersRound,
        color:
            "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
        title: "Team Augmentation",
        description:
            "Accelerate your roadmap by integrating our experts into your existing team. Whether you need specialized skills or extra hands for a critical project, we seamlessly plug in to help you deliver.",
    },
    {
        icon: FileSearch,
        color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
        title: "Code Audits & Optimization",
        description:
            "Uncover bottlenecks and technical debt in your existing applications. We provide comprehensive codebase reviews to suggest actionable performance, security, and scalability improvements.",
    },
];

export function ServicesSection() {
    return (
        <section className="border-y border-border/75 bg-muted/75 py-20 dark:border-white/8 dark:bg-card/55 lg:py-24">
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
                            className="relative isolate rounded-2xl border border-border bg-card p-8"
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
