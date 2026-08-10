import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface SectionHeaderProps {
  eyebrow: string;
  heading: string;
  description?: string;
}

export function SectionHeader({ eyebrow, heading, description }: SectionHeaderProps) {
  const eyebrowAnim = useScrollAnimation<HTMLSpanElement>({ threshold: 0.2 });
  const headingAnim = useScrollAnimation<HTMLHeadingElement>({ delay: 100, threshold: 0.2 });
  const descAnim = useScrollAnimation<HTMLParagraphElement>({ delay: 200, threshold: 0.2 });

  return (
    <div className="mb-16">
      <span
        ref={eyebrowAnim.ref}
        className={`text-cyan-400 text-sm font-medium scroll-label${eyebrowAnim.isVisible ? " is-visible" : ""}`}
      >
        {eyebrow}
      </span>
      <h2
        ref={headingAnim.ref}
        className={`text-4xl md:text-5xl font-bold mt-2 mb-4 scroll-fade-up${headingAnim.isVisible ? " is-visible" : ""}`}
      >
        {heading}
      </h2>
      {description && (
        <p
          ref={descAnim.ref}
          className={`text-lg text-slate-400 max-w-2xl scroll-fade-up${descAnim.isVisible ? " is-visible" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
