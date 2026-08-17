import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CommercialImage } from '@/components/ui/CommercialImage';
import { commercialCategories } from '@/data/commercial';
import { prefersReducedMotion } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

// oxlint-disable-next-line react/only-export-components -- Helper mantido para contrato público e testes
export function circularOffset(index: number, activeIndex: number, length: number): number {
  let offset = index - activeIndex;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
}

const bentoSizes = ['feature', 'wide', 'standard', 'standard', 'wide', 'feature'] as const;

export function CategoryCoverflow() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const length = commercialCategories.length;
  const [scrollX, setScrollX] = useState(0);
  const scrollXRef = useRef(0);
  const tweenObj = useRef({ value: 0 });

  const pointerStartX = useRef(0);
  const dragStartScrollX = useRef(0);
  const lastClientX = useRef(0);
  const lastTime = useRef(0);
  const velocity = useRef(0);
  const isDraggingRef = useRef(false);
  const hasDragged = useRef(false);
  const dragResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getItemWidth = () => {
    if (!viewportRef.current) return 340;
    const cardEl = slideRefs.current[0];
    const width = cardEl && cardEl.offsetWidth > 0 ? cardEl.offsetWidth : 320;
    const gap = typeof window !== 'undefined' && window.innerWidth <= 768 ? 20 : 28;
    return width + gap;
  };

  const itemWidth = getItemWidth();
  const totalWidth = length * itemWidth;
  const bufferMin = -itemWidth * 1.5;

  // Offset com wrap circular que começa naturalmente no card 01
  const getCardOffset = (index: number) => {
    const baseX = index * itemWidth + scrollX;
    return (((((baseX - bufferMin) % totalWidth) + totalWidth) % totalWidth) + bufferMin);
  };

  // Determina o índice ativo pelo card mais próximo do ponto focal (x = 0)
  let activeIndex = 0;
  let minAbs = Infinity;
  for (let i = 0; i < length; i++) {
    const offset = getCardOffset(i);
    if (Math.abs(offset) < minAbs) {
      minAbs = Math.abs(offset);
      activeIndex = i;
    }
  }

  useGSAP(
    () => {
      if (prefersReducedMotion() || !sectionRef.current) return;

      // 1. Heading entrance ao rolar até a seção
      gsap.fromTo(
        '[data-category-heading]',
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );

      // 2. Animação 3D flutuante orgânica das figuras
      const floatTween = gsap.to('[data-category-figure]', {
        y: -7,
        duration: 3.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.4,
          from: 'random',
        },
      });

      return () => {
        floatTween.kill();
      };
    },
    { scope: sectionRef },
  );

  useEffect(
    () => () => {
      if (dragResetTimer.current !== null) {
        clearTimeout(dragResetTimer.current);
      }
      gsap.killTweensOf(tweenObj.current);
    },
    [],
  );

  const goTo = (index: number, flickVelocity = 0) => {
    const currentItemWidth = getItemWidth();
    const currentPos = -scrollXRef.current / currentItemWidth;

    // Passo mais curto no loop infinito (wrap-aware)
    const currentMod = ((Math.round(currentPos) % length) + length) % length;
    let step = index - currentMod;
    if (step > length / 2) step -= length;
    if (step < -length / 2) step += length;

    const targetSnapIndex = Math.round(currentPos) + step;
    const snapTargetX = -targetSnapIndex * currentItemWidth;

    const startX = scrollXRef.current;
    scrollXRef.current = snapTargetX;
    setScrollX(snapTargetX);

    if (!prefersReducedMotion()) {
      const duration = Math.max(0.35, Math.min(0.6, 0.48 - Math.abs(flickVelocity) * 0.08));
      gsap.killTweensOf(tweenObj.current);
      tweenObj.current.value = startX;

      gsap.to(tweenObj.current, {
        value: snapTargetX,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          setScrollX(tweenObj.current.value);
        },
      });
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo((activeIndex + 1) % length);
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo((activeIndex - 1 + length) % length);
    }

    if (event.key === 'Home') {
      event.preventDefault();
      goTo(0);
    }

    if (event.key === 'End') {
      event.preventDefault();
      goTo(length - 1);
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (dragResetTimer.current !== null) {
      clearTimeout(dragResetTimer.current);
      dragResetTimer.current = null;
    }
    gsap.killTweensOf(tweenObj.current);

    isDraggingRef.current = true;
    pointerStartX.current = event.clientX;
    dragStartScrollX.current = scrollXRef.current;
    lastClientX.current = event.clientX;
    lastTime.current = Date.now();
    velocity.current = 0;
    hasDragged.current = false;

    if (viewportRef.current) {
      viewportRef.current.setAttribute('data-dragging', 'true');
    }
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!isDraggingRef.current) return;
    const distance = event.clientX - pointerStartX.current;
    if (Math.abs(distance) > 4) {
      hasDragged.current = true;
    }

    const now = Date.now();
    const dt = Math.max(1, now - lastTime.current);
    velocity.current = (event.clientX - lastClientX.current) / dt;
    lastClientX.current = event.clientX;
    lastTime.current = now;

    const newScrollX = dragStartScrollX.current + distance;
    setScrollX(newScrollX);
    scrollXRef.current = newScrollX;
  };

  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    if (!isDraggingRef.current) return;
    const distance = event.clientX - pointerStartX.current;
    const v = velocity.current;
    isDraggingRef.current = false;

    if (viewportRef.current) {
      viewportRef.current.removeAttribute('data-dragging');
    }

    if (Math.abs(distance) > 4) {
      hasDragged.current = true;
      dragResetTimer.current = setTimeout(() => {
        hasDragged.current = false;
        dragResetTimer.current = null;
      }, 50);
    }

    if (Math.abs(distance) >= 42 || Math.abs(v) > 0.35) {
      const direction = distance < 0 || v < -0.35 ? 1 : -1;
      goTo((activeIndex + direction + length) % length, v);
      return;
    }

    if (hasDragged.current) {
      goTo(activeIndex);
    }
  };

  const onPointerCancel = () => {
    if (dragResetTimer.current !== null) {
      clearTimeout(dragResetTimer.current);
      dragResetTimer.current = null;
    }
    isDraggingRef.current = false;
    hasDragged.current = false;
    if (viewportRef.current) {
      viewportRef.current.removeAttribute('data-dragging');
    }
  };

  const onSlideClick = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    if (hasDragged.current && event.detail > 0) {
      if (dragResetTimer.current !== null) {
        clearTimeout(dragResetTimer.current);
        dragResetTimer.current = null;
      }
      hasDragged.current = false;
      return;
    }

    if (dragResetTimer.current !== null) {
      clearTimeout(dragResetTimer.current);
      dragResetTimer.current = null;
    }
    hasDragged.current = false;
    goTo(index);
  };

  return (
    <section
      ref={sectionRef}
      id="categorias"
      className="category-coverflow commercial-section"
      aria-labelledby="categories-title"
    >
      <div className="category-coverflow__container">
        <div className="category-coverflow__heading" data-category-heading>
          <p className="commercial-eyebrow">Escolha por onde começar</p>
          <h2 id="categories-title">Nossas categorias</h2>
        </div>

        <div
          ref={viewportRef}
          className="category-coverflow__viewport"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Categorias de personalizados"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        >
          <div className="category-coverflow__track">
            {commercialCategories.map((category, index) => {
              const offset = circularOffset(index, activeIndex, length);
              const cardWrappedX = getCardOffset(index);
              const active = index === activeIndex;
              const absoluteOffset = Math.abs(offset);
              const shellStyle: CSSProperties & {
                '--coverflow-x': string;
                '--coverflow-depth': string;
                '--coverflow-rotate': string;
                '--coverflow-scale': string;
              } = {
                '--coverflow-x': `${offset * 14}rem`,
                '--coverflow-depth': `${Math.max(0, 1 - absoluteOffset) * 4}rem`,
                '--coverflow-rotate': `${offset * -24}deg`,
                '--coverflow-scale': String(1 - Math.min(absoluteOffset, 2) * 0.12),
                transform: `translate3d(${cardWrappedX}px, -50%, 0)`,
                opacity: 1,
                zIndex: 10 - Math.min(Math.round(Math.abs(cardWrappedX) / 120), 8),
              };

              return (
                <div
                  key={category.id}
                  ref={(el) => {
                    slideRefs.current[index] = el;
                  }}
                  className="category-coverflow__slide-shell"
                  style={shellStyle}
                  data-active={active}
                  data-bento-size={bentoSizes[index]}
                >
                  <div className="category-coverflow__reveal-frame" data-reveal-card>
                    <span className="category-coverflow__number" aria-hidden="true">
                      0{index + 1}
                    </span>

                    <button
                      type="button"
                      className="category-coverflow__slide"
                      aria-current={active ? 'true' : undefined}
                      aria-label={category.title}
                      tabIndex={active ? 0 : -1}
                      onClick={(event) => onSlideClick(event, index)}
                    >
                      <div className="category-coverflow__image-stage" data-category-figure>
                        <CommercialImage
                          asset={category.image}
                          sizes="(max-width: 767px) 72vw, 32vw"
                        />
                      </div>
                      <div className="category-coverflow__text-group">
                        <span className="category-coverflow__label">{category.title}</span>
                        <span className="category-coverflow__description">{category.description}</span>
                      </div>
                      <span className="category-coverflow__arrow" aria-hidden="true">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Indicadores Visuais de Paginação em Loop Infinito */}
        <div
          className="category-coverflow__pagination"
          role="tablist"
          aria-label="Indicadores de categorias"
        >
          {commercialCategories.map((category, index) => (
            <span
              key={`dot-${category.id}`}
              role="tab"
              tabIndex={0}
              className="category-coverflow__dot"
              aria-selected={index === activeIndex}
              aria-label={`Ir para categoria ${index + 1}: ${category.title}`}
              data-active={index === activeIndex ? 'true' : undefined}
              onClick={() => goTo(index)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  goTo(index);
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
