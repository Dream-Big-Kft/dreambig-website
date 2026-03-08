import { SiteConfig } from "./types";
import { Code, Smartphone, Monitor, Database, Settings, Users } from "lucide-react";
import heroImage from "@assets/stock_images/it_img.avif";
import aboutImage from "@assets/stock_images/professional_securit_717af2d8.webp";

// DreamBig Kft - Software Development Services
export const config = {
  meta: {
    businessName: "DreamBig Kft",
    tagline: "Professional Software Development Services",
    location: "Győr, Hungary (Worldwide)",
    website: "dreambig.dev"
  },
  
  colors: {
    // Professional color scheme: Neutral base with subtle green accents
    // Light mode: Clean white/light gray with green accents for contrast
    // Dark mode: Light neutral gray with subtle green hints (not dark, not too green)
    primary: "142 52% 45%",              // Forest green accent - professional
    primaryForeground: "0 0% 100%",
    secondary: "0 0% 92%",                // Light neutral gray
    secondaryForeground: "0 0% 15%",
    background: {
      light: "0 0% 99%",                  // Almost pure white - clean and bright
      dark: "0 0% 28%"                    // Light gray (not dark, not green)
    },
    foreground: {
      light: "0 0% 8%",                   // Very dark text - strong contrast
      dark: "0 0% 95%"                    // Very light text - strong contrast
    },
    border: {
      light: "0 0% 88%",                  // Light gray border
      dark: "0 0% 40%"                    // Medium gray border
    },
    card: {
      light: "0 0% 100%",                 // Pure white cards
      dark: "0 0% 32%"                    // Slightly lighter gray cards
    },
    cardForeground: {
      light: "0 0% 8%",                   // Very dark text
      dark: "0 0% 95%"                    // Very light text
    },
    cardBorder: {
      light: "0 0% 90%",                  // Light gray border
      dark: "0 0% 38%"                    // Medium gray border
    },
    muted: {
      light: "0 0% 96%",                  // Very light gray section background
      dark: "0 0% 30%"                    // Slightly lighter gray for muted
    },
    mutedForeground: {
      light: "0 0% 40%",                  // Medium gray for muted text
      dark: "0 0% 70%"                    // Light gray for muted text
    },
    // Accent colors for icons - mix of green accents with other professional colors
    // accent1: "142 52% 45%",               // Forest green
    // accent2: "142 45% 55%",               // Medium green
    // accent3: "200 80% 50%",               // Professional blue
    // accent4: "142 35% 60%",               // Light sage green
    // accent5: "220 60% 55%",               // Soft blue
    // accent6: "142 40% 50%"                // Gentle green
    accent1: "210 100% 56%",             // Bright blue
    accent2: "340 82% 60%",               // Vibrant pink
    accent3: "280 95% 60%",               // Purple
    accent4: "160 84% 45%",               // Teal
    accent5: "45 95% 58%",                // Amber
    accent6: "260 89% 65%",               // Indigo
  },

  navigation: {
    items: [
      { id: "services", label: "Services" },
      { id: "about", label: "About" },
      { id: "contact", label: "Contact" }
    ],
    ctaButton: "Start Your Project"
  },

  hero: {
    title: "Custom Software Solutions Built for Your Business",
    subtitle: "Professional software development services including consulting, custom applications, maintenance, and team training. We deliver scalable solutions that grow with your business.",
    ctaButton: "Get a Quote",
    backgroundImage: heroImage,
    ariaLabel: "Professional software development team creating custom business solutions"
  },

  about: {
    title: "About DreamBig Kft",
    paragraphs: [
      "DreamBig Kft specializes in delivering professional software development services to businesses worldwide. With over 20 years of experience in modern technologies and agile methodologies, we transform your ideas into robust, scalable software solutions.",
      "Based in Győr, Hungary, but serving clients globally, our team brings decades of expertise in web and mobile application development, cloud infrastructure, and software consulting. We're committed to quality, efficiency, and innovation in every project.",
      "Our approach combines cutting-edge technology with proven methodologies from years of industry experience, ensuring your software not only meets current requirements but is designed to evolve with your business needs."
    ],
    credentials: [
      { text: "20+ Years Experience" },
      { text: "Enterprise Solutions" },
      { text: "Full Stack Development" },
      { text: "Cloud & DevOps" },
      { text: "Agile Certified" },
      { text: "Mobile Applications" },
      { text: "API & Integration" },
      { text: "Quality Assurance" }
    ],
    stats: {
      yearsExperience: "20+",
      clientsServed: "200+"
    },
    image: aboutImage,
    imageAlt: "Professional software development team collaborating on innovative solutions"
  },

  services: {
    title: "Software Development Services",
    subtitle: "Comprehensive development solutions tailored to your business needs and goals",
    services: [
      {
        icon: Code,
        title: "Custom Application Development",
        description: "Build tailored web and mobile applications using modern frameworks. From concept to deployment, we create scalable solutions that meet your exact requirements."
      },
      {
        icon: Monitor,
        title: "Software Consulting",
        description: "Expert guidance on technology selection, architecture design, and development strategy. We help you make informed decisions for your software projects."
      },
      {
        icon: Database,
        title: "Database Solutions",
        description: "Design, implement, and optimize database systems for performance and scalability. We ensure your data infrastructure supports business growth."
      },
      {
        icon: Settings,
        title: "Maintenance & Support",
        description: "Ongoing maintenance, updates, and support to keep your software running smoothly. We provide continuous improvement and bug fixes."
      },
      {
        icon: Users,
        title: "Team Training",
        description: "Comprehensive training programs to upskill your development team. Learn modern practices, frameworks, and best practices from experienced professionals."
      },
      {
        icon: Smartphone,
        title: "Mobile Development",
        description: "Native and cross-platform mobile applications for iOS and Android. We create responsive, feature-rich mobile solutions that engage users."
      }
    ]
  },

  contact: {
    title: "Get in Touch",
    subtitle: "Let's discuss your software development needs and how we can help",
    contactInfo: {
      phone: "+36 30 123 4567",
      email: "info@dreambig.dev",
      location: "Győr, Hungary (Worldwide Services)",
      businessHours: {
        weekdays: "Monday - Friday: 9:00 AM - 6:00 PM CET",
        emergency: "Response Time: Within 24 Hours"
      },
      emergencyResponse: {
        title: "Quick Response Time",
        description: "We understand urgent requirements. Contact us for immediate consultation and rapid project turnaround when you need it most."
      }
    },
    whyChooseUs: {
      title: "Why Choose Us?",
      items: [
        {
          title: "Experienced Team",
          description: "Skilled developers with years of hands-on experience in modern technologies"
        },
        {
          title: "Agile Methodology",
          description: "Flexible development process ensuring rapid delivery and continuous improvement"
        },
        {
          title: "Global Reach",
          description: "Worldwide service delivery with remote collaboration capabilities"
        }
      ]
    }
  },

  footer: {
    description: "Professional software development services. Quality, innovation, and reliability.",
    quickLinks: [
      { id: "services", label: "Services" },
      { id: "about", label: "About" },
      { id: "contact", label: "Contact" }
    ],
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" }
    ],
    copyright: "DreamBig Kft. All rights reserved. Based in Győr, Hungary."
  }
};