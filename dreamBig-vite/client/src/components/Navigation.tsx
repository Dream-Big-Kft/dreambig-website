import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { SectionId } from "@/hooks/useScrollToSection";
import { config } from "@/config";

type NavigationProps = {
    scrollToSection: (section: SectionId) => void;
}
export default function Navigation(props: NavigationProps) {
    const { scrollToSection } = props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const onNavigationClick = (section: SectionId) => {
        scrollToSection(section);
        setMobileMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border" >
            <div className="max-w-7xl mx-auto px-6" >
                <div className="flex items-center justify-between h-16">
                    <Logo variant="full" onClick={() => onNavigationClick("home")} />

                    <div className="hidden md:flex items-center gap-4">
                        {config.navigation.items.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                data-testid={`link-${item.id}`}
                                className="text-sm font-medium text-foreground nav-hover-modern px-3 py-2 rounded-md"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onNavigationClick(item.id as SectionId);
                                }}
                            >
                                {item.label}
                            </a>
                        ))}
                        <ThemeToggle />
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        data-testid="button-menu-toggle"
                    >
                        {mobileMenuOpen
                            ? <X className="h-5 w-5" />
                            : <Menu className="h-5 w-5" />
                        }
                    </Button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden border-t border-border bg-background">
                    <div className="px-6 py-4 space-y-2">
                        {config.navigation.items.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onNavigationClick(item.id as SectionId);
                                }}
                                className="block w-full text-left text-sm font-medium text-foreground nav-hover-modern px-3 py-2 rounded-md"
                                data-testid={`link-mobile-${item.id}`}
                            >
                                {item.label}
                            </a>
                        ))}
                        <div className="flex justify-center pt-2">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
