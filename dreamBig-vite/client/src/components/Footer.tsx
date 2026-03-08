import { SectionId } from '@/hooks/useScrollToSection';
import Logo from "./Logo";
import { config } from "@/config";

type FooterProps = {
    scrollToSection: (section: SectionId) => void;
}
export default function Footer(props: FooterProps) {
    const { scrollToSection } = props;
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background border-t border-border py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <Logo variant="full" className="mb-4" onClick={() => scrollToSection("home")} />
                        <p className="text-sm text-muted-foreground">
                            {config.footer.description}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            {config.footer.quickLinks.map((link) => (
                                <li key={link.id}>
                                    <a
                                        href={`#${link.id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection(link.id as SectionId);
                                        }}
                                        className="text-muted-foreground hover:text-foreground nav-hover-modern pb-1"
                                        data-testid={`link-footer-${link.id}`}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            {config.footer.legalLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-muted-foreground hover:text-foreground nav-hover-modern pb-1"
                                        data-testid={`link-${link.href.replace('/', '').replace('-', '')}`}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground text-center">
                        © {currentYear} {config.footer.copyright}
                    </p>
                </div>
            </div>
        </footer>
    );
}
