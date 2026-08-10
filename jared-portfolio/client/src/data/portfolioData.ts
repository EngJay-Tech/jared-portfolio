import { Code2, Zap, Shield, TrendingUp, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Services ────────────────────────────────────────────────────────────────

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  glowColor: "cyan" | "emerald" | "purple";
}

export const SERVICES: Service[] = [
  {
    icon: Code2,
    title: "Custom Development",
    description: "Bespoke software solutions built to solve your specific business challenges.",
    color: "from-cyan-500 to-blue-500",
    glowColor: "cyan",
  },
  {
    icon: Zap,
    title: "SaaS Platforms",
    description: "Multi-tenant applications designed to scale from 10 to 10,000+ users.",
    color: "from-emerald-500 to-teal-500",
    glowColor: "emerald",
  },
  {
    icon: Shield,
    title: "API Development",
    description: "Robust APIs and third-party integrations built for reliability.",
    color: "from-purple-500 to-pink-500",
    glowColor: "purple",
  },
  {
    icon: TrendingUp,
    title: "Performance",
    description: "Optimize existing applications to eliminate bottlenecks and technical debt.",
    color: "from-orange-500 to-red-500",
    glowColor: "cyan",
  },
  {
    icon: Users,
    title: "Team Augmentation",
    description: "Work embedded with your team as a senior developer or technical advisor.",
    color: "from-pink-500 to-rose-500",
    glowColor: "emerald",
  },
  {
    icon: Zap,
    title: "Consulting",
    description: "Technology stack recommendations, architecture guidance, and mentorship.",
    color: "from-indigo-500 to-purple-500",
    glowColor: "purple",
  },
];

// ─── Projects ────────────────────────────────────────────────────────────────

export interface Project {
  title: string;
  description: string;
  tags: string[];
  color: string;
  glowColor: "cyan" | "emerald" | "purple";
}

export const PROJECTS: Project[] = [
  {
    title: "SaaS Analytics Dashboard",
    description:
      "Real-time analytics platform aggregating data from Shopify, WooCommerce, and Stripe. Features inventory forecasting and automated reporting.",
    tags: ["React", "Node.js", "PostgreSQL", "Recharts"],
    color: "from-cyan-500 to-blue-500",
    glowColor: "cyan",
  },
  {
    title: "Mobile Booking Platform",
    description:
      "White-label booking system with SMS/email reminders, automated cancellations, and payment processing for service-based businesses.",
    tags: ["React Native", "Node.js", "Stripe", "SMS API"],
    color: "from-emerald-500 to-teal-500",
    glowColor: "emerald",
  },
  {
    title: "AI-Powered CMS",
    description:
      "Content management system with AI-assisted content generation, SEO optimization, and multi-channel publishing capabilities.",
    tags: ["Next.js", "TypeScript", "Firebase", "OpenAI"],
    color: "from-purple-500 to-pink-500",
    glowColor: "purple",
  },
  {
    title: "Inventory Management System",
    description:
      "Real-time inventory tracking with barcode scanning, automated reorders, and demand forecasting for retail and manufacturing.",
    tags: ["React", "Node.js", "MongoDB", "WebSockets"],
    color: "from-orange-500 to-red-500",
    glowColor: "cyan",
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export interface Testimonial {
  name: string;
  company: string;
  role: string;
  testimonial: string;
  rating: number;
  glowColor: "cyan" | "emerald" | "purple";
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Chen",
    company: "TechVenture Inc",
    role: "CEO",
    testimonial:
      "Jared transformed our entire backend infrastructure. His code is clean, well-documented, and production-ready. Highly recommend!",
    rating: 5,
    glowColor: "cyan",
  },
  {
    name: "Marcus Johnson",
    company: "DataFlow Solutions",
    role: "CTO",
    testimonial:
      "Working with Jared was seamless. He understood our requirements immediately and delivered beyond expectations. A true professional.",
    rating: 5,
    glowColor: "emerald",
  },
  {
    name: "Elena Rodriguez",
    company: "StartupHub",
    role: "Founder",
    testimonial:
      "Jared built our SaaS platform from scratch. His architecture decisions have allowed us to scale to 10k+ users without issues.",
    rating: 5,
    glowColor: "purple",
  },
  {
    name: "David Park",
    company: "FinTech Innovations",
    role: "Product Manager",
    testimonial:
      "The API integration work was complex, but Jared handled it with expertise. Communication was clear throughout the project.",
    rating: 5,
    glowColor: "cyan",
  },
  {
    name: "Jessica Williams",
    company: "E-Commerce Plus",
    role: "Operations Lead",
    testimonial:
      "Performance optimization was critical for us. Jared reduced our load times by 60% and improved user experience dramatically.",
    rating: 5,
    glowColor: "emerald",
  },
  {
    name: "Alex Thompson",
    company: "Digital Agency Pro",
    role: "Director",
    testimonial:
      "Jared's technical mentorship elevated our entire team. His insights on architecture and best practices were invaluable.",
    rating: 5,
    glowColor: "purple",
  },
];

// ─── About differentiators ────────────────────────────────────────────────────

export const DIFFERENTIATORS = [
  "Full-Stack Expertise: Frontend to backend to deployment",
  "Business-Minded: I understand how software drives revenue",
  "Quality-Focused: Tested, documented, maintainable code",
  "Communication: Clear updates and collaborative approach",
];
