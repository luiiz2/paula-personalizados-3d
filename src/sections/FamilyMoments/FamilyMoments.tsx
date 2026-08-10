/**
 * FamilyMoments — Momentos em família (PRD §52–54)
 * Pai e filho, família, momentos especiais, presentes afetivos
 * Headline: MOMENTOS / QUE FICAM.
 * Tags discretas: Dia dos Pais, Aniversários, Casamentos, Formaturas, Datas especiais
 * Direção visual: emocional, imagem ambientada, luz suave, bastante espaço, animações lentas
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

const occasions = [
  'Dia dos Pais',
  'Aniversários',
  'Casamentos',
  'Formaturas',
  'Datas especiais',
];

const familyPhoto = '/assets/photo_2026-07-23_13-19-49.jpg';
const ambientPhoto = '/assets/photo_2026-07-19_22-09-47.jpg';

export function FamilyMoments() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const main = mainRef.current;
      const ambient = ambientRef.current;
      if (!section || !main) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 0.5,
        },
      });

      tl.fromTo(main,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        0
      );

      if (ambient) {
        tl.fromTo(ambient,
          { y: 60, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
          0.2
        );
      }

      const validTags = tagRefs.current.filter(Boolean) as HTMLDivElement[];
      if (validTags.length) {
        tl.fromTo(validTags,
          { y: 20, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.4, ease: 'back.out(1.3)' },
          0.4
        );
      }

      return () => tl.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="familia"
      className="section relative overflow-hidden"
      aria-labelledby="familia-title"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <FloatingDecoration type="butterfly" className="absolute top-20 left-10" size={52} speed={0.7} amplitude={18} delay={0.3} />
        <FloatingDecoration type="flower" className="absolute bottom-20 right-10" size={44} speed={0.8} amplitude={14} delay={0.6} />
        <FloatingDecoration type="heart" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={80} speed={0.5} amplitude={6} delay={1} />
      </div>

      <div className="container-prose relative z-10">
        <SectionTitle
          id="familia-title"
          headline="MOMENTOS"
          headlineEnd="QUE FICAM."
          description="Transforme pessoas especiais em presentes únicos."
          align="center"
          size="section"
        />

        <div className="mt-10 flex flex-wrap justify-center gap-3" role="list" aria-label="Ocasiões especiais">
          {occasions.map((occasion, i) => (
            <div
              key={occasion}
              ref={(el) => { tagRefs.current[i] = el; }}
              className="px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-ink/5 text-sm font-sans font-medium text-ink/80 shadow-sm hover:border-pink/30 hover:text-pink transition-all duration-300"
              role="listitem"
            >
              {occasion}
            </div>
          ))}
        </div>

        <div className="mt-16 hidden items-start gap-12 lg:grid lg:grid-cols-2 lg:gap-16">
          <div
            ref={mainRef}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_40px_100px_-30px_rgb(23_23_23/0.15)]"
          >
            <Image
              src={familyPhoto}
              alt="Pai e filho - momento familiar eternizado em peça 3D personalizada"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div
            ref={ambientRef}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_60px_-20px_rgb(23_23_23/0.1)]"
          >
            <Image
              src={ambientPhoto}
              alt="Peça personalizada ambientada - presente afetivo em cena"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:hidden">
          <div className="rounded-2xl overflow-hidden shadow-[0_40px_100px_-30px_rgb(23_23_23/0.15)]">
            <Image
              src={familyPhoto}
              alt="Pai e filho - momento familiar"
              width={400}
              height={533}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_-20px_rgb(23_23_23/0.1)]">
            <Image
              src={ambientPhoto}
              alt="Peça personalizada ambientada"
              width={400}
              height={533}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
