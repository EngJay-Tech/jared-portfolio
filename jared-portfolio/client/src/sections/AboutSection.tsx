import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import { DIFFERENTIATORS } from "@/data/portfolioData";

export function AboutSection() {
  const eyebrow = useScrollAnimation<HTMLSpanElement>({ threshold: 0.1 });
  const heading = useScrollAnimation<HTMLHeadingElement>({ delay: 100, threshold: 0.1 });
  const para1   = useScrollAnimation<HTMLParagraphElement>({ delay: 180, threshold: 0.1 });
  const para2   = useScrollAnimation<HTMLParagraphElement>({ delay: 260, threshold: 0.1 });
  const card    = useScrollAnimation<HTMLDivElement>({ delay: 340, threshold: 0.1 });
  const photo   = useScrollAnimation<HTMLDivElement>({ delay: 150, threshold: 0.1 });
  const { setRef, visibleItems } = useStaggeredAnimation(DIFFERENTIATORS.length, 80);

  return (
    <section className="py-20 md:py-32 relative">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-16 items-center">

          {/* ── Left: photo ── */}
          <div ref={photo.ref} className={`flex-shrink-0 scroll-fade-up${photo.isVisible ? " is-visible" : ""}`}>
            <div className="relative w-56 h-56 md:w-72 md:h-72 mx-auto">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-purple-500 via-cyan-500 to-emerald-500 opacity-60 blur-sm" />
              <img
                src="/profile.png"
                alt="Jared Otieno"
                className="relative w-full h-full object-cover object-top rounded-2xl border-4 border-slate-900 shadow-2xl z-10"
                style={{ position: "relative", zIndex: 10 }}
              />
            </div>
          </div>

          {/* ── Right: text ── */}
          <div className="flex-1 max-w-2xl">
            <span ref={eyebrow.ref} className={`text-cyan-400 text-sm font-medium scroll-label${eyebrow.isVisible ? " is-visible" : ""}`}>
              About
            </span>

            <h2 ref={heading.ref} className={`text-4xl md:text-5xl font-bold mt-2 mb-8 scroll-fade-up${heading.isVisible ? " is-visible" : ""}`}>
              Crafted with Precision
            </h2>

            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p ref={para1.ref} className={`scroll-fade-up${para1.isVisible ? " is-visible" : ""}`}>
                I'm a software engineer with a passion for building systems that solve real business
                problems. After graduating from Zetech University with a diploma in Software Engineering
                in 2020, I've spent the last 4+ years working with startups and established businesses to
                design, build, and optimize custom software solutions.
              </p>
              <p ref={para2.ref} className={`scroll-fade-up${para2.isVisible ? " is-visible" : ""}`}>
                My approach is simple: understand your business deeply, architect solutions that scale,
                and deliver code that's maintainable, tested, and production-ready. I believe great
                software isn't just about elegant code — it's about measurable business impact.
              </p>
            </div>

            <div ref={card.ref} className={`mt-10 p-6 bg-slate-900/50 border-2 border-dashed border-slate-700 rounded-lg scroll-fade-up${card.isVisible ? " is-visible" : ""}`}>
              <h3 className="font-bold text-lg mb-4">Key Differentiators</h3>
              <ul className="space-y-3 text-slate-300">
                {DIFFERENTIATORS.map((item, i) => (
                  <li key={item} ref={setRef(i)} className={`flex items-start gap-3 scroll-card${visibleItems[i] ? " is-visible" : ""}`}>
                    <span className="text-cyan-400 mt-1" aria-hidden="true">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
