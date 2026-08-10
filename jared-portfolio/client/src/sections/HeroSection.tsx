import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ROLES = ["Software Engineer", "Full-Stack Dev", "Tech Architect"];

interface Particle {
  x: number; y: number; vx: number; vy: number;
  radius: number; color: string; alpha: number;
}

const COLORS = ["#06b6d4", "#10b981", "#8b5cf6", "#ec4899"];

function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 80;
    const CONNECTION_DIST = 140;
    const MOUSE = { x: -9999, y: -9999 };

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const onMouseMove = (e: MouseEvent) => { MOUSE.x = e.clientX; MOUSE.y = e.clientY; };
    window.addEventListener("mousemove", onMouseMove);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        const dx = p.x - MOUSE.x; const dy = p.y - MOUSE.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) { p.x += (dx / dist) * 1.5; p.y += (dy / dist) * 1.5; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]; const b = particles[j];
          const dx = a.x - b.x; const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = a.color; ctx.globalAlpha = (1 - dist / CONNECTION_DIST) * 0.25;
            ctx.lineWidth = 0.8; ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none"
      style={{ opacity: 0.4, zIndex: 0 }} aria-hidden="true" />
  );
}

export function HeroSection() {
  const badge   = useScrollAnimation<HTMLDivElement>({ threshold: 0.05 });
  const heading = useScrollAnimation<HTMLHeadingElement>({ delay: 100, threshold: 0.05 });
  const roles   = useScrollAnimation<HTMLDivElement>({ delay: 220, threshold: 0.05 });
  const desc    = useScrollAnimation<HTMLParagraphElement>({ delay: 340, threshold: 0.05 });
  const ctas    = useScrollAnimation<HTMLDivElement>({ delay: 460, threshold: 0.05 });
  const photo   = useScrollAnimation<HTMLDivElement>({ delay: 200, threshold: 0.05 });

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <AnimatedBackground />

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

          {/* ── Left: text ── */}
          <div className="flex-1 max-w-2xl">
            {/* Badge */}
            <div ref={badge.ref} className={`mb-6 inline-block scroll-fade-up${badge.isVisible ? " is-visible" : ""}`}>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/50">
                ✨ Available for opportunities
              </span>
            </div>

            {/* Headline */}
            <h1 ref={heading.ref} className={`text-5xl md:text-7xl font-bold mb-6 leading-tight scroll-fade-up${heading.isVisible ? " is-visible" : ""}`}>
              <span className="block mb-2">Hi, I'm</span>
              <span style={{ background: "linear-gradient(90deg,#06b6d4,#10b981,#8b5cf6,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Jared Otieno
              </span>
            </h1>

            {/* Role badges */}
            <div ref={roles.ref} className={`flex flex-wrap gap-3 mb-8 scroll-fade-up${roles.isVisible ? " is-visible" : ""}`}>
              {ROLES.map((role) => (
                <span key={role} className="px-4 py-2 rounded-full text-sm font-medium bg-slate-800 border border-slate-700 text-slate-200 hover:border-cyan-500 transition-colors">
                  {role}
                </span>
              ))}
            </div>

            {/* Description */}
            <p ref={desc.ref} className={`text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed scroll-fade-up${desc.isVisible ? " is-visible" : ""}`}>
              I build custom software solutions that scale your business. With 4+ years of full-stack
              experience, I deliver production-ready code, thoughtful architecture, and measurable business impact.
            </p>

            {/* CTAs */}
            <div ref={ctas.ref} className={`flex flex-wrap gap-4 pt-4 scroll-fade-up${ctas.isVisible ? " is-visible" : ""}`}>
              <Button size="lg"
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-slate-950 font-semibold button-glow-cyan"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Let's Connect <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline"
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 button-glow-cyan"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                View My Work
              </Button>
              <a href="/Jared-Otieno-CV.pdf" download
                className="inline-flex items-center gap-2 h-11 px-6 rounded-md text-sm font-semibold border border-slate-600 text-slate-300 hover:border-cyan-500 hover:text-cyan-400 transition-all">
                <Download className="h-4 w-4" /> Download CV
              </a>
            </div>
          </div>

          {/* ── Right: photo ── */}
          <div ref={photo.ref} className={`flex-shrink-0 scroll-fade-up${photo.isVisible ? " is-visible" : ""}`}>
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Spinning gradient ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-cyan-500 via-emerald-500 to-purple-500 opacity-70 blur-sm animate-spin-slow" />
              {/* Static border ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 via-emerald-500 to-purple-500 opacity-40" />
              {/* Photo */}
              <img
                src="/profile.png"
                alt="Jared Otieno"
                className="relative w-full h-full object-cover object-top rounded-full border-4 border-slate-900 shadow-2xl z-10"
                style={{ position: "relative", zIndex: 10 }}
              />
              {/* Floating status dot */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-slate-900/90 border border-emerald-500/50 rounded-full px-3 py-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-300 font-medium">Available</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
