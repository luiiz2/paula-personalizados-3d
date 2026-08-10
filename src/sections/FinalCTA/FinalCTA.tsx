/**
 * FinalCTA — CTA final (PRD §77–79)
 * Seção grande em rosa
 * Headline: TEM UMA / ideia? / VAMOS / CRIAR.
 * Botão principal: FALE COM A GENTE → WhatsApp
 * Elementos: borboletas, estrelas, flores, formas abstratas no background
 */
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { FloatingDecoration } from '@/components/motion/FloatingDecoration';
import { links, openExternal } from '@/data/links';
import { prefersReducedMotion } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const decoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const validDecos = decoRefs.current.filter(Boolean) as HTMLDivElement[];
      if (validDecos.length) {
        gsap.fromTo(validDecos,
          { scale: 0, rotation: -45, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      return () => ctx.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta-final"
      className="section relative bg-pink overflow-hidden"
      aria-labelledby="cta-final-title"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div ref={(el) => { decoRefs.current[0] = el; }} className="absolute top-1/4 left-1/6 -translate-y-1/2" style={{ zIndex: 1 }}>
          <FloatingDecoration type="butterfly" size={70} speed={0.7} amplitude={20} color="#ffffff" delay={0.2} />
        </div>
        <div ref={(el) => { decoRefs.current[1] = el; }} className="absolute top-1/3 right-1/5" style={{ zIndex: 1 }}>
          <FloatingDecoration type="butterfly" size={56} speed={0.9} amplitude={15} color="#ffffff" delay={0.5} />
        </div>
        <div ref={(el) => { decoRefs.current[2] = el; }} className="absolute bottom-1/4 left-1/4 translate-y-1/2" style={{ zIndex: 1 }}>
          <FloatingDecoration type="butterfly" size={50} speed={0.8} amplitude={18} color="#ffffff" delay={0.8} />
        </div>

        <div ref={(el) => { decoRefs.current[3] = el; }} className="absolute top-20 right-1/3" style={{ zIndex: 1 }}>
          <FloatingDecoration type="star" size={32} speed={1} amplitude={12} color="#ffffff" delay={1.1} />
        </div>
        <div ref={(el) => { decoRefs.current[4] = el; }} className="absolute bottom-20 right-1/4" style={{ zIndex: 1 }}>
          <FloatingDecoration type="star" size={28} speed={1.2} amplitude={10} color="#ffffff" delay={1.4} />
        </div>

        <div ref={(el) => { decoRefs.current[5] = el; }} className="absolute top-1/2 left-1/4 -translate-y-1/2" style={{ zIndex: 1 }}>
          <FloatingDecoration type="flower" size={48} speed={0.6} amplitude={14} color="#ffffff" delay={1.7} />
        </div>
        <div ref={(el) => { decoRefs.current[6] = el; }} className="absolute bottom-1/3 right-1/6" style={{ zIndex: 1 }}>
          <FloatingDecoration type="flower" size={40} speed={0.7} amplitude={12} color="#ffffff" delay={2} />
        </div>

        <div ref={(el) => { decoRefs.current[7] = el; }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 0 }}>
          <FloatingDecoration type="blob" size={200} speed={0.4} amplitude={8} color="#ffffff/5" delay={2.3} />
        </div>
      </div>

      <div className="container-prose relative z-10 text-center">
        <SectionTitle
          id="cta-final-title"
          headline="TEM UMA"
          scriptLine="ideia?"
          headlineEnd="VAMOS CRIAR."
          align="center"
          size="hero"
        />

        <div className="mt-12">
          <AnimatedButton
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto min-w-[280px]"
            onClick={() => openExternal(links.whatsapp)}
          >
            FALE COM A GENTE
          </AnimatedButton>
        </div>

        <p className="mt-8 text-white/70 font-sans text-base max-w-md mx-auto">
          Respondo rápido. Vamos transformar sua história em 3D.
        </p>
      </div>
    </section>
  );
}
