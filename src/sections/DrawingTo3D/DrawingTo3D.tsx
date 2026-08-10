/**
 * DrawingTo3D — Do desenho para o 3D (PRD §43–46)
 * Scroll storytelling: desenho → linhas → volume → produto 3D
 * Simulado via opacity, scale, mask, overlays, stroke, clipping
 * CTA: Transformar um desenho em 3D → WhatsApp
 */
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Image } from '@/components/ui/Image';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { FloatingDecoration } from '@/components/motion/FloatingDecoration';
import { links, openExternal } from '@/data/links';
import { prefersReducedMotion } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function DrawingTo3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const drawingImg = '/assets/photo_2026-08-09_20-13-33.jpg';
  const productImg = '/assets/photo_2026-08-09_20-14-06.jpg';

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const drawing = drawingRef.current;
      const lines = linesRef.current;
      const volume = volumeRef.current;
      const product = productRef.current;
      const cta = ctaRef.current;
      if (!section || !drawing || !product) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'bottom 25%',
          scrub: 1,
        },
      });

      tl.to(drawing, {
        opacity: 0,
        scale: 0.7,
        filter: 'blur(4px)',
        ease: 'none',
      }, 0);

      if (lines) {
        tl.fromTo(lines,
          { opacity: 0, strokeDashoffset: 1000 },
          { opacity: 1, strokeDashoffset: 0, duration: 0.3, ease: 'power2.out' },
          0.1
        );
        tl.to(lines, { opacity: 0, ease: 'none' }, 0.5);
      }

      if (volume) {
        tl.fromTo(volume,
          { opacity: 0, scale: 0.5, filter: 'blur(8px)' },
          { opacity: 0.6, scale: 0.9, filter: 'blur(0px)', ease: 'none' },
          0.3
        );
        tl.to(volume, { opacity: 0, scale: 1.1, ease: 'none' }, 0.7);
      }

      tl.fromTo(product,
        { opacity: 0, scale: 0.8, y: 60 },
        { opacity: 1, scale: 1, y: 0, ease: 'none' },
        0.4
      );

      if (cta) {
        tl.fromTo(cta,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
          0.85
        );
      }

      return () => tl.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="desenho-3d"
      className="section relative overflow-hidden"
      aria-labelledby="desenho-3d-title"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <FloatingDecoration type="butterfly" className="absolute top-20 right-10" size={48} speed={0.9} amplitude={15} delay={0.3} />
        <FloatingDecoration type="flower" className="absolute bottom-20 left-10" size={40} speed={0.8} amplitude={12} delay={0.6} />
      </div>

      <div className="container-prose relative z-10">
        <SectionTitle
          id="desenho-3d-title"
          headline="DO DESENHO"
          scriptLine="para a vida"
          headlineEnd="EM 3D."
          description="Uma ideia pequena pode virar uma lembrança para sempre."
          align="left"
          size="section"
        />

        <div className="relative mt-16 hidden lg:block" style={{ height: '80vh', minHeight: '550px' }}>
          <div className="relative w-full h-full">
            <div
              ref={drawingRef}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 max-w-xl aspect-[3/4] origin-center will-change-transform"
              style={{ zIndex: 1, transformOrigin: 'center right' }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white border border-ink/10 shadow-lg">
                <Image
                  src={drawingImg}
                  alt="Desenho infantil original - base para transformação em 3D"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-ink/80 text-white px-3 py-1 rounded-lg text-xs font-sans font-medium">
                DESENHO ORIGINAL
              </div>
            </div>

            <div
              ref={linesRef}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 max-w-xl aspect-[3/4] origin-center pointer-events-none"
              style={{ zIndex: 2 }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 400 533" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                <g stroke="#e89ab6" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0">
                  <path d="M100 400 Q200 200 300 400 M100 400 Q200 300 300 400" strokeDasharray="2000" strokeDashoffset="2000" />
                  <path d="M200 100 Q200 250 200 400" strokeDasharray="1500" strokeDashoffset="1500" />
                  <path d="M100 200 Q200 200 300 200" strokeDasharray="1000" strokeDashoffset="1000" />
                  <circle cx="200" cy="200" r="80" strokeDasharray="2000" strokeDashoffset="2000" />
                </g>
              </svg>
            </div>

            <div
              ref={volumeRef}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 max-w-xl aspect-[3/4] origin-center pointer-events-none"
              style={{ zIndex: 3, transformOrigin: 'center left' }}
              aria-hidden="true"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink/30 via-pink/10 to-transparent opacity-60" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-pink)_0%,_transparent_70%)] opacity-40" />
              </div>
            </div>

            <div
              ref={productRef}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 max-w-xl aspect-[3/4] origin-center will-change-transform"
              style={{ zIndex: 4, transformOrigin: 'center left' }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgb(232_154_182/0.3)]">
                <Image
                  src={productImg}
                  alt="Produto 3D final - desenho transformado em peça única"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-pink text-ink px-3 py-1 rounded-lg text-xs font-sans font-medium">
                PRODUTO 3D
              </div>
            </div>
          </div>

          <div
            ref={ctaRef}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md text-center"
            style={{ zIndex: 10 }}
          >
            <AnimatedButton
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => openExternal(links.whatsapp)}
            >
              Transformar um desenho em 3D
            </AnimatedButton>
          </div>
        </div>

        <div className="mt-10 space-y-5 lg:hidden">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={drawingImg}
              alt="Desenho infantil original"
              width={400}
              height={533}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="text-center text-mute text-sm font-sans">↓ Transformação ↓</div>
          <div className="rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgb(232_154_182/0.3)]">
            <Image
              src={productImg}
              alt="Produto 3D final"
              width={400}
              height={533}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <AnimatedButton
            variant="primary"
            size="lg"
            className="w-full max-w-md mx-auto"
            onClick={() => openExternal(links.whatsapp)}
          >
            Transformar um desenho em 3D
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}
