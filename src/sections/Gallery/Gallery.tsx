/**
 * Gallery — Feito por nós (PRD §62–66)
 * Grid assimétrico: 2:3, 1:1, 4:3, 3:4
 * Hover: zoom interno, deslocamento sutil, overlay, label "VER ↗"
 * CTA: Veja mais trabalhos no Instagram
 */
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Image } from '@/components/ui/Image';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { FloatingDecoration } from '@/components/motion/FloatingDecoration';
import { gallery } from '@/data/gallery';
import { links } from '@/data/links';
import { prefersReducedMotion } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const displayedGallery = gallery.slice(0, 12);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const validItems = itemRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!validItems.length) return;

      gsap.fromTo(validItems,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      return () => ctx.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="galeria"
      className="section relative overflow-hidden"
      aria-labelledby="galeria-title"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <FloatingDecoration type="butterfly" className="absolute top-20 left-10" size={52} speed={0.8} amplitude={18} delay={0.2} />
        <FloatingDecoration type="flower" className="absolute bottom-20 right-10" size={44} speed={0.7} amplitude={14} delay={0.5} />
        <FloatingDecoration type="curve" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={120} speed={0.5} amplitude={8} delay={1} />
      </div>

      <div className="container-prose relative z-10">
        <SectionTitle
          id="galeria-title"
          headline="FEITO"
          headlineEnd="POR NÓS."
          align="center"
          size="section"
        />

        <div className="mt-12 columns-2 gap-3 md:mt-16 md:columns-3 md:gap-5 lg:columns-4" role="list" aria-label="Galeria de trabalhos">
          {displayedGallery.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => { itemRefs.current[i] = el; }}
              role="listitem"
              className="relative mb-3 w-full break-inside-avoid md:mb-5"
              style={{ aspectRatio: item.aspect }}
            >
              <a
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver ${item.alt} no Instagram`}
                className="group relative block h-full w-full overflow-hidden rounded-2xl bg-ink/5"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition-all duration-700 ease-soft group-hover:scale-105 group-hover:translate-y-[-2px]"
                  sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-soft" aria-hidden="true" />

                <div className="absolute bottom-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-soft pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-ink font-sans font-semibold text-sm shadow-lg">
                    VER
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </span>
                </div>

                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-sans font-medium text-ink/80 border border-ink/10">
                  {item.category}
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <ExternalLink
            href={links.instagram}
            className="inline-flex items-center gap-2 font-sans font-semibold text-lg text-ink hover:text-pink transition-colors link-underline"
          >
            Veja mais trabalhos no Instagram
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}
