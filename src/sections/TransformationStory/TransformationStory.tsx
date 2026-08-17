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
  const leftCopyRef = useRef<HTMLDivElement>(null);
  const visualTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // 1. Eyebrow entrance
      tl.fromTo(
        '[data-transform-eyebrow]',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      );

      // 2. Text Masking Reveal: Title & description lines slide up through mask
      tl.fromTo(
        '[data-text-mask-line]',
        { yPercent: 110, rotateZ: 1.2, opacity: 0 },
        {
          yPercent: 0,
          rotateZ: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '-=0.3',
      );

      // 3. Heart divider mask animation
      tl.fromTo(
        '[data-heart-line]',
        { scaleX: 0, transformOrigin: 'center center' },
        { scaleX: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.7',
      );
      tl.fromTo(
        '[data-heart-symbol]',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.8)' },
        '-=0.6',
      );

      // 4. CTA button entrance
      tl.fromTo(
        '[data-transform-cta]',
        { y: 20, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)' },
        '-=0.4',
      );

      // 5. Stage 1 entrance
      tl.fromTo(
        '[data-transform-stage="1"]',
        { y: 32, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power2.out',
        },
        '-=0.5',
      );

      // 6. Arrow 1 entrance
      tl.fromTo(
        '[data-transform-arrow="1"]',
        { opacity: 0, scaleX: 0.8 },
        { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.3',
      );

      // 7. Stage 2 (Holographic transformation) entrance
      tl.fromTo(
        '[data-transform-stage="2"]',
        { y: 32, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power2.out',
        },
        '-=0.3',
      );

      // 8. Arrow 2 entrance
      tl.fromTo(
        '[data-transform-arrow="2"]',
        { opacity: 0, scaleX: 0.8 },
        { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.3',
      );

      // 9. Stage 3 (Finished 3D Piece) entrance
      tl.fromTo(
        '[data-transform-stage="3"]',
        { y: 32, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power2.out',
        },
        '-=0.3',
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="transformation-story"
      aria-labelledby="transformation-title"
    >
      <div className="transformation-story__container">
        <div className="transformation-story__panel" data-transform-showcase>
          {/* Subtle Ambient Decorative Glow */}
          <div className="transformation-story__ambient-glow" aria-hidden="true" />

          {/* LEFT SIDE — Copy / CTA */}
          <div ref={leftCopyRef} className="transformation-story__copy">
            <p className="commercial-eyebrow" data-transform-eyebrow>
              <span className="transformation-story__sparkle" aria-hidden="true">✦</span> 01 · DA IDEIA À PEÇA
            </p>

            <h2
              id="transformation-title"
              aria-label="DA SUA FOTO para o 3D."
              data-transform-title
            >
              <span className="text-mask-wrapper">
                <span className="text-mask-inner" data-text-mask-line>
                  DA SUA FOTO
                </span>
              </span>{' '}
              <span className="text-mask-wrapper">
                <em className="transformation-story__title-italic text-mask-inner" data-text-mask-line>
                  para o 3D.
                </em>
              </span>
            </h2>

            <div className="transformation-story__heart-divider" data-transform-heart aria-hidden="true">
              <span className="heart-line" data-heart-line />
              <span className="heart-symbol" data-heart-symbol>♡</span>
              <span className="heart-line" data-heart-line />
            </div>

            <p className="transformation-story__description" data-transform-desc>
              <span className="text-mask-wrapper">
                <span className="text-mask-inner" data-text-mask-line>
                  Você envia a referência. Nós transformamos
                </span>
              </span>
              <span className="text-mask-wrapper">
                <span className="text-mask-inner" data-text-mask-line>
                  os detalhes em uma lembrança criada
                </span>
              </span>
              <span className="text-mask-wrapper">
                <span className="text-mask-inner" data-text-mask-line>
                  <strong className="font-semibold text-[#a83d5f]">especialmente para você.</strong>
                </span>
              </span>
            </p>

            <p className="transformation-story__handwritten" data-transform-handwritten>
              <span className="text-mask-wrapper">
                <span className="text-mask-inner" data-text-mask-line>
                  Sua história, eternizada.
                </span>
              </span>
            </p>

            {hasLink('whatsapp') && (
              <div className="transformation-story__cta" data-transform-cta>
                <ExternalLink
                  href={links.whatsapp}
                  showIcon={false}
                  className="transformation-cta-btn"
                >
                  <span>Criar meu personalizado</span>
                  <span className="cta-arrow" aria-hidden="true">→</span>
                </ExternalLink>
              </div>
            )}
          </div>

          {/* RIGHT SIDE — Three-Step Transformation Flow */}
          <div ref={visualTrackRef} className="transformation-story__flow" data-transform-stage-track>
            {/* STEP 1: SUA FOTO */}
            <div
              className="transformation-step transformation-step--photo"
              data-transform-stage="1"
              data-transform-stage-root
            >
              <div className="transformation-step__media-stage">
                <div className="transformation-step__photo-frame">
                  <CommercialImage
                    asset={transformationStory.source}
                    sizes="(max-width: 767px) 78vw, 22vw"
                    className="transformation-step__photo-img"
                  />
                  <div className="transformation-step__frame-shine" aria-hidden="true" />
                </div>
                <div className="transformation-step__sparkle-accents" aria-hidden="true">
                  <span className="sparkle sparkle--1">✦</span>
                  <span className="sparkle sparkle--2">✨</span>
                </div>
              </div>

              <div className="transformation-step__info">
                <div className="transformation-step__badge">1</div>
                <h3 className="transformation-step__label">SUA FOTO</h3>
                <p className="transformation-step__desc">
                  Você nos envia a foto de referência.
                </p>
              </div>
            </div>

            {/* CONNECTING ARROW 1 -> 2 */}
            <div className="transformation-flow-arrow" data-transform-arrow="1" aria-hidden="true">
              <svg viewBox="0 0 70 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="flow-arrow-svg">
                <path
                  d="M 5 20 Q 35 4, 62 16"
                  stroke="url(#arrowGradPinkGold)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeDasharray="4 2.5"
                />
                <path
                  d="M 55 9 L 64 16 L 56 23"
                  stroke="url(#arrowGradPinkGold)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="arrowGradPinkGold" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e898ab" />
                    <stop offset="100%" stopColor="#d9658b" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* STEP 2: TRANSFORMAÇÃO */}
            <div
              className="transformation-step transformation-step--holo"
              data-transform-stage="2"
              data-transform-stage-root
            >
              <div className="transformation-step__media-stage">
                <div className="transformation-step__holo-stage">
                  {/* Holographic Wireframe Aura & Silhouette */}
                  <div className="holo-backdrop-aura" aria-hidden="true" />
                  <div className="holo-grid-lines" aria-hidden="true" />
                  <div className="holo-scan-beam" aria-hidden="true" />

                  {/* Figure with holographic filter */}
                  <div className="holo-figure-wrap">
                    <CommercialImage
                      asset={transformationStory.process}
                      decorative
                      sizes="(max-width: 767px) 78vw, 22vw"
                      className="holo-figure-img"
                    />
                  </div>

                  {/* Concentric Holographic Base Rings */}
                  <div className="holo-base-rings" aria-hidden="true">
                    <div className="holo-ring holo-ring--outer" />
                    <div className="holo-ring holo-ring--middle" />
                    <div className="holo-ring holo-ring--inner" />
                  </div>
                </div>
              </div>

              <div className="transformation-step__info">
                <div className="transformation-step__badge">2</div>
                <h3 className="transformation-step__label">TRANSFORMAÇÃO</h3>
                <p className="transformation-step__desc">
                  Nossos artistas capturam cada detalhe e transformam em um modelo 3D único.
                </p>
              </div>
            </div>

            {/* CONNECTING ARROW 2 -> 3 */}
            <div className="transformation-flow-arrow" data-transform-arrow="2" aria-hidden="true">
              <svg viewBox="0 0 70 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="flow-arrow-svg">
                <path
                  d="M 5 20 Q 35 4, 62 16"
                  stroke="url(#arrowGradPinkGold2)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeDasharray="4 2.5"
                />
                <path
                  d="M 55 9 L 64 16 L 56 23"
                  stroke="url(#arrowGradPinkGold2)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="arrowGradPinkGold2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e898ab" />
                    <stop offset="100%" stopColor="#d9658b" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* STEP 3: SUA PEÇA 3D */}
            <div
              className="transformation-step transformation-step--result"
              data-transform-stage="3"
              data-transform-stage-root
            >
              <div className="transformation-step__media-stage">
                <div className="transformation-step__result-stage">
                  <div className="result-backdrop-glow" aria-hidden="true" />
                  <CommercialImage
                    asset={transformationStory.result}
                    sizes="(max-width: 767px) 78vw, 22vw"
                    className="transformation-step__result-img"
                  />
                  <div className="result-pedestal-plaque" aria-hidden="true">
                    <span>Feita para você ♡</span>
                  </div>
                </div>
              </div>

              <div className="transformation-step__info">
                <div className="transformation-step__badge">3</div>
                <h3 className="transformation-step__label">SUA PEÇA 3D</h3>
                <p className="transformation-step__desc">
                  Uma lembrança exclusiva, feita com carinho para durar para sempre.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
