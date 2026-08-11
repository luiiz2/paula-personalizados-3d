import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { CommercialImage } from '@/components/ui/CommercialImage';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { heroAssets } from '@/data/commercial';
import { hasLink, links } from '@/data/links';
import { usePointerParallax } from '@/hooks/usePointerParallax';
import { prefersReducedMotion } from '@/lib/utils';

export function CommercialHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = usePointerParallax<HTMLDivElement>();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timeline
        .from('[data-hero-line]', {
          y: 48,
          opacity: 0,
          duration: 0.95,
          stagger: 0.1,
        })
        .from(
          '[data-hero-support]',
          { y: 18, opacity: 0, duration: 0.65 },
          '-=0.5',
        )
        .from(
          '[data-hero-media]',
          { y: 28, opacity: 0, scale: 0.97, duration: 0.9, stagger: 0.12 },
          '-=0.6',
        );

      return () => timeline.kill();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="commercial-hero editorial-panel editorial-panel--cream"
      aria-labelledby="commercial-hero-title"
    >
      <div className="commercial-hero__copy">
        <p className="commercial-eyebrow" data-hero-support>
          Feito a partir da sua história
        </p>
        <h1
          id="commercial-hero-title"
          className="commercial-hero__title"
          aria-label="Memórias que ganham forma."
        >
          <span data-hero-line>Memórias</span>
          <span className="commercial-hero__accent" data-hero-line>
            que ganham
          </span>
          <span data-hero-line>forma.</span>
        </h1>
        <p className="commercial-hero__support" data-hero-support>
          <span>Fotos, desenhos e ideias viram peças únicas.</span>
          <span>Feitas à mão para guardar histórias.</span>
        </p>
        <div className="commercial-hero__actions" data-hero-support>
          {hasLink('whatsapp') && (
            <ExternalLink
              href={links.whatsapp}
              showIcon={false}
              className="commercial-button commercial-button--primary"
            >
              Quero criar <span aria-hidden="true">→</span>
            </ExternalLink>
          )}
          <a href="#categorias" className="commercial-button commercial-button--ghost">
            Ver categorias <span aria-hidden="true">↘</span>
          </a>
        </div>
      </div>

      <div
        ref={visualRef}
        className="commercial-hero__visual"
        aria-label="Exemplos de personalizados 3D"
      >
        {heroAssets.map((asset, index) => (
          <div
            key={asset.src}
            className={`commercial-hero__media-reveal commercial-hero__media-reveal--${index + 1}`}
            data-hero-media
          >
            <CommercialImage
              asset={asset}
              priority={index === 0}
              sizes="(max-width: 767px) 78vw, (max-width: 1199px) 42vw, 30vw"
              className={`commercial-hero__media commercial-hero__media--${index + 1}`}
              imageClassName="commercial-hero__photo"
            />
          </div>
        ))}
        <span className="commercial-hero__heart" aria-hidden="true">
          ♡
        </span>
        <span className="commercial-hero__spark" aria-hidden="true">
          ✦
        </span>
      </div>
    </section>
  );
}
