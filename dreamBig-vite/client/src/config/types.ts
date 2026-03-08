import { LucideIcon } from "lucide-react";

// Color scheme configuration
export interface ColorScheme {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  background: {
    light: string;
    dark: string;
  };
  foreground: {
    light: string;
    dark: string;
  };
  border: {
    light: string;
    dark: string;
  };
  card: {
    light: string;
    dark: string;
  };
  cardForeground: {
    light: string;
    dark: string;
  };
  cardBorder: {
    light: string;
    dark: string;
  };
  muted: {
    light: string;
    dark: string;
  };
  mutedForeground: {
    light: string;
    dark: string;
  };
  // Accent colors for icons and colorful elements
  accent1: string;
  accent2: string;
  accent3: string;
  accent4: string;
  accent5: string;
  accent6: string;
}

// Service configuration
export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  image?: string;
}

// Contact information
export interface ContactInfo {
  phone: string;
  email: string;
  location: string;
  businessHours: {
    weekdays: string;
    emergency: string;
  };
  emergencyResponse: {
    title: string;
    description: string;
  };
}

// Business credentials/badges
export interface Credential {
  text: string;
  variant?: "secondary" | "outline" | "default";
}

// Statistics/metrics
export interface Stats {
  yearsExperience: string;
  clientsServed: string;
}

// Navigation items
export interface NavItem {
  id: string;
  label: string;
}

// Hero section configuration
export interface HeroConfig {
  title: string;
  subtitle: string;
  ctaButton: string;
  backgroundImage: string;
  ariaLabel: string;
}

// About section configuration
export interface AboutConfig {
  title: string;
  paragraphs: string[];
  credentials: Credential[];
  stats: Stats;
  image: string;
  imageAlt: string;
}

// Services section configuration
export interface ServicesConfig {
  title: string;
  subtitle: string;
  services: Service[];
}

// Contact section configuration
export interface ContactConfig {
  title: string;
  subtitle: string;
  contactInfo: ContactInfo;
  whyChooseUs: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
}

// Footer configuration
export interface FooterConfig {
  description: string;
  quickLinks: NavItem[];
  legalLinks: Array<{
    label: string;
    href: string;
  }>;
  copyright: string;
}

// Main site configuration
export interface SiteConfig {
  meta: {
    businessName: string;
    tagline: string;
    location: string;
    website?: string;
  };
  colors: ColorScheme;
  navigation: {
    items: NavItem[];
    ctaButton: string;
  };
  hero: HeroConfig;
  about: AboutConfig;
  services: ServicesConfig;
  contact: ContactConfig;
  footer: FooterConfig;
}
