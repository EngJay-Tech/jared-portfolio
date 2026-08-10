import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationOptions extends IntersectionObserverInit {
  delay?: number;
}

/**
 * Observes a single element and flips `isVisible` when it enters the viewport.
 * Generic T lets callers match the exact element type so the ref is compatible
 * with any specific HTML element (div, h2, p, span, …).
 */
export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const { delay = 0, ...observerOptions } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          delay > 0
            ? setTimeout(() => setIsVisible(true), delay)
            : setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px', ...observerOptions }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  // delay is the only reactive dep; observerOptions is spread from props
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  return { ref, isVisible };
}

/**
 * Observes an array of elements and staggers their `isVisible` state with an
 * incremental delay — ideal for card grids and lists.
 */
export function useStaggeredAnimation(count: number, baseDelay = 100) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(() =>
    Array(count).fill(false)
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    refs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * baseDelay);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [count, baseDelay]);

  const setRef = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  };

  return { setRef, visibleItems };
}
