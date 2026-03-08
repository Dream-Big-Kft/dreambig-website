import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const techStack = [
  { name: "React", color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20" },
  { name: "TypeScript", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  { name: "Node.js", color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
  { name: "AWS", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" },
  { name: "GraphQL", color: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20" },
];

const valueProps = [
  "Senior engineers embedded in your team",
  "Modern web & cloud architecture",
  "Fast delivery without technical debt",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* Background gradient effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-muted/40 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-muted/30 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Content */}
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance leading-[1.1]">
              Custom Software That Moves Your Business Forward
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              We design and build scalable web applications, cloud systems, and APIs for startups and growing companies.
            </p>

            {/* Value propositions */}
            <ul className="mt-8 space-y-3">
              {valueProps.map((prop) => (
                <li key={prop} className="flex items-center gap-3 text-foreground">
                  <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-foreground">
                    <Check className="w-3 h-3 text-background" />
                  </span>
                  {prop}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" className="px-8 font-medium">
                Book a Consultation
              </Button>
              <Button size="lg" variant="outline" className="px-8 font-medium">
                See Our Work
              </Button>
            </div>

            {/* Tech stack badges */}
            <div className="mt-10">
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className={`px-3 py-1.5 text-sm font-medium rounded-full border ${tech.color}`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Code/Dashboard Visual */}
          <div className="relative lg:ml-auto">
            <div className="relative rounded-xl border border-border bg-slate-900 p-1 shadow-2xl">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-slate-400 font-mono">api-service.ts</span>
                </div>
              </div>

              {/* Code content */}
              <div className="p-4 font-mono text-sm overflow-hidden">
                <pre className="text-slate-300">
                  <code>
                    <span className="text-pink-400">import</span>
                    {" { "}
                    <span className="text-sky-400">createServer</span>
                    {" } "}
                    <span className="text-pink-400">from</span>
                    {" "}
                    <span className="text-green-400">{`'@api/core'`}</span>
                    {"\n"}
                    <span className="text-pink-400">import</span>
                    {" { "}
                    <span className="text-sky-400">auth</span>
                    {", "}
                    <span className="text-sky-400">rateLimit</span>
                    {" } "}
                    <span className="text-pink-400">from</span>
                    {" "}
                    <span className="text-green-400">{`'@middleware'`}</span>
                    {"\n\n"}
                    <span className="text-pink-400">const</span>
                    {" "}
                    <span className="text-sky-400">app</span>
                    {" = "}
                    <span className="text-yellow-400">createServer</span>
                    {"({\n"}
                    {"  "}
                    <span className="text-slate-100">port</span>
                    {": "}
                    <span className="text-orange-400">3000</span>
                    {",\n"}
                    {"  "}
                    <span className="text-slate-100">middleware</span>
                    {": ["}
                    <span className="text-sky-400">auth</span>
                    {", "}
                    <span className="text-sky-400">rateLimit</span>
                    {"],\n"}
                    {"  "}
                    <span className="text-slate-100">cors</span>
                    {": "}
                    <span className="text-orange-400">true</span>
                    {",\n"}
                    {"})\n\n"}
                    <span className="text-sky-400">app</span>
                    {"."}
                    <span className="text-yellow-400">get</span>
                    {"("}
                    <span className="text-green-400">{`'/api/health'`}</span>
                    {", () => ({\n"}
                    {"  "}
                    <span className="text-slate-100">status</span>
                    {": "}
                    <span className="text-green-400">{`'healthy'`}</span>
                    {",\n"}
                    {"  "}
                    <span className="text-slate-100">uptime</span>
                    {": "}
                    <span className="text-sky-400">process</span>
                    {"."}
                    <span className="text-yellow-400">uptime</span>
                    {"()\n"}
                    {"}))\n\n"}
                    <span className="text-slate-500">{"// Production ready"}</span>
                  </code>
                </pre>
              </div>
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 rounded-lg border border-border bg-card p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">99.9% Uptime</p>
                  <p className="text-xs text-muted-foreground">Production Systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
