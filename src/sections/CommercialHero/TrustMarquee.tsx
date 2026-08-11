import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { trustMessages } from '@/data/commercial';
import { prefersReducedMotion } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function TrustMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const accessibleMessage = trustMessages.join(' · ');

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.7,
        },
      });

      timeline.fromTo(
        '[data-horizontal-motion]',
        { xPercent: 0 },
        { xPercent: -24, ease: 'none' },
      );

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <aside
      ref={sectionRef}
      className="trust-marquee"
      aria-label="Diferenciais da Paula Personalizados 3D"
    >
      <p className="sr-only">{accessibleMessage}</p>
      <div className="trust-marquee__motion" data-horizontal-motion aria-hidden="true">
        {[0, 1].map((copy) => (
          <div
            className="trust-marquee__copy"
            data-horizontal-copy
            aria-hidden="true"
            key={copy}
          >
            {trustMessages.map((message) => (
              <span key={`${copy}-${message}`}>
                {message}
                <i>✦</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}
