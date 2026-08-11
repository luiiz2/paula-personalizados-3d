import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CommercialImage } from '@/components/ui/CommercialImage';
import { brandAsset, closingAsset } from '@/data/commercial';
import { prefersReducedMotion } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const words = ['Feito', 'para', 'quem', 'importa.'];

export function MemoryClosing() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const animation = gsap.from('[data-memory-word]', {
        yPercent: 70,
        opacity: 0,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });
      const reveal = gsap.from('[data-memory-reveal]', {
        clipPath: 'inset(0 0 100% 0)',
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
      });
      const parallax = gsap.to('[data-memory-image]', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      return () => {
        animation.kill();
        reveal.kill();
        parallax.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="memory-closing commercial-section"
      aria-labelledby="memory-title"
    >
      <div className="memory-closing__copy">
        <div className="memory-closing__brand-disc">
          <CommercialImage asset={brandAsset} sizes="(max-width: 767px) 48vw, 18vw" />
        </div>
        <h2 id="memory-title" aria-label="Feito para quem importa.">
          {words.map((word) => (
            <span key={word} data-memory-word>
              {word}{' '}
            </span>
          ))}
        </h2>
        <p>Cada detalhe é feito com carinho para acompanhar histórias por muitos anos.</p>
      </div>
      <div className="memory-closing__visual-reveal" data-memory-reveal>
        <div className="memory-closing__visual">
          <div className="memory-closing__parallax" data-memory-image>
            <CommercialImage asset={closingAsset} sizes="(max-width: 767px) 92vw, 44vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
