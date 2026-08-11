import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CommercialImage } from '@/components/ui/CommercialImage';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { transformationStory } from '@/data/commercial';
import { hasLink, links } from '@/data/links';
import { prefersReducedMotion } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function TransformationStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          end: 'bottom 35%',
          scrub: 0.8,
        },
      });

      timeline
        .from('[data-transform-source]', { xPercent: -16, opacity: 0.35, ease: 'none' }, 0)
        .from(
          '[data-transform-result]',
          { xPercent: 16, opacity: 0.35, scale: 0.9, ease: 'none' },
          0,
        )
        .from(
          '[data-transform-arrow]',
          { scaleX: 0, transformOrigin: 'left center', ease: 'none' },
          0.15,
        )
        .to('[data-transform-result]', { rotateY: -3, ease: 'none' }, 0.55);

      return () => timeline.kill();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="transformation-story commercial-section"
      aria-labelledby="transformation-title"
    >
      <div className="transformation-story__copy">
        <p className="commercial-eyebrow">01 · Da ideia à peça</p>
        <h2 id="transformation-title">
          Da sua foto <em>para o 3D.</em>
        </h2>
        <p>
          Você envia a referência. Nós transformamos os detalhes em uma lembrança criada
          especialmente para você.
        </p>
        {hasLink('whatsapp') && (
          <ExternalLink
            href={links.whatsapp}
            showIcon={false}
            className="commercial-button commercial-button--primary"
          >
            Criar meu personalizado <span aria-hidden="true">→</span>
          </ExternalLink>
        )}
      </div>
      <div className="transformation-story__visual">
        <div className="transformation-story__source" data-transform-source>
          <CommercialImage
            asset={transformationStory.source}
            sizes="(max-width: 767px) 88vw, 42vw"
            imageClassName="transformation-story__photo"
          />
        </div>
        <span className="transformation-story__arrow" data-transform-arrow aria-hidden="true">
          <span className="transformation-story__arrow-symbol">→</span>
        </span>
        <div className="transformation-story__result" data-transform-result>
          <CommercialImage
            asset={transformationStory.result}
            sizes="(max-width: 767px) 88vw, 42vw"
            imageClassName="transformation-story__photo"
          />
        </div>
        <ol className="transformation-story__steps" aria-label="Etapas da transformação">
          <li>Foto ou desenho</li>
          <li>Transformação</li>
          <li>Peça 3D</li>
        </ol>
      </div>
    </section>
  );
}
