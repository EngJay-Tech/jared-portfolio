import { useState } from "react";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";
import { useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import { TESTIMONIALS } from "@/data/portfolioData";

const BORDER_COLOR: Record<string, string> = {
  cyan: "border-cyan-500/80",
  emerald: "border-emerald-500/80",
  purple: "border-purple-500/80",
};

export function TestimonialsSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { setRef, visibleItems } = useStaggeredAnimation(TESTIMONIALS.length, 80);

  return (
    <section className="py-20 md:py-32 relative">
      <div className="container">
        <SectionHeader
          eyebrow="Social Proof"
          heading="What Clients Say"
          description="Real feedback from businesses I've helped transform with custom software solutions."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={testimonial.name}
                ref={setRef(idx)}
                className={`scroll-card${visibleItems[idx] ? " is-visible" : ""}`}
              >
                <Card
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`p-6 bg-slate-900/50 border-2 border-dashed transition-all group h-full flex flex-col ${
                    isHovered
                      ? `neon-glow-${testimonial.glowColor} ${BORDER_COLOR[testimonial.glowColor]}`
                      : "border-slate-700 hover:border-cyan-500/50"
                  }`}
                >
                  {/* Star rating */}
                  <div className="flex gap-1 mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-cyan-400 text-cyan-400" aria-hidden="true" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-slate-300 mb-4 leading-relaxed flex-1">
                    "{testimonial.testimonial}"
                  </p>

                  {/* Attribution */}
                  <div className="border-t border-slate-700 pt-4">
                    <p className="font-semibold text-slate-200">{testimonial.name}</p>
                    <p className="text-xs text-slate-400">
                      {testimonial.role} at {testimonial.company}
                    </p>
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
