import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import { SERVICES } from "@/data/portfolioData";

const BORDER_COLOR: Record<string, string> = {
  cyan: "border-cyan-500/80",
  emerald: "border-emerald-500/80",
  purple: "border-purple-500/80",
};

export function ServicesSection() {
  // Single hover state at component level — no hook-in-loop
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { setRef, visibleItems } = useStaggeredAnimation(SERVICES.length, 90);

  return (
    <section id="services" className="py-20 md:py-32 relative">
      <div className="container">
        <SectionHeader
          eyebrow="What I Create"
          heading="Services & Expertise"
          description="From stunning websites to intelligent automation, I deliver solutions that drive business growth."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={service.title}
                ref={setRef(idx)}
                className={`scroll-card${visibleItems[idx] ? " is-visible" : ""}`}
              >
                <Card
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`p-6 bg-slate-900/50 border-2 border-dashed transition-all group h-full flex flex-col ${
                    isHovered
                      ? `neon-glow-${service.glowColor} ${BORDER_COLOR[service.glowColor]}`
                      : "border-slate-700 hover:border-cyan-500/50"
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg bg-gradient-to-br ${service.color} mb-4`}
                  >
                    <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4 flex-1">{service.description}</p>
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-slate-950 font-semibold button-glow-cyan"
                    onClick={() =>
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Send me a message
                  </Button>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
