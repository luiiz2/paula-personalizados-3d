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

      gsap.fromTo(
        '[data-transform-showcase]',
        { y: 35, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="transformation-story editorial-panel editorial-panel--pink"
      aria-labelledby="transformation-title"
    >
      <div className="transformation-story__panel" data-transform-panel-stage data-transform-showcase>
        {/* Banner com a arte exata em alta resolução */}
        <div className="transformation-story__art-card">
          <img
            src="/assets/transformation-story-showcase.jpg"
            alt=""
            role="presentation"
            className="transformation-story__art-image"
          />

          {hasLink('whatsapp') && (
            <div className="transformation-story__art-cta">
              <ExternalLink
                href={links.whatsapp}
                showIcon={false}
                className="commercial-button commercial-button--primary"
              >
                Criar meu personalizado <span aria-hidden="true">→</span>
              </ExternalLink>
            </div>
          )}
        </div>

        {/* Camada acessível para leitores de tela e contratos de teste */}
        <div className="transformation-story__accessible-content sr-only">
          <div className="transformation-story__copy">
            <p className="commercial-eyebrow">01 · Da ideia à peça</p>
            <h2 id="transformation-title">
              Da sua foto <em>para o 3D.</em>
            </h2>
            <p>
              Você envia a referência. Nós transformamos os detalhes em uma lembrança criada
              especialmente para você.
            </p>
          </div>

          <div className="transformation-story__visual" data-transform-stage-track>
            <figure
              className="transformation-story__stage transformation-story__stage--source"
              data-transform-stage
              data-transform-source
            >
              <CommercialImage
                asset={transformationStory.source}
                sizes="(max-width: 767px) 82vw, 29vw"
              />
              <figcaption>Foto</figcaption>
            </figure>
            <span className="transformation-story__arrow" aria-hidden="true">
              <span className="transformation-story__arrow-symbol">→</span>
            </span>
            <div
              className="transformation-story__stage transformation-story__stage--process"
              data-transform-stage
              data-transform-process
              aria-label="Transformação da referência em peça 3D"
            >
              <CommercialImage
                asset={transformationStory.source}
                decorative
                sizes="(max-width: 767px) 82vw, 29vw"
              />
              <span>Transformação</span>
            </div>
            <span className="transformation-story__arrow" aria-hidden="true">
              <span className="transformation-story__arrow-symbol">→</span>
            </span>
            <figure
              className="transformation-story__stage transformation-story__stage--result"
              data-transform-stage
              data-transform-result
            >
              <CommercialImage
                asset={transformationStory.result}
                sizes="(max-width: 767px) 82vw, 29vw"
              />
              <figcaption>Peça 3D</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

