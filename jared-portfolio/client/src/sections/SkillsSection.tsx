import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import { Card } from "@/components/ui/card";

interface Skill {
  icon: string;
  title: string;
  description: string;
  gradient: string;
  badge?: string;
  badgeColor?: string;
  glowColor: "cyan" | "emerald" | "purple" | "pink";
}

const SKILLS: Skill[] = [
  {
    icon: "⚡",
    title: "Full-Stack Development",
    description: "Building scalable web applications with React, TypeScript, Node.js, and cloud architectures.",
    gradient: "from-cyan-500 to-blue-500",
    glowColor: "cyan",
  },
  {
    icon: "📊",
    title: "API & Backend Systems",
    description: "Designing robust REST and GraphQL APIs with authentication, rate limiting, and scalable data layers.",
    gradient: "from-emerald-500 to-teal-500",
    badge: "In Demand",
    badgeColor: "bg-emerald-500",
    glowColor: "emerald",
  },
  {
    icon: "🤖",
    title: "AI Integration",
    description: "Integrating AI capabilities into products — from OpenAI APIs to custom ML pipelines and automation.",
    gradient: "from-purple-500 to-pink-500",
    badge: "Hot in 2026",
    badgeColor: "bg-purple-500",
    glowColor: "purple",
  },
  {
    icon: "📱",
    title: "Mobile App Development",
    description: "Building cross-platform mobile apps with React Native — from MVPs to production-ready releases.",
    gradient: "from-pink-500 to-rose-500",
    glowColor: "pink",
  },
  {
    icon: "☁️",
    title: "Cloud & DevOps",
    description: "Deploying and maintaining apps on AWS, GCP, and Vercel with CI/CD pipelines and Docker containers.",
    gradient: "from-orange-500 to-amber-500",
    glowColor: "cyan",
  },
  {
    icon: "🛒",
    title: "SaaS & E-Commerce",
    description: "Building multi-tenant SaaS platforms and e-commerce systems with Stripe, subscriptions, and dashboards.",
    gradient: "from-indigo-500 to-purple-500",
    badge: "Trending",
    badgeColor: "bg-indigo-500",
    glowColor: "purple",
  },
  {
    icon: "🎨",
    title: "UI/UX Implementation",
    description: "Turning designs into pixel-perfect, accessible, and performant interfaces with smooth animations.",
    gradient: "from-teal-500 to-cyan-500",
    glowColor: "cyan",
  },
  {
    icon: "🔒",
    title: "Auth & Security",
    description: "Implementing secure authentication flows, role-based access control, and data encryption best practices.",
    gradient: "from-red-500 to-orange-500",
    glowColor: "emerald",
  },
];

const GLOW_CLASSES: Record<string, string> = {
  cyan: "neon-glow-cyan border-cyan-500/80",
  emerald: "neon-glow-emerald border-emerald-500/80",
  purple: "neon-glow-purple border-purple-500/80",
  pink: "neon-glow-purple border-pink-500/80",
};

export function SkillsSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { setRef, visibleItems } = useStaggeredAnimation(SKILLS.length, 80);

  return (
    <section className="py-20 md:py-32 relative">
      <div className="container">
        <SectionHeader
          eyebrow="What I Bring to the Table"
          heading="Skills & Expertise"
          description="A full-stack skill set built to deliver complete, production-ready solutions."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((skill, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={skill.title}
                ref={setRef(idx)}
                className={`scroll-card relative${visibleItems[idx] ? " is-visible" : ""}`}
              >
                {skill.badge && (
                  <span
                    className={`absolute -top-3 right-4 z-10 text-xs font-semibold text-white px-2 py-0.5 rounded-full ${skill.badgeColor}`}
                  >
                    {skill.badge}
                  </span>
                )}
                <Card
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`p-6 bg-slate-900/50 border-2 border-dashed h-full flex flex-col gap-3 transition-all duration-300 ${
                    isHovered
                      ? GLOW_CLASSES[skill.glowColor]
                      : "border-slate-700 hover:border-cyan-500/40"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.gradient} flex items-center justify-center text-2xl shadow-lg`}
                  >
                    {skill.icon}
                  </div>

                  {/* Text */}
                  <h3 className="font-bold text-base text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {skill.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed flex-1">
                    {skill.description}
                  </p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
