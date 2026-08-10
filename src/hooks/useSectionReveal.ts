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

    const animation = gsap.from(selector, {
      y: 42,
      opacity: 0,
      scale: 0.96,
      duration: 0.7,
      stagger: 0.09,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => animation.kill();
  }, { scope: ref, dependencies: [selector] });

  return ref;
}
