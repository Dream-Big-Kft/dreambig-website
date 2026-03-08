import DreamBigLogo from "./DreamBigLogo";

interface LogoProps {
    variant?: "full" | "compact";
    className?: string;
    onClick?: () => void;
}

export default function Logo({ variant = "full", className = "", onClick }: LogoProps) {
    return (
        <div className={`flex items-center gap-3 cursor-pointer ${className}`} onClick={onClick}>
            {/* DreamBig Logo */}
            <DreamBigLogo className="w-8 h-8 text-foreground" aria-label="DreamBig Logo" />

            {variant === "full" && (
                <div className="flex flex-col">
                    <span className="text-xl font-bold tracking-tight leading-none text-foreground">
                        DreamBig kft
                    </span>
                </div>
            )}
        </div>
    );
}
