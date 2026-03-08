import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
    const { theme, toggleTheme, isLoading } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            disabled={isLoading}
            data-testid="button-theme-toggle"
            aria-label="Toggle theme"
        >
            {isLoading
                ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                : theme === "light"
                    ? <Moon className="h-5 w-5" />
                    : <Sun className="h-5 w-5" />
            }
        </Button>
    );
}
