import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { FloatingDecoration } from '@/components/motion/FloatingDecoration';
import { Image } from '@/components/ui/Image';
import { prefersReducedMotion } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Sua ideia',
    description: 'Foto, desenho ou conceito: o ponto de partida.',
    image: '/assets/photo_2026-08-09_20-13-33.jpg',
  },
  {
    number: '02',
    title: 'Modelagem',
    description: 'Escultura digital 3D feita sob medida.',
    image: '/assets/photo_2026-08-09_20-13-44.jpg',
  },
  {
    number: '03',
    title: 'Impressão 3D',
    description: 'Camada por camada, a peça ganha volume.',
    image: '/assets/photo_2026-07-20_21-22-32.jpg',
  },
  {
    number: '04',
    title: 'Acabamento',
    description: 'Lixamento, pintura e detalhes à mão.',
    image: '/assets/photo_2026-07-19_22-10-00.jpg',
  },
  {
    number: '05',
    title: 'Seu personalizado',
    description: 'Único, exclusivo, pronto para emocionar.',
    image: '/assets/photo_2026-08-09_20-13-26.jpg',
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      stepRefs.current.filter(Boolean).forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="processo"
      className="section relative overflow-hidden"
      aria-labelledby="processo-title"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <FloatingDecoration type="butterfly" className="absolute left-6 top-20" size={42} speed={0.7} amplitude={10} />
      </div>

      <div className="container-prose relative z-10">
        <SectionTitle
          id="processo-title"
          headline="DA IDEIA"
          headlineEnd="PARA O MUNDO REAL."
          align="center"
          size="section"
        />

        <div className="relative mt-12 md:mt-20">
          <div
            className="absolute bottom-0 left-7 top-0 w-px bg-pink/45 md:bottom-auto md:left-[10%] md:right-[10%] md:top-7 md:h-px md:w-auto"
            aria-hidden="true"
          />

          <div className="grid gap-7 md:grid-cols-5 md:gap-4">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(element) => { stepRefs.current[index] = element; }}
                className="relative flex items-start gap-4 md:block"
              >
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[3px] border-pink bg-cream font-editorial text-lg font-black text-pink md:mx-auto">
                  {step.number}
                </div>

                <article className="min-w-0 flex-1 rounded-2xl border border-ink/5 bg-white p-4 shadow-sm transition-colors hover:border-pink/30 md:mt-6">
                  <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-pink-soft">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 767px) 70vw, 18vw"
                    />
                  </div>
                  <h3 className="font-editorial text-lg font-bold leading-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mute">
                    {step.description}
                  </p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
