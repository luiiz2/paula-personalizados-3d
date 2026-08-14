import { lazy, Suspense, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CommercialImage } from '@/components/ui/CommercialImage';
import { artisanShowcaseAssets, trustMessages } from '@/data/commercial';
import { shouldPinEditorialPanel } from '@/lib/motion';
import { prefersReducedMotion } from '@/lib/utils';

const LiquidEtherLazy = lazy(() =>
  import('@/components/ui/LiquidEther').then((module) => ({
    default: module.LiquidEther,
  })),
);

gsap.registerPlugin(ScrollTrigger);

export function ArtisanShowcase() {
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
              end: '+=25%',
              pin: '[data-artisan-stage]',
              pinSpacing: true,
              scrub: 0.3,
            },
          });

          timeline
            .fromTo(
              '[data-artisan-product]:first-child',
              { rotateY: -20, y: 20, scale: 0.96 },
              { rotateY: 0, y: 0, scale: 1, ease: 'none' },
              0,
            )
            .fromTo(
              '[data-artisan-product]:last-child',
              { rotateY: 20, y: 20, scale: 0.96 },
              { rotateY: 0, y: 0, scale: 1, ease: 'none' },
              0,
            )
            .from(
              '[data-artisan-proof]',
              { y: 18, opacity: 0, stagger: 0.08, ease: 'power2.out' },
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
      id="feito-a-mao"
      className="artisan-showcase editorial-panel editorial-panel--ink relative overflow-hidden"
      aria-labelledby="artisan-title"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <Suspense
          fallback={
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, #b100f6, #ff00b2, #f900e7)' }}
            />
          }
        >
          <LiquidEtherLazy
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            colors={['#b100f6', '#ff00b2', '#f900e7']}
            autoDemo
            autoSpeed={0.1}
            autoIntensity={2.5}
            isBounce={false}
            resolution={0.75}
          />
        </Suspense>
      </div>

      <div className="artisan-showcase__stage relative z-10" data-artisan-stage>
        <div
          className="artisan-showcase__products"
          aria-label="Exemplos de peças personalizadas"
        >
          {[artisanShowcaseAssets.primary, artisanShowcaseAssets.secondary].map(
            (asset, index) => (
              <div
                className={`artisan-showcase__product artisan-showcase__product--${index + 1}`}
                data-artisan-product
                key={asset.src}
              >
                <CommercialImage asset={asset} sizes="(max-width: 767px) 76vw, 38vw" />
              </div>
            ),
          )}
        </div>
        <div className="artisan-showcase__copy">
          <p className="commercial-eyebrow">Personalizado</p>
          <h2 id="artisan-title" aria-label="Feito à mão. Feito pra durar.">
            <span>Feito à mão.</span>
            <span>Feito pra durar.</span>
          </h2>
          <ul>
            {trustMessages.map((message) => (
              <li data-artisan-proof key={message}>
                {message}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
