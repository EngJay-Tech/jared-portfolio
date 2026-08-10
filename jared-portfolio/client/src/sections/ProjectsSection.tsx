import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";
import { useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import { PROJECTS } from "@/data/portfolioData";

const BORDER_COLOR: Record<string, string> = {
  cyan: "border-cyan-500/80",
  emerald: "border-emerald-500/80",
  purple: "border-purple-500/80",
};

export function ProjectsSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { setRef, visibleItems } = useStaggeredAnimation(PROJECTS.length, 110);

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="container">
        <SectionHeader
          eyebrow="Portfolio"
          heading="Featured Projects"
          description="Real-world solutions that delivered measurable business impact."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {PROJECTS.map((project, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={project.title}
                ref={setRef(idx)}
                className={`scroll-card${visibleItems[idx] ? " is-visible" : ""}`}
              >
                <Card
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`overflow-hidden bg-slate-900/50 border-2 border-dashed transition-all group h-full ${
                    isHovered
                      ? `neon-glow-${project.glowColor} ${BORDER_COLOR[project.glowColor]}`
                      : "border-slate-700 hover:border-cyan-500/50"
                  }`}
                >
                  <div
                    className={`h-48 bg-gradient-to-br ${project.color} opacity-20`}
                    aria-hidden="true"
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
