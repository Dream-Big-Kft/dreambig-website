import { Icon } from "@iconify/react";
import reactIcon from "@iconify-icons/logos/react";
import nextIcon from "@iconify-icons/logos/nextjs-icon";
import typescriptIcon from "@iconify-icons/logos/typescript-icon";
import nodeIcon from "@iconify-icons/logos/nodejs-icon";
import awsIcon from "@iconify-icons/logos/aws";
import gcpIcon from "@iconify-icons/logos/google-cloud";
import postgresqlIcon from "@iconify-icons/logos/postgresql";
import dynamodbIcon from "@iconify-icons/logos/aws-dynamodb";
import figmaIcon from "@iconify-icons/logos/figma";
import openaiIcon from "@iconify-icons/logos/openai-icon";
import {
    SiClaude as ClaudeIcon,
    SiClaudeHex as claudeColor,
    SiTanstack as TanstackIcon,
} from "@icons-pack/react-simple-icons";

const iconClassName = "mb-3 h-8 w-8";
const awsIconClassName = `${iconClassName} dark:invert dark:hue-rotate-180 dark:saturate-150 dark:brightness-125`;
const darkInvertIconClassName = `${iconClassName} dark:invert`;
const technologyCardClassName =
    "card-hover-modern-light flex min-h-32 flex-col items-center justify-center rounded-xl border border-border bg-card p-5 text-center hover:border-primary/20";
const moreCardClassName =
    "flex min-h-32 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/60 p-5 text-center";

const technologies = [
    { name: "React", icon: <Icon aria-hidden className={iconClassName} icon={reactIcon} /> },
    { name: "React Native", icon: <Icon aria-hidden className={iconClassName} icon={reactIcon} /> },
    { name: "Next.js", icon: <Icon aria-hidden className={iconClassName} icon={nextIcon} /> },
    { name: "TanStack", icon: <TanstackIcon aria-hidden className={iconClassName} title="" /> },
    { name: "TypeScript", icon: <Icon aria-hidden className={iconClassName} icon={typescriptIcon} /> },
    { name: "Node.js", icon: <Icon aria-hidden className={iconClassName} icon={nodeIcon} /> },
    { name: "AWS", icon: <Icon aria-hidden className={awsIconClassName} icon={awsIcon} /> },
    { name: "GCP", icon: <Icon aria-hidden className={iconClassName} icon={gcpIcon} /> },
    { name: "PostgreSQL", icon: <Icon aria-hidden className={iconClassName} icon={postgresqlIcon} /> },
    { name: "DynamoDB", icon: <Icon aria-hidden className={iconClassName} icon={dynamodbIcon} /> },
    { name: "Figma", icon: <Icon aria-hidden className={iconClassName} icon={figmaIcon} /> },
    { name: "Claude", icon: <ClaudeIcon aria-hidden className={iconClassName} color={claudeColor} title="" /> },
    { name: "ChatGPT", icon: <Icon aria-hidden className={darkInvertIconClassName} icon={openaiIcon} /> },
];

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
                    {technologies.map((technology) => (
                        <div
                            key={technology.name}
                            className={technologyCardClassName}
                        >
                            {technology.icon}
                            <span className="text-sm font-medium text-foreground">
                                {technology.name}
                            </span>
                        </div>
                    ))}
                    <div className={moreCardClassName}>
                        <span
                            className="mb-3 flex h-8 w-8 items-center justify-center text-3xl font-semibold leading-none text-foreground/70 dark:text-foreground/75"
                            aria-hidden="true"
                        >
                            ...
                        </span>
                        <span className="text-sm font-medium text-foreground">
                            and more
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
