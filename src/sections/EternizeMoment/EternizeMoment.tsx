/**
 * EternizeMoment — Eternize um momento (PRD §47–51)
 * Referência: pessoa de vestido vermelho transformada em boneca
 * Desktop: [FOTO REAL] [BONECA] composição editorial assimétrica
 * Scroll: REAL → PERSONALIZADO (foto diminui, boneca cresce)
 * Callouts: Cabelo, Roupa, Acessórios, Pose
 * Mensagem: "Cada detalhe conta sua história"
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

interface DetailCallout {
  id: string;
  label: string;
  position: { top?: string; left?: string; right?: string; bottom?: string };
  side: 'left' | 'right';
}

const callouts: DetailCallout[] = [
  { id: 'cabelo', label: 'Cabelo', position: { top: '15%', right: '5%' }, side: 'right' },
  { id: 'roupa', label: 'Roupa', position: { top: '45%', right: '5%' }, side: 'right' },
  { id: 'acessorios', label: 'Acessórios', position: { top: '70%', right: '5%' }, side: 'right' },
  { id: 'pose', label: 'Pose', position: { bottom: '15%', left: '5%' }, side: 'left' },
];

const realPhoto = '/assets/photo_2026-08-09_20-13-42.jpg';
const dollPhoto = '/assets/photo_2026-08-09_20-13-26.jpg';

export function EternizeMoment() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const dollRef = useRef<HTMLDivElement>(null);
  const calloutRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const photo = photoRef.current;
      const doll = dollRef.current;
      if (!section || !photo || !doll) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1,
        },
      });

      tl.to(photo, {
        scale: 0.55,
        x: -100,
        opacity: 0.3,
        filter: 'grayscale(0.5) brightness(0.8)',
        ease: 'none',
      }, 0);

      tl.fromTo(doll,
        { scale: 0.7, x: 80, opacity: 0 },
        { scale: 1.15, x: 0, opacity: 1, ease: 'none' },
        0
      );

      const validCallouts = calloutRefs.current.filter(Boolean) as HTMLDivElement[];
      if (validCallouts.length) {
        tl.fromTo(validCallouts,
          { scale: 0.8, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, stagger: 0.2, duration: 0.4, ease: 'back.out(1.5)' },
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
      id="eternize"
      className="section relative overflow-hidden"
      aria-labelledby="eternize-title"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <FloatingDecoration type="butterfly" className="absolute top-1/3 left-5" size={48} speed={0.9} amplitude={15} delay={0.2} />
        <FloatingDecoration type="heart" className="absolute bottom-1/3 right-5" size={36} speed={1.1} amplitude={10} delay={0.5} />
        <FloatingDecoration type="curve" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={100} speed={0.6} amplitude={8} delay={0.8} />
      </div>

      <div className="container-prose relative z-10">
        <SectionTitle
          id="eternize-title"
          headline="ETERNIZE"
          scriptLine="um momento."
          align="left"
          size="section"
        />

        <div className="relative mt-16 hidden md:block" style={{ height: '75vh', minHeight: '550px' }}>
          <div
            ref={photoRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 max-w-xl aspect-[3/4] origin-center will-change-transform"
            style={{ zIndex: 1, transformOrigin: 'center right' }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgb(23_23_23/0.2)]">
              <Image
                src={realPhoto}
                alt="Pessoa real em momento especial - foto original"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>

          <div
            ref={dollRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 max-w-xl aspect-[3/4] origin-center will-change-transform"
            style={{ zIndex: 2, transformOrigin: 'center left' }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgb(232_154_182/0.35)]">
              <Image
                src={dollPhoto}
                alt="Boneca personalizada 3D - eternizando o momento"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
                priority
              />
            </div>

            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
              {callouts.map((callout, i) => (
                <div
                  key={callout.id}
                  ref={(el) => { calloutRefs.current[i] = el; }}
                  className="absolute pointer-events-auto"
                  style={{
                    ...callout.position,
                    transform: callout.side === 'left' ? 'translateX(-100%)' : 'translateX(100%)',
                    transformOrigin: callout.side === 'left' ? 'center right' : 'center left',
                  }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/95 backdrop-blur border border-ink/10 shadow-lg text-sm font-sans font-medium text-ink transition-all duration-300 ease-soft opacity-0 group-hover:opacity-100 hover:scale-105 hover:-translate-x-2"
                    style={{
                      transform: callout.side === 'left' ? 'translateX(-100%)' : 'translateX(0)',
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-pink" aria-hidden="true" />
                    {callout.label}
                  </div>
                  <div
                    className="absolute w-6 h-0.5 bg-pink/50"
                    style={{
                      left: callout.side === 'left' ? '100%' : 'auto',
                      right: callout.side === 'right' ? '100%' : 'auto',
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:hidden">
          <figure className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-lg">
            <Image
              src={realPhoto}
              alt="Pessoa real em momento especial - foto original"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink px-3 py-1 text-[0.65rem] font-semibold text-white">
              REAL
            </figcaption>
          </figure>
          <figure className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-lg">
            <Image
              src={dollPhoto}
              alt="Boneca personalizada 3D - eternizando o momento"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <figcaption className="absolute bottom-3 left-3 rounded-full bg-pink px-3 py-1 text-[0.65rem] font-semibold text-ink">
              PERSONALIZADO
            </figcaption>
          </figure>
          <div className="col-span-2 flex flex-wrap justify-center gap-2 pt-2">
            {callouts.map((callout) => (
              <span key={callout.id} className="rounded-full border border-pink/30 bg-white px-3 py-1 text-xs font-semibold text-ink/70">
                {callout.label}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center md:mt-20">
          <p className="font-script-soft display-script text-pink max-w-xl mx-auto">
            Cada detalhe conta sua história.
          </p>
        </div>
      </div>
    </section>
  );
}
