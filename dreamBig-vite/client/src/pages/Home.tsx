import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useScrollToSection } from '@/hooks/useScrollToSection';

export default function Home() {
    const { refs, scrollToSection } = useScrollToSection();

    return (
        <div className="min-h-screen">
            <Navigation scrollToSection={scrollToSection} />
            <Hero sectionRef={refs.home} scrollToSection={scrollToSection} />
            <Services sectionRef={refs.services} />
            <About sectionRef={refs.about} />
            <Contact sectionRef={refs.contact} />
            <Footer scrollToSection={scrollToSection}/>
        </div>
    );
}
