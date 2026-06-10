/**
 * Nags Studio - TypeScript Interfaces
 */

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  href: string;
  features: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  image: string;
  width: number;
  height: number;
  featured?: boolean;
}

export type PortfolioCategory =
  | "all"
  | "weddings"
  | "reception"
  | "pre-wedding"
  | "maternity"
  | "baby"
  | "events";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  review: string;
  event: string;
  date: string;
  videoUrl?: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  tier: "silver" | "gold" | "platinum" | "royal";
  price: number;
  currency: string;
  duration: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
}

export interface Award {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorImage: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

export interface Stat {
  value: string;
  label: string;
  icon: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  package: string;
  date: string;
  message?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  category: string;
}

export interface ServicePricingPackage {
  id: string;
  name: string;
  price: number;
  currency: string;
  duration: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

export interface ServicePricing {
  serviceId: string;
  serviceLabel: string;
  icon: string;
  description: string;
  packages: ServicePricingPackage[];
}
