/**
 * About — Sobre a marca (PRD §68–70)
 * Headline: TECNOLOGIA / com carinho. / IDEIAS GANHAM / forma aqui.
 * Texto curto institucional
 * Imagens: impressão, pintura, acabamento, detalhes do processo
 * Imagens parcialmente flutuantes
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

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const validImages = imageRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!validImages.length) return;

      gsap.fromTo(validImages,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      return () => ctx.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const processImages = [
    { src: '/assets/photo_2026-07-20_21-22-32.jpg', alt: 'Impressão 3D em andamento', style: { top: '10%', left: '5%', width: '35%' } },
    { src: '/assets/photo_2026-07-19_22-10-00.jpg', alt: 'Pintura artesanal de detalhes', style: { top: '50%', right: '5%', width: '30%' } },
    { src: '/assets/photo_2026-07-29_15-46-03.jpg', alt: 'Acabamento manual final', style: { bottom: '10%', left: '10%', width: '32%' } },
    { src: '/assets/photo_2026-07-29_15-47-11.jpg', alt: 'Peça pronta com detalhes', style: { bottom: '20%', right: '15%', width: '28%' } },
  ];

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="section relative overflow-hidden"
      aria-labelledby="sobre-title"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <FloatingDecoration type="butterfly" className="absolute top-20 right-10" size={48} speed={0.9} amplitude={15} delay={0.2} />
        <FloatingDecoration type="flower" className="absolute bottom-20 left-10" size={40} speed={0.8} amplitude={12} delay={0.5} />
        <FloatingDecoration type="heart" className="absolute top-1/3 left-1/2 -translate-x-1/2" size={36} speed={1} amplitude={10} delay={0.8} />
      </div>

      <div className="container-prose relative z-10">
        <SectionTitle
          id="sobre-title"
          headline="TECNOLOGIA"
          scriptLine="com carinho."
          description="Na Paula Personalizados 3D, transformamos ideias, pessoas, desenhos e momentos em peças únicas através da impressão 3D e do acabamento artesanal."
          align="left"
          size="section"
        />

        <div className="relative mt-20 hidden md:block" style={{ minHeight: '500px' }}>
          <div className="relative w-full h-[500px]">
{processImages.map((img, i) => (
                <div
                  key={img.alt}
                  ref={(el) => { imageRefs.current[i] = el; }}
                  className="absolute rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgb(23_23_23/0.15)] transition-transform duration-1000 ease-soft"
                style={{
                  ...img.style,
                  aspectRatio: '4/3',
                  maxWidth: '300px',
                  willChange: 'transform',
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 80vw, 30vw"
                />
              </div>
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center max-w-md px-6 pointer-events-auto">
              <p className="font-script-soft display-script text-pink mb-4">
                Feito à mão
              </p>
              <p className="text-mute text-lg leading-relaxed">
                Cada peça passa pelas mãos da Paula.
                Da modelagem ao último pincelada,
                o cuidado é o mesmo.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 md:hidden">
          <div className="grid grid-cols-2 gap-3">
            {processImages.map((image) => (
              <figure key={image.alt} className="relative aspect-square overflow-hidden rounded-2xl bg-pink-soft shadow-sm">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </figure>
            ))}
          </div>
          <div className="mx-auto mt-8 max-w-sm text-center">
            <p className="font-script-soft text-4xl text-pink">Feito à mão</p>
            <p className="mt-4 text-base leading-relaxed text-mute">
              Cada peça passa pelas mãos da Paula. Da modelagem à última pincelada, o cuidado é o mesmo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
