import { useRef } from 'react'

export type SectionId = "services" | "about" | "contact" | "home";
export type NavItem = {
    label: string;
    id: SectionId;
}

export const navItems: NavItem[] = [
    { label: "Services", id: "services" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
];

const scrollToElement = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
    });
}

export const useScrollToSection = () => {
    const refs = {
        services: useRef<HTMLDivElement>(null),
        about: useRef<HTMLDivElement>(null),
        contact: useRef<HTMLDivElement>(null),
        home: useRef<HTMLDivElement>(null)
    } satisfies Record<SectionId, React.RefObject<HTMLDivElement>>;
    
    const scrollToSection = (section?: SectionId) => {
        switch (section) {
            case "services":
                scrollToElement(refs.services);
                break;
            case "about":
                scrollToElement(refs.about);
                break;
            case "contact":
                scrollToElement(refs.contact);
                break;
            case "home":
                scrollToElement(refs.home);
                break;
            default:
                console.warn(`Unknown section: ${section}`);
                scrollToElement(refs.home);
                break;
        }
        
        if (section) {
            // TODO: is it a good idea to update the URL hash?
            // and use window for this ?
            // we may use here a router like react-router or a lightwieght version WOUTER!
            window.history.pushState(null, '', `#${section}`);
        }
    }
    return { refs, scrollToSection }
};