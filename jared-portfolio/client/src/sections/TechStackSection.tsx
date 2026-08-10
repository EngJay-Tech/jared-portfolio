import { useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import { SectionHeader } from "@/components/SectionHeader";

const TECH_STACK = [
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "🔷" },
  { name: "Node.js", icon: "🟢" },
  { name: "Next.js", icon: "▲" },
  { name: "Python", icon: "🐍" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Tailwind", icon: "🎨" },
  { name: "Docker", icon: "🐳" },
  { name: "Git", icon: "🔀" },
  { name: "AWS", icon: "☁️" },
  { name: "Firebase", icon: "🔥" },
  { name: "GraphQL", icon: "◈" },
  { name: "Redis", icon: "⚡" },
  { name: "Stripe", icon: "💳" },
  { name: "OpenAI", icon: "🤖" },
];

export function TechStackSection() {
  const { setRef, visibleItems } = useStaggeredAnimation(TECH_STACK.length, 60);

  return (
    <section className="py-20 md:py-32 relative">
      <div className="container">
        <SectionHeader
          eyebrow="Technologies I Work With"
          heading="Tech Stack"
          description="The tools and technologies I use to bring ideas to life."
        />

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4">
          {TECH_STACK.map((tech, idx) => (
            <div
              key={tech.name}
              ref={setRef(idx)}
              className={`scroll-card${visibleItems[idx] ? " is-visible" : ""}`}
            >
              <div className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-900/50 border border-slate-700 hover:border-cyan-500/60 hover:bg-slate-800/60 transition-all duration-300 cursor-default">
                <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                  {tech.icon}
                </span>
                <span className="text-xs text-slate-400 group-hover:text-cyan-400 transition-colors text-center font-medium">
                  {tech.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
