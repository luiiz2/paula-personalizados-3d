/**
 * Hero — Seção mais impactante (PRD §21–29, 32)
 * min-height: 100svh
 * Headline: TRANSFORMAMOS / sua história / EM 3D.
 * Produto principal grande, sobreposto, depth
 * Entrada sequencial 1.2–1.8s
 * Floating + cursor reaction (desktop)
 * Decorative elements: borboleta, flor, coração, estrelas
 */
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { Image } from '@/components/ui/Image';
import { FloatingDecoration } from '@/components/motion/FloatingDecoration';
import { SilkBackground } from '@/components/motion/SilkBackground';
import { links, hasLink, openExternal } from '@/data/links';
import { prefersReducedMotion } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLSpanElement>(null);
  const scriptRef = useRef<HTMLSpanElement>(null);
  const endRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const decoRefs = useRef<(HTMLDivElement | null)[]>([]);

  const heroImage = '/assets/photo_2026-08-09_20-13-26.jpg';

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.9, delay: 0.15 }
      );

      tl.fromTo(
        scriptRef.current,
        { y: 40, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8 },
        '-=0.5'
      );

      tl.fromTo(
        productRef.current,
        { scale: 1.1, y: 40, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 1.1, ease: 'power2.out' },
        '-=0.6'
      );

      tl.fromTo(
        endRef.current,
        { y: 60, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.8 },
        '-=0.5'
      );

      tl.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.4'
      );

      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
        '-=0.3'
      );

      const validDecos = decoRefs.current.filter(Boolean) as HTMLDivElement[];
      if (validDecos.length) {
        tl.fromTo(
          validDecos,
          { scale: 0, rotation: -90, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.5)' },
          '-=0.5'
        );
      }

      return () => tl.kill();
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const product = productRef.current;
      if (!product) return;

      gsap.to(product, {
        y: -60,
        scale: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const headlineParts = ['TRANSFORMAMOS'];
  const scriptPart = 'sua história';
  const endPart = 'EM 3D.';

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pb-16 pt-24 lg:py-0"
      aria-labelledby="hero-title"
    >
      <SilkBackground />
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,1,10,0.28),rgba(2,1,10,0.04)_55%,rgba(2,1,10,0.18))]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-cream"
        aria-hidden="true"
      />

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div ref={(el) => { decoRefs.current[0] = el; }} className="absolute left-10 top-1/4 hidden -translate-y-1/2 sm:block" style={{ zIndex: 1 }}>
          <FloatingDecoration type="butterfly" size={56} speed={1} amplitude={18} parallax={0.15} color="#e89ab6" delay={0.5} />
        </div>
        <div ref={(el) => { decoRefs.current[1] = el; }} className="absolute top-20 right-10" style={{ zIndex: 1 }}>
          <FloatingDecoration type="flower" size={48} speed={0.7} amplitude={14} parallax={0.1} color="#e89ab6" delay={0.8} />
        </div>
        <div ref={(el) => { decoRefs.current[2] = el; }} className="absolute bottom-1/4 left-20 hidden translate-y-1/2 sm:block" style={{ zIndex: 1 }}>
          <FloatingDecoration type="heart" size={32} speed={1.2} amplitude={10} parallax={0.08} color="#e89ab6" delay={1.1} />
        </div>
        <div ref={(el) => { decoRefs.current[3] = el; }} className="absolute right-20 top-1/2 hidden -translate-y-1/2 sm:block" style={{ zIndex: 1 }}>
          <FloatingDecoration type="star" size={24} speed={0.9} amplitude={16} parallax={0.2} color="#e89ab6" delay={1.3} />
        </div>
        <div ref={(el) => { decoRefs.current[4] = el; }} className="absolute bottom-20 right-1/4 translate-y-1/2" style={{ zIndex: 1 }}>
          <FloatingDecoration type="curve" size={80} speed={0.6} amplitude={8} parallax={0.05} color="#e89ab6" delay={1.5} />
        </div>
      </div>

      <div className="container-prose relative z-10 grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-start lg:items-start text-left">
          <p className="eyebrow mb-5 text-white/80">Paula Personalizados 3D</p>
          <h1 id="hero-title" className="m-0">
            <span ref={headlineRef} className="hero-display block text-white">
              {headlineParts.map((part) => (
                <span key={part} className="block">{part}</span>
              ))}
            </span>

            <span ref={scriptRef} className="font-script display-script my-2 block leading-none text-pink-soft">
              {scriptPart}
            </span>

            <span ref={endRef} className="hero-display block text-white">
              {endPart}
            </span>
          </h1>

          <p ref={descRef} className="mt-4 max-w-xl text-base leading-relaxed text-white/70 md:mt-6 md:text-xl">
            Fotos, desenhos e ideias transformados em peças únicas.
          </p>

          <div ref={ctaRef} className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row md:mt-10 md:gap-4">
            <AnimatedButton
              size="lg"
              variant="primary"
              className="bg-[#F4E96B] text-ink hover:bg-[#fff58a]"
              onClick={() => document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Conheça nossos personalizados
            </AnimatedButton>
            {hasLink('whatsapp') && (
              <AnimatedButton
                size="lg"
                variant="outline"
                external
                className="border-white text-white hover:border-white hover:bg-white hover:text-ink"
                onClick={() => openExternal(links.whatsapp)}
              >
                Fale com a gente
              </AnimatedButton>
            )}
          </div>
        </div>

        <div
          ref={productRef}
          className="relative mx-auto w-full max-w-[14rem] sm:max-w-sm lg:order-first lg:max-w-xl"
          style={{ zIndex: 10 }}
        >
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-ink/5 rounded-full blur-2xl opacity-60 transition-opacity duration-500"
            aria-hidden="true"
            style={{ filter: 'blur(40px)' }}
          />

          <div className="relative mx-auto aspect-[3/4] w-full lg:mx-0">
            <Image
              src={heroImage}
              alt="Boneca personalizada Paula 3D - exemplo de transformação de foto em peça única"
              fill
              priority
              className="rounded-2xl object-cover shadow-[0_30px_80px_-20px_rgb(23_23_23/0.25)]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      >
        <svg className="h-6 w-6 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
