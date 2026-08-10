import { useEffect, useRef, useState } from "react";

/**
 * Tracks scroll position and returns a parallax offset value.
 * @param speed - Multiplier for the parallax effect (0 = no movement, 1 = 1:1 scroll)
 */
export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref, offset };
}
