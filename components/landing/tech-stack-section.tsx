import { icons as logos } from "@iconify-json/logos";
import { icons as simpleIcons } from "@iconify-json/simple-icons";

type IconCollection = "logos" | "simple";

type Technology = {
  name: string;
  icon: string;
  collection?: IconCollection;
};

type BrandIconData = {
  body: string;
  width?: number;
  height?: number;
};

const technologies: Technology[] = [
  { name: "React", icon: "react" },
  { name: "React Native", icon: "react" },
  { name: "Next.js", icon: "nextjs-icon" },
  { name: "TanStack", icon: "tanstack", collection: "simple" },
  { name: "TypeScript", icon: "typescript-icon" },
  { name: "Node.js", icon: "nodejs-icon" },
  { name: "AWS", icon: "aws" },
  { name: "GCP", icon: "google-cloud" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "DynamoDB", icon: "aws-dynamodb" },
  { name: "Figma", icon: "figma" },
  { name: "Claude Code", icon: "claude-icon" },
  { name: "ChatGPT", icon: "openai-icon" },
];

const getIcon = ({ collection = "logos", icon }: Technology) => {
  const iconSet = collection === "simple" ? simpleIcons : logos;
  const iconData = iconSet.icons[icon];

  if (!iconData) {
    throw new Error(`Missing technology icon: ${icon}`);
  }

  return {
    ...iconData,
    width: iconData.width ?? iconSet.width,
    height: iconData.height ?? iconSet.height,
  } as BrandIconData;
};

const BrandIcon = ({ technology }: { technology: Technology }) => {
  const icon = getIcon(technology);

  return (
    <svg
      aria-hidden="true"
      className="mb-3 h-8 w-8"
      viewBox={`0 0 ${icon.width ?? 24} ${icon.height ?? 24}`}
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  );
};

export function TechStackSection() {
  return (
    <section className="border-y border-border/75 bg-muted/70 py-20 dark:border-white/8 dark:bg-card/55 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
            Tools We Trust
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            We work with proven tools across web, mobile, cloud, and product
            design, choosing the right stack for fast delivery and long-term
            maintainability.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="card-hover-modern-light flex min-h-32 flex-col items-center justify-center rounded-xl border border-border bg-card p-5 text-center hover:border-primary/20"
            >
              <BrandIcon technology={tech} />
              <span className="text-sm font-medium text-foreground">
                {tech.name}
              </span>
            </div>
          ))}
          <div className="flex min-h-32 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/60 p-5 text-center">
            <span
              className="mb-3 text-3xl font-semibold leading-none text-muted-foreground"
              aria-hidden="true"
            >
              ...
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              and more
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
