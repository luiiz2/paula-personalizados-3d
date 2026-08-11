import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CommercialImage } from '@/components/ui/CommercialImage';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { transformationStory } from '@/data/commercial';
import { hasLink, links } from '@/data/links';
import { shouldPinEditorialPanel } from '@/lib/motion';
import { prefersReducedMotion } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function TransformationStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        {
          desktop: '(min-width: 960px)',
          reducedMotion: '(prefers-reduced-motion: reduce)',
        },
        () => {
          if (
            !shouldPinEditorialPanel({
              width: window.innerWidth,
              reducedMotion: prefersReducedMotion(),
            })
          ) {
            return;
          }

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=110%',
              pin: '[data-transform-panel-stage]',
              pinSpacing: true,
              scrub: 0.8,
            },
          });

          timeline
            .fromTo(
              '[data-transform-source]',
              { scale: 0.92, rotate: -2 },
              { scale: 1, rotate: 0, ease: 'none' },
              0,
            )
            .fromTo(
              '[data-transform-process]',
              { opacity: 0.4, clipPath: 'inset(0 100% 0 0)' },
              { opacity: 1, clipPath: 'inset(0 0% 0 0)', ease: 'none' },
              0.15,
            )
            .fromTo(
              '[data-transform-result]',
              { scale: 0.88, rotate: 2 },
              { scale: 1, rotate: 0, ease: 'none' },
              0.25,
            );

          const scrollTrigger = timeline.scrollTrigger;

          return () => {
            scrollTrigger?.kill();
            timeline.kill();
          };
        },
      );

      return () => media.revert();
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
      <div className="transformation-story__panel" data-transform-panel-stage>
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
    </section>
  );
}
