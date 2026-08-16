import { useRef, type RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { shouldEnhanceMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

export function useSectionReveal<T extends HTMLElement>(
  selector: string,
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useGSAP(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!shouldEnhanceMotion({ finePointer, reducedMotion })) return;

    const animation = gsap.fromTo(
      selector,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      },
    );

    return () => animation.kill();
  }, { scope: ref, dependencies: [selector] });

  return ref;
}
