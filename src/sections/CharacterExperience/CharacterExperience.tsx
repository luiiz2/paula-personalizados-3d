/**
 * CharacterExperience — Personagens (PRD §55–58)
 * Mudança visual: off-white → preto (com detalhes vermelhos)
 * Headline: VIRE O / PERSONAGEM.
 * Scroll: produto cresce, aproxima, gira poucos graus
 * Textos sequenciais: IMPRESSÃO 3D, PINTURA ARTESANAL, ACABAMENTO MANUAL, FEITO PARA VOCÊ
 * Saída: preto → off-white gradual
 */
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Image } from '@/components/ui/Image';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { FloatingDecoration } from '@/components/motion/FloatingDecoration';
import { prefersReducedMotion } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  'IMPRESSÃO 3D',
  'PINTURA ARTESANAL',
  'ACABAMENTO MANUAL',
  'FEITO PARA VOCÊ',
];

const characterImg1 = '/assets/photo_2026-08-09_20-14-06.jpg';
const characterImg2 = '/assets/photo_2026-08-09_20-15-54.jpg';

export function CharacterExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const product = productRef.current;
      if (!section || !product) return;

      gsap.fromTo(product,
        { scale: 0.86, y: 48, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: product,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );

      const validSteps = stepRefs.current.filter(Boolean) as HTMLDivElement[];
      gsap.fromTo(validSteps,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: validSteps[0] || section,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="personagens"
      className="section relative overflow-hidden bg-ink"
      aria-labelledby="personagens-title"
    >
      <div
        className="absolute inset-0 z-0 bg-ink"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/10 to-transparent opacity-0" id="red-accent" aria-hidden="true" />
      </div>

      <div className="absolute inset-0 pointer-events-none z-10" aria-hidden="true">
        <FloatingDecoration type="butterfly" className="absolute top-20 left-10" size={48} speed={0.8} amplitude={15} color="#e89ab6" delay={0.2} />
        <FloatingDecoration type="star" className="absolute top-1/3 right-10" size={32} speed={1} amplitude={12} color="#e89ab6" delay={0.5} />
        <FloatingDecoration type="heart" className="absolute bottom-20 right-10" size={36} speed={0.9} amplitude={10} color="#e89ab6" delay={0.8} />
      </div>

      <div className="container-prose relative z-20">
        <SectionTitle
          id="personagens-title"
          headline="VIRE O"
          headlineEnd="PERSONAGEM."
          description="Impressão 3D, pintura artesanal e acabamento feito com cuidado."
          align="center"
          size="section"
          className="[&_h2]:text-white [&_p]:text-white/70"
        />

        <div className="relative mt-10 flex min-h-[430px] justify-center md:mt-16 md:min-h-[70vh]">
          <div
            ref={productRef}
            className="relative aspect-[3/4] w-full max-w-[19rem] will-change-transform sm:max-w-sm md:max-w-xl"
            style={{ zIndex: 5 }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_50px_150px_-40px_rgb(255_0_0/0.3)]">
              <Image
                src={characterImg1}
                alt="Boneco personalizado de personagem - estilo colecionável"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 40vw"
                priority
              />
            </div>

            <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <Image
                src={characterImg2}
                alt="Personagem personalizado em cena ambiente"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 text-center md:mt-16 md:grid-cols-4 md:gap-6">
          {processSteps.map((step, i) => (
            <div
              key={step}
              ref={(el) => { stepRefs.current[i] = el; }}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition-all duration-500 hover:border-pink/30 hover:bg-white/10 md:p-6"
            >
              <div className="font-sans font-semibold text-sm tracking-wider uppercase text-white/70 mb-2">
                ETAPA {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-editorial font-bold text-lg md:text-xl text-white leading-tight">
                {step}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
