import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Footer() {
  const anim = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-8">
      <div
        ref={anim.ref}
        className={`container text-center text-sm text-slate-500 scroll-fade-up${anim.isVisible ? " is-visible" : ""}`}
      >
        <p>© {new Date().getFullYear()} Jared Otieno Odhiambo. All rights reserved.</p>
        <p className="mt-2">Crafted with precision and attention to detail.</p>
      </div>
    </footer>
  );
}
