/**
 * YouIn3D — Scroll storytelling foto → boneca (PRD §33–37)
 * Desktop: [FOTO REAL] [PERSONALIZADO 3D] lado a lado
 * Scroll: foto diminui/perde destaque, boneca cresce/assume centro
 * Indicador visual "VOCÊ → 3D"
 * 4 benefícios
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

interface Benefit {
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  { title: 'Feito a partir da sua foto', description: '' },
  { title: '100% personalizado', description: '' },
  { title: 'Impressão 3D', description: '' },
  { title: 'Acabamento artesanal', description: '' },
];

export function YouIn3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const dollRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const benefitRefs = useRef<(HTMLDivElement | null)[]>([]);

  const realPhoto = '/assets/photo_2026-08-09_20-13-42.jpg';
  const dollPhoto = '/assets/photo_2026-08-09_20-13-26.jpg';

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const photo = photoRef.current;
      const doll = dollRef.current;
      const indicator = indicatorRef.current;
      const section = sectionRef.current;
      if (!photo || !doll || !section) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1,
        },
      });

      tl.to(photo, {
        scale: 0.65,
        x: -80,
        opacity: 0.4,
        filter: 'grayscale(0.6)',
        ease: 'none',
      }, 0);

      tl.fromTo(doll,
        { scale: 0.7, x: 100, opacity: 0 },
        { scale: 1.1, x: 0, opacity: 1, ease: 'none' },
        0
      );

      if (indicator) {
        tl.fromTo(indicator,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, transformOrigin: 'left center', ease: 'none' },
          0.2
        );
      }

      const validBenefits = benefitRefs.current.filter(Boolean) as HTMLDivElement[];
      if (validBenefits.length) {
        tl.fromTo(validBenefits,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 0.5, ease: 'power2.out' },
          0.6
        );
      }

      return () => tl.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="voce-em-3d"
      className="section relative overflow-hidden"
      aria-labelledby="voce-em-3d-title"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-soft/20 to-transparent" aria-hidden="true" />

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <FloatingDecoration type="butterfly" className="absolute top-1/4 left-5 -translate-y-1/2" size={48} speed={0.9} amplitude={15} color="#e89ab6" delay={0.2} />
        <FloatingDecoration type="curve" className="absolute bottom-10 right-5" size={60} speed={0.7} amplitude={8} color="#e89ab6" delay={0.5} />
      </div>

      <div className="container-prose relative z-10">
        <SectionTitle
          id="voce-em-3d-title"
          headline="VOCÊ VIRARIA"
          headlineEnd="UM BONECO 3D?"
          description="Transformamos sua foto em uma peça criada especialmente para você."
          align="left"
          size="section"
        />

        <div className="relative mt-16 hidden md:block" style={{ height: '70vh', minHeight: '500px' }}>
          <div
            ref={photoRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 max-w-lg lg:max-w-xl aspect-[3/4] origin-center will-change-transform"
            style={{ zIndex: 1, transformOrigin: 'center right' }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgb(23_23_23/0.25)]">
              <Image
                src={realPhoto}
                alt="Pessoa real - foto original para personalização"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cream/60 pointer-events-none" aria-hidden="true" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-ink text-white px-4 py-2 rounded-xl text-sm font-sans font-medium whitespace-nowrap shadow-lg">
              VOCÊ
            </div>
          </div>

          <div
            ref={dollRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 max-w-lg lg:max-w-xl aspect-[3/4] origin-center will-change-transform"
            style={{ zIndex: 2, transformOrigin: 'center left' }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgb(232_154_182/0.3)]">
              <Image
                src={dollPhoto}
                alt="Boneca personalizada 3D - resultado da transformação"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-pink text-ink px-4 py-2 rounded-xl text-sm font-sans font-medium whitespace-nowrap shadow-lg">
              3D
            </div>
          </div>

          <div
            ref={indicatorRef}
            className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-24 h-1 flex items-center justify-center pointer-events-none"
            style={{ transformOrigin: 'center center' }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 96 4" fill="none" className="w-24 h-1">
              <path
                d="M0 2 L88 2"
                stroke="#e89ab6"
                strokeWidth="2"
                strokeDasharray="8 6"
                strokeLinecap="round"
              />
              <polygon points="88,2 78,-4 78,8" fill="#e89ab6" />
            </svg>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:hidden">
          <figure className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white shadow-lg">
            <Image
              src={realPhoto}
              alt="Pessoa real - foto original para personalização"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
              VOCÊ
            </figcaption>
          </figure>
          <div className="flex items-center justify-center gap-3 py-1 text-sm font-bold tracking-[0.18em] text-pink" aria-hidden="true">
            VOCÊ <span className="h-px w-12 bg-pink" /> 3D
          </div>
          <figure className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white shadow-lg">
            <Image
              src={dollPhoto}
              alt="Boneca personalizada 3D - resultado da transformação"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <figcaption className="absolute bottom-3 left-3 rounded-full bg-pink px-3 py-1 text-xs font-semibold text-ink">
              PERSONALIZADO 3D
            </figcaption>
          </figure>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-4 md:gap-6">
          {benefits.map((benefit, i) => (
            <div
              key={benefit.title}
              ref={(el) => { benefitRefs.current[i] = el; }}
              className="rounded-2xl border border-ink/5 bg-white p-4 text-center transition-colors hover:border-pink/30 md:p-6"
            >
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-pink-soft text-pink md:mb-4 md:h-16 md:w-16 md:rounded-2xl">
                <svg className="h-6 w-6 md:h-8 md:w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h4 className="font-sans font-semibold text-ink">{benefit.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
